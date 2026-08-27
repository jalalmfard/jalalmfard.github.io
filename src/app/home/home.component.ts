import { Component, OnDestroy, OnInit } from '@angular/core';
import { SetupService } from '../services/setup.service';

interface PortalCard { key:string; title:string; route:string; images:string[]; current:number; previous:number; changing:boolean; }

@Component({selector:'app-home',templateUrl:'./home.component.html',styleUrls:['./home.component.css']})
export class HomeComponent implements OnInit,OnDestroy{
  cards:PortalCard[]=[];
  awardMarks=['A+Awards','LOOP Design Awards','DNA Paris','Architecture MasterPrize','Architecture of the Year'];
  private timers:number[]=[];private destroyed=false;
  constructor(private setup:SetupService){}
  async ngOnInit():Promise<void>{
    const [architecture,fashion,artworks,exhibitions]=await Promise.all([
      this.setup.getPageData('architecture'),this.setup.getPageData('fashion'),this.setup.getPageData('artworks'),this.setup.getPageData('exhibitions')
    ]);
    this.cards=[
      this.make('architecture','Architecture & Interior Design','/architecture',architecture?.images),
      this.make('fashion','Fashion Design','/fashion',fashion?.images),
      this.make('artworks','Artworks','/artworks',artworks?.images),
      this.make('exhibitions','Exhibitions','/exhibitions',exhibitions?.images)
    ].filter(card=>card.images.length);
    this.cards.forEach((card,index)=>{
      this.preload(card.images[0]);this.preload(card.images[1]);
      if(typeof window!=='undefined'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        this.timers.push(window.setTimeout(()=>this.start(card),index*430));
      }
    });
  }
  ngOnDestroy():void{this.destroyed=true;this.timers.forEach(timer=>window.clearTimeout(timer));}
  current(card:PortalCard):string{return card.images[card.current];}
  old(card:PortalCard):string{return card.images[card.previous];}
  private start(card:PortalCard):void{
    const tick=()=>{if(this.destroyed)return;this.advance(card);this.timers.push(window.setTimeout(tick,4000));};
    this.timers.push(window.setTimeout(tick,4000));
  }
  private advance(card:PortalCard):void{
    if(card.images.length<2||card.changing)return;
    const next=(card.current+1)%card.images.length;
    this.load(card.images[next]).then(()=>{if(this.destroyed)return;card.previous=card.current;card.current=next;card.changing=true;this.preload(card.images[(next+1)%card.images.length]);this.timers.push(window.setTimeout(()=>card.changing=false,1200));});
  }
  private make(key:string,title:string,route:string,source:any[]=[]):PortalCard{
    const images=[...(source||[])].sort((a,b)=>(a.place??999)-(b.place??999)).map(project=>this.pick(key,project)).filter(Boolean).slice(0,key==='architecture'?8:6);
    return{key,title,route,images,current:0,previous:0,changing:false};
  }
  private pick(section:string,project:any):string{
    const selected:Record<string,string>={
      'architecture:0021':'assets/images/main/slider/1515.jpg','architecture:0020':'assets/images/main/slider/1414.jpg',
      'fashion:embodied-archetypes':'assets/images/embodied-archetypes/29-demeter-garment.jpg',
      'artworks:embodied-archetypes':'assets/images/embodied-archetypes/03-persephone-art.jpg'
    };
    const src=selected[`${section}:${project.id}`]||project.homeImage||project.src||project.coverImages?.[0]||project.images?.find((image:any)=>image.src)?.src;
    return !src?'':src.startsWith('/')?src:`/${src}`;
  }
  private load(src:string):Promise<void>{if(typeof Image==='undefined'||!src)return Promise.resolve();return new Promise(resolve=>{const image=new Image();image.onload=()=>resolve();image.onerror=()=>resolve();image.src=src;if(image.complete)resolve();});}
  private preload(src:string):void{this.load(src);}
}
