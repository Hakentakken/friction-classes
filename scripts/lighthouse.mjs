import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const origin=process.env.QA_URL || 'http://localhost:4322';
const routes=process.env.LH_ROUTES ? process.env.LH_ROUTES.split(',').map(route=>route==='home'?'':route) : ['', 'nri-families/','nri-families/usa/','programs/classes-1-3/','learn/choosing-an-online-tutor/','contact/','faq/'];
const folder=process.env.LH_FOLDER || 'qa/lighthouse';
await fs.mkdir(folder,{recursive:true});
const results=[];
for(const route of routes){
 const chrome=await chromeLauncher.launch({chromePath:chromium.executablePath(),chromeFlags:['--headless=new','--no-first-run','--no-default-browser-check']});
 try{
  const result=await lighthouse(`${origin}/${route}`,{port:chrome.port,output:['html','json'],logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo']});
  const {lhr,report}=result;const name=route.replaceAll('/','-').replace(/-$/,'')||'home';
  await fs.writeFile(`${folder}/${name}.html`,report[0]);await fs.writeFile(`${folder}/${name}.json`,report[1]);
  const summary={route:route||'/',profile:process.env.LH_PROFILE||'local-preview',requestedUrl:lhr.requestedUrl,fetchTime:lhr.fetchTime,lighthouseVersion:lhr.lighthouseVersion,scores:Object.fromEntries(Object.entries(lhr.categories).map(([key,value])=>[key,Math.round(value.score*100)])),metrics:{FCP:lhr.audits['first-contentful-paint'].numericValue,LCP:lhr.audits['largest-contentful-paint'].numericValue,TBT:lhr.audits['total-blocking-time'].numericValue,CLS:lhr.audits['cumulative-layout-shift'].numericValue},settings:lhr.configSettings,failedAudits:Object.values(lhr.audits).filter(a=>a.score!==null&&a.score<1&&a.scoreDisplayMode!=='informative').map(a=>({id:a.id,title:a.title,score:a.score,displayValue:a.displayValue}))};
  results.push(summary);console.log(JSON.stringify({route:summary.route,scores:summary.scores,metrics:summary.metrics}));
 }finally{chrome.kill();}
}
await fs.writeFile(`${folder}/summary.json`,JSON.stringify(results,null,2));
