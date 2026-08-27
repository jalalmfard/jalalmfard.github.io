import { Component, OnDestroy, OnInit } from '@angular/core';
import { SetupService } from '../services/setup.service';

interface Preview { id:string; title:string; src:string; coverImages?:string[]; coverPosition?:string; }
interface Section { key:string; index:string; title:string; route:string; projects:Preview[]; }

@Component({selector:'app-home',templateUrl:'./home.component.html',styleUrls:['./home.component.css']})
export class HomeComponent implements OnInit, OnDestroy {
  sections:Section[]=[]; selected:Record<string,number>={}; previous:Record<string,number>={}; turning:Record<string,boolean>={};
  currentAward=0;
  awards=[
    'LOOP Design Awards 2025 — Winner · FEEL Boutique Plaza',
    'Architizer A+Awards 2025 — Special Mention · Jan Plaza',
    'DNA Paris 2025 — Honorable Mention · Jan Plaza',
    'DNA Paris 2025 — Honorable Mention · LOOKOUT/IN Café',
    'Architecture MasterPrize 2025 — Honorable Mention · LOOKOUT/IN Café',
    'NY Product Design Awards 2025 — Silver Winner · NOUSHELLA'
  ];
  private timers:number[]=[];
  constructor(private setup:SetupService){}
  async ngOnInit():Promise<void>{
    const architecture=await this.setup.getPageData('architecture');
    const fashion=await this.setup.getPageData('fashion');
    const artworks=await this.setup.getPageData('artworks');
    const exhibitions=await this.setup.getPageData('exhibitions');
    this.sections=[
      this.make('architecture','01','Architecture','/architecture',architecture?.images,9),
      this.make('fashion','02','Fashion & Jewelry','/fashion',fashion?.images,6),
      this.make('artworks','03','Artworks','/artworks',artworks?.images,8),
      this.make('exhibitions','04','Exhibitions','/exhibitions',exhibitions?.images,7)
    ].filter(s=>s.projects.length);
    this.sections.forEach(s=>{this.selected[s.key]=0;this.previous[s.key]=0;this.turning[s.key]=false;});
    if(typeof window!=='undefined'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      this.timers.push(window.setInterval(()=>this.currentAward=(this.currentAward+1)%this.awards.length,3400));
  }
  ngOnDestroy():void{this.timers.forEach(t=>window.clearTimeout(t));}
  featured(s:Section):Preview{return s.projects[this.selected[s.key]||0];}
  previousFeatured(s:Section):Preview{return s.projects[this.previous[s.key]||0];}
  select(s:Section,i:number):void{
    if(i===this.selected[s.key])return;
    this.previous[s.key]=this.selected[s.key]||0;this.selected[s.key]=i;this.turning[s.key]=true;
    this.timers.push(window.setTimeout(()=>this.turning[s.key]=false,620));
  }
  private make(key:string,index:string,title:string,route:string,source:any[]=[],limit:number):Section{
    const projects=[...(source||[])].sort((a,b)=>(a.place??999)-(b.place??999)).map(p=>{
      const covers=(p.coverImages||[]).map((x:string)=>this.path(x));
      const src=p.src||covers[0]||p.images?.find((x:any)=>x.src)?.src;
      return{id:p.id,title:p.title,src:this.path(src),coverImages:covers,coverPosition:p.coverPosition};
    }).filter(p=>p.id&&p.title&&p.src).slice(0,limit);
    return{key,index,title,route,projects};
  }
  private path(src:string):string{return !src?'':src.startsWith('/')?src:`/${src}`;}
}
