import { site, absoluteUrl, faqs } from '../config.mjs';
import { countries } from '../data/countries.mjs';
import { gradeGuides, articles } from '../data/guides.mjs';

const corePages = [
  ['', 'Online Tuition for Classes 1–9', 'Personalized one-on-one online tuition for Classes 1–9. Explore subjects, meet our mentors and discuss a learning plan for your child.'],
  ['about/', 'About Our Learning Approach', 'Meet Friction Classes: a new learning initiative focused on personal attention, clear understanding and your child’s confidence.'],
  ['programs/', 'Online Tuition Programs: Classes 1–9', 'Explore one-on-one online tuition for Classes 1–3, 4–6 and 7–9, with subject choices and learning plans aligned to your child’s curriculum.'],
  ['subjects/', 'Maths, Science, English & Coding', 'Explore Maths, Science, English, and Coding and Logical Thinking for Classes 1–9, with one-on-one support at your child’s pace.'],
  ['mentors/', 'Meet Our Mentors', 'Meet Vivek, Tamanna, Utsav, Manoranjan and Utkarsh. Learn about their study backgrounds and our approach to matching a mentor with your child.'],
  ['how-it-works/', 'How One-on-One Classes Work', 'See how a WhatsApp enquiry becomes a demo conversation, a mentor match and a personalized learning plan with regular parent updates.'],
  ['nri-families/', 'Online Tuition for NRI Students', 'One-on-one online tuition for NRI students in Classes 1–9. Explore curriculum support, country timing guides and practical advice for parents.'],
  ['faq/', 'Parent FAQs About Online Tuition', 'Answers about mentor matching, curricula, demos, scheduling, parent updates and personalized plans for one-on-one online tuition.'],
  ['contact/', 'Contact Us & Book a Demo Class', 'Discuss your child’s class, subjects and schedule with Friction Classes. Prepare a WhatsApp demo enquiry or call us directly.'],
  ['privacy/', 'Privacy & Your Information', 'Learn how this static website handles theme preferences, contact form details and WhatsApp links, with no analytics or website database.'],
  ['terms/', 'Website & Class Enquiry Terms', 'Read the terms for using the Friction Classes website, making demo enquiries and discussing class arrangements with a parent or guardian.'],
  ['404.html', 'Page Not Found', 'This Friction Classes page could not be found. Return to our programs, parent guides or contact page to find your next step.'],
  ['learn/', 'Learning Guides for Parents', 'Practical parent guides on choosing a tutor, maths confidence, curriculum changes, study routines and understanding your child’s progress.'],
];
export const pageRegistry = Object.fromEntries([
  ...corePages.map(([route, title, description]) => [route, {title, description, label: title}]),
  ...countries.map(country => [`nri-families/${country.slug}/`, {title:`NRI Online Tuition in ${country.name}`, description:country.description, label:country.name}]),
  ...gradeGuides.map(guide => [`programs/${guide.slug}/`, {title:guide.title, description:guide.description, label:guide.title.replace('Online tuition for ', '')}]),
  ...articles.map(article => [`learn/${article.slug}/`, {title:article.seoTitle, description:article.description, label:article.title}]),
]);
export const indexedRoutes = Object.keys(pageRegistry).filter(route => route !== '404.html');
export function routeFromPath(pathname) {
  const base = site.basePath.replace(/\/$/, '');
  return pathname.slice(base.length).replace(/^\//, '');
}
export function pageMetadata(route) {
  const meta = pageRegistry[route];
  if (!meta) throw new Error(`Missing SEO metadata for ${route}`);
  return {...meta, title:`${meta.title} | ${site.name}`, canonical:absoluteUrl(route)};
}
export function breadcrumbs(route) {
  const result = [{name:'Home', route:''}];
  if (!route) return result;
  const parts = route.replace(/\/$/, '').split('/');
  for (let i = 0; i < parts.length; i++) {
    const partial = parts.slice(0, i + 1).join('/') + (route === '404.html' ? '' : '/');
    const label = partial === 'nri-families/' ? 'NRI families' : partial === 'learn/' ? 'Learn' : partial === 'programs/' ? 'Programs' : pageRegistry[partial]?.label;
    if (label) result.push({name:label, route:partial});
  }
  return result;
}
export function structuredData(route) {
  const orgId = absoluteUrl('#organization');
  const graph = [
    {'@type':'EducationalOrganization','@id':orgId,name:site.name,url:site.siteUrl,logo:absoluteUrl('logo.svg'),contactPoint:{'@type':'ContactPoint',telephone:`+${site.whatsapp}`,contactType:'customer enquiries'},...(site.socialLinks.length ? {sameAs:site.socialLinks.map(link => link.url)} : {})},
    {'@type':'WebSite','@id':absoluteUrl('#website'),name:site.name,url:site.siteUrl,inLanguage:'en',publisher:{'@id':orgId}},
  ];
  if(route) graph.push({'@type':'BreadcrumbList','@id':absoluteUrl(`${route}#breadcrumbs`),itemListElement:breadcrumbs(route).map((crumb,i) => ({'@type':'ListItem',position:i+1,name:crumb.name,item:absoluteUrl(crumb.route)}))});
  if(route === 'mentors/') site.team.forEach(person => graph.push({'@type':'Person','@id':absoluteUrl(`mentors/#${person.slug}`),url:absoluteUrl(`mentors/#${person.slug}`),name:person.name,jobTitle:person.role,description:`${person.discipline} student at ${person.institution}.`,affiliation:{'@type':'CollegeOrUniversity',name:person.institution}}));
  if(route === 'faq/') graph.push({'@type':'FAQPage','@id':absoluteUrl('faq/#questions'),mainEntity:faqs.map(faq => ({'@type':'Question',name:faq.q,acceptedAnswer:{'@type':'Answer',text:faq.a}}))});
  return {'@context':'https://schema.org','@graph':graph};
}
export const serializeJsonLd = data => JSON.stringify(data).replace(/</g, '\\u003c');
