/* ================= VIEWS 1 ================= */
const V={},ACT={},FORM={},CHG={};
const themeBtn=()=>`<button class="design-nav-btn" data-design-trigger aria-label="Открыть меню дизайна">${ic('palette',16)}<span>Design</span></button>`;
const pubWrap=(inner,narrow)=>`<div class="pub"><header class="pubtop-bar"><div class="pubtop"><a class="logo" href="#/"><span class="mark">${brandIcon(20)}</span><span class="logo-wordmark">Skill<span class="gtxt"> Up</span></span></a><div class="row g">${themeBtn()}${DB.session?'<a class="btn ghost" href="#/dashboard">На панель</a>':'<a class="btn ghost" href="#/login">Войти</a>'}</div></div></header><div class="${narrow?'pubn':'pubw'}">${inner}</div></div>`;
const page=(inner,active,wide)=>me()?shell(inner,active,wide):pubWrap(inner,true);
const notFound=()=>page(errorState('Не найдено','Такой записи нет — возможно, она была удалена.','<a class="btn" href="#/dashboard">На панель</a>'),'');
const metro=st=>`<ol class="metro">${st.map(s=>`<li class="st ${s.state}"><span class="pin">${s.state==='done'?ic('check',14):s.state==='lock'?ic('lock',13):''}</span><div class="stx"><b>${s.href?`<a href="${s.href}">${esc(s.t)}</a>`:esc(s.t)}</b>${s.sub?`<span class="mut sm">${s.sub}</span>`:''}</div></li>`).join('')}</ol>`;
const ferr=(f,m)=>{const e=$('.ferr',f);if(e){e.textContent=m;e.hidden=!m;}};
const busy=(b,txt)=>{if(!b)return()=>{};const o=b.innerHTML;b.disabled=true;b.textContent=txt;return()=>{b.disabled=false;b.innerHTML=o;};};

/* ---------- landing ---------- */
V.landing=()=>pubWrap(`<section class="hero"><div class="hero-t"><div class="hero-brand" aria-label="Skill Up"><span class="hero-brand-mark">${brandIcon(42)}</span><span class="hero-brand-name">Skill<span class="gtxt"> Up</span></span></div><span class="chip acc eyebrow">${ic('star',13)}Платформа для обучения программированию</span><h1>Начните свой путь в IT с Skill Up</h1><p class="lead">Выберите направление, изучайте языки на практике и собирайте проекты, которые показывают ваш прогресс.</p><div class="row g wrap hero-cta"><a class="btn lg" href="#/test">Пройти тест</a><a class="btn ghost lg" href="#/login">У меня уже есть аккаунт</a></div></div>
<div class="hero-v hero-start-card"><div class="card pad"><span class="mut sm eyebrow2">С чего начать?</span><h2>Выберите IT-направление</h2><p class="mut">Выберите направление или пройдите короткий тест — Skill Up покажет ваш следующий шаг.</p><div class="landing-directions">${DIRECTIONS.slice(0,4).map((d,i)=>`<a class="landing-direction" href="#/direction/${d.id}"><span class="landing-direction-icon">${ic(['layout','server','smartphone','shield'][i],18)}</span><span><b>${esc(d.name)}</b><small>${esc(['Интерфейсы и web','Сервер и API','Android и mobile','Безопасность и сети'][i])}</small></span><span class="landing-arrow">→</span></a>`).join('')}</div><a class="btn ghost block" href="#/direction/test">Помочь определить направление →</a></div></div></section>
<section class="three"><div><h3>Готовый путь обучения</h3><p class="mut">После выбора направления вы сразу увидите следующий курс и практический шаг.</p></div><div><h3>Учитесь на практике</h3><p class="mut">Закрепляйте теорию заданиями по JavaScript, Python и Java.</p></div><div><h3>Создавайте портфолио</h3><p class="mut">Делайте проекты во время обучения и показывайте результат работодателю.</p></div></section>`);

/* ---------- auth ---------- */
const authBox=(t,inner,foot)=>pubWrap(`<div class="card pad auth"><h1>${t}</h1>${inner}${foot?`<p class="mut sm ac">${foot}</p>`:''}</div>`,true);
V.login=()=>authBox('Вход',`<form data-form="login" novalidate><label>Имя пользователя или email<input name="ident" autocomplete="username" required data-focus></label><label>Пароль<input name="pw" type="password" autocomplete="current-password" required></label><p class="ferr" hidden role="alert"></p><button class="btn block" type="submit">Войти</button></form>`,'<a href="#/forgot">Забыли пароль?</a> · <a href="#/register">Создать аккаунт</a>');
V.register=()=>authBox('Регистрация',`${DB.test&&DB.test.result?`<p class="note">Результат теста (${esc(DB.test.result.level)}, ${DB.test.result.pct}%) сохранится в вашем профиле.</p>`:''}<form data-form="register" novalidate><label>Имя<input name="name" autocomplete="name" required data-focus></label><label>Имя пользователя<input name="username" autocomplete="username" required placeholder="латиница, цифры, _"></label><label>Email<input name="email" type="email" autocomplete="email" required></label><label>Пароль<input name="pw" type="password" autocomplete="new-password" required placeholder="не короче 8 символов"></label><label>Повторите пароль<input name="pw2" type="password" autocomplete="new-password" required></label><p class="ferr" hidden role="alert"></p><button class="btn block" type="submit">Создать аккаунт</button></form>`,'Уже есть аккаунт? <a href="#/login">Войти</a>');
V.forgot=()=>authBox('Сброс пароля',`<p class="note">В прототипе нет почтового сервера, поэтому новый пароль задаётся сразу. В боевой версии здесь придёт письмо со ссылкой.</p><form data-form="forgot" novalidate><label>Email<input name="email" type="email" required data-focus></label><label>Новый пароль<input name="pw" type="password" autocomplete="new-password" required placeholder="не короче 8 символов"></label><p class="ferr" hidden role="alert"></p><button class="btn block" type="submit">Сменить пароль</button></form>`,'<a href="#/login">Вернуться ко входу</a>');

FORM.login=async(f,d)=>{
  const id=String(d.get('ident')||'').trim().toLowerCase(),pw=String(d.get('pw')||'');
  if(!id||!pw)return ferr(f,'Введите имя пользователя и пароль.');
  const done=busy($('button[type=submit]',f),'Вход…');
  const u=Object.values(DB.users).find(x=>x.username===id||String(x.email||'').toLowerCase()===id);
  const h=u?await hashPw(pw,u.username):'';done();
  if(!u||h!==u.pass)return ferr(f,'Неверное имя пользователя или пароль.');
  if(u.blocked)return ferr(f,'Аккаунт заблокирован администратором.');
  DB.session=u.username;save();go(u.testResult||u.role!=='student'?'#/dashboard':'#/test');
};
FORM.register=async(f,d)=>{
  const name=String(d.get('name')||'').trim(),un=String(d.get('username')||'').trim().toLowerCase(),em=String(d.get('email')||'').trim().toLowerCase(),pw=String(d.get('pw')||''),pw2=String(d.get('pw2')||'');
  if(name.length<2)return ferr(f,'Введите имя — не короче двух символов.');
  if(!/^[a-z0-9_]{3,20}$/.test(un))return ferr(f,'Имя пользователя: 3–20 символов, латиница, цифры и «_».');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))return ferr(f,'Проверьте адрес электронной почты.');
  if(pw.length<8)return ferr(f,'Пароль должен быть не короче 8 символов.');
  if(pw!==pw2)return ferr(f,'Пароли не совпадают.');
  if(DB.users[un])return ferr(f,'Это имя пользователя уже занято.');
  if(Object.values(DB.users).some(x=>String(x.email||'').toLowerCase()===em))return ferr(f,'Аккаунт с таким email уже существует.');
  const done=busy($('button[type=submit]',f),'Создание…');
  const u=blankUser({username:un,name,email:em,pass:await hashPw(pw,un),color:Object.keys(DB.users).length%6});done();
  DB.users[un]=u;
  if(DB.test&&DB.test.result)applyResult(u,DB.test.result);
  notify(un,'Добро пожаловать в Skill Up! Начните с маршрута обучения.');
  DB.session=un;UI.ob={step:1,goal:'',interests:[]};save();go('#/onboarding');
};
FORM.forgot=async(f,d)=>{
  const em=String(d.get('email')||'').trim().toLowerCase(),pw=String(d.get('pw')||'');
  const u=Object.values(DB.users).find(x=>String(x.email||'').toLowerCase()===em);
  if(!u)return ferr(f,'Аккаунт с таким email не найден.');
  if(pw.length<8)return ferr(f,'Пароль должен быть не короче 8 символов.');
  u.pass=await hashPw(pw,u.username);save();toast('Пароль изменён. Войдите с новым паролем.');go('#/login');
};
ACT.logout=()=>{DB.session=null;save();toast('Вы вышли из аккаунта.');go('#/');};
ACT.theme=()=>{if(window.SkillUpDesign?.open){window.SkillUpDesign.open();return;}DB.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';save();render();};
ACT.closemodal=()=>closeModal();
ACT.menu=()=>{UI.menuOpen=!UI.menuOpen;UI.navOpen=false;UI.mnavOpen=false;render();};
ACT.closemenu=()=>{UI.menuOpen=false;render();};
ACT.navmenu=()=>{UI.navOpen=!UI.navOpen;UI.menuOpen=false;UI.mnavOpen=false;render();};
ACT.closenavmenu=()=>{UI.navOpen=false;render();};
ACT.mnav=()=>{UI.mnavOpen=!UI.mnavOpen;UI.menuOpen=false;UI.navOpen=false;render();};
FORM.search=(f,d)=>{const q=String(d.get('q')||'').trim();if(q)go('#/search?q='+encodeURIComponent(q));};

/* ---------- level test ---------- */
function applyResult(u,r){u.testResult=r;u.level=r.level;u.lang=r.lang;u.pathIds=null;}
V.test=()=>{
  const T=DB.test;
  if(!T||T.stage==='intro')return testIntro();
  if(T.stage==='q')return testQ();
  return testResult();
};
function testIntro(){
  const u=me();
  return page(`<div class="card pad center-c"><h1>Определим ваш уровень программирования</h1><p class="mut">Двенадцать вопросов: результат кода, поиск ошибки, синтаксис и логика. Сначала выберите направление — оно определит рекомендуемые курсы.</p>
  <div class="grid2 lang">${LANGS.map(l=>`<button class="opt" data-act="starttest:${l[0]}"><b>${l[1]}</b></button>`).join('')}</div>
  ${u&&u.testResult?`<p class="mut sm">Последний результат: ${esc(u.testResult.level)}, ${u.testResult.pct}% (${fdate(u.testResult.date)}). Новый тест заменит его.</p>`:''}
  ${u?'':'<p class="mut sm">Уже есть аккаунт? <a href="#/login">Войти</a></p>'}</div>`,'learn');
}
ACT.starttest=(el,lang)=>{DB.test={stage:'q',lang,idx:0,ans:[]};save();render();};
function testQ(){
  const T=DB.test,q=TEST[T.idx],n=TEST.length,answered=T.ans.filter(x=>x!==undefined&&x!==null).length;
  return page(`<div class="card pad tq"><div class="row sb"><span class="mut">Вопрос ${T.idx+1} из ${n}</span><span class="mut sm">Отвечено: ${answered}</span></div>${bar((T.idx+1)/n*100)}
  <h2>${esc(q.q)}</h2>${q.code?`<pre class="codeblk"><code>${esc(q.code)}</code></pre>`:''}
  <div class="opts" role="radiogroup" aria-label="Варианты ответа">${q.o.map((o,i)=>`<button class="opt ${T.ans[T.idx]===i?'sel':''}" role="radio" aria-checked="${T.ans[T.idx]===i}" data-act="tans:${i}">${esc(o)}</button>`).join('')}</div>
  <div class="row sb wrap g"><button class="btn ghost" data-act="tprev" ${T.idx===0?'disabled':''}>Назад</button><div class="row g"><button class="btn ghost" data-act="tfinish">Завершить тест</button>${T.idx<n-1?'<button class="btn" data-act="tnext">Далее</button>':'<button class="btn" data-act="tfinish">Показать результат</button>'}</div></div></div>`,'learn');
}
ACT.tans=(el,i)=>{DB.test.ans[DB.test.idx]=+i;save();render();};
ACT.tnext=()=>{DB.test.idx=Math.min(TEST.length-1,DB.test.idx+1);save();render();};
ACT.tprev=()=>{DB.test.idx=Math.max(0,DB.test.idx-1);save();render();};
ACT.tfinish=()=>{
  const T=DB.test;let c=0;const ok={},bad={};
  TEST.forEach((q,i)=>{if(T.ans[i]===q.a){c++;ok[q.topic]=1;}else bad[q.topic]=1;});
  const pct=Math.round(c/TEST.length*100),level=pct<35?'Beginner':pct<60?'Elementary':pct<80?'Intermediate':'Advanced';
  T.result={pct,correct:c,total:TEST.length,level,lang:T.lang,strong:Object.keys(ok).filter(t=>!bad[t]),weak:Object.keys(bad),date:today()};
  T.stage='result';const u=me();
  if(u){applyResult(u,T.result);logAct(u,'Пройден тест уровня: '+level);notify(u.username,'Ваш уровень: '+level+' ('+pct+'%). Маршрут обновлён.');}
  save();render();
};
function testResult(){
  const r=DB.test.result,u=me();
  const ids=(()=>{let x=(PATHS[r.lang]||PATHS.js).slice();if(LEVELS.indexOf(r.level)>=2&&x.length>1)x=x.slice(1);return x;})();
  const line={Beginner:'Начнём с основ и будем двигаться шаг за шагом.',Elementary:'Базовые понятия знакомы — закрепим их практикой.',Intermediate:'Хорошая база. Пропускаем вводные темы и переходим к практике.',Advanced:'Уверенный уровень. Сосредоточьтесь на проектах и сложных задачах.'}[r.level];
  return page(`<div class="card pad res"><div class="row g wrap"><div class="big">${r.pct}<small>%</small></div><div><h1>Ваш уровень: ${esc(r.level)}</h1><p class="mut">${line}</p><p>Правильных ответов: <b>${r.correct} из ${r.total}</b></p></div></div>
  <div class="grid2"><div><h3>Сильные стороны</h3><div class="chips">${r.strong.length?r.strong.map(t=>chip(t,'ok')).join(''):'<span class="mut">Пока не выявлены</span>'}</div></div><div><h3>Стоит повторить</h3><div class="chips">${r.weak.length?r.weak.map(t=>chip(t,'warn')).join(''):'<span class="mut">Слабых тем нет</span>'}</div></div></div>
  <h3>Рекомендуемый маршрут</h3><p class="mut sm">${ids.map(getCourse).map(c=>esc(c.t)).join(' → ')} → Практика → Итоговый экзамен → Сертификат</p>
  <div class="row g wrap">${u?'<a class="btn" href="#/path">Открыть мой маршрут</a>':'<a class="btn" href="#/register">Создать аккаунт и сохранить результат</a><a class="btn ghost" href="#/login">Войти</a>'}<button class="btn ghost" data-act="retest">Пройти тест заново</button></div></div>`,'learn');
}
ACT.retest=()=>{DB.test=null;save();render();};

/* ---------- onboarding ---------- */
V.onboarding=()=>{
  const o=UI.ob;
  const body=o.step===1?`<h2>Какая у вас цель?</h2><div class="opts">${GOALS.map(g=>`<button class="opt ${o.goal===g?'sel':''}" data-act="obgoal:${GOALS.indexOf(g)}">${g}</button>`).join('')}</div><div class="row sb"><span class="mut sm">Шаг 1 из 2</span><button class="btn" data-act="obnext" ${o.goal?'':'disabled'}>Далее</button></div>`
   :`<h2>Что вам интересно?</h2><p class="mut sm">Можно выбрать несколько вариантов.</p><div class="grid2">${INTERESTS.map((g,i)=>`<button class="opt ${o.interests.includes(g)?'sel':''}" data-act="obint:${i}">${g}</button>`).join('')}</div><div class="row sb"><button class="btn ghost" data-act="obback">Назад</button><button class="btn" data-act="obdone" ${o.interests.length?'':'disabled'}>Готово</button></div>`;
  return pubWrap(`<div class="card pad center-c">${bar(o.step*50)}${body}</div>`,true);
};
ACT.obgoal=(el,i)=>{UI.ob.goal=GOALS[+i];render();};
ACT.obint=(el,i)=>{const g=INTERESTS[+i],a=UI.ob.interests;a.includes(g)?a.splice(a.indexOf(g),1):a.push(g);render();};
ACT.obnext=()=>{UI.ob.step=2;render();};ACT.obback=()=>{UI.ob.step=1;render();};
ACT.obdone=()=>{const u=me();u.goal=UI.ob.goal;u.interests=UI.ob.interests.slice();save();go(u.testResult?'#/path':'#/test');};

/* ---------- dashboard ---------- */
const greet=()=>{const h=new Date().getHours();return h<5?'Доброй ночи':h<12?'Доброе утро':h<18?'Добрый день':'Добрый вечер';};
V.dashboard=()=>{
  const u=me(),cur=currentCourse(u),pr=courseProg(u,cur),nl=nextLesson(u,cur),st=streak(u);
  const doneCourses=allCourses().filter(c=>courseDone(u,c)).length;
  const prj=DB.projects.filter(p=>p.author===u.username).length;
  const goalDone=Object.values(u.lessons).filter(d=>d===today()).length,goal=2;
  const rec=allCourses().filter(c=>!courseDone(u,c)&&c.id!==cur.id).sort((a,b)=>(pathIds(u).includes(b.id)?1:0)-(pathIds(u).includes(a.id)?1:0)).slice(0,3);
  const daily=taskOfDay(),dOk=u.daily===today();

  /* ---- hero: current IT direction (falls back to a CTA if no test taken yet) ---- */
  const dir=u.direction?getDir(u.direction):null,rp=dir?roadmapProgress(u,dir.id):null;
  const heroNext=rp?rp.steps.find(s=>!s.done):null;

  /* ---- roadmap strip: course-by-course learning path, capped with Projects + Portfolio ---- */
  let locked=false;
  const roadSteps=pathCourses(u).map(c=>{
    const done=courseDone(u,c),now=!done&&!locked;if(!done)locked=true;
    return{t:c.t,sub:done?'Пройден':c.id===cur.id?pr.pct+'% пройдено':'Впереди',state:done?'done':now?'now':'lock',href:'#/course/'+c.id};
  });
  [['Проекты','#/projects/new'],['Портфолио','#/portfolio']].forEach(([t,href])=>{
    const done=prj>0,now=!done&&!locked;if(!done)locked=true;
    roadSteps.push({t,sub:done?pl(prj,['проект','проекта','проектов'])+' готово':'Пока нет проектов',state:done?'done':now?'now':'lock',href});
  });

  return shell(`<div class="phead dash-head"><div><h1>${greet()}, ${esc(u.name.split(' ')[0])}</h1><p class="mut">Продолжайте свой путь.${st?` Серия занятий: ${pl(st,['день','дня','дней'])}.`:' Начните серию — займитесь сегодня.'}</p></div></div>

  <div class="grid-main">
   <section class="card pad hero-dir ${dir?'':'empty'}">
    <span class="mut sm eyebrow2">Текущее направление</span>
    ${dir?`<h2>${esc(dir.name)}</h2>
     <div class="row sb"><span class="mut sm">Roadmap до Junior</span><b>${rp.pct}%</b></div>
     ${bar(rp.pct)}
     <a class="btn lg" href="${heroNext?heroNext.href||'#/direction':'#/direction'}">Продолжить обучение →</a>`
    :`<h2>Выберите направление в IT</h2>
     <p class="mut">Пройдите короткий тест — узнаете, какое направление вам подходит, и получите личный Roadmap до Junior.</p>
     <a class="btn lg" href="#/direction/test">Пройти IT-тест →</a>`}
   </section>
   <section class="card pad next-step">
    <span class="mut sm">Следующий шаг</span>
    <h3>${esc(cur.t)}</h3>
    <p class="mut sm">${nl?`Урок: ${esc(nl.t)}`:pr.pct===100?'Все уроки пройдены — сдайте экзамен.':''}</p>
    <div class="row sb"><span class="sm mut">${pr.done} из ${pr.total} уроков</span><b>${pr.pct}%</b></div>
    ${bar(pr.pct)}
    <p class="mut sm">Цель на сегодня: ${Math.min(goalDone,goal)} из ${goal} уроков</p>
    <a class="btn ghost block" href="${nl?'#/lesson/'+nl.id:'#/exam/'+cur.id}">${pr.done?'Продолжить':'Начать'}</a>
   </section>
  </div>

  <div class="stats dash-stats">
   <div class="stat"><span class="sic">${ic('flame',20)}</span><b>${st}</b><span class="mut sm">Серия, ${pl(st,['день','дня','дней'])}</span></div>
   <div class="stat"><span class="sic">${ic('zap',20)}</span><b>${u.xp} XP</b><span class="mut sm">Опыт</span></div>
   <div class="stat"><span class="sic">${ic('book',20)}</span><b>${doneCourses}</b><span class="mut sm">${pl(doneCourses,['курс завершён','курса завершено','курсов завершено'])}</span></div>
   <div class="stat"><span class="sic">${ic('rocket',20)}</span><b>${prj}</b><span class="mut sm">${pl(prj,['проект готов','проекта готово','проектов готово'])}</span></div>
  </div>

  <h2 class="sec">Ваш Roadmap</h2>
  <div class="card pad road">${metro(roadSteps)}</div>

  <div class="grid-main">
   <section><h2 class="sec">Рекомендуем вам</h2><div class="list">${rec.map(c=>{const p=courseProg(u,c);return `<a class="card row sb pad hov rec-item" href="#/course/${c.id}"><div><b>${esc(c.t)}</b><div class="mut sm">${esc(c.level)} · ${pl(flatLessons(c).length,['урок','урока','уроков'])} · ${c.hours} ч</div></div><span class="chip acc">${p.pct>0?'Продолжить':'Начать'}</span></a>`;}).join('')}
    <div class="card pad row sb hov rec-item"><div><b>${esc(daily.t)}</b><div class="mut sm">${esc(daily.topic)} · ${esc(daily.diff)} · +30 XP</div></div>${dOk?chip('Выполнено','ok'):`<a class="chip acc" href="#/task/${daily.id}">Решить</a>`}</div>
    </div>
   </section>
   <section><h2 class="sec">Недавняя активность</h2>${u.log.length?`<ul class="feed">${u.log.slice(0,5).map(a=>`<li><span>${esc(a.t)}</span><span class="mut sm">${a.d===today()?'сегодня':fdate(a.d)}</span></li>`).join('')}</ul>`:empty('Пока нет активности','Пройдите первый урок — он появится здесь.','<a class="btn" href="#/learn">Выбрать курс</a>')}</section>
  </div>`,'dashboard');
};

/* ---------- learn & course ---------- */
V.learn=()=>{
  const u=me();
  const card=c=>{const p=courseProg(u,c);return `<a class="card pad course hov" href="#/course/${c.id}"><div class="row sb"><b>${esc(c.t)}</b>${chip(c.level)}</div><p class="mut sm">${esc(c.sub)}</p><div class="mut sm">${c.hours} ч · ${pl(flatLessons(c).length,['урок','урока','уроков'])} · ${pl(c.proj,['проект','проекта','проектов'])}</div>${c.video?`<span class="chip acc">YouTube-разбор по теме</span>`:''}${bar(p.pct)}<div class="row sb"><span class="mut sm">${p.pct}%</span><span class="btn sm ghost">${p.done?'Продолжить':'Начать'}</span></div></a>`;};
  const g=(t,f)=>{const cs=allCourses().filter(f);return cs.length?`<h2 class="sec">${t}</h2><div class="grid3">${cs.map(card).join('')}</div>`:'';};
  return shell(pageHead('Учиться','Выберите курс или следуйте своему <a href="#/path">маршруту</a>.')+g('Программирование',c=>c.group==='prog')+g('Веб-разработка',c=>c.group==='web')+g('Данные и инструменты',c=>c.group==='data')+g('От преподавателей',c=>c.group==='custom')+`<h2 class="sec">Скоро</h2><div class="chips">${SOON.map(s=>`<span class="chip dis">${s}</span>`).join('')}</div>`,'learn');
};
V.course=id=>{
  const u=me(),c=getCourse(id);if(!c)return notFound();
  const p=courseProg(u,c),ex=u.exams[c.id],cert=Object.values(DB.certs).find(x=>x.user===u.username&&x.course===c.id),nl=nextLesson(u,c),cvid=ytId(c.video);
  return shell(`<a class="mut sm" href="#/learn">← Все курсы</a>${pageHead(esc(c.t),esc(c.sub),`<a class="btn" href="${nl?'#/lesson/'+nl.id:'#/exam/'+c.id}">${p.done?'Продолжить':'Начать курс'}</a>`)}
  <div class="stats">${[['Уровень',c.level],['Длительность',c.hours+' ч'],['Уроков',p.total],['Проектов',c.proj],['Прогресс',p.pct+'%']].map(s=>`<div class="stat"><b>${s[1]}</b><span class="mut sm">${s[0]}</span></div>`).join('')}</div>${bar(p.pct)}
  ${cvid?`<h2 class="sec">Видео по теме</h2><div class="card pad video-card"><div class="row sb wrap g"><div><b>Объяснение темы на YouTube</b><p class="mut sm">Дополнительный разбор курса для повторения материала.</p></div><a class="btn ghost sm" href="${esc(c.video)}" target="_blank" rel="noopener noreferrer">Открыть на YouTube</a></div><div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${cvid}" title="Видео по курсу ${esc(c.t)}" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div></div>`:''}
  <h2 class="sec">Программа</h2>${c.mods.map((m,i)=>{const done=m.ls.filter(l=>u.lessons[l.id]).length;return `<details class="card mod" ${done<m.ls.length?'open':''}><summary><b>Модуль ${i+1}. ${esc(m.t)}</b><span class="mut sm">${done}/${m.ls.length}</span></summary><ul class="lessons">${m.ls.map(l=>`<li><a href="#/lesson/${l.id}"><span class="tick ${u.lessons[l.id]?'on':''}">${u.lessons[l.id]?ic('check',13):''}</span>${esc(l.t)}</a></li>`).join('')}</ul></details>`;}).join('')}
  <h2 class="sec">Итоговый экзамен</h2><div class="card pad row sb wrap g"><div><b>${ex&&ex.passed?'Экзамен сдан':'Экзамен и сертификат'}</b><p class="mut sm">${ex?`Последний результат: ${ex.pct}% (нужно не менее 70%).`:'Откроется после прохождения всех уроков. Проходной балл — 70%.'}</p></div>${cert?`<a class="btn" href="#/certificate/${cert.id}">Открыть сертификат</a>`:p.pct===100?`<a class="btn" href="#/exam/${c.id}">Сдать экзамен</a>`:`<button class="btn" disabled title="Сначала завершите все уроки">Сдать экзамен</button>`}</div>`,'learn');
};

/* ---------- lesson ---------- */
const edLabel={js:'JavaScript',html:'HTML',none:''};
function editorHtml(key,code,run,lang,langName){
  const can=run==='js'||run==='html';
  return `<div class="ed"><div class="edbar"><span class="mut sm">${esc(langName||'')}</span><div class="row g"><button class="btn ghost sm" data-act="reset:${key}">Сбросить</button>${can?`<button class="btn sm" data-act="runlesson:${key}">${ic('play',13)}Запустить</button>`:`<button class="btn sm" disabled title="Для запуска нужна серверная песочница">${ic('play',13)}Запустить</button>`}</div></div><textarea class="code" data-code="${key}" spellcheck="false" autocapitalize="off" aria-label="Редактор кода" rows="${Math.min(14,Math.max(6,code.split('\n').length+1))}">${esc(UI.code[key]??code)}</textarea></div>
  <div class="out" id="out" aria-live="polite">${can?'Нажмите «Запустить», чтобы увидеть результат.':'Запуск этого языка в браузере недоступен в прототипе: нужна серверная песочница. Код можно читать и редактировать.'}</div>`;
}
V.lesson=id=>{
  const u=me(),f=findLesson(id);if(!f)return notFound();
  const {c,m,l}=f,fl=flatLessons(c),i=fl.findIndex(x=>x.id===id),done=!!u.lessons[id],qa=UI.qa[id],q=l.quiz,ok=qa===q.a;
  const pr=courseProg(u,c),prev=fl[i-1],next=fl[i+1];
  const vid=ytId(l.video);
  return shell(`<a class="mut sm" href="#/course/${c.id}">← ${esc(c.t)}</a>
  <div class="lgrid"><aside class="card lside"><b class="sm">Уроки курса</b>${c.mods.map(mm=>`<div class="mut sm lm">${esc(mm.t)}</div>${mm.ls.map(x=>`<a class="lk ${x.id===id?'on':''}" href="#/lesson/${x.id}"><span class="tick ${u.lessons[x.id]?'on':''}">${u.lessons[x.id]?ic('check',12):''}</span>${esc(x.t)}</a>`).join('')}`).join('')}</aside>
  <article class="lmain"><div class="row sb wrap g"><h1>${esc(l.t)}</h1>${saveBtn('lesson:'+id)}</div><div class="prose">${l.th}</div>
  ${vid?`<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${vid}" title="Видео к уроку" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`:''}
  <h3>Пример</h3>${editorHtml(id,l.code,c.run,c.run,c.run==='js'?'JavaScript':c.run==='html'?'HTML':c.id==='py'?'Python':c.id==='java'?'Java':c.id==='sql'?'SQL':'Код')}
  <h3>Мини-тест</h3><div class="card pad"><p><b>${esc(q.q)}</b></p><div class="opts">${q.o.map((o,k)=>`<button class="opt ${qa===k?(ok?'good':'bad'):''}" data-act="qa:${id}:${k}">${esc(o)}</button>`).join('')}</div>${qa!==undefined?`<p class="${ok?'okt':'errt'}" role="status">${ok?'Верно.':'Неверно — перечитайте теорию и попробуйте ещё раз.'}</p>`:''}</div>
  <div class="row sb wrap g lnav">${prev?`<a class="btn ghost" href="#/lesson/${prev.id}">← ${esc(prev.t)}</a>`:'<span></span>'}${done?`<span class="chip ok">Урок завершён</span>`:`<button class="btn" data-act="complete:${id}" ${ok?'':'disabled'} title="${ok?'':'Ответьте на мини-тест'}">Завершить урок (+10 XP)</button>`}${next?`<a class="btn ${done?'':'ghost'}" href="#/lesson/${next.id}">${esc(next.t)} →</a>`:`<a class="btn ${done?'':'ghost'}" href="#/course/${c.id}">К программе курса</a>`}</div>
  <p class="mut sm">Прогресс курса: ${pr.done} из ${pr.total} уроков (${pr.pct}%)</p></article></div>`,'learn',true);
};
ACT.qa=(el,id,k)=>{UI.qa[id]=+k;render();};
ACT.reset=(el,key)=>{const t=TASKS.find(x=>x.id===key);if(t)UI.code[key]=t.starter;else delete UI.code[key];render();};
ACT.complete=(el,id)=>{
  const u=me(),f=findLesson(id);if(!f||u.lessons[id])return;
  if(UI.qa[id]!==f.l.quiz.a)return toast('Сначала ответьте на мини-тест.','err');
  u.lessons[id]=today();award(u,10,'Завершён урок «'+f.l.t+'»');
  if(f.m.ls.every(x=>u.lessons[x.id])){award(u,50,'Завершён модуль «'+f.m.t+'»');toast('Модуль завершён: +50 XP');}
  else toast('Урок завершён: +10 XP');
  save();render();
};
ACT.runlesson=async(el,key)=>{
  const u=me(),ta=$('textarea[data-code]');UI.code[key]=ta.value;const f=findLesson(key);const out=$('#out');
  if(f.c.run==='html'){out.innerHTML=`<iframe class="prev" sandbox title="Предпросмотр" srcdoc="${esc(ta.value)}"></iframe>`;}
  else{const done=busy(el,'Запуск…');out.textContent='Выполняется…';const r=await sandbox(ta.value,null,null);done();
    out.innerHTML=(r.logs.length?`<pre>${esc(r.logs.join('\n'))}</pre>`:'')+(r.error?`<p class="errt">Ошибка: ${esc(r.error)}</p>`:'')+(!r.logs.length&&!r.error?'<span class="mut">Программа ничего не вывела. Используйте console.log().</span>':'');}
  if(!u.ran){u.ran=true;checkAch(u);}save();
};

/* ---------- path & skill map ---------- */
V.path=()=>{
  const u=me(),cs=pathCourses(u);let blocked=false;
  const blocks=cs.map(c=>{
    const p=courseProg(u,c),ex=u.exams[c.id],cert=Object.values(DB.certs).find(x=>x.user===u.username&&x.course===c.id);
    let first=true;
    const st=c.mods.map((m,i)=>{const d=m.ls.filter(l=>u.lessons[l.id]).length;let s=d===m.ls.length?'done':blocked?'lock':'next';if(s==='next'&&first&&d<m.ls.length){s='now';first=false;}
      const nl=m.ls.find(l=>!u.lessons[l.id])||m.ls[0];return{t:m.t,sub:pl(m.ls.length,['урок','урока','уроков'])+' · пройдено '+d,state:s,href:'#/lesson/'+nl.id};});
    st.push({t:'Итоговый экзамен',sub:ex?ex.pct+'%':'Проходной балл 70%',state:ex&&ex.passed?'done':blocked||p.pct<100?'lock':'now',href:p.pct===100?'#/exam/'+c.id:''});
    st.push({t:'Сертификат',sub:cert?cert.id:'',state:cert?'done':'lock',href:cert?'#/certificate/'+cert.id:''});
    const html=`<section class="card pad"><div class="row sb"><h3>${esc(c.t)}</h3><a class="btn ghost sm" href="#/course/${c.id}">Открыть курс</a></div>${bar(p.pct)}${metro(st)}${blocked?'<p class="mut sm">Откроется после предыдущего блока, но курс можно открыть вручную.</p>':''}</section>`;
    if(!(cert||courseDone(u,c)))blocked=true;
    return html;
  }).join('');
  const skills=allCourses().flatMap(c=>c.mods.map((m,i)=>{const d=m.ls.filter(l=>u.lessons[l.id]).length;const prevDone=i===0||c.mods[i-1].ls.every(l=>u.lessons[l.id]);return{t:m.t,c:c.t,s:d===m.ls.length?'done':d>0?'prog':prevDone?'open':'lock'};}));
  return shell(pageHead('Мой маршрут',`Уровень: <b>${esc(u.level||'не определён')}</b>. Следующий блок открывается, когда завершён предыдущий.`,'<a class="btn ghost" href="#/test">Пройти тест заново</a>')
   +`<div class="card pad"><b>Карьерный трек</b><p class="mut sm">Выберите профессию — маршрут перестроится.</p><div class="chips">${CAREERS.map(c=>`<button class="chip btnchip ${JSON.stringify(u.pathIds)===JSON.stringify(c[2])?'on':''}" data-act="career:${c[0]}">${c[1]}</button>`).join('')}<button class="chip btnchip" data-act="career:auto">По результатам теста</button></div></div>
   <h2 class="sec">Учебный путь</h2><div class="grid2 start">${blocks}</div>
   <h2 class="sec">Карта навыков</h2><div class="skills">${skills.map(s=>`<div class="sk ${s.s}"><span class="pin">${s.s==='done'?ic('check',13):s.s==='lock'?ic('lock',12):''}</span><b>${esc(s.t)}</b><span class="mut sm">${esc(s.c)}</span><span class="sm">${{done:'Освоено',prog:'В процессе',open:'Доступно',lock:'Закрыто'}[s.s]}</span></div>`).join('')}</div>`,'path',true);
};
ACT.career=(el,id)=>{const u=me();u.pathIds=id==='auto'?null:CAREERS.find(c=>c[0]===id)[2].slice();save();toast('Маршрут обновлён.');render();};

/* ---------- practice ---------- */
const tStatus=(u,id)=>(u.tasks[id]||{}).status==='ok'?'ok':u.tasks[id]?'try':'';
V.practice=()=>{
  const u=me(),F=UI.f;
  const lang=F.lang||'js',meta=PRACTICE_LANGS.find(x=>x.id===lang)||PRACTICE_LANGS[0];
  const list=TASKS.filter(t=>t.lang===lang&&(!F.diff||t.diff===F.diff)&&(!F.topic||t.topic===F.topic)&&(!F.status||(F.status==='ok'?tStatus(u,t.id)==='ok':tStatus(u,t.id)!=='ok')));
  const sel=(k,label,opts)=>`<label class="fl">${label}<select data-chg="filter:${k}"><option value="">Все</option>${opts.map(o=>`<option ${F[k]===o[0]?'selected':''} value="${o[0]}">${o[1]}</option>`).join('')}</select></label>`;
  const topics=[...new Set(list.map(t=>t.topic))];
  return shell(pageHead('Практика',`${meta.name}: ${meta.description}.`)
   +`<div class="practice-language-tabs" role="tablist" aria-label="Выбор языка">${PRACTICE_LANGS.map(x=>`<button class="tab ${lang===x.id?'on':''}" data-act="practiceLang:${x.id}" role="tab" aria-selected="${lang===x.id}">${x.name}<small>${TASKS.filter(t=>t.lang===x.id).length} заданий</small></button>`).join('')}</div>
   <div class="card pad practice-topic-summary"><div class="row sb wrap g"><b>Задания на ${esc(meta.name)}</b><span class="mut sm">${list.length} всего</span></div><div class="chips">${topics.map(x=>chip(x+' · '+list.filter(t=>t.topic===x).length,'acc')).join('')}</div></div>
   <div class="filters"><label class="fl">Язык<select disabled><option>${esc(meta.name)}</option></select></label>${sel('diff','Сложность',['Beginner','Easy','Medium'].map(x=>[x,x]))}${sel('topic','Тема',topics.map(x=>[x,x+' ('+list.filter(t=>t.topic===x).length+')']))}${sel('status','Статус',[['ok','Решённые'],['no','Нерешённые']])}</div>
   ${list.length?`<div class="list">${list.map(t=>`<a class="card row sb pad hov" href="#/task/${t.id}"><div><b>${esc(t.t)}</b><div class="mut sm">${esc(t.topic)} · ${esc(meta.name)}</div></div><div class="row g">${chip(t.diff,t.diff==='Medium'?'warn':'')}${tStatus(u,t.id)==='ok'?chip('Решено','ok'):tStatus(u,t.id)==='try'?chip('Попытка'):''}</div></a>`).join('')}</div>`:empty('Ничего не найдено','Измените фильтры, чтобы увидеть задачи.','<button class="btn ghost" data-act="clearf">Сбросить фильтры</button>')}
   ${meta.run?'':'<p class="mut sm practice-note">Задания этого языка пока доступны в теоретическом режиме. Редактор кода и server sandbox будут добавлены позже.</p>'}`,'practice');
};
CHG.filter=(el,k)=>{UI.f[k]=el.value;render();};
ACT.practiceLang=(_el,lang)=>{UI.f={lang,diff:'',topic:'',status:''};render();};
ACT.clearf=()=>{UI.f={lang:UI.f.lang||'js',diff:'',topic:'',status:''};render();};
V.task=id=>{
  const u=me(),t=TASKS.find(x=>x.id===id);if(!t)return notFound();
  const st=tStatus(u,id),daily=taskOfDay().id===id;
  const meta=PRACTICE_LANGS.find(x=>x.id===t.lang)||PRACTICE_LANGS[0],canRun=t.lang==='js';
  return shell(`<a class="mut sm" href="#/practice">← Практика</a><div class="tgrid"><section><div class="row sb wrap g"><h1>${esc(t.t)}</h1>${saveBtn('task:'+id)}</div><div class="chips">${chip(t.diff,t.diff==='Medium'?'warn':'')}${chip(t.topic)}${st==='ok'?chip('Решено','ok'):''}${daily?chip('Челлендж дня · +30 XP','acc'):''}</div>
   <div class="prose"><p>${t.desc}</p></div><h3>Пример</h3><pre class="codeblk"><code>${esc(t.ex[0])}\n// → ${esc(t.ex[1])}</code></pre><p class="mut sm">Ограничения: ${esc(t.lim)}. Награда: +20 XP за первое решение.</p></section>
   <section><div class="ed"><div class="edbar"><span class="mut sm">${esc(meta.name)}</span><div class="row g"><button class="btn ghost sm" data-act="reset:${id}">Сбросить</button>${canRun?`<button class="btn ghost sm" data-act="runtask:${id}">${ic('play',13)}Запустить</button><button class="btn sm" data-act="submit:${id}">Отправить</button>`:'<span class="chip">Server sandbox позже</span>'}</div></div><textarea class="code" data-code="${id}" spellcheck="false" autocapitalize="off" rows="12" aria-label="Редактор кода">${esc(UI.code[id]??(u.tasks[id]&&u.tasks[id].code)??t.starter)}</textarea></div>
   <div class="out" id="out" aria-live="polite">«Запустить» проверяет примеры, «Отправить» — все тесты, включая скрытые.</div></section></div>`,'practice',true);
};
function resultsHtml(t,r,hidden){
  if(r.error)return `<p class="errt">${esc(r.error)}</p>`;
  return (r.logs.length?`<pre>${esc(r.logs.slice(0,20).join('\n'))}</pre>`:'')+`<table class="tt"><tr><th>Тест</th><th>Вход</th><th>Ожидалось</th><th>Получено</th></tr>${r.results.map((x,i)=>{const hid=hidden&&i>=2;return `<tr class="${x.ok?'okr':'badr'}"><td>${i+1} ${x.ok?ic('check',13):ic('x',13)}</td>${hid?`<td colspan="3" class="mut">скрытый тест — ${x.ok?'пройден':'не пройден'}</td>`:`<td><code>${esc(JSON.stringify(t.cases[i].a).slice(1,-1))}</code></td><td><code>${esc(JSON.stringify(t.cases[i].e))}</code></td><td><code>${esc(x.got)}</code></td>`}</tr>`;}).join('')}</table>`;
}
ACT.runtask=async(el,id)=>{
  const u=me(),t=TASKS.find(x=>x.id===id),ta=$('textarea[data-code]');UI.code[id]=ta.value;const out=$('#out');
  const done=busy(el,'Запуск…');out.textContent='Выполняется…';
  const r=await sandbox(ta.value,t.fn,t.cases.slice(0,2));done();out.innerHTML=(r.error?`<p class="errt"><b>${/^SyntaxError/.test(r.error)?'Compilation Error':'Runtime Error'}</b></p>`:'')+resultsHtml(t,r,false);
  if(!u.ran){u.ran=true;checkAch(u);}save();
};
ACT.submit=async(el,id)=>{
  const u=me(),t=TASKS.find(x=>x.id===id),ta=$('textarea[data-code]');UI.code[id]=ta.value;const out=$('#out');
  const done=busy(el,'Проверка…');out.textContent='Проверяем решение…';
  const r=await sandbox(ta.value,t.fn,t.cases);done();
  const pass=!r.error&&r.results.every(x=>x.ok);
  const wrongRun=!r.error&&r.results.some(x=>/^Ошибка:/.test(x.got));
  const verdict=pass?'Accepted':r.error?(/^SyntaxError/.test(r.error)?'Compilation Error':'Runtime Error'):wrongRun?'Runtime Error':'Wrong Answer';
  const first=!(u.tasks[id]&&u.tasks[id].status==='ok');
  u.ran=true;u.tasks[id]={status:pass||!first?'ok':'try',code:ta.value,date:today()};
  let extra='';
  if(pass&&first){award(u,20,'Решена задача «'+t.t+'»');extra=' +20 XP';
    if(taskOfDay().id===id&&u.daily!==today()){u.daily=today();award(u,30,'Выполнен челлендж дня');extra+=' +30 XP за челлендж дня';}}
  else checkAch(u);
  save();
  out.innerHTML=`<p class="verdict ${pass?'okt':'errt'}"><b>${verdict}</b>${extra?`<span> —${extra}</span>`:''}</p>`+resultsHtml(t,r,true);
  if(pass)toast(first?'Принято!'+extra:'Принято.');
};

/* ---------- challenges ---------- */
V.challenges=()=>{
  const u=me(),t=taskOfDay(),ok=u.daily===today(),st=streak(u),days=[...Array(14)].map((_,i)=>daysAgo(13-i));
  return shell(pageHead('Челленджи','Одна небольшая задача в день. Выполните её — получите бонус и продлите серию.')
   +`<div class="grid-main"><section class="card pad"><span class="mut sm">Сегодня</span><h2>${esc(t.t)}</h2><p>${t.desc}</p><div class="chips">${chip(t.diff)}${chip(t.topic)}${chip('+30 XP','acc')}</div>${ok?'<p class="okt">Выполнено сегодня. Новый челлендж появится завтра.</p>':`<a class="btn" href="#/task/${t.id}">Решить задачу</a>`}</section>
   <section class="card pad"><h3>Серия: ${pl(st,['день','дня','дней'])}</h3><div class="days">${days.map(d=>`<span class="day ${u.days.includes(d)?'on':''}" title="${fdate(d)}"></span>`).join('')}</div><p class="mut sm">Последние 14 дней. День засчитывается за любое занятие: урок, задачу или челлендж.</p></section></div>`,'challenges');
};

/* ---------- exam ---------- */
V.exam=cid=>{
  const u=me(),c=getCourse(cid);if(!c)return notFound();
  const p=courseProg(u,c);
  if(p.pct<100)return shell(empty('Экзамен пока закрыт','Завершите все уроки курса «'+esc(c.t)+'» ('+p.done+' из '+p.total+').','<a class="btn" href="#/course/'+c.id+'">К курсу</a>'),'learn');
  const qs=flatLessons(c).map(l=>l.quiz),ans=UI.ex[cid]||(UI.ex[cid]={a:[],done:false});
  if(ans.done){const e=u.exams[cid];
    return shell(`<div class="card pad center-c"><div class="big">${e.pct}<small>%</small></div><h1>${e.passed?'Курс завершён':'Попробуйте ещё раз'}</h1><p class="mut">Правильных ответов: ${e.score} из ${e.total}. Проходной балл — 70%.</p><div class="row g wrap">${e.passed?`<a class="btn" href="#/certificates">Мои сертификаты</a>`:`<button class="btn" data-act="exretry:${cid}">Пересдать</button>`}<a class="btn ghost" href="#/course/${cid}">К курсу</a></div></div>`,'learn');}
  return shell(`<a class="mut sm" href="#/course/${cid}">← ${esc(c.t)}</a>${pageHead('Итоговый экзамен: '+esc(c.t),pl(qs.length,['вопрос','вопроса','вопросов'])+', проходной балл 70%. Можно вернуться и изменить ответы до отправки.')}
  ${qs.map((q,i)=>`<fieldset class="card pad exq"><legend>Вопрос ${i+1}</legend><p><b>${esc(q.q)}</b></p>${q.o.map((o,k)=>`<label class="rad"><input type="radio" name="q${i}" value="${k}" data-chg="exq:${cid}:${i}" ${ans.a[i]===k?'checked':''}> ${esc(o)}</label>`).join('')}</fieldset>`).join('')}
  <div class="row g"><button class="btn" data-act="submitexam:${cid}">Отправить ответы</button></div>`,'learn');
};
CHG.exq=(el,cid,i)=>{UI.ex[cid].a[+i]=+el.value;};
ACT.exretry=(el,cid)=>{UI.ex[cid]={a:[],done:false};render();};
ACT.submitexam=(el,cid)=>{
  const u=me(),c=getCourse(cid),qs=flatLessons(c).map(l=>l.quiz),a=UI.ex[cid].a;
  if(qs.some((q,i)=>a[i]===undefined))return toast('Ответьте на все вопросы.','err');
  const score=qs.filter((q,i)=>a[i]===q.a).length,pct=Math.round(score/qs.length*100),passed=pct>=70;
  u.exams[cid]={score,total:qs.length,pct,passed,date:today()};UI.ex[cid].done=true;
  if(passed){
    let cert=Object.values(DB.certs).find(x=>x.user===u.username&&x.course===cid);
    if(!cert){let id;do{id='CERT-'+Math.floor(100000+Math.random()*900000);}while(DB.certs[id]);cert=DB.certs[id]={id,user:u.username,course:cid,date:today(),level:c.level};
      award(u,50,'Курс пройден: '+c.t);notify(u.username,'Курс «'+c.t+'» завершён. Сертификат '+id+' готов.');toast('Курс завершён! Сертификат создан.');}
  }
  save();render();
};
