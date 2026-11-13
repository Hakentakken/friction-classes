import { site } from '../config.mjs';

// Convert a local wall-clock example to an instant using the runtime's IANA data.
// Sample dates avoid DST transition hours. No device-local timezone is assumed.
export function localInstant(date, hour, zone) {
  const desired = Date.parse(`${date}T${String(hour).padStart(2,'0')}:00:00Z`);
  let guess = desired;
  for(let attempt=0; attempt<3; attempt++) {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(guess).map(p => [p.type,p.value]));
    const represented = Date.parse(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`);
    guess += desired - represented;
  }
  return new Date(guess);
}
const time = (instant, zone) => new Intl.DateTimeFormat('en-GB',{timeZone:zone,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(instant);
const localDay = (instant,zone) => new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).format(instant);
/** @param {{city:string, zone:string, start:number, end:number, label:string}[]} windows */
export function timingRows(windows) {
  return windows.flatMap(window => site.comparisonDates.map(date => {
    const start = localInstant(date,window.start,window.zone);
    const end = localInstant(date,window.end,window.zone);
    const endDay = localDay(end,'Asia/Kolkata');
    return {city:window.city, zone:window.zone, label:window.label, date, local:`${time(start,window.zone)}–${time(end,window.zone)}`, india:`${time(start,'Asia/Kolkata')}–${time(end,'Asia/Kolkata')}${endDay !== date ? ' (next day)' : ''}`};
  }));
}
