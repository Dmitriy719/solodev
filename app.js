
var ALL_SPECS=['Фронтенд','Бэкенд','Fullstack','Мобильная разработка','iOS','Android','Flutter','React Native','Боты (Telegram/VK)','DevOps','SRE','QA','Автотесты','Дизайн','UI/UX','Графический дизайн','Data Science','Machine Learning','Deep Learning','Computer Vision','NLP','1С','GameDev','Unity','Unreal Engine','Администрирование','Системный анализ','Бизнес-анализ','Техподдержка','ERP/CRM','Blockchain','Web3','AR/VR','Кибербезопасность','Pentest','Embedded','IoT','Python','JavaScript','TypeScript','React','Vue','Angular','Node.js','PHP','Laravel','Java','C#','.NET','Go','Rust','Swift','Kotlin','C/C++','Ruby','Django','Flask','FastAPI','Spring','WordPress','Bitrix','SQL','PostgreSQL','MySQL','MongoDB','Redis','Elasticsearch','Docker','Kubernetes','AWS','Azure','GCP','Yandex Cloud','Linux','Windows Server','Networking','Scrum/Agile','Project Management','Product Management','SEO','SMM','Контекстная реклама','Таргет','Email-маркетинг','Контент-маркетинг','Видеопродакшн','3D-моделирование','Анимация','Саунд-дизайн','Техническое писательство','Локализация'];
var db = JSON.parse(localStorage.getItem('solodev')) || {
  // Восстановление при загрузке
profile:{name:'Дмитрий',spec:'Fullstack разработчик',specs:['Фронтенд','Бэкенд','Боты (Telegram/VK)'],phone:'+79001234567',email:'dev@example.com'},clients:[{id:'1',name:'Алексей',company:'TechStart',budget:45000,status:'В работе'}],projects:[{id:'1',name:'Интернет-магазин',client:'Алексей',budget:45000,stage:1,deadline:'2026-09-01',estimatedHours:40,tasks:[{id:'1',text:'Сверстать главную',done:false}]}],finances:[{id:'1',date:'2026-08-14',type:'in',amt:30000,cat:'Проект'},{id:'2',date:'2026-08-13',type:'in',amt:15000,cat:'Проект'},{id:'3',date:'2026-08-12',type:'in',amt:20000,cat:'Проект'},{id:'4',date:'2026-08-11',type:'in',amt:10000,cat:'Проект'}],leads:[],pains:[],sources:[],templates:[],showAllTemplates:false,autoLeads:[],currentSearchSpec:null,hhSearchStatus:'',emailTemplates:[],services:{},currency:'RUB',taxJurisdiction:'russia',taxSystem:'npd',exchangeRates:{USD:92.50,EUR:100.20,CNY:12.80,BYN:28.50,KZT:0.19,RUB:1},goals:[],recurring:[],receivables:[],taxReserve:0,budgets:{},pots:[],monthlyNeeds:80000,monthlyWants:30000,monthlySavings:40000,quickTemplates:[],hourlyRate:2000,credits:[],paymentCalendar:[]};
// === ГАРАНТИРОВАННАЯ НОРМАЛИЗАЦИЯ БАЗЫ ДАННЫХ ===
if(!db.deals) db.deals = [];
  if(!db.investments) db.investments = [];
  if(!db.timeEntries) db.timeEntries = [];
  if(!db.subscriptions) db.subscriptions = [];
  if(!db.hourlyRate) db.hourlyRate = 2000;
  if(!db.pomodoro) db.pomodoro = {sessions:[], totalTime:0, dailyGoal:25};
if(!db.habits) db.habits = [];
if(!db.diary) db.diary = [];
if(!db.mood) db.mood = [];
if(!db.dailyGoals) db.dailyGoals = [];
if(!db.water) db.water = {intake:0, goal:8, log:{}};
  if(!db.health) db.health = {sleep:[], workouts:[], water:[], weight:[], supplements:[]};
  if(!db.knowledge) db.knowledge = {books:[], courses:[], links:[], snippets:[]};
  if(!db.deals) db.deals = [];
localStorage.setItem('solodev', JSON.stringify(db));
// ================================================

  
  
  // Гарантированная инициализация новых полей продуктивности
  if(!db.deals) db.deals = [];
  if(!db.investments) db.investments = [];
  if(!db.timeEntries) db.timeEntries = [];
  if(!db.subscriptions) db.subscriptions = [];
  if(!db.hourlyRate) db.hourlyRate = 2000;
  if(!db.pomodoro) db.pomodoro = {sessions:[], totalTime:0, dailyGoal:25};
  if(!db.habits) db.habits = [];
  if(!db.diary) db.diary = [];
  
  // Сохраняем структуру сразу, чтобы она не терялась
  localStorage.setItem('solodev', JSON.stringify(db));

var currentView='home';
var TABS=[{id:'home',icon:'🏠',label:'Главная'},{id:'dashboard',icon:'📊',label:'Дашборд'},{id:'radar',icon:'🎯',label:'Радар'},{id:'projects',icon:'📁',label:'Проекты'},{id:'clients',icon:'👥',label:'Клиенты'},{id:'finances',icon:'💰',label:'Финансы'},{id:'emails',icon:'✉️',label:'Шаблоны'},{id:'pricing',icon:'💵',label:'Прайс'},{id:'productivity',icon:'⏱',label:'Продуктивность'},{id:'health',icon:'🏥',label:'Здоровье'},{id:'knowledge',icon:'📚',label:'База знаний'},{id:'crm',icon:'🤝',label:'CRM'},{id:'investments',icon:'📈',label:'Инвестиции'},{id:'documents',icon:'🧾',label:'Документы'},{id:'analytics',icon:'📊',label:'Аналитика'},{id:'devtools',icon:'🛠',label:'Dev Tools'},{id:'timetracker',icon:'⏱',label:'Тайм-трекер'},{id:'subscriptions',icon:'🔄',label:'Подписки'},{id:'calculator',icon:'🧮',label:'Калькулятор'},{id:'settings',icon:'⚙️',label:'Настройки'}];

function save(){localStorage.setItem('solodev',JSON.stringify(db))}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function today(){return new Date().toISOString().slice(0,10)}
function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

function renderNav(){
  var h='';
  TABS.forEach(function(t){h+='<button class="btn small '+(currentView===t.id?'active':'')+'" onclick="go(\''+t.id+'\')">'+t.icon+' '+t.label+'</button>'});
  document.getElementById('nav').innerHTML=h;
}
function go(id){
  currentView = id;
  localStorage.setItem('solodev_currentView', id);
  
  

  
renderNav();
  render();
}
function render(){
  // Восстановление последней вкладки
  
  
  if(!db.habits) { db.habits = []; localStorage.setItem('solodev', JSON.stringify(db)); }
  if(!db.diary) { db.diary = []; localStorage.setItem('solodev', JSON.stringify(db)); }

  if(currentView==='home')renderHome();
  else if(currentView==='dashboard')renderDashboard();
  else if(currentView==='radar')renderRadar();
  else if(currentView==='projects')renderProjects();
  else if(currentView==='clients')renderClients();
  else if(currentView==='finances')renderFinances();
  else if(currentView==='productivity')renderProductivity();
  else if(currentView==='emails')renderEmails();
  else if(currentView==='pricing')renderPricing();
  else if(currentView==='health')renderHealth();
  else if(currentView==='knowledge')renderKnowledge();
  else if(currentView==='crm')renderCRM();
  else if(currentView==='investments')renderInvestments();
  else if(currentView==='documents')renderDocuments();
  else if(currentView==='analytics')renderAnalytics();
  else if(currentView==='devtools')renderDevTools();
  else if(currentView==='timetracker')renderTimeTracker();
  else if(currentView==='subscriptions')renderSubscriptions();
  else if(currentView==='calculator')renderCalculator();
  else if(currentView==='settings')renderSettings();
}

function renderHome(){
  var inc=0;db.finances.forEach(function(f){if(f.type==='in')inc+=f.amt});
  var h='<div class="card" style="background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff"><h2 style="margin:0">Привет, '+esc(db.profile.name)+'! 👋</h2><p style="margin:5px 0 0 0;opacity:0.9">'+esc(db.profile.spec)+'</p></div>';
  h+='<div class="grid"><div class="card"><span class="stat">Доход</span><b style="font-size:20px;color:#3ecf8e">'+inc.toLocaleString()+' ₽</b></div><div class="card"><span class="stat">Клиентов</span><b style="font-size:20px">'+db.clients.length+'</b></div><div class="card"><span class="stat">Проектов</span><b style="font-size:20px">'+db.projects.length+'</b></div><div class="card"><span class="stat">Финансов</span><b style="font-size:20px">'+db.finances.length+'</b></div></div>';
  h+='<div class="card"><div class="mut">📚 База шаблонов</div><div class="big-number">'+db.templates.length+'</div><div class="mut">🔍 Источников поиска</div><div class="big-number">'+db.sources.length+'</div><div class="mut">🤖 Авто-лидов</div><div class="big-number">'+db.autoLeads.length+'</div></div>';
  document.getElementById('app').innerHTML=h;
}

function renderDashboard(){
  var monthFin=db.finances.filter(function(f){return f.date&&f.date.startsWith(today().slice(0,7))});
  var monthInc=0;monthFin.forEach(function(f){if(f.type==='in')monthInc+=f.amt});
  var weekAgo=new Date();weekAgo.setDate(weekAgo.getDate()-7);var weekStr=weekAgo.toISOString().slice(0,10);
  var weekFin=db.finances.filter(function(f){return f.date&&f.date>=weekStr});
  var weekInc=0;weekFin.forEach(function(f){if(f.type==='in')weekInc+=f.amt});
  var completedProjects=0;db.projects.forEach(function(p){if(p.stage===3)completedProjects++});
  var totalTasks=0,doneTasks=0;db.projects.forEach(function(p){if(p.tasks){totalTasks+=p.tasks.length;p.tasks.forEach(function(t){if(t.done)doneTasks++})}});
  var weekData=[];for(var i=6;i>=0;i--){var d=new Date();d.setDate(d.getDate()-i);var ds=d.toISOString().slice(0,10);var dayInc=0;db.finances.forEach(function(f){if(f.date===ds&&f.type==='in')dayInc+=f.amt});weekData.push({day:d.getDate(),inc:dayInc})}
  var maxInc=1;weekData.forEach(function(d){if(d.inc>maxInc)maxInc=d.inc});
  var daysInMonth=new Date(new Date().getFullYear(),new Date().getMonth()+1,0).getDate();
  var currentDay=new Date().getDate();
  var dailyAvg=currentDay>0?Math.round(monthInc/currentDay):0;
  var forecast=currentDay>0?Math.round(monthInc/currentDay*daysInMonth):0;
  var remaining=forecast-monthInc;
  var h='<h2>📊 Дашборд продуктивности</h2>';
  h+='<div class="grid"><div class="card"><span class="stat">Доход за неделю</span><b style="font-size:20px;color:#3ecf8e">'+weekInc.toLocaleString()+' ₽</b></div><div class="card"><span class="stat">Доход за месяц</span><b style="font-size:20px;color:#3ecf8e">'+monthInc.toLocaleString()+' ₽</b></div><div class="card"><span class="stat">Проектов завершено</span><b style="font-size:20px">'+completedProjects+'</b></div><div class="card"><span class="stat">Задач выполнено</span><b style="font-size:20px">'+doneTasks+'/'+totalTasks+'</b></div></div>';
  h+='<div class="card"><h3>📈 Доходы за 7 дней</h3><div class="chart">';
  weekData.forEach(function(d){var hPct=(d.inc/maxInc)*100;h+='<div class="chart-col" style="height:'+hPct+'%"><span>'+d.day+'</span></div>'});
  h+='</div></div>';
  h+='<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a"><h3 style="color:#fff">💰 Прогноз дохода на месяц</h3><div style="font-size:32px;text-align:center;margin:15px 0;color:#3ecf8e;font-weight:bold">'+forecast.toLocaleString()+' ₽</div>';
  h+='<div class="info-row"><span>📅 Уже заработано:</span><b style="color:#3ecf8e">'+monthInc.toLocaleString()+' ₽</b></div>';
  h+='<div class="info-row"><span> Средний доход в день:</span><b style="color:#6c8cff">'+dailyAvg.toLocaleString()+' ₽/день</b></div>';
  h+='<div class="info-row"><span>📈 Осталось до прогноза:</span><b style="color:#9d6cff">'+remaining.toLocaleString()+' ₽</b></div>';
  h+='<div class="mut" style="text-align:center;margin-top:10px;padding-top:10px;border-top:1px solid #242b36">При текущей скорости к '+daysInMonth+' числу</div></div>';
  document.getElementById('app').innerHTML=h;
}

function renderRadar(){
  var h='<h2>🎯 Радар v5.6</h2>';
  h+='<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a"><h3 style="color:#fff">📊 Ваша база</h3>';
  h+='<div class="grid"><div style="text-align:center"><div class="mut">Шаблонов проектов</div><div class="big-number">'+db.templates.length+'</div></div><div style="text-align:center"><div class="mut">Источников поиска</div><div class="big-number">'+db.sources.length+'</div></div></div></div>';
  h+='<div class="card"><h3>🤖 Автопополнение из HH.ru</h3>';
  h+='<p class="mut">Ваши специализации: '+(db.profile.specs||[]).join(', ')+'</p>';
  h+='<button class="btn ai" onclick="autoSearchHH()">🇷🇺 Найти все ('+db.profile.specs.length+' специализаций)</button>';
  h+='<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">';
  (db.profile.specs||[]).forEach(function(spec){
    h+='<button class="btn small" style="background:#1f2530" onclick="searchHHBySpec(\''+spec.replace(/'/g,"\\'")+'\')">🔍 '+spec+'</button>';
  });
  h+='</div>';
  if(db.hhSearchStatus)h+='<div class="mut" style="margin-top:10px">'+db.hhSearchStatus+'</div>';
  var visibleLeads=db.currentSearchSpec?db.autoLeads.filter(function(l){return l.spec===db.currentSearchSpec}):db.autoLeads;
  if(visibleLeads.length){
    h+='<div class="mut" style="margin-top:10px">Показано: <b>'+visibleLeads.length+'</b> из '+db.autoLeads.length+' вакансий'+(db.currentSearchSpec?' (фильтр: '+db.currentSearchSpec+')':'')+'</div>';
    if(db.currentSearchSpec)h+='<button class="btn small" style="background:#1f2530;margin-bottom:10px" onclick="db.currentSearchSpec=null;renderRadar()">✕ Снять фильтр</button>';
    var bySpec={};visibleLeads.forEach(function(l){if(!bySpec[l.spec])bySpec[l.spec]=[];bySpec[l.spec].push(l)});
    Object.keys(bySpec).forEach(function(spec){
      h+='<div style="margin-top:15px"><b style="color:#6c8cff;font-size:16px">'+spec+' ('+bySpec[spec].length+' вакансий)</b>';
      bySpec[spec].forEach(function(l){
        var globalIdx=db.autoLeads.indexOf(l);
        h+='<div class="card" style="margin-top:8px;border-left:3px solid #d6001c;padding-left:12px"><b>'+esc(l.title)+'</b><div class="mut">'+esc(l.company||'')+'</div>';
        if(l.salary)h+='<div style="color:#3ecf8e;font-size:13px"> '+esc(l.salary)+'</div>';
        h+='<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"><button class="btn small" onclick="leadToClient(\'auto\','+globalIdx+')">👥 В клиенты</button><button class="btn small" style="background:#1f2530" onclick="leadOutreach(\'auto\','+globalIdx+')">✍️ Написать</button><button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b" onclick="delLead('+globalIdx+')">🗑</button></div></div>';
      });
      h+='</div>';
    });
  } else if(db.autoLeads.length===0 && !db.hhSearchStatus){
    h+='<div class="mut" style="margin-top:10px">Нажмите кнопку выше, чтобы найти вакансии</div>';
  }
  if(db.hhSearchStatus&&db.hhSearchStatus.indexOf('❌')>=0){h+='<button class="btn small" style="background:#ff6b6b;margin-top:10px" onclick="retryFailedSearch()">🔄 Повторить поиск</button>';}
  h+='<div style="margin-top:10px"><a href="https://www.hh.ru/search/vacancy?text='+encodeURIComponent((db.profile.specs||['разработчик']).join(' '))+'" target="_blank" class="btn small" style="text-decoration:none">🔗 Открыть HH.ru напрямую</a></div>';
  h+='</div>';
  h+='<div class="card"><h3>🔍 Где искать клиентов ('+db.sources.length+' источников)</h3>';
  h+='<p class="mut">Биржи, Telegram, Reddit, форумы, прямые работодатели</p>';
  var categories={};db.sources.forEach(function(s){if(!categories[s.category])categories[s.category]=[];categories[s.category].push(s)});
  Object.keys(categories).forEach(function(cat){
    h+='<div style="margin-top:15px"><b style="color:#6c8cff">'+cat+' ('+categories[cat].length+')</b>';
    h+='<div class="source-grid">';
    categories[cat].forEach(function(s){
      var avail=s.available!==false;
      h+='<div class="source-item" style="'+(avail?'':'opacity:0.5;border:1px dashed #ff6b6b')+'"><a href="'+esc(s.url)+'" target="_blank">'+s.icon+' '+esc(s.name)+'</a><div class="mut">'+esc(s.description)+(avail?'':' 🚫 РФ')+'</div></div>';
    });
    h+='</div></div>';
  });
  h+='</div>';
  h+='<div class="card"><h3>📋 Шаблоны проектов ('+db.templates.length+' в базе)</h3>';
  h+='<input id="templateSearch" placeholder="🔍 Поиск по названию, сегменту, боли..." oninput="filterTemplates()" style="margin-top:10px">';
  h+='<div class="filter-row">';
  h+='<button class="filter-btn '+(db.showAllTemplates?'':'active')+'" onclick="db.showAllTemplates=false;save();renderRadar()">Только мои навыки</button>';
  h+='<button class="filter-btn '+(db.showAllTemplates?'active':'')+'" onclick="db.showAllTemplates=true;save();renderRadar()">Показать все</button>';
  h+='</div>';
  h+='<button class="btn ai" onclick="generatePains()">🎯 Сгенерировать из базы</button>';
  h+='<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;margin-top:8px" onclick="clearPains()">🗑 Очистить мои шаблоны</button></div>';
  if(db.pains&&db.pains.length){
    h+='<div class="mut" style="margin:10px 0">Показано: '+db.pains.length+' шаблонов</div>';
    db.pains.forEach(function(p,idx){
      h+='<div class="card template-card">';
      h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="background:#6c8cff;color:#fff;padding:2px 8px;border-radius:6px;font-size:11px">'+esc(p.spec)+'</span><b>'+esc(p.seg)+'</b></div>';
      h+='<div style="color:#ff6b6b;font-size:14px;margin-bottom:6px"> '+esc(p.pain)+'</div>';
      h+='<div style="color:#3ecf8e;font-size:14px;margin-bottom:10px">✅ '+esc(p.sol)+'</div>';
      h+='<div class="estimate-box">';
      h+='<div class="estimate-item"><div>Сложность</div><div>'+p.complexity+'</div></div>';
      h+='<div class="estimate-item"><div>Сроки</div><div>'+p.time+'</div></div>';
      h+='<div class="estimate-item"><div>Бюджет</div><div style="color:#3ecf8e">'+p.cost+'</div></div>';
      h+='</div>';
      h+='<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><button class="btn small" onclick="genOutreach(\''+esc(p.seg)+'\',\''+esc(p.pain)+'\',\''+esc(p.sol)+'\',\''+p.time+'\',\''+p.cost+'\')">✍️ Скопировать письмо</button><button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b" onclick="delPain(\''+p.id+'\')">🗑</button></div>';
      h+='</div>';
    });
  }
  document.getElementById('app').innerHTML=h;
}

function filterTemplates(){
  var q=document.getElementById('templateSearch').value.toLowerCase();
  var cards=document.querySelectorAll('.template-card');
  cards.forEach(function(c){c.style.display=c.textContent.toLowerCase().includes(q)?'':'none'});
}

function toggleSpec(spec){
  if(!db.profile.specs)db.profile.specs=[];
  var idx=db.profile.specs.indexOf(spec);
  if(idx>=0)db.profile.specs.splice(idx,1);else db.profile.specs.push(spec);
  save();renderSettings();
}

function generatePains(){
  var added=0;var userSpecs=db.profile.specs||[];
  db.templates.forEach(function(p){
    var shouldAdd=db.showAllTemplates||userSpecs.includes(p.spec);
    if(shouldAdd&&!db.pains.some(function(x){return x.pain===p.pain&&x.seg===p.seg})){
      db.pains.push({id:uid(),spec:p.spec,seg:p.seg,pain:p.pain,sol:p.sol,complexity:p.complexity,time:p.time,cost:p.cost,demand:p.demand||5,status:'Гипотеза'});added++;
    }
  });
  save();renderRadar();alert(added>0?'✅ Добавлено '+added+' шаблонов из базы '+db.templates.length+'!':'⚠️ Все подходящие шаблоны уже в базе');
}
function clearPains(){if(confirm('Удалить все мои шаблоны?')){db.pains=[];save();renderRadar()}}
function delPain(id){if(confirm('Удалить этот шаблон?')){db.pains=db.pains.filter(function(p){return p.id!==id});save();renderRadar()}}
function genOutreach(seg,pain,sol,time,cost){
  var txt='Здравствуйте!\n\nМеня зовут '+db.profile.name+', я '+db.profile.spec+'.\n\nЗаметил, что для '+seg+' актуальна проблема: "'+pain+'".\n\nЯ решаю такие задачи следующим образом: '+sol+'.\n\nОбычно реализация занимает '+time+', а бюджет составляет '+cost+'.\n\nНайдётся 5-10 минут на этой неделе, чтобы обсудить детали?\n\nС уважением,\n'+db.profile.name;
  navigator.clipboard.writeText(txt).then(function(){alert('✉️ Письмо скопировано!')});
}

function searchHHBySpec(spec){
  db.currentSearchSpec=spec;
  db.autoLeads=db.autoLeads.filter(function(l){return l.spec!==spec});
  db.hhSearchStatus='⏳ Ищу только: '+spec+'...';
  renderRadar();
  var proxies=['https://corsproxy.io/?','https://api.allorigins.win/raw?url=','https://cors-anywhere.herokuapp.com/','https://thingproxy.freeboard.io/fetch/','https://cors.bridged.cc/'];
  var hhUrl='https://api.hh.ru/vacancies?text='+encodeURIComponent(spec)+'&per_page=30&area=1';
  var found=0;
  function tryProxy(idx){
    if(idx>=proxies.length){db.hhSearchStatus='❌ Не удалось загрузить: '+spec+'. Попробуйте прямую ссылку ниже.';renderRadar();return Promise.resolve()}
    return fetch(proxies[idx]+encodeURIComponent(hhUrl)).then(function(r){if(!r.ok)throw new Error('fail');return r.json()}).then(function(data){
      if(!data.items){db.hhSearchStatus='⚠️ '+spec+': вакансий не найдено (0 результатов)';renderRadar();return;}
      (data.items||[]).forEach(function(v){
        var salary='';if(v.salary){if(v.salary.from)salary+=v.salary.from+' ';else if(v.salary.to)salary+=v.salary.to+' ';salary+=(v.salary.currency||'RUB')}
        db.autoLeads.push({id:uid(),spec:spec,title:v.name,company:v.employer?v.employer.name:'',salary:salary,url:v.alternate_url,date:today()});found++;
      });
      db.hhSearchStatus='✅ '+spec+': найдено '+found+' вакансий. Нажмите "Снять фильтр" чтобы увидеть все.';
    }).catch(function(){return tryProxy(idx+1)});
  }
  tryProxy(0).then(function(){save();renderRadar()});
}

function retryFailedSearch(){
  if(db.currentSearchSpec){searchHHBySpec(db.currentSearchSpec)}
  else{autoSearchHH()}
}
function autoSearchHH(){
  db.currentSearchSpec=null;
  var specs=db.profile.specs||['разработчик'];
  var found=0;
  db.autoLeads=[];
  db.hhSearchStatus='⏳ Поиск по всем '+specs.length+' специализациям...';
  renderRadar();
  var proxies=['https://corsproxy.io/?','https://api.allorigins.win/raw?url=','https://cors-anywhere.herokuapp.com/','https://thingproxy.freeboard.io/fetch/','https://cors.bridged.cc/'];
  var promises=specs.map(function(q){
    var hhUrl='https://api.hh.ru/vacancies?text='+encodeURIComponent(q)+'&per_page=30&area=1';
    function tryProxy(idx){
      if(idx>=proxies.length){return Promise.resolve()}
      return fetch(proxies[idx]+encodeURIComponent(hhUrl)).then(function(r){if(!r.ok)throw new Error('fail');return r.json()}).then(function(data){
        if(!data.items){db.hhSearchStatus='⚠️ '+spec+': вакансий не найдено (0 результатов)';renderRadar();return;}
        (data.items||[]).forEach(function(v){
          var salary='';if(v.salary){if(v.salary.from)salary+=v.salary.from+' ';else if(v.salary.to)salary+=v.salary.to+' ';salary+=(v.salary.currency||'RUB')}
          db.autoLeads.push({id:uid(),spec:q,title:v.name,company:v.employer?v.employer.name:'',salary:salary,url:v.alternate_url,date:today()});found++;
        });
        db.hhSearchStatus='✅ Найдено '+found+' вакансий по '+specs.length+' специализациям';
      }).catch(function(){return tryProxy(idx+1)});
    }
    return tryProxy(0);
  });
  Promise.all(promises).then(function(){save();renderRadar()});
}

function leadToClient(type,idx){var list=type==='auto'?db.autoLeads:db.leads;var l=list[idx];if(!l)return;db.clients.push({id:uid(),name:l.company||l.title,company:l.company||'',budget:0,status:'Новый',date:today()});save();alert('👥 Добавлен в клиенты!')}
function leadOutreach(type,idx){var list=type==='auto'?db.autoLeads:db.leads;var l=list[idx];if(!l)return;var txt='Здравствуйте!\n\nМеня зовут '+db.profile.name+', я '+db.profile.spec+'.\n\nУвидел вашу вакансию: "'+l.title+'".\n\nБуду рад обсудить детали.\n\nС уважением,\n'+db.profile.name;navigator.clipboard.writeText(txt).then(function(){alert('✉️ Письмо скопировано!')})}
function delLead(idx){db.autoLeads.splice(idx,1);save();renderRadar()}

function renderProjects(){
  var completed=db.projects.filter(function(p){return p.stage===3}).length;
  var h='<h2>📁 Проекты</h2><button class="btn" onclick="addProject()">+ Проект</button>';
  h+='<button class="btn" style="background:#9d6cff" onclick="showDocAssistant()"> Умный помощник документов</button>';
  if(completed>0){h+='<button class="btn ai" onclick="generatePortfolio()">✨ Сгенерировать портфолио ('+completed+' проектов)</button>';
  h+='<button class="btn small" style="background:#1f2530;margin-top:8px" onclick="previewPortfolio()">👁 Предпросмотр</button>';
  h+='<button class="btn small" style="background:#1f2530;margin-top:8px" onclick="downloadPortfolio()">📥 Скачать HTML</button>';
  h+='<button class="btn small" style="background:#9d6cff;margin-top:8px" onclick="showDocAssistant()">🤖 Умный помощник</button>';}
  db.projects.forEach(function(p){
    var doneTasks=p.tasks?p.tasks.filter(function(t){return t.done}).length:0;var totalTasks=p.tasks?p.tasks.length:0;var progress=totalTasks?Math.round(doneTasks/totalTasks*100):0;
    var roi=p.estimatedHours&&p.estimatedHours>0?Math.round(p.budget/p.estimatedHours):0;
    h+='<div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><b>'+esc(p.name)+'</b><span style="padding:4px 12px;background:#6c8cff;border-radius:12px;font-size:12px">'+['Идея','В работе','Тестирование','Завершён'][p.stage]+'</span></div>';
    h+='<div class="mut">'+esc(p.client||'—')+' · '+p.budget.toLocaleString()+' ₽</div>';
    if(p.description)h+='<div style="margin-top:8px;font-size:13px;color:#e8ecf3">'+esc(p.description)+'</div>';
    if(p.tech_stack){var techs=p.tech_stack.split(',').map(function(t){return '<span class="portfolio-tech">'+esc(t.trim())+'</span>'}).join('');h+='<div style="margin-top:6px">'+techs+'</div>';}
    if(p.deadline)h+='<div class="mut"> Дедлайн: '+p.deadline+'</div>';
    if(roi)h+='<div style="color:#3ecf8e;font-size:13px">🧮 ROI: '+roi+' ₽/час</div>';
    h+='<div class="bar"><i style="width:'+progress+'%"></i></div>';
    h+='<div class="mut">Задачи: '+doneTasks+'/'+totalTasks+' ('+progress+'%)</div>';
    h+='<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">';
    if(p.stage<3)h+='<button class="btn small" onclick="nextStage(\''+p.id+'\')">Этап →</button>';
    h+='<button class="btn small" style="background:#1f2530" onclick="showTasks(\''+p.id+'\')">📋 Задачи</button>';
    h+='<button class="btn small" style="background:#1f2530" onclick="showROI(\''+p.id+'\')">🧮 ROI</button>';
    h+='<button class="btn small" style="background:#1f2530" onclick="showReport(\''+p.id+'\')">📊 Отчёт</button>';
    h+='<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b" onclick="delProject(\''+p.id+'\')">🗑</button>';
    h+='</div></div>';
  });
  document.getElementById('app').innerHTML=h;
}
function addProject(){
  var h='<h3>➕ Новый проект</h3>';
  h+='<div id="smartRecBox" style="display:none;background:#1a2035;border:1px solid #3ecf8e;border-radius:8px;padding:12px;margin-bottom:12px;font-size:13px"></div>';
  h+='<label>Название проекта *</label><input id="p_name" placeholder="Например: Интернет-магазин одежды" oninput="analyzeProject()">';
  h+='<label>Клиент</label><input id="p_client" placeholder="Название компании или имя">';
  h+='<label>Технологии (через запятую) <button class="btn small" style="background:#3ecf8e;padding:4px 8px;font-size:11px" onclick="showTechSuggestions()">💡 Подсказки</button></label>';
  h+='<input id="p_tech" placeholder="React, Node.js, PostgreSQL" oninput="analyzeProject()">';
  h+='<label>Описание <button class="btn small" style="background:#9d6cff;padding:4px 8px;font-size:11px" onclick="smartGenerateDesc()">🤖 Умная генерация</button></label>';
  h+='<textarea id="p_desc" rows="3" placeholder="Заполните название и технологии, затем нажмите 🤖"></textarea>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
  h+='<div><label>Оценка часов</label><input id="p_hours" type="number" placeholder="40"></div>';
  h+='<div><label>Дедлайн <button class="btn small" style="background:#3ecf8e;padding:2px 6px;font-size:10px" onclick="suggestDeadline()">📅 Рекомендовать</button></label><input id="p_deadline" type="date"></div>';
  h+='</div>';
  h+='<label>Бюджет (₽)</label><input id="p_budget" type="number" placeholder="0">';
  h+='<div style="display:flex;gap:10px;margin-top:15px">';
  h+='<button class="btn" onclick="saveNewProject()">💾 Сохранить проект</button>';
  h+='<button class="btn" style="background:#1f2530" onclick="closeModal()">Отмена</button>';
  h+='</div>';
  openModal(h);
}

function analyzeProject(){
  var name=document.getElementById('p_name').value.toLowerCase();
  var tech=document.getElementById('p_tech').value.toLowerCase();
  var box=document.getElementById('smartRecBox');
  if(!name && !tech){box.style.display='none';return;}
  
  var type='custom', weeks=4, budgetMin=50, budgetMax=150, desc='';
  
  if(name.includes('магазин') || name.includes('shop') || name.includes('маркет')){
    type='Интернет-магазин'; weeks=8; budgetMin=100; budgetMax=300;
    desc='Разработка адаптивного интернет-магазина с каталогом, корзиной, интеграцией оплаты и админ-панелью.';
  } else if(name.includes('лендинг') || name.includes('landing') || name.includes('визитка')){
    type='Лендинг'; weeks=2; budgetMin=20; budgetMax=60;
    desc='Разработка одностраничного сайта с формой захвата лидов, анимациями и адаптивной вёрсткой.';
  } else if(name.includes('бот') || name.includes('bot') || name.includes('telegram')){
    type='Telegram-бот'; weeks=3; budgetMin=30; budgetMax=80;
    desc='Создание бота для автоматизации: приём заявок, FAQ, интеграция с CRM или платёжными системами.';
  } else if(name.includes('crm') || name.includes('erp') || name.includes('система') || name.includes('портал')){
    type='CRM/Система'; weeks=12; budgetMin=150; budgetMax=400;
    desc='Разработка информационной системы для управления бизнес-процессами, клиентами и аналитикой.';
  } else if(name.includes('мобильн') || name.includes('app') || name.includes('ios') || name.includes('android')){
    type='Мобильное приложение'; weeks=10; budgetMin=150; budgetMax=350;
    desc='Разработка кроссплатформенного мобильного приложения с авторизацией, push-уведомлениями и API.';
  } else if(name.includes('корпоратив') || name.includes('сайт компании')){
    type='Корпоративный сайт'; weeks=5; budgetMin=60; budgetMax=150;
    desc='Создание корпоративного сайта с разделами: о компании, услуги, портфолио, контакты и CMS.';
  }
  
  if(tech.includes('python') || tech.includes('django') || tech.includes('fastapi')){
    if(!desc) desc='Разработка backend-части на Python с REST API, базой данных и интеграциями.';
    weeks = Math.max(weeks, 6);
  }
  if(tech.includes('react') || tech.includes('vue') || tech.includes('angular')){
    if(!desc) desc='Разработка современного frontend-интерфейса с адаптивной вёрсткой и интерактивностью.';
  }
  
  box.style.display='block';
  box.innerHTML='<b>🤖 Умная рекомендация:</b><br>Тип: <b>'+type+'</b><br>Рекомендуемый срок: <b>'+weeks+' недель</b><br>Ориентир бюджета: <b>'+budgetMin+'-'+budgetMax+' тыс. ₽</b><br><button class="btn small" style="background:#3ecf8e;margin-top:8px;width:100%" onclick="applySmartRec(\''+type+'\','+weeks+','+budgetMin+','+budgetMax+',\''+desc+'\')">✅ Применить рекомендацию</button>';
}

function applySmartRec(type, weeks, bMin, bMax, desc){
  document.getElementById('p_desc').value=desc;
  document.getElementById('p_hours').value=weeks*40;
  document.getElementById('p_budget').value=Math.round((bMin+bMax)/2)*1000;
  suggestDeadline(weeks);
  document.getElementById('smartRecBox').style.display='none';
}

function smartGenerateDesc(){
  var name=document.getElementById('p_name').value.trim();
  var tech=document.getElementById('p_tech').value.trim();
  if(!name){alert('⚠️ Сначала введите название проекта!');return;}
  analyzeProject(); // Запускаем анализ для получения контекста
  var desc='Разработка проекта "'+name+'". ';
  if(tech) desc+='Используемый стек: '+tech+'. ';
  desc+='Включает: анализ требований, проектирование архитектуры, разработку, тестирование и деплой. Результат: полностью функциональный продукт, готовый к использованию, с передачей исходного кода и документации.';
  document.getElementById('p_desc').value=desc;
}

function suggestDeadline(weeks){
  if(!weeks){
    var name=document.getElementById('p_name').value.toLowerCase();
    if(name.includes('лендинг') || name.includes('landing')) weeks=2;
    else if(name.includes('магазин') || name.includes('shop')) weeks=8;
    else if(name.includes('бот') || name.includes('bot')) weeks=3;
    else if(name.includes('crm') || name.includes('система')) weeks=12;
    else if(name.includes('мобильн') || name.includes('app')) weeks=10;
    else weeks=4; // По умолчанию
  }
  var d=new Date();
  d.setDate(d.getDate() + (weeks * 7));
  var dateStr=d.toISOString().split('T')[0];
  document.getElementById('p_deadline').value=dateStr;
  
  var months=['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];
  alert('📅 Рекомендованный дедлайн: '+d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear()+' (через '+weeks+' нед.)\n\nДата автоматически подставлена в поле.');
}

function showTechSuggestions(){
  var h='<h3>💡 Популярные технологии</h3>';
  h+='<p class="mut">Нажмите на технологию, чтобы добавить её в поле:</p>';
  h+='<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">';
  var techs=['React','Vue','Angular','Node.js','Python','Django','Flask','PHP','Laravel','PostgreSQL','MySQL','MongoDB','Redis','Docker','Kubernetes','AWS','Flutter','React Native','Swift','Kotlin','TypeScript','JavaScript','HTML/CSS','Git','GraphQL','REST API'];
  techs.forEach(function(t){
    h+='<button class="btn small" style="background:#1f2530" onclick="addTech(\''+t+'\')">'+t+'</button>';
  });
  h+='</div>';
  h+='<button class="btn" style="background:#1f2530;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function addTech(tech){
  var input=document.getElementById('p_tech');
  var current=input.value.trim();
  if(current){
    if(!current.split(',').map(function(t){return t.trim()}).includes(tech)){
      input.value=current+', '+tech;
    }
  }else{
    input.value=tech;
  }
  closeModal();
}
function saveNewProject(){
  var name=document.getElementById('p_name').value.trim();
  if(!name){alert('⚠️ Введите название проекта!');return;}
  var client=document.getElementById('p_client').value.trim();
  var budget=+document.getElementById('p_budget').value||0;
  var deadline=document.getElementById('p_deadline').value;
  var hours=+document.getElementById('p_hours').value||0;
  var desc=document.getElementById('p_desc').value.trim();
  var tech=document.getElementById('p_tech').value.trim();
  db.projects.push({id:uid(),name:name,client:client,budget:budget,stage:0,deadline:deadline,estimatedHours:hours,description:desc,tech_stack:tech,tasks:[],date:today()});
  save();closeModal();renderProjects();
}
function nextStage(id){
  var p=db.projects.find(function(x){return x.id===id});
  if(!p||p.stage>=3)return;
  var stages=['Идея','В работе','Тестирование','Завершён'];
  var nextStageName=stages[p.stage+1];
  var h='<h3>🔄 Переход на этап: '+nextStageName+'</h3>';
  h+='<p style="color:#8b94a7">Проект: <b>'+esc(p.name)+'</b></p>';
  h+='<p>Текущий этап: <span style="color:#6c8cff">'+stages[p.stage]+'</span> → <span style="color:#3ecf8e">'+nextStageName+'</span></p>';
  h+='<label>Комментарий к переходу (необязательно)</label>';
  h+='<textarea id="stage_comment" rows="3" placeholder="Например: Завершил вёрстку главной страницы"></textarea>';
  h+='<div style="display:flex;gap:10px;margin-top:15px">';
  h+='<button class="btn" onclick="confirmStageChange(\''+id+'\')">✅ Подтвердить переход</button>';
  h+='<button class="btn" style="background:#1f2530" onclick="closeModal()">Отмена</button>';
  h+='</div>';
  openModal(h);
}
function confirmStageChange(id){
  var p=db.projects.find(function(x){return x.id===id});
  if(!p)return;
  var comment=document.getElementById('stage_comment').value.trim();
  p.stage++;
  if(comment){
    if(!p.stage_comments)p.stage_comments=[];
    p.stage_comments.push({stage:p.stage,comment:comment,date:today()});
  }
  save();closeModal();renderProjects();
}
function delProject(id){if(confirm('Удалить проект?')){db.projects=db.projects.filter(function(p){return p.id!==id});save();renderProjects()}}
function showTasks(id){var p=db.projects.find(function(x){return x.id===id});if(!p)return;var h='<h3>Задачи: '+esc(p.name)+'</h3>';if(p.tasks&&p.tasks.length){p.tasks.forEach(function(t){h+='<div style="display:flex;align-items:center;gap:10px;margin:10px 0"><input type="checkbox" '+(t.done?'checked':'')+' onchange="toggleTask(\''+id+'\',\''+t.id+'\')" style="width:auto"><span style="flex:1;'+(t.done?'text-decoration:line-through;color:#8b94a7':'')+'">'+esc(t.text)+'</span><button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:5px 10px" onclick="delTask(\''+id+'\',\''+t.id+'\')">✕</button></div>'})}else{h+='<div class="mut">Нет задач</div>'}h+='<div style="display:flex;gap:8px;margin-top:15px"><input id="newTask" placeholder="Новая задача" style="flex:1"><button class="btn small" onclick="addTask(\''+id+'\')">+</button></div><button class="btn" onclick="closeModal()">Закрыть</button>';openModal(h)}
function addTask(projId){var text=document.getElementById('newTask').value.trim();if(!text)return;var p=db.projects.find(function(x){return x.id===projId});if(p){if(!p.tasks)p.tasks=[];p.tasks.push({id:uid(),text:text,done:false});save();showTasks(projId);renderProjects()}}
function toggleTask(projId,taskId){var p=db.projects.find(function(x){return x.id===projId});if(p&&p.tasks){var t=p.tasks.find(function(x){return x.id===taskId});if(t)t.done=!t.done;save();showTasks(projId);renderProjects()}}
function delTask(projId,taskId){var p=db.projects.find(function(x){return x.id===projId});if(p&&p.tasks){p.tasks=p.tasks.filter(function(t){return t.id!==taskId});save();showTasks(projId);renderProjects()}}
function showROI(id){var p=db.projects.find(function(x){return x.id===id});if(!p)return;var roi=p.estimatedHours&&p.estimatedHours>0?Math.round(p.budget/p.estimatedHours):0;var verdict=roi>=1000?'✅ Отлично':roi>=500?'👍 Нормально':'️ Низкий ROI';var h='<h3>🧮 ROI проекта</h3><div class="card"><div style="display:flex;justify-content:space-between;margin:10px 0"><span>Бюджет:</span><b>'+p.budget.toLocaleString()+' ₽</b></div><div style="display:flex;justify-content:space-between;margin:10px 0"><span>Часов:</span><b>'+p.estimatedHours+'</b></div><div style="display:flex;justify-content:space-between;margin:10px 0;padding-top:10px;border-top:1px solid #242b36"><span>Ставка:</span><b style="color:#3ecf8e">'+roi+' ₽/час</b></div><div style="margin-top:15px;font-size:18px;text-align:center">'+verdict+'</div></div><button class="btn" onclick="closeModal()">Закрыть</button>';openModal(h)}
function showReport(id){var p=db.projects.find(function(x){return x.id===id});if(!p)return;var doneTasks=p.tasks?p.tasks.filter(function(t){return t.done}).length:0;var totalTasks=p.tasks?p.tasks.length:0;var report='ОТЧЁТ ПО ПРОЕКТУ\n\nПроект: '+p.name+'\nКлиент: '+p.client+'\nДата: '+today()+'\n\nСтатус: '+['Идея','В работе','Тестирование','Завершён'][p.stage]+'\nБюджет: '+p.budget+' ₽\nДедлайн: '+p.deadline+'\n\nПрогресс: '+doneTasks+'/'+totalTasks+' задач\n\nЗадачи:\n'+(p.tasks||[]).map(function(t){return (t.done?'✓':'○')+' '+t.text}).join('\n')+'\n\nС уважением,\n'+db.profile.name;var h='<h3>📊 Отчёт</h3><textarea id="reportText" rows="12" style="font-family:monospace;font-size:13px">'+esc(report)+'</textarea><div style="display:flex;gap:8px;margin-top:10px"><button class="btn" onclick="copyReport()"> Копировать</button></div><button class="btn" onclick="closeModal()">Закрыть</button>';openModal(h)}
function copyReport(){var text=document.getElementById('reportText').value;navigator.clipboard.writeText(text).then(function(){alert('📋 Скопировано!')})}

function renderClients(){
  var h='<h2>👥 Клиенты</h2><button class="btn" onclick="addClient()">+ Клиент</button>';
  db.clients.forEach(function(c){h+='<div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><b>'+esc(c.name)+'</b><span style="padding:4px 12px;background:#6c8cff;border-radius:12px;font-size:12px">'+c.status+'</span></div><div class="mut">'+esc(c.company||'')+' · '+c.budget.toLocaleString()+' ₽</div><button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;margin-top:10px" onclick="delClient(\''+c.id+'\')">🗑 Удалить</button></div>'});
  document.getElementById('app').innerHTML=h;
}
function addClient(){
  var h='<h3>➕ Новый клиент</h3>';
  h+='<label>Имя *</label><input id="c_name" placeholder="Имя контактного лица">';
  h+='<label>Компания</label><input id="c_company" placeholder="Название компании">';
  h+='<label>Бюджет (₽)</label><input id="c_budget" type="number" placeholder="0">';
  h+='<div style="display:flex;gap:10px;margin-top:15px">';
  h+='<button class="btn" onclick="saveNewClient()">💾 Сохранить</button>';
  h+='<button class="btn" style="background:#1f2530" onclick="closeModal()">Отмена</button>';
  h+='</div>';
  openModal(h);
}
function saveNewClient(){
  var name=document.getElementById('c_name').value.trim();
  if(!name){alert('⚠️ Введите имя!');return;}
  var company=document.getElementById('c_company').value.trim();
  var budget=+document.getElementById('c_budget').value||0;
  db.clients.push({id:uid(),name:name,company:company,budget:budget,status:'Новый',date:today()});
  save();closeModal();renderClients();
}
function delClient(id){db.clients=db.clients.filter(function(c){return c.id!==id});save();renderClients()}

var financePeriod = 'month';

function renderFinances(){
  var now = new Date();
  var periodStart, periodLabel;
  if(financePeriod === 'week'){
    periodStart = new Date(now); periodStart.setDate(now.getDate() - 7);
    periodLabel = 'за последние 7 дней';
  } else if(financePeriod === 'month'){
    periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    periodLabel = 'за ' + ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'][now.getMonth()];
  } else if(financePeriod === 'quarter'){
    var qm = Math.floor(now.getMonth()/3)*3;
    periodStart = new Date(now.getFullYear(), qm, 1);
    periodLabel = 'за ' + Math.floor(qm/3+1) + ' квартал';
  } else {
    periodStart = new Date(now.getFullYear(), 0, 1);
    periodLabel = 'за ' + now.getFullYear() + ' год';
  }
  var periodStr = periodStart.toISOString().slice(0,10);
  
  var periodFin = db.finances.filter(function(f){return f.date && f.date >= periodStr});
  var income = 0, expense = 0;
  var byCategory = {};
  periodFin.forEach(function(f){
    if(f.type === 'in') income += f.amt; else expense += f.amt;
    byCategory[f.cat] = (byCategory[f.cat] || 0) + (f.type === 'in' ? f.amt : -f.amt);
  });
  
  var tax = calculateTax(income);
  var netProfit = income - expense - tax.amount;
  
  var h = '<h2>💰 Финансы · '+periodLabel+'</h2>';
  
  // Переключатель периода
  h += '<div class="filter-row">';
  ['week','month','quarter','year'].forEach(function(p){
    var label = {week:'Неделя',month:'Месяц',quarter:'Квартал',year:'Год'}[p];
    h += '<button class="filter-btn '+(financePeriod===p?'active':'')+'" onclick="financePeriod=\''+p+'\';renderFinances()">'+label+'</button>';
  });
  h += '</div>';
  
  // Главные показатели
  h += '<div class="grid" style="grid-template-columns:repeat(4,1fr);gap:10px;margin:15px 0">';
  h += '<div class="card" style="text-align:center"><div class="mut">Доход</div><b style="font-size:18px;color:#3ecf8e">'+formatCurrency(income)+'</b></div>';
  h += '<div class="card" style="text-align:center"><div class="mut">Расход</div><b style="font-size:18px;color:#ff6b6b">'+formatCurrency(expense)+'</b></div>';
  h += '<div class="card" style="text-align:center"><div class="mut">Налоги ('+tax.name+')</div><b style="font-size:18px;color:#f59e0b">'+formatCurrency(tax.amount)+'</b></div>';
  h += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a"><div class="mut" style="color:#fff">Чистая прибыль</div><b style="font-size:18px;color:#3ecf8e">'+formatCurrency(netProfit)+'</b></div>';
  h += '</div>';
  
  // Быстрые действия (2 ряда)
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">';
  h += '<button class="btn" onclick="addFin()">+ Операция</button>';
  h += '<button class="btn" style="background:#3ecf8e" onclick="showGoals()">🎯 Цели</button>';
  h += '<button class="btn" style="background:#f59e0b" onclick="showReceivables()">💰 Дебиторка</button>';
  h += '<button class="btn" style="background:#9d6cff" onclick="showRecurring()">🔄 Регулярные</button>';
  h += '</div>';
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:15px">';
  h += '<button class="btn" style="background:#1f2530" onclick="showTaxReserve()">💵 Резерв на налоги</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="showBudgets()">📊 Бюджеты</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="showForecast()">📈 Прогноз</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="showTaxCalendar()">📅 Нал.календарь</button>';
  h += '</div>';
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">';
  h += '<button class="btn" style="background:#ec4899" onclick="showPots()">🎯 Копилки</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="showSmartPlanning()">📊 Умное планирование</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="showLifeBalance()">⚖️ Баланс жизни</button>';
  h += '</div>';
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:15px">';
  h += '<button class="btn" style="background:#1f2530" onclick="showCurrencyConverter()">💱 Конвертер</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="showTaxSettings()">🧾 Настройки налогов</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="exportFinancesPDF()">📥 PDF</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="exportFinancesCSV()">📊 CSV</button>';
  // === НОВЫЕ ФУНКЦИИ v6.9.0 ===
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;margin-bottom:8px">';
  h += '<button class="btn" style="background:#ff6b6b" onclick="showCredits()">💳 Кредиты</button>';
  h += '<button class="btn" style="background:#8b5cf6" onclick="showPaymentCalendar()"> Календарь</button>';
  h += '<button class="btn" style="background:#10b981" onclick="showClientAnalysis()">👥 Клиенты</button>';
  h += '<button class="btn" style="background:#f59e0b" onclick="showWhatIf()">🔮 Что если</button>';
  h += '</div>';
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">';
  h += '<button class="btn" style="background:#3ecf8e" onclick="showGoalForecast()">🎯 Прогноз целей</button>';
  h += '<button class="btn" style="background:#f59e0b" onclick="showLeakAnalysis()">️ Утечки</button>';
  h += '<button class="btn" style="background:#06b6d4" onclick="showCompoundCalculator()">💰 Калькулятор</button>';
  h += '<button class="btn" style="background:#10b981" onclick="showYearComparison()">📊 Годовое</button>';
  h += '</div>';
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">';
  h += '<button class="btn" style="background:#ec4899" onclick="showQuickTemplates()">⚡ Шаблоны</button>';
  h += '<button class="btn" style="background:#6c8cff" onclick="showFilteredHistory()"> История</button>';
  h += '</div>';
  h += '</div>';
  
  // Сравнение с предыдущим периодом
  h += renderComparison(financePeriod);
  
  // Кэшфлоу график
  h += renderCashflowChart();
  
  // Расходы по категориям
  var expenseCategories = {};
  db.finances.filter(function(f){return f.date && f.date >= periodStr && f.type === 'out'}).forEach(function(f){
    expenseCategories[f.cat] = (expenseCategories[f.cat] || 0) + f.amt;
  });
  if(Object.keys(expenseCategories).length > 0){
    h += '<div class="card"><h3>📊 Расходы по категориям</h3>';
    var totalExp = Object.values(expenseCategories).reduce(function(a,b){return a+b}, 0);
    Object.keys(expenseCategories).sort(function(a,b){return expenseCategories[b]-expenseCategories[a]}).forEach(function(cat){
      var pct = Math.round(expenseCategories[cat]/totalExp*100);
      h += '<div style="margin:8px 0"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px"><span>'+esc(cat)+'</span><b>'+formatCurrency(expenseCategories[cat])+' ('+pct+'%)</b></div>';
      h += '<div class="bar"><i style="width:'+pct+'%;background:#ff6b6b"></i></div></div>';
    });
    h += '</div>';
  }
  
  // Налоговый блок
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
  h += '<h3 style="color:#fff">🧾 Налоговая сводка ('+tax.jurisdictionLabel+' · '+tax.name+')</h3>';
  h += '<div class="info-row"><span style="color:#fff">Доход за период:</span><b style="color:#3ecf8e">'+formatCurrency(income)+'</b></div>';
  h += '<div class="info-row"><span style="color:#fff">Налоговая ставка:</span><b style="color:#f59e0b">'+tax.rate+'%</b></div>';
  h += '<div class="info-row"><span style="color:#fff">Налог к уплате:</span><b style="color:#ff6b6b">'+formatCurrency(tax.amount)+'</b></div>';
  h += '<div class="info-row"><span style="color:#fff">Чистая прибыль:</span><b style="color:#3ecf8e">'+formatCurrency(netProfit)+'</b></div>';
  if(tax.note) h += '<div class="mut" style="margin-top:10px;font-size:12px">💡 '+tax.note+'</div>';
  h += '</div>';
  
  // Топ-5 клиентов по доходу
  var byClient = {};
  db.finances.filter(function(f){return f.type === 'in' && f.client}).forEach(function(f){
    byClient[f.client] = (byClient[f.client] || 0) + f.amt;
  });
  var topClients = Object.keys(byClient).sort(function(a,b){return byClient[b]-byClient[a]}).slice(0,5);
  if(topClients.length > 0){
    h += '<div class="card"><h3>🏆 Топ клиентов по доходу</h3>';
    topClients.forEach(function(c,i){
      h += '<div class="info-row"><span><b>#'+(i+1)+'</b> '+esc(c)+'</span><b style="color:#3ecf8e">'+formatCurrency(byClient[c])+'</b></div>';
    });
    h += '</div>';
  }
  
  // Средняя ставка в час
  var totalHours = 0;
  db.projects.forEach(function(p){totalHours += p.estimatedHours || 0});
  if(totalHours > 0 && income > 0){
    var hourlyRate = Math.round(income / totalHours);
    h += '<div class="card" style="text-align:center"><div class="mut">Средняя ставка в час</div><div style="font-size:28px;font-weight:bold;color:#3ecf8e;margin-top:5px">'+formatCurrency(hourlyRate)+'</div><div class="mut" style="font-size:11px">на основе '+totalHours+' часов работы</div></div>';
  }
  
  // Список операций
  h += '<div class="card"><h3>📋 Операции за период ('+periodFin.length+')</h3>';
  if(periodFin.length === 0){
    h += '<div class="mut" style="text-align:center;padding:20px">Нет операций за этот период</div>';
  } else {
    periodFin.sort(function(a,b){return b.date.localeCompare(a.date)}).forEach(function(f){
      h += '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid #242b36">';
      h += '<div style="flex:1">';
      h += '<div style="font-weight:bold;color:'+(f.type==='in'?'#3ecf8e':'#ff6b6b')+';font-size:15px">'+(f.type==='in'?'+ ':'- ')+formatCurrency(f.amt)+'</div>';
      h += '<div class="mut" style="font-size:11px;margin-top:2px">'+f.date+' · '+esc(f.cat);
      if(f.client) h += ' · 👤 '+esc(f.client);
      h += '</div>';
      if(f.note) h += '<div class="mut" style="font-size:10px;margin-top:2px;color:#6c8cff">💬 '+esc(f.note)+'</div>';
      if(f.original_cur && f.original_cur !== db.currency) h += '<div class="mut" style="font-size:10px;margin-top:1px">💱 '+f.original_amt+' '+f.original_cur+'</div>';
      h += '</div>';
      h += '<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:4px 8px" onclick="delFin(\''+f.id+'\')">🗑</button>';
      h += '</div>';
    });
  }
  h += '</div>';
  
  
  // === НОВЫЕ ФУНКЦИИ v6.9.5 ===
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;margin-bottom:8px">';
  h += '<button class="btn" style="background:#06b6d4" onclick="showCsvImport()">📥 Импорт CSV</button>';
  h += '<button class="btn" style="background:#8b5cf6" onclick="showNetWorth()">💼 Активы/Пассивы</button>';
  h += '<button class="btn" style="background:#f59e0b" onclick="showSubscriptions()">📋 Подписки</button>';
  h += '</div>';
  
  // === НОВЫЕ ФУНКЦИИ v6.10.0 ===
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;margin-bottom:8px">';
  h += '<button class="btn" style="background:#ff6b6b" onclick="showFireCalculator()">🔥 FIRE</button>';
  h += '<button class="btn" style="background:#10b981" onclick="showMonthlyReport()">📄 Отчёт за месяц</button>';
  h += '</div>';
  document.getElementById('app').innerHTML = h;
}

function renderMonthlyChart(){
  var months = [];
  var now = new Date();
  for(var i=5; i>=0; i--){
    var d = new Date(now.getFullYear(), now.getMonth()-i, 1);
    var key = d.toISOString().slice(0,7);
    var label = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'][d.getMonth()];
    months.push({key:key, label:label, income:0});
  }
  db.finances.forEach(function(f){
    if(f.type !== 'in') return;
    var k = f.date ? f.date.slice(0,7) : '';
    var m = months.find(function(x){return x.key === k});
    if(m) m.income += f.amt;
  });
  var maxInc = Math.max.apply(null, months.map(function(m){return m.income})) || 1;
  var h = '<div class="chart">';
  months.forEach(function(m){
    var hPct = (m.income/maxInc)*100;
    h += '<div class="chart-col" style="height:'+Math.max(hPct,3)+'%"><span>'+m.label+'</span></div>';
  });
  h += '</div>';
  h += '<div style="display:flex;justify-content:space-between;margin-top:10px;font-size:12px;color:#8b94a7">';
  months.forEach(function(m){
    h += '<div style="flex:1;text-align:center">'+(m.income > 0 ? formatCurrency(m.income) : '—')+'</div>';
  });
  h += '</div>';
  return h;
}

function formatCurrency(amount){
  var cur = db.currency || 'RUB';
  var symbols = {RUB:'₽', USD:'$', EUR:'€', CNY:'¥', BYN:'Br', KZT:'₸'};
  var symbol = symbols[cur] || cur;
  return Math.round(amount).toLocaleString('ru-RU') + ' ' + symbol;
}

function calculateTax(income){
  var j = db.taxJurisdiction || 'russia';
  var s = db.taxSystem || 'npd';
  var rate = 0, name = '', note = '', jurisdictionLabel = '';
  
  if(j === 'russia'){
    jurisdictionLabel = '🇷🇺 Россия';
    if(s === 'npd'){ rate = 6; name = 'НПД (самозанятый)'; note = 'Налог на профессиональный доход: 6% при работе с юрлицами, 4% с физлицами. Лимит 2.4 млн ₽/год.'; }
    else if(s === 'usn6'){ rate = 6; name = 'УСН 6% (доходы)'; note = 'Упрощённая система: 6% со всех доходов. Лимит ~200 млн ₽/год.'; }
    else if(s === 'usn15'){ rate = 15; name = 'УСН 15% (доходы-расходы)'; note = '15% с разницы доходов и расходов. Выгодно при расходах >60% от доходов.'; }
    else if(s === 'ndfl'){ rate = 13; name = 'НДФЛ (физлицо)'; note = '13% для резидентов РФ. Декларация 3-НДФЛ до 30 апреля.'; }
  } else if(j === 'belarus'){
    jurisdictionLabel = '🇧🇾 Беларусь';
    if(s === 'pvt'){ rate = 1; name = 'ПВТ (1% НДС)'; note = 'Парк высоких технологий: 1% НДС с выручки, 9% прибыль. Льготный режим для IT.'; }
    else if(s === 'ip_no_vat'){ rate = 10; name = 'ИП без НДС'; note = '10% подоходный для ИП на упрощёнке. Лимит ~715 000 BYN/год.'; }
    else if(s === 'ndfl_by'){ rate = 13; name = 'Подоходный 13%'; note = 'Стандартный подоходный налог для физлиц-резидентов.'; }
  } else if(j === 'china'){
    jurisdictionLabel = '🇨🇳 Китай';
    if(s === 'vat_small'){ rate = 3; name = 'VAT малый (3%)'; note = 'Упрощённый НДС для малых предприятий. Стандартный VAT 13%.'; }
    else if(s === 'corporate'){ rate = 25; name = 'Corporate Income Tax'; note = '25% на прибыль компаний. Для малых IT-компаний может быть 15%.'; }
    else if(s === 'iit'){ rate = 20; name = 'IIT (индивидуальный)'; note = 'Прогрессивный налог 3-45%. Средний ~20% для фрилансеров.'; }
  }
  
  var amount = Math.round(income * rate / 100);
  return {rate:rate, name:name, amount:amount, note:note, jurisdictionLabel:jurisdictionLabel};
}

function showCurrencyConverter(){
  var rates = db.exchangeRates || {USD:92.50,EUR:100.20,CNY:12.80,BYN:28.50,KZT:0.19,RUB:1};
  var h = '<h3>💱 Конвертер валют</h3>';
  h += '<p class="mut">Курсы можно обновить в настройках</p>';
  h += '<label>Сумма</label><input id="cc_amount" type="number" placeholder="1000" value="1000" oninput="updateConversion()">';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
  h += '<div><label>Из валюты</label><select id="cc_from" onchange="updateConversion()">';
  ['RUB','USD','EUR','CNY','BYN','KZT'].forEach(function(c){h += '<option value="'+c+'" '+(c===db.currency?'selected':'')+'>'+c+'</option>';});
  h += '</select></div>';
  h += '<div><label>В валюту</label><select id="cc_to" onchange="updateConversion()">';
  ['RUB','USD','EUR','CNY','BYN','KZT'].forEach(function(c){h += '<option value="'+c+'" '+(c==='USD'?'selected':'')+'>'+c+'</option>';});
  h += '</select></div></div>';
  h += '<div id="cc_result" style="background:#1a2035;border:1px solid #3ecf8e;border-radius:8px;padding:15px;margin-top:15px;text-align:center;font-size:20px;font-weight:bold;color:#3ecf8e"></div>';
  h += '<div class="mut" style="margin-top:10px;font-size:11px">Текущие курсы (к RUB): USD='+rates.USD+' · EUR='+rates.EUR+' · CNY='+rates.CNY+' · BYN='+rates.BYN+' · KZT='+rates.KZT+'</div>';
  h += '<button class="btn" style="background:#f59e0b;margin-top:10px;width:100%" onclick="editExchangeRates()">⚙️ Обновить курсы</button>';
  h += '<div style="display:flex;gap:10px;margin-top:10px">';
  h += '<button class="btn" style="background:#1f2530" onclick="closeModal()">Закрыть</button>';
  h += '</div>';
  openModal(h);
  setTimeout(updateConversion, 50);
}

function updateConversion(){
  var amount = +document.getElementById('cc_amount').value || 0;
  var from = document.getElementById('cc_from').value;
  var to = document.getElementById('cc_to').value;
  var rates = db.exchangeRates;
  var inRub = amount * (rates[from] || 1);
  var result = inRub / (rates[to] || 1);
  var symbols = {RUB:'₽', USD:'$', EUR:'€', CNY:'¥', BYN:'Br', KZT:'₸'};
  document.getElementById('cc_result').innerHTML = amount.toLocaleString('ru-RU')+' '+from+' =<br><span style="font-size:28px">'+Math.round(result).toLocaleString('ru-RU')+' '+symbols[to]+'</span>';
}

function editExchangeRates(){
  var rates = db.exchangeRates || {};
  var h = '<h3>⚙️ Курсы валют (к RUB)</h3>';
  h += '<p class="mut">Введите, сколько рублей стоит 1 единица валюты</p>';
  ['USD','EUR','CNY','BYN','KZT'].forEach(function(c){
    h += '<label>'+c+' (1 '+c+' = ? ₽)</label><input id="rate_'+c+'" type="number" step="0.01" value="'+(rates[c]||0)+'">';
  });
  h += '<div style="display:flex;gap:10px;margin-top:15px">';
  h += '<button class="btn" onclick="saveExchangeRates()">💾 Сохранить</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="showCurrencyConverter()">← Назад</button>';
  h += '</div>';
  openModal(h);
}

function saveExchangeRates(){
  ['USD','EUR','CNY','BYN','KZT'].forEach(function(c){
    db.exchangeRates[c] = +document.getElementById('rate_'+c).value || 0;
  });
  save();
  showCurrencyConverter();
}

function showTaxSettings(){
  var jurisdictions = {
    'russia': {label:'🇷🇺 Россия', systems:{'npd':'НПД (самозанятый, 6%)','usn6':'УСН 6% (доходы)','usn15':'УСН 15% (доходы-расходы)','ndfl':'НДФЛ 13%'}},
    'belarus': {label:'🇧🇾 Беларусь', systems:{'pvt':'ПВТ (1% НДС)','ip_no_vat':'ИП без НДС (10%)','ndfl_by':'Подоходный 13%'}},
    'china': {label:'🇨🇳 Китай', systems:{'vat_small':'VAT малый (3%)','corporate':'Corporate Tax (25%)','iit':'IIT индивидуальный (~20%)'}}
  };
  
  var h = '<h3>🧾 Настройки налогов</h3>';
  h += '<label>Юрисдикция</label><select id="tax_jur" onchange="updateTaxSystems()">';
  Object.keys(jurisdictions).forEach(function(j){
    h += '<option value="'+j+'" '+(db.taxJurisdiction===j?'selected':'')+'>'+jurisdictions[j].label+'</option>';
  });
  h += '</select>';
  h += '<label>Система налогообложения</label><select id="tax_sys"></select>';
  h += '<label>Основная валюта</label><select id="main_cur">';
  ['RUB','USD','EUR','CNY','BYN','KZT'].forEach(function(c){
    h += '<option value="'+c+'" '+(db.currency===c?'selected':'')+'>'+c+'</option>';
  });
  h += '</select>';
  h += '<div id="tax_note" class="mut" style="margin-top:10px;font-size:12px"></div>';
  h += '<div style="display:flex;gap:10px;margin-top:15px">';
  h += '<button class="btn" onclick="saveTaxSettings()">💾 Сохранить</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="closeModal()">Отмена</button>';
  h += '</div>';
  openModal(h);
  
  window._taxJurisdictions = jurisdictions;
  updateTaxSystems();
}

function updateTaxSystems(){
  var j = document.getElementById('tax_jur').value;
  var systems = window._taxJurisdictions[j].systems;
  var sel = document.getElementById('tax_sys');
  sel.innerHTML = '';
  Object.keys(systems).forEach(function(s){
    var opt = document.createElement('option');
    opt.value = s;
    opt.textContent = systems[s];
    if(db.taxSystem === s && db.taxJurisdiction === j) opt.selected = true;
    sel.appendChild(opt);
  });
}

function saveTaxSettings(){
  db.taxJurisdiction = document.getElementById('tax_jur').value;
  db.taxSystem = document.getElementById('tax_sys').value;
  db.currency = document.getElementById('main_cur').value;
  save();
  closeModal();
  renderFinances();
}

function exportFinancesPDF(){
  var now = new Date();
  var periodStr = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0,10);
  var periodFin = db.finances.filter(function(f){return f.date && f.date >= periodStr});
  var income = 0, expense = 0;
  periodFin.forEach(function(f){if(f.type === 'in') income += f.amt; else expense += f.amt;});
  var tax = calculateTax(income);
  
  var h = '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Финансовый отчёт</title>';
  h += '<style>body{font-family:system-ui,sans-serif;color:#000;margin:0;padding:20px}';
  h += 'h1{text-align:center;color:#2563eb}';
  h += '.header{text-align:center;color:#666;margin-bottom:30px}';
  h += '.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin:20px 0}';
  h += '.stat{background:#f3f4f6;padding:15px;border-radius:8px;text-align:center}';
  h += '.stat b{font-size:20px;display:block;margin-top:5px}';
  h += 'table{width:100%;border-collapse:collapse;margin:20px 0}';
  h += 'th,td{border:1px solid #ddd;padding:8px;text-align:left}';
  h += 'th{background:#2563eb;color:#fff}';
  h += '.in{color:#059669;font-weight:bold}.out{color:#dc2626;font-weight:bold}';
  h += '@media print{body{padding:10px}}</style></head><body>';
  h += '<h1>💰 Финансовый отчёт</h1>';
  h += '<div class="header">'+esc(db.profile.name)+' · '+esc(db.profile.spec)+'<br>Период: '+now.toLocaleDateString('ru-RU')+'</div>';
  h += '<div class="stats">';
  h += '<div class="stat">Доход<b style="color:#059669">'+formatCurrency(income)+'</b></div>';
  h += '<div class="stat">Расход<b style="color:#dc2626">'+formatCurrency(expense)+'</b></div>';
  h += '<div class="stat">Налог ('+tax.name+')<b style="color:#f59e0b">'+formatCurrency(tax.amount)+'</b></div>';
  h += '<div class="stat">Чистая прибыль<b style="color:#059669">'+formatCurrency(income-expense-tax.amount)+'</b></div>';
  h += '</div>';
  h += '<h2>Операции</h2>';
  h += '<table><tr><th>Дата</th><th>Тип</th><th>Категория</th><th>Сумма</th></tr>';
  periodFin.sort(function(a,b){return b.date.localeCompare(a.date)}).forEach(function(f){
    h += '<tr><td>'+f.date+'</td><td>'+(f.type==='in'?'Доход':'Расход')+'</td><td>'+esc(f.cat)+'</td><td class="'+f.type+'">'+(f.type==='in'?'+':'-')+formatCurrency(f.amt)+'</td></tr>';
  });
  h += '</table>';
  h += '<div style="text-align:center;margin-top:30px;color:#666;font-size:12px">Сгенерировано в SoloDev v6.9.3</div>';
  h += '</body></html>';
  
  var w = window.open('','_blank');
  w.document.write(h);
  w.document.close();
  setTimeout(function(){w.print();}, 500);
}

function addFin(){
  var clients = db.clients.map(function(c){return c.name}).filter(function(n){return n});
  var h = '<h3>➕ Новая операция</h3>';
  h += '<label>Сумма *</label><input id="f_amt" type="number" placeholder="0">';
  h += '<label>Валюта</label><select id="f_cur">';
  ['RUB','USD','EUR','CNY','BYN','KZT'].forEach(function(c){h += '<option value="'+c+'" '+(c===db.currency?'selected':'')+'>'+c+'</option>';});
  h += '</select>';
  h += '<label>Тип</label><select id="f_type"><option value="in">Доход (+)</option><option value="out">Расход (-)</option></select>';
  h += '<label>Категория</label><select id="f_cat">';
  ['Проект','Аванс','Реклама','Подписки','Оборудование','Налоги','Обучение','Транспорт','Здоровье','Семья','Накопления','Другое'].forEach(function(c){h += '<option>'+c+'</option>';});
  h += '</select>';
  h += '<label>Клиент (для доходов)</label><select id="f_client"><option value="">— не указан —</option>';
  clients.forEach(function(c){h += '<option>'+esc(c)+'</option>';});
  h += '</select>';
  h += '<label>Дата</label><input id="f_date" type="date" value="'+today()+'">';
  h += '<label>Комментарий</label><input id="f_note" placeholder="Необязательно">';
  h += '<div style="display:flex;gap:10px;margin-top:15px">';
  h += '<button class="btn" onclick="saveNewFin()">💾 Сохранить</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="closeModal()">Отмена</button>';
  h += '</div>';
  openModal(h);
}

function saveNewFin(){
  var amt = +document.getElementById('f_amt').value;
  if(!amt){alert('⚠️ Введите сумму!');return;}
  var cur = document.getElementById('f_cur').value;
  var type = document.getElementById('f_type').value;
  var cat = document.getElementById('f_cat').value;
  var client = document.getElementById('f_client').value;
  var date = document.getElementById('f_date').value || today();
  var note = document.getElementById('f_note').value;
  
  // Конвертируем в основную валюту
  var rates = db.exchangeRates || {RUB:1};
  var inRub = amt * (rates[cur] || 1);
  var inMain = inRub / (rates[db.currency] || 1);
  
  db.finances.unshift({
    id: (typeof uid!=='undefined' ? uid() : Date.now().toString(36)+Math.random().toString(36).substr(2)),
    date: date,
    type: type,
    amt: Math.round(inMain),
    original_amt: amt,
    original_cur: cur,
    cat: cat,
    client: client,
    note: note
  });
  save();
  closeModal();
  renderFinances();
}

function delFin(id){
  if(confirm('Удалить операцию?')){
    db.finances = db.finances.filter(function(f){return f.id !== id});
    save();
    renderFinances();
  }
}


var currentEmailCat='all';
var emailDisplayLimit=50;
function renderEmails(){
  var h='<h2>✉️ Шаблоны писем</h2>';
  h+='<input id="emailSearch" placeholder="🔍 Поиск по категории, ситуации или тексту..." oninput="filterEmails()" style="margin-bottom:10px">';
  h+='<div class="filter-row" id="emailCats">';
  h+='<button class="filter-btn '+(currentEmailCat==='all'?'active':'')+'" onclick="filterEmailCat(\'all\')">Все</button>';
  h+='<button class="filter-btn '+(currentEmailCat==='Cold Outreach'?'active':'')+'" onclick="filterEmailCat(\'Cold Outreach\')">Холодные</button>';
  h+='<button class="filter-btn '+(currentEmailCat==='Follow-up'?'active':'')+'" onclick="filterEmailCat(\'Follow-up\')">Напоминания</button>';
  h+='<button class="filter-btn '+(currentEmailCat==='Payment'?'active':'')+'" onclick="filterEmailCat(\'Payment\')">Оплата</button>';
  h+='<button class="filter-btn '+(currentEmailCat==='Proposal'?'active':'')+'" onclick="filterEmailCat(\'Proposal\')">КП</button>';
  h+='</div>';
  h+='<div class="mut" style="margin:10px 0">Всего в базе: '+db.emailTemplates.length+' шаблонов</div>';
  h+='<div id="emailList"></div>';
  document.getElementById('app').innerHTML=h;
  filterEmails();
}
function filterEmailCat(cat){currentEmailCat=cat;emailDisplayLimit=50;renderEmailList()}
function filterEmails(){
  emailDisplayLimit=50;
  renderEmailList();
}
function renderEmailList(){
  var q=(document.getElementById('emailSearch')?document.getElementById('emailSearch').value:'').toLowerCase();
  var list=document.getElementById('emailList');
  if(!list)return;
  list.innerHTML='';
  var displayed=0;
  var filtered=db.emailTemplates.filter(function(t){
    if(currentEmailCat!=='all' && t.category!==currentEmailCat)return false;
    var text=(t.category+' '+t.scenario+' '+t.subject+' '+t.body).toLowerCase();
    if(q && !text.includes(q))return false;
    return true;
  });
  
  filtered.forEach(function(t){
    if(displayed>=emailDisplayLimit)return;
    displayed++;
    var card=document.createElement('div');
    card.className='card template-card';
    card.innerHTML='<div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="background:#6c8cff;color:#fff;padding:2px 8px;border-radius:6px;font-size:11px">#'+displayed+'</span><span style="background:#9d6cff;color:#fff;padding:2px 8px;border-radius:6px;font-size:11px">'+t.category+'</span><span style="font-size:11px;color:#8b94a7">'+t.tone+' · '+t.tech+'</span></div>'+
    '<div style="font-weight:bold;margin-bottom:6px">📌 '+esc(t.subject)+'</div>'+
    '<div class="mut" style="margin-bottom:10px;white-space:pre-wrap;font-size:13px">'+esc(t.body)+'</div>'+
    '<button class="btn small" onclick="copySmartEmail(\''+t.id+'\')">📋 Копировать и подставить данные</button>';
    list.appendChild(card);
  });
  
  var info=document.createElement('div');
  info.className='mut';
  info.style.marginTop='10px';
  info.style.textAlign='center';
  info.textContent='Показано '+displayed+' из '+filtered.length+' шаблонов';
  list.appendChild(info);
  
  if(displayed<filtered.length){
    var btn=document.createElement('button');
    btn.className='btn';
    btn.style.marginTop='10px';
    btn.textContent='Показать еще 50';
    btn.onclick=function(){
      emailDisplayLimit+=50;
      renderEmailList();
    };
    list.appendChild(btn);
  }
}
function copySmartEmail(id){
  var t=db.emailTemplates.find(function(x){return x.id===id});
  if(!t)return;
  var client=db.clients.length>0?db.clients[0]:{name:'Клиент',company:'Компания'};
  var text=t.subject+'\n\n'+t.body;
  text=text.replace(/{client_name}/g, client.name);
  text=text.replace(/{company}/g, client.company);
  text=text.replace(/{my_name}/g, db.profile.name);
  text=text.replace(/{my_role}/g, db.profile.spec);
  text=text.replace(/{my_phone}/g, db.profile.phone||'+79000000000');
  text=text.replace(/{price}/g, '50000');
  text=text.replace(/{deadline}/g, '3 рабочих дня');
  navigator.clipboard.writeText(text).then(function(){alert('✅ Письмо скопировано! Переменные подставлены из профиля/клиентов.')});
}


function getPortfolioHTML(){
  var completed=db.projects.filter(function(p){return p.stage===3});
  var h='<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">';
  h+='<title>Портфолио — '+esc(db.profile.name)+'</title>';
  h+='<style>body{font-family:system-ui,sans-serif;background:#0e1116;color:#e8ecf3;margin:0;padding:0}';
  h+='.container{max-width:900px;margin:0 auto;padding:30px 20px}';
  h+='.header{background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;padding:40px 30px;border-radius:16px;margin-bottom:30px}';
  h+='.header h1{margin:0 0 10px 0;font-size:32px}';
  h+='.header p{margin:5px 0;opacity:0.9}';
  h+='.contact{background:#171b22;padding:15px;border-radius:12px;margin-bottom:20px}';
  h+='.contact a{color:#6c8cff;text-decoration:none}';
  h+='.section-title{color:#6c8cff;border-bottom:2px solid #242b36;padding-bottom:10px;margin:30px 0 20px 0}';
  h+='.project{background:#171b22;border:1px solid #242b36;border-left:4px solid #6c8cff;border-radius:12px;padding:20px;margin:15px 0}';
  h+='.project h3{margin:0 0 10px 0;color:#fff}';
  h+='.meta{color:#8b94a7;font-size:13px;margin:5px 0}';
  h+='.tech{display:inline-block;background:#242b36;color:#6c8cff;padding:4px 10px;border-radius:6px;font-size:12px;margin:3px}';
  h+='.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin:20px 0}';
  h+='.stat-box{background:#171b22;padding:15px;border-radius:12px;text-align:center}';
  h+='.stat-box b{font-size:24px;color:#3ecf8e;display:block}';
  h+='.stat-box span{font-size:12px;color:#8b94a7}';
  h+='@media print{body{background:#fff;color:#000}.header{background:#6c8cff !important;-webkit-print-color-adjust:exact}}';
  h+='</style></head><body><div class="container">';
  
  h+='<div class="header"><h1>'+esc(db.profile.name)+'</h1><p>'+esc(db.profile.spec)+'</p>';
  if(db.profile.phone)h+='<p>📞 '+esc(db.profile.phone)+'</p>';
  if(db.profile.email)h+='<p>✉️ <a href="mailto:'+esc(db.profile.email)+'">'+esc(db.profile.email)+'</a></p>';
  h+='</div>';
  
  h+='<div class="stats">';
  h+='<div class="stat-box"><b>'+completed.length+'</b><span>Завершённых проектов</span></div>';
  var totalBudget=0;completed.forEach(function(p){totalBudget+=p.budget||0});
  h+='<div class="stat-box"><b>'+totalBudget.toLocaleString()+' ₽</b><span>Общий бюджет</span></div>';
  var totalHours=0;completed.forEach(function(p){totalHours+=p.estimatedHours||0});
  h+='<div class="stat-box"><b>'+totalHours+'</b><span>Часов работы</span></div>';
  h+='</div>';
  
  h+='<h2 class="section-title">📁 Завершённые проекты</h2>';
  if(completed.length===0){h+='<p style="color:#8b94a7">Пока нет завершённых проектов. Отметьте проекты как "Завершён" в разделе Проекты.</p>';}
  completed.forEach(function(p){
    h+='<div class="project"><h3>'+esc(p.name)+'</h3>';
    h+='<div class="meta">👤 Клиент: '+esc(p.client||'Не указан')+'</div>';
    if(p.deadline)h+='<div class="meta"> Завершён: '+esc(p.deadline)+'</div>';
    h+='<div class="meta">💰 Бюджет: '+(p.budget||0).toLocaleString()+' ₽</div>';
    if(p.estimatedHours)h+='<div class="meta">⏱ Часов: '+p.estimatedHours+'</div>';
    if(p.description)h+='<div style="margin:12px 0;line-height:1.6">'+esc(p.description)+'</div>';
    if(p.tech_stack){h+='<div style="margin-top:10px"><b style="font-size:12px;color:#8b94a7">Технологии:</b><br>';
      p.tech_stack.split(',').forEach(function(t){h+='<span class="tech">'+esc(t.trim())+'</span>'});h+='</div>';}
    h+='</div>';
  });
  
  h+='<div style="text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid #242b36;color:#8b94a7;font-size:13px">';
  h+='Портфолио сгенерировано '+today()+' · SoloDev v6.9.3';
  h+='</div></div></body></html>';
  return h;
}

function previewPortfolio(){
  var html=getPortfolioHTML();
  var w=window.open('','_blank');
  w.document.write(html);
  w.document.close();
}

function downloadPortfolio(){
  var html=getPortfolioHTML();
  var blob=new Blob([html],{type:'text/html'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  var fileName='Портфолио_'+db.profile.name.replace(/\s/g,'_')+'_'+today()+'.html';
  a.download=fileName;
  a.click();
  alert('✅ Портфолио скачано: '+fileName+'\n\nОткрой файл в браузере и нажми Ctrl+P для сохранения в PDF.');
}

function generatePortfolio(){
  if(db.projects.filter(function(p){return p.stage===3}).length===0){
    alert('⚠️ Нет завершённых проектов! Сначала отметь проекты как "Завершён" (этап 4).');
    return;
  }
  previewPortfolio();
}


function showDocAssistant(){
  var h='<h3>🤖 Умный помощник документов</h3>';
  h+='<p class="mut">Выберите тип документа для генерации</p>';
  h+='<div style="display:grid;gap:10px;margin-top:15px">';
  h+='<button class="btn" onclick="generateContract()">📄 Договор подряда</button>';
  h+='<button class="btn" onclick="generateAct()">📋 Акт выполненных работ</button>';
  h+='<button class="btn" onclick="generateTZ()">📝 Техническое задание</button>';
  h+='<button class="btn" onclick="generateInvoice()">💳 Счёт на оплату</button>';
  h+='</div>';
  h+='<div style="margin-top:15px;padding-top:15px;border-top:1px solid #242b36">';
  h+='<p class="mut">Нужна помощь с заполнением?</p>';
  h+='<button class="btn small" style="background:#9d6cff" onclick="showDocHelper()">💡 Помощник по документам</button>';
  h+='</div>';
  h+='<button class="btn" style="background:#1f2530;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function showDocHelper(){
  var h='<h3>💡 Помощник по документам</h3>';
  h+='<p class="mut">Что вас интересует?</p>';
  h+='<div style="display:grid;gap:8px;margin-top:10px">';
  h+='<button class="btn small" onclick="showDocTip(\'contract\')">📄 Как заполнить договор</button>';
  h+='<button class="btn small" onclick="showDocTip(\'act\')">📋 Как составить акт</button>';
  h+='<button class="btn small" onclick="showDocTip(\'tz\')">📝 Как написать ТЗ</button>';
  h+='<button class="btn small" onclick="showDocTip(\'invoice\')">💳 Как выставить счёт</button>';
  h+='<button class="btn small" onclick="showDocTip(\'tips\')">💰 Советы по ценам</button>';
  h+='</div>';
  h+='<button class="btn" style="background:#1f2530;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function showDocTip(type){
  var tips={
    contract:'<h3>📄 Договор подряда — ключевые пункты</h3><ul style="line-height:1.8"><li><b>Предмет:</b> чётко опишите, что делаете (разработка сайта, бота и т.д.)</li><li><b>Стоимость:</b> укажите общую сумму или почасовую ставку</li><li><b>Сроки:</b> дата начала и окончания работ</li><li><b>Оплата:</b> предоплата 30-50%, остальное по этапам</li><li><b>Правки:</b> сколько бесплатных правок включено (обычно 2-3 раунда)</li><li><b>Исходный код:</b> кому принадлежит после оплаты (обычно заказчику)</li></ul>',
    act:'<h3>📋 Акт выполненных работ</h3><ul style="line-height:1.8"><li>Составляется после завершения каждого этапа или всего проекта</li><li>Перечислите все выполненные работы с ценами</li><li>Укажите общую сумму</li><li>Фраза "Претензий не имею" защищает вас от будущих споров</li><li>Подписывается обеими сторонами</li></ul>',
    tz:'<h3>📝 Техническое задание — структура</h3><ul style="line-height:1.8"><li><b>Цели проекта:</b> зачем делается продукт</li><li><b>Целевая аудитория:</b> кто будет пользоваться</li><li><b>Функциональные требования:</b> что должен делать продукт (список функций)</li><li><b>Технические требования:</b> стек технологий, производительность</li><li><b>Сроки и этапы:</b> календарный план</li><li><b>Критерии приёмки:</b> как понимается, что работа выполнена</li></ul><p class="mut" style="margin-top:10px">Чем детальнее ТЗ — тем меньше правок!</p>',
    invoice:'<h3>💳 Счёт на оплату</h3><ul style="line-height:1.8"><li>Укажите номер счёта и дату</li><li>Ваши реквизиты (банк, БИК, расчётный счёт)</li><li>Реквизиты заказчика</li><li>Наименование услуги и сумма</li><li>Срок оплаты (обычно 3-5 банковских дней)</li></ul>',
    tips:'<h3>💰 Советы по ценообразованию</h3><ul style="line-height:1.8"><li><b>Почасовая ставка:</b> Junior 500-1000₽/час, Middle 1000-2000₽/час, Senior 2000-4000₽/час</li><li><b>Фиксированная цена:</b> умножьте оценку часов на ставку + 20% буфер</li><li><b>Предоплата:</b> всегда берите 30-50% до начала работ</li><li><b>Этапы:</b> разбивайте крупные проекты на этапы с оплатой каждого</li><li><b>Правки:</b> включите 2-3 раунда бесплатных правок, далее по часам</li></ul>'
  };
  var h=tips[type]||'<p>Информация недоступна</p>';
  h+='<button class="btn" style="background:#1f2530;margin-top:15px" onclick="showDocHelper()">← Назад</button>';
  openModal(h);
}

function generateContract(){
  var client=db.clients.length>0?db.clients[0]:{name:'Клиент',company:'Компания'};
  var h='<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Договор подряда</title>';
  h+='<style>body{font-family:serif;max-width:800px;margin:40px auto;padding:20px;line-height:1.6}';
  h+='h1{text-align:center}h2{margin-top:30px}.section{margin:20px 0}';
  h+='@media print{body{margin:0}}</style></head><body>';
  h+='<h1>ДОГОВОР ПОДРЯДА №'+Math.floor(Math.random()*1000)+'</h1>';
  h+='<p style="text-align:right">г. Москва, '+today()+'</p>';
  h+='<div class="section"><h2>1. ПРЕДМЕТ ДОГОВОРА</h2>';
  h+='<p>1.1. Исполнитель ('+esc(db.profile.name)+', '+esc(db.profile.spec)+') обязуется выполнить работы по разработке программного обеспечения для Заказчика ('+esc(client.company)+').</p>';
  h+='<p>1.2. Конкретный перечень работ определяется в Техническом задании, которое является неотъемлемой частью настоящего Договора.</p></div>';
  h+='<div class="section"><h2>2. СТОИМОСТЬ И ПОРЯДОК ОПЛАТЫ</h2>';
  h+='<p>2.1. Общая стоимость работ составляет: <b>___________ рублей</b>.</p>';
  h+='<p>2.2. Оплата производится в следующем порядке:</p>';
  h+='<p>• Предоплата 30% — до начала работ</p><p>• 40% — после сдачи промежуточного этапа</p><p>• 30% — после окончательной сдачи проекта</p></div>';
  h+='<div class="section"><h2>3. СРОКИ ВЫПОЛНЕНИЯ</h2>';
  h+='<p>3.1. Начало работ: ___________ 2026 г.</p><p>3.2. Окончание работ: ___________ 2026 г.</p></div>';
  h+='<div class="section"><h2>4. ПРАВА И ОБЯЗАННОСТИ СТОРОН</h2>';
  h+='<p>4.1. Исполнитель обязуется выполнить работы качественно и в срок.</p>';
  h+='<p>4.2. Заказчик обязуется своевременно оплачивать работы и предоставлять необходимую информацию.</p></div>';
  h+='<div class="section"><h2>5. РЕКВИЗИТЫ СТОРОН</h2>';
  h+='<p><b>Исполнитель:</b><br>'+esc(db.profile.name)+'<br>'+esc(db.profile.spec)+'<br>Тел: '+esc(db.profile.phone||'')+ '<br>Email: '+esc(db.profile.email||'')+'</p>';
  h+='<p><b>Заказчик:</b><br>'+esc(client.name)+'<br>'+esc(client.company)+'</p></div>';
  h+='<div style="margin-top:50px;display:flex;justify-content:space-between">';
  h+='<div>Подпись Исполнителя: ___________</div><div>Подпись Заказчика: ___________</div></div>';
  h+='</body></html>';
  openDocInNewTab(h,'Договор_подряда_'+client.company+'_'+today()+'.html');
}

function generateAct(){
  var client=db.clients.length>0?db.clients[0]:{name:'Клиент',company:'Компания'};
  var completed=db.projects.filter(function(p){return p.stage===3});
  var h='<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Акт выполненных работ</title>';
  h+='<style>body{font-family:serif;max-width:800px;margin:40px auto;padding:20px;line-height:1.6}';
  h+='h1{text-align:center}table{width:100%;border-collapse:collapse;margin:20px 0}th,td{border:1px solid #000;padding:8px;text-align:left}';
  h+='@media print{body{margin:0}}</style></head><body>';
  h+='<h1>АКТ ВЫПОЛНЕННЫХ РАБОТ №'+Math.floor(Math.random()*1000)+'</h1>';
  h+='<p style="text-align:right">г. Москва, '+today()+'</p>';
  h+='<p>Мы, нижеподписавшиеся, Исполнитель '+esc(db.profile.name)+' с одной стороны, и Заказчик '+esc(client.company)+' с другой стороны, составили настоящий Акт о нижеследующем:</p>';
  h+='<p>Исполнитель выполнил, а Заказчик принял следующие работы:</p>';
  h+='<table><tr><th>№</th><th>Наименование работ</th><th>Стоимость</th></tr>';
  var total=0;
  completed.forEach(function(p,i){
    h+='<tr><td>'+(i+1)+'</td><td>'+esc(p.name)+'</td><td>'+(p.budget||0).toLocaleString()+' ₽</td></tr>';
    total+=p.budget||0;
  });
  h+='<tr><td colspan="2"><b>ИТОГО:</b></td><td><b>'+total.toLocaleString()+' ₽</b></td></tr></table>';
  h+='<p>Работы выполнены в полном объёме, в срок и с надлежащим качеством. Заказчик претензий по объёму, качеству и срокам выполнения работ не имеет.</p>';
  h+='<div style="margin-top:50px;display:flex;justify-content:space-between">';
  h+='<div>Исполнитель: ___________ / '+esc(db.profile.name)+'</div>';
  h+='<div>Заказчик: ___________ / '+esc(client.name)+'</div></div>';
  h+='</body></html>';
  openDocInNewTab(h,'Акт_выполненных_работ_'+client.company+'_'+today()+'.html');
}

function generateTZ(){
  var client=db.clients.length>0?db.clients[0]:{name:'Клиент',company:'Компания'};
  var h='<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Техническое задание</title>';
  h+='<style>body{font-family:serif;max-width:800px;margin:40px auto;padding:20px;line-height:1.6}';
  h+='h1,h2{color:#333}ul{margin:10px 0}';
  h+='@media print{body{margin:0}}</style></head><body>';
  h+='<h1>ТЕХНИЧЕСКОЕ ЗАДАНИЕ</h1>';
  h+='<p style="text-align:right">г. Москва, '+today()+'</p>';
  h+='<h2>1. ОБЩИЕ СВЕДЕНИЯ</h2>';
  h+='<p><b>Заказчик:</b> '+esc(client.company)+'</p>';
  h+='<p><b>Исполнитель:</b> '+esc(db.profile.name)+' ('+esc(db.profile.spec)+')</p>';
  h+='<p><b>Название проекта:</b> ___________</p>';
  h+='<h2>2. ЦЕЛИ И ЗАДАЧИ</h2>';
  h+='<p>2.1. Цель проекта: ___________</p>';
  h+='<p>2.2. Задачи проекта:</p><ul><li>___________</li><li>___________</li><li>___________</li></ul>';
  h+='<h2>3. ФУНКЦИОНАЛЬНЫЕ ТРЕБОВАНИЯ</h2>';
  h+='<p>3.1. Система должна обеспечивать:</p><ul><li>___________</li><li>___________</li></ul>';
  h+='<h2>4. ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ</h2>';
  h+='<p>4.1. Используемые технологии: ___________</p>';
  h+='<p>4.2. Требования к производительности: ___________</p>';
  h+='<h2>5. СРОКИ И ЭТАПЫ</h2>';
  h+='<p>5.1. Общий срок выполнения: ___________</p>';
  h+='<p>5.2. Этапы выполнения:</p><ul><li>Этап 1: ___________ (срок: ___)</li><li>Этап 2: ___________ (срок: ___)</li><li>Этап 3: ___________ (срок: ___)</li></ul>';
  h+='<h2>6. ПОРЯДОК СДАЧИ-ПРИЁМКИ</h2>';
  h+='<p>6.1. Сдача работ осуществляется по Акту выполненных работ.</p>';
  h+='<p>6.2. Заказчик имеет право вносить правки в течение 14 дней после сдачи этапа.</p>';
  h+='<div style="margin-top:50px;display:flex;justify-content:space-between">';
  h+='<div>Заказчик: ___________</div><div>Исполнитель: ___________</div></div>';
  h+='</body></html>';
  openDocInNewTab(h,'ТЗ_'+client.company+'_'+today()+'.html');
}

function generateInvoice(){
  var client=db.clients.length>0?db.clients[0]:{name:'Клиент',company:'Компания'};
  var h='<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Счёт на оплату</title>';
  h+='<style>body{font-family:serif;max-width:800px;margin:40px auto;padding:20px}';
  h+='h1{text-align:center;color:#333}table{width:100%;border-collapse:collapse;margin:20px 0}th,td{border:1px solid #000;padding:10px}';
  h+='.total{font-size:18px;font-weight:bold;text-align:right;margin-top:20px}';
  h+='@media print{body{margin:0}}</style></head><body>';
  h+='<h1>СЧЁТ НА ОПЛАТУ №'+Math.floor(Math.random()*1000)+'</h1>';
  h+='<p style="text-align:right">от '+today()+'</p>';
  h+='<table><tr><td style="width:50%"><b>Поставщик:</b><br>'+esc(db.profile.name)+'<br>'+esc(db.profile.spec)+'<br>Тел: '+esc(db.profile.phone||'')+'<br>Email: '+esc(db.profile.email||'')+'</td>';
  h+='<td><b>Покупатель:</b><br>'+esc(client.name)+'<br>'+esc(client.company)+'</td></tr></table>';
  h+='<table><tr><th>№</th><th>Наименование</th><th>Кол-во</th><th>Цена</th><th>Сумма</th></tr>';
  h+='<tr><td>1</td><td>Услуги по разработке ПО</td><td>1</td><td>___________ ₽</td><td>___________ ₽</td></tr>';
  h+='</table>';
  h+='<div class="total">Итого к оплате: ___________ ₽</div>';
  h+='<p style="margin-top:30px"><b>Реквизиты для оплаты:</b><br>Банк: ___________<br>БИК: ___________<br>Р/с: ___________</p>';
  h+='<p style="margin-top:50px">Счёт действителен до оплаты.</p>';
  h+='</body></html>';
  openDocInNewTab(h,'Счёт_'+client.company+'_'+today()+'.html');
}

function openDocInNewTab(html, fileName){
  // Убираем .html из имени для отображения, добавим только при скачивании
  var displayName = fileName.replace('.html', '');
  var w = window.open('', '_blank');
  
  // Панель инструментов для редактирования и скачивания
  var toolbar = `
    <div id="docToolbar" style="position:fixed;top:0;left:0;right:0;background:#171b22;color:#fff;padding:12px 20px;border-bottom:2px solid #6c8cff;z-index:9999;display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;font-family:system-ui,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.3);">
      <span style="font-weight:bold;font-size:14px;flex:1;text-align:left;">📄 ` + displayName + `</span>
      <button onclick="toggleEditMode(this)" style="background:#6c8cff;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;transition:0.2s;">✏️ Режим редактирования (ВКЛ)</button>
      <button onclick="window.print()" style="background:#3ecf8e;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;transition:0.2s;">🖨️ Сохранить в PDF</button>
      <button onclick="downloadCurrentDoc('` + displayName + `.html')" style="background:#9d6cff;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;transition:0.2s;">💾 Скачать HTML</button>
    </div>
    <div style="height:65px;"></div>
    <script>
      // Включаем режим редактирования всего документа по умолчанию
      window.onload = function() {
        document.designMode = 'on';
        document.body.style.cursor = 'text';
      };
      function toggleEditMode(btn) {
        if (document.designMode === 'on') {
          document.designMode = 'off';
          document.body.style.cursor = 'default';
          btn.textContent = '✏️ Включить редактирование';
          btn.style.background = '#1f2530';
        } else {
          document.designMode = 'on';
          document.body.style.cursor = 'text';
          btn.textContent = '✅ Режим редактирования (ВКЛ)';
          btn.style.background = '#6c8cff';
        }
      }
      function downloadCurrentDoc(name) {
        // Убираем панель инструментов из скачиваемого файла
        var clone = document.documentElement.cloneNode(true);
        var tb = clone.querySelector('#docToolbar');
        if (tb) tb.remove();
        var spacer = clone.querySelector('div[style*="height:65px"]');
        if (spacer) spacer.remove();
        
        // Явно добавляем .html если нет
        if (!name.endsWith('.html')) name += '.html';
        
        var blob = new Blob(['<!DOCTYPE html>' + clone.innerHTML], {type: 'text/html'});
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = name;
        a.click();
        alert('✅ Скачано: ' + name);
      }
    <\/script>
    <style>
      /* Скрываем панель инструментов при печати/сохранении в PDF */
      @media print {
        #docToolbar, button { display: none !important; }
        body { margin: 0 !important; padding: 20px 40px !important; }
        div[style*="height:65px"] { display: none !important; }
      }
      /* Подсветка редактируемых элементов */
      [contenteditable="true"]:focus, body[designmode="on"] *:hover {
        outline: 2px dashed #6c8cff;
        outline-offset: 2px;
        background: rgba(108, 140, 255, 0.05);
      }
    <\/style>
  `;
  
  // Вставляем панель сразу после <body>
  html = html.replace('<body>', '<body>' + toolbar);
  
  w.document.write(html);
  w.document.close();
  w.document.title = displayName; // Без .html, чтобы PDF назывался правильно
}


var selectedServices = [];
function renderPricing(){
  var h='<h2>💵 Прайс-лист услуг</h2>';
  h+='<button class="btn" style="background:#3ecf8e" onclick="showCompetencyMap()">📖 Справочник компетенций (90+)</button>';
  h+='<button class="btn ai" onclick="generatePriceList()">✨ Сгенерировать прайс</button>';
  h+='<button class="btn small" style="background:#1f2530;margin-top:8px" onclick="downloadPriceList()">📥 Скачать HTML</button>';
  
  if(Object.keys(db.services).length === 0){
    h+='<div class="card" style="margin-top:15px;text-align:center;color:#ff6b6b">';
    h+='⚠️ База услуг загружается или пуста.<br>';
    h+='<button class="btn small" style="margin-top:10px;background:#ff6b6b;color:#fff;border:none" onclick="loadExternalData()">🔄 Повторить загрузку</button>';
    h+='</div>';
  } else {
    h+='<div class="mut" style="margin:15px 0">Выберите услуги для прайса:</div>';
  }
  
  Object.keys(db.services).forEach(function(cat){
    h+='<div class="card"><h3>'+cat+'</h3>';
    Object.keys(db.services[cat]).forEach(function(subcat){
      h+='<div style="margin-top:10px"><b style="color:#6c8cff">'+subcat+'</b></div>';
      db.services[cat][subcat].forEach(function(s){
        var id=cat+'|'+subcat+'|'+s.name;
        var checked=selectedServices.includes(id)?'checked':'';
        h+='<label class="spec-check" style="margin:4px 0"><input type="checkbox" '+checked+' onchange="toggleService(\''+id+'\')" style="width:auto"><span>'+s.name+' — <b style="color:#3ecf8e">'+formatPrice(s.price_min)+'-'+formatPrice(s.price_max)+' ₽</b> /'+s.unit+'</span></label>';
      });
    });
    h+='</div>';
  });
  document.getElementById('app').innerHTML=h;
}

function toggleService(id){
  var idx=selectedServices.indexOf(id);
  if(idx>=0)selectedServices.splice(idx,1);else selectedServices.push(id);
  renderPricing();
}

function formatPrice(p){
  return p.toLocaleString();
}

function getSelectedServices(){
  var result=[];
  selectedServices.forEach(function(id){
    var parts=id.split('|');
    var cat=parts[0], subcat=parts[1], name=parts[2];
    if(db.services[cat]&&db.services[cat][subcat]){
      var svc=db.services[cat][subcat].find(function(s){return s.name===name});
      if(svc)result.push({
        category:cat,
        subcategory:subcat,
        name:name,
        price_min:svc.price_min,
        price_max:svc.price_max,
        unit:svc.unit,
        description:svc.description||'Профессиональная услуга с гарантией качества.',
        duration:svc.duration||'по запросу'
      });
    }
  });
  return result;
}

function generatePriceListHTML(){
  var services=getSelectedServices();
  if(services.length===0){
    alert('⚠️ Выберите хотя бы одну услугу!');
    return null;
  }
  
  var h='<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">';
  h+='<title>Прайс-лист — '+esc(db.profile.name)+'</title>';
  h+='<style>body{font-family:system-ui,sans-serif;background:#fff;color:#000;margin:0;padding:0}';
  h+='.container{max-width:900px;margin:0 auto;padding:40px 20px}';
  h+='.header{background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;padding:40px 30px;border-radius:16px;margin-bottom:30px;text-align:center}';
  h+='.header h1{margin:0 0 10px 0;font-size:36px}';
  h+='.header p{margin:5px 0;opacity:0.9;font-size:16px}';
  h+='.contact{background:#f5f5f5;padding:15px;border-radius:12px;margin-bottom:30px;text-align:center}';
  h+='.contact a{color:#6c8cff;text-decoration:none}';
  h+='.category{margin:30px 0}';
  h+='.category h2{color:#6c8cff;border-bottom:2px solid #6c8cff;padding-bottom:10px}';
  h+='.subcategory{margin:20px 0}';
  h+='.subcategory h3{color:#333;margin-bottom:10px}';
  h+='table{width:100%;border-collapse:collapse;margin:10px 0}';
  h+='th,td{border:1px solid #ddd;padding:12px;text-align:left}';
  h+='th{background:#6c8cff;color:#fff;font-weight:bold}';
  h+='tr:nth-child(even){background:#f9f9f9}';
  h+='.price{color:#3ecf8e;font-weight:bold;white-space:nowrap}';
  h+='.footer{text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid #ddd;color:#666;font-size:13px}';
  h+='@media print{body{margin:0}.header{-webkit-print-color-adjust:exact}}</style></head><body><div class="container">';
  
  h+='<div class="header"><h1>Прайс-лист услуг</h1><p>'+esc(db.profile.name)+' · '+esc(db.profile.spec)+'</p></div>';
  h+='<div class="contact">';
  if(db.profile.phone)h+='📞 '+esc(db.profile.phone)+' | ';
  if(db.profile.email)h+='✉️ <a href="mailto:'+esc(db.profile.email)+'">'+esc(db.profile.email)+'</a>';
  h+='</div>';
  
  var grouped={};
  services.forEach(function(s){
    if(!grouped[s.category])grouped[s.category]={};
    if(!grouped[s.category][s.subcategory])grouped[s.category][s.subcategory]=[];
    grouped[s.category][s.subcategory].push(s);
  });
  
  Object.keys(grouped).forEach(function(cat){
    h+='<div class="category"><h2>'+cat+'</h2>';
    Object.keys(grouped[cat]).forEach(function(subcat){
      h+='<div class="subcategory"><h3>'+subcat+'</h3>';
      h+='<table><tr><th style="width:45%">Услуга</th><th style="width:35%">Описание</th><th style="width:20%">Стоимость</th></tr>';
      grouped[cat][subcat].forEach(function(s){
        h+='<tr><td><b>'+s.name+'</b><div style="font-size:11px;color:#666;margin-top:3px">⏱ '+s.duration+'</div></td><td style="font-size:12px;color:#444;line-height:1.4">'+s.description+'</td><td class="price">'+formatPrice(s.price_min)+'-'+formatPrice(s.price_max)+' ₽<div style="font-size:10px;color:#666;font-weight:normal">/'+s.unit+'</div></td></tr>';
      });
      h+='</table></div>';
    });
    h+='</div>';
  });
  
  h+='<div class="footer">';
  h+='Прайс действителен до '+new Date(Date.now()+30*24*60*60*1000).toLocaleDateString('ru-RU')+'<br>';
  h+='Точная стоимость определяется после обсуждения проекта<br>';
  h+='Сгенерировано '+today()+' · SoloDev v6.9.3';
  h+='</div></div></body></html>';
  return h;
}

function generatePriceList(){
  var html=generatePriceListHTML();
  if(!html)return;
  var fileName='Прайс_'+db.profile.name.replace(/\s/g,'_')+'_'+today()+'.html';
  openDocInNewTab(html, fileName);
}

function downloadPriceList(){
  var html=generatePriceListHTML();
  if(!html)return;
  var blob=new Blob([html],{type:'text/html'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='Прайс_'+db.profile.name.replace(/\s/g,'_')+'_'+today()+'.html';
  a.click();
  alert('✅ Прайс скачан! Открой файл и нажми Ctrl+P для сохранения в PDF.');
}


function showCompetencyMap(){
  const catMap = {
    '💻 Веб-разработка': ['Фронтенд','Бэкенд','Fullstack','JavaScript','TypeScript','React','Vue','Angular','Node.js','PHP','Laravel','Java','C#','.NET','Go','Rust','Python','Django','Flask','FastAPI','Spring','WordPress','Bitrix','Ruby','C/C++'],
    '📱 Мобильная разработка': ['Мобильная разработка','iOS','Android','Flutter','React Native','Swift','Kotlin'],
    '🤖 Боты и Автоматизация': ['Боты (Telegram/VK)','Автотесты','QA'],
    '☁️ DevOps и Инфраструктура': ['DevOps','SRE','Администрирование','Docker','Kubernetes','AWS','Azure','GCP','Yandex Cloud','Linux','Windows Server','Networking','SQL','PostgreSQL','MySQL','MongoDB','Redis','Elasticsearch'],
    '🎨 Дизайн и Креатив': ['Дизайн','UI/UX','Графический дизайн','3D-моделирование','Анимация','Саунд-дизайн','Видеопродакшн'],
    '📊 Data Science и AI': ['Data Science','Machine Learning','Deep Learning','Computer Vision','NLP','Системный анализ','Бизнес-анализ'],
    '🏢 Enterprise и Новые технологии': ['1С','ERP/CRM','Blockchain','Web3','AR/VR','Embedded','IoT'],
    '🛡 Кибербезопасность': ['Кибербезопасность','Pentest'],
    '📈 Маркетинг': ['SEO','SMM','Контекстная реклама','Таргет','Email-маркетинг','Контент-маркетинг'],
    '👔 Менеджмент и GameDev': ['Scrum/Agile','Project Management','Product Management','Техническое писательство','Локализация','Техподдержка','GameDev','Unity','Unreal Engine']
  };

  var h = '<h3 style="margin-bottom:15px">📖 Полный справочник компетенций</h3>';
  h += '<input id="compSearch" placeholder="🔍 Поиск навыка..." oninput="filterCompetencies()" style="margin-bottom:5px;position:sticky;top:0;z-index:10;background:#1f2530;border:1px solid #6c8cff">';
  h += '<p class="mut" style="margin-bottom:15px;font-size:12px">Всего направлений: <b>'+ALL_SPECS.length+'</b>. Найдено: <span id="compCount">'+ALL_SPECS.length+'</span> · <b style="color:#3ecf8e">💡 Кликните на навык — увидите услуги и цены</b></p>';
  h += '<div id="compGrid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:15px;max-height:60vh;overflow-y:auto;padding-right:5px">';
  
  for(var catName in catMap){
    var skills = catMap[catName];
    h += '<div class="card comp-group" style="margin:0;padding:12px" data-group="'+catName+'">';
    h += '<h4 style="margin:0 0 10px 0;color:#6c8cff;font-size:15px;border-bottom:1px solid #242b36;padding-bottom:6px">'+catName+' <span class="mut" style="font-size:11px;font-weight:normal">('+skills.length+')</span></h4>';
    h += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
    skills.forEach(function(s){ 
      var hasServices = db.services && db.services[s] && db.services[s]['Услуги'] && db.services[s]['Услуги'].length > 0;
      var cursorStyle = hasServices ? 'cursor:pointer' : 'cursor:default';
      var tooltip = hasServices ? ' · '+db.services[s]['Услуги'].length+' услуг' : '';
      h += '<span class="comp-item" style="background:#242b36;color:#e8ecf3;padding:4px 10px;border-radius:12px;font-size:12px;border:1px solid #2d3542;transition:0.2s;'+cursorStyle+'" ';
      if(hasServices){
        h += 'onclick="showSkillServices(\''+s.replace(/'/g,"\'")+'\')" ';
      }
      h += 'onmouseover="this.style.borderColor=\'#6c8cff\';this.style.background=\'#2d3542\'" onmouseout="this.style.borderColor=\'#2d3542\';this.style.background=\'#242b36\'" title="'+s+tooltip+'">'+s+'</span>'; 
    });
    h += '</div></div>';
  }
  h += '</div>';
  h += '<div style="display:flex;gap:10px;margin-top:15px">';
  h += '<button class="btn" style="background:#3ecf8e;flex:1" onclick="exportCompetencyMapPDF()">🖨️ Сохранить справочник в PDF</button>';
  h += '<button class="btn" style="background:#1f2530;flex:1" onclick="closeModal()">Закрыть</button>';
  h += '</div>';
  openModal(h);
}

function filterCompetencies(){
  var q = document.getElementById('compSearch').value.toLowerCase().trim();
  var groups = document.querySelectorAll('.comp-group');
  var totalVisible = 0;
  
  groups.forEach(function(group){
    var items = group.querySelectorAll('.comp-item');
    var groupVisible = 0;
    var groupName = group.getAttribute('data-group').toLowerCase();
    
    items.forEach(function(item){
      var text = item.textContent.toLowerCase();
      if(text.includes(q) || groupName.includes(q)){
        item.style.display = '';
        groupVisible++;
        totalVisible++;
      } else {
        item.style.display = 'none';
      }
    });
    
    if(q.length > 0 && groupVisible === 0 && !groupName.includes(q)){
      group.style.display = 'none';
    } else {
      group.style.display = '';
    }
  });
  
  document.getElementById('compCount').textContent = totalVisible;
}

function showSkillServices(skillName){
  var services = db.services && db.services[skillName] && db.services[skillName]['Услуги'];
  if(!services || services.length === 0){
    alert('⚠️ Услуги для "'+skillName+'" ещё не загружены.');
    return;
  }
  
  var h = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:15px">';
  h += '<button class="btn small" style="background:#1f2530;margin:0" onclick="showCompetencyMap()">← Назад</button>';
  h += '<h3 style="margin:0;flex:1">🎯 Услуги: <span style="color:#6c8cff">'+esc(skillName)+'</span></h3>';
  h += '</div>';
  
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a;margin-bottom:15px">';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center">';
  h += '<div><div class="mut" style="font-size:11px">Всего услуг</div><div style="font-size:20px;font-weight:bold;color:#3ecf8e">'+services.length+'</div></div>';
  var minPrice = Math.min.apply(null, services.map(function(s){return s.price_min}));
  var maxPrice = Math.max.apply(null, services.map(function(s){return s.price_max}));
  h += '<div><div class="mut" style="font-size:11px">Диапазон цен</div><div style="font-size:16px;font-weight:bold;color:#6c8cff">'+formatPrice(minPrice)+' - '+formatPrice(maxPrice)+' ₽</div></div>';
  var units = {};
  services.forEach(function(s){units[s.unit] = (units[s.unit]||0)+1});
  h += '<div><div class="mut" style="font-size:11px">Форматы</div><div style="font-size:13px;color:#9d6cff">'+Object.keys(units).join(', ')+'</div></div>';
  h += '</div></div>';
  
  h += '<input id="skillSearch" placeholder="🔍 Поиск услуги..." oninput="filterSkillServices()" style="margin-bottom:10px;position:sticky;top:0;z-index:10;background:#1f2530;border:1px solid #6c8cff">';
  h += '<div id="skillServicesList" style="max-height:50vh;overflow-y:auto;padding-right:5px">';
  
  services.forEach(function(s, idx){
    h += '<div class="card skill-service-item" style="margin:8px 0;padding:12px" data-name="'+s.name.toLowerCase()+'">';
    h += '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap">';
    h += '<div style="flex:1;min-width:200px">';
    h += '<div style="font-weight:bold;color:#e8ecf3;margin-bottom:4px">'+esc(s.name)+'</div>';
    h += '<div class="mut" style="font-size:12px;margin-bottom:4px;line-height:1.4">'+esc(s.description || 'Профессиональная услуга с гарантией качества.')+'</div>';
    h += '<div class="mut" style="font-size:11px">⏱ '+esc(s.duration)+' · за '+s.unit+'</div>';
    h += '</div>';
    h += '<div style="text-align:right">';
    h += '<div style="color:#3ecf8e;font-weight:bold;font-size:16px">'+formatPrice(s.price_min)+' - '+formatPrice(s.price_max)+' ₽</div>';
    h += '</div>';
    h += '</div>';
    h += '</div>';
  });
  
  h += '</div>';
  h += '<button class="btn" style="background:#1f2530;margin-top:15px;width:100%" onclick="showCompetencyMap()">← Вернуться к списку навыков</button>';
  document.getElementById('modalContent').innerHTML = h;
}

function filterSkillServices(){
  var q = document.getElementById('skillSearch').value.toLowerCase().trim();
  var items = document.querySelectorAll('.skill-service-item');
  items.forEach(function(item){
    var name = item.getAttribute('data-name');
    item.style.display = name.includes(q) ? '' : 'none';
  });
}


function filterCompetencies(){
  var q = document.getElementById('compSearch').value.toLowerCase().trim();
  var groups = document.querySelectorAll('.comp-group');
  var totalVisible = 0;
  
  groups.forEach(function(group){
    var items = group.querySelectorAll('.comp-item');
    var groupVisible = 0;
    var groupName = group.getAttribute('data-group').toLowerCase();
    
    items.forEach(function(item){
      var text = item.textContent.toLowerCase();
      if(text.includes(q) || groupName.includes(q)){
        item.style.display = '';
        groupVisible++;
        totalVisible++;
      } else {
        item.style.display = 'none';
      }
    });
    
    // Скрываем всю карточку категории, если в ней нет совпадений
    if(q.length > 0 && groupVisible === 0 && !groupName.includes(q)){
      group.style.display = 'none';
    } else {
      group.style.display = '';
    }
  });
  
  document.getElementById('compCount').textContent = totalVisible;
}


function filterCompetencies(){
  var q = document.getElementById('compSearch').value.toLowerCase();
  var groups = document.querySelectorAll('.comp-group');
  groups.forEach(function(group){
    var items = group.querySelectorAll('.comp-item');
    var hasMatch = false;
    var groupName = group.getAttribute('data-group').toLowerCase();
    
    items.forEach(function(item){
      var text = item.textContent.toLowerCase();
      if(text.includes(q) || groupName.includes(q)){
        item.style.display = '';
        hasMatch = true;
      } else {
        item.style.display = 'none';
      }
    });
    
    if(q.length > 0 && !hasMatch && !groupName.includes(q)){
      group.style.display = 'none';
    } else {
      group.style.display = '';
    }
  });
}



function exportCompetencyMapPDF(){
  var w = window.open('', '_blank');
  var h = '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Справочник компетенций и услуг</title>';
  h += '<style>body{font-family:system-ui,sans-serif;color:#000;margin:0;padding:20px}';
  h += 'h1{text-align:center;color:#2563eb;margin-bottom:5px}';
  h += '.header-info{text-align:center;color:#666;margin-bottom:30px;font-size:14px}';
  h += '.category{margin-bottom:25px;page-break-inside:avoid}';
  h += '.category h2{color:#2563eb;border-bottom:2px solid #2563eb;padding-bottom:5px;font-size:18px;margin-bottom:10px}';
  h += '.skill{margin-bottom:15px;page-break-inside:avoid}';
  h += '.skill-name{font-weight:bold;font-size:15px;color:#111;margin-bottom:5px}';
  h += 'table{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:10px}';
  h += 'th,td{border:1px solid #ddd;padding:6px;text-align:left}';
  h += 'th{background:#f3f4f6;font-weight:bold}';
  h += '.price{color:#059669;font-weight:bold;white-space:nowrap}';
  h += '@media print{body{padding:10px} .no-print{display:none}}';
  h += '</style></head><body>';
  
  h += '<h1>📖 Справочник компетенций и услуг</h1>';
  h += '<div class="header-info">'+esc(db.profile.name)+' · '+esc(db.profile.spec)+' · Сгенерировано: '+today()+'</div>';
  h += '<button class="no-print" onclick="window.print()" style="display:block;margin:0 auto 20px auto;padding:10px 20px;background:#2563eb;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:16px">🖨️ Сохранить в PDF / Печать</button>';

  const catMap = {
    '💻 Веб-разработка': ['Фронтенд','Бэкенд','Fullstack','JavaScript','TypeScript','React','Vue','Angular','Node.js','PHP','Laravel','Java','C#','.NET','Go','Rust','Python','Django','Flask','FastAPI','Spring','WordPress','Bitrix','Ruby','C/C++'],
    '📱 Мобильная разработка': ['Мобильная разработка','iOS','Android','Flutter','React Native','Swift','Kotlin'],
    '🤖 Боты и Автоматизация': ['Боты (Telegram/VK)','Автотесты','QA'],
    '☁️ DevOps и Инфраструктура': ['DevOps','SRE','Администрирование','Docker','Kubernetes','AWS','Azure','GCP','Yandex Cloud','Linux','Windows Server','Networking','SQL','PostgreSQL','MySQL','MongoDB','Redis','Elasticsearch'],
    '🎨 Дизайн и Креатив': ['Дизайн','UI/UX','Графический дизайн','3D-моделирование','Анимация','Саунд-дизайн','Видеопродакшн'],
    '📊 Data Science и AI': ['Data Science','Machine Learning','Deep Learning','Computer Vision','NLP','Системный анализ','Бизнес-анализ'],
    '🏢 Enterprise и Новые технологии': ['1С','ERP/CRM','Blockchain','Web3','AR/VR','Embedded','IoT'],
    '🛡 Кибербезопасность': ['Кибербезопасность','Pentest'],
    '📈 Маркетинг': ['SEO','SMM','Контекстная реклама','Таргет','Email-маркетинг','Контент-маркетинг'],
    '👔 Менеджмент и GameDev': ['Scrum/Agile','Project Management','Product Management','Техническое писательство','Локализация','Техподдержка','GameDev','Unity','Unreal Engine']
  };

  for(var catName in catMap){
    var skills = catMap[catName];
    h += '<div class="category"><h2>'+catName+'</h2>';
    skills.forEach(function(skill){
      if(db.services && db.services[skill] && db.services[skill]['Услуги']){
        var services = db.services[skill]['Услуги'];
        h += '<div class="skill"><div class="skill-name">🎯 ' + esc(skill) + ' <span style="font-weight:normal;color:#666;font-size:12px">('+services.length+' услуг)</span></div>';
        h += '<table><tr><th style="width:55%">Услуга</th><th style="width:15%">Сроки</th><th style="width:30%">Стоимость</th></tr>';
        services.forEach(function(s){
          h += '<tr><td><b>'+esc(s.name)+'</b><div style="font-size:11px;color:#666;margin-top:2px">'+esc(s.description || '')+'</div></td><td>'+esc(s.duration)+'</td><td class="price">'+formatPrice(s.price_min)+' - '+formatPrice(s.price_max)+' ₽<div style="font-size:10px;color:#666;font-weight:normal">/ '+esc(s.unit)+'</div></td></tr>';
        });
        h += '</table></div>';
      }
    });
    h += '</div>';
  }
  
  h += '<div style="text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #ddd;color:#666;font-size:12px">';
  h += 'Точная стоимость и сроки определяются после обсуждения деталей проекта.<br>Документ сгенерирован в SoloDev v6.9.3';
  h += '</div></body></html>';
  
  w.document.write(h);
  w.document.close();
}


// === ФИНАНСОВЫЕ ЦЕЛИ ===
function showGoals(){
  var h='<h3>🎯 Финансовые цели</h3>';
  if(db.goals.length===0){
    h+='<div class="mut" style="text-align:center;padding:20px">Пока нет целей. Добавьте первую!</div>';
  } else {
    db.goals.forEach(function(g,i){
      var current = getPeriodIncome(g.period);
      var pct = Math.min(100, Math.round(current/g.target*100));
      var color = pct>=100?'#3ecf8e':pct>=50?'#6c8cff':'#f59e0b';
      h+='<div class="card" style="margin:8px 0">';
      h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
      h+='<b>'+esc(g.name)+'</b>';
      h+='<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:4px 8px" onclick="deleteGoal('+i+')">🗑</button>';
      h+='</div>';
      h+='<div class="mut" style="font-size:12px;margin-bottom:6px">'+{week:'Неделя',month:'Месяц',quarter:'Квартал',year:'Год'}[g.period]+' · Дедлайн: '+g.deadline+'</div>';
      h+='<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px"><span>Прогресс</span><b style="color:'+color+'">'+formatCurrency(current)+' / '+formatCurrency(g.target)+' ('+pct+'%)</b></div>';
      h+='<div class="bar"><i style="width:'+pct+'%;background:'+color+'"></i></div>';
      if(pct>=100)h+='<div style="color:#3ecf8e;font-weight:bold;margin-top:6px">🎉 Цель достигнута!</div>';
      h+='</div>';
    });
  }
  h+='<button class="btn" style="width:100%;margin-top:10px" onclick="addGoal()">+ Новая цель</button>';
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:8px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function getPeriodIncome(period){
  var now=new Date();
  var start;
  if(period==='week'){start=new Date(now);start.setDate(now.getDate()-7);}
  else if(period==='month'){start=new Date(now.getFullYear(),now.getMonth(),1);}
  else if(period==='quarter'){var qm=Math.floor(now.getMonth()/3)*3;start=new Date(now.getFullYear(),qm,1);}
  else{start=new Date(now.getFullYear(),0,1);}
  var str=start.toISOString().slice(0,10);
  var sum=0;
  db.finances.forEach(function(f){if(f.type==='in'&&f.date>=str)sum+=f.amt;});
  return sum;
}

function addGoal(){
  var h='<h3>➕ Новая финансовая цель</h3>';
  h+='<label>Название цели</label><input id="g_name" placeholder="Например: 500К за квартал">';
  h+='<label>Целевая сумма (в основной валюте)</label><input id="g_target" type="number" placeholder="500000">';
  h+='<label>Период</label><select id="g_period"><option value="week">Неделя</option><option value="month" selected>Месяц</option><option value="quarter">Квартал</option><option value="year">Год</option></select>';
  h+='<label>Дедлайн</label><input id="g_deadline" type="date" value="'+today()+'">';
  h+='<div style="display:flex;gap:10px;margin-top:15px">';
  h+='<button class="btn" onclick="saveGoal()">💾 Сохранить</button>';
  h+='<button class="btn" style="background:#1f2530" onclick="showGoals()">← Назад</button>';
  h+='</div>';
  h+='<button class="btn small" style="background:#f59e0b;margin-top:8px;width:100%" onclick="showGoalHint()">💡 Помощь в постановке цели</button>';
  openModal(h);
}

function saveGoal(){
  var name=document.getElementById('g_name').value.trim();
  var target=+document.getElementById('g_target').value;
  if(!name||!target){alert('⚠️ Заполните название и сумму!');return;}
  db.goals.push({
    name:name,
    target:target,
    period:document.getElementById('g_period').value,
    deadline:document.getElementById('g_deadline').value
  });
  save();showGoals();
}

function deleteGoal(i){
  if(confirm('Удалить цель?')){db.goals.splice(i,1);save();showGoals();}
}

// === РЕГУЛЯРНЫЕ ПЛАТЕЖИ ===
function showRecurring(){
  var h='<h3>🔄 Регулярные платежи</h3>';
  h+='<p class="mut">Автоматически повторяющиеся операции (подписки, аренда, хостинг)</p>';
  if(db.recurring.length===0){
    h+='<div class="mut" style="text-align:center;padding:20px">Нет регулярных платежей</div>';
  } else {
    db.recurring.forEach(function(r,i){
      h+='<div class="card" style="margin:8px 0">';
      h+='<div style="display:flex;justify-content:space-between;align-items:center">';
      h+='<div><b>'+esc(r.name)+'</b><div class="mut" style="font-size:12px">'+formatCurrency(r.amt)+' · '+{monthly:'Ежемесячно',weekly:'Еженедельно',yearly:'Ежегодно'}[r.freq]+' · '+esc(r.cat)+'</div></div>';
      h+='<div style="display:flex;gap:6px">';
      h+='<button class="btn small" style="background:#3ecf8e" onclick="executeRecurring('+i+')">▶</button>';
      h+='<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:4px 8px" onclick="deleteRecurring('+i+')">🗑</button>';
      h+='</div></div></div>';
    });
  }
  h+='<button class="btn" style="width:100%;margin-top:10px" onclick="addRecurring()">+ Новый платёж</button>';
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:8px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function addRecurring(){
  var h='<h3>➕ Новый регулярный платёж</h3>';
  h+='<label>Название</label><input id="r_name" placeholder="Например: Хостинг, Figma, Аренда">';
  h+='<label>Сумма</label><input id="r_amt" type="number" placeholder="1000">';
  h+='<label>Тип</label><select id="r_type"><option value="out">Расход</option><option value="in">Доход</option></select>';
  h+='<label>Частота</label><select id="r_freq"><option value="monthly">Ежемесячно</option><option value="weekly">Еженедельно</option><option value="yearly">Ежегодно</option></select>';
  h+='<label>Категория</label><input id="r_cat" value="Подписки">';
  h+='<div style="display:flex;gap:10px;margin-top:15px">';
  h+='<button class="btn" onclick="saveRecurring()">💾 Сохранить</button>';
  h+='<button class="btn" style="background:#1f2530" onclick="showRecurring()">← Назад</button>';
  h+='</div>';
  openModal(h);
}

function saveRecurring(){
  var name=document.getElementById('r_name').value.trim();
  var amt=+document.getElementById('r_amt').value;
  if(!name||!amt){alert('⚠️ Заполните поля!');return;}
  db.recurring.push({
    name:name,amt:amt,
    type:document.getElementById('r_type').value,
    freq:document.getElementById('r_freq').value,
    cat:document.getElementById('r_cat').value
  });
  save();showRecurring();
}

function executeRecurring(i){
  var r=db.recurring[i];
  db.finances.unshift({id:uid(),date:today(),type:r.type,amt:r.amt,cat:r.cat,note:'[авто] '+r.name});
  save();
  alert('✅ Операция "'+r.name+'" добавлена в историю');
  showRecurring();
}

function deleteRecurring(i){
  if(confirm('Удалить регулярный платёж?')){db.recurring.splice(i,1);save();showRecurring();}
}

// === ДЕБИТОРКА (КТО ДОЛЖЕН) ===
function showReceivables(){
  var h='<h3>💰 Дебиторка (кто должен)</h3>';
  h+='<p class="mut">Неоплаченные счета и ожидаемые платежи</p>';
  var total=0;
  db.receivables.forEach(function(r){total+=r.amt;});
  if(db.receivables.length>0){
    h+='<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a;text-align:center;margin-bottom:10px">';
    h+='<div class="mut" style="color:#fff">Ожидаемый доход</div>';
    h+='<div style="font-size:24px;font-weight:bold;color:#3ecf8e;margin-top:5px">'+formatCurrency(total)+'</div></div>';
  }
  if(db.receivables.length===0){
    h+='<div class="mut" style="text-align:center;padding:20px">Нет ожидаемых платежей</div>';
  } else {
    db.receivables.forEach(function(r,i){
      var overdue = r.due && r.due < today();
      h+='<div class="card" style="margin:8px 0;'+(overdue?'border-color:#ff6b6b':'')+'">';
      h+='<div style="display:flex;justify-content:space-between;align-items:center">';
      h+='<div><b>'+esc(r.client)+'</b><div class="mut" style="font-size:12px">'+esc(r.desc)+(overdue?' · <span style="color:#ff6b6b">⚠️ Просрочено</span>':'')+'</div><div class="mut" style="font-size:11px">Ожидается: '+r.due+'</div></div>';
      h+='<div style="text-align:right"><div style="font-size:18px;font-weight:bold;color:#3ecf8e">'+formatCurrency(r.amt)+'</div>';
      h+='<div style="display:flex;gap:4px;margin-top:4px">';
      h+='<button class="btn small" style="background:#3ecf8e;padding:4px 8px;font-size:11px" onclick="markReceived('+i+')">✓ Получено</button>';
      h+='<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:4px 8px" onclick="deleteReceivable('+i+')">🗑</button>';
      h+='</div></div></div></div>';
    });
  }
  h+='<button class="btn" style="width:100%;margin-top:10px" onclick="addReceivable()">+ Ожидаемый платёж</button>';
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:8px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function addReceivable(){
  var clients=db.clients.map(function(c){return c.name}).filter(function(n){return n});
  var h='<h3>➕ Ожидаемый платёж</h3>';
  h+='<label>Клиент</label><select id="rv_client">';
  clients.forEach(function(c){h+='<option>'+esc(c)+'</option>';});
  h+='</select>';
  h+='<label>Сумма</label><input id="rv_amt" type="number" placeholder="50000">';
  h+='<label>Описание</label><input id="rv_desc" placeholder="Например: 2-й этап разработки">';
  h+='<label>Ожидается до</label><input id="rv_due" type="date" value="'+today()+'">';
  h+='<div style="display:flex;gap:10px;margin-top:15px">';
  h+='<button class="btn" onclick="saveReceivable()">💾 Сохранить</button>';
  h+='<button class="btn" style="background:#1f2530" onclick="showReceivables()">← Назад</button>';
  h+='</div>';
  h+='<button class="btn small" style="background:#f59e0b;margin-top:8px;width:100%" onclick="showReceivableHint()">💡 Помощь в заполнении</button>';
  openModal(h);
}

function saveReceivable(){
  var amt=+document.getElementById('rv_amt').value;
  if(!amt){alert('⚠️ Введите сумму!');return;}
  db.receivables.push({
    client:document.getElementById('rv_client').value,
    amt:amt,
    desc:document.getElementById('rv_desc').value,
    due:document.getElementById('rv_due').value
  });
  save();showReceivables();
}

function markReceived(i){
  var r=db.receivables[i];
  db.finances.unshift({id:uid(),date:today(),type:'in',amt:r.amt,cat:'Проект',client:r.client,note:'Оплата: '+r.desc});
  db.receivables.splice(i,1);
  save();
  alert('✅ Платёж получен и добавлен в историю');
  showReceivables();
}

function deleteReceivable(i){
  if(confirm('Удалить?')){db.receivables.splice(i,1);save();showReceivables();}
}

// === СРАВНЕНИЕ ПЕРИОДОВ ===
function renderComparison(period){
  var now=new Date();
  var curStart, prevStart, prevEnd, label;
  if(period==='month'){
    curStart=new Date(now.getFullYear(),now.getMonth(),1);
    prevStart=new Date(now.getFullYear(),now.getMonth()-1,1);
    prevEnd=new Date(now.getFullYear(),now.getMonth(),0);
    label='vs прошлый месяц';
  } else if(period==='quarter'){
    var qm=Math.floor(now.getMonth()/3)*3;
    curStart=new Date(now.getFullYear(),qm,1);
    prevStart=new Date(now.getFullYear(),qm-3,1);
    prevEnd=new Date(now.getFullYear(),qm,0);
    label='vs прошлый квартал';
  } else {
    curStart=new Date(now.getFullYear(),0,1);
    prevStart=new Date(now.getFullYear()-1,0,1);
    prevEnd=new Date(now.getFullYear(),0,0);
    label='vs прошлый год';
  }
  var curStr=curStart.toISOString().slice(0,10);
  var prevStr=prevStart.toISOString().slice(0,10);
  var prevEndStr=prevEnd.toISOString().slice(0,10);
  
  var curInc=0,prevInc=0;
  db.finances.forEach(function(f){
    if(f.type!=='in')return;
    if(f.date>=curStr)curInc+=f.amt;
    if(f.date>=prevStr&&f.date<=prevEndStr)prevInc+=f.amt;
  });
  
  var diff=curInc-prevInc;
  var pct=prevInc>0?Math.round(diff/prevInc*100):0;
  var color=diff>=0?'#3ecf8e':'#ff6b6b';
  var arrow=diff>=0?'↑':'↓';
  
  var h='<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
  h+='<h3 style="color:#fff;margin:0 0 10px 0">📊 Сравнение: '+label+'</h3>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center">';
  h+='<div><div class="mut" style="color:#fff">Текущий</div><div style="font-size:16px;font-weight:bold;color:#3ecf8e">'+formatCurrency(curInc)+'</div></div>';
  h+='<div><div class="mut" style="color:#fff">Предыдущий</div><div style="font-size:16px;font-weight:bold;color:#6c8cff">'+formatCurrency(prevInc)+'</div></div>';
  h+='<div><div class="mut" style="color:#fff">Изменение</div><div style="font-size:16px;font-weight:bold;color:'+color+'">'+arrow+' '+Math.abs(pct)+'%</div></div>';
  h+='</div></div>';
  return h;
}

// === КЭШФЛОУ ГРАФИК ===
function renderCashflowChart(){
  var months=[];
  var now=new Date();
  for(var i=5;i>=0;i--){
    var d=new Date(now.getFullYear(),now.getMonth()-i,1);
    var key=d.toISOString().slice(0,7);
    var label=['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'][d.getMonth()];
    months.push({key:key,label:label,income:0,expense:0});
  }
  db.finances.forEach(function(f){
    var k=f.date?f.date.slice(0,7):'';
    var m=months.find(function(x){return x.key===k});
    if(m){if(f.type==='in')m.income+=f.amt;else m.expense+=f.amt;}
  });
  var maxVal=Math.max.apply(null,months.map(function(m){return Math.max(m.income,m.expense)}))||1;
  
  var h='<div class="card"><h3>💸 Кэшфлоу (доходы vs расходы)</h3>';
  h+='<div style="display:flex;gap:15px;margin-bottom:10px;font-size:12px">';
  h+='<div><span style="display:inline-block;width:12px;height:12px;background:#3ecf8e;border-radius:2px"></span> Доходы</div>';
  h+='<div><span style="display:inline-block;width:12px;height:12px;background:#ff6b6b;border-radius:2px"></span> Расходы</div></div>';
  h+='<div class="chart" style="height:140px">';
  months.forEach(function(m){
    var hIn=(m.income/maxVal)*100;
    var hOut=(m.expense/maxVal)*100;
    h+='<div style="flex:1;display:flex;gap:2px;align-items:flex-end;height:100%;position:relative">';
    h+='<div style="flex:1;background:#3ecf8e;border-radius:3px 3px 0 0;height:'+Math.max(hIn,2)+'%"></div>';
    h+='<div style="flex:1;background:#ff6b6b;border-radius:3px 3px 0 0;height:'+Math.max(hOut,2)+'%"></div>';
    h+='<span style="position:absolute;bottom:-18px;left:50%;transform:translateX(-50%);font-size:10px;color:#8b94a7">'+m.label+'</span>';
    h+='</div>';
  });
  h+='</div></div>';
  return h;
}

// === ЭКСПОРТ В CSV ===
function exportFinancesCSV(){
  var rows=[['Дата','Тип','Категория','Клиент','Сумма','Валюта','Комментарий']];
  db.finances.forEach(function(f){
    rows.push([
      f.date,
      f.type==='in'?'Доход':'Расход',
      f.cat||'',
      f.client||'',
      f.original_amt||f.amt,
      f.original_cur||db.currency,
      (f.note||'').replace(/,/g,';')
    ]);
  });
  var csv=rows.map(function(r){return r.map(function(c){return '"'+String(c).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
  var blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='finances_'+today()+'.csv';
  a.click();
  alert('✅ CSV-файл скачан. Откроется в Excel/Google Sheets.');
}


// === УМНЫЙ ПОМОЩНИК (УНИВЕРСАЛЬНЫЙ) ===

// === УМНЫЙ ПОМОЩНИК ОЦЕНКИ v2 ===
var TASK_CATALOG = {
    landing: {name: '🌐 Лендинг (1 страница)', base: 12},
    multisite: {name: ' Многостраничный сайт (5-10 стр)', base: 60},
    shop: {name: '🛒 Интернет-магазин', base: 120},
    webapp: {name: '💻 Веб-приложение / сервис', base: 160},
    mobile: {name: '📱 Мобильное приложение', base: 240},
    integration: {name: '🔌 Интеграция API / платёжки', base: 16},
    layout: {name: '🎨 Вёрстка макета', base: 24},
    parser: {name: '🕷 Скрипт / парсер / бот', base: 16},
    server: {name: '⚙️ Настройка сервера / деплой', base: 8},
    bugfix: {name: '🐛 Багфикс / мелкие правки', base: 4},
    other: {name: '📦 Другое', base: 8}
};

function showSmartAssistant(){
    var h = '<h3>🤖 Умный помощник оценки</h3>';
    h += '<p class="mut" style="font-size:12px;margin-bottom:10px">Я сам рассчитаю время и стоимость. Ответь на 4 вопроса.</p>';
    
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold">1. Что делаем?</label>';
    h += '<select id="sa_task_type" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff">';
    Object.keys(TASK_CATALOG).forEach(function(key){
        var t = TASK_CATALOG[key];
        h += '<option value="'+key+'">'+t.name+' (~'+t.base+' ч базово)</option>';
    });
    h += '</select>';
    
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold;margin-top:10px;display:block">2. Насколько сложно?</label>';
    h += '<select id="sa_difficulty" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff">';
    h += '<option value="1"> Стандартная задача, всё понятно</option>';
    h += '<option value="1.4" selected>🟡 Есть нюансы, нужно подумать</option>';
    h += '<option value="1.8">🔴 Сложная архитектура / много логики</option>';
    h += '</select>';
    
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold;margin-top:10px;display:block">3. Насколько знакома технология?</label>';
    h += '<select id="sa_familiarity" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff">';
    h += '<option value="1">✅ Делал много раз, знаю наизусть</option>';
    h += '<option value="1.25" selected>🤔 Делал похожее, но есть новые моменты</option>';
    h += '<option value="1.5">🆕 Технология новая для меня</option>';
    h += '</select>';
    
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold;margin-top:10px;display:block">4. Какое ТЗ?</label>';
    h += '<select id="sa_spec" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff">';
    h += '<option value="1">📋 Чёткое ТЗ, всё утверждено</option>';
    h += '<option value="1.2" selected> Примерное понимание, детали уточним</option>';
    h += '<option value="1.5">❓ "Сделайте красиво", ТЗ нет</option>';
    h += '</select>';
    
    h += '<button class="btn" style="width:100%;margin-top:15px;background:#ffd700;color:#000;font-weight:bold" onclick="calculateSmartEstimate()">🧮 Рассчитать оценку</button>';
    
    h += '<div id="sa_result" style="display:none;margin-top:15px"></div>';
    openModal(h);
}

function calculateSmartEstimate(){
    var typeKey = document.getElementById('sa_task_type').value;
    var difficulty = parseFloat(document.getElementById('sa_difficulty').value);
    var familiarity = parseFloat(document.getElementById('sa_familiarity').value);
    var spec = parseFloat(document.getElementById('sa_spec').value);
    
    var baseHours = TASK_CATALOG[typeKey].base;
    var taskName = TASK_CATALOG[typeKey].name;
    
    // Формула: базовое время × все множители
    var estimatedHours = Math.round(baseHours * difficulty * familiarity * spec * 10) / 10;
    
    // Риск-буфер: зависит от размытости ТЗ и новизны
    var bufferPercent = 0;
    if(spec >= 1.5) bufferPercent += 15;
    else if(spec >= 1.2) bufferPercent += 10;
    if(familiarity >= 1.5) bufferPercent += 10;
    else if(familiarity >= 1.25) bufferPercent += 5;
    if(bufferPercent > 30) bufferPercent = 30;
    
    var rate = db.hourlyRate || 2000;
    var baseCost = Math.round(estimatedHours * rate);
    var totalCost = Math.round(baseCost * (1 + bufferPercent / 100));
    var bufferAmount = totalCost - baseCost;
    
    // Генерируем понятное объяснение буфера
    var bufferExplanation = '';
    if(bufferPercent === 0){
        bufferExplanation = 'Риск-буфер не нужен: ТЗ чёткое, технология знакомая. Работаем по факту.';
    } else {
        bufferExplanation = ' Риск-буфер ' + bufferPercent + '% — это как запас топлива в самолёте. ';
        bufferExplanation += 'Пилот никогда не берёт ровно столько, сколько нужно до аэропорта — ';
        bufferExplanation += 'всегда есть резерв на ветер, обход грозы или уход на запасной аэродром.\n\n';
        bufferExplanation += 'В разработке так же: ';
        if(spec >= 1.2) bufferExplanation += '• ТЗ может уточняться в процессе (это нормально)\n';
        if(familiarity >= 1.25) bufferExplanation += '• Могут всплыть технические нюансы, которые не видны на старте\n';
        bufferExplanation += '• Этот резерв гарантирует, что проект будет сдан в срок без "давайте доплатим" в середине работы.';
    }
    
    // Клиенту — короткая вежливая версия
    var clientText = '';
    if(bufferPercent > 0){
        clientText = 'В оценку заложен резерв ' + bufferPercent + '% на случай уточнений по ТЗ и технических нюансов. ';
        clientText += 'Это стандартная практика, которая защищает от срыва сроков и гарантирует, что вы получите результат без внезапных доплат в процессе работы. ';
        clientText += 'Если всё пройдёт гладко — резерв не будет использован, и итоговая сумма может быть даже ниже.';
    } else {
        clientText = 'Проект максимально прозрачен, риски минимальны, поэтому работаем по фиксированной оценке без резерва.';
    }
    
    var resultHtml = '<div style="padding:15px;background:#102015;border:1px solid #3ecf8e;border-radius:6px">';
    resultHtml += '<div style="font-weight:bold;color:#3ecf8e;margin-bottom:10px">✅ Расчёт готов:</div>';
    resultHtml += '<div style="font-size:13px;color:#fff;margin-bottom:5px">📋 Задача: <b>' + taskName + '</b></div>';
    resultHtml += '<div style="font-size:13px;color:#fff;margin-bottom:5px"> Базовое время: <b>' + baseHours + ' ч</b></div>';
    resultHtml += '<div style="font-size:13px;color:#fff;margin-bottom:5px"> Множители: сложность ×' + difficulty + ', опыт ×' + familiarity + ', ТЗ ×' + spec + '</div>';
    resultHtml += '<div style="font-size:15px;color:#fff;margin-bottom:10px;padding:8px;background:#1f2530;border-radius:4px">📊 Итого: <b style="color:#3ecf8e">' + estimatedHours + ' часов</b></div>';
    resultHtml += '<div style="font-size:13px;color:#fff;margin-bottom:5px">💰 Стоимость: <b>' + baseCost.toLocaleString() + ' ₽</b></div>';
    resultHtml += '<div style="font-size:13px;color:#fff;margin-bottom:5px"> Буфер ' + bufferPercent + '%: <b>+' + bufferAmount.toLocaleString() + ' ₽</b></div>';
    resultHtml += '<div style="font-size:16px;color:#3ecf8e;font-weight:bold;margin-bottom:10px">✅ ИТОГО: ' + totalCost.toLocaleString() + ' ₽</div>';
    resultHtml += '<div style="font-size:11px;color:#ffd700;margin-bottom:5px;font-weight:bold"> Что такое риск-буфер:</div>';
    resultHtml += '<div style="font-size:11px;color:#fff;margin-bottom:10px;white-space:pre-wrap">' + bufferExplanation + '</div>';
    resultHtml += '<div style="font-size:11px;color:#6c8cff;margin-bottom:5px;font-weight:bold">💬 Ответ клиенту (если спросит):</div>';
    resultHtml += '<textarea id="sa_client_text" readonly style="width:100%;padding:8px;background:#1f2530;border:1px solid #6c8cff;border-radius:4px;color:#fff;font-size:11px;min-height:70px">' + clientText + '</textarea>';
    resultHtml += '<button class="btn small" style="width:100%;margin-top:5px;background:#6c8cff" onclick="copySmartAssistantText()">📋 Копировать ответ клиенту</button>';
    resultHtml += '<button class="btn small" style="width:100%;margin-top:5px;background:#3ecf8e" onclick="applySmartEstimate()">✅ Перенести в калькулятор</button>';
    resultHtml += '</div>';
    
    document.getElementById('sa_result').innerHTML = resultHtml;
    document.getElementById('sa_result').style.display = 'block';
    
    window.sa_temp = {
        name: taskName,
        hours: estimatedHours,
        complexity: difficulty,
        buffer: bufferPercent
    };
}

function copySmartAssistantText(){
    var text = document.getElementById('sa_client_text').value;
    navigator.clipboard.writeText(text).then(function(){ alert('✅ Скопировано! Вставь в чат с клиентом.'); });
}

function applySmartEstimate(){
    if(!window.sa_temp) return;
    closeModal();
    document.getElementById('est_task_name').value = window.sa_temp.name;
    document.getElementById('est_task_hours').value = window.sa_temp.hours;
    var compSelect = document.getElementById('est_task_complexity');
    for(var i=0; i<compSelect.options.length; i++){
        if(parseFloat(compSelect.options[i].value) === window.sa_temp.complexity){ compSelect.selectedIndex = i; break; }
    }
    var bufSelect = document.getElementById('est_buffer');
    for(var i=0; i<bufSelect.options.length; i++){
        if(parseInt(bufSelect.options[i].value) === window.sa_temp.buffer){ bufSelect.selectedIndex = i; break; }
    }
    addEstimateTask();
}
// === КОНЕЦ УМНОГО ПОМОЩНИКА v2 ===

// === КОНЕЦ ВКЛАДКИ КАЛЬКУЛЯТОР ===

