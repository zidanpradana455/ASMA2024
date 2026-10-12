import {spawnSync} from 'node:child_process';
for(const args of [['node_modules/typescript/bin/tsc','-b'],['node_modules/vite/bin/vite.js','build'],['node_modules/tsx/dist/cli.mjs','scripts/prerender.ts']]){
 const result=spawnSync(process.execPath,args,{stdio:'inherit'});
 if(result.status!==0)process.exit(result.status??1);
}
