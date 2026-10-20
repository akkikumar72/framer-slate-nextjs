import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const items=[
 ['folio-thumbnail','thumbnail-artwork','Square grid cover','Folio cover artwork with a real desktop screenshot and the words Good design. A new home.',1200,1200],
 ['folio-hero','hero-artwork','Case-study hero','Folio desktop and mobile previews on a copper and charcoal background.',1800,1000],
 ['folio-library','desktop','Lead image','Folio desktop workspace, with its navigation sidebar, shader hero, filters, and template cards.',1440,1100],
 ['folio-discovery','discovery','The idea, left paired image','The SaaS category in Folio, showing search, filters, and six matching templates.',1000,964],
 ['folio-pages','pages','The idea, right paired image','The Folio page directory with Roco expanded and direct links to its pages.',1000,964],
 ['folio-mobile','mobile-artwork','The experience, wide image','Folio on mobile, with its landing page and complete navigation drawer shown side by side.',1440,1100],
];
const assets=[];
for(const [name,source,placement,alt,width,height] of items){
 const input=path.join(root,'raw',source+'.png');
 const meta=await sharp(input).metadata();
 if(meta.width!==width||meta.height!==height)throw Error(`${source}: ${meta.width}x${meta.height}, expected ${width}x${height}`);
 const file=`assets/${name}.webp`;
 await sharp(input).webp({quality:92,effort:6,smartSubsample:true}).toFile(path.join(root,file));
 const buffer=await fs.readFile(path.join(root,file));
 assets.push({file,publicPath:`/assets/${name}.webp`,width,height,bytes:buffer.length,sha256:createHash('sha256').update(buffer).digest('hex'),placement,alt,source:`raw/${source}.png`,heroPosition:name==='folio-hero'?'left center':undefined});
}
const manifest={project:'Folio',preparedAt:'2026-09-25',target:'akash-portfolio',replace:{galleryPanel:'akkivo',caseStudyKey:'akkivo',newKey:'folio',preserveGalleryPosition:true},facts:{templates:19,contentPages:284,categories:5},repository:'https://github.com/akkikumar72/framer-slate-nextjs',publicLiveUrl:null,provenance:'Actual local application screenshots. Cover, hero, and mobile frames were laid out in source/boards.html and captured in a browser. No generated or invented interface imagery.',assets};
await fs.writeFile(path.join(root,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(assets.map(a=>`${a.file}: ${a.width} x ${a.height}, ${(a.bytes/1024).toFixed(1)} KiB`).join('\n'));
