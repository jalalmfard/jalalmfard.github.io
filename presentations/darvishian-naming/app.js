const API = 'https://darvishian-ballot-api.jalal-m-fard1372.chatgpt.site';
const candidates = [
  {id:'wishi', fa:'ویشی', latin:'WISHI', story:'از دلِ «درویشیان» بیرون می‌آید. در نوشتار لاتین، W آن را به WISH یا آرزو نزدیک می‌کند. لحنش جوان، زنانه و بازیگوش است و می‌تواند زود سر زبان‌ها بیفتد.', traits:['ریشهٔ خانوادگی','لحن بازیگوش','ظرفیت ترند شدن']},
  {id:'wishe', fa:'ویشه', latin:'WĪSHÉ', story:'این اسم هم از «ویش»ِ درویشیان گرفته شده است. در نوشتار پیشنهادی، خط روی I و پایانِ É، ظاهر اسم را متمایز می‌کند و به آن حال‌وهوایی فرانسوی و شیک می‌دهد.', traits:['ریشهٔ خانوادگی','تایپوگرافی متمایز','لحن ظریف']},
  {id:'postdio', fa:'پستدیو', latin:'PESTDIO', story:'ترکیبی از پسته، پیستری و استودیو. پسته مادهٔ اصلی است و استودیو به تجربه‌کردن با طعم، بافت و فرم اشاره دارد. اسم در برخورد اول ناآشناست و می‌تواند کنجکاوی ایجاد کند.', traits:['هویت هنری','پیوند با پسته','اسم ابداعی']},
  {id:'duet', fa:'دوئت', latin:'DUET', story:'دو صدا در یک اجرا. دو خواهر با سلیقه‌های خودشان، پستهٔ باغ خانواده را به شیرینی تبدیل می‌کنند. استعارهٔ هم‌نوازی قصهٔ همکاری آن‌ها را در یک کلمه جا می‌دهد.', traits:['همکاری دو خواهر','استعارهٔ موسیقایی','کوتاه و خوش‌آوا']}
];
const $ = id => document.getElementById(id);
const fa = new Intl.NumberFormat('fa-IR',{maximumFractionDigits:1});
const route = new URLSearchParams(location.hash.slice(1));
const invite = route.get('invite');
const resultsToken = route.get('results');
const storageKey = 'darvishian-name-ballot-draft';
const byId = Object.fromEntries(candidates.map(candidate => [candidate.id,candidate]));
const buttons = new Map();
const order = [];
const scores = {};
let voterName = '';
let busy = false;

const make = (tag, text, className) => {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
};
async function request(path, token, payload) {
  const controller = new AbortController();
  const timeout = setTimeout(()=>controller.abort(),12000);
  try {
    const headers = {Authorization:'Bearer '+token};
    if (payload) headers['Content-Type']='application/json';
    const response = await fetch(API + path,{method:payload ? 'POST' : 'GET',headers,body:payload ? JSON.stringify(payload) : undefined,signal:controller.signal,cache:'no-store'});
    const json = await response.json();
    if (!response.ok) throw new Error(json.error || 'unavailable');
    return json;
  } finally { clearTimeout(timeout); }
}
function showOnly(id) {
  for (const key of ['entry','ballot','confirmation','results']) $(key).hidden = key !== id;
  $('ballot-heading').hidden = id !== 'ballot';
}
function persistDraft() {
  if (!invite) return;
  try { sessionStorage.setItem(storageKey,JSON.stringify({invite,voterName,order,scores})); } catch {}
}
function clearDraft() {
  try { sessionStorage.removeItem(storageKey); } catch {}
}
function restoreDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem(storageKey));
    if (draft?.invite !== invite || !Array.isArray(draft.order)) return;
    $('voter').value = typeof draft.voterName === 'string' ? draft.voterName : '';
    order.push(...new Set(draft.order.filter(id => Object.hasOwn(byId,id))));
    for (const {id} of candidates) {
      if (Number.isInteger(draft.scores?.[id]) && draft.scores[id] >= 1 && draft.scores[id] <= 10) scores[id] = draft.scores[id];
    }
  } catch {}
}
function setPriority(id) {
  const index = order.indexOf(id);
  if (index === -1) order.push(id);
  else order.splice(index,1);
  update();
  persistDraft();
}
function renderCandidates() {
  const fragment = document.createDocumentFragment();
  for (const {id,fa:label,latin,story,traits} of candidates) {
    const card = $('candidate-template').content.firstElementChild.cloneNode(true);
    card.classList.add(id);
    card.querySelector('.latin').textContent = latin;
    card.querySelector('h3').textContent = label;
    card.querySelector('.story').textContent = story;
    card.querySelector('.traits').append(...traits.map(text=>make('li',text)));
    const select = card.querySelector('select');
    select.setAttribute('aria-label','نمرهٔ '+label);
    for(let score=1;score<=10;score++){
      const option=make('option',fa.format(score)+' از ۱۰');
      option.value=String(score);
      select.add(option);
    }
    select.value = scores[id] ? String(scores[id]) : '';
    select.addEventListener('change',()=>{
      if (select.value) scores[id]=Number(select.value);
      else delete scores[id];
      update();
      persistDraft();
    });
    const button = card.querySelector('button');
    button.addEventListener('click',()=>setPriority(id));
    buttons.set(id,{card,button,select});
    fragment.append(card);
  }
  $('candidates').replaceChildren(fragment);
  update();
}
function update() {
  for(const [id,{card,button,select}] of buttons){
    const rank = order.indexOf(id) + 1;
    card.dataset.selected = String(rank > 0);
    button.setAttribute('aria-pressed', String(rank > 0));
    button.textContent = rank ? 'اولویت '+fa.format(rank) : 'افزودن به اولویت‌ها';
    button.setAttribute('aria-label',rank ? 'حذف '+byId[id].fa+' از اولویت '+fa.format(rank) : 'افزودن '+byId[id].fa+' به اولویت‌ها');
    button.disabled = busy;
    select.disabled = busy;
  }
  const slots = Array.from({length:4},(_,index)=>{
    const id=order[index];
    const slot=make('div',undefined,'slot'+(id?' has-name':''));
    slot.append(make('span','اولویت '+fa.format(index+1)),make('strong',id ? byId[id].fa : 'انتخاب نشده'));
    if(id){
      const remove=make('button','حذف','remove');
      remove.type='button';
      remove.disabled=busy;
      remove.setAttribute('aria-label','حذف '+byId[id].fa+' از اولویت‌ها');
      remove.addEventListener('click',()=>{setPriority(id);buttons.get(id).button.focus();});
      slot.append(remove);
    }
    return slot;
  });
  $('slots').replaceChildren(...slots);
  const scored=Object.keys(scores).length;
  $('progress').textContent=fa.format(order.length)+' از ۴ اولویت · '+fa.format(scored)+' از ۴ نمره';
  $('submit-ballot').disabled=busy || scored !== 4 || order.length !== 4;
}
function renderReceipt(ballot) {
  const list = make('ol');
  for(const id of ballot.ranking) list.append(make('li',byId[id].fa+'، نمرهٔ '+fa.format(ballot.scores[id])+' از ۱۰'));
  $('receipt').replaceChildren(list);
}
function confirmVote(ballot){
  clearDraft();
  if(ballot) renderReceipt(ballot);
  showOnly('confirmation');
  $('confirmation-title').focus();
}
function errorText(error) {
  if (error.message === 'invite') return 'این لینک دعوت معتبر نیست. لطفاً از لینک اختصاصی خودتان استفاده کنید.';
  if (error.message === 'name') return 'نام واردشده با نامِ دعوت‌نامه هم‌خوانی ندارد. به ابتدای صفحه برگردید و نام کامل را وارد کنید.';
  return 'ارتباط برقرار نشد. لطفاً دوباره امتحان کنید.';
}
$('identity').addEventListener('submit', async event=>{
  event.preventDefault();
  const name=$('voter').value.trim();
  if (!name) return;
  if(!invite){
    $('identity-status').textContent='برای ادامه، صفحه را با لینک دعوت اختصاصی خودتان باز کنید.';
    return;
  }
  const button = event.currentTarget.querySelector('button');
  button.disabled=true;
  $('identity-status').textContent='در حال بررسی دعوت‌نامه…';
  try{
    const session = await request('/session',invite);
    if(session.submitted) { confirmVote(session.ballot); return; }
    voterName=name;
    $('jury-name').textContent=voterName;
    persistDraft();
    renderCandidates();
    showOnly('ballot');
    $('ballot-heading').focus();
  }catch(error){$('identity-status').textContent=errorText(error);}
  finally{button.disabled=false;}
});
$('submit-ballot').addEventListener('click',async ()=>{
  if(busy || order.length!==4 || Object.keys(scores).length!==4) return;
  busy=true;
  update();
  $('ballot-status').textContent='در حال ثبت رأی…';
  try{
    await request('/ballot',invite,{name:voterName,ranking:order,scores});
    confirmVote({ranking:order,scores});
  }catch(error){
    if (error.message === 'duplicate') {
      try { const session=await request('/session',invite); if(session.submitted){confirmVote(session.ballot);return;} } catch {}
    }
    $('ballot-status').textContent=errorText(error);
    if(error.message==='name'){
      showOnly('entry');
      $('identity-status').textContent='نام و نام خانوادگی را مطابق دعوت‌نامه بنویسید.';
      $('voter').focus();
    }
  } finally {busy=false;update();}
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
async function loadResults() {
  showOnly('results');
  $('results-status').textContent='در حال دریافت…';
  try{
    const {ballots}=await request('/results',resultsToken);
    const submitted=ballots.filter(person=>person.ballot);
    $('results-status').textContent=fa.format(submitted.length)+' از '+fa.format(ballots.length)+' رأی ثبت شده';
    const totals=candidates.map(({id,fa:label})=>{
      const points=submitted.reduce((sum,{ballot})=>sum+4-ballot.ranking.indexOf(id),0);
      const sum=submitted.reduce((total,{ballot})=>total+ballot.scores[id],0);
      return {label,points,sum};
    }).sort((a,b)=>b.points-a.points || b.sum-a.sum);
    const summary=table(['نام','امتیاز رتبه‌بندی','میانگین نمره از ۱۰'],totals.map(({label,points,sum})=>[label,fa.format(points),submitted.length?fa.format(sum/submitted.length):'—']));
    const individual=table(['رأی‌دهنده','اولویت ۱','اولویت ۲','اولویت ۳','اولویت ۴'],ballots.map(({participant,ballot})=>[participant,...(ballot?ballot.ranking.map(id=>byId[id].fa+' ('+fa.format(ballot.scores[id])+')'):['در انتظار','—','—','—'])]));
    $('results-data').replaceChildren(make('p','رتبه‌های اول تا چهارم به‌ترتیب ۴ تا ۱ امتیاز دارند. در امتیاز برابر، میانگین نمره ملاک است.'),summary,make('h3','برگه‌های هیئت مشاوران'),individual);
  }catch(error){$('results-status').textContent=errorText(error);}
}
if(resultsToken) loadResults();
else restoreDraft();
