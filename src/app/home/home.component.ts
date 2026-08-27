import { Component, OnDestroy, OnInit } from '@angular/core';
import { SetupService } from '../services/setup.service';

interface Preview { id:string; title:string; src:string; summary:string; meta:string; coverImages?:string[]; coverPosition?:string; }
interface Section { key:string; index:string; title:string; route:string; projects:Preview[]; }

@Component({selector:'app-home',templateUrl:'./home.component.html',styleUrls:['./home.component.css']})
export class HomeComponent implements OnInit, OnDestroy {
  sections:Section[]=[]; selected:Record<string,number>={}; previous:Record<string,number>={}; transitioning:Record<string,boolean>={};
  currentAward=0;
  awards=['LOOP Design Awards 2025 — Winner · FEEL Boutique Plaza','Architizer A+Awards 2025 — Special Mention · Jan Plaza','DNA Paris 2025 — Honorable Mention · Jan Plaza','DNA Paris 2025 — Honorable Mention · LOOKOUT/IN Café','Architecture MasterPrize 2025 — Honorable Mention · LOOKOUT/IN Café','NY Product Design Awards 2025 — Silver Winner · NOUSHELLA'];
  private timers:number[]=[]; private changeId:Record<string,number>={}; private destroyed=false;
  constructor(private setup:SetupService){}
  async ngOnInit():Promise<void>{
    const [architecture,fashion,artworks,exhibitions]=await Promise.all([this.setup.getPageData('architecture'),this.setup.getPageData('fashion'),this.setup.getPageData('artworks'),this.setup.getPageData('exhibitions')]);
    this.sections=[this.make('architecture','01','Architecture','/architecture',architecture?.images,9),this.make('fashion','02','Fashion & Jewelry','/fashion',fashion?.images,7),this.make('artworks','03','Artworks','/artworks',artworks?.images,8),this.make('exhibitions','04','Exhibitions','/exhibitions',exhibitions?.images,7)].filter(s=>s.projects.length);
    this.sections.forEach(s=>{this.selected[s.key]=0;this.previous[s.key]=0;this.transitioning[s.key]=false;this.changeId[s.key]=0;this.preload(s.projects[0]?.src);this.preload(s.projects[1]?.src);});
    if(typeof window!=='undefined'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      this.timers.push(window.setInterval(()=>this.currentAward=(this.currentAward+1)%this.awards.length,3600));
      this.sections.forEach((section,index)=>this.timers.push(window.setInterval(()=>this.select(section,(this.selected[section.key]+1)%section.projects.length),4000+(index*650))));
    }
  }
  ngOnDestroy():void{this.destroyed=true;this.timers.forEach(t=>window.clearTimeout(t));}
  featured(s:Section):Preview{return s.projects[this.selected[s.key]||0];}
  previousFeatured(s:Section):Preview{return s.projects[this.previous[s.key]||0];}
  select(s:Section,i:number):void{
    if(i===this.selected[s.key]||this.transitioning[s.key])return;
    const request=++this.changeId[s.key];
    this.load(s.projects[i].src).then(()=>{if(this.destroyed||request!==this.changeId[s.key])return;this.previous[s.key]=this.selected[s.key]||0;this.selected[s.key]=i;this.transitioning[s.key]=true;this.preload(s.projects[(i+1)%s.projects.length]?.src);this.timers.push(window.setTimeout(()=>this.transitioning[s.key]=false,950));});
  }
  private load(src:string):Promise<void>{if(typeof Image==='undefined'||!src)return Promise.resolve();return new Promise(resolve=>{const image=new Image();image.onload=()=>resolve();image.onerror=()=>resolve();image.src=src;if(image.complete)resolve();});}
  private preload(src:string):void{this.load(src);}
  private make(key:string,index:string,title:string,route:string,source:any[]=[],limit:number):Section{
    const projects=[...(source||[])].sort((a,b)=>(a.place??999)-(b.place??999)).map(p=>{const covers=(p.coverImages||[]).map((x:string)=>this.path(x));const full=p.images?.find((x:any)=>x.src)?.src;const src=p.homeImage||full||p.src||covers[0];const clean=(p.description||'').split('\n')[0].replace(/\s+/g,' ').trim();const summary=clean.length>150?`${clean.slice(0,147)}…`:clean;const meta=[p.location,p.year].filter(Boolean).join(' · ');return{id:p.id,title:p.title,src:this.path(src),summary,meta,coverImages:covers,coverPosition:p.coverPosition};}).filter(p=>p.id&&p.title&&p.src).slice(0,limit);
    return{key,index,title,route,projects};
  }
  private path(src:string):string{return !src?'':src.startsWith('/')?src:`/${src}`;}
}
