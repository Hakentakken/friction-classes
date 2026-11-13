import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parseHTML, DOMParser } from 'linkedom';
import Ajv from 'ajv';
import sharp from 'sharp';
import { site, absoluteUrl, faqs } from '../src/config.mjs';
import { pageRegistry, indexedRoutes, pageMetadata } from '../src/lib/seo.mjs';
import schema from './structured-data-schema.mjs';
import { localInstant } from '../src/lib/time-windows.mjs';
const root=path.resolve(process.env.VERIFY_DIR || 'dist');
const files=fs.readdirSync(root,{recursive:true}).filter(f=>f.endsWith('.html'));
const base=site.basePath.replace(/\/$/,'');
const ajv=new Ajv({allErrors:true});
ajv.addFormat('absolute-url',value=>{try{return ['http:','https:'].includes(new URL(value).protocol)}catch{return false}});
const validate=ajv.compile(schema);
const titles=new Set(),descriptions=new Set(),outgoing=new Map(),results=[];
let checked=0,entities=0;
for(const file of files){
 const route=file.replaceAll('\\','/').replace(/index\.html$/,'');
 const {document}=parseHTML(fs.readFileSync(path.join(root,file),'utf8'));
 const expected=pageMetadata(route);
 const meta=(key,property=false)=>document.querySelector(`meta[${property?'property':'name'}="${key}"]`)?.getAttribute('content');
 const title=document.querySelector('title').textContent,description=meta('description');
 assert(title.length<=60,`${file}: title ${title.length} characters`);
 assert(description?.length<=155,`${file}: description ${description?.length} characters`);
 assert(!titles.has(title),`${file}: duplicate title`);titles.add(title);
 assert(!descriptions.has(description),`${file}: duplicate description`);descriptions.add(description);
 assert.equal(title,expected.title);assert.equal(description,expected.description);
 assert.equal(document.documentElement.lang,'en');
 assert.equal(document.querySelectorAll('link[rel="canonical"]').length,1);
 assert.equal(document.querySelector('link[rel="canonical"]').href,absoluteUrl(route));
 assert.equal(meta('og:url',true),absoluteUrl(route));
 for(const key of ['og:title','og:description','og:type','og:image','og:image:alt','og:image:width','og:image:height'])assert(meta(key,true),`${file}: ${key}`);
 for(const key of ['twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt'])assert(meta(key),`${file}: ${key}`);
 assert.equal(meta('og:image',true),absoluteUrl('images/social-share.png'));
 assert.equal(meta('robots'),site.isPublicSite&&route!=='404.html'?'index, follow':'noindex, follow');
 assert.equal(document.querySelectorAll('[hreflang]').length,0);
 const blocks=document.querySelectorAll('script[type="application/ld+json"]');assert.equal(blocks.length,1);
 const json=JSON.parse(blocks[0].textContent);assert(validate(json),`${file}: ${ajv.errorsText(validate.errors)}`);
 const graph=json['@graph'];entities+=graph.length;
 const ofType=type=>graph.filter(e=>e['@type']===type);
 assert.equal(ofType('EducationalOrganization').length,1);assert.equal(ofType('WebSite').length,1);
 assert.equal(ofType('BreadcrumbList').length,route?1:0);
 const org=ofType('EducationalOrganization')[0];assert.equal(org.url,site.siteUrl);assert.equal(org.logo,absoluteUrl('logo.svg'));
 assert.equal(org.contactPoint.telephone,`+${site.whatsapp}`);if(!site.socialLinks.length)assert(!('sameAs'in org));
 const persons=ofType('Person');assert.equal(persons.length,route==='mentors/'?site.team.length:0);
 for(const person of persons){const member=site.team.find(m=>m.name===person.name);assert(member);assert.equal(person.affiliation.name,member.institution);assert(document.getElementById(member.slug));}
 const faq=ofType('FAQPage')[0];assert.equal(!!faq,route==='faq/');
 if(faq){assert.deepEqual(faq.mainEntity.map(q=>({q:q.name,a:q.acceptedAnswer.text})),faqs);for(const item of faqs)assert(document.querySelector('main').textContent.includes(item.a));}
 for(const image of document.querySelectorAll('img'))assert(image.hasAttribute('alt')&&image.hasAttribute('width')&&image.hasAttribute('height'),`${file}: image dimensions and alt`);
 let previous=0;for(const heading of document.querySelectorAll('main h1,main h2,main h3,main h4')){const level=Number(heading.tagName.slice(1));assert(level<=previous+1,`${file}: heading jump ${heading.tagName}: ${heading.textContent}`);previous=level;}
 const links=[];
 for(const node of document.querySelectorAll('[href],[src]')){
  const value=node.getAttribute('href')||node.getAttribute('src');if(!value||/^(tel:|mailto:|data:)/.test(value))continue;
  const url=new URL(value,absoluteUrl(route));if(url.origin!==new URL(site.siteUrl).origin)continue;
  assert(!base||url.pathname.startsWith(`${base}/`),`${file}: base escape ${value}`);
  const local=decodeURIComponent(url.pathname.slice(base.length)).replace(/^\//,'');let target=path.join(root,local);
  if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');assert(fs.existsSync(target),`${file}: missing ${value}`);
  if(url.hash&&target.endsWith('.html'))assert(parseHTML(fs.readFileSync(target,'utf8')).document.getElementById(decodeURIComponent(url.hash.slice(1))),`${file}: missing fragment ${value}`);
  if(node.tagName==='A'&&target.endsWith('.html'))links.push(local);checked++;
 }
 outgoing.set(route,links);results.push({route,titleLength:title.length,descriptionLength:description.length,structuredEntities:graph.length});
}
const reached=new Set(),queue=[''];while(queue.length){const route=queue.pop();if(reached.has(route))continue;reached.add(route);queue.push(...(outgoing.get(route)||[]).filter(route=>!reached.has(route)));}
for(const route of indexedRoutes)assert(reached.has(route),`Orphan page ${route}`);
assert.equal(files.length,Object.keys(pageRegistry).length);
const xml=new DOMParser().parseFromString(fs.readFileSync(path.join(root,'sitemap.xml'),'utf8'),'text/xml');
assert.deepEqual([...xml.querySelectorAll('loc')].map(el=>el.textContent).sort(),indexedRoutes.map(absoluteUrl).sort());
const robots=fs.readFileSync(path.join(root,'robots.txt'),'utf8');assert(robots.includes(site.isPublicSite?`Sitemap: ${absoluteUrl('sitemap.xml')}`:'Disallow: /'));
if(site.isPublicSite)assert(!robots.includes('Disallow: /'));
const png=await sharp(path.join(root,'images/social-share.png')).metadata();assert.equal(png.width,1200);assert.equal(png.height,630);
if(!site.EMAIL)assert(!fs.existsSync(path.join(root,'.well-known/security.txt')));
assert.equal(localInstant('2027-01-15',8,'America/Vancouver').toISOString(),'2027-01-15T15:00:00.000Z');
assert.equal(localInstant('2027-01-15',8,'America/Los_Angeles').toISOString(),'2027-01-15T16:00:00.000Z');
assert.equal(localInstant('2027-07-15',16,'Europe/London').toISOString(),'2027-07-15T15:00:00.000Z');
const summary={siteUrl:site.siteUrl,base:site.basePath,publicSite:site.isPublicSite,pages:files.length,localReferences:checked,structuredEntities:entities,sitemapPages:indexedRoutes.length,orphanPages:0,results};
fs.mkdirSync('qa',{recursive:true});fs.writeFileSync(process.env.SEO_REPORT||'qa/seo-validation.json',JSON.stringify(summary,null,2));
console.log(`PASS: ${files.length} pages; ${checked} local references; ${entities} structured entities; unique metadata; sitemap/robots; ${indexedRoutes.length} reachable sitemap pages; time-zone regressions. ${site.siteUrl}`);
