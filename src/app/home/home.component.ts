import { Component, OnDestroy, OnInit } from '@angular/core';

interface PortalImage { src:string; position:string; fit:'cover'|'contain'; }
interface PortalCard { key:string; title:string; route:string; images:PortalImage[]; current:number; previous:number; changing:boolean; }
interface AwardMark { mark:string; name:string; }

@Component({selector:'app-home',templateUrl:'./home.component.html',styleUrls:['./home.component.css']})
export class HomeComponent implements OnInit,OnDestroy{
  cards:PortalCard[]=[
    this.card('architecture','Architecture & Interior Design','/architecture',[
      this.image('/assets/images/main/slider/1515.jpg'),this.image('/assets/images/main/slider/1414.jpg'),this.image('/assets/images/main/slider/lookout.jpg'),this.image('/assets/images/publications/amazing-architecture/keluchick/2.jpg'),this.image('/assets/images/architecture/new-generation-ahmadabad/facade.jpg'),this.image('/assets/images/architecture/new-generation-ahmadabad/balcony.jpg','70% center'),this.image('/assets/images/architecture/noor-residence/pool.jpg','center 48%')
    ]),
    this.card('fashion','Fashion Design','/fashion',[
      this.image('/assets/images/home/fashion-01.jpg','center 42%'),this.image('/assets/images/home/fashion-02.jpg','center 38%'),this.image('/assets/images/home/fashion-03.jpg','center 28%','contain'),this.image('/assets/images/home/fashion-04.jpg','center 38%'),this.image('/assets/images/home/fashion-05.jpg','center 32%','contain'),this.image('/assets/images/home/fashion-06.jpg','center 30%','contain')
    ]),
    this.card('artworks','Artworks','/artworks',[
      this.image('/assets/images/home/artwork-01.jpg'),this.image('/assets/images/home/artwork-02.jpg')
    ]),
    this.card('product-design','Product Design','/furnituredesign',[
      this.image('/assets/images/product-design/dining/dining-cover.jpg'),this.image('/assets/images/product-design/carpet/carpet-cover.jpg'),this.image('/assets/images/product-design/watch/time-hunter.jpg')
    ])
  ];
  awardMarks:AwardMark[]=[
    {mark:'A+',name:'Architizer A+Awards'},{mark:'LOOP',name:'Design Awards'},{mark:'DNA',name:'Paris Design Awards'},
    {mark:'AMP',name:'Architecture MasterPrize'},{mark:'AOTY',name:'Architecture of the Year'}
  ];
  private timers:number[]=[];private destroyed=false;
  ngOnInit():void{this.cards.forEach((card,index)=>{this.preload(card.images[0]);this.preload(card.images[1]);if(typeof window!=='undefined'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)this.timers.push(window.setTimeout(()=>this.start(card),index*420));});}
  ngOnDestroy():void{this.destroyed=true;this.timers.forEach(timer=>window.clearTimeout(timer));}
  current(card:PortalCard):PortalImage{return card.images[card.current];}
  old(card:PortalCard):PortalImage{return card.images[card.previous];}
  private image(src:string,position='center',fit:'cover'|'contain'='cover'):PortalImage{return{src,position,fit};}
  private card(key:string,title:string,route:string,images:PortalImage[]):PortalCard{return{key,title,route,images,current:0,previous:0,changing:false};}
  private start(card:PortalCard):void{const tick=()=>{if(this.destroyed)return;this.advance(card);this.timers.push(window.setTimeout(tick,4000));};this.timers.push(window.setTimeout(tick,4000));}
  private advance(card:PortalCard):void{if(card.changing)return;const next=(card.current+1)%card.images.length;this.load(card.images[next].src).then(()=>{if(this.destroyed)return;card.previous=card.current;card.current=next;card.changing=true;this.preload(card.images[(next+1)%card.images.length]);this.timers.push(window.setTimeout(()=>card.changing=false,1250));});}
  private load(src:string):Promise<void>{if(typeof Image==='undefined')return Promise.resolve();return new Promise(resolve=>{const image=new Image();image.onload=()=>resolve();image.onerror=()=>resolve();image.src=src;if(image.complete)resolve();});}
  private preload(image:PortalImage|string):void{this.load(typeof image==='string'?image:image.src);}
}
