/* ================= VIEWS 3: CAREER (IT-направление, Roadmap, Портфолио, Career Journey) ================= */

/* interactive roadmap list: automated steps link out, manual steps toggle done/undone */
function roadmapMetro(dirId,steps){
  return `<ol class="metro">${steps.map(s=>{
    const label=s.manual?`<button class="stbtn" data-act="roadmaptoggle:${dirId}:${s.k}">${esc(s.t)}</button>`:(s.href?`<a href="${s.href}">${esc(s.t)}</a>`:esc(s.t));
    const sub=s.manual?(s.done?'Отмечено пройденным — нажмите, чтобы отменить':'Нажмите, когда пройдёте этот этап'):'';
    return `<li class="st ${s.state}"><span class="pin">${s.state==='done'?ic('check',14):s.state==='lock'?ic('lock',13):''}</span><div class="stx"><b>${label}</b>${sub?`<span class="mut sm">${sub}</span>`:''}</div></li>`;
  }).join('')}</ol>`;
}

/* ---------- IT direction test ---------- */
V.directionTest=()=>{
  return shell(`<a class="mut sm" href="#/direction">← IT-направление</a>${pageHead('Тест IT-направления','Отметьте, насколько каждое утверждение про вас — от 1 (совсем нет) до 5 (очень). Это займёт минуту.')}
  <form class="card pad" data-form="dirtest" novalidate>${DIR_Q.map((q,i)=>`<div class="dq"><label>${esc(q.q)}<input type="range" min="1" max="5" step="1" name="q${i}" value="3" data-rng="q${i}"></label><div class="row sb mut sm"><span>Совсем нет</span><span class="rngval" data-rngval="q${i}">3</span><span>Очень</span></div></div>`).join('')}
  <button class="btn block" type="submit">Показать результат</button></form>`,'direction');
};
document.addEventListener('input',e=>{const t=e.target;if(t.matches&&t.matches('input[type=range][data-rng]')){const s=$('.rngval[data-rngval="'+t.dataset.rng+'"]');if(s)s.textContent=t.value;}});
FORM.dirtest=(f,d)=>{
  const ans=DIR_Q.map((q,i)=>+d.get('q'+i)||3),scores=dirScores(ans),u=me();
  const top=Object.keys(scores).sort((a,b)=>scores[b]-scores[a])[0];
  u.dirTest={ans,scores,date:today()};if(!u.direction)u.direction=top;
  logAct(u,'Пройден IT-тест направлений');notify(u.username,'IT-тест пройден. Рекомендуем направление: '+getDir(top).name+'.');
  save();toast('Результат готов!');go('#/direction');
};

/* ---------- direction hub: результат теста + roadmap + Junior readiness ---------- */
V.direction=()=>{
  const u=me();
  if(!u.dirTest)return shell(pageHead('IT-направление','Ответьте на 6 вопросов — узнаете, какое направление в IT вам ближе, и получите личный Roadmap до уровня Junior.')
   +empty('Тест ещё не пройден','Направления: Frontend, Backend, Mobile, Cybersecurity, Data Science, QA, DevOps.','<a class="btn" href="#/direction/test">Пройти тест</a>'),'direction');
  const scores=u.dirTest.scores,ranked=DIRECTIONS.slice().sort((a,b)=>scores[b.id]-scores[a.id]);
  const dir=getDir(u.direction)||ranked[0],rp=roadmapProgress(u,dir.id);
  const junior=rp.all.find(s=>s.type==='milestone');
  return shell(pageHead('Моё IT-направление','Результат теста и Roadmap обучения до уровня Junior.','<a class="btn ghost sm" href="#/direction/test">Пройти тест заново</a>')
   +`<div class="card pad"><b>Результат теста</b><p class="mut sm">Нажмите на направление, чтобы построить Roadmap именно по нему.</p><div class="chips">${ranked.map(d=>`<button class="chip btnchip ${d.id===dir.id?'on':''}" data-act="dirpick:${d.id}">${esc(d.name)} — ${scores[d.id]}%</button>`).join('')}</div></div>
   <h2 class="sec">Roadmap: ${esc(dir.name)}</h2><div class="card pad"><div class="row sb"><span class="mut sm">${rp.done} из ${rp.total} шагов пройдено</span><b>${rp.pct}%</b></div>${bar(rp.pct)}${roadmapMetro(dir.id,rp.steps)}</div>
   <h2 class="sec">Готовность к Junior</h2><div class="card pad center-c"><div class="row g wrap"><div class="big">${rp.pct}<small>%</small></div><div class="grow"><p class="mut sm">${rp.pct>=100?'Все шаги маршрута пройдены — вы готовы к позиции Junior '+esc(dir.name)+'.':'Готовность к позиции Junior '+esc(dir.name)+'. Не пройдено: '+esc(rp.steps.filter(s=>!s.done).map(s=>s.t).join(', ')||'—')+'.'}</p></div></div>
   ${rp.pct>=100?`<button class="btn" data-act="roadmaptoggle:${dir.id}:junior">${junior&&junior.done?`Junior подтверждён ${ic('check',14)} — нажмите, чтобы отменить`:'Подтвердить: я готов(а) к Junior'}</button>`:'<p class="mut sm">Пройдите оставшиеся шаги маршрута, чтобы открыть подтверждение уровня Junior.</p>'}</div>`,'direction',true);
};
ACT.dirpick=(el,id)=>{const u=me();u.direction=id;save();render();};
ACT.roadmaptoggle=(el,dirId,key)=>{const u=me();u.roadmap[dirId]=u.roadmap[dirId]||{};u.roadmap[dirId][key]=!u.roadmap[dirId][key];const on=u.roadmap[dirId][key];if(on)award(u,15,'Отмечен этап маршрута: '+(getDir(dirId).roadmap.find(s=>s.k===key)||{t:key}).t);save();toast(on?'Отмечено пройденным: +15 XP':'Отметка снята.');render();};

/* ---------- portfolio ---------- */
V.portfolio=()=>{
  const u=me(),mine=DB.projects.filter(p=>p.author===u.username);
  return shell(pageHead('Моё портфолио','Проекты с описанием, технологиями, GitHub и демо-ссылками — то, что увидит работодатель.',`<a class="btn" href="#/projects/new">${ic('plus',15)}Добавить проект</a>`)
   +(mine.length?`<div class="grid2 start">${mine.map(p=>`<div class="card pad"><div class="row sb wrap g"><h3>${esc(p.title)}</h3>${chip(p.cat,'acc')}</div><p class="mut">${esc(p.desc)}</p><div class="chips">${p.tech.map(t=>chip(t)).join('')}</div><div class="row g wrap sm mut">${p.github?`<span>GitHub: ${link(p.github)}</span>`:'<span>GitHub не указан</span>'}${p.demo?`<span>Демо: ${link(p.demo)}</span>`:''}</div><div class="row g wrap"><a class="btn ghost sm" href="#/project/${p.id}">Открыть в каталоге</a>${stars(rating(p))}</div></div>`).join('')}</div>`
    :empty('Портфолио пока пусто','Опубликуйте первый проект — он появится здесь, в общем каталоге и в вашем профиле.','<a class="btn" href="#/projects/new">Опубликовать проект</a>'))
   ,'portfolio',true);
};

/* ---------- Skill Up Career Journey ---------- */
V.journey=()=>{
  const u=me(),dir=u.direction?getDir(u.direction):null,rp=dir?roadmapProgress(u,dir.id):null;
  const doneCourses=allCourses().filter(c=>courseDone(u,c)).length;
  const solved=Object.values(u.tasks).filter(t=>t.status==='ok').length;
  const prj=DB.projects.filter(p=>p.author===u.username).length;
  const interview=dir?!!((u.roadmap[dir.id]||{}).interview):false;
  const junior=dir?!!((u.roadmap[dir.id]||{}).junior):false;
  const raw=[
   {t:'IT-тест',sub:u.dirTest?'Пройден':'Не пройден',done:!!u.dirTest,href:'#/direction/test'},
   {t:'Направление',sub:dir?dir.name:'Не выбрано',done:!!dir,href:'#/direction'},
   {t:'Roadmap',sub:dir?rp.pct+'% пройдено':'—',done:!!dir&&rp.pct>0,href:'#/direction'},
   {t:'Курсы',sub:pl(doneCourses,['курс пройден','курса пройдено','курсов пройдено']),done:doneCourses>0,href:'#/learn'},
   {t:'Практика',sub:pl(solved,['задача решена','задачи решено','задач решено']),done:solved>=5,href:'#/practice'},
   {t:'Проекты',sub:pl(prj,['проект опубликован','проекта опубликовано','проектов опубликовано']),done:prj>0,href:'#/projects/new'},
   {t:'Портфолио',sub:prj>0?'Заполнено':'Пусто',done:prj>0,href:'#/portfolio'},
   {t:'Собеседование',sub:interview?'Отмечено':'Не отмечено',done:interview,href:'#/direction'},
   {t:'Junior',sub:junior?'Достигнуто':'Впереди',done:junior,href:'#/direction'}
  ];
  let locked=false;
  const steps=raw.map(s=>{const state=s.done?'done':locked?'lock':'now';if(!s.done)locked=true;return Object.assign({},s,{state});});
  const doneN=steps.filter(s=>s.done).length,pct=Math.round(doneN/steps.length*100);
  return shell(pageHead('Skill Up Career Journey','Весь путь от теста направления до уровня Junior — в одной ленте: IT-тест → Направление → Roadmap → Курсы → Практика → Проекты → Портфолио → Собеседование → Junior.')
   +`<div class="card pad"><div class="row sb"><span class="mut sm">${doneN} из ${steps.length} этапов</span><b>${pct}%</b></div>${bar(pct)}${metro(steps)}</div>`,'journey',true);
};
