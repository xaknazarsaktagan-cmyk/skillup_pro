/* ================= CORE ================= */
const $=(s,e=document)=>e.querySelector(s);
const $$=(s,e=document)=>[...e.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pl=(n,f)=>{const a=Math.abs(n)%100,b=a%10;return n+' '+(a>10&&a<20?f[2]:b>1&&b<5?f[1]:b===1?f[0]:f[2]);};
const ymd=d=>{const x=new Date(d);return new Date(x.getTime()-x.getTimezoneOffset()*6e4).toISOString().slice(0,10);};
const today=()=>ymd(Date.now());
const daysAgo=n=>ymd(Date.now()-n*864e5);
const money=n=>n?new Intl.NumberFormat('ru-RU').format(n)+' ₸':'Бесплатно';
const fdate=d=>new Date(d).toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'});
const uid=p=>p+Math.random().toString(36).slice(2,8);
const app=document.getElementById('app');

const IC={
home:'<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>',book:'<path d="M4 4h6a3 3 0 013 3v13a2 2 0 00-2-2H4zM20 4h-6a3 3 0 00-3 3v13a2 2 0 012-2h7z"/>',
map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',code:'<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
flame:'<path d="M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z"/>',folder:'<path d="M3 6a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
chat:'<path d="M4 5h16v11H9l-5 4z"/>',award:'<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 21l5-3 5 3-1.5-7"/>',
trophy:'<path d="M7 4h10v5a5 5 0 01-10 0zM7 6H4v2a3 3 0 003 3M17 6h3v2a3 3 0 01-3 3M12 14v4M8 21h8"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
bell:'<path d="M6 9a6 6 0 0112 0c0 6 2 7 2 8H4c0-1 2-2 2-8zM10 21h4"/>',
gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
out:'<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>',
moon:'<path d="M20 14A8 8 0 1110 4a6 6 0 0010 10z"/>',bookmark:'<path d="M6 3h12v18l-6-4-6 4z"/>',heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/>',
lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',check:'<path d="M5 12l5 5 9-10"/>',play:'<path d="M7 4l13 8-13 8z"/>',
plus:'<path d="M12 5v14M5 12h14"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-5 7-5s7 1.5 7 5M17 4.5a3.5 3.5 0 010 7M22 20c0-2.5-1.5-4-4-4.6"/>',
shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',more:'<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',flag:'<path d="M5 21V4h11l-2 4 2 4H5"/>',
chevdown:'<path d="M6 9l6 6 6-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',
zap:'<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>',
rocket:'<path d="M12 2.5c2.3 1.9 3.7 5 3.7 8.3 0 1.9-.5 3.4-1.3 4.7l-1 3.5-1.4-2-1.4 2-1-3.5c-.8-1.3-1.3-2.8-1.3-4.7 0-3.3 1.4-6.4 3.7-8.3z"/><circle cx="12" cy="10.3" r="1.6"/><path d="M8.3 14.8c-1.8.6-2.7 2.2-2.7 4.9 2.3 0 3.7-.9 4.6-2.3M15.7 14.8c1.8.6 2.7 2.2 2.7 4.9-2.3 0-3.7-.9-4.6-2.3"/>',
download:'<path d="M12 3v12M7.5 10.5L12 15l4.5-4.5M5 21h14"/>'
};
const ic=(n,s=18)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]||''}</svg>`;

/* Skill Up brand emblem: learning path + code cursor + rising progress.
   It stays inline so it remains crisp, lightweight, and easy to animate in CSS. */
const brandIcon=(size=16)=>`<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">`
 +'<rect x="3" y="3" width="26" height="26" rx="8" fill="currentColor" opacity=".12"/>'
 +'<path d="M8 22V14M13 22V10M18 22V16M23 22V7" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" opacity=".88"/>'
 +'<path d="M7 24h18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" opacity=".42"/>'
 +'<path d="m19 7 4 0-1.7 4.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>'
 +'<circle cx="23" cy="7" r="2" fill="currentColor"/>'
 +'</svg>';

/* ---------- storage ---------- */
const KEY='codepath.v1';
let DB=null;
const UI={qa:{},code:{},f:{lang:'js',diff:'',topic:'',status:''},pf:{cat:'',price:'',sort:'new',q:''},ob:{step:1,goal:'',interests:[]},ex:{},cm:'',lb:'week',lb2:'global',run:{},openPost:'',menuOpen:false,navOpen:false,mnavOpen:false};
function load(){try{const r=localStorage.getItem(KEY);if(r)return JSON.parse(r);}catch(e){}return null;}
function save(){try{localStorage.setItem(KEY,JSON.stringify(DB));}catch(e){}}
const me=()=>DB.session?DB.users[DB.session]:null;
const allCourses=()=>COURSES.concat(DB.courses||[]);
const getCourse=id=>allCourses().find(c=>c.id===id);
const flatLessons=c=>c.mods.flatMap((m,mi)=>m.ls.map(l=>Object.assign({mi},l)));
function findLesson(id){for(const c of allCourses())for(const m of c.mods)for(const l of m.ls)if(l.id===id)return{c,m,l};return null;}
const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;

async function hashPw(p,u){
  const s=u.toLowerCase()+':'+p+':codepath';
  try{if(crypto&&crypto.subtle){const d=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,'0')).join('');}}catch(e){}
  let h=5381;for(const c of s)h=((h<<5)+h+c.charCodeAt(0))>>>0;return 'x'+h.toString(16);
}
function blankUser(o){return Object.assign({role:'student',bio:'',avatar:'',skills:[],links:{github:'',linkedin:''},goal:'',interests:[],lang:'',level:'',testResult:null,pathIds:null,lessons:{},tasks:{},exams:{},xp:0,xpLog:[],days:[],ach:[],bm:[],following:[],notifs:[],log:[],daily:'',blocked:false,ran:false,created:today(),direction:'',dirTest:null,roadmap:{}},o);}

async function seed(){
  const D={v:1,users:{},session:null,projects:[],posts:[],reports:[],purchases:[],certs:{},courses:[],test:null,theme:null};
  const mk=async(username,name,pw,role,ex)=>{D.users[username]=blankUser(Object.assign({username,name,role,email:username+'@codepath.demo',pass:await hashPw(pw,username),color:Object.keys(D.users).length%6},ex||{}));return D.users[username];};
  const doneL=(u,ids,back)=>ids.forEach((id,i)=>{u.lessons[id]=daysAgo(back+ids.length-i);});
  const res=(pct,lang,level,strong,weak)=>({pct,correct:Math.round(pct*12/100),total:12,level,lang,strong,weak,date:daysAgo(9)});
  const k=await mk('korkem','Korkem','student123','student',{bio:'Учусь на разработчика. Люблю фронтенд и алгоритмы.',skills:['HTML','CSS','JavaScript'],goal:'Найти работу',interests:['Веб'],lang:'js',level:'Elementary',links:{github:'github.com/korkem',linkedin:''}});
  k.testResult=res(58,'js','Elementary',['Переменные','Циклы','Синтаксис'],['Рекурсия','Алгоритмы','Отладка']);
  doneL(k,['web-1','web-2','web-3','web-4','js-1','js-2','js-3'],1);
  k.tasks.t1={status:'ok',code:'function sumTo(n){let s=0;for(let i=1;i<=n;i++)s+=i;return s;}',date:daysAgo(2)};
  k.tasks.t2={status:'ok',code:'function reverseString(s){return s.split("").reverse().join("");}',date:daysAgo(1)};
  k.exams.web={pct:100,score:4,total:4,passed:true,date:daysAgo(3)};
  k.xp=420;k.xpLog=[{d:daysAgo(20),xp:200},{d:daysAgo(3),xp:120},{d:daysAgo(1),xp:100}];
  k.days=[0,1,2,3,4].map(daysAgo);k.ach=['first_code','first_lesson'];k.bm=['project:p1','lesson:js-4'];k.following=['alex'];
  k.notifs=[{id:uid('n'),text:'Добро пожаловать в Skill Up! Ваш маршрут уже готов.',date:daysAgo(9),read:true},{id:uid('n'),text:'Доступен новый ежедневный челлендж.',date:today(),read:false}];
  k.log=[{d:daysAgo(1),t:'Решена задача «Развернуть строку»'},{d:daysAgo(1),t:'Завершён урок «Условия if / else»'},{d:daysAgo(3),t:'Получен сертификат по курсу HTML & CSS'}];
  const a=await mk('alex','Alex Petrov','alex123','student',{bio:'Backend-разработчик. Продаю шаблоны и делюсь разбором кода.',skills:['Python','SQL','Java','JavaScript'],lang:'py',level:'Advanced',goal:'Делать проекты',links:{github:'github.com/alexp',linkedin:'linkedin.com/in/alexp'}});
  a.testResult=res(92,'py','Advanced',['Функции','Циклы','Алгоритмы'],['Рекурсия']);
  doneL(a,['py-1','py-2','py-3','py-4'],10);a.exams.py={pct:100,score:4,total:4,passed:true,date:daysAgo(8)};
  ['t1','t2','t3','t4','t5','t6'].forEach((t,i)=>{a.tasks[t]={status:'ok',code:'',date:daysAgo(12-i)};});
  a.xp=1320;a.xpLog=[{d:daysAgo(60),xp:900},{d:daysAgo(10),xp:280},{d:daysAgo(2),xp:140}];a.days=[0,1].map(daysAgo);a.ach=['first_code','first_lesson','tasks5','first_project','course_done'];
  D.certs['CERT-482915']={id:'CERT-482915',user:'alex',course:'py',date:daysAgo(8),level:'Beginner'};
  D.certs['CERT-739204']={id:'CERT-739204',user:'korkem',course:'web',date:daysAgo(3),level:'Beginner'};
  k.ach.push('course_done');
  await mk('teacher','Айгерим Сериккызы','teacher123','instructor',{bio:'Преподаватель информатики. 8 лет опыта.',skills:['Python','JavaScript','SQL']});
  await mk('admin','Администратор','admin123','admin',{bio:'Модерация платформы.'});
  const extra=[['aida','Aida Nurlanova',['Python','AI'],1650,310,120],['dias','Dias Kenzhebek',['Java','Android'],980,210,60],['madina','Madina Omarova',['Python','Security'],760,180,90],['timur','Timur Akhmetov',['UI/UX','CSS'],540,90,30]];
  for(const [u,n,s,xp,w,m] of extra){const x=await mk(u,n,'demo123','student',{skills:s,bio:'Разработчик и автор проектов в Skill Up.',lang:'py',level:'Intermediate'});x.xp=xp;x.xpLog=[{d:daysAgo(90),xp:xp-w-m},{d:daysAgo(15),xp:m},{d:daysAgo(2),xp:w}];x.days=[0,1,2].map(daysAgo);}
  const rv=(u,r,t)=>({u,rating:r,text:t,date:daysAgo(4)});
  D.projects=[
   {id:'p1',title:'Modern Portfolio Website',author:'alex',cat:'Web',tech:['HTML','CSS','JavaScript'],price:15000,sold:24,date:daysAgo(30),tone:1,desc:'Адаптивный сайт-портфолио с тёмной и светлой темой, секциями проектов и контактной формой. Чистый код без фреймворков — удобно разбираться и дорабатывать.',feats:['Тёмная и светлая тема','Адаптивная вёрстка','Секция проектов с фильтрами','Контактная форма'],github:'github.com/alexp/portfolio',demo:'alexp.dev/portfolio',reviews:[rv('aida',5,'Аккуратный код, легко адаптировать под себя.'),rv('dias',4,'Хорошая структура, не хватило README.')]},
   {id:'p2',title:'Telegram-бот: расписание занятий',author:'aida',cat:'Python',tech:['Python','SQLite'],price:0,sold:58,date:daysAgo(12),tone:2,desc:'Бот, который присылает расписание и напоминания о занятиях. Хранит данные в SQLite, поддерживает несколько групп.',feats:['Команды /today и /week','Напоминания за 15 минут','Несколько групп'],github:'github.com/aida/schedule-bot',demo:'',reviews:[rv('timur',5,'Запустился с первого раза.')]},
   {id:'p3',title:'Task Manager на Java Swing',author:'dias',cat:'Java',tech:['Java','Swing'],price:9000,sold:11,date:daysAgo(20),tone:3,desc:'Десктопное приложение для списка задач: категории, приоритеты, сохранение в файл. Хороший пример ООП для учебного проекта.',feats:['Категории и приоритеты','Сохранение в файл','Паттерн MVC'],github:'github.com/dias/task-manager',demo:'',reviews:[rv('korkem',4,'Пригодился для курсовой.')]},
   {id:'p4',title:'Weather Dashboard',author:'alex',cat:'JavaScript',tech:['JavaScript','REST API'],price:0,sold:73,date:daysAgo(6),tone:4,desc:'Панель погоды: поиск города, прогноз на неделю, график температуры. Пример работы с внешним API и асинхронным кодом.',feats:['Поиск по городу','Прогноз на 7 дней','Работа с fetch и async/await'],github:'github.com/alexp/weather',demo:'alexp.dev/weather',reviews:[rv('madina',5,'Отличный пример async/await.'),rv('aida',4,'Понятно и коротко.')]},
   {id:'p5',title:'Password Strength Checker',author:'madina',cat:'Cybersecurity',tech:['Python','Security'],price:4500,sold:9,date:daysAgo(15),tone:5,desc:'Инструмент оценивает надёжность пароля: энтропия, словари утечек, типовые шаблоны. Работает офлайн.',feats:['Оценка энтропии','Проверка по словарю','Рекомендации по улучшению'],github:'github.com/madina/pwcheck',demo:'',reviews:[rv('alex',5,'Полезно для лабораторной по ИБ.')]},
   {id:'p6',title:'Finance Tracker UI Kit',author:'timur',cat:'UI/UX',tech:['Figma','UI/UX'],price:12000,sold:17,date:daysAgo(9),tone:0,desc:'Набор экранов для приложения личных финансов: 40+ экранов, компоненты, светлая и тёмная темы.',feats:['40+ экранов','Компоненты и стили','Две темы'],github:'',demo:'timur.design/finance',reviews:[rv('aida',5,'Очень чистая работа.')]},
   {id:'p7',title:'Habit Tracker',author:'dias',cat:'Mobile',tech:['Flutter','Dart'],price:11000,sold:6,date:daysAgo(4),tone:2,desc:'Мобильное приложение для отслеживания привычек с календарём, статистикой и уведомлениями.',feats:['Календарь привычек','Статистика по неделям','Локальные уведомления'],github:'github.com/dias/habits',demo:'',reviews:[]},
   {id:'p8',title:'Sentiment Analyzer',author:'aida',cat:'AI',tech:['Python','scikit-learn'],price:18000,sold:5,date:daysAgo(3),tone:1,desc:'Модель определения тональности отзывов на русском языке с ноутбуком обучения и веб-демо.',feats:['Обучающий ноутбук','Готовая модель','Простое веб-демо'],github:'github.com/aida/sentiment',demo:'',reviews:[rv('alex',4,'Хорошая отправная точка для ML.')]}
  ];
  D.posts=[
   {id:'c1',author:'dias',kind:'Вопрос',title:'Почему мой Java-код не компилируется?',body:'Пишет "cannot find symbol" на строке с ArrayList. Импорт добавил. Что ещё может быть?',date:daysAgo(2),likes:['korkem'],saves:[],comments:[{u:'alex',text:'Проверьте, что импортировали java.util.ArrayList, а не просто java.util. И что тип в угловых скобках указан.',date:daysAgo(2)}]},
   {id:'c2',author:'aida',kind:'Показать',title:'Мой Telegram-бот для расписания теперь бесплатный',body:'Выложила исходники в разделе проектов. Буду рада отзывам и pull request-ам.',date:daysAgo(5),likes:['alex','madina','timur'],saves:[],comments:[]},
   {id:'c3',author:'korkem',kind:'Обсуждение',title:'С чего начать после HTML и CSS?',body:'Прошёл курс по вёрстке. Идти сразу в React или сначала закрепить чистый JavaScript?',date:daysAgo(1),likes:[],saves:[],comments:[{u:'alex',text:'Сначала JavaScript: массивы, функции, DOM и async. React проще даётся, когда база уже есть.',date:daysAgo(1)}]}
  ];
  DB=D;save();
}

/* ---------- gamification ---------- */
const streak=u=>{const s=new Set(u.days);const d=new Date();let n=0;if(!s.has(ymd(d)))d.setDate(d.getDate()-1);while(s.has(ymd(d))){n++;d.setDate(d.getDate()-1);}return n;};
const lvl=xp=>Math.floor(Math.sqrt(xp/50))+1;
const lvlFloor=n=>50*(n-1)*(n-1);
function notify(username,text){const u=DB.users[username];if(!u)return;u.notifs.unshift({id:uid('n'),text,date:today(),read:false});}
function logAct(u,t){u.log.unshift({d:today(),t});u.log=u.log.slice(0,20);if(!u.days.includes(today()))u.days.push(today());}
function award(u,xp,text){
  const before=lvl(u.xp);u.xp+=xp;u.xpLog.push({d:today(),xp});logAct(u,text);
  if(lvl(u.xp)>before)notify(u.username,'Новый уровень: '+lvl(u.xp)+'. Так держать!');
  checkAch(u);
}
function checkAch(u){
  const has=id=>u.ach.includes(id);const give=id=>{if(has(id))return;u.ach.push(id);const a=ACHS.find(x=>x.id===id);notify(u.username,'Достижение: «'+a.t+'»');toast('Достижение: '+a.t);};
  if(u.ran)give('first_code');
  if(Object.keys(u.lessons).length)give('first_lesson');
  if(Object.values(u.tasks).filter(t=>t.status==='ok').length>=5)give('tasks5');
  if(streak(u)>=7)give('streak7');
  if(DB.projects.some(p=>p.author===u.username))give('first_project');
  if(Object.values(DB.certs).some(c=>c.user===u.username))give('course_done');
}
const courseProg=(u,c)=>{const fl=flatLessons(c);const done=fl.filter(l=>u.lessons[l.id]).length;return{done,total:fl.length,pct:fl.length?Math.round(done/fl.length*100):0};};
const courseDone=(u,c)=>courseProg(u,c).pct===100&&(u.exams[c.id]||{}).passed;
const nextLesson=(u,c)=>flatLessons(c).find(l=>!u.lessons[l.id]);
function pathIds(u){
  if(u.pathIds)return u.pathIds;
  let ids=(PATHS[u.lang||'js']||PATHS.js).slice();
  if(LEVELS.indexOf(u.level)>=2&&ids.length>1)ids=ids.slice(1);
  return ids;
}
const pathCourses=u=>pathIds(u).map(getCourse).filter(Boolean);
const currentCourse=u=>{const p=pathCourses(u);return p.find(c=>courseProg(u,c).pct<100||!courseDone(u,c))||p[0];};
const taskOfDay=()=>TASKS.filter(t=>t.lang==='js')[Math.floor(Date.now()/864e5)%TASKS.filter(t=>t.lang==='js').length];
const rating=p=>avg(p.reviews.map(r=>r.rating));
const dayXp=(u,n)=>u.xpLog.filter(x=>x.d>=daysAgo(n)).reduce((s,x)=>s+x.xp,0);
const ytId=url=>{const m=String(url||'').match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);return m?m[1]:'';};

/* ---------- career: IT direction test & roadmap ---------- */
const getDir=id=>DIRECTIONS.find(d=>d.id===id);
function dirScores(ans){
  const out={};
  DIRECTIONS.forEach(d=>{let num=0,den=0;DIR_AXES.forEach((ax,i)=>{const w=d.w[ax]||0;num+=w*((ans[i]-1)/4);den+=w;});out[d.id]=den?Math.round(num/den*100):0;});
  return out;
}
function moduleDone(u,courseId,modTitle){const c=getCourse(courseId);if(!c)return false;const m=c.mods.find(x=>x.t===modTitle);if(!m)return false;return m.ls.every(l=>u.lessons[l.id]);}
function stepDone(u,dir,step){
  if(step.type==='module')return moduleDone(u,step.course,step.mod);
  if(step.type==='course'){const c=getCourse(step.course);return c?courseDone(u,c):false;}
  if(step.type==='project')return DB.projects.some(p=>p.author===u.username);
  if(step.type==='portfolio')return DB.projects.some(p=>p.author===u.username);
  if(step.type==='custom'||step.type==='milestone')return !!((u.roadmap[dir.id]||{})[step.k]);
  return false;
}
function roadmapSteps(u,dirId){
  const dir=getDir(dirId);if(!dir)return [];
  let locked=false;
  return dir.roadmap.map(step=>{
    const done=stepDone(u,dir,step),manual=step.type==='custom'||step.type==='milestone';
    const state=done?'done':locked?'lock':'now';if(!done)locked=true;
    let href='';
    if(step.type==='module'||step.type==='course')href='#/course/'+step.course;
    else if(step.type==='project')href='#/projects/new';
    else if(step.type==='portfolio')href='#/portfolio';
    return Object.assign({},step,{done,state,href,manual});
  });
}
function roadmapProgress(u,dirId){
  const all=roadmapSteps(u,dirId),steps=all.filter(s=>s.type!=='milestone'),done=steps.filter(s=>s.done).length;
  return {all,steps,done,total:steps.length,pct:steps.length?Math.round(done/steps.length*100):0};
}

/* ---------- toast & modal ---------- */
function toast(msg,type){const t=document.createElement('div');t.className='toast '+(type||'');t.textContent=msg;t.setAttribute('role','status');$('#toasts').appendChild(t);setTimeout(()=>t.remove(),3200);}
function modal(html){$('#modal').innerHTML='<div class="mback" data-act="closemodal"></div><div class="mbox" role="dialog" aria-modal="true">'+html+'</div>';$('#modal').hidden=false;}
function closeModal(){$('#modal').hidden=true;$('#modal').innerHTML='';}

/* ---------- sandbox: user code never runs in the app's own context ---------- */
const TIMEOUT_MSG='Превышено время выполнения (3 секунды). Проверьте, нет ли бесконечного цикла.';
function runnerBody(P){
  return 'const P='+JSON.stringify(P).replace(/</g,'\\u003c')+';const logs=[];const fmt=v=>{if(typeof v==="string")return v;try{return JSON.stringify(v)}catch(e){return String(v)}};'
   +'console.log=console.info=console.warn=console.error=(...a)=>logs.push(a.map(fmt).join(" "));'
   +'const out={id:P.id,logs,error:null,results:null};let f=null;'
   +'try{f=(0,eval)(P.code+(P.fn?"\\n;(typeof "+P.fn+"===\'function\')?"+P.fn+":null":""));}catch(e){out.error=e.name+": "+e.message;}'
   +'if(!out.error&&P.tests){if(typeof f!=="function")out.error="Функция "+P.fn+" не найдена. Не переименовывайте её.";else out.results=P.tests.map(t=>{try{const got=f(...JSON.parse(JSON.stringify(t.a)));return{ok:JSON.stringify(got)===JSON.stringify(t.e),got:fmt(got===undefined?"undefined":got)};}catch(e){return{ok:false,got:"Ошибка: "+e.message};}});}'
   +'if(typeof window==="undefined")self.postMessage(out);else parent.postMessage(out,"*");';
}
/* preferred: a Web Worker (no DOM access, can be terminated on infinite loops) */
function viaWorker(P){
  return new Promise((res,rej)=>{
    let w,url;
    try{url=URL.createObjectURL(new Blob([runnerBody(P)],{type:'text/javascript'}));w=new Worker(url);}catch(e){return rej(e);}
    const fin=(fn,v)=>{clearTimeout(t);w.terminate();URL.revokeObjectURL(url);fn(v);};
    const t=setTimeout(()=>fin(res,{logs:[],error:TIMEOUT_MSG,results:null}),3000);
    w.onmessage=e=>fin(res,e.data);
    w.onerror=e=>fin(rej,e);
  });
}
/* fallback: sandboxed iframe with an opaque origin */
function viaIframe(P){
  return new Promise(res=>{
    const f=document.createElement('iframe');f.setAttribute('sandbox','allow-scripts');f.style.display='none';let done=false;
    const fin=v=>{if(done)return;done=true;clearTimeout(t);removeEventListener('message',on);f.remove();res(v);};
    const t=setTimeout(()=>fin({logs:[],error:TIMEOUT_MSG,results:null}),3000);
    const on=e=>{if(e.source===f.contentWindow&&e.data&&e.data.id===P.id)fin(e.data);};
    addEventListener('message',on);
    f.srcdoc='<script>'+runnerBody(P)+'<\/script>';document.body.appendChild(f);
  });
}
function sandbox(code,fn,tests){
  const P={id:uid('r'),code,fn,tests};
  return viaWorker(P).catch(()=>viaIframe(P));
}

/* ---------- router ---------- */
const PUBLIC=['','login','register','forgot','test','certificate'];
const route=()=>{const h=location.hash.replace(/^#\/?/,'');const [p,qs]=h.split('?');return{parts:p.split('/').filter(Boolean).map(decodeURIComponent),q:new URLSearchParams(qs||'')};};
const go=h=>{location.hash=h;};
let lastPath='';
function render(){
  const r=route();const p0=r.parts[0]||'';
  const navKey=location.hash.split('?')[0];if(navKey!==lastPath){UI.menuOpen=false;UI.navOpen=false;UI.mnavOpen=false;}
  if(DB.session&&(!DB.users[DB.session]||DB.users[DB.session].blocked)){DB.session=null;save();}
  if(!DB.session&&!PUBLIC.includes(p0)){location.replace('#/login');return;}
  document.documentElement.dataset.theme=DB.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  let html;
  try{html=dispatch(r,p0);}catch(e){console.error(e);html=DB.session?shell(errorState('Не удалось открыть страницу','Попробуйте обновить страницу или вернуться на панель.'),''):errorState('Ошибка','Попробуйте обновить страницу.');}
  if(html===null)return;
  app.innerHTML=html;
  const key=location.hash.split('?')[0];
  if(key!==lastPath){window.scrollTo(0,0);lastPath=key;}
  const t=$('[data-focus]');if(t&&document.activeElement===document.body)t.focus();
}
function dispatch(r,p0){
  const u=me();const a=r.parts[1];
  const need=role=>{if(!u||!role.includes(u.role)){return shell(errorState('Нет доступа','У вашей роли нет доступа к этому разделу.','<a class="btn" href="#/dashboard">На панель</a>'),'');}};
  switch(p0){
   case'':if(u){location.replace('#/dashboard');return null;}return V.landing();
   case'login':return V.login();
   case'register':return V.register();
   case'forgot':return V.forgot();
   case'test':return V.test();
   case'certificate':return V.certPublic(a);
   case'onboarding':return V.onboarding();
   case'dashboard':return V.dashboard();
   case'learn':return V.learn();
   case'course':return V.course(a);
   case'lesson':return V.lesson(a);
   case'path':return V.path();
   case'practice':return V.practice();
   case'task':return V.task(a);
   case'challenges':return V.challenges();
   case'exam':return V.exam(a);
   case'certificates':return V.certificates();
   case'leaderboard':return V.leaderboard();
   case'projects':return a==='new'?V.projectNew():V.projects();
   case'project':return V.project(a);
   case'my-projects':return V.myProjects();
   case'profile':case'u':return V.profile(a||u.username);
   case'settings':return V.settings();
   case'community':return V.community();
   case'saved':return V.saved();
   case'search':return V.search(r.q.get('q')||'');
   case'notifications':return V.notifications();
   case'teach':return need(['instructor','admin'])||V.teach();
   case'admin':return need(['admin'])||V.admin();
   case'more':return V.more();
   case'direction':return a==='test'?V.directionTest():V.direction();
   case'portfolio':return V.portfolio();
   case'journey':return V.journey();
   default:return shell(errorState('Страница не найдена','Такого адреса нет. Проверьте ссылку или вернитесь на панель.','<a class="btn" href="#/dashboard">На панель</a>'),'');
  }
}

/* ---------- shell ---------- */
const avatar=(u,s)=>u.avatar?`<span class="av av-photo ${s||''}"><img src="${u.avatar}" alt="${esc(u.name||u.username||'Профиль')}" loading="lazy"></span>`:`<span class="av av${(u.color||0)%6} ${s||''}" aria-hidden="true">${esc((u.name||u.username||'?').trim()[0].toUpperCase())}</span>`;
const bar=(p,cls)=>`<div class="bar ${cls||''}" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${Math.max(0,Math.min(100,p))}%"></i></div>`;
const chip=(t,c)=>`<span class="chip ${c||''}">${esc(t)}</span>`;
const empty=(t,d,btn)=>`<div class="empty"><h3>${esc(t)}</h3><p>${d}</p>${btn||''}</div>`;
const errorState=(t,d,btn)=>`<div class="empty err"><h3>${esc(t)}</h3><p>${esc(d)}</p>${btn||''}</div>`;
function shell(inner,active,wide){
  const u=me();const unread=u.notifs.filter(n=>!n.read).length;
  /* primary sidebar group — the everyday learning path */
  const primary=[['dashboard','Дашборд','home'],['direction','Моё направление','flag'],['path','Roadmap','map'],['learn','Учиться','book'],['practice','Практика','code'],['challenges','Челленджи','flame'],['projects','Проекты','folder'],['portfolio','Портфолио','star'],['journey','Career Journey','trophy']];
  /* secondary sidebar group — recognition & identity */
  const secondary=[['leaderboard','Рейтинг','award'],['certificates','Сертификаты','shield']];
  /* overflow — tucked behind "Ещё" so the sidebar itself stays short and scannable */
  const more=[['community','Сообщество','chat'],['saved','Сохранённое','bookmark'],['settings','Настройки','gear']];
  if(u.role!=='student')more.push(['teach','Кабинет преподавателя','users']);
  if(u.role==='admin')more.push(['admin','Админ-панель','shield']);
  const moreOn=more.some(n=>n[0]===active);
  const l=lvl(u.xp),fl=lvlFloor(l),cl=lvlFloor(l+1);
  const dark=document.documentElement.dataset.theme==='dark';
  const bn=[['dashboard','Панель','home'],['learn','Учиться','book'],['practice','Практика','code'],['projects','Проекты','folder'],['more','Ещё','more']];
  const allLinks=primary.concat(secondary).concat(more);
  const sItem=(n,extraHref)=>`<a class="sn ${active===n[0]?'on':''}" href="${extraHref||'#/'+n[0]}">${ic(n[2],18)}<span>${n[1]}</span></a>`;
  const userMenu=`${UI.menuOpen?`<div class="menu-back" data-act="closemenu"></div><div class="menu" role="menu">
     <div class="mhead">${avatar(u,'s')}<div class="grow"><b>${esc(u.name||u.username)}</b><div class="mut sm">Уровень ${l} · ${u.xp} XP</div>${bar((u.xp-fl)/(cl-fl)*100)}</div></div>
     <a class="mi ${active==='profile'?'on':''}" href="#/profile/${u.username}" role="menuitem">${ic('user',16)}<span>Профиль</span></a>
     <a class="mi ${active==='settings'?'on':''}" href="#/settings" role="menuitem">${ic('gear',16)}<span>Настройки</span></a>
     <div class="mdiv"></div>
     <button class="mi danger" data-act="logout" role="menuitem">${ic('out',16)}<span>Выйти</span></button>
    </div>`:''}`;
  return `<div class="app">
  <aside class="side d-only" aria-label="Основная навигация">
   <a class="logo" href="#/dashboard"><span class="mark">${brandIcon()}</span>Skill<span class="gtxt"> Up</span></a>
   <nav class="snav">
    ${primary.map(n=>sItem(n)).join('')}
    <div class="sdiv"></div>
    ${secondary.map(n=>sItem(n)).join('')}
    ${sItem(['profile','Профиль','user'],'#/profile/'+u.username)}
   </nav>
   <div class="tdd sfoot">
    <button class="sn smore ${moreOn?'on':''}" data-act="navmenu" aria-haspopup="true" aria-expanded="${UI.navOpen?'true':'false'}">${ic('more',18)}<span>Ещё</span></button>
    ${UI.navOpen?`<div class="menu-back" data-act="closenavmenu"></div><div class="menu tddmenu upmenu" role="menu">${more.map(n=>`<a class="mi ${active===n[0]?'on':''}" href="#/${n[0]}" role="menuitem">${ic(n[2],16)}<span>${n[1]}</span></a>`).join('')}</div>`:''}
   </div>
  </aside>
  <div class="body">
  <header class="top">
   <div class="topin">
    <a class="logo m-only" href="#/dashboard"><span class="mark">${brandIcon()}</span>Skill<span class="gtxt"> Up</span></a>
    <form class="search d-only" data-form="search" role="search"><span class="si">${ic('search',16)}</span><input name="q" type="search" placeholder="Поиск" aria-label="Поиск" autocomplete="off"></form>
    <div class="tright">
     <div class="ibgroup">
      <button class="design-nav-btn" data-design-trigger aria-label="Открыть меню дизайна">${ic('palette',16)}<span>Design</span></button>
      <a class="ib" href="#/notifications" aria-label="Уведомления">${ic('bell')}${unread?`<b class="dot">${unread}</b>`:''}</a>
     </div>
     <div class="usermenu d-only">
      <button class="avbtn" data-act="menu" aria-haspopup="true" aria-expanded="${UI.menuOpen?'true':'false'}" aria-label="Меню профиля">${avatar(u)}</button>
      ${userMenu}
     </div>
     <button class="ib m-only" data-act="mnav" aria-label="Меню" aria-expanded="${UI.mnavOpen?'true':'false'}">${ic(UI.mnavOpen?'x':'menu',20)}</button>
    </div>
   </div>
   ${UI.mnavOpen?`<div class="mpanel m-only">
    <form class="search" data-form="search" role="search"><span class="si">${ic('search',16)}</span><input name="q" type="search" placeholder="Курсы, задачи, проекты, люди" aria-label="Поиск" autocomplete="off"></form>
    <div class="mhead"><a href="#/profile/${u.username}">${avatar(u,'s')}</a><div class="grow"><b>${esc(u.name||u.username)}</b><div class="mut sm">Уровень ${l} · ${u.xp} XP</div></div></div>
    <nav class="mnav">${allLinks.map(n=>`<a class="mi ${active===n[0]?'on':''}" href="#/${n[0]}">${ic(n[2],17)}<span>${n[1]}</span></a>`).join('')}
     <div class="mdiv"></div>
     <a class="mi ${active==='profile'?'on':''}" href="#/profile/${u.username}">${ic('user',17)}<span>Профиль</span></a>
     <a class="mi ${active==='settings'?'on':''}" href="#/settings">${ic('gear',17)}<span>Настройки</span></a>
     <button class="mi danger" data-act="logout">${ic('out',17)}<span>Выйти</span></button>
    </nav></div>`:''}
  </header>
  <main class="main ${wide?'wide':''}" id="main">${inner}</main>
  <nav class="bnav" aria-label="Нижнее меню">${bn.map(n=>`<a class="${active===n[0]||(n[0]==='more'&&['community','certificates','leaderboard','path','challenges','profile','settings','direction','journey','portfolio'].includes(active))?'on':''}" href="#/${n[0]}">${ic(n[2],20)}<span>${n[1]}</span></a>`).join('')}</nav>
  </div></div>`;
}
const pageHead=(t,sub,right)=>`<div class="phead"><div><h1>${t}</h1>${sub?`<p class="mut">${sub}</p>`:''}</div>${right?`<div class="pright">${right}</div>`:''}</div>`;
const saveBtn=(key,label)=>{const u=me();const on=u.bm.includes(key);return `<button class="btn ghost sm ${on?'act':''}" data-act="bm:${key}" aria-pressed="${on}">${ic('bookmark',16)}${label||(on?'Сохранено':'Сохранить')}</button>`;};

// Бекендтен деректерді алуды тексеру
fetch('http://localhost:3000/api/data')
    .then(response => response.json())
    .then(data => {
        console.log("Бекендтен келген хабарлама:", data.message);
    })
    .catch(error => {
        console.error("Қате кетті:", error);
    }); 