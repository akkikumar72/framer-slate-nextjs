import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const types={'.html':'text/html','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.json':'application/json','.md':'text/plain'};
createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const name=decodeURIComponent(url.pathname)==='/'?'/index.html':decodeURIComponent(url.pathname);const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep))throw Error('path');const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]??'application/octet-stream','Cache-Control':'no-store'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}}).listen(4317,'127.0.0.1',()=>console.log('Portfolio media library: http://127.0.0.1:4317/'));
