import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const routes=new Map([['/','index.html'],['/index.html','index.html'],['/style.css','style.css'],['/app.js','app.js'],['/content.js','content.js'],['/course-extension.js','course-extension.js'],['/radio.js','radio.js']]);
const types={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',js:'text/javascript; charset=utf-8'};
export function createServer(){return http.createServer(async(req,res)=>{
 res.setHeader('Content-Security-Policy',"default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'none'; media-src blob:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'");
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');res.setHeader('Cache-Control','no-store');
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end('Method not allowed');return;}
 const pathname=(req.url||'/').split('?')[0];const file=routes.get(pathname);
 if(!file){res.writeHead(404);res.end('Not found');return;}
 try{const data=await readFile(new URL(`./public/${file}`,import.meta.url));res.writeHead(200,{'Content-Type':types[file.split('.').pop()]});res.end(req.method==='HEAD'?undefined:data);}catch{res.writeHead(500);res.end('Unable to load page');}
});}
if(process.argv[1]===fileURLToPath(import.meta.url)){const server=createServer();server.listen(4173,'127.0.0.1',()=>console.log('Local preview: http://127.0.0.1:4173'));}
