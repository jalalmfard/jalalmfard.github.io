choices[1].reason='دغدغهٔ مشترک مخاطبان ما نیست.';
architectureContexts.forEach(c=>{c.caption='Swan · Arne Jacobsen · SAS Royal Hotel';c.titles=['',''];c.notes=['','']});
const question=$('.question-center');document.body.append(question);
const bilingual=(fa,en)=>`<span class="title-fa" lang="fa">${fa}</span><span class="title-en" lang="en" dir="ltr">${en}</span>`;
const fullQuestion='خانهٔ امروز با <span class="past-word">خاطرات گذشته</span> شکل می‌گیرد یا با <span class="future-word">رویای فردا</span>؟';
const fullQuestionEn="Is today's home shaped by memories of the past or dreams of tomorrow?";
$('#main-question').innerHTML=bilingual(fullQuestion,fullQuestionEn);
const eliteLogo=document.createElement('img');eliteLogo.src='assets/elite-logo.webp';eliteLogo.alt='لوگوی الیت';eliteLogo.className='elite-logo-small';$('.elite-wordmark').replaceChildren(eliteLogo);
$('.architecture-context').hidden=true;$('#chair').hidden=true;
$('#building').src='assets/royal-lounge-red.webp';$('#building').alt='صندلی قرمز Swan در سوئیت پانورامای هتل SAS Royal';
$('#building-next').src='assets/royal-exterior.webp';$('#building-next').alt='هتل SAS Royal اثر آرنه یاکوبسن';
const photoChapters=[
 {id:'exhibition-entry',image:'exhibition-entry.webp',alt:'ورودی نمایشگاه در بلک‌باکس سیاه؛ مخاطبان به فضای خانه وارد می‌شوند',label:'آغاز',entry:true},
 {id:'choice-paths',image:'choice-paths.jpeg',alt:'دوراهی انتخاب مخاطبان میان خاطرات گذشته و رویای فردا',label:'دوراهی',question:true},
 {id:'past-future-threshold',image:'past-future-threshold.jpeg',alt:'آستانهٔ گذشته و آینده؛ کلید رسیدن به آینده در گذشته پنهان است',label:'آستانه',question:true},
 {id:'courtyard-design',image:'courtyard-today.jpeg',alt:'بازخوانی امروز؛ طراحی حیاط مرکزی',label:'حیاط مرکزی',zone:'court'},
 {id:'courtyard-compare',image:'courtyard-today.jpeg',other:'courtyard-memory.jpeg',alt:'مقایسهٔ حیاط امروز و گذشته',label:'مقایسه',zone:'court'},
 {id:'dining-design',image:'dining-sculptural.jpeg',alt:'طراحی اصلی مهمانخانه با فرش قرمز',label:'مهمانخانه',zone:'hospitality'},
 {id:'dining-compare',image:'dining-sculptural.jpeg',other:'dining-brass.jpeg',alt:'مقایسهٔ دو چیدمان مهمانخانه',label:'مقایسه',zone:'hospitality'},
 {id:'living-design',image:'living-room.webp',alt:'نشیمن خانهٔ امروز با خاطرات گذشته',label:'نشیمن',zone:'living'},
 {id:'bedroom-design',image:'bedroom.webp',alt:'اتاق خواب خانهٔ امروز با خاطرات گذشته',label:'اتاق خواب',zone:'bedroom'},
 {id:'closet-design',image:'closet.webp',alt:'کلوزت اتاق خواب',label:'کلوزت',zone:'closet'},
 {id:'bathroom-design',image:'bathroom.webp',alt:'سرویس خانهٔ امروز با خاطرات گذشته',label:'سرویس',zone:'bathroom'},
 {id:'future-blackbox',image:'future-blackbox.webp',alt:'بلک‌باکس دوم؛ اینستالیشن نور و ویدیو آرت پیش از ورود به خانهٔ آینده',label:'بلک‌باکس',title:'پیش از ورود به خانهٔ آینده',titleEn:'Before entering the home of tomorrow',caption:'ورود به بلک‌باکس دوم؛ تجربهٔ اینستالیشن و ویدیو آرت برای مخاطب.'},
 {id:'future-lobby',image:'future-lobby.webp',alt:'لابی خانهٔ امروز با رویای فردا',label:'لابی',zone:'f-lobby',future:true},
 {id:'future-kitchen',image:'future-kitchen.webp',alt:'آشپزخانهٔ خانهٔ امروز با رویای فردا',label:'آشپزخانه',zone:'f-kitchen',future:true},
 {id:'future-hall',image:'future-hall.webp',alt:'هال خانهٔ امروز با رویای فردا',label:'هال',zone:'f-hall',future:true},
 {id:'future-patio',image:'future-patio.webp',alt:'حیاط‌خلوت در بخش قوس‌دار پلان',label:'حیاط‌خلوت',zone:'f-patio',future:true},
 {id:'future-dining',image:'future-dining.webp',alt:'میز بار و میز غذاخوری',label:'بار و غذاخوری',zone:'f-dining',future:true},
 {id:'future-work',image:'future-work.webp',alt:'فضای کار خانهٔ امروز با رویای فردا',label:'فضای کار',zone:'f-work',future:true},
 {id:'future-bedroom',image:'future-bedroom.webp',alt:'اتاق خواب خانهٔ امروز با رویای فردا',label:'اتاق خواب',zone:'f-bedroom',future:true},
 {id:'future-closet',image:'future-closet.webp',alt:'کلوزت خانهٔ امروز با رویای فردا',label:'کلوزت',zone:'f-closet',future:true},
 {id:'future-bathroom',image:'future-bathroom.webp',alt:'سرویس خانهٔ امروز با رویای فردا',label:'سرویس',zone:'f-bathroom',future:true},
 {id:'future-terrace',image:'future-terrace.webp',alt:'تراس خانهٔ امروز با رویای فردا',label:'تراس',zone:'f-terrace',future:true},
 {id:'exhibition-plan',label:'پلان کلی',title:'پلان کلی نمایشگاه',titleEn:'Exhibition master plan',overview:true},
 {id:'bedrooms-compare',image:'bedroom.webp',other:'future-bedroom.webp',alt:'مقایسهٔ اتاق خواب دو خانه',label:'مقایسهٔ خواب',title:'انعطاف در انتخاب محصولات و متریال‌ها',titleEn:'Flexibility in choosing products and materials',aligned:true},
 {id:'courtyard-lobby-compare',image:'courtyard-today.jpeg',other:'future-lobby.webp',alt:'مقایسهٔ حیاط مرکزی و لابی',label:'مقایسهٔ فضا',title:'انعطاف در انتخاب محصولات و متریال‌ها',titleEn:'Flexibility in choosing products and materials',aligned:true},
 {id:'closing-signature',label:'پایان',closing:true}];
const planZones={
 court:{name:'حیاط مرکزی',points:'586,356 951,356 951,696 586,696',dot:[721,536]},
 hospitality:{name:'مهمانخانه',points:'468,696 1094,696 1094,900 850,900 850,941 468,941',dot:[725,798]},
 living:{name:'نشیمن',points:'104,332 407,332 407,605 468,605 468,941 104,941',dot:[265,680]},
 bedroom:{name:'اتاق خواب',points:'104,28 447,28 447,87 408,87 408,331 317,331 317,291 219,291 219,218 104,218',dot:[275,143]},
 closet:{name:'کلوزت',points:'447,28 510,28 510,87 551,87 551,199 659,199 659,319 551,319 551,356 408,356 408,87 447,87',dot:[493,244]},
 bathroom:{name:'سرویس',points:'610,28 735,28 735,276 659,276 659,199 551,199 551,87 610,87',dot:[647,126]}
};
const futureZones={
 'f-lobby':{name:'لابی',d:'M578 1086H841V1387H618V1324H556V1219H578Z',dot:[709,1212]},
 'f-kitchen':{name:'آشپزخانه',d:'M342 958H486Q560 978 578 1050V1153H342Z',dot:[421,1080]},
 'f-hall':{name:'هال',d:'M136 958H342V1220H257Q108 1175 89 1044Z',dot:[230,1090]},
 'f-patio':{name:'حیاط‌خلوت',d:'M89 1044Q108 1175 257 1220H44Q45 1126 89 1044Z',dot:[106,1179]},
 'f-dining':{name:'بار و میز غذاخوری',d:'M342 958H486Q560 978 578 1050V1153H342Z',dot:[411,1037]},
 'f-work':{name:'فضای کار',d:'M136 958Q229 854 370 802V958Z',dot:[307,881]},
 'f-bedroom':{name:'اتاق خواب',d:'M370 794H583V958H370Z',dot:[472,876]},
 'f-closet':{name:'کلوزت',d:'M583 794H684V990H583Z',dot:[635,875]},
 'f-bathroom':{name:'سرویس',d:'M684 794H779V990H684Z',dot:[730,904]},
 'f-terrace':{name:'تراس',d:'M556 991H841V1086H556Z',dot:[698,1035]}
};
function planMarkup(zone){const future=zone.startsWith('f-'),z=future?futureZones[zone]:planZones[zone];const visual=future?`<svg viewBox="20 750 865 680" role="img" aria-label="پلان خانهٔ امروز با رویای فردا"><image href="assets/future-plan.png" width="945" height="2048"/><path d="${z.d}"/><circle cx="${z.dot[0]}" cy="${z.dot[1]}" r="13"/></svg>`:`<img src="assets/house-plan.webp" alt="پلان خانه"><svg viewBox="0 0 1179 1010" aria-hidden="true"><polygon points="${z.points}"/><circle cx="${z.dot[0]}" cy="${z.dot[1]}" r="18"/></svg>`;return `<button class="plan-inset ${future?'future-plan-inset':''}" aria-label="پلان؛ موقعیت ${z.name}، بزرگ‌نمایی" aria-expanded="false"><span class="plan-image">${visual}</span><span class="plan-label">${z.name}</span></button>`}
photoChapters.forEach(c=>{const s=document.createElement('section');s.id=c.id;s.className='chapter photo-chapter';s.hidden=true;
 if(c.entry)s.classList.add('entry-chapter');
 if(c.caption)s.classList.add('entry-chapter');if(c.aligned)s.classList.add('aligned-comparison');
 s.innerHTML=c.closing?'<div class="closing-signature"><img src="assets/signature.png" alt="امضای جلال مشهدی فرد"><a href="https://jalalmfard.com" target="_blank" rel="noopener">jalalmfard.com</a><div class="closing-elite"><img src="assets/elite-logo.webp" alt="لوگوی الیت"><span lang="fa">الیت هوم مشهد</span><span lang="en" dir="ltr">ELITE HOME · MASHHAD</span></div></div>':c.overview?'<div class="photo-frame overview-frame"><svg viewBox="20 520 900 1120" role="img" aria-label="پلان کلی نمایشگاه"><image href="assets/exhibition-plan.png" width="945" height="2048"/></svg></div>':`<div class="photo-frame ${c.other?'image-comparison':''}" style="--reveal:50%"><img src="assets/${c.image}" alt="${c.alt}">${c.other?`<img class="comparison-overlay" src="assets/${c.other}" alt="تصویر مقایسه"><div class="comparison-divider"><span>↔</span></div><input class="comparison-range" type="range" min="0" max="100" value="50" aria-label="مقایسهٔ تصاویر">`:''}</div>${c.zone?planMarkup(c.zone):''}${c.entry?'<div class="entry-caption"><span>آغاز نمایشگاه</span><p>این پرسش در بلک‌باکس سیاه با مخاطب مطرح می‌شود؛ ورود به نمایشگاه از اینجا آغاز می‌شود.</p></div>':''}${c.caption?`<div class="entry-caption"><p>${c.caption}</p></div>`:''}`;$('main').append(s);
 const plan=s.querySelector('.plan-inset');if(plan)plan.onclick=()=>{const expanded=plan.getAttribute('aria-expanded')!=='true';plan.setAttribute('aria-expanded',expanded);plan.classList.toggle('expanded-plan',expanded)};
 if(c.other){const f=s.firstElementChild,r=s.querySelector('input');const update=v=>{v=Math.max(0,Math.min(100,v));r.value=v;f.style.setProperty('--reveal',v+'%')};r.oninput=()=>update(+r.value);let drag=false;const move=e=>{const b=f.getBoundingClientRect();update((e.clientX-b.left)/b.width*100)};f.onpointerdown=e=>{if(e.target===r)return;drag=true;f.setPointerCapture(e.pointerId);move(e)};f.onpointermove=e=>{if(drag)move(e)};f.onpointerup=f.onpointercancel=()=>drag=false;}});
const oldSetChapter=setChapter;
renderArchitecture=function(a,b){const im=$('#building'),ex=$('#building-next'),box=$('.architecture-stage').getBoundingClientRect();
 // Retain the actual chair pixels: expand the photograph around the focal point.
 const fit=Math.min(box.width/2400,box.height/1800),z=3.1-2.1*a,w=2400*fit*z,h=1800*fit*z;
 im.style.width=w+'px';im.style.height=h+'px';im.style.left=(box.width/2-w*(.692-(.692-.5)*a))+'px';im.style.top=(box.height*.55-h*(.719-(.719-.5)*a))+'px';im.style.transform='none';im.style.opacity=1;
 im.style.clipPath=`inset(${(1-a)*55}% ${(1-a)*20}% ${(1-a)*11}% ${(1-a)*58}% round ${(1-a)*12}px)`;
 ex.style.opacity=b;ex.style.transform='none';$('#asset-caption').textContent=b>.5?'SAS Royal Hotel · Arne Jacobsen':'Swan · Arne Jacobsen · SAS Royal Hotel';};
const lastChapter=photoChapters.length+5;
setChapter=function(i,morph=false){i=Math.max(0,Math.min(lastChapter,i));const prior=chapter,rect=$('#word').getBoundingClientRect();oldSetChapter(Math.min(i,5),false);chapter=i;
 document.body.dataset.chapter=i;document.body.classList.toggle('photo-mode',i>=6);document.body.classList.toggle('ending',![0,1,3].includes(i));
 if(i>=6)$$('.chapter').forEach(s=>{const show=s.id===photoChapters[i-6].id;s.hidden=!show;s.classList.toggle('active',show)});
 const visual=i>=6?photoChapters[i-6]:null;question.hidden=i<4||!!visual?.closing;question.classList.toggle('question-top',i>=6);const useQuestion=i<7||visual?.question; const titleFa=useQuestion?fullQuestion:(visual.title||(visual.future?'خانهٔ امروز با <span class="future-word">رویای فردا</span>':'خانهٔ امروز با <span class="past-word">خاطرات گذشته</span>')); const titleEn=useQuestion?fullQuestionEn:(visual.titleEn||(visual.future?"Today's home, with tomorrow's dreams":"Today's home, with memories of the past")); $('#main-question').innerHTML=bilingual(titleFa,titleEn);
 document.body.classList.toggle('closing-mode',!!visual?.closing);
 $('#chapter-counter').textContent=String(i+1).padStart(2,'0')+' / '+(lastChapter+1);$('#next').textContent=i===lastChapter?'از ابتدا':'بعد';$('#drag-instruction').textContent='';
 $$('[data-chapter]').forEach(b=>{b.classList.toggle('active',+b.dataset.chapter===i);b.setAttribute('aria-current',+b.dataset.chapter===i?'step':'false')});
 if(morph&&prior===0&&i===1){values[1]=0;render();playInkTransition(rect,$('#building'))}};
next=function(){if(chapter===3&&values[3]<190){animateTo(Math.min(200,Math.round(values[3]/100)*100+100));return}if(chapter===lastChapter){restart();return}setChapter(chapter+1,chapter===0)};$('#next').onclick=next;
const nav=$('header nav');$$('[data-chapter]').filter(b=>+b.dataset.chapter>=6).forEach(b=>b.remove());photoChapters.forEach((c,k)=>{const b=document.createElement('button');b.dataset.chapter=k+6;b.innerHTML=`${c.label}<span>${String(k+7).padStart(2,'0')}</span>`;b.onclick=()=>setChapter(k+6);nav.append(b)});
setChapter(0);
