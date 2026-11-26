const API = 'https://darvishian-ballot-api.jalal-m-fard1372.chatgpt.site';
const candidates = [
  {id:'wishi', fa:'ویشی', latin:'WISHI', story:'از دلِ «درویشیان» بیرون می‌آید. در نوشتار لاتین، W آن را به WISH یا آرزو نزدیک می‌کند. لحنش جوان، زنانه و بازیگوش است و می‌تواند زود سر زبان‌ها بیفتد.', traits:['ریشهٔ خانوادگی','لحن بازیگوش','ظرفیت ترند شدن']},
  {id:'wishe', fa:'ویشه', latin:'WĪSHÉ', story:'این اسم هم از «ویش»ِ درویشیان گرفته شده است. در نوشتار پیشنهادی، خط روی I و پایانِ É، ظاهر اسم را متمایز می‌کند و به آن حال‌وهوایی فرانسوی و شیک می‌دهد.', traits:['ریشهٔ خانوادگی','تایپوگرافی متمایز','لحن ظریف']},
  {id:'postdio', fa:'پستدیو', latin:'PESTDIO', story:'ترکیبی از پسته، پیستری و استودیو. پسته مادهٔ اصلی است و استودیو به تجربه‌کردن با طعم، بافت و فرم اشاره دارد. اسم در برخورد اول ناآشناست و می‌تواند کنجکاوی ایجاد کند.', traits:['هویت هنری','پیوند با پسته','اسم ابداعی']},
  {id:'duet', fa:'دوئت', latin:'DUET', story:'دو صدا در یک اجرا. دو خواهر با سلیقه‌های خودشان، پستهٔ باغ خانواده را به شیرینی تبدیل می‌کنند. استعارهٔ هم‌نوازی قصهٔ همکاری آن‌ها را در یک کلمه جا می‌دهد.', traits:['همکاری دو خواهر','استعارهٔ موسیقایی','کوتاه و خوش‌آوا']}
];
const participants = ['نگین درویشیان','فائزه درویشیان','محمدرضا سیم‌ریز','تیم خلاقیت پارادایس','جلال مشهدی‌فرد','امیر برودی','افروز واعظی'];
const $ = id => document.getElementById(id);
const fa = new Intl.NumberFormat('fa-IR',{maximumFractionDigits:1});
const route = new URLSearchParams(location.hash.slice(1));
const invite = route.get('invite');
const resultsToken = route.get('results');
const byId = Object.fromEntries(candidates.map(candidate => [candidate.id,candidate]));
const controls = new Map();
const order = [];
const scores = {};
let identity = null;
let pendingGuestId;
let busy = false;

function make(tag,text,className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}
async function request(path,{token,payload} = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(()=>controller.abort(),15000);
  try {
    const headers = {};
    if (token) headers.Authorization='Bearer '+token;
    if (payload) headers['Content-Type']='text/plain;charset=UTF-8';
    const response=await fetch(API+path,{method:payload?'POST':'GET',headers,body:payload?JSON.stringify(payload):undefined,signal:controller.signal});
    const json=await response.json();
    if(!response.ok) throw new Error(json.error || 'unavailable');
    return json;
  } finally {clearTimeout(timeout);}
}
function guestId() {
  if(pendingGuestId) return pendingGuestId;
  try{pendingGuestId=localStorage.getItem('darvishian-guest-id');}catch{}
  if(!/^[0-9a-f]{32}$/.test(pendingGuestId || '')){
    pendingGuestId=[...crypto.getRandomValues(new Uint8Array(16))].map(x=>x.toString(16).padStart(2,'0')).join('');
    try{localStorage.setItem('darvishian-guest-id',pendingGuestId);}catch{}
  }
  return pendingGuestId;
}
function setPriority(id) {
  const index=order.indexOf(id);
  if(index===-1) order.push(id);
  else order.splice(index,1);
  update();
}
function buildCards() {
  for(const {id,fa:label,latin,story,traits} of candidates) {
    const card=$('candidate-template').content.firstElementChild.cloneNode(true);
    card.classList.add(id);
    card.querySelector('.latin').textContent=latin;
    card.querySelector('h2').textContent=label;
    card.querySelector('.story').textContent=story;
    card.querySelector('.traits').append(...traits.map(text=>make('li',text)));
    const select=card.querySelector('select');
    select.setAttribute('aria-label','نمرهٔ '+label);
    for(let score=1;score<=10;score++){
      const option=make('option',fa.format(score));
      option.value=String(score);
      select.add(option);
    }
    select.addEventListener('change',()=>{
      if(select.value) scores[id]=Number(select.value);
      else delete scores[id];
      update();
    });
    const button=card.querySelector('button');
    button.addEventListener('click',()=>setPriority(id));
    controls.set(id,{card,button,select,tag:card.querySelector('.rank-tag'),container:card.querySelector('.card-controls')});
    $('candidates').append(card);
  }
}
function slotButton(text,label,disabled,clicked){
  const button=make('button',text);
  button.type='button';
  button.disabled=disabled;
  button.setAttribute('aria-label',label);
  button.addEventListener('click',clicked);
  return button;
}
function shift(index,delta){
  const id=order[index];
  [order[index],order[index+delta]]=[order[index+delta],id];
  update();
  $('slots').children[index+delta].querySelector('button:not([disabled])')?.focus();
}
function update() {
  for(const [id,{card,button,select,tag,container}] of controls){
    const rank=order.indexOf(id)+1;
    container.hidden=!identity;
    card.dataset.selected=String(rank>0);
    tag.hidden=rank===0;
    tag.textContent='اولویت '+fa.format(rank);
    button.setAttribute('aria-pressed',String(rank>0));
    button.textContent=rank?'اولویت '+fa.format(rank)+' · حذف':'افزودن به اولویت‌ها';
    button.setAttribute('aria-label',rank?'حذف '+byId[id].fa+' از اولویت‌ها':'افزودن '+byId[id].fa+' به اولویت‌ها');
    button.disabled=busy;
    select.disabled=busy;
    select.value=scores[id]?String(scores[id]):'';
  }
  $('slots').replaceChildren(...Array.from({length:4},(_,index)=>{
    const id=order[index];
    const slot=make('li',undefined,'slot'+(id?' has-name':''));
    slot.append(make('span','اولویت '+fa.format(index+1)),make('strong',id?byId[id].fa:'انتخاب نشده'));
    if(id){
      const actions=make('div',undefined,'slot-actions');
      const label=byId[id].fa;
      actions.append(slotButton('رتبه بالاتر','اولویت بالاتر برای '+label,busy||index===0,()=>shift(index,-1)),slotButton('رتبه پایین‌تر','اولویت پایین‌تر برای '+label,busy||index===order.length-1,()=>shift(index,1)));
      slot.append(actions);
    }
    return slot;
  }));
  const scored=Object.keys(scores).length;
  $('progress').textContent=fa.format(order.length)+' از ۴ اولویت · '+fa.format(scored)+' از ۴ نمره';
  $('submit-ballot').disabled=busy||!identity||scored!==4||order.length!==4;
}
function confirmVote(ballot,already=false){
  const list=make('ol');
  if(ballot) for(const id of ballot.ranking) list.append(make('li',byId[id].fa+'، نمرهٔ '+fa.format(ballot.scores[id])+' از ۱۰'));
  $('receipt').replaceChildren(...(ballot?[list]:[]));
  $('confirmation-title').textContent=already?'یک رأی قبلاً ثبت شده':'رأی شما ثبت شد';
  $('confirmation-copy').textContent=already?'این رأی‌دهنده قبلاً رأی داده است.':'از وقتی که برای انتخاب نام گذاشتید، متشکریم.';
  $('experience').hidden=true;
  $('confirmation').hidden=false;
  $('confirmation-title').focus();
}
function reset(){
  identity=null;
  order.length=0;
  for(const id of Object.keys(scores)) delete scores[id];
  $('entry').hidden=false;
  $('experience').hidden=false;
  $('confirmation').hidden=true;
  $('ballot-meta').hidden=true;
  $('rank-board').hidden=true;
  $('identity-status').textContent='';
  $('ballot-status').textContent='';
  update();
  $('voter').focus();
}
const networkError='ارتباط برقرار نشد. چند لحظه صبر کنید و دوباره امتحان کنید.';
for(const [index,name] of participants.entries()){
  const option=make('option',name);
  option.value=String(index+1);
  $('voter').add(option);
}
const guestOption=make('option','مهمان');
guestOption.value='guest';
$('voter').add(guestOption);
$('voter').addEventListener('change',()=>{
  $('guest-field').hidden=$('voter').value!=='guest';
  $('identity-status').textContent='';
});
$('identity').addEventListener('submit',async event=>{
  event.preventDefault();
  const selection=$('voter').value;
  if(!selection) return;
  const next=selection==='guest'?{mode:'guest',device:guestId(),name:$('guest-name').value.trim()}:{mode:'panel',participant:Number(selection)};
  $('identity-submit').disabled=true;
  $('identity-status').textContent='در حال بررسی…';
  try{
    const state=await request('/access',{payload:next});
    if(state.submitted){confirmVote(state.ballot,true);return;}
    identity=next;
    $('entry').hidden=true;
    $('ballot-meta').hidden=false;
    $('rank-board').hidden=false;
    $('jury-name').textContent='رأی‌دهنده · '+(next.mode==='guest'?(next.name||'مهمان'):participants[next.participant-1]);
    update();
    controls.values().next().value.select.focus();
  }catch{$('identity-status').textContent=networkError;}
  finally{$('identity-submit').disabled=false;}
});
$('change-voter').addEventListener('click',reset);
$('return-to-page').addEventListener('click',reset);
$('submit-ballot').addEventListener('click',async ()=>{
  if(busy||!identity||order.length!==4||Object.keys(scores).length!==4) return;
  busy=true;
  update();
  $('ballot-status').textContent='در حال ثبت…';
  try{
    await request('/vote',{payload:{...identity,ranking:order,scores}});
    confirmVote({ranking:order,scores});
  }catch(error){
    if(error.message==='duplicate'){confirmVote(null,true);return;}
    $('ballot-status').textContent=networkError;
  }finally{busy=false;update();}
});
function table(headings,rows) {
  const wrap=make('div',undefined,'scroll-table');
  const table=make('table');
  const thead=make('thead');
  const header=make('tr');
  for(const title of headings){const th=make('th',title);th.scope='col';header.append(th);}
  thead.append(header);
  const tbody=make('tbody');
  for(const row of rows){const tr=make('tr');tr.append(...row.map(cell=>make('td',cell)));tbody.append(tr);}
  table.append(thead,tbody);
  wrap.append(table);
  return wrap;
}
function resultsTable(people){
  return table(['رأی‌دهنده','اولویت ۱','اولویت ۲','اولویت ۳','اولویت ۴'],people.map(({participant,ballot})=>[participant,...(ballot?ballot.ranking.map(id=>byId[id].fa+' ('+fa.format(ballot.scores[id])+')'):['در انتظار','—','—','—'])]));
}
function summaryTable(people){
  const submitted=people.filter(person=>person.ballot);
  const totals=candidates.map(({id,fa:label})=>{
    const points=submitted.reduce((sum,{ballot})=>sum+4-ballot.ranking.indexOf(id),0);
    const sum=submitted.reduce((total,{ballot})=>total+ballot.scores[id],0);
    return {label,points,sum};
  }).sort((a,b)=>b.points-a.points||b.sum-a.sum);
  return table(['نام','امتیاز رتبه‌بندی','میانگین نمره از ۱۰'],totals.map(({label,points,sum})=>[label,fa.format(points),submitted.length?fa.format(sum/submitted.length):'—']));
}
async function loadResults(){
  $('experience').hidden=true;
  $('results').hidden=false;
  $('results-status').textContent='در حال دریافت…';
  try{
    const {ballots,guestBallots=[]}=await request('/results',{token:resultsToken});
    $('results-status').textContent=fa.format(ballots.filter(person=>person.ballot).length)+' از ۷ رأی داوران · '+fa.format(guestBallots.length)+' رأی مهمان';
    $('results-data').replaceChildren(make('p','رتبه‌های اول تا چهارم به‌ترتیب ۴ تا ۱ امتیاز دارند. در صورت تساوی، میانگین نمره ملاک است.'),make('h2','نتایج داوران'),summaryTable(ballots),resultsTable(ballots),make('h2','نتایج مهمان‌ها'),summaryTable(guestBallots));
    if(guestBallots.length) $('results-data').append(resultsTable(guestBallots));
  }catch{$('results-status').textContent='دریافت نتایج ممکن نشد. لینک اختصاصی نتایج را بررسی کنید.';}
}
buildCards();
if(resultsToken) loadResults();
else if(invite) request('/session',{token:invite}).then(session=>{if(session.participant&&!$('voter').value)$('voter').value=String(session.participant);}).catch(()=>{});
