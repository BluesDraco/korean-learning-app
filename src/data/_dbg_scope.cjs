const fs=require('fs');
const old=JSON.parse(fs.readFileSync('_tokfiles.json','utf8'));
const files=new Set();
for(const v of Object.values(old)) for(const f of v) files.add(f.split('\\').join('/'));
const tops={};
for(const f of files){const t=f.split('/')[0];tops[t]=(tops[t]||0)+1;}
console.log('old top dirs:',JSON.stringify(tops));
const pub=[...files].filter(f=>f.startsWith('public/'));
console.log('old public count:',pub.length, pub.slice(0,5));
const sfiles=[...files].filter(f=>f.startsWith('src/'));
console.log('old src count:',sfiles.length);
