import { Component, OnDestroy, OnInit } from '@angular/core';

interface PortalCard { key:string; title:string; route:string; images:string[]; current:number; previous:number; changing:boolean; }
interface AwardMark { mark:string; name:string; }

@Component({selector:'app-home',templateUrl:'./home.component.html',styleUrls:['./home.component.css']})
export class HomeComponent implements OnInit,OnDestroy{
  cards:PortalCard[]=[
    this.card('architecture','Architecture & Interior Design','/architecture',[
      '/assets/images/main/slider/1515.jpg',
      '/assets/images/main/slider/1414.jpg',
      '/assets/images/main/slider/lookout.jpg',
      '/assets/images/publications/amazing-architecture/keluchick/2.jpg',
      '/assets/images/architecture/new-generation/new-generation-main.jpeg'
    ]),
    this.card('fashion','Fashion Design','/fashion',[
      '/assets/images/fashion/lumiere/campaign-cover.jpg',
      '/assets/images/fashion/lumiere/campaign-standing.jpg',
      '/assets/images/fashion/lumiere/studio-detail-front.jpg',
      '/assets/images/embodied-archetypes/29-demeter-garment.jpg',
      '/assets/images/embodied-archetypes/19-aphrodite-garment.jpg',
      '/assets/images/jewelry/hera/ring.jpg',
      '/assets/images/jewelry/hera/earrings.jpg',
      '/assets/images/jewelry/aphrodite/ring.jpg',
      '/assets/images/jewelry/demeter/earrings.jpg'
    ]),
    this.card('artworks','Artworks','/artworks',[
      '/assets/images/embodied-archetypes/03-persephone-art.jpg',
      '/assets/images/embodied-archetypes/08-hestia-art.jpg',
      '/assets/images/embodied-archetypes/18-aphrodite-art.jpg',
      '/assets/images/embodied-archetypes/33-athena-art.jpg',
      '/assets/images/main/slider/jan.jpg',
      '/assets/images/artworks/1.jpg'
    ]),
    this.card('exhibitions','Exhibitions','/exhibitions',[
      '/assets/images/embodied-archetypes/01-cover.jpg',
      '/assets/images/exhibitions/1.jpg',
      '/assets/images/exhibitions/Feelthe fann02.jpg',
      '/assets/images/exhibitions/design week.jpg',
      '/assets/images/exhibitions/nature.jpg',
      '/assets/images/exhibitions/Soo.jpg'
    ])
  ];
  awardMarks:AwardMark[]=[
    {mark:'A+',name:'Architizer A+Awards'},{mark:'LOOP',name:'Design Awards'},{mark:'DNA',name:'Paris Design Awards'},
    {mark:'AMP',name:'Architecture MasterPrize'},{mark:'AOTY',name:'Architecture of the Year'}
  ];
  private timers:number[]=[];private destroyed=false;
  ngOnInit():void{
    this.cards.forEach((card,index)=>{
      this.preload(card.images[0]);this.preload(card.images[1]);
      if(typeof window!=='undefined'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)this.timers.push(window.setTimeout(()=>this.start(card),index*420));
    });
  }
  ngOnDestroy():void{this.destroyed=true;this.timers.forEach(timer=>window.clearTimeout(timer));}
  current(card:PortalCard):string{return card.images[card.current];}
  old(card:PortalCard):string{return card.images[card.previous];}
  private card(key:string,title:string,route:string,images:string[]):PortalCard{return{key,title,route,images,current:0,previous:0,changing:false};}
  private start(card:PortalCard):void{const tick=()=>{if(this.destroyed)return;this.advance(card);this.timers.push(window.setTimeout(tick,4000));};this.timers.push(window.setTimeout(tick,4000));}
  private advance(card:PortalCard):void{if(card.changing)return;const next=(card.current+1)%card.images.length;this.load(card.images[next]).then(()=>{if(this.destroyed)return;card.previous=card.current;card.current=next;card.changing=true;this.preload(card.images[(next+1)%card.images.length]);this.timers.push(window.setTimeout(()=>card.changing=false,1250));});}
  private load(src:string):Promise<void>{if(typeof Image==='undefined')return Promise.resolve();return new Promise(resolve=>{const image=new Image();image.onload=()=>resolve();image.onerror=()=>resolve();image.src=src;if(image.complete)resolve();});}
  private preload(src:string):void{this.load(src);}
}
