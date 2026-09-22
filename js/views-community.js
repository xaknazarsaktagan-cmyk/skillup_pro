/* ================= VIEWS 2 ================= */
const extUrl=s=>'https://'+esc(String(s).replace(/^https?:\/\//,''));
const link=s=>s?`<a href="${extUrl(s)}" target="_blank" rel="noopener noreferrer">${esc(String(s).replace(/^https?:\/\//,''))}</a>`:'';
const stars=r=>r?`<span class="stars" aria-label="Рейтинг ${r.toFixed(1)} из 5">${ic('star',13)} ${r.toFixed(1)}</span>`:'<span class="mut sm">Нет отзывов</span>';
const uLink=un=>{const x=DB.users[un];return x?`<a href="#/profile/${un}">${esc(x.name)}</a>`:esc(un);};

/* ---------- bookmarks / follow / share ---------- */
ACT.bm=(el,type,id)=>{const u=me(),k=type+':'+id,i=u.bm.indexOf(k);i>=0?u.bm.splice(i,1):u.bm.push(k);save();toast(i>=0?'Убрано из сохранённого.':'Сохранено.');render();};
ACT.follow=(el,un)=>{const u=me(),i=u.following.indexOf(un);if(i>=0)u.following.splice(i,1);else{u.following.push(un);notify(un,u.name+' подписался на вас.');}save();render();};
ACT.share=async(el,path)=>{const url=location.href.split('#')[0]+'#/'+path;try{await navigator.clipboard.writeText(url);toast('Ссылка скопирована.');}catch(e){modal(`<h3>Ссылка</h3><input readonly value="${esc(url)}" onclick="this.select()"><div class="row g"><button class="btn" data-act="closemodal">Закрыть</button></div>`);}};

/* ---------- certificates ---------- */
const certCard=(ct,pub)=>{const c=getCourse(ct.course),u=DB.users[ct.user];return `<div class="cert"><div class="cert-in"><span class="cert-brand">${brandIcon()} Skill Up</span><p class="mut">Настоящим подтверждается, что</p><h2>${esc(u?u.name:ct.user)}</h2><p class="mut">успешно завершил(а) курс и сдал(а) итоговый экзамен</p><h3>${esc(c?c.t:ct.course)}</h3><div class="cmeta"><div><span class="mut sm">Уровень</span><b>${esc(ct.level)}</b></div><div><span class="mut sm">Дата</span><b>${fdate(ct.date)}</b></div><div><span class="mut sm">Номер</span><b>${ct.id}</b></div></div></div></div>`;};
/* compact card for the Certificates grid: preview thumbnail + title/description + actions.
   Used both for real, earned certificates and for the sample cards below them. */
const ccMini=({title,desc,thumbTitle,name,meta,sample,actions})=>`<div class="cc${sample?' cc-sample':''}">
  <div class="cc-thumb">
   ${sample?`<span class="chip sm cc-samplechip">Пример</span>`:''}
   <span class="cc-badge">${brandIcon()} Skill Up</span>
   <div class="cc-seal">${ic('award',18)}</div>
   <b class="cc-ttl">${esc(thumbTitle||title)}</b>
   <span class="cc-name">${esc(name)}</span>
  </div>
  <div class="cc-body">
   <h3>${esc(title)}</h3>
   <p class="mut sm">${esc(desc)}</p>
   <div class="cc-meta mut sm">${meta}</div>
  </div>
  <div class="cc-actions">${actions}</div>
 </div>`;
V.certificates=()=>{
  const u=me(),mine=Object.values(DB.certs).filter(c=>c.user===u.username);
  const mineHtml=mine.length?`<div class="certsec"><div class="certgrid">${mine.map(c=>{
    const co=getCourse(c.course),title=co?co.t:c.course;
    const desc=co&&co.sub?co.sub:'Сертификат подтверждает успешное прохождение курса и сдачу итогового экзамена.';
    const meta=`<span>Выдан: Skill Up</span><span>·</span><span>${fdate(c.date)}</span><span>·</span><span>${esc(c.level)}</span>`;
    const actions=`<a class="btn sm" href="#/certificate/${c.id}">Открыть сертификат</a><button class="btn ghost sm" data-act="dlcert:${c.id}">Скачать</button>`;
    return ccMini({title,desc,meta,name:u.name,actions});
   }).join('')}</div></div>`
   :empty('Сертификатов пока нет','Пройдите курс и сдайте итоговый экзамен — сертификат появится здесь.','<a class="btn" href="#/learn">Выбрать курс</a>');
  const samplesHtml=`<h2 class="sec">Примеры сертификатов</h2><p class="mut certsec-sub">Так выглядят сертификаты Skill Up. Это примеры дизайна — настоящий сертификат появится здесь после прохождения курса.</p>
   <div class="certgrid">${SAMPLE_CERTS.map(s=>{
     const meta=`<span>Выдан: Skill Up</span><span>·</span><span>${s.hours} ч</span>`;
     const actions=`<button class="btn ghost sm" data-act="viewsample:${s.id}">Предпросмотр</button>`+(s.course?`<a class="btn sm" href="#/course/${s.course}">Пройти курс</a>`:`<a class="btn sm" href="#/learn">Выбрать курс</a>`);
     return ccMini({title:s.title,desc:s.desc,meta,name:u.name,sample:true,actions});
   }).join('')}</div>`;
  return shell(pageHead('Сертификаты','Ваши завершённые учебные достижения.')+mineHtml+samplesHtml,'certificates');
};
ACT.dlcert=(el,id)=>{location.hash='#/certificate/'+id;setTimeout(()=>{try{window.print();}catch(e){}},300);};
ACT.viewsample=(el,id)=>{
  const s=SAMPLE_CERTS.find(x=>x.id===id);if(!s)return;const u=me();
  modal(`<div class="verify"><span class="chip">Пример сертификата</span></div><div class="cert"><div class="cert-in"><span class="cert-brand">${brandIcon()} Skill Up</span><p class="mut">Настоящим подтверждается, что</p><h2>${esc(u?u.name:'Имя студента')}</h2><p class="mut">успешно завершил(а) курс и сдал(а) итоговый экзамен</p><h3>${esc(s.title)}</h3><div class="cmeta"><div><span class="mut sm">Длительность</span><b>${s.hours} ч</b></div><div><span class="mut sm">Дата</span><b>${fdate(today())}</b></div><div><span class="mut sm">Номер</span><b>SAMPLE-000000</b></div></div></div></div><p class="mut sm">Это пример дизайна, а не настоящий сертификат. Он не подтверждает прохождение курса.</p><div class="row g wrap"><button class="btn ghost" data-act="closemodal">Закрыть</button>${s.course?`<a class="btn" href="#/course/${s.course}">Перейти к курсу</a>`:''}</div>`);
};
V.certPublic=id=>{
  const ct=DB.certs[String(id||'').toUpperCase()];
  if(!ct)return page(errorState('Сертификат не найден','Проверьте номер: он выглядит как CERT-123456. В прототипе проверка работает по данным этого браузера.','<a class="btn" href="#/">На главную</a>'),'');
  return page(`<div class="verify"><span class="chip ok">${ic('check',13)} Сертификат подлинный</span></div>${certCard(ct,true)}<div class="row g wrap cact"><button class="btn" data-act="print">Скачать PDF / Печать</button><button class="btn ghost" data-act="share:certificate/${ct.id}">Поделиться</button></div><p class="mut sm">Проверка: /certificate/${ct.id}. Вкладка печати позволяет сохранить сертификат как PDF.</p>`,'certificates');
};
ACT.print=()=>{try{window.print();}catch(e){toast('Печать недоступна в этом окне. Откройте страницу в новой вкладке.','err');}};

/* ---------- leaderboard ---------- */
V.leaderboard=()=>{
  const u=me(),P=UI.lb;
  const rows=Object.values(DB.users).filter(x=>x.role!=='admin').map(x=>({x,xp:P==='week'?dayXp(x,7):P==='month'?dayXp(x,30):x.xp})).sort((a,b)=>b.xp-a.xp);
  return shell(pageHead('Рейтинг','Рейтинг — один из способов сравнить прогресс, а не единственный. Ваш путь важнее места в таблице.')+`<div class="tabs" role="tablist">${[['all','Всего'],['week','Неделя'],['month','Месяц']].map(t=>`<button class="tab ${P===t[0]?'on':''}" role="tab" aria-selected="${P===t[0]}" data-act="lb:${t[0]}">${t[1]}</button>`).join('')}</div>
  <div class="card"><table class="lbt"><tr><th>#</th><th>Разработчик</th><th class="r">XP</th></tr>${rows.map((r,i)=>`<tr class="${r.x.username===u.username?'me':''}"><td>${i+1}</td><td><a class="row g" href="#/profile/${r.x.username}">${avatar(r.x,'s')}<span><b>${esc(r.x.name)}</b> <span class="mut sm">@${r.x.username}</span></span></a></td><td class="r"><b>${r.xp}</b></td></tr>`).join('')}</table></div>`,'leaderboard');
};
ACT.lb=(el,p)=>{UI.lb=p;render();};

/* ---------- marketplace ---------- */
const projArt=(p,big)=>p.img?`<div class="pa img ${big?'big':''}"><img src="${p.img}" alt="Превью проекта ${esc(p.title)}"></div>`:`<div class="pa t${p.tone||0} ${big?'big':''}" aria-hidden="true"><div class="win"><i></i><i></i><i></i></div><div class="ln w1"></div><div class="ln w2"></div><div class="ln w3"></div><span class="tg">${esc(p.tech[0]||'')}</span></div>`;

/* ---------- "Мои проекты": real, deployed projects (MY_PROJECTS in js/data.js) ----------
   Each card shows a live scaled-down preview of the actual deployed site (an iframe,
   not a static placeholder) and opens the real URL in a new tab. Pure render function
   of one MY_PROJECTS entry, so adding a project to the data array is enough — no
   layout changes needed. */
const myProjectCard=p=>`<a class="card hov live-card" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="Открыть проект «${esc(p.title)}» в новой вкладке">
 <div class="live-pv" aria-hidden="true"><div class="live-frame"><iframe src="${esc(p.url)}" tabindex="-1" loading="lazy" scrolling="no" title="Превью проекта ${esc(p.title)}"></iframe></div><span class="live-badge"><i></i>Live</span></div>
 <div class="live-body">
  <b>${esc(p.title)}</b>
  <p class="mut sm">${esc(p.desc)}</p>
  <div class="chips">${p.tech.map(t=>chip(t)).join('')}</div>
  <span class="live-cta">Открыть проект →</span>
 </div>
</a>`;

V.projects=()=>{
  const u=me(),F=UI.pf;
  let list=DB.projects.filter(p=>(!F.cat||p.cat===F.cat)&&(!F.price||(F.price==='free'?!p.price:!!p.price))&&(!F.q||(p.title+' '+p.tech.join(' ')).toLowerCase().includes(F.q.toLowerCase())));
  list=list.slice().sort((a,b)=>F.sort==='pop'?b.sold-a.sold:F.sort==='price'?a.price-b.price:b.date.localeCompare(a.date));
  return shell(pageHead('Проекты','Практика становится портфолио: от учебных задач до готовых, развёрнутых продуктов.',`<a class="btn ghost" href="#/my-projects">Мои публикации</a><a class="btn" href="#/projects/new">${ic('plus',15)}Опубликовать</a>`)
   +(MY_PROJECTS.length?`<section class="showcase-projects">
     <h2 class="sec" style="margin-top:0">Реальные проекты</h2>
     <p class="mut sm showcase-sub">Learn → Practice → Build → Showcase — это уже развёрнутые в сети работы, а не учебные заготовки. Открывайте и пробуйте вживую.</p>
     <div class="grid3">${MY_PROJECTS.map(myProjectCard).join('')}</div>
    </section>
    <h2 class="sec">Каталог сообщества</h2>
    <p class="mut sm showcase-sub">Готовые работы других участников платформы — бесплатные и платные.</p>`:'')
   +`<div class="chips fchips"><button class="chip btnchip ${F.cat?'':'on'}" data-act="pcat:">Все</button>${CATS.map(c=>`<button class="chip btnchip ${F.cat===c?'on':''}" data-act="pcat:${c}">${c}</button>`).join('')}</div>
   <div class="filters"><label class="fl">Цена<select data-chg="pf:price"><option value="">Любая</option><option value="free" ${F.price==='free'?'selected':''}>Бесплатные</option><option value="paid" ${F.price==='paid'?'selected':''}>Платные</option></select></label><label class="fl">Сортировка<select data-chg="pf:sort"><option value="new">Новые</option><option value="pop" ${F.sort==='pop'?'selected':''}>Популярные</option><option value="price" ${F.sort==='price'?'selected':''}>По цене</option></select></label></div>
   ${list.length?`<div class="grid3">${list.map(p=>`<a class="card proj hov" href="#/project/${p.id}">${projArt(p)}<div class="pb"><b>${esc(p.title)}</b><div class="mut sm">${esc(DB.users[p.author]?DB.users[p.author].name:p.author)} · ${esc(p.tech.slice(0,3).join(', '))}</div><div class="row sb"><b>${money(p.price)}</b>${stars(rating(p))}</div></div></a>`).join('')}</div>`:empty('Проектов не найдено','Попробуйте другую категорию или опубликуйте свой проект.','<a class="btn" href="#/projects/new">Опубликовать проект</a>')}`,'projects');
};
ACT.pcat=(el,c)=>{UI.pf.cat=c||'';render();};
CHG.pf=(el,k)=>{UI.pf[k]=el.value;render();};
const bought=(u,p)=>DB.purchases.some(x=>x.buyer===u.username&&x.projectId===p.id);
V.project=id=>{
  const u=me(),p=DB.projects.find(x=>x.id===id);if(!p)return notFound();
  const own=p.author===u.username,has=bought(u,p),access=own||has||!p.price,rv=p.reviews,canRev=!own&&!rv.some(r=>r.u===u.username);
  const buy=own?'<span class="chip">Это ваш проект</span>':has?'<span class="chip ok">Куплено — доступно в «Мои проекты»</span>':p.price?`<button class="btn lg" data-act="buy:${p.id}">Купить за ${money(p.price)}</button>`:`<button class="btn lg" data-act="getfree:${p.id}">Получить бесплатно</button>`;
  return shell(`<a class="mut sm" href="#/projects">← Проекты</a><div class="pgrid"><section>${projArt(p,true)}<h1>${esc(p.title)}</h1><p class="mut">Автор: ${uLink(p.author)} · ${fdate(p.date)} · ${pl(p.sold,['покупка','покупки','покупок'])}</p><div class="chips">${chip(p.cat,'acc')}${p.tech.map(t=>chip(t)).join('')}</div><div class="prose"><p>${esc(p.desc)}</p></div><h3>Возможности</h3><ul class="feat">${p.feats.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>
   <h3>Ссылки</h3><p>${p.demo?`Демо: ${link(p.demo)}<br>`:''}${p.github?(access?`GitHub: ${link(p.github)}`:'<span class="mut">Ссылка на исходный код откроется после покупки.</span>'):''}${!p.demo&&!p.github?'<span class="mut">Автор не добавил ссылки.</span>':''}</p>
   <h3>Отзывы ${rv.length?`(${rv.length})`:''}</h3>${rv.length?rv.map(r=>`<div class="rv"><div class="row sb"><b>${uLink(r.u)}</b>${stars(r.rating)}</div><p>${esc(r.text)}</p></div>`).join(''):'<p class="mut">Отзывов пока нет.</p>'}
   ${canRev?`<form class="card pad" data-form="review"><input type="hidden" name="pid" value="${p.id}"><label>Оценка<select name="rating"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></label><label>Отзыв<textarea name="text" rows="3" required placeholder="Что понравилось, что можно улучшить"></textarea></label><p class="ferr" hidden role="alert"></p><button class="btn" type="submit">Оставить отзыв</button></form>`:''}</section>
   <aside class="card pad buy"><div class="price">${money(p.price)}</div>${stars(rating(p))}${buy}<div class="row g wrap">${saveBtn('project:'+p.id,DB.users[u.username].bm.includes('project:'+p.id)?'В избранном':'В избранное')}<button class="btn ghost sm" data-act="share:project/${p.id}">Поделиться</button>${own?'':`<button class="btn ghost sm" data-act="report:${p.id}">Пожаловаться</button>`}</div></aside></div>`,'projects',true);
};
ACT.buy=(el,id)=>{const p=DB.projects.find(x=>x.id===id);modal(`<h3>Покупка проекта</h3><p><b>${esc(p.title)}</b><br>${money(p.price)}</p><p class="note">Демо-оплата: платёжный провайдер не подключён, деньги не списываются. В боевой версии оплата пойдёт через провайдера (например Kaspi или банковский эквайринг) на стороне сервера — данные карт платформа не хранит.</p><div class="row g"><button class="btn" data-act="buyok:${id}">Подтвердить демо-покупку</button><button class="btn ghost" data-act="closemodal">Отмена</button></div>`);};
function purchase(id){
  const u=me(),p=DB.projects.find(x=>x.id===id);if(!p||p.author===u.username||bought(u,p))return;
  DB.purchases.push({id:uid('o'),projectId:id,buyer:u.username,seller:p.author,price:p.price,date:today()});p.sold++;
  notify(p.author,(p.price?'Ваш проект «'+p.title+'» купил(а) ':'Ваш проект «'+p.title+'» получил(а) ')+u.name+'.');
  logAct(u,(p.price?'Куплен':'Получен')+' проект «'+p.title+'»');save();closeModal();toast(p.price?'Покупка оформлена (демо).':'Проект добавлен в «Мои проекты».');render();
}
ACT.buyok=(el,id)=>purchase(id);ACT.getfree=(el,id)=>purchase(id);
ACT.report=(el,id)=>modal(`<h3>Пожаловаться на проект</h3><form data-form="report"><input type="hidden" name="pid" value="${id}"><label>Причина<textarea name="text" rows="3" required data-focus placeholder="Опишите, что не так"></textarea></label><p class="ferr" hidden role="alert"></p><div class="row g"><button class="btn" type="submit">Отправить</button><button class="btn ghost" type="button" data-act="closemodal">Отмена</button></div></form>`);
FORM.report=(f,d)=>{const t=String(d.get('text')||'').trim();if(t.length<5)return ferr(f,'Опишите причину — не короче 5 символов.');DB.reports.push({id:uid('r'),pid:d.get('pid'),by:me().username,text:t,date:today()});save();closeModal();toast('Жалоба отправлена модераторам.');};
FORM.review=(f,d)=>{const t=String(d.get('text')||'').trim();if(t.length<5)return ferr(f,'Напишите отзыв — не короче 5 символов.');const p=DB.projects.find(x=>x.id===d.get('pid')),u=me();p.reviews.push({u:u.username,rating:+d.get('rating'),text:t,date:today()});notify(p.author,u.name+' оставил(а) отзыв на «'+p.title+'».');save();toast('Отзыв опубликован.');render();};
V.projectNew=()=>shell(`<a class="mut sm" href="#/projects">← Проекты</a>${pageHead('Новый проект','Опубликуйте работу в каталоге. Цену можно оставить нулевой — тогда проект будет бесплатным.')}
 <form class="card pad formgrid" data-form="projectnew" novalidate><label>Название<input name="title" required data-focus></label><label>Категория<select name="cat">${CATS.map(c=>`<option>${c}</option>`).join('')}</select></label><label>Технологии (через запятую)<input name="tech" required placeholder="HTML, CSS, JavaScript"></label><label>Цена, ₸<input name="price" type="number" min="0" step="100" value="0"></label>
 <label class="full">Описание<textarea name="desc" rows="4" required></textarea></label><label class="full">Возможности (по одной в строке)<textarea name="feats" rows="3"></textarea></label><label>GitHub<input name="github" placeholder="github.com/user/repo"></label><label>Демо<input name="demo" placeholder="example.com/demo"></label>
 <label class="full">Обложка (PNG/JPG, до 400 КБ)<input name="cover" type="file" accept="image/png,image/jpeg"></label><p class="ferr full" hidden role="alert"></p><div class="full"><button class="btn" type="submit">Опубликовать</button></div></form>`,'projects');
FORM.projectnew=async(f,d)=>{
  const u=me(),title=String(d.get('title')||'').trim(),desc=String(d.get('desc')||'').trim(),tech=String(d.get('tech')||'').split(',').map(s=>s.trim()).filter(Boolean),price=Math.round(+d.get('price')||0);
  if(title.length<3)return ferr(f,'Название — не короче 3 символов.');
  if(!tech.length)return ferr(f,'Укажите хотя бы одну технологию.');
  if(desc.length<20)return ferr(f,'Описание — не короче 20 символов.');
  if(price<0||price>1e7)return ferr(f,'Цена должна быть от 0 до 10 000 000 ₸.');
  const file=d.get('cover');let img='';
  if(file&&file.size){
    if(!/^image\/(png|jpeg)$/.test(file.type))return ferr(f,'Обложка должна быть PNG или JPG.');
    if(file.size>400*1024)return ferr(f,'Файл слишком большой: максимум 400 КБ.');
    try{img=await new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=no;r.readAsDataURL(file);});}catch(e){return ferr(f,'Не удалось прочитать файл. Попробуйте другой.');}
  }
  const done=busy($('button[type=submit]',f),'Сохранение…');
  const p={id:uid('p'),title,author:u.username,cat:d.get('cat'),tech,price,sold:0,date:today(),tone:Math.floor(Math.random()*6),desc,feats:String(d.get('feats')||'').split('\n').map(s=>s.trim()).filter(Boolean),github:String(d.get('github')||'').trim(),demo:String(d.get('demo')||'').trim(),reviews:[],img};
  DB.projects.unshift(p);award(u,100,'Опубликован проект «'+title+'»');
  Object.values(DB.users).filter(x=>x.following.includes(u.username)).forEach(x=>notify(x.username,u.name+' опубликовал(а) проект «'+title+'».'));
  try{save();}catch(e){}done();toast('Проект опубликован: +100 XP');go('#/project/'+p.id);
};
V.myProjects=()=>{
  const u=me(),mine=DB.projects.filter(p=>p.author===u.username),buys=DB.purchases.filter(x=>x.buyer===u.username),sales=DB.purchases.filter(x=>x.seller===u.username);
  const rev=sales.reduce((s,x)=>s+x.price,0);
  return shell(pageHead('Мои проекты','Публикации, покупки и продажи.','<a class="btn" href="#/projects/new">Опубликовать проект</a>')
   +`<h2 class="sec">Опубликованные</h2>${mine.length?`<div class="list">${mine.map(p=>`<a class="card row sb pad hov" href="#/project/${p.id}"><div><b>${esc(p.title)}</b><div class="mut sm">${pl(p.sold,['покупка','покупки','покупок'])} · ${money(p.price)}</div></div>${stars(rating(p))}</a>`).join('')}</div>`:empty('Проектов пока нет','Опубликуйте первый проект — он появится в каталоге и в вашем портфолио.','<a class="btn" href="#/projects/new">Создать проект</a>')}
   <h2 class="sec">Мои покупки</h2>${buys.length?`<div class="list">${buys.map(x=>{const p=DB.projects.find(y=>y.id===x.projectId);return p?`<a class="card row sb pad hov" href="#/project/${p.id}"><div><b>${esc(p.title)}</b><div class="mut sm">${fdate(x.date)}</div></div><span>${money(x.price)}</span></a>`:'';}).join('')}</div>`:empty('Покупок нет','Найдите проект в каталоге.','<a class="btn ghost" href="#/projects">Открыть каталог</a>')}
   <h2 class="sec">Мои продажи</h2><div class="stats"><div class="stat"><b>${sales.length}</b><span class="mut sm">Заказов</span></div><div class="stat"><b>${rev?money(rev):'0 ₸'}</b><span class="mut sm">Выручка</span></div></div>${sales.length?`<ul class="feed">${sales.map(x=>{const p=DB.projects.find(y=>y.id===x.projectId);return `<li><span>${esc(p?p.title:'Проект')} — ${uLink(x.buyer)}</span><span class="mut sm">${money(x.price)} · ${fdate(x.date)}</span></li>`;}).join('')}</ul>`:'<p class="mut">Продаж пока нет.</p>'}`,'projects');
};

/* ---------- profile / portfolio ---------- */
V.profile=un=>{
  const me_=me(),u=DB.users[un];if(!u)return notFound();
  const self=u.username===me_.username,l=lvl(u.xp),followers=Object.values(DB.users).filter(x=>x.following.includes(un)).length;
  const certs=Object.values(DB.certs).filter(c=>c.user===un),prj=DB.projects.filter(p=>p.author===un);
  const inprog=allCourses().map(c=>({c,p:courseProg(u,c)})).filter(x=>x.p.pct>0);
  return shell(`<div class="card pad prof"><div class="row g wrap">${avatar(u,'xl')}<div class="grow"><div class="row g wrap"><h1>${esc(u.name)}</h1>${chip({student:'Студент',instructor:'Преподаватель',admin:'Администратор'}[u.role],'acc')}</div><p class="mut">@${u.username}${u.level?' · '+esc(u.level):''}</p><p>${esc(u.bio||'Пока без описания.')}</p><div class="row g wrap sm mut">${u.links.github?`<span>GitHub: ${link(u.links.github)}</span>`:''}${u.links.linkedin?`<span>LinkedIn: ${link(u.links.linkedin)}</span>`:''}</div></div>
   <div class="row g wrap">${self?'<a class="btn ghost" href="#/settings">Редактировать</a>':`<button class="btn " data-act="follow:${un}">${me_.following.includes(un)?'Вы подписаны':'Подписаться'}</button>`}<button class="btn ghost" data-act="share:u/${un}">Поделиться</button></div></div></div>
  <div class="stats"><div class="stat"><b>${l}</b><span class="mut sm">Уровень</span></div><div class="stat"><b>${u.xp}</b><span class="mut sm">XP</span></div><div class="stat"><b>${followers}</b><span class="mut sm">Подписчиков</span></div><div class="stat"><b>${u.following.length}</b><span class="mut sm">Подписок</span></div><div class="stat"><b>${streak(u)}</b><span class="mut sm">Дней серии</span></div></div>
  <div class="grid2 start"><section class="card pad"><h3>Навыки</h3><div class="chips">${u.skills.length?u.skills.map(s=>chip(s)).join(''):'<span class="mut">Не указаны</span>'}</div><h3>Прогресс по курсам</h3>${inprog.length?inprog.map(x=>`<div class="pr"><div class="row sb"><a href="#/course/${x.c.id}">${esc(x.c.t)}</a><span class="mut sm">${x.p.pct}%</span></div>${bar(x.p.pct)}</div>`).join(''):'<p class="mut">Курсы ещё не начаты.</p>'}</section>
  <section class="card pad"><h3>Достижения</h3><div class="ach">${ACHS.map(a=>`<div class="a ${u.ach.includes(a.id)?'on':''}"><b>${a.t}</b><span class="mut sm">${a.d}</span></div>`).join('')}</div></section></div>
  <h2 class="sec">Проекты</h2>${prj.length?`<div class="grid3">${prj.map(p=>`<a class="card proj hov" href="#/project/${p.id}">${projArt(p)}<div class="pb"><b>${esc(p.title)}</b><div class="row sb"><span class="mut sm">${money(p.price)}</span>${stars(rating(p))}</div></div></a>`).join('')}</div>`:empty('Проектов пока нет',self?'Опубликуйте первый проект — он появится в портфолио.':'Автор ещё не публиковал проекты.',self?'<a class="btn" href="#/projects/new">Создать проект</a>':'')}
  <h2 class="sec">Сертификаты</h2>${certs.length?`<div class="grid2">${certs.map(c=>`<a class="card pad hov" href="#/certificate/${c.id}"><b>${esc(getCourse(c.course)?getCourse(c.course).t:c.course)}</b><div class="mut sm">${c.id} · ${fdate(c.date)}</div></a>`).join('')}</div>`:'<p class="mut">Сертификатов пока нет.</p>'}
  ${self?`<h2 class="sec">Сохранённое</h2><p><a href="#/saved">Открыть список сохранённого (${u.bm.length})</a></p>`:''}`,'profile',true);
};
V.settings=()=>{
  const u=me(),dark=document.documentElement.dataset.theme==='dark';
  return shell(pageHead('Настройки')+`<form class="card pad formgrid" data-form="profile" novalidate><div class="full profile-avatar-editor"><div>${avatar(u,'xl')}</div><div><b>Фотография профиля</b><p class="mut sm">JPG, PNG или WebP. Изображение сохраняется в этом браузере, его можно изменить позже.</p><label class="btn ghost sm avatar-file-label">${u.avatar?'Изменить фото':'Добавить avatar'}<input type="file" name="avatarFile" accept="image/png,image/jpeg,image/webp" data-avatar-file></label><button class="btn ghost sm" type="button" data-act="removeavatar" ${u.avatar?'':'hidden'}>Удалить</button></div></div><label>Имя<input name="name" value="${esc(u.name)}" required></label><label>Email<input value="${esc(u.email)}" disabled></label><label class="full">О себе<textarea name="bio" rows="3" maxlength="240">${esc(u.bio)}</textarea></label><label class="full">Навыки (через запятую)<input name="skills" value="${esc(u.skills.join(', '))}"></label><label>GitHub<input name="github" value="${esc(u.links.github)}"></label><label>LinkedIn<input name="linkedin" value="${esc(u.links.linkedin)}"></label>
  <fieldset class="full colors"><legend>Цвет аватара</legend>${[0,1,2,3,4,5].map(i=>`<label class="sw av${i}"><input type="radio" name="color" value="${i}" ${(u.color||0)===i?'checked':''}><span class="sr">Цвет ${i+1}</span></label>`).join('')}</fieldset><p class="ferr full" hidden role="alert"></p><div class="full row g"><button class="btn" type="submit">Сохранить</button></div></form>
  <h2 class="sec">Оформление</h2><div class="card pad row sb"><span>Выберите один из четырёх визуальных стилей сайта</span><button class="design-nav-btn" data-design-trigger aria-label="Открыть меню дизайна">${ic('palette',16)}<span>Design</span></button></div>
  <h2 class="sec">Данные прототипа</h2><div class="card pad row sb wrap g"><p class="mut sm grow">Все данные хранятся в этом браузере. Сброс вернёт демо-аккаунты и удалит ваши изменения.</p><button class="btn danger" data-act="resetall">Сбросить данные</button></div>`,'settings');
};
FORM.profile=(f,d)=>{
  const u=me(),name=String(d.get('name')||'').trim();if(name.length<2)return ferr(f,'Имя — не короче двух символов.');
  u.name=name;u.bio=String(d.get('bio')||'').trim().slice(0,240);u.skills=String(d.get('skills')||'').split(',').map(s=>s.trim()).filter(Boolean).slice(0,15);
  u.links={github:String(d.get('github')||'').trim(),linkedin:String(d.get('linkedin')||'').trim()};u.color=+d.get('color')||0;save();toast('Профиль сохранён.');go('#/profile/'+u.username);
};
ACT.removeavatar=()=>{const u=me();u.avatar='';save();toast('Avatar удалён.');render();};
document.addEventListener('change',e=>{
  const input=e.target.closest('[data-avatar-file]');if(!input||!input.files?.[0])return;
  const file=input.files[0];if(!/^image\/(png|jpe?g|webp)$/.test(file.type))return toast('Выберите PNG, JPG или WebP.','err');
  if(file.size>2*1024*1024)return toast('Размер avatar не должен превышать 2 MB.','err');
  const reader=new FileReader();reader.onload=()=>{const u=me();u.avatar=String(reader.result);save();toast('Avatar сохранён.');render();};reader.readAsDataURL(file);
});
ACT.resetall=()=>modal(`<h3>Сбросить все данные?</h3><p>Ваши аккаунты, прогресс и проекты в этом браузере будут удалены.</p><div class="row g"><button class="btn danger" data-act="resetok">Сбросить</button><button class="btn ghost" data-act="closemodal">Отмена</button></div>`);
ACT.resetok=async()=>{try{localStorage.removeItem(KEY);}catch(e){}closeModal();await seed();go('#/login');toast('Данные сброшены.');};

/* ---------- community ---------- */
const KINDS=['Вопрос','Обсуждение','Показать','Помощь'];
V.community=()=>{
  const u=me(),k=UI.cm,list=DB.posts.filter(p=>!k||p.kind===k);
  return shell(pageHead('Сообщество','Задавайте вопросы, делитесь работами и помогайте другим.')
   +`<form class="card pad formgrid" data-form="post" novalidate><label>Тип<select name="kind">${KINDS.map(x=>`<option>${x}</option>`).join('')}</select></label><label>Заголовок<input name="title" required></label><label class="full">Текст<textarea name="body" rows="3" required></textarea></label><p class="ferr full" hidden role="alert"></p><div class="full"><button class="btn" type="submit">Опубликовать</button></div></form>
   <div class="chips fchips"><button class="chip btnchip ${k?'':'on'}" data-act="ck:">Все</button>${KINDS.map(x=>`<button class="chip btnchip ${k===x?'on':''}" data-act="ck:${x}">${x}</button>`).join('')}</div>
   ${list.length?list.map(p=>`<article class="card pad post"><div class="row sb wrap g"><div class="row g">${avatar(DB.users[p.author]||{name:p.author},'s')}<span>${uLink(p.author)} <span class="mut sm">· ${fdate(p.date)}</span></span></div>${chip(p.kind)}</div><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p>
   <div class="row g wrap"><button class="btn ghost sm ${p.likes.includes(u.username)?'act':''}" data-act="like:${p.id}" aria-pressed="${p.likes.includes(u.username)}">${ic('heart',15)}${p.likes.length}</button>${saveBtn('post:'+p.id)}<button class="btn ghost sm" data-act="cmt:${p.id}">Комментарии (${p.comments.length})</button></div>
   ${UI.openPost===p.id?`<div class="cmts">${p.comments.map(c=>`<div class="cm"><b>${uLink(c.u)}</b> <span class="mut sm">${fdate(c.date)}</span><p>${esc(c.text)}</p></div>`).join('')||'<p class="mut sm">Комментариев пока нет — ответьте первым.</p>'}<form class="row g" data-form="comment"><input type="hidden" name="pid" value="${p.id}"><input name="text" placeholder="Ваш комментарий" required aria-label="Комментарий" data-focus><button class="btn sm" type="submit">Отправить</button></form></div>`:''}</article>`).join(''):empty('Здесь пока тихо','Начните обсуждение — задайте вопрос или покажите свою работу.')}`,'community');
};
ACT.ck=(el,k)=>{UI.cm=k||'';render();};
ACT.cmt=(el,id)=>{UI.openPost=UI.openPost===id?'':id;render();};
ACT.like=(el,id)=>{const p=DB.posts.find(x=>x.id===id),u=me(),i=p.likes.indexOf(u.username);if(i>=0)p.likes.splice(i,1);else{p.likes.push(u.username);if(p.author!==u.username)notify(p.author,u.name+' оценил(а) ваш пост «'+p.title+'».');}save();render();};
FORM.post=(f,d)=>{const t=String(d.get('title')||'').trim(),b=String(d.get('body')||'').trim();if(t.length<5)return ferr(f,'Заголовок — не короче 5 символов.');if(b.length<10)return ferr(f,'Текст — не короче 10 символов.');if(!KINDS.includes(d.get('kind')))return ferr(f,'Выберите тип публикации.');DB.posts.unshift({id:uid('c'),author:me().username,kind:d.get('kind'),title:t,body:b,date:today(),likes:[],saves:[],comments:[]});save();toast('Опубликовано.');render();};
FORM.comment=(f,d)=>{const t=String(d.get('text')||'').trim();if(!t)return;const p=DB.posts.find(x=>x.id===d.get('pid')),u=me();p.comments.push({u:u.username,text:t,date:today()});if(p.author!==u.username)notify(p.author,u.name+' ответил(а) на ваш пост «'+p.title+'».');save();render();};

/* ---------- saved / search / notifications / more ---------- */
V.saved=()=>{
  const u=me();const items=u.bm.map(k=>{const [t,...r]=k.split(':'),id=r.join(':');
    if(t==='lesson'){const f=findLesson(id);return f&&{k,type:'Урок',title:f.l.t,href:'#/lesson/'+id};}
    if(t==='task'){const x=TASKS.find(y=>y.id===id);return x&&{k,type:'Задача',title:x.t,href:'#/task/'+id};}
    if(t==='project'){const x=DB.projects.find(y=>y.id===id);return x&&{k,type:'Проект',title:x.title,href:'#/project/'+id};}
    if(t==='post'){const x=DB.posts.find(y=>y.id===id);return x&&{k,type:'Пост',title:x.title,href:'#/community'};}}).filter(Boolean);
  return shell(pageHead('Сохранённое','Уроки, задачи, проекты и посты, которые вы отметили.')+(items.length?`<div class="list">${items.map(i=>`<div class="card row sb pad"><a class="grow" href="${i.href}"><b>${esc(i.title)}</b><div class="mut sm">${i.type}</div></a><button class="btn ghost sm" data-act="bm:${i.k.split(':')[0]}:${i.k.split(':').slice(1).join(':')}">Убрать</button></div>`).join('')}</div>`:empty('Пока ничего нет','Нажимайте «Сохранить» в уроках, задачах, проектах и постах.','<a class="btn" href="#/learn">К урокам</a>')),'profile');
};
V.search=q=>{
  const s=q.toLowerCase(),has=x=>String(x).toLowerCase().includes(s);
  const cs=allCourses().filter(c=>has(c.t)||has(c.sub)),ls=allCourses().flatMap(c=>c.mods.flatMap(m=>m.ls.filter(l=>has(l.t)).map(l=>({l,c})))),ts=TASKS.filter(t=>has(t.t)||has(t.topic)),ps=DB.projects.filter(p=>has(p.title)||p.tech.some(has)||has(p.cat)),us=Object.values(DB.users).filter(x=>has(x.name)||has(x.username)||x.skills.some(has)),cm=DB.posts.filter(p=>has(p.title)||has(p.body));
  const sec=(t,arr,f)=>arr.length?`<h2 class="sec">${t}</h2><div class="list">${arr.map(f).join('')}</div>`:'';
  const total=cs.length+ls.length+ts.length+ps.length+us.length+cm.length;
  return shell(pageHead('Поиск: «'+esc(q)+'»',total?'Найдено: '+total:'')+(total?sec('Курсы',cs,c=>`<a class="card pad hov" href="#/course/${c.id}"><b>${esc(c.t)}</b><div class="mut sm">${esc(c.level)}</div></a>`)+sec('Уроки',ls,x=>`<a class="card pad hov" href="#/lesson/${x.l.id}"><b>${esc(x.l.t)}</b><div class="mut sm">${esc(x.c.t)}</div></a>`)+sec('Практика',ts,t=>`<a class="card pad hov" href="#/task/${t.id}"><b>${esc(t.t)}</b><div class="mut sm">${esc(t.topic)} · ${esc(t.diff)}</div></a>`)+sec('Проекты',ps,p=>`<a class="card pad hov" href="#/project/${p.id}"><b>${esc(p.title)}</b><div class="mut sm">${esc(p.tech.join(', '))} · ${money(p.price)}</div></a>`)+sec('Люди',us,x=>`<a class="card pad hov row g" href="#/profile/${x.username}">${avatar(x,'s')}<span><b>${esc(x.name)}</b> <span class="mut sm">@${x.username} · ${esc(x.skills.join(', '))}</span></span></a>`)+sec('Сообщество',cm,p=>`<a class="card pad hov" href="#/community"><b>${esc(p.title)}</b><div class="mut sm">${esc(p.kind)}</div></a>`):empty('Ничего не найдено','Проверьте написание или попробуйте другое слово, например «Java» или «Python».','<a class="btn ghost" href="#/learn">Открыть каталог</a>')),'');
};
V.notifications=()=>{
  const u=me();const html=shell(pageHead('Уведомления')+(u.notifs.length?`<ul class="feed">${u.notifs.slice(0,40).map(n=>`<li class="${n.read?'':'unread'}"><span>${esc(n.text)}</span><span class="mut sm">${n.date===today()?'сегодня':fdate(n.date)}</span></li>`).join('')}</ul>`:empty('Уведомлений нет','Здесь появятся достижения, отзывы и новости по вашим проектам.')),'notifications');
  if(u.notifs.some(n=>!n.read)){u.notifs.forEach(n=>n.read=true);save();setTimeout(()=>{const b=$('.dot');if(b)b.remove();},0);}
  return html;
};
V.more=()=>{
  const u=me(),items=[['path','Маршрут'],['direction','IT-направление'],['journey','Career Journey'],['portfolio','Портфолио'],['challenges','Челленджи'],['community','Сообщество'],['certificates','Сертификаты'],['leaderboard','Рейтинг'],['saved','Сохранённое'],['profile/'+u.username,'Профиль'],['settings','Настройки']];
  if(u.role!=='student')items.push(['teach','Кабинет преподавателя']);if(u.role==='admin')items.push(['admin','Админ-панель']);
  return shell(pageHead('Ещё')+`<div class="list">${items.map(i=>`<a class="card pad hov" href="#/${i[0]}"><b>${i[1]}</b></a>`).join('')}<button class="card pad hov left" data-act="logout"><b>Выйти</b></button></div>`,'more');
};

/* ---------- instructor ---------- */
V.teach=()=>{
  const u=me(),mine=allCourses().filter(c=>c.author===u.username||u.role==='admin');
  const stud=c=>Object.values(DB.users).filter(x=>x.role==='student'&&flatLessons(c).some(l=>x.lessons[l.id]));
  const own=mine.filter(c=>c.group==='custom'&&(c.author===u.username||u.role==='admin'));
  return shell(pageHead('Кабинет преподавателя','Курсы, ученики и прогресс.')
   +`<h2 class="sec">Ваши курсы</h2>${mine.length?`<div class="list">${mine.map(c=>{const s=stud(c),cert=Object.values(DB.certs).filter(x=>x.course===c.id).length,pop=flatLessons(c).map(l=>({l,n:Object.values(DB.users).filter(x=>x.lessons[l.id]).length})).sort((a,b)=>b.n-a.n)[0];
     return `<div class="card pad"><div class="row sb wrap g"><a href="#/course/${c.id}"><b>${esc(c.t)}</b></a><span class="mut sm">${pl(flatLessons(c).length,['урок','урока','уроков'])}</span></div><div class="stats sm"><div class="stat"><b>${s.length}</b><span class="mut sm">Учеников</span></div><div class="stat"><b>${s.length?Math.round(cert/s.length*100):0}%</b><span class="mut sm">Завершили</span></div><div class="stat"><b>${pop&&pop.n?esc(pop.l.t):'—'}</b><span class="mut sm">Популярный урок</span></div></div>${s.length?`<div class="chips">${s.map(x=>`<a class="chip" href="#/profile/${x.username}">${esc(x.name)} · ${courseProg(x,c).pct}%</a>`).join('')}</div>`:''}</div>`;}).join('')}</div>`:empty('Курсов пока нет','Создайте первый курс, затем добавьте в него уроки.')}
   <h2 class="sec">Новый курс</h2><form class="card pad formgrid" data-form="newcourse" novalidate><label>Название<input name="title" required></label><label>Уровень<select name="level"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label><label class="full">Описание<textarea name="sub" rows="2" required></textarea></label><label>Запуск кода в уроках<select name="run"><option value="none">Без запуска</option><option value="js">JavaScript</option><option value="html">HTML-предпросмотр</option></select></label><label>Длительность, ч<input name="hours" type="number" min="1" value="10"></label><p class="ferr full" hidden role="alert"></p><div class="full"><button class="btn" type="submit">Создать курс</button></div></form>
   <h2 class="sec">Новый урок</h2>${own.length?`<form class="card pad formgrid" data-form="newlesson" novalidate><label>Курс<select name="cid">${own.map(c=>`<option value="${c.id}">${esc(c.t)}</option>`).join('')}</select></label><label>Модуль<input name="mod" required placeholder="Например: Введение"></label><label class="full">Название урока<input name="title" required></label><label class="full">Теория<textarea name="theory" rows="4" required></textarea></label><label class="full">Пример кода<textarea name="code" rows="3"></textarea></label><label class="full">Ссылка на YouTube (необязательно)<input name="video" placeholder="https://www.youtube.com/watch?v=..."></label><label class="full">Вопрос мини-теста<input name="q" required></label>${[1,2,3,4].map(i=>`<label>Вариант ${i}<input name="o${i}" required></label>`).join('')}<label>Правильный вариант<select name="a"><option value="0">1</option><option value="1">2</option><option value="2">3</option><option value="3">4</option></select></label><p class="ferr full" hidden role="alert"></p><div class="full"><button class="btn" type="submit">Добавить урок</button></div></form>`:'<p class="mut">Сначала создайте курс — уроки добавляются в него.</p>'}`,'teach');
};
FORM.newcourse=(f,d)=>{const u=me(),t=String(d.get('title')||'').trim(),s=String(d.get('sub')||'').trim();if(t.length<3)return ferr(f,'Название — не короче 3 символов.');if(s.length<10)return ferr(f,'Описание — не короче 10 символов.');
  DB.courses.push({id:uid('c_'),t,sub:s,run:d.get('run'),level:d.get('level'),hours:Math.max(1,+d.get('hours')||1),proj:0,group:'custom',author:u.username,mods:[]});save();toast('Курс создан. Добавьте уроки.');render();};
FORM.newlesson=(f,d)=>{
  const c=getCourse(d.get('cid'));if(!c||c.group!=='custom')return ferr(f,'Выберите курс.');
  const g=k=>String(d.get(k)||'').trim(),title=g('title'),mod=g('mod'),th=g('theory'),q=g('q'),o=[1,2,3,4].map(i=>g('o'+i));
  if(!title||!mod||th.length<10)return ferr(f,'Заполните модуль, название и теорию (не короче 10 символов).');
  if(!q||o.some(x=>!x))return ferr(f,'Заполните вопрос мини-теста и все четыре варианта ответа.');
  const vid=g('video');if(vid&&!ytId(vid))return ferr(f,'Не удалось распознать ссылку YouTube.');
  let m=c.mods.find(x=>x.t===mod);if(!m){m={t:mod,ls:[]};c.mods.push(m);}
  m.ls.push({id:c.id+'-'+uid('l'),t:title,th:th.split(/\n+/).map(p=>'<p>'+esc(p)+'</p>').join(''),code:g('code')||'// пример',video:vid,quiz:{q,o,a:+d.get('a')}});
  save();toast('Урок добавлен.');render();
};

/* ---------- admin ---------- */
V.admin=()=>{
  const us=Object.values(DB.users),rev=DB.purchases.reduce((s,x)=>s+x.price,0);
  return shell(pageHead('Админ-панель')+`<div class="stats">${[['Пользователей',us.length],['Активных за 7 дней',us.filter(x=>x.days.some(d=>d>=daysAgo(7))).length],['Курсов',allCourses().length],['Проектов',DB.projects.length],['Продаж',DB.purchases.filter(x=>x.price).length],['Выручка',rev?money(rev):'0 ₸'],['Сертификатов',Object.keys(DB.certs).length]].map(s=>`<div class="stat"><b>${s[1]}</b><span class="mut sm">${s[0]}</span></div>`).join('')}</div>
  <h2 class="sec">Пользователи</h2><div class="card scroll"><table class="lbt"><tr><th>Пользователь</th><th>Email</th><th>Роль</th><th>XP</th><th></th></tr>${us.map(x=>`<tr><td><b>${esc(x.name)}</b> <span class="mut sm">@${x.username}</span></td><td class="mut sm">${esc(x.email)}</td><td><select data-chg="role:${x.username}" aria-label="Роль ${esc(x.username)}" ${x.username===me().username?'disabled':''}>${['student','instructor','admin'].map(r=>`<option ${x.role===r?'selected':''}>${r}</option>`).join('')}</select></td><td>${x.xp}</td><td>${x.username===me().username?'':`<button class="btn ghost sm" data-act="block:${x.username}">${x.blocked?'Разблокировать':'Заблокировать'}</button>`}</td></tr>`).join('')}</table></div>
  <h2 class="sec">Проекты</h2><div class="card scroll"><table class="lbt"><tr><th>Название</th><th>Автор</th><th>Цена</th><th></th></tr>${DB.projects.map(p=>`<tr><td><a href="#/project/${p.id}">${esc(p.title)}</a></td><td>@${p.author}</td><td>${money(p.price)}</td><td><button class="btn danger sm" data-act="delproject:${p.id}">Удалить</button></td></tr>`).join('')}</table></div>
  <h2 class="sec">Жалобы</h2>${DB.reports.length?`<ul class="feed">${DB.reports.map(r=>{const p=DB.projects.find(x=>x.id===r.pid);return `<li><span><b>${esc(p?p.title:'Удалённый проект')}</b> — ${esc(r.text)} <span class="mut sm">(@${r.by})</span></span><button class="btn ghost sm" data-act="dismiss:${r.id}">Закрыть</button></li>`;}).join('')}</ul>`:'<p class="mut">Жалоб нет.</p>'}
  <h2 class="sec">Платежи</h2>${DB.purchases.length?`<ul class="feed">${DB.purchases.slice().reverse().map(x=>{const p=DB.projects.find(y=>y.id===x.projectId);return `<li><span>${esc(p?p.title:'Проект')} — @${x.buyer} → @${x.seller}</span><span class="mut sm">${money(x.price)} · ${fdate(x.date)}</span></li>`;}).join('')}</ul>`:'<p class="mut">Покупок пока нет.</p>'}`,'admin',true);
};
CHG.role=(el,un)=>{if(un===me().username)return;DB.users[un].role=el.value;save();toast('Роль изменена.');};
ACT.block=(el,un)=>{const x=DB.users[un];x.blocked=!x.blocked;save();toast(x.blocked?'Пользователь заблокирован.':'Пользователь разблокирован.');render();};
ACT.delproject=(el,id)=>{DB.projects=DB.projects.filter(p=>p.id!==id);DB.reports=DB.reports.filter(r=>r.pid!==id);save();toast('Проект удалён.');render();};
ACT.dismiss=(el,id)=>{DB.reports=DB.reports.filter(r=>r.id!==id);save();render();};

/* ---------- global events & init ---------- */
document.addEventListener('click',e=>{const el=e.target.closest('[data-act]');if(!el||el.disabled)return;const [a,...args]=el.dataset.act.split(':');if(ACT[a]){e.preventDefault();ACT[a](el,...args);}});
document.addEventListener('submit',e=>{const f=e.target.closest('form[data-form]');if(!f)return;e.preventDefault();ferr(f,'');const h=FORM[f.dataset.form];if(h)h(f,new FormData(f));});
document.addEventListener('change',e=>{const el=e.target.closest('[data-chg]');if(!el)return;const [a,...args]=el.dataset.chg.split(':');if(CHG[a])CHG[a](el,...args);});
document.addEventListener('input',e=>{const t=e.target;if(t.matches&&t.matches('textarea[data-code]'))UI.code[t.dataset.code]=t.value;});
document.addEventListener('keydown',e=>{
  const t=e.target;if(t.matches&&t.matches('textarea[data-code]')&&e.key==='Tab'){e.preventDefault();const s=t.selectionStart;t.setRangeText('  ',s,t.selectionEnd,'end');UI.code[t.dataset.code]=t.value;}
  if(e.key==='Escape'&&!$('#modal').hidden)closeModal();
});
window.addEventListener('hashchange',()=>{closeModal();render();});
(async function init(){
  DB=load();
  if(!DB||DB.v!==1||!DB.users||!DB.users.korkem)await seed();
  DB.courses=DB.courses||[];DB.reports=DB.reports||[];DB.purchases=DB.purchases||[];
  Object.values(DB.users).forEach(u=>{u.direction=u.direction||'';u.dirTest=u.dirTest||null;u.roadmap=u.roadmap||{};});
  render();
})();
