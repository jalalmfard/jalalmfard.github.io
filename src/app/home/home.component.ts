import { Component, OnDestroy, OnInit } from '@angular/core';

interface PortalImage { src:string; position:string; }
interface PortalCard { key:string; title:string; route:string; images:PortalImage[]; current:number; previous:number; changing:boolean; }
interface AwardMark { name:string; logoSrc?:string; logoText?:string; dark?:boolean; }

@Component({selector:'app-home',templateUrl:'./home.component.html',styleUrls:['./home.component.css']})
export class HomeComponent implements OnInit,OnDestroy{
  cards:PortalCard[]=[
    this.card('architecture','Architecture & Interior Design','/architecture',[
      this.image('/assets/images/main/slider/1515.jpg'),this.image('/assets/images/main/slider/1414.jpg'),this.image('/assets/images/main/slider/lookout.jpg'),this.image('/assets/images/publications/amazing-architecture/keluchick/2.jpg'),this.image('/assets/images/architecture/new-generation-ahmadabad/facade.jpg'),this.image('/assets/images/architecture/new-generation-ahmadabad/balcony.jpg','92% center'),this.image('/assets/images/architecture/noor-residence/pool.jpg','center 48%')
    ]),
    this.card('fashion','Fashion Design','/fashion',[
      this.image('/assets/images/home/fashion-01.jpg','center 40%'),this.image('/assets/images/home/fashion-02.jpg','center 35%'),this.image('/assets/images/home/fashion-04.jpg','center 45%')
    ]),
    this.card('artworks','Artworks','/artworks',[
      this.image('/assets/images/home/artwork-01.webp','center 56%'),
      this.image('/assets/images/home/artwork-02.webp','center 58%'),
      this.image('/assets/images/home/artwork-04.webp','center 54%'),
      this.image('/assets/images/home/artwork-05.webp','center 42%')
    ]),
    this.card('product-design','Product Design','/furnituredesign',[
      this.image('/assets/images/product-design/dining/dining-cover.jpg'),this.image('/assets/images/product-design/carpet/carpet-cover.jpg'),this.image('/assets/images/product-design/watch/time-hunter.jpg')
    ])
  ];
  awardMarks:AwardMark[]=[
    {name:'A′ Design Award',logoSrc:'https://competition.adesignaward.com/images/square-logo-with-text-vertical-hires.jpg'},
    {name:'Architizer A+Awards',logoSrc:'https://architizer-uploads.s3.us-west-2.amazonaws.com/A%2BAwardsLogo_WhiteStacked.png',dark:true},
    {name:'LOOP Design Awards',logoSrc:'https://loopdesignawards.com/wp-content/uploads/2020/02/LOOP_awards_badge_2024.png'},
    {name:'DNA Paris Design Awards',logoSrc:'https://gehri.ch/content/uploads/2024/07/Paris_Design_Awards_Logo-992x620.jpg'},
    {name:'Architecture MasterPrize',logoSrc:'https://architectureprize.com/wp-content/uploads/2018/06/AM-logo-color-on-white-main.png'},
    {name:'Architecture of the Year Award',logoText:'هنرمعماری'},
    {name:'NY Product Design Awards',logoSrc:'https://nydesignawards.com/upload/winner/1637724570winner_2.png'},
    {name:'Shiraz Interior Architecture Award',logoText:'جایزه معماری شیراز'}
  ];
  private timers:number[]=[];private destroyed=false;
  ngOnInit():void{
    this.cards.forEach(card=>{this.preload(card.images[0]);this.preload(card.images[1]);});
    if(typeof window!=='undefined'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)this.startSynchronized();
  }
  ngOnDestroy():void{this.destroyed=true;this.timers.forEach(timer=>window.clearTimeout(timer));}
  current(card:PortalCard):PortalImage{return card.images[card.current];}
  old(card:PortalCard):PortalImage{return card.images[card.previous];}
  private image(src:string,position='center'):PortalImage{return{src,position};}
  private card(key:string,title:string,route:string,images:PortalImage[]):PortalCard{return{key,title,route,images,current:0,previous:0,changing:false};}
  private startSynchronized():void{
    const tick=()=>{if(this.destroyed)return;this.advanceAll();this.timers.push(window.setTimeout(tick,4500));};
    this.timers.push(window.setTimeout(tick,4500));
  }
  private advanceAll():void{
    if(this.cards.some(card=>card.changing))return;
    const nextIndexes=this.cards.map(card=>(card.current+1)%card.images.length);
    Promise.all(this.cards.map((card,index)=>this.load(card.images[nextIndexes[index]].src))).then(()=>{
      if(this.destroyed)return;
      this.cards.forEach((card,index)=>{
        card.previous=card.current;
        card.current=nextIndexes[index];
        card.changing=true;
        this.preload(card.images[(card.current+1)%card.images.length]);
      });
      this.timers.push(window.setTimeout(()=>this.cards.forEach(card=>card.changing=false),1250));
    });
  }
  private load(src:string):Promise<void>{if(typeof Image==='undefined')return Promise.resolve();return new Promise(resolve=>{const image=new Image();image.onload=()=>resolve();image.onerror=()=>resolve();image.src=src;if(image.complete)resolve();});}
  private preload(image:PortalImage|string):void{this.load(typeof image==='string'?image:image.src);}
}
