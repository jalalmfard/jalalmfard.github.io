let inkFrame=0,inkRun=0;
function cancelInkTransition(){cancelAnimationFrame(inkFrame);inkRun++;document.body.classList.remove('ink-active')}
function playInkTransition(rect,photo){cancelInkTransition();if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const run=inkRun,c=document.getElementById('ink-transition'),ctx=c.getContext('2d'),w=innerWidth,h=innerHeight;c.width=w*devicePixelRatio;c.height=h*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);
 const x=rect.left+rect.width/2,y=rect.top+rect.height/2,b=document.querySelector('.architecture-stage').getBoundingClientRect(),tx=b.left+b.width/2,ty=b.top+b.height*.55;
 document.body.classList.add('ink-active');const start=performance.now(),ease=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
 function frame(now){if(run!==inkRun)return;const t=(now-start)/1800,shrink=ease(t/.42),reveal=ease((t-.56)/.44);ctx.clearRect(0,0,w,h);ctx.fillStyle='#111211';ctx.fillRect(0,0,w,h);
 if(t<.44){ctx.save();ctx.translate(x+(tx-x)*shrink,y+(ty-y)*shrink);ctx.scale(1-shrink*.98,1-shrink*.98);ctx.fillStyle='#e6342c';ctx.font='700 '+rect.height*.77+'px Amiri';ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='rtl';ctx.fillText('سخن',0,0);ctx.restore()}
 if(t>.3&&t<.62){ctx.fillStyle='#e6342c';ctx.beginPath();ctx.arc(tx,ty,4,0,Math.PI*2);ctx.fill()}
 if(reveal>0){ctx.save();ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(tx,ty,reveal*Math.hypot(w,h),0,Math.PI*2);ctx.fill();ctx.restore()}
 if(t>=1){cancelInkTransition();return}inkFrame=requestAnimationFrame(frame)}inkFrame=requestAnimationFrame(frame)}
