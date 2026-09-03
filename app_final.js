
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
var TABS=[{id:'home',icon:'🏠',label:'Главная'},{id:'dashboard',icon:'📊',label:'Дашборд'},{id:'radar',icon:'🎯',label:'Радар'},{id:'projects',icon:'📁',label:'Проекты'},{id:'clients',icon:'👥',label:'Клиенты'},{id:'finances',icon:'💰',label:'Финансы'},{id:'emails',icon:'✉️',label:'Шаблоны'},{id:'pricing',icon:'💵',label:'Прайс'},{id:'productivity',icon:'⏱',label:'Продуктивность'},{id:'health',icon:'🏥',label:'Здоровье'},{id:'knowledge',icon:'📚',label:'База знаний'},{id:'crm',icon:'🤝',label:'CRM'},{id:'investments',icon:'📈',label:'Инвестиции'},{id:'documents',icon:'🧾',label:'Документы'},{id:'analytics',icon:'📊',label:'Аналитика'},{id:'devtools',icon:'🛠',label:'Dev Tools'},{id:'timetracker',icon:'⏱',label:'Тайм-трекер'},{id:'subscriptions',icon:'🔄',label:'Подписки'},{id:'calculator',icon:'🧮',label:'Калькулятор'},{id:'burnout',icon:'🧠',label:'Выгорание'},{id:'kpi',icon:'📈',label:'KPI'},{id:'tax',icon:'',label:'Налоги'},{id:'calendar',icon:'📅',label:'Календарь'},{id:'law',icon:'⚖️',label:'Право'},{id:'pipeline',icon:'🎯',label:'Воронка'},{id:'smarthub',icon:'🤖',label:'AI-Хаб'},{id:'settings',icon:'⚙️',label:'Настройки'}];

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
  else if(currentView==='law')renderLawHub();
  else if(currentView==='pipeline')renderLeadPipeline();
  else if(currentView==='smarthub')renderSmartHub();
  else if(currentView==='calendar')renderCalendar();
  else if(currentView==='tax')renderTaxTracker();
  else if(currentView==='kpi')renderKPI();
  else if(currentView==='burnout')renderBurnout();
  else if(currentView==='settings')renderSettings();
}

function renderHome() {
    var today = new Date().toISOString().slice(0, 10);
    var h = '<div class="card" style="background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff"><h2 style="margin:0">Привет, ' + esc(db.profile.name) + '! 👋</h2><p style="margin:5px 0 0 0;opacity:0.9">' + esc(db.profile.spec) + '</p></div>';
    
    var monthInc = 0, monthExp = 0;
    var currentMonth = today.slice(0, 7);
    db.finances.forEach(function(f) {
        if (f.date && f.date.startsWith(currentMonth)) {
            if (f.type === 'in') monthInc += (f.amt || 0);
            else monthExp += (f.amt || 0);
        }
    });
    
    h += '<div class="grid">';
    h += '<div class="card"><span class="stat">Доход (мес)</span><b style="font-size:18px;color:#3ecf8e">' + monthInc.toLocaleString() + ' ₽</b></div>';
    h += '<div class="card"><span class="stat">Расход (мес)</span><b style="font-size:18px;color:#ff6b6b">' + monthExp.toLocaleString() + ' ₽</b></div>';
    h += '<div class="card"><span class="stat">Баланс</span><b style="font-size:18px;color:#ffd700">' + (monthInc - monthExp).toLocaleString() + ' ₽</b></div>';
    var todayPomodoro = db.pomodoro.sessions.filter(s => s.date === today).reduce((sum, s) => sum + (s.duration || 0), 0);
    h += '<div class="card"><span class="stat">Фокус сегодня</span><b style="font-size:18px;color:#6c8cff">' + todayPomodoro + ' мин</b></div>';
    h += '</div>';

    var habitsDone = 0, habitsTotal = 0;
    if (db.habits) {
        db.habits.forEach(function(hab) {
            habitsTotal++;
            if (hab.log && hab.log[today]) habitsDone++;
        });
    }
    var habitPercent = habitsTotal > 0 ? Math.round(habitsDone / habitsTotal * 100) : 0;
    h += '<div class="card"><h3>🔥 Привычки сегодня</h3>';
    h += '<div style="display:flex;justify-content:space-between;margin-bottom:10px"><span>Выполнено: <b>' + habitsDone + '/' + habitsTotal + '</b></span><span>' + habitPercent + '%</span></div>';
    h += '<div style="background:#1f2530;border-radius:6px;height:8px;overflow:hidden"><div style="background:#3ecf8e;height:100%;width:' + habitPercent + '%"></div></div>';
    h += '<button class="btn small" style="width:100%;margin-top:10px;background:#6c8cff" onclick="go(\'productivity\')">Открыть продуктивность</button></div>';

    var activeProjects = db.projects.filter(p => p.stage === 1 || p.stage === 2);
    if (activeProjects.length > 0) {
        h += '<div class="card"><h3>🚀 Активные проекты</h3>';
        activeProjects.slice(0, 3).forEach(function(p) {
            h += '<div style="padding:8px;margin:5px 0;background:#1f2530;border-radius:6px;border-left:3px solid #6c8cff">';
            h += '<div style="font-weight:bold">' + esc(p.name) + '</div>';
            h += '<div class="mut" style="font-size:11px">' + (p.client || 'Без клиента') + (p.deadline ? ' · Дедлайн: ' + p.deadline : '') + '</div></div>';
        });
        h += '</div>';
    }

    h += '<div class="card"><h3>⚡ Быстрые действия</h3>';
    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    h += '<button class="btn" style="background:#3ecf8e" onclick="go(\'timetracker\')">⏱ Таймер</button>';
    h += '<button class="btn" style="background:#ff9500;color:#000" onclick="go(\'finances\')">💰 Доход</button>';
    h += '<button class="btn" style="background:#9d6cff" onclick="go(\'projects\')">📁 Проект</button>';
    h += '<button class="btn" style="background:#6c8cff" onclick="go(\'calculator\')">🧮 Оценка</button>';
    h += '</div></div>';

    document.getElementById('app').innerHTML = h;
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

function renderProjects() {
    if (!window.projectFilter) window.projectFilter = 'all';
    var today = new Date().toISOString().slice(0, 10);
    
    var h = '<h2>📁 Проекты</h2>';
    h += '<div style="display:flex;gap:8px;margin-bottom:15px;flex-wrap:wrap">';
    h += '<button class="btn small" style="background:' + (window.projectFilter === 'all' ? '#6c8cff' : '#1f2530') + '" onclick="window.projectFilter=\'all\';renderProjects()">Все</button>';
    h += '<button class="btn small" style="background:' + (window.projectFilter === 'active' ? '#6c8cff' : '#1f2530') + '" onclick="window.projectFilter=\'active\';renderProjects()">Активные</button>';
    h += '<button class="btn small" style="background:' + (window.projectFilter === 'completed' ? '#6c8cff' : '#1f2530') + '" onclick="window.projectFilter=\'completed\';renderProjects()">Завершённые</button>';
    h += '<button class="btn small" style="background:' + (window.projectFilter === 'overdue' ? '#ff6b6b' : '#1f2530') + '" onclick="window.projectFilter=\'overdue\';renderProjects()">Просроченные</button>';
    h += '</div>';
    
    h += '<div style="display:flex;gap:10px;margin-bottom:15px">';
    h += '<button class="btn" style="flex:1;background:#3ecf8e" onclick="addProject()">+ Новый проект</button>';
    h += '<button class="btn" style="flex:1;background:#9d6cff" onclick="showDocAssistant()">🤖 Помощник</button>';
    h += '</div>';

    var filtered = db.projects.filter(function(p) {
        if (window.projectFilter === 'active') return p.stage < 3;
        if (window.projectFilter === 'completed') return p.stage === 3;
        if (window.projectFilter === 'overdue') return p.deadline && p.deadline < today && p.stage < 3;
        return true;
    });

    if (filtered.length === 0) {
        h += '<div class="card" style="text-align:center;padding:30px"><div class="mut">Проекты не найдены</div></div>';
    } else {
        filtered.forEach(function(p) {
            var isOverdue = p.deadline && p.deadline < today && p.stage < 3;
            var doneTasks = p.tasks ? p.tasks.filter(function(t) { return t.done; }).length : 0;
            var totalTasks = p.tasks ? p.tasks.length : 0;
            var progress = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;
            var roi = (p.estimatedHours && p.estimatedHours > 0) ? Math.round(p.budget / p.estimatedHours) : 0;
            var stageNames = ['💡 Идея', '🚀 В работе', '🧪 Тестирование', '✅ Завершён'];
            var stageColors = ['#ffd700', '#6c8cff', '#ff9500', '#3ecf8e'];
            
            h += '<div class="card" style="border-left: 4px solid ' + (isOverdue ? '#ff6b6b' : stageColors[p.stage]) + '">';
            h += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">';
            h += '<b style="font-size:16px">' + esc(p.name) + (isOverdue ? ' <span style="color:#ff6b6b;font-size:12px">⚠️ Просрочен</span>' : '') + '</b>';
            h += '<span style="padding:4px 10px;background:' + stageColors[p.stage] + ';color:#000;border-radius:12px;font-size:11px;font-weight:bold">' + stageNames[p.stage] + '</span>';
            h += '</div>';
            
            h += '<div class="mut" style="font-size:13px;margin-bottom:8px">👤 ' + esc(p.client || 'Без клиента') + ' · 💰 ' + (p.budget || 0).toLocaleString() + ' ₽';
            if (roi) h += ' · 🧮 ' + roi + ' ₽/час';
            h += '</div>';
            
            if (p.description) {
                var desc = p.description.length > 100 ? p.description.substring(0, 100) + '...' : p.description;
                h += '<div style="font-size:13px;color:#e8ecf3;margin-bottom:8px">' + esc(desc) + '</div>';
            }
            
            if (p.tech_stack) {
                var techs = p.tech_stack.split(',').map(function(t) { return '<span style="padding:2px 8px;background:#1f2530;border-radius:4px;font-size:11px;color:#6c8cff;margin-right:4px">' + esc(t.trim()) + '</span>'; }).join('');
                h += '<div style="margin-bottom:8px">' + techs + '</div>';
            }
            
            if (p.deadline) {
                h += '<div class="mut" style="font-size:12px;margin-bottom:8px">📅 Дедлайн: <b style="color:' + (isOverdue ? '#ff6b6b' : '#fff') + '">' + p.deadline + '</b></div>';
            }
            
            h += '<div style="margin:10px 0">';
            h += '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>Прогресс задач</span><span>' + doneTasks + '/' + totalTasks + ' (' + progress + '%)</span></div>';
            h += '<div class="bar" style="height:6px"><i style="width:' + progress + '%;background:' + stageColors[p.stage] + '"></i></div>';
            h += '</div>';
            
            h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">';
            if (p.stage < 3) h += '<button class="btn small" style="background:#3ecf8e" onclick="nextStage(\'' + p.id + '\')">Этап →</button>';
            h += '<button class="btn small" style="background:#1f2530" onclick="showTasks(\'' + p.id + '\')">📋 Задачи</button>';
            h += '<button class="btn small" style="background:#1f2530" onclick="showReport(\'' + p.id + '\')">📊 Отчёт</button>';
            h += '<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;margin-left:auto" onclick="delProject(\'' + p.id + '\')">🗑</button>';
            h += '</div></div>';
        });
    }
    
    var completedCount = db.projects.filter(function(p){return p.stage===3}).length;
    if (completedCount > 0) {
        h += '<div class="card" style="margin-top:15px;background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#9d6cff">';
        h += '<h3 style="margin-top:0">✨ Портфолио (' + completedCount + ' проектов)</h3>';
        h += '<button class="btn small" style="background:#9d6cff;width:100%;margin-bottom:8px" onclick="generatePortfolio()">Сгенерировать</button>';
        h += '<div style="display:flex;gap:8px"><button class="btn small" style="background:#1f2530;flex:1" onclick="previewPortfolio()">👁 Просмотр</button><button class="btn small" style="background:#1f2530;flex:1" onclick="downloadPortfolio()">📥 Скачать</button></div>';
        h += '</div>';
    }
    
    document.getElementById('app').innerHTML = h;
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

function renderFinances() {
  var now = new Date();
  var periodStart, periodLabel;
  if (financePeriod === 'week') {
    periodStart = new Date(now); periodStart.setDate(now.getDate() - 7);
    periodLabel = 'за последние 7 дней';
  } else if (financePeriod === 'month') {
    periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    periodLabel = 'за ' + ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'][now.getMonth()];
  } else if (financePeriod === 'quarter') {
    var qm = Math.floor(now.getMonth()/3)*3;
    periodStart = new Date(now.getFullYear(), qm, 1);
    periodLabel = 'за ' + Math.floor(qm/3+1) + ' квартал';
  } else {
    periodStart = new Date(now.getFullYear(), 0, 1);
    periodLabel = 'за ' + now.getFullYear() + ' год';
  }
  
  var periodStr = periodStart.toISOString().slice(0,10);
  var periodFin = db.finances.filter(function(f){ return f.date && f.date >= periodStr; });
  
  var income = 0, expense = 0;
  var byCategory = {};
  var byClient = {};
  
  periodFin.forEach(function(f){
    if (f.type === 'in') {
      income += (f.amt || f.amount || 0);
      byCategory[f.cat || 'Доход'] = (byCategory[f.cat || 'Доход'] || 0) + (f.amt || f.amount || 0);
      if (f.client) byClient[f.client] = (byClient[f.client] || 0) + (f.amt || f.amount || 0);
    } else {
      expense += (f.amt || f.amount || 0);
      byCategory[f.cat || 'Расход'] = (byCategory[f.cat || 'Расход'] || 0) + (f.amt || f.amount || 0);
    }
  });

  var tax = (typeof calculateTax === 'function') ? calculateTax(income) : { name: 'Налог', amount: 0 };
  var netProfit = income - expense - tax.amount;

  // Расчёт подушки безопасности (средний расход в месяц за всё время)
  var allExpenses = db.finances.filter(function(f){ return f.type === 'out'; });
  var totalAllExpense = allExpenses.reduce(function(sum, f){ return sum + (f.amt || f.amount || 0); }, 0);
  var monthsTracked = Math.max(1, Math.ceil((now - new Date(allExpenses[0]?.date || now)) / (1000 * 60 * 60 * 24 * 30)));
  var avgMonthlyExpense = totalAllExpense / monthsTracked;
  var currentBalance = db.finances.reduce(function(sum, f){ return sum + (f.type === 'in' ? (f.amt||f.amount||0) : -(f.amt||f.amount||0)); }, 0);
  var safetyMonths = avgMonthlyExpense > 0 ? (currentBalance / avgMonthlyExpense).toFixed(1) : '∞';
  var safetyColor = safetyMonths >= 6 ? '#3ecf8e' : (safetyMonths >= 3 ? '#ffd700' : '#ff6b6b');

  var h = '<h2>💰 Финансы · ' + periodLabel + '</h2>';
  
  // Переключатель периода
  h += '<div class="filter-row" style="display:flex;gap:8px;margin-bottom:15px;flex-wrap:wrap">';
  ['week','month','quarter','year'].forEach(function(p){
    var label = {week:'Неделя',month:'Месяц',quarter:'Квартал',year:'Год'}[p];
    h += '<button class="btn small" style="flex:1;background:' + (financePeriod===p ? '#6c8cff' : '#1f2530') + '" onclick="financePeriod=\''+p+'\';renderFinances()">'+label+'</button>';
  });
  h += '</div>';

  // Главные показатели
  h += '<div class="grid" style="grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px">';
  h += '<div class="card" style="text-align:center;border-color:#3ecf8e"><div class="mut">Доход</div><b style="font-size:20px;color:#3ecf8e">' + (income||0).toLocaleString() + ' ₽</b></div>';
  h += '<div class="card" style="text-align:center;border-color:#ff6b6b"><div class="mut">Расход</div><b style="font-size:20px;color:#ff6b6b">' + (expense||0).toLocaleString() + ' ₽</b></div>';
  h += '<div class="card" style="text-align:center;border-color:#ffd700"><div class="mut">Налоги (' + tax.name + ')</div><b style="font-size:20px;color:#ffd700">' + (tax.amount||0).toLocaleString() + ' ₽</b></div>';
  h += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#102015,#1a3025);border-color:#3ecf8e"><div class="mut" style="color:#fff">Чистая прибыль</div><b style="font-size:20px;color:#3ecf8e">' + (netProfit||0).toLocaleString() + ' ₽</b></div>';
  h += '</div>';

  // Подушка безопасности
  h += '<div class="card" style="margin-bottom:15px"><h3>🛡 Подушка безопасности</h3>';
  h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
  h += '<span class="mut">Текущий баланс: <b style="color:#fff">' + currentBalance.toLocaleString() + ' ₽</b></span>';
  h += '<span style="padding:4px 10px;background:' + safetyColor + ';color:#000;border-radius:12px;font-size:12px;font-weight:bold">' + safetyMonths + ' мес.</span>';
  h += '</div>';
  h += '<div class="mut" style="font-size:11px">При среднем расходе ' + Math.round(avgMonthlyExpense).toLocaleString() + ' ₽/мес.</div></div>';

  // Круговая диаграмма расходов (CSS conic-gradient)
  var expCats = Object.keys(byCategory).filter(function(k){ return byCategory[k] < 0; }); // расходы отрицательные в нашей логике? Нет, мы сложили положительные. Исправим:
  var expCategories = {};
  periodFin.filter(function(f){return f.type==='out'}).forEach(function(f){
    expCategories[f.cat || 'Прочее'] = (expCategories[f.cat || 'Прочее'] || 0) + (f.amt || f.amount || 0);
  });
  
  if (expense > 0 && Object.keys(expCategories).length > 0) {
    h += '<div class="card" style="margin-bottom:15px"><h3>📊 Структура расходов</h3>';
    h += '<div style="display:flex;align-items:center;gap:15px">';
    
    // Генерация conic-gradient
    var colors = ['#ff6b6b', '#ff9500', '#ffd700', '#3ecf8e', '#6c8cff', '#9d6cff', '#e8ecf3'];
    var gradientParts = [];
    var currentAngle = 0;
    var catIndex = 0;
    
    var sortedCats = Object.keys(expCategories).sort(function(a,b){ return expCategories[b] - expCategories[a]; });
    
    sortedCats.forEach(function(cat){
      var amount = expCategories[cat];
      var percent = (amount / expense) * 100;
      var angle = (amount / expense) * 360;
      var color = colors[catIndex % colors.length];
      gradientParts.push(color + ' ' + currentAngle + 'deg ' + (currentAngle + angle) + 'deg');
      
      h += '<div style="flex:1"><div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">';
      h += '<div style="width:10px;height:10px;border-radius:50%;background:' + color + '"></div>';
      h += '<span style="font-size:12px;color:#fff">' + cat + '</span>';
      h += '<span style="font-size:12px;color:#6c8cff;margin-left:auto">' + Math.round(percent) + '%</span>';
      h += '</div><div class="mut" style="font-size:11px;padding-left:16px">' + amount.toLocaleString() + ' ₽</div></div>';
      
      currentAngle += angle;
      catIndex++;
    });
    
    h += '<div style="width:80px;height:80px;border-radius:50%;background:conic-gradient(' + gradientParts.join(', ') + ');flex-shrink:0;position:relative">';
    h += '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:50px;height:50px;background:#1a2035;border-radius:50%"></div>';
    h += '</div></div></div>';
  }

  // Топ клиентов
  var sortedClients = Object.keys(byClient).sort(function(a,b){ return byClient[b] - byClient[a]; }).slice(0, 3);
  if (sortedClients.length > 0) {
    h += '<div class="card" style="margin-bottom:15px"><h3>👑 Топ клиентов за период</h3>';
    sortedClients.forEach(function(client, i){
      var percent = Math.round((byClient[client] / income) * 100);
      h += '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #1f2530">';
      h += '<div style="display:flex;align-items:center;gap:10px"><span style="font-size:16px">' + (i===0?'🥇':(i===1?'🥈':'🥉')) + '</span><span style="color:#fff">' + client + '</span></div>';
      h += '<div style="text-align:right"><b style="color:#3ecf8e">' + byClient[client].toLocaleString() + ' ₽</b><div class="mut" style="font-size:10px">' + percent + '% от дохода</div></div>';
      h += '</div>';
    });
    h += '</div>';
  }

  // Список транзакций
  h += '<div class="card"><h3>📜 Последние операции</h3>';
  var recentFin = periodFin.sort(function(a,b){ return new Date(b.date) - new Date(a.date); }).slice(0, 15);
  if (recentFin.length === 0) {
    h += '<div class="mut" style="text-align:center;padding:20px">Нет операций за этот период</div>';
  } else {
    recentFin.forEach(function(f){
      var isIncome = f.type === 'in';
      var amount = f.amt || f.amount || 0;
      var dateObj = new Date(f.date);
      var dateStr = dateObj.toLocaleDateString('ru-RU', {day:'numeric', month:'short'});
      var icon = isIncome ? '📥' : '📤';
      var color = isIncome ? '#3ecf8e' : '#ff6b6b';
      
      h += '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #1f2530">';
      h += '<div style="display:flex;align-items:center;gap:10px">';
      h += '<div style="width:36px;height:36px;background:#1f2530;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px">' + icon + '</div>';
      h += '<div><div style="font-size:13px;color:#fff;font-weight:bold">' + (f.description || f.label || 'Без описания') + '</div>';
      h += '<div class="mut" style="font-size:11px">' + dateStr + (f.client ? ' · ' + f.client : '') + (f.cat ? ' · ' + f.cat : '') + '</div></div></div>';
      h += '<b style="color:' + color + ';font-size:14px">' + (isIncome ? '+' : '-') + amount.toLocaleString() + ' ₽</b>';
      h += '</div>';
    });
  }
  h += '</div>';

  // Кнопки действий
  h += '<div style="display:flex;gap:10px;margin-top:15px">';
  h += '<button class="btn" style="flex:1;background:#3ecf8e" onclick="addFinanceTransaction(\'in\')">+ Доход</button>';
  h += '<button class="btn" style="flex:1;background:#ff6b6b" onclick="addFinanceTransaction(\'out\')">+ Расход</button>';
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
function showSmartAssistant(){
  var h = '<h3>💡 Умный помощник</h3>';
  var tips = getSmartTips();
  
  if(tips.length === 0){
    h += '<div style="text-align:center;padding:20px;color:#3ecf8e;font-size:16px">✅ Всё отлично! Продолжай в том же духе.</div>';
  } else {
    h += '<p class="mut" style="margin-bottom:15px">Персональные рекомендации на основе твоих данных:</p>';
    tips.forEach(function(tip){
      var colors = {
        'success': {bg:'#1a2f1f', border:'#3ecf8e', icon:'✅'},
        'warning': {bg:'#2f2a1a', border:'#f59e0b', icon:'⚠️'},
        'danger': {bg:'#2f1a1a', border:'#ff6b6b', icon:'🚨'},
        'info': {bg:'#1a2035', border:'#6c8cff', icon:'💡'},
        'growth': {bg:'#1f1a2f', border:'#9d6cff', icon:'🚀'}
      };
      var c = colors[tip.type] || colors.info;
      h += '<div class="card" style="background:'+c.bg+';border-color:'+c.border+';margin:8px 0">';
      h += '<div style="display:flex;gap:10px;align-items:flex-start">';
      h += '<div style="font-size:24px">'+c.icon+'</div>';
      h += '<div style="flex:1"><div style="font-weight:bold;margin-bottom:4px">'+tip.title+'</div>';
      h += '<div style="font-size:13px;color:#e8ecf3;line-height:1.5">'+tip.text+'</div>';
      if(tip.action){
        h += '<button class="btn small" style="background:'+c.border+';margin-top:8px" onclick="'+tip.action+'">'+tip.actionLabel+'</button>';
      }
      h += '</div></div></div>';
    });
  }
  
  h += '<div style="margin-top:15px;padding-top:15px;border-top:1px solid #242b36">';
  h += '<div class="mut" style="font-size:11px;text-align:center">💡 Помощник анализирует: '+(currentView==='home'?'главную':currentView==='dashboard'?'дашборд':currentView==='radar'?'радар':currentView==='projects'?'проекты':currentView==='clients'?'клиенты':currentView==='finances'?'финансы':currentView==='emails'?'шаблоны':currentView==='pricing'?'прайс':currentView)+' · '+db.finances.length+' операций · '+db.projects.length+' проектов</div>';
  h += '</div>';
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function getSmartTips(){
  var tips = [];
  var now = new Date();
  var monthStr = now.toISOString().slice(0,7);
  var monthIncome = 0, monthExpense = 0;
  db.finances.forEach(function(f){
    if(f.date && f.date.startsWith(monthStr)){
      if(f.type==='in') monthIncome += f.amt;
      else monthExpense += f.amt;
    }
  });
  
  // === СОВЕТЫ ДЛЯ ВСЕХ ВКЛАДОК ===
  
  // 1. Профиль не заполнен
  if(!db.profile.phone || db.profile.phone === '+79001234567'){
    tips.push({type:'warning', title:'Обнови телефон в профиле', text:'Сейчас указан тестовый номер. Клиенты не смогут тебе позвонить!', action:"closeModal();go('settings')", actionLabel:'⚙️ Открыть настройки'});
  }
  
  // 2. Мало специализаций
  if(db.profile.specs && db.profile.specs.length < 3){
    tips.push({type:'info', title:'Расширь специализации', text:'У тебя выбрано всего '+db.profile.specs.length+' навыков. Добавь ещё — Радар найдёт больше вакансий.', action:"closeModal();go('settings')", actionLabel:'🎯 Выбрать навыки'});
  }
  
  // === СОВЕТЫ ПО ВКЛАДКАМ ===
  
  if(currentView === 'home' || currentView === 'dashboard'){
    // Прогноз дохода
    var daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    var currentDay = now.getDate();
    if(currentDay > 0 && monthIncome > 0){
      var forecast = Math.round(monthIncome / currentDay * daysInMonth);
      if(forecast > monthIncome * 1.5){
        tips.push({type:'growth', title:'🚀 Отличный темп!', text:'При текущей скорости заработаешь '+formatCurrency(forecast)+' к концу месяца. Это на '+Math.round((forecast/monthIncome-1)*100)+'% больше, чем сейчас.', action:"closeModal();go('dashboard')", actionLabel:'📊 Посмотреть прогноз'});
      }
    }
    
    // Резерв на налоги
    var tax = calculateTax(monthIncome);
    if(tax.amount > 0 && db.taxReserve < tax.amount * 0.5){
      tips.push({type:'warning', title:'Отложи на налоги', text:'За '+monthIncome.toLocaleString()+' ₽ дохода нужно '+formatCurrency(tax.amount)+' налогов. В резерве только '+formatCurrency(db.taxReserve)+'.', action:"closeModal();go('finances')", actionLabel:'💰 Перейти в финансы'});
    }
  }
  
  if(currentView === 'projects'){
    var active = db.projects.filter(function(p){return p.stage === 1}).length;
    var completed = db.projects.filter(function(p){return p.stage === 3}).length;
    var noDeadline = db.projects.filter(function(p){return p.stage < 3 && !p.deadline}).length;
    
    if(active === 0 && completed === 0){
      tips.push({type:'info', title:'Создай первый проект', text:'Начни с небольшого проекта — лендинга или бота. Умный помощник заполнит все поля автоматически.', action:"closeModal();addProject()", actionLabel:'+ Новый проект'});
    }
    if(noDeadline > 0){
      tips.push({type:'warning', title:'У '+noDeadline+' проектов нет дедлайна', text:'Проекты без дедлайна часто затягиваются. Поставь реальные сроки.', action:"closeModal();go('projects')", actionLabel:'📁 К проектам'});
    }
    if(active > 3){
      tips.push({type:'warning', title:'Слишком много активных проектов', text:'У тебя '+active+' проектов в работе. Фокус на 1-2 даёт лучший результат.', action:"closeModal();go('projects')", actionLabel:'📁 К проектам'});
    }
    if(completed > 0){
      tips.push({type:'success', title:'Портфолио готово!', text:'У тебя '+completed+' завершённых проектов. Сгенерируй красивое портфолио для клиентов.', action:"closeModal();generatePortfolio()", actionLabel:'✨ Сгенерировать портфолио'});
    }
  }
  
  if(currentView === 'clients'){
    if(db.clients.length === 0){
      tips.push({type:'info', title:'Добавь первого клиента', text:'Начни вести базу клиентов — это поможет в прайсе и дебиторке.', action:"closeModal();addClient()", actionLabel:'+ Новый клиент'});
    }
    var noBudget = db.clients.filter(function(c){return !c.budget || c.budget === 0}).length;
    if(noBudget > 0){
      tips.push({type:'info', title:'У '+noBudget+' клиентов не указан бюджет', text:'Заполни бюджеты — увидишь общую ёмкость базы.', action:"closeModal();go('clients')", actionLabel:'👥 К клиентам'});
    }
  }
  
  if(currentView === 'finances'){
    // Бюджет превышен
    var monthCats = {};
    db.finances.forEach(function(f){
      if(f.date && f.date.startsWith(monthStr) && f.type === 'out'){
        monthCats[f.cat] = (monthCats[f.cat] || 0) + f.amt;
      }
    });
    Object.keys(db.budgets).forEach(function(cat){
      if(monthCats[cat] && monthCats[cat] > db.budgets[cat]){
        tips.push({type:'danger', title:'Бюджет "'+cat+'" превышен!', text:'Потрачено '+formatCurrency(monthCats[cat])+' из лимита '+formatCurrency(db.budgets[cat])+'. Пересмотри расходы.', action:"closeModal();go('finances')", actionLabel:'💰 К финансам'});
      }
    });
    
    // Дебиторка просрочена
    var overdue = db.receivables.filter(function(r){return r.due && r.due < today()}).length;
    if(overdue > 0){
      tips.push({type:'danger', title:'🚨 '+overdue+' просроченных платежей', text:'Срочно свяжись с клиентами и напомни об оплате.', action:"closeModal();showReceivables()", actionLabel:'💰 Открыть дебиторку'});
    }
    
    // Резерв на налоги
    var tax = calculateTax(monthIncome);
    if(tax.amount > 0){
      var needed = tax.amount;
      var have = db.taxReserve;
      if(have < needed){
        tips.push({type:'warning', title:'Резерв на налоги: нужно '+formatCurrency(needed), text:'Откладывай '+tax.rate+'% от каждого дохода. Сейчас в резерве '+formatCurrency(have)+'.', action:"closeModal();showTaxReserve()", actionLabel:'💰 Управление резервом'});
      } else {
        tips.push({type:'success', title:'Налоги покрыты', text:'В резерве '+formatCurrency(have)+' — достаточно для уплаты '+formatCurrency(needed)+' налогов.'});
      }
    }
    
    // Прогноз
    if(currentDay > 5 && monthIncome > 0){
      var forecast = Math.round(monthIncome / currentDay * daysInMonth);
      tips.push({type:'info', title:'Прогноз на конец месяца', text:'При текущем темпе заработаешь ~'+formatCurrency(forecast)+'. Это '+(forecast>monthIncome*1.3?'🚀 отличный результат':'стабильный доход')+'.'});
    }
    
    // Нет целей
    if(db.goals.length === 0 && monthIncome > 0){
      var suggested = Math.round(monthIncome * 1.2);
      tips.push({type:'growth', title:'Поставь финансовую цель', text:'Рекомендую: '+formatCurrency(suggested)+' за месяц (на 20% больше текущего).', action:"closeModal();addGoal()", actionLabel:'🎯 Создать цель'});
    }
  }
  
  if(currentView === 'radar'){
    if(db.autoLeads.length === 0){
      tips.push({type:'info', title:'Найди первых клиентов', text:'Нажми "🇷🇺 Найти все" — Радар подберёт вакансии по твоим навыкам.', action:"closeModal();autoSearchHH()", actionLabel:'🔍 Начать поиск'});
    }
    if(db.sources.length === 0){
      tips.push({type:'info', title:'Загрузи источники поиска', text:'200+ площадок для поиска клиентов уже ждут.', action:"closeModal();go('radar')", actionLabel:'🎯 К радару'});
    }
  }
  
  if(currentView === 'emails'){
    if(db.emailTemplates.length === 0){
      tips.push({type:'warning', title:'Шаблоны писем не загружены', text:'Обнови страницу — база из 1500+ шаблонов подгрузится автоматически.'});
    } else {
      tips.push({type:'success', title:'1500+ шаблонов доступно', text:'Используй поиск и фильтры, чтобы найти идеальное письмо для клиента.'});
    }
  }
  
  if(currentView === 'pricing'){
    if(Object.keys(db.services).length === 0){
      tips.push({type:'warning', title:'Прайс не загружен', text:'Подожди 3 секунды или обнови страницу.'});
    } else {
      tips.push({type:'info', title:'Сформируй прайс для клиента', text:'Отметь 5-10 услуг и нажми "✨ Сгенерировать прайс" — получишь готовый PDF.', action:"closeModal();go('pricing')", actionLabel:'💵 К прайсу'});
    }
  }
  
  // === НОВЫЕ СОВЕТЫ ДЛЯ КОПИЛОК И ПЛАНИРОВАНИЯ ===
  
  // Копилки с просроченным дедлайном
  if(db.pots && db.pots.length > 0){
    var overduePots = db.pots.filter(function(p){return p.deadline && p.deadline < today() && p.amount < p.target});
    if(overduePots.length > 0){
      tips.push({type:'danger', title:'⏰ '+overduePots.length+' копилок с просроченным дедлайном', text:'Пересмотри цели или увеличь ежемесячные отчисления.', action:"closeModal();showPots()", actionLabel:'💰 К копилкам'});
    }
    
    // Нет финансовой подушки
    var hasSafety = db.pots.some(function(p){return p.category === 'safety'});
    if(!hasSafety && monthIncome > 50000){
      tips.push({type:'warning', title:'🛡 Создай финансовую подушку', text:'Это резерв на 3-6 месяцев расходов. Защищает от форс-мажоров.', action:"closeModal();addPot()", actionLabel:'+ Создать копилку'});
    }
  }
  
  // Дисбаланс сфер жизни
  if(currentView === 'finances' && monthExpense > 0){
    var healthExp = 0, familyExp = 0;
    db.finances.forEach(function(f){
      if(!f.date || !f.date.startsWith(monthStr) || f.type !== 'out') return;
      var c = (f.cat || '').toLowerCase();
      if(c.includes('здоровье') || c.includes('спорт') || c.includes('медицина')) healthExp += f.amt;
      if(c.includes('семья') || c.includes('подарки')) familyExp += f.amt;
    });
    if(healthExp === 0 && monthIncome > 80000){
      tips.push({type:'warning', title:'❤️ Инвестируй в здоровье', text:'В этом месяце нет расходов на здоровье. Спорт и медицина — лучшая инвестиция.', action:"closeModal();showLifeBalance()", actionLabel:'⚖️ Баланс жизни'});
    }
    if(familyExp === 0 && monthIncome > 150000){
      tips.push({type:'info', title:'🏠 Удели внимание семье', text:'Не было семейных расходов. Подарки, совместный отдых — это важно.', action:"closeModal();showLifeBalance()", actionLabel:'⚖️ Баланс жизни'});
    }
  }
  
  // Правило 50/30/20
  if(currentView === 'finances' && monthIncome > 0){
    var tax = calculateTax(monthIncome);
    var netIncome = monthIncome - tax.amount;
    var savingsPct = monthIncome > 0 ? (db.pots.reduce(function(a,p){return a+p.amount},0) + db.taxReserve) / netIncome : 0;
    if(savingsPct < 0.1 && monthIncome > 100000){
      tips.push({type:'growth', title:'💰 Цель — 20% на накопления', text:'Сейчас откладываешь ~'+Math.round(savingsPct*100)+'%. Правило 50/30/20 рекомендует минимум 20%.', action:"closeModal();showSmartPlanning()", actionLabel:'📊 Планирование'});
    }
  }
  
  // === СОВЕТЫ ПО КРЕДИТАМ ===
  if(db.credits && db.credits.length > 0){
    var totalDebt = db.credits.reduce(function(a,c){return a+c.remaining},0);
    var monthlyPayments = db.credits.reduce(function(a,c){return a+c.monthlyPayment},0);
    if(monthlyPayments > netIncome * 0.4){
      tips.push({type:'danger', title:'💳 Кредитная нагрузка >40% дохода', text:'Ежемесячные платежи '+formatCurrency(monthlyPayments)+' — это много. Рассмотри рефинансирование.', action:"closeModal();showCredits()", actionLabel:'💳 К кредитам'});
    }
    var highRateCredit = db.credits.find(function(c){return c.rate > 20});
    if(highRateCredit){
      tips.push({type:'warning', title:'⚠️ Кредит с высокой ставкой', text:'"'+highRateCredit.name+'" под '+highRateCredit.rate+'%. Погаси его в первую очередь (стратегия "Лавина").', action:"closeModal();showPayoffStrategy("+db.credits.indexOf(highRateCredit)+")", actionLabel:'⚡ Стратегия'});
    }
  }
  
  // === СОВЕТЫ ПО НАКОПЛЕНИЯМ ===
  if(db.pots && db.pots.length > 0){
    var avgMonthlySavings = db.monthlySavings || 5000;
    var longestPot = db.pots.reduce(function(max,p){
      var months = Math.ceil((p.target-p.amount)/avgMonthlySavings);
      return months > max.months ? {p:p, months:months} : max;
    }, {p:null, months:0});
    if(longestPot.p && longestPot.months > 12){
      tips.push({type:'info', title:'🎯 Долгосрочная цель', text:'"'+longestPot.p.name+'" займёт ~'+longestPot.months+' мес. Увеличь отчисления или пересмотри цель.', action:"closeModal();showGoalForecast()", actionLabel:'🎯 Прогноз'});
    }
  }
  
  // Ограничиваем до 7 самых важных советов
  return tips.slice(0, 7);
}

// === РЕЗЕРВ НА НАЛОГИ ===
function showTaxReserve(){
  var monthStr = new Date().toISOString().slice(0,7);
  var monthIncome = 0;
  db.finances.forEach(function(f){
    if(f.type==='in' && f.date && f.date.startsWith(monthStr)) monthIncome += f.amt;
  });
  var tax = calculateTax(monthIncome);
  var pct = tax.rate;
  
  var h = '<h3>💰 Резерв на налоги</h3>';
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a;text-align:center">';
  h += '<div class="mut" style="color:#fff">В резерве</div>';
  h += '<div style="font-size:28px;font-weight:bold;color:#3ecf8e;margin:8px 0">'+formatCurrency(db.taxReserve)+'</div>';
  h += '<div class="mut">Необходимо: '+formatCurrency(tax.amount)+' ('+pct+'% от '+formatCurrency(monthIncome)+')</div>';
  var coverPct = tax.amount > 0 ? Math.min(100, Math.round(db.taxReserve / tax.amount * 100)) : 100;
  h += '<div class="bar" style="margin-top:10px"><i style="width:'+coverPct+'%;background:'+(coverPct>=100?'#3ecf8e':'#f59e0b')+'"></i></div>';
  h += '<div class="mut" style="margin-top:5px">Покрытие: '+coverPct+'%</div>';
  h += '</div>';
  
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:15px">';
  h += '<button class="btn" style="background:#3ecf8e" onclick="addToReserve()">➕ Отложить</button>';
  h += '<button class="btn" style="background:#ff6b6b" onclick="withdrawFromReserve()">➖ Снять (уплатить)</button>';
  h += '</div>';
  h += '<div class="mut" style="margin-top:15px;font-size:12px;text-align:center">💡 Совет: откладывай '+pct+'% от каждого дохода сразу</div>';
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function addToReserve(){
  var amt = +prompt('Сколько отложить в резерв?');
  if(!amt || amt <= 0) return;
  db.taxReserve += amt;
  save();
  alert('✅ Отложено '+formatCurrency(amt)+'. В резерве: '+formatCurrency(db.taxReserve));
  showTaxReserve();
}

function withdrawFromReserve(){
  var amt = +prompt('Сколько снять (уплатить в налоговую)?');
  if(!amt || amt <= 0) return;
  if(amt > db.taxReserve){
    if(!confirm('В резерве только '+formatCurrency(db.taxReserve)+'. Снять всё?')) return;
    amt = db.taxReserve;
  }
  db.taxReserve -= amt;
  db.finances.unshift({id:uid(), date:today(), type:'out', amt:amt, cat:'Налоги', note:'Уплата налогов'});
  save();
  alert('✅ Снято '+formatCurrency(amt)+'. Операция добавлена в историю.');
  showTaxReserve();
}

// === НАЛОГОВЫЙ КАЛЕНДАРЬ ===
function showTaxCalendar(){
  var j = db.taxJurisdiction || 'russia';
  var s = db.taxSystem || 'npd';
  var now = new Date();
  var year = now.getFullYear();
  
  var events = [];
  
  if(j === 'russia'){
    if(s === 'npd'){
      events.push({date:'Ежемесячно до 28', title:'Уплата НПД', desc:'Налог за предыдущий месяц. ФНС сама рассчитает в приложении "Мой налог".', type:'warning'});
    } else if(s === 'usn6' || s === 'usn15'){
      events.push({date:'28 апреля', title:'Аванс по УСН за Q1', desc:'Уплата аванса за январь-март.', type:'warning'});
      events.push({date:'28 июля', title:'Аванс по УСН за H1', desc:'Уплата аванса за апрель-июнь.', type:'warning'});
      events.push({date:'28 октября', title:'Аванс по УСН за 9 мес.', desc:'Уплата аванса за июль-сентябрь.', type:'warning'});
      events.push({date:'30 апреля '+year, title:'Декларация УСН за год', desc:'Подача декларации + доплата налога.', type:'danger'});
    } else if(s === 'ndfl'){
      events.push({date:'30 апреля '+year, title:'Декларация 3-НДФЛ', desc:'Подача декларации за предыдущий год.', type:'danger'});
      events.push({date:'15 июля '+year, title:'Уплата НДФЛ', desc:'Уплата налога по декларации.', type:'warning'});
    }
  } else if(j === 'belarus'){
    if(s === 'pvt'){
      events.push({date:'22-е число ежемесячно', title:'Уплата НДС 1%', desc:'Ежемесячная уплата НДС для резидентов ПВТ.', type:'warning'});
    } else {
      events.push({date:'Ежеквартально', title:'Авансовые платежи', desc:'Уплата авансов по выбранной системе.', type:'warning'});
    }
  } else if(j === 'china'){
    events.push({date:'Ежеквартально', title:'VAT декларация', desc:'Подача декларации по НДС.', type:'warning'});
    events.push({date:'31 мая', title:'Годовая корпоративная декларация', desc:'Corporate Income Tax annual filing.', type:'danger'});
    events.push({date:'Ежемесячно до 15', title:'IIT удержание', desc:'Уплата индивидуального налога.', type:'warning'});
  }
  
  var h = '<h3>📅 Налоговый календарь</h3>';
  h += '<p class="mut">'+calculateTax(0).jurisdictionLabel+' · '+calculateTax(0).name+'</p>';
  
  if(events.length === 0){
    h += '<div class="mut" style="text-align:center;padding:20px">Нет данных о сроках для этой системы</div>';
  } else {
    events.forEach(function(e){
      var colors = {warning:'#f59e0b', danger:'#ff6b6b'};
      var c = colors[e.type] || '#6c8cff';
      h += '<div class="card" style="border-left:4px solid '+c+';margin:8px 0">';
      h += '<div style="display:flex;justify-content:space-between;align-items:center">';
      h += '<div><div style="font-weight:bold">'+e.title+'</div><div class="mut" style="font-size:12px;margin-top:4px">'+e.desc+'</div></div>';
      h += '<div style="color:'+c+';font-weight:bold;font-size:13px;white-space:nowrap;margin-left:10px">'+e.date+'</div>';
      h += '</div></div>';
    });
  }
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:15px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

// === БЮДЖЕТИРОВАНИЕ ПО КАТЕГОРИЯМ ===
function showBudgets(){
  var monthStr = new Date().toISOString().slice(0,7);
  var monthCats = {};
  db.finances.forEach(function(f){
    if(f.date && f.date.startsWith(monthStr) && f.type === 'out'){
      monthCats[f.cat] = (monthCats[f.cat] || 0) + f.amt;
    }
  });
  
  var h = '<h3>📊 Бюджеты по категориям</h3>';
  h += '<p class="mut">Установи лимиты расходов на этот месяц</p>';
  
  var allCats = ['Реклама','Подписки','Оборудование','Налоги','Обучение','Транспорт','Другое','Проект'];
  allCats.forEach(function(cat){
    var spent = monthCats[cat] || 0;
    var budget = db.budgets[cat] || 0;
    var pct = budget > 0 ? Math.min(100, Math.round(spent / budget * 100)) : 0;
    var color = pct >= 100 ? '#ff6b6b' : pct >= 80 ? '#f59e0b' : '#3ecf8e';
    
    h += '<div class="card" style="margin:8px 0;padding:12px">';
    h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
    h += '<b>'+cat+'</b>';
    h += '<button class="btn small" style="background:#1f2530;padding:4px 8px;font-size:11px" onclick="editBudget(\''+cat+'\')">⚙️</button>';
    h += '</div>';
    if(budget > 0){
      h += '<div style="font-size:12px;color:#8b94a7;margin-bottom:4px">Потрачено '+formatCurrency(spent)+' из '+formatCurrency(budget)+' ('+pct+'%)</div>';
      h += '<div class="bar"><i style="width:'+pct+'%;background:'+color+'"></i></div>';
    } else {
      h += '<div class="mut" style="font-size:12px">Потрачено: '+formatCurrency(spent)+' · Бюджет не установлен</div>';
    }
    h += '</div>';
  });
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function editBudget(cat){
  var current = db.budgets[cat] || 0;
  var val = prompt('Бюджет для "'+cat+'" на месяц (₽):', current);
  if(val === null) return;
  var amt = +val;
  if(amt > 0) db.budgets[cat] = amt;
  else delete db.budgets[cat];
  save();
  showBudgets();
}

// === ПРОГНОЗ ДОХОДА ===
function showForecast(){
  var now = new Date();
  var monthStr = now.toISOString().slice(0,7);
  var daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  var currentDay = now.getDate();
  
  var monthIncome = 0, prevMonthIncome = 0;
  var prevMonthStr = new Date(now.getFullYear(), now.getMonth()-1, 1).toISOString().slice(0,7);
  
  db.finances.forEach(function(f){
    if(f.type !== 'in') return;
    if(f.date && f.date.startsWith(monthStr)) monthIncome += f.amt;
    if(f.date && f.date.startsWith(prevMonthStr)) prevMonthIncome += f.amt;
  });
  
  var forecast = currentDay > 0 ? Math.round(monthIncome / currentDay * daysInMonth) : 0;
  var growth = prevMonthIncome > 0 ? Math.round((forecast - prevMonthIncome) / prevMonthIncome * 100) : 0;
  
  var h = '<h3>📈 Прогноз дохода</h3>';
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a;text-align:center">';
  h += '<div class="mut" style="color:#fff">Прогноз на конец месяца</div>';
  h += '<div style="font-size:32px;font-weight:bold;color:#3ecf8e;margin:10px 0">'+formatCurrency(forecast)+'</div>';
  h += '<div class="mut">Заработано: '+formatCurrency(monthIncome)+' ('+currentDay+' из '+daysInMonth+' дней)</div>';
  h += '<div class="mut" style="margin-top:5px">Среднее в день: <b style="color:#6c8cff">'+formatCurrency(currentDay>0?Math.round(monthIncome/currentDay):0)+'</b></div>';
  if(prevMonthIncome > 0){
    var color = growth >= 0 ? '#3ecf8e' : '#ff6b6b';
    var arrow = growth >= 0 ? '↑' : '↓';
    h += '<div style="margin-top:10px;color:'+color+';font-weight:bold">'+arrow+' '+Math.abs(growth)+'% vs прошлый месяц</div>';
  }
  h += '</div>';
  
  // Прогноз на год
  var yearIncome = 0;
  var yearStr = now.getFullYear().toString();
  db.finances.forEach(function(f){
    if(f.type === 'in' && f.date && f.date.startsWith(yearStr)) yearIncome += f.amt;
  });
  var daysInYear = (now - new Date(now.getFullYear(),0,1)) / (1000*60*60*24);
  var yearForecast = daysInYear > 0 ? Math.round(yearIncome / daysInYear * 365) : 0;
  
  h += '<div class="card" style="text-align:center;margin-top:10px">';
  h += '<div class="mut">Прогноз на '+now.getFullYear()+' год</div>';
  h += '<div style="font-size:24px;font-weight:bold;color:#9d6cff;margin:8px 0">'+formatCurrency(yearForecast)+'</div>';
  h += '<div class="mut">Заработано с начала года: '+formatCurrency(yearIncome)+'</div>';
  h += '</div>';
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:15px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

// === УМНЫЕ ПОДСКАЗКИ В ФОРМАХ ===
function showOperationHint(){
  var h = '<h3>💡 Как заполнить операцию</h3>';
  h += '<div class="card" style="margin:8px 0"><b>📌 Сумма и валюта</b><div class="mut" style="font-size:12px;margin-top:4px">Введи сумму в любой валюте — автоматически сконвертируется в основную.</div></div>';
  h += '<div class="card" style="margin:8px 0"><b>📌 Категория</b><div class="mut" style="font-size:12px;margin-top:4px">Выбери из списка: Проект, Аванс, Реклама, Подписки, Налоги и т.д. Это поможет в аналитике.</div></div>';
  h += '<div class="card" style="margin:8px 0"><b>📌 Клиент</b><div class="mut" style="font-size:12px;margin-top:4px">Для доходов — выбери клиента, чтобы видеть топ по доходу.</div></div>';
  h += '<div class="card" style="margin:8px 0"><b>💡 Совет</b><div class="mut" style="font-size:12px;margin-top:4px">При доходе сразу отложи '+calculateTax(0).rate+'% в резерв на налоги (кнопка 💰 в финансах).</div></div>';
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Понятно</button>';
  openModal(h);
}

function showGoalHint(){
  var monthIncome = 0;
  var monthStr = new Date().toISOString().slice(0,7);
  db.finances.forEach(function(f){if(f.type==='in'&&f.date&&f.date.startsWith(monthStr))monthIncome+=f.amt;});
  var suggested = Math.round(monthIncome * 1.2);
  
  var h = '<h3>💡 Как поставить цель</h3>';
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
  h += '<div class="mut" style="color:#fff">💡 Рекомендация</div>';
  h += '<div style="font-size:18px;font-weight:bold;color:#3ecf8e;margin-top:5px">'+formatCurrency(suggested)+'</div>';
  h += '<div class="mut" style="font-size:12px;margin-top:4px">На 20% больше текущего дохода за месяц</div>';
  h += '</div>';
  h += '<div class="card" style="margin:8px 0"><b>📌 SMART-цели</b><div class="mut" style="font-size:12px;margin-top:4px">Цель должна быть: Конкретной, Измеримой, Достижимой, Релевантной, Ограниченной по времени.</div></div>';
  h += '<div class="card" style="margin:8px 0"><b>📌 Примеры</b><div class="mut" style="font-size:12px;margin-top:4px">• 300К за месяц<br>• 1М за квартал<br>• Накопить 500К на Mac за 6 месяцев</div></div>';
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Понятно</button>';
  openModal(h);
}

function showReceivableHint(){
  var activeProjects = db.projects.filter(function(p){return p.stage === 1});
  var h = '<h3>💡 Как заполнить дебиторку</h3>';
  if(activeProjects.length > 0){
    h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
    h += '<div class="mut" style="color:#fff">💡 У тебя '+activeProjects.length+' активных проектов</div>';
    h += '<div class="mut" style="font-size:12px;margin-top:4px">Добавь ожидаемые оплаты по каждому — не потеряешь деньги!</div>';
    h += '</div>';
  }
  h += '<div class="card" style="margin:8px 0"><b>📌 Что указывать</b><div class="mut" style="font-size:12px;margin-top:4px">• Клиент — из базы<br>• Сумма — ожидаемый платёж<br>• Описание — за что оплата (этап, проект)<br>• Дедлайн — когда ждёшь деньги</div></div>';
  h += '<div class="card" style="margin:8px 0"><b>⚠️ Просрочка</b><div class="mut" style="font-size:12px;margin-top:4px">Если дедлайн прошёл — карточка станет красной. Напомни клиенту!</div></div>';
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Понятно</button>';
  openModal(h);
}

function showTaxHint(){
  var h = '<h3>💡 Как выбрать систему налогов</h3>';
  h += '<div class="card" style="margin:8px 0"><b>🇷🇺 Россия</b>';
  h += '<div class="mut" style="font-size:12px;margin-top:4px">• <b>НПД (6%)</b> — до 2.4М ₽/год, без отчётов<br>• <b>УСН 6%</b> — до 200М ₽/год, декларация раз в год<br>• <b>УСН 15%</b> — если расходы >60% от доходов<br>• <b>НДФЛ 13%</b> — для физлиц без статуса</div></div>';
  h += '<div class="card" style="margin:8px 0"><b>🇧🇾 Беларусь</b>';
  h += '<div class="mut" style="font-size:12px;margin-top:4px">• <b>ПВТ (1%)</b> — для IT-компаний<br>• <b>ИП 10%</b> — упрощёнка для ИП<br>• <b>13%</b> — стандартный подоходный</div></div>';
  h += '<div class="card" style="margin:8px 0"><b>🇨🇳 Китай</b>';
  h += '<div class="mut" style="font-size:12px;margin-top:4px">• <b>VAT 3%</b> — малый НДС<br>• <b>Corporate 25%</b> — на прибыль компаний<br>• <b>IIT ~20%</b> — индивидуальный</div></div>';
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a"><b>💡 Рекомендация</b><div class="mut" style="font-size:12px;margin-top:4px">Для фрилансера в РФ с доходом до 2.4М ₽/год — <b>НПД (самозанятый)</b> идеален: низкая ставка, нет отчётов, регистрация за 5 минут.</div></div>';
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Понятно</button>';
  openModal(h);
}


// === КОПИЛКИ (ЦЕЛЕВЫЕ НАКОПЛЕНИЯ) ===
var POT_CATEGORIES = {
  'business': {icon:'🚀', label:'Рост бизнеса', color:'#6c8cff', desc:'Реклама, инструменты, делегирование'},
  'dev': {icon:'💻', label:'Моменты разработки', color:'#9d6cff', desc:'Mac, монитор, лицензии, техника'},
  'family': {icon:'🏠', label:'Семья', color:'#3ecf8e', desc:'Подарки, крупные покупки для дома'},
  'health': {icon:'❤️', label:'Здоровье', color:'#ff6b6b', desc:'Спорт, медицина, страховка'},
  'education': {icon:'📚', label:'Обучение', color:'#f59e0b', desc:'Курсы, конференции, книги'},
  'safety': {icon:'🛡', label:'Финансовая подушка', color:'#10b981', desc:'3-6 месяцев расходов на жизнь'},
  'vacation': {icon:'✈️', label:'Отпуск', color:'#06b6d4', desc:'Путешествия и отдых'},
  'purchase': {icon:'🎁', label:'Крупные покупки', color:'#ec4899', desc:'Машина, квартира, техника'},
  'other': {icon:'💎', label:'Другое', color:'#8b5cf6', desc:'Прочие цели'}
};


// === 1. ИМПОРТ CSV ===
function showCsvImport(){
  var h='<h3>📥 Импорт выписки из банка (CSV)</h3>';
  h+='<p class="mut">Формат: Дата;Сумма;Описание (разделитель ; или ,)</p>';
  h+='<p class="mut" style="font-size:11px">Пример: 2026-08-15;-500;Кофе в Starbucks</p>';
  
  // Способ 1: Вставка текста
  h+='<div style="margin-top:15px">';
  h+='<div style="font-weight:bold;margin-bottom:6px;color:#6c8cff">📝 Способ 1: Вставить текст</div>';
  h+='<textarea id="csv_text" rows="6" placeholder="Вставь данные сюда...&#10;2026-08-15;-500;Кофе&#10;2026-08-14;150000;Зарплата" style="width:100%;padding:10px;background:#1f2530;border:1px solid #6c8cff;border-radius:8px;color:#fff;font-family:monospace;font-size:12px;resize:vertical"></textarea>';
  h+='<div style="display:flex;gap:8px;margin-top:8px">';
  h+='<button class="btn" style="background:#6c8cff;flex:1" onclick="generateExample()">🎲 Пример</button>';
  h+='<button class="btn" style="background:#3ecf8e;flex:1" onclick="importFromText()">✅ Импортировать</button>';
  h+='</div></div>';
  
  // Разделитель
  h+='<div style="text-align:center;margin:15px 0;color:#8b94a7">— или —</div>';
  
  // Способ 2: Загрузка файла
  h+='<div style="margin-top:15px">';
  h+='<div style="font-weight:bold;margin-bottom:6px;color:#9d6cff">📁 Способ 2: Загрузить файл</div>';
  h+='<input type="file" id="csv_file" accept=".csv,.txt" onchange="previewCsvFile()" style="margin:10px 0;padding:10px;background:#1f2530;border:1px solid #9d6cff;border-radius:8px;color:#fff;width:100%">';
  h+='<div id="csv_preview" style="margin-top:10px"></div>';
  h+='<button class="btn" id="csv_load_btn" style="width:100%;margin-top:10px;display:none" onclick="processCsvImport()">✅ Загрузить из файла</button>';
  h+='</div>';
  
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:15px" onclick="closeModal()">Отмена</button>';
  openModal(h);
}

function generateExample(){
  var example='2026-08-15;-500;Кофе в Starbucks\n2026-08-14;150000;Зарплата\n2026-08-13;-2500;Яндекс.Такси\n2026-08-12;-299;iCloud подписка\n2026-08-11;-1500;Продукты в Пятёрочке\n2026-08-10;50000;Фриланс проект\n2026-08-09;-3500;Бензин\n2026-08-08;-999;Netflix подписка';
  document.getElementById('csv_text').value=example;
}

function importFromText(){
  var text=document.getElementById('csv_text').value.trim();
  if(!text){alert('⚠️ Вставь данные в поле!');return;}
  var lines=text.split('\n').filter(function(l){return l.trim()!==''});
  var imp=0, skipped=0;
  for(var i=0;i<lines.length;i++){
    var p=lines[i].includes(';')?lines[i].split(';'):lines[i].split(',');
    if(p.length>=2){
      var ds=p[0].trim();
      var amt=parseFloat(p[1].trim().replace(/\s/g,'').replace(',','.'));
      var desc=p.length>=3?p[2].trim():'Импорт';
      if(!isNaN(amt)&&amt!==0&&(ds.includes('-')||ds.includes('.'))){
        if(ds.includes('.')){var d=ds.split('.');if(d.length===3)ds=d[2]+'-'+d[1]+'-'+d[0];}
        db.finances.unshift({id:uid(),date:ds.slice(0,10),type:amt>0?'in':'out',amt:Math.abs(amt),cat:autoCategorize(desc),note:desc});
        imp++;
      } else { skipped++; }
    } else { skipped++; }
  }
  save();
  alert('✅ Импортировано: '+imp+'\n⚠️ Пропущено: '+skipped);
  closeModal();
  renderFinances();
}

function previewCsvFile(){
  var fi=document.getElementById('csv_file');
  var preview=document.getElementById('csv_preview');
  var loadBtn=document.getElementById('csv_load_btn');
  if(!fi.files.length){preview.innerHTML='';loadBtn.style.display='none';return;}
  var r=new FileReader();
  r.onload=function(e){
    var lines=e.target.result.split('\n').filter(function(l){return l.trim()!==''});
    var valid=0, invalid=0;
    var start=lines[0].toLowerCase().includes('дата')?1:0;
    var previewHtml='<div class="card" style="background:#1a2035;padding:10px;margin-top:10px">';
    previewHtml+='<div style="font-size:13px;font-weight:bold;margin-bottom:8px">📋 Превью файла ('+lines.length+' строк)</div>';
    previewHtml+='<div style="max-height:200px;overflow:auto;font-size:11px;font-family:monospace">';
    for(var i=start;i<Math.min(lines.length,start+10);i++){
      var p=lines[i].includes(';')?lines[i].split(';'):lines[i].split(',');
      if(p.length>=2){
        var ds=p[0].trim();
        var amt=parseFloat(p[1].trim().replace(/\s/g,'').replace(',','.'));
        var desc=p.length>=3?p[2].trim():'Импорт';
        if(!isNaN(amt)&&amt!==0&&(ds.includes('-')||ds.includes('.'))){
          valid++;
          var color=amt>0?'#3ecf8e':'#ff6b6b';
          var sign=amt>0?'+':'';
          previewHtml+='<div style="padding:3px 0;border-bottom:1px solid #242b36"><span style="color:#8b94a7">'+ds+'</span> · <span style="color:'+color+';font-weight:bold">'+sign+amt+' ₽</span> · <span>'+desc+'</span></div>';
        } else {
          invalid++;
          previewHtml+='<div style="padding:3px 0;border-bottom:1px solid #242b36;color:#ff6b6b">⚠️ '+lines[i]+'</div>';
        }
      } else { invalid++; }
    }
    previewHtml+='</div>';
    previewHtml+='<div style="margin-top:8px;display:flex;justify-content:space-between;font-size:12px">';
    previewHtml+='<span style="color:#3ecf8e">✅ Готово к импорту: '+valid+'</span>';
    if(invalid>0) previewHtml+='<span style="color:#ff6b6b">⚠️ Пропущено: '+invalid+'</span>';
    previewHtml+='</div></div>';
    preview.innerHTML=previewHtml;
    if(valid>0) loadBtn.style.display='block';
  };
  r.readAsText(fi.files[0]);
}

function previewCsvFile(){
  var fi=document.getElementById('csv_file');
  var preview=document.getElementById('csv_preview');
  var loadBtn=document.getElementById('csv_load_btn');
  if(!fi.files.length){preview.innerHTML='';loadBtn.style.display='none';return;}
  var r=new FileReader();
  r.onload=function(e){
    var lines=e.target.result.split('\n').filter(function(l){return l.trim()!==''});
    var valid=0, invalid=0;
    var start=lines[0].toLowerCase().includes('дата')?1:0;
    var previewHtml='<div class="card" style="background:#1a2035;padding:10px;margin-top:10px">';
    previewHtml+='<div style="font-size:13px;font-weight:bold;margin-bottom:8px">📋 Превью файла ('+lines.length+' строк)</div>';
    previewHtml+='<div style="max-height:200px;overflow:auto;font-size:11px;font-family:monospace">';
    for(var i=start;i<Math.min(lines.length,start+10);i++){
      var p=lines[i].includes(';')?lines[i].split(';'):lines[i].split(',');
      if(p.length>=2){
        var ds=p[0].trim();
        var amt=parseFloat(p[1].trim().replace(/\s/g,'').replace(',','.'));
        var desc=p.length>=3?p[2].trim():'Импорт';
        if(!isNaN(amt)&&amt!==0&&(ds.includes('-')||ds.includes('.'))){
          valid++;
          var color=amt>0?'#3ecf8e':'#ff6b6b';
          var sign=amt>0?'+':'';
          previewHtml+='<div style="padding:3px 0;border-bottom:1px solid #242b36"><span style="color:#8b94a7">'+ds+'</span> · <span style="color:'+color+';font-weight:bold">'+sign+amt+' ₽</span> · <span>'+desc+'</span></div>';
        } else {
          invalid++;
          previewHtml+='<div style="padding:3px 0;border-bottom:1px solid #242b36;color:#ff6b6b">⚠️ '+lines[i]+'</div>';
        }
      } else {
        invalid++;
      }
    }
    previewHtml+='</div>';
    previewHtml+='<div style="margin-top:8px;display:flex;justify-content:space-between;font-size:12px">';
    previewHtml+='<span style="color:#3ecf8e">✅ Готово к импорту: '+valid+'</span>';
    if(invalid>0) previewHtml+='<span style="color:#ff6b6b">⚠️ Пропущено: '+invalid+'</span>';
    previewHtml+='</div></div>';
    preview.innerHTML=previewHtml;
    if(valid>0) loadBtn.style.display='block';
  };
  r.readAsText(fi.files[0]);
}
function processCsvImport(){
  var fi=document.getElementById('csv_file');
  if(!fi.files.length){alert('⚠️ Выберите файл!');return;}
  var r=new FileReader();
  r.onload=function(e){
    var lines=e.target.result.split('\n').filter(function(l){return l.trim()!==''});
    var imp=0;
    var start=lines[0].toLowerCase().includes('дата')?1:0;
    for(var i=start;i<lines.length;i++){
      var p=lines[i].includes(';')?lines[i].split(';'):lines[i].split(',');
      if(p.length>=2){
        var ds=p[0].trim();
        var amt=parseFloat(p[1].trim().replace(/\s/g,'').replace(',','.'));
        var desc=p.length>=3?p[2].trim():'Импорт';
        if(!isNaN(amt)&&amt!==0&&(ds.includes('-')||ds.includes('.'))){
          if(ds.includes('.')){var d=ds.split('.');if(d.length===3)ds=d[2]+'-'+d[1]+'-'+d[0];}
          db.finances.unshift({id:uid(),date:ds.slice(0,10),type:amt>0?'in':'out',amt:Math.abs(amt),cat:autoCategorize(desc),note:desc});
          imp++;
        }
      }
    }
    save();alert('✅ Импортировано: '+imp);closeModal();renderFinances();
  };
  r.readAsText(fi.files[0]);
}
// === 2. АКТИВЫ И ПАССИВЫ ===
function showNetWorth(){
  var ta=db.assets.reduce(function(a,b){return a+b.amt},0);
  var tl=db.liabilities.reduce(function(a,b){return a+b.amt},0);
  var h='<h3>💼 Активы и пассивы</h3>';
  h+='<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a;text-align:center">';
  h+='<div class="mut" style="color:#fff">Чистая стоимость</div>';
  h+='<div style="font-size:32px;font-weight:bold;color:'+(ta-tl>=0?'#3ecf8e':'#ff6b6b')+';margin:10px 0">'+formatCurrency(ta-tl)+'</div>';
  h+='<div style="display:flex;justify-content:space-around"><div><div class="mut">Активы</div><div style="color:#3ecf8e;font-weight:bold">'+formatCurrency(ta)+'</div></div><div><div class="mut">Пассивы</div><div style="color:#ff6b6b;font-weight:bold">'+formatCurrency(tl)+'</div></div></div></div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:15px">';
  h+='<button class="btn" style="background:#3ecf8e" onclick="addAssetLiability(\'asset\')">+ Актив</button>';
  h+='<button class="btn" style="background:#ff6b6b" onclick="addAssetLiability(\'liability\')">+ Пассив</button></div>';
  if(db.assets.length>0||db.liabilities.length>0){
    h+='<div style="margin-top:15px;max-height:40vh;overflow:auto">';
    db.assets.forEach(function(a,i){h+='<div class="card" style="margin:6px 0;padding:10px;border-left:3px solid #3ecf8e;display:flex;justify-content:space-between"><div><b>'+esc(a.name)+'</b></div><div style="color:#3ecf8e;font-weight:bold">'+formatCurrency(a.amt)+' <button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:2px 6px;font-size:10px" onclick="deleteAssetLiability(\'asset\','+i+')">🗑</button></div></div>';});
    db.liabilities.forEach(function(l,i){h+='<div class="card" style="margin:6px 0;padding:10px;border-left:3px solid #ff6b6b;display:flex;justify-content:space-between"><div><b>'+esc(l.name)+'</b></div><div style="color:#ff6b6b;font-weight:bold">'+formatCurrency(l.amt)+' <button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:2px 6px;font-size:10px" onclick="deleteAssetLiability(\'liability\','+i+')">🗑</button></div></div>';});
    h+='</div>';
  }
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}
function addAssetLiability(type){
  var h='<h3> '+(type==='asset'?'Актив':'Пассив')+'</h3>';
  h+='<label>Название</label><input id="al_name">';
  h+='<label>Сумма</label><input id="al_amt" type="number">';
  h+='<div style="display:flex;gap:10px;margin-top:15px"><button class="btn" onclick="saveAssetLiability(\''+type+'\')">💾</button><button class="btn" style="background:#1f2530" onclick="showNetWorth()">←</button></div>';
  openModal(h);
}
function saveAssetLiability(type){
  var n=document.getElementById('al_name').value.trim(),a=+document.getElementById('al_amt').value;
  if(!n||!a){alert('⚠️ Заполни поля!');return;}
  if(type==='asset')db.assets.push({name:n,amt:a});else db.liabilities.push({name:n,amt:a});
  save();showNetWorth();
}
function deleteAssetLiability(type,i){
  if(type==='asset')db.assets.splice(i,1);else db.liabilities.splice(i,1);
  save();showNetWorth();
}
// === 3. ПОДПИСКИ ===
function showSubscriptions(){
  var m=0,y=0;
  db.subscriptions.forEach(function(s){if(s.period==='year'){y+=s.amt;m+=s.amt/12;}else{m+=s.amt;y+=s.amt*12;}});
  var h='<h3> Менеджер подписок</h3>';
  h+='<div class="card" style="background:linear-gradient(135deg,#2f2a1a,#1a2035);border-color:#f59e0b;text-align:center"><div style="display:flex;justify-content:space-around"><div><div class="mut">В месяц</div><div style="font-size:20px;font-weight:bold;color:#f59e0b">'+formatCurrency(Math.round(m))+'</div></div><div><div class="mut">В год</div><div style="font-size:20px;font-weight:bold;color:#ff6b6b">'+formatCurrency(Math.round(y))+'</div></div></div></div>';
  if(db.subscriptions.length===0)h+='<div class="mut" style="text-align:center;padding:20px">Нет подписок</div>';
  else{h+='<div style="margin-top:15px;max-height:40vh;overflow:auto">';db.subscriptions.forEach(function(s,i){h+='<div class="card" style="margin:6px 0;padding:10px;display:flex;justify-content:space-between"><div><b>'+esc(s.name)+'</b><div class="mut" style="font-size:11px">'+(s.period==='month'?'Ежемесячно':'Ежегодно')+'</div></div><div style="font-weight:bold;color:#f59e0b">'+formatCurrency(s.amt)+' <button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:2px 6px;font-size:10px" onclick="deleteSubscription('+i+')">🗑</button></div></div>';});h+='</div>';}
  h+='<button class="btn" style="width:100%;margin-top:10px" onclick="addSubscription()">+ Подписка</button><button class="btn" style="background:#1f2530;width:100%;margin-top:8px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}
function addSubscription(){
  var h='<h3> Подписка</h3><label>Название</label><input id="sub_name"><label>Сумма</label><input id="sub_amt" type="number"><label>Период</label><select id="sub_period"><option value="month">Месяц</option><option value="year">Год</option></select><div style="display:flex;gap:10px;margin-top:15px"><button class="btn" onclick="saveSubscription()">💾</button><button class="btn" style="background:#1f2530" onclick="showSubscriptions()">←</button></div>';
  openModal(h);
}
function saveSubscription(){
  var n=document.getElementById('sub_name').value.trim(),a=+document.getElementById('sub_amt').value;
  if(!n||!a){alert('⚠️ Заполни поля!');return;}
  db.subscriptions.push({name:n,amt:a,period:document.getElementById('sub_period').value});
  save();showSubscriptions();
}
function deleteSubscription(i){if(confirm('Удалить?')){db.subscriptions.splice(i,1);save();showSubscriptions();}}

function showPots(){
  var h = '<h3>💰 Копилки (целевые накопления)</h3>';
  h += '<p class="mut">Откладывай на конкретные цели — визуализируй прогресс</p>';
  
  var totalSaved = 0, totalTarget = 0;
  db.pots.forEach(function(p){totalSaved += p.amount; totalTarget += p.target;});
  
  if(db.pots.length > 0){
    var totalPct = totalTarget > 0 ? Math.round(totalSaved/totalTarget*100) : 0;
    h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a;text-align:center">';
    h += '<div class="mut" style="color:#fff">Всего накоплено</div>';
    h += '<div style="font-size:28px;font-weight:bold;color:#3ecf8e;margin:8px 0">'+formatCurrency(totalSaved)+'</div>';
    h += '<div class="mut">из цели '+formatCurrency(totalTarget)+' ('+totalPct+'%)</div>';
    h += '<div class="bar" style="margin-top:10px"><i style="width:'+Math.min(totalPct,100)+'%;background:#3ecf8e"></i></div>';
    h += '</div>';
  }
  
  if(db.pots.length === 0){
    h += '<div class="mut" style="text-align:center;padding:20px">Пока нет копилок. Создай первую!</div>';
  } else {
    db.pots.forEach(function(p, i){
      var cat = POT_CATEGORIES[p.category] || POT_CATEGORIES.other;
      var pct = p.target > 0 ? Math.min(100, Math.round(p.amount/p.target*100)) : 0;
      var remaining = Math.max(0, p.target - p.amount);
      h += '<div class="card" style="margin:8px 0;border-left:4px solid '+cat.color+'">';
      h += '<div style="display:flex;justify-content:space-between;align-items:flex-start">';
      h += '<div style="flex:1"><div style="font-size:20px">'+cat.icon+'</div>';
      h += '<div style="font-weight:bold;margin-top:4px">'+esc(p.name)+'</div>';
      h += '<div class="mut" style="font-size:11px">'+cat.label+(p.deadline?' · до '+p.deadline:'')+'</div></div>';
      h += '<div style="text-align:right">';
      h += '<div style="font-size:16px;font-weight:bold;color:#3ecf8e">'+formatCurrency(p.amount)+'</div>';
      h += '<div class="mut" style="font-size:11px">из '+formatCurrency(p.target)+'</div>';
      h += '</div></div>';
      h += '<div class="bar" style="margin-top:8px"><i style="width:'+pct+'%;background:'+cat.color+'"></i></div>';
      h += '<div style="display:flex;justify-content:space-between;font-size:11px;margin-top:4px">';
      h += '<span class="mut">'+pct+'% · Осталось: '+formatCurrency(remaining)+'</span>';
      h += '<div style="display:flex;gap:4px">';
      h += '<button class="btn small" style="background:#3ecf8e;padding:3px 8px;font-size:11px" onclick="depositToPot('+i+')">➕</button>';
      h += '<button class="btn small" style="background:#1f2530;padding:3px 8px;font-size:11px" onclick="withdrawFromPot('+i+')">➖</button>';
      h += '<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:3px 8px;font-size:11px" onclick="deletePot('+i+')">🗑</button>';
      h += '</div></div></div>';
    });
  }
  
  h += '<button class="btn" style="width:100%;margin-top:10px" onclick="addPot()">+ Новая копилка</button>';
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:8px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function addPot(){
  var h = '<h3>➕ Новая копилка</h3>';
  h += '<label>Название цели</label><input id="pot_name" placeholder="Например: Новый MacBook">';
  h += '<label>Категория</label><select id="pot_cat">';
  Object.keys(POT_CATEGORIES).forEach(function(k){
    var c = POT_CATEGORIES[k];
    h += '<option value="'+k+'">'+c.icon+' '+c.label+' — '+c.desc+'</option>';
  });
  h += '</select>';
  h += '<label>Целевая сумма</label><input id="pot_target" type="number" placeholder="200000">';
  h += '<label>Начальная сумма (необязательно)</label><input id="pot_start" type="number" placeholder="0" value="0">';
  h += '<label>Дедлайн (необязательно)</label><input id="pot_deadline" type="date">';
  h += '<div style="display:flex;gap:10px;margin-top:15px">';
  h += '<button class="btn" onclick="savePot()">💾 Создать</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="showPots()">← Назад</button>';
  h += '</div>';
  openModal(h);
}

function savePot(){
  var name = document.getElementById('pot_name').value.trim();
  var target = +document.getElementById('pot_target').value;
  if(!name || !target){alert('⚠️ Заполни название и сумму!');return;}
  db.pots.push({
    name: name,
    category: document.getElementById('pot_cat').value,
    target: target,
    amount: +document.getElementById('pot_start').value || 0,
    deadline: document.getElementById('pot_deadline').value,
    created: today()
  });
  save();
  showPots();
}

function depositToPot(i){
  var p=db.pots[i];
  var msg='Сколько отложить в "'+p.name+'"?';
  var amt=+prompt(msg,1000);
  if(!amt||amt<=0){return;}
  p.amount+=amt;
  db.finances.unshift({id:uid(),date:today(),type:'out',amt:amt,cat:'Накопления',note:'-> '+p.name});
  save();
  alert('Отложено '+formatCurrency(amt)+' в "'+p.name+'"');
  showPots();
}

function withdrawFromPot(i){
  var p=db.pots[i];
  var msg='Сколько снять с "'+p.name+'"? Доступно: '+formatCurrency(p.amount);
  var amt=+prompt(msg,p.amount);
  if(!amt||amt<=0||amt>p.amount){alert('Неверная сумма');return;}
  p.amount-=amt;
  db.finances.unshift({id:uid(),date:today(),type:'in',amt:amt,cat:'Накопления',note:'<- '+p.name});
  save();
  alert('Снято '+formatCurrency(amt)+' из "'+p.name+'"');
  showPots();
}

function deletePot(i){
  var p=db.pots[i];
  if(!confirm('Удалить копилку "'+p.name+'"?')){return;}
  if(p.amount>0){
    db.finances.unshift({id:uid(),date:today(),type:'in',amt:p.amount,cat:'Накопления',note:'возврат из "'+p.name+'"'});
  }
  db.pots.splice(i,1);
  save();
  showPots();
}

// === УМНОЕ ПЛАНИРОВАНИЕ БЮДЖЕТА ===
function showSmartPlanning(){
  var now = new Date();
  var monthStr = now.toISOString().slice(0,7);
  var monthIncome = 0, monthExpense = 0;
  var byCategory = {needs:0, wants:0, savings:0, business:0, health:0, family:0};
  
  db.finances.forEach(function(f){
    if(!f.date || !f.date.startsWith(monthStr)) return;
    if(f.type === 'in') monthIncome += f.amt;
    else {
      monthExpense += f.amt;
      // Классификация расходов
      var c = (f.cat || '').toLowerCase();
      if(['накопления','резерв','подушка'].some(function(x){return c.includes(x)})) byCategory.savings += f.amt;
      else if(['реклама','подписки','оборудование','проект'].some(function(x){return c.includes(x)})) byCategory.business += f.amt;
      else if(['здоровье','спорт','медицина'].some(function(x){return c.includes(x)})) byCategory.health += f.amt;
      else if(['семья','подарки','дети'].some(function(x){return c.includes(x)})) byCategory.family += f.amt;
      else if(['аренда','еда','транспорт','коммуналка'].some(function(x){return c.includes(x)})) byCategory.needs += f.amt;
      else byCategory.wants += f.amt;
    }
  });
  
  var tax = calculateTax(monthIncome);
  var netIncome = monthIncome - tax.amount;
  var freeMoney = netIncome - monthExpense;
  
  // Правило 50/30/20
  var needLimit = Math.round(netIncome * 0.5);
  var wantLimit = Math.round(netIncome * 0.3);
  var saveLimit = Math.round(netIncome * 0.2);
  
  var h = '<h3>📊 Умное планирование бюджета</h3>';
  h += '<p class="mut">Анализ за '+['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'][now.getMonth()]+'</p>';
  
  // Главный блок
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:center">';
  h += '<div><div class="mut" style="color:#fff">Доход</div><div style="font-size:18px;font-weight:bold;color:#3ecf8e">'+formatCurrency(monthIncome)+'</div></div>';
  h += '<div><div class="mut" style="color:#fff">После налогов</div><div style="font-size:18px;font-weight:bold;color:#6c8cff">'+formatCurrency(netIncome)+'</div></div>';
  h += '<div><div class="mut" style="color:#fff">Расходы</div><div style="font-size:18px;font-weight:bold;color:#ff6b6b">'+formatCurrency(monthExpense)+'</div></div>';
  h += '<div><div class="mut" style="color:#fff">Свободные</div><div style="font-size:18px;font-weight:bold;color:'+(freeMoney>=0?'#3ecf8e':'#ff6b6b')+'">'+formatCurrency(freeMoney)+'</div></div>';
  h += '</div></div>';
  
  // Правило 50/30/20
  h += '<div class="card"><h3>📐 Правило 50/30/20</h3>';
  h += '<div class="mut" style="font-size:12px;margin-bottom:10px">Классическая формула финансового здоровья</div>';
  
  var needsData = [
    {label:'🏠 Необходимое (50%)', current:byCategory.needs, limit:needLimit, color:'#6c8cff'},
    {label:'🎁 Желания (30%)', current:byCategory.wants, limit:wantLimit, color:'#9d6cff'},
    {label:'💰 Накопления (20%)', current:byCategory.savings, limit:saveLimit, color:'#3ecf8e'}
  ];
  
  needsData.forEach(function(d){
    var pct = d.limit > 0 ? Math.min(150, Math.round(d.current/d.limit*100)) : 0;
    var color = pct > 100 ? '#ff6b6b' : pct > 80 ? '#f59e0b' : d.color;
    h += '<div style="margin:10px 0">';
    h += '<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px"><span>'+d.label+'</span><b style="color:'+color+'">'+formatCurrency(d.current)+' / '+formatCurrency(d.limit)+'</b></div>';
    h += '<div class="bar"><i style="width:'+Math.min(pct,100)+'%;background:'+color+'"></i></div>';
    h += '</div>';
  });
  h += '</div>';
  
  // Баланс сфер жизни
  h += '<div class="card"><h3>⚖️ Баланс сфер жизни</h3>';
  h += '<div class="mut" style="font-size:12px;margin-bottom:10px">Распределение расходов по сферам</div>';
  
  var spheres = [
    {label:'💼 Бизнес', value:byCategory.business, color:'#6c8cff'},
    {label:'🏠 Семья', value:byCategory.family, color:'#3ecf8e'},
    {label:'❤️ Здоровье', value:byCategory.health, color:'#ff6b6b'},
    {label:'📚 Обучение', value:byCategory.savings, color:'#f59e0b'},
    {label:'🏠 Необходимое', value:byCategory.needs, color:'#8b5cf6'},
    {label:'🎁 Желания', value:byCategory.wants, color:'#ec4899'}
  ];
  
  var totalSpheres = spheres.reduce(function(a,s){return a+s.value},0) || 1;
  spheres.forEach(function(s){
    var pct = Math.round(s.value/totalSpheres*100);
    h += '<div style="margin:8px 0">';
    h += '<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px"><span>'+s.label+'</span><b>'+formatCurrency(s.value)+' ('+pct+'%)</b></div>';
    h += '<div class="bar"><i style="width:'+pct+'%;background:'+s.color+'"></i></div>';
    h += '</div>';
  });
  h += '</div>';
  
  // Настройки плана
  h += '<div class="card"><h3>⚙️ Твой план на месяц</h3>';
  h += '<label>Обязательные расходы (аренда, еда, коммуналка)</label>';
  h += '<input id="plan_needs" type="number" value="'+db.monthlyNeeds+'" style="margin-bottom:8px">';
  h += '<label>Желания (развлечения, хобби)</label>';
  h += '<input id="plan_wants" type="number" value="'+db.monthlyWants+'" style="margin-bottom:8px">';
  h += '<label>Целевые накопления</label>';
  h += '<input id="plan_savings" type="number" value="'+db.monthlySavings+'" style="margin-bottom:8px">';
  h += '<button class="btn" style="width:100%" onclick="savePlan()">💾 Сохранить план</button>';
  h += '</div>';
  
  // Рекомендации
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
  h += '<h3 style="color:#fff;margin:0 0 10px 0">💡 Рекомендации</h3>';
  var recs = getPlanningRecommendations(monthIncome, netIncome, monthExpense, byCategory);
  recs.forEach(function(r){
    h += '<div style="padding:8px 0;border-bottom:1px solid #242b36;font-size:13px"><span style="color:'+r.color+'">'+r.icon+'</span> '+r.text+'</div>';
  });
  if(recs.length === 0) h += '<div class="mut" style="text-align:center;padding:10px">Всё сбалансировано! 👍</div>';
  h += '</div>';
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function getPlanningRecommendations(income, netIncome, expense, cats){
  var recs = [];
  if(income === 0) return recs;
  
  // Проверка финансовой подушки
  var safetyPot = db.pots.find(function(p){return p.category === 'safety'});
  var monthlyExpense = expense || db.monthlyNeeds + db.monthlyWants;
  if(!safetyPot || safetyPot.amount < monthlyExpense * 3){
    recs.push({icon:'🛡', color:'#f59e0b', text:'Создай финансовую подушку на 3-6 месяцев расходов ('+formatCurrency(monthlyExpense*3)+' — '+formatCurrency(monthlyExpense*6)+')'});
  }
  
  // Баланс сфер
  if(cats.health === 0 && income > 50000){
    recs.push({icon:'❤️', color:'#ff6b6b', text:'Нет расходов на здоровье. Инвестируй в спорт/медицину — это окупается'});
  }
  if(cats.family === 0 && income > 100000){
    recs.push({icon:'🏠', color:'#3ecf8e', text:'Нет расходов на семью. Подумай о подарках/совместном отдыхе'});
  }
  if(cats.business > netIncome * 0.5){
    recs.push({icon:'💼', color:'#6c8cff', text:'Бизнес-расходы >50% дохода. Проверь, все ли они необходимы'});
  }
  if(cats.wants > netIncome * 0.3){
    recs.push({icon:'🎁', color:'#ec4899', text:'Расходы на желания превышают 30%. Попробуй правило 48 часов перед покупкой'});
  }
  if(cats.savings < netIncome * 0.1){
    recs.push({icon:'💰', color:'#3ecf8e', text:'Откладываешь менее 10%. Цель — минимум 20% дохода'});
  }
  
  // Налоги
  var tax = calculateTax(income);
  if(db.taxReserve < tax.amount * 0.8){
    recs.push({icon:'🧾', color:'#f59e0b', text:'Резерв на налоги мал. Отложи '+formatCurrency(tax.amount - db.taxReserve)+' срочно'});
  }
  
  // Копилки
  var overduePots = db.pots.filter(function(p){return p.deadline && p.deadline < today() && p.amount < p.target});
  if(overduePots.length > 0){
    recs.push({icon:'⏰', color:'#ff6b6b', text:overduePots.length+' копилок с просроченным дедлайном. Пересмотри цели или увеличь отчисления'});
  }
  
  return recs;
}

function savePlan(){
  db.monthlyNeeds = +document.getElementById('plan_needs').value || 0;
  db.monthlyWants = +document.getElementById('plan_wants').value || 0;
  db.monthlySavings = +document.getElementById('plan_savings').value || 0;
  save();
  alert('✅ План сохранён!');
  showSmartPlanning();
}

// === БАЛАНС ЖИЗНИ ===
function showLifeBalance(){
  var now = new Date();
  var monthStr = now.toISOString().slice(0,7);
  var byCategory = {work:0, health:0, family:0, growth:0, rest:0};
  
  db.finances.forEach(function(f){
    if(!f.date || !f.date.startsWith(monthStr) || f.type !== 'out') return;
    var c = (f.cat || '').toLowerCase();
    if(['проект','реклама','подписки','оборудование'].some(function(x){return c.includes(x)})) byCategory.work += f.amt;
    else if(['здоровье','спорт','медицина'].some(function(x){return c.includes(x)})) byCategory.health += f.amt;
    else if(['семья','подарки','дети'].some(function(x){return c.includes(x)})) byCategory.family += f.amt;
    else if(['обучение','накопления','книги'].some(function(x){return c.includes(x)})) byCategory.growth += f.amt;
    else byCategory.rest += f.amt;
  });
  
  var total = Object.values(byCategory).reduce(function(a,b){return a+b},0) || 1;
  
  var h = '<h3>⚖️ Баланс жизни</h3>';
  h += '<p class="mut">На что ты тратишь деньги — туда идёт твоя энергия</p>';
  
  // Визуализация
  h += '<div class="card" style="text-align:center;padding:20px">';
  var spheres = [
    {key:'work', label:'💼 Работа', color:'#6c8cff'},
    {key:'health', label:'❤️ Здоровье', color:'#ff6b6b'},
    {key:'family', label:'🏠 Семья', color:'#3ecf8e'},
    {key:'growth', label:'📚 Развитие', color:'#f59e0b'},
    {key:'rest', label:'🎉 Отдых', color:'#9d6cff'}
  ];
  
  // Круговая диаграмма через conic-gradient
  var gradientParts = [];
  var currentAngle = 0;
  spheres.forEach(function(s){
    var pct = byCategory[s.key] / total * 100;
    gradientParts.push(s.color+' '+currentAngle+'% '+(currentAngle+pct)+'%');
    currentAngle += pct;
  });
  
  h += '<div style="width:200px;height:200px;border-radius:50%;margin:0 auto;background:conic-gradient('+gradientParts.join(',')+');box-shadow:0 4px 20px rgba(0,0,0,0.3)"></div>';
  h += '<div style="margin-top:15px;display:grid;grid-template-columns:1fr 1fr;gap:8px;text-align:left">';
  spheres.forEach(function(s){
    var pct = Math.round(byCategory[s.key]/total*100);
    h += '<div style="display:flex;align-items:center;gap:6px;font-size:12px"><span style="width:12px;height:12px;background:'+s.color+';border-radius:2px"></span>'+s.label+' <b>'+pct+'%</b></div>';
  });
  h += '</div></div>';
  
  // Анализ
  h += '<div class="card"><h3>🔍 Анализ баланса</h3>';
  var workPct = byCategory.work / total * 100;
  var healthPct = byCategory.health / total * 100;
  var familyPct = byCategory.family / total * 100;
  
  if(workPct > 60){
    h += '<div style="padding:10px;background:#2f1a1a;border-radius:8px;margin:6px 0;border-left:3px solid #ff6b6b"><b>⚠️ Перекос в работу ('+Math.round(workPct)+'%)</b><div class="mut" style="font-size:12px;margin-top:4px">Ты вкладываешь слишком много в работу. Риск выгорания. Добавь здоровье и отдых.</div></div>';
  }
  if(healthPct < 5 && total > 50000){
    h += '<div style="padding:10px;background:#2f2a1a;border-radius:8px;margin:6px 0;border-left:3px solid #f59e0b"><b>⚠️ Мало внимания здоровью</b><div class="mut" style="font-size:12px;margin-top:4px">Здоровье — главный актив. Инвестируй в спорт, медицину, сон.</div></div>';
  }
  if(familyPct < 5 && total > 100000){
    h += '<div style="padding:10px;background:#2f2a1a;border-radius:8px;margin:6px 0;border-left:3px solid #f59e0b"><b>⚠️ Мало вложений в семью</b><div class="mut" style="font-size:12px;margin-top:4px">Семья даёт энергию. Совместный отдых, подарки, время вместе.</div></div>';
  }
  if(workPct < 50 && healthPct > 10 && familyPct > 10){
    h += '<div style="padding:10px;background:#1a2f1f;border-radius:8px;margin:6px 0;border-left:3px solid #3ecf8e"><b>✅ Отличный баланс!</b><div class="mut" style="font-size:12px;margin-top:4px">Ты инвестируешь во все сферы жизни. Так держать!</div></div>';
  }
  h += '</div>';
  
  // Целевые показатели
  h += '<div class="card"><h3>🎯 Идеальное распределение</h3>';
  h += '<div class="mut" style="font-size:12px;margin-bottom:10px">По рекомендациям экспертов:</div>';
  var ideals = [
    {label:'💼 Работа/Бизнес', ideal:40},
    {label:'❤️ Здоровье', ideal:15},
    {label:'🏠 Семья', ideal:20},
    {label:'📚 Развитие', ideal:15},
    {label:'🎉 Отдых', ideal:10}
  ];
  ideals.forEach(function(i){
    h += '<div style="display:flex;justify-content:space-between;font-size:13px;padding:4px 0"><span>'+i.label+'</span><b style="color:#6c8cff">'+i.ideal+'%</b></div>';
  });
  h += '</div>';
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}


// === УЛУЧШЕННОЕ УМНОЕ ПЛАНИРОВАНИЕ ===
function showSmartPlanning(){
  var now = new Date();
  var monthStr = now.toISOString().slice(0,7);
  var monthIncome = 0, monthExpense = 0;
  var byCategory = {needs:0, wants:0, savings:0, business:0, health:0, family:0};
  var monthlyData = [];
  
  // Собираем данные за последние 6 месяцев
  for(var i=5; i>=0; i--){
    var d = new Date(now.getFullYear(), now.getMonth()-i, 1);
    var key = d.toISOString().slice(0,7);
    var inc = 0, exp = 0;
    db.finances.forEach(function(f){
      if(!f.date || !f.date.startsWith(key)) return;
      if(f.type === 'in') inc += f.amt;
      else exp += f.amt;
    });
    monthlyData.push({month: key, income: inc, expense: exp});
  }
  
  // Текущий месяц
  db.finances.forEach(function(f){
    if(!f.date || !f.date.startsWith(monthStr)) return;
    if(f.type === 'in') monthIncome += f.amt;
    else {
      monthExpense += f.amt;
      var c = (f.cat || '').toLowerCase();
      if(['накопления','резерв','подушка'].some(function(x){return c.includes(x)})) byCategory.savings += f.amt;
      else if(['реклама','подписки','оборудование','проект'].some(function(x){return c.includes(x)})) byCategory.business += f.amt;
      else if(['здоровье','спорт','медицина'].some(function(x){return c.includes(x)})) byCategory.health += f.amt;
      else if(['семья','подарки','дети'].some(function(x){return c.includes(x)})) byCategory.family += f.amt;
      else if(['аренда','еда','транспорт','коммуналка'].some(function(x){return c.includes(x)})) byCategory.needs += f.amt;
      else byCategory.wants += f.amt;
    }
  });
  
  var tax = calculateTax(monthIncome);
  var netIncome = monthIncome - tax.amount;
  var freeMoney = netIncome - monthExpense;
  
  // Правило 50/30/20
  var needLimit = Math.round(netIncome * 0.5);
  var wantLimit = Math.round(netIncome * 0.3);
  var saveLimit = Math.round(netIncome * 0.2);
  
  // Тренд дохода
  var trend = 0;
  if(monthlyData.length >= 2){
    var lastMonth = monthlyData[monthlyData.length-1].income;
    var prevMonth = monthlyData[monthlyData.length-2].income;
    if(prevMonth > 0) trend = Math.round((lastMonth - prevMonth) / prevMonth * 100);
  }
  
  // Прогноз на 3 месяца
  var avgIncome = monthlyData.reduce(function(a,m){return a+m.income},0) / monthlyData.length;
  var forecast3m = Math.round(avgIncome * 3);
  
  // Анализ утечек (мелкие регулярные расходы)
  var smallExpenses = db.finances.filter(function(f){
    return f.type === 'out' && f.amt < 1000 && f.date && f.date.startsWith(monthStr);
  });
  var totalSmall = smallExpenses.reduce(function(a,f){return a+f.amt},0);
  
  var h = '<h3>📊 Умное планирование бюджета</h3>';
  h += '<p class="mut">Анализ за '+['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'][now.getMonth()]+'</p>';
  
  // Главный блок
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:center">';
  h += '<div><div class="mut" style="color:#fff">Доход</div><div style="font-size:18px;font-weight:bold;color:#3ecf8e">'+formatCurrency(monthIncome)+'</div></div>';
  h += '<div><div class="mut" style="color:#fff">После налогов</div><div style="font-size:18px;font-weight:bold;color:#6c8cff">'+formatCurrency(netIncome)+'</div></div>';
  h += '<div><div class="mut" style="color:#fff">Расходы</div><div style="font-size:18px;font-weight:bold;color:#ff6b6b">'+formatCurrency(monthExpense)+'</div></div>';
  h += '<div><div class="mut" style="color:#fff">Свободные</div><div style="font-size:18px;font-weight:bold;color:'+(freeMoney>=0?'#3ecf8e':'#ff6b6b')+'">'+formatCurrency(freeMoney)+'</div></div>';
  h += '</div></div>';
  
  // Тренд и прогноз
  h += '<div class="card"><h3> Тренд и прогноз</h3>';
  var trendColor = trend >= 0 ? '#3ecf8e' : '#ff6b6b';
  var trendArrow = trend >= 0 ? '↑' : '↓';
  h += '<div style="display:flex;justify-content:space-between;margin-bottom:10px">';
  h += '<div><div class="mut">Тренд дохода</div><div style="font-size:20px;font-weight:bold;color:'+trendColor+'">'+trendArrow+' '+Math.abs(trend)+'%</div></div>';
  h += '<div><div class="mut">Прогноз на 3 мес.</div><div style="font-size:20px;font-weight:bold;color:#9d6cff">'+formatCurrency(forecast3m)+'</div></div>';
  h += '</div>';
  
  // График за 6 месяцев
  var maxVal = Math.max.apply(null, monthlyData.map(function(m){return Math.max(m.income, m.expense)})) || 1;
  h += '<div class="chart" style="height:120px">';
  monthlyData.forEach(function(m){
    var hIn = (m.income/maxVal)*100;
    var hOut = (m.expense/maxVal)*100;
    h += '<div style="flex:1;display:flex;gap:2px;align-items:flex-end;height:100%">';
    h += '<div style="flex:1;background:#3ecf8e;border-radius:3px 3px 0 0;height:'+Math.max(hIn,2)+'%"></div>';
    h += '<div style="flex:1;background:#ff6b6b;border-radius:3px 3px 0 0;height:'+Math.max(hOut,2)+'%"></div>';
    h += '</div>';
  });
  h += '</div>';
  h += '<div style="display:flex;gap:15px;margin-top:10px;font-size:12px">';
  h += '<div><span style="display:inline-block;width:12px;height:12px;background:#3ecf8e;border-radius:2px"></span> Доходы</div>';
  h += '<div><span style="display:inline-block;width:12px;height:12px;background:#ff6b6b;border-radius:2px"></span> Расходы</div>';
  h += '</div>';
  h += '</div>';
  
  // Правило 50/30/20
  h += '<div class="card"><h3>📐 Правило 50/30/20</h3>';
  h += '<div class="mut" style="font-size:12px;margin-bottom:10px">Классическая формула финансового здоровья</div>';
  
  var needsData = [
    {label:'🏠 Необходимое (50%)', current:byCategory.needs, limit:needLimit, color:'#6c8cff'},
    {label:'🎁 Желания (30%)', current:byCategory.wants, limit:wantLimit, color:'#9d6cff'},
    {label:'💰 Накопления (20%)', current:byCategory.savings, limit:saveLimit, color:'#3ecf8e'}
  ];
  
  needsData.forEach(function(d){
    var pct = d.limit > 0 ? Math.min(150, Math.round(d.current/d.limit*100)) : 0;
    var color = pct > 100 ? '#ff6b6b' : pct > 80 ? '#f59e0b' : d.color;
    h += '<div style="margin:10px 0">';
    h += '<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px"><span>'+d.label+'</span><b style="color:'+color+'">'+formatCurrency(d.current)+' / '+formatCurrency(d.limit)+'</b></div>';
    h += '<div class="bar"><i style="width:'+Math.min(pct,100)+'%;background:'+color+'"></i></div>';
    h += '</div>';
  });
  h += '</div>';
  
  // Анализ утечек
  if(smallExpenses.length > 0){
    h += '<div class="card" style="background:linear-gradient(135deg,#2f2a1a,#1a2035);border-color:#f59e0b">';
    h += '<h3 style="color:#f59e0b;margin:0 0 10px 0">⚠️ Анализ "утечек"</h3>';
    h += '<div class="mut" style="font-size:12px;margin-bottom:10px">Мелкие расходы до 1000 ₽ за месяц</div>';
    h += '<div style="display:flex;justify-content:space-between;margin-bottom:10px">';
    h += '<div><div class="mut">Количество</div><div style="font-size:20px;font-weight:bold;color:#f59e0b">'+smallExpenses.length+'</div></div>';
    h += '<div><div class="mut">Сумма</div><div style="font-size:20px;font-weight:bold;color:#f59e0b">'+formatCurrency(totalSmall)+'</div></div>';
    h += '</div>';
    h += '<div class="mut" style="font-size:12px">💡 Если откладывать эти деньги, за год накопишь '+formatCurrency(totalSmall*12)+'</div>';
    h += '</div>';
  }
  
  // Стоимость часа жизни
  var hourlyRate = db.hourlyRate || 2000;
  h += '<div class="card"><h3> Стоимость часа жизни</h3>';
  h += '<div class="mut" style="font-size:12px;margin-bottom:10px">Твоя ставка: '+formatCurrency(hourlyRate)+'/час</div>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center">';
  var items = [
    {name:'Кофе 300₽', hours: Math.ceil(300/hourlyRate)},
    {name:'Ужин 1500₽', hours: Math.ceil(1500/hourlyRate)},
    {name:'iPhone 100К', hours: Math.ceil(100000/hourlyRate)}
  ];
  items.forEach(function(item){
    h += '<div><div class="mut" style="font-size:11px">'+item.name+'</div><div style="font-size:16px;font-weight:bold;color:#9d6cff">'+item.hours+' ч.</div></div>';
  });
  h += '</div>';
  h += '<button class="btn small" style="background:#1f2530;margin-top:10px;width:100%" onclick="editHourlyRate()">️ Изменить ставку</button>';
  h += '</div>';
  
  // Рекомендации
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
  h += '<h3 style="color:#fff;margin:0 0 10px 0">💡 Рекомендации</h3>';
  var recs = getPlanningRecommendations(monthIncome, netIncome, monthExpense, byCategory);
  recs.forEach(function(r){
    h += '<div style="padding:8px 0;border-bottom:1px solid #242b36;font-size:13px"><span style="color:'+r.color+'">'+r.icon+'</span> '+r.text+'</div>';
  });
  if(recs.length === 0) h += '<div class="mut" style="text-align:center;padding:10px">Всё сбалансировано! </div>';
  h += '</div>';
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function editHourlyRate(){
  var current = db.hourlyRate || 2000;
  var val = prompt('Твоя ставка в час (₽):', current);
  if(val === null) return;
  var rate = +val;
  if(rate > 0){
    db.hourlyRate = rate;
    save();
    alert('✅ Ставка обновлена: '+formatCurrency(rate)+'/час');
    showSmartPlanning();
  }
}

// === АНАЛИЗ УТЕЧЕК ===
function showLeakAnalysis(){
  var now = new Date();
  var monthStr = now.toISOString().slice(0,7);
  
  // Находим все мелкие расходы (< 1000 ₽)
  var smallExpenses = db.finances.filter(function(f){
    return f.type === 'out' && f.amt < 1000 && f.date && f.date.startsWith(monthStr);
  });
  
  // Группируем по категориям
  var byCategory = {};
  smallExpenses.forEach(function(f){
    byCategory[f.cat] = (byCategory[f.cat] || 0) + f.amt;
  });
  
  var totalSmall = smallExpenses.reduce(function(a,f){return a+f.amt},0);
  var yearlyPotential = totalSmall * 12;
  
  var h = '<h3>⚠️ Анализ "утечек" денег</h3>';
  h += '<p class="mut">Мелкие расходы до 1000 ₽ за '+['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'][now.getMonth()]+'</p>';
  
  h += '<div class="card" style="background:linear-gradient(135deg,#2f2a1a,#1a2035);border-color:#f59e0b;text-align:center">';
  h += '<div class="mut" style="color:#fff">Потенциал накоплений за год</div>';
  h += '<div style="font-size:28px;font-weight:bold;color:#f59e0b;margin:10px 0">'+formatCurrency(yearlyPotential)+'</div>';
  h += '<div class="mut">если откладывать все мелкие расходы</div>';
  h += '</div>';
  
  if(smallExpenses.length === 0){
    h += '<div class="mut" style="text-align:center;padding:20px">Нет мелких расходов за этот месяц 👍</div>';
  } else {
    h += '<div class="card"><h3>📊 По категориям</h3>';
    Object.keys(byCategory).sort(function(a,b){return byCategory[b]-byCategory[a]}).forEach(function(cat){
      var pct = Math.round(byCategory[cat]/totalSmall*100);
      h += '<div style="margin:8px 0">';
      h += '<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px"><span>'+esc(cat)+'</span><b>'+formatCurrency(byCategory[cat])+' ('+pct+'%)</b></div>';
      h += '<div class="bar"><i style="width:'+pct+'%;background:#f59e0b"></i></div>';
      h += '</div>';
    });
    h += '</div>';
    
    h += '<div class="card"><h3>📋 Последние мелкие расходы</h3>';
    smallExpenses.sort(function(a,b){return b.date.localeCompare(a.date)}).slice(0,10).forEach(function(f){
      h += '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #242b36;font-size:12px">';
      h += '<div><div>'+esc(f.cat)+'</div><div class="mut">'+f.date+'</div></div>';
      h += '<div style="color:#f59e0b;font-weight:bold">'+formatCurrency(f.amt)+'</div>';
      h += '</div>';
    });
    h += '</div>';
  }
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

// === КАЛЬКУЛЯТОР СЛОЖНЫХ ПРОЦЕНТОВ ===
function showCompoundCalculator(){
  var h = '<h3>💰 Калькулятор сложных процентов</h3>';
  h += '<p class="mut">Узнай, сколько заработаешь если откладывать регулярно</p>';
  
  h += '<label>Начальная сумма (₽)</label><input id="cc_initial" type="number" value="10000">';
  h += '<label>Ежемесячное пополнение (₽)</label><input id="cc_monthly" type="number" value="5000">';
  h += '<label>Годовая ставка (%)</label><input id="cc_rate" type="number" value="10" step="0.1">';
  h += '<label>Срок (лет)</label><input id="cc_years" type="number" value="5">';
  
  h += '<button class="btn" style="width:100%;margin-top:10px" onclick="calculateCompound()"> Рассчитать</button>';
  h += '<div id="cc_result" style="margin-top:15px"></div>';
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function calculateCompound(){
  var initial = +document.getElementById('cc_initial').value || 0;
  var monthly = +document.getElementById('cc_monthly').value || 0;
  var rate = +document.getElementById('cc_rate').value || 0;
  var years = +document.getElementById('cc_years').value || 0;
  
  var monthlyRate = rate / 100 / 12;
  var months = years * 12;
  var total = initial;
  
  for(var i=0; i<months; i++){
    total = total * (1 + monthlyRate) + monthly;
  }
  
  var totalInvested = initial + (monthly * months);
  var profit = total - totalInvested;
  
  var h = '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a;text-align:center">';
  h += '<div class="mut" style="color:#fff">Итоговая сумма</div>';
  h += '<div style="font-size:28px;font-weight:bold;color:#3ecf8e;margin:10px 0">'+formatCurrency(Math.round(total))+'</div>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:15px">';
  h += '<div><div class="mut">Вложено</div><div style="font-size:16px;font-weight:bold;color:#6c8cff">'+formatCurrency(totalInvested)+'</div></div>';
  h += '<div><div class="mut">Прибыль</div><div style="font-size:16px;font-weight:bold;color:#f59e0b">'+formatCurrency(Math.round(profit))+'</div></div>';
  h += '</div></div>';
  
  document.getElementById('cc_result').innerHTML = h;
}

// === ГОДОВОЕ СРАВНЕНИЕ ===
function showYearComparison(){
  var now = new Date();
  var currentYear = now.getFullYear();
  var prevYear = currentYear - 1;
  
  var currentYearIncome = 0, prevYearIncome = 0;
  var currentYearExpense = 0, prevYearExpense = 0;
  
  db.finances.forEach(function(f){
    if(!f.date) return;
    var year = f.date.slice(0,4);
    if(year == currentYear){
      if(f.type === 'in') currentYearIncome += f.amt;
      else currentYearExpense += f.amt;
    } else if(year == prevYear){
      if(f.type === 'in') prevYearIncome += f.amt;
      else prevYearExpense += f.amt;
    }
  });
  
  var incomeGrowth = prevYearIncome > 0 ? Math.round((currentYearIncome - prevYearIncome) / prevYearIncome * 100) : 0;
  var expenseGrowth = prevYearExpense > 0 ? Math.round((currentYearExpense - prevYearExpense) / prevYearExpense * 100) : 0;
  
  var h = '<h3> Годовое сравнение</h3>';
  h += '<p class="mut">'+prevYear+' vs '+currentYear+'</p>';
  
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
  h += '<h3 style="color:#fff;margin:0 0 15px 0">💰 Доходы</h3>';
  h += '<div style="display:flex;justify-content:space-between;margin-bottom:10px">';
  h += '<div><div class="mut" style="color:#fff">'+prevYear+'</div><div style="font-size:20px;font-weight:bold;color:#6c8cff">'+formatCurrency(prevYearIncome)+'</div></div>';
  h += '<div><div class="mut" style="color:#fff">'+currentYear+'</div><div style="font-size:20px;font-weight:bold;color:#3ecf8e">'+formatCurrency(currentYearIncome)+'</div></div>';
  h += '</div>';
  var incomeColor = incomeGrowth >= 0 ? '#3ecf8e' : '#ff6b6b';
  var incomeArrow = incomeGrowth >= 0 ? '↑' : '↓';
  h += '<div style="text-align:center;font-size:18px;font-weight:bold;color:'+incomeColor+'">'+incomeArrow+' '+Math.abs(incomeGrowth)+'%</div>';
  h += '</div>';
  
  h += '<div class="card">';
  h += '<h3 style="margin:0 0 15px 0">💸 Расходы</h3>';
  h += '<div style="display:flex;justify-content:space-between;margin-bottom:10px">';
  h += '<div><div class="mut">'+prevYear+'</div><div style="font-size:20px;font-weight:bold;color:#6c8cff">'+formatCurrency(prevYearExpense)+'</div></div>';
  h += '<div><div class="mut">'+currentYear+'</div><div style="font-size:20px;font-weight:bold;color:#ff6b6b">'+formatCurrency(currentYearExpense)+'</div></div>';
  h += '</div>';
  var expenseColor = expenseGrowth <= 0 ? '#3ecf8e' : '#ff6b6b';
  var expenseArrow = expenseGrowth <= 0 ? '↓' : '↑';
  h += '<div style="text-align:center;font-size:18px;font-weight:bold;color:'+expenseColor+'">'+expenseArrow+' '+Math.abs(expenseGrowth)+'%</div>';
  h += '</div>';
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

// === БЫСТРЫЕ ШАБЛОНЫ ОПЕРАЦИЙ ===
function showQuickTemplates(){
  var h = '<h3>⚡ Быстрые шаблоны операций</h3>';
  h += '<p class="mut">Частые платежи в один клик</p>';
  
  if(db.quickTemplates.length === 0){
    h += '<div class="mut" style="text-align:center;padding:20px">Нет шаблонов. Создай первый!</div>';
  } else {
    db.quickTemplates.forEach(function(t, i){
      h += '<div class="card" style="margin:8px 0">';
      h += '<div style="display:flex;justify-content:space-between;align-items:center">';
      h += '<div><b>'+esc(t.name)+'</b><div class="mut" style="font-size:12px">'+formatCurrency(t.amt)+' · '+esc(t.cat)+'</div></div>';
      h += '<div style="display:flex;gap:6px">';
      h += '<button class="btn small" style="background:#3ecf8e" onclick="executeQuickTemplate('+i+')">▶</button>';
      h += '<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:4px 8px" onclick="deleteQuickTemplate('+i+')">🗑</button>';
      h += '</div></div></div>';
    });
  }
  
  h += '<button class="btn" style="width:100%;margin-top:10px" onclick="addQuickTemplate()">+ Новый шаблон</button>';
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:8px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function addQuickTemplate(){
  var h = '<h3>➕ Новый быстрый шаблон</h3>';
  h += '<label>Название</label><input id="qt_name" placeholder="Например: Хостинг, Figma">';
  h += '<label>Сумма</label><input id="qt_amt" type="number" placeholder="500">';
  h += '<label>Тип</label><select id="qt_type"><option value="out">Расход</option><option value="in">Доход</option></select>';
  h += '<label>Категория</label><input id="qt_cat" value="Подписки">';
  h += '<div style="display:flex;gap:10px;margin-top:15px">';
  h += '<button class="btn" onclick="saveQuickTemplate()">💾 Сохранить</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="showQuickTemplates()">← Назад</button>';
  h += '</div>';
  openModal(h);
}

function saveQuickTemplate(){
  var name = document.getElementById('qt_name').value.trim();
  var amt = +document.getElementById('qt_amt').value;
  if(!name || !amt){alert('⚠️ Заполни поля!');return;}
  db.quickTemplates.push({
    name: name,
    amt: amt,
    type: document.getElementById('qt_type').value,
    cat: document.getElementById('qt_cat').value
  });
  save();
  showQuickTemplates();
}

function executeQuickTemplate(i){
  var t = db.quickTemplates[i];
  db.finances.unshift({
    id: (typeof uid!=='undefined' ? uid() : Date.now().toString(36)+Math.random().toString(36).substr(2)),
    date: today(),
    type: t.type,
    amt: t.amt,
    cat: t.cat,
    note: '[шаблон] '+t.name
  });
  save();
  alert('✅ Операция "'+t.name+'" добавлена');
  showQuickTemplates();
}

function deleteQuickTemplate(i){
  if(confirm('Удалить шаблон "'+db.quickTemplates[i].name+'"?')){
    db.quickTemplates.splice(i, 1);
    save();
    showQuickTemplates();
  }
}

// === ФИЛЬТРЫ И ПОИСК В ИСТОРИИ ===
function showFilteredHistory(){
  var h = '<h3>🔍 История операций с фильтрами</h3>';
  h += '<input id="fh_search" placeholder="🔍 Поиск по категории, клиенту, заметке..." oninput="applyHistoryFilters()" style="margin-bottom:10px">';
  h += '<div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap">';
  h += '<select id="fh_type" onchange="applyHistoryFilters()" style="flex:1;min-width:120px"><option value="">Все типы</option><option value="in">Доходы</option><option value="out">Расходы</option></select>';
  h += '<input id="fh_from" type="date" onchange="applyHistoryFilters()" style="flex:1;min-width:120px" title="С даты">';
  h += '<input id="fh_to" type="date" onchange="applyHistoryFilters()" style="flex:1;min-width:120px" title="По дату">';
  h += '</div>';
  h += '<div id="fh_list" style="max-height:60vh;overflow-y:auto"></div>';
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
  applyHistoryFilters();
}

function applyHistoryFilters(){
  var search = (document.getElementById('fh_search').value || '').toLowerCase();
  var type = document.getElementById('fh_type').value;
  var from = document.getElementById('fh_from').value;
  var to = document.getElementById('fh_to').value;
  
  var filtered = db.finances.filter(function(f){
    if(type && f.type !== type) return false;
    if(from && f.date < from) return false;
    if(to && f.date > to) return false;
    if(search){
      var text = (f.cat + ' ' + (f.client || '') + ' ' + (f.note || '')).toLowerCase();
      if(!text.includes(search)) return false;
    }
    return true;
  });
  
  filtered.sort(function(a,b){return b.date.localeCompare(a.date)});
  
  var h = '';
  if(filtered.length === 0){
    h = '<div class="mut" style="text-align:center;padding:20px">Нет операций по фильтрам</div>';
  } else {
    var totalIn = 0, totalOut = 0;
    filtered.forEach(function(f){
      if(f.type === 'in') totalIn += f.amt; else totalOut += f.amt;
    });
    
    h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a;margin-bottom:10px">';
    h += '<div style="display:flex;justify-content:space-between;text-align:center">';
    h += '<div><div class="mut" style="color:#fff">Доходы</div><div style="font-size:16px;font-weight:bold;color:#3ecf8e">'+formatCurrency(totalIn)+'</div></div>';
    h += '<div><div class="mut" style="color:#fff">Расходы</div><div style="font-size:16px;font-weight:bold;color:#ff6b6b">'+formatCurrency(totalOut)+'</div></div>';
    h += '<div><div class="mut" style="color:#fff">Баланс</div><div style="font-size:16px;font-weight:bold;color:'+(totalIn-totalOut>=0?'#3ecf8e':'#ff6b6b')+'">'+formatCurrency(totalIn-totalOut)+'</div></div>';
    h += '</div></div>';
    
    h += '<div class="mut" style="margin-bottom:10px">Найдено: '+filtered.length+' операций</div>';
    
    filtered.forEach(function(f){
      h += '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid #242b36">';
      h += '<div><div style="font-weight:bold;color:'+(f.type==='in'?'#3ecf8e':'#ff6b6b')+'">'+(f.type==='in'?'+ ':'- ')+formatCurrency(f.amt)+'</div>';
      h += '<div class="mut" style="font-size:11px">'+f.date+' · '+esc(f.cat)+(f.client?' · '+esc(f.client):'')+'</div>';
      if(f.note) h += '<div class="mut" style="font-size:10px">'+esc(f.note)+'</div>';
      h += '</div>';
      h += '<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:4px 8px" onclick="deleteFinance(\''+f.id+'\')">🗑</button>';
      h += '</div>';
    });
  }
  
  document.getElementById('fh_list').innerHTML = h;
}

function deleteFinance(id){
  if(confirm('Удалить операцию?')){
    db.finances = db.finances.filter(function(f){return f.id !== id});
    save();
    applyHistoryFilters();
  }
}

// === АВТОКАТЕГОРИЗАЦИЯ ===
function autoCategorize(name){
  var n = name.toLowerCase();
  if(['хостинг','домен','ssl','сервер','aws','yandex cloud'].some(function(x){return n.includes(x)})) return 'Подписки';
  if(['figma','adobe','photoshop','sketch'].some(function(x){return n.includes(x)})) return 'Подписки';
  if(['реклама','ads','продвижение','seo'].some(function(x){return n.includes(x)})) return 'Реклама';
  if(['ноутбук','macbook','монитор','клавиатура','мышь'].some(function(x){return n.includes(x)})) return 'Оборудование';
  if(['курс','обучение','книга','конференция'].some(function(x){return n.includes(x)})) return 'Обучение';
  if(['такси','метро','бензин','топливо'].some(function(x){return n.includes(x)})) return 'Транспорт';
  if(['спорт','фитнес','тренажёрка','медицина','аптека'].some(function(x){return n.includes(x)})) return 'Здоровье';
  if(['подарок','цветы','семья'].some(function(x){return n.includes(x)})) return 'Семья';
  if(['налог','ндс','ндфл'].some(function(x){return n.includes(x)})) return 'Налоги';
  return 'Другое';
}


// === КРЕДИТЫ ===
function showCredits(){
  var h = '<h3>💳 Кредиты и займы</h3>';
  h += '<p class="mut">Управление кредитами и стратегии погашения</p>';
  
  var totalDebt = 0, totalMonthlyPayment = 0;
  db.credits.forEach(function(c){
    totalDebt += c.remaining;
    totalMonthlyPayment += c.monthlyPayment;
  });
  
  if(db.credits.length > 0){
    h += '<div class="card" style="background:linear-gradient(135deg,#2f1a1a,#1a2035);border-color:#ff6b6b;text-align:center">';
    h += '<div class="mut" style="color:#fff">Общий долг</div>';
    h += '<div style="font-size:28px;font-weight:bold;color:#ff6b6b;margin:8px 0">'+formatCurrency(totalDebt)+'</div>';
    h += '<div class="mut">Ежемесячный платёж: <b style="color:#f59e0b">'+formatCurrency(totalMonthlyPayment)+'</b></div>';
    h += '</div>';
  }
  
  if(db.credits.length === 0){
    h += '<div class="mut" style="text-align:center;padding:20px">Нет кредитов. Отлично!</div>';
  } else {
    db.credits.forEach(function(c, i){
      var pct = Math.round((1 - c.remaining / c.original) * 100);
      h += '<div class="card" style="margin:8px 0;border-left:4px solid #ff6b6b">';
      h += '<div style="display:flex;justify-content:space-between;align-items:flex-start">';
      h += '<div style="flex:1"><b style="font-size:15px">'+esc(c.name)+'</b>';
      h += '<div class="mut" style="font-size:11px;margin-top:4px">'+c.rate+'% годовых · до '+c.endDate+'</div>';
      h += '<div class="mut" style="font-size:11px">Остаток: '+formatCurrency(c.remaining)+' из '+formatCurrency(c.original)+'</div></div>';
      h += '<div style="text-align:right">';
      h += '<div style="font-size:16px;font-weight:bold;color:#f59e0b">'+formatCurrency(c.monthlyPayment)+'</div>';
      h += '<div class="mut" style="font-size:10px">в месяц</div></div></div>';
      h += '<div class="bar" style="margin-top:8px"><i style="width:'+pct+'%;background:#3ecf8e"></i></div>';
      h += '<div style="display:flex;gap:4px;margin-top:6px;flex-wrap:wrap">';
      h += '<button class="btn small" style="background:#3ecf8e;padding:4px 8px;font-size:11px" onclick="payCredit('+i+')">💳 Оплатить</button>';
      h += '<button class="btn small" style="background:#9d6cff;padding:4px 8px;font-size:11px" onclick="showPayoffStrategy('+i+')"> Стратегия</button>';
      h += '<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:4px 8px;font-size:11px" onclick="deleteCredit('+i+')">🗑</button>';
      h += '</div></div>';
    });
  }
  
  h += '<button class="btn" style="width:100%;margin-top:10px" onclick="addCredit()">+ Новый кредит</button>';
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:8px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function addCredit(){
  var h = '<h3>➕ Новый кредит</h3>';
  h += '<label>Название</label><input id="cr_name" placeholder="Например: Ипотека, Автокредит">';
  h += '<label>Сумма кредита (₽)</label><input id="cr_amount" type="number" placeholder="1000000">';
  h += '<label>Процентная ставка (% годовых)</label><input id="cr_rate" type="number" step="0.1" placeholder="12">';
  h += '<label>Срок (месяцев)</label><input id="cr_term" type="number" placeholder="60">';
  h += '<label>Дата начала</label><input id="cr_start" type="date" value="'+today()+'">';
  h += '<div style="display:flex;gap:10px;margin-top:15px">';
  h += '<button class="btn" onclick="saveCredit()">💾 Сохранить</button>';
  h += '<button class="btn" style="background:#1f2530" onclick="showCredits()">← Назад</button>';
  h += '</div>';
  openModal(h);
}

function calculateAnnuity(amount, rate, months){
  var monthlyRate = rate / 100 / 12;
  if(monthlyRate === 0) return amount / months;
  return amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

function saveCredit(){
  var name = document.getElementById('cr_name').value.trim();
  var amount = +document.getElementById('cr_amount').value;
  var rate = +document.getElementById('cr_rate').value;
  var term = +document.getElementById('cr_term').value;
  var start = document.getElementById('cr_start').value;
  
  if(!name || !amount || !rate || !term){alert('️ Заполни все поля!');return;}
  
  var monthlyPayment = Math.round(calculateAnnuity(amount, rate, term));
  var endDate = new Date(start);
  endDate.setMonth(endDate.getMonth() + term);
  
  db.credits.push({
    name: name,
    original: amount,
    remaining: amount,
    rate: rate,
    term: term,
    monthlyPayment: monthlyPayment,
    startDate: start,
    endDate: endDate.toISOString().slice(0,10),
    paymentsMade: 0
  });
  save();
  showCredits();
}

function payCredit(i){
  var c = db.credits[i];
  var amt = +prompt('Сумма платежа (рекомендуется '+formatCurrency(c.monthlyPayment)+'):', c.monthlyPayment);
  if(!amt || amt <= 0) return;
  
  if(amt > c.remaining){
    if(!confirm('Сумма больше остатка ('+formatCurrency(c.remaining)+'). Погасить полностью?')) return;
    amt = c.remaining;
  }
  
  c.remaining -= amt;
  c.paymentsMade++;
  
  db.finances.unshift({
    id: (typeof uid!=='undefined' ? uid() : Date.now().toString(36)+Math.random().toString(36).substr(2)),
    date: today(),
    type: 'out',
    amt: amt,
    cat: 'Кредиты',
    note: 'Платёж по "'+c.name+'"'
  });
  
  if(c.remaining <= 0){
    alert('🎉 Кредит "'+c.name+'" полностью погашен!');
    db.credits.splice(i, 1);
  } else {
    alert('✅ Платёж '+formatCurrency(amt)+' принят. Остаток: '+formatCurrency(c.remaining));
  }
  save();
  showCredits();
}

function showPayoffStrategy(i){
  var c = db.credits[i];
  var extraPayment = 5000;
  
  var h = '<h3>⚡ Стратегии погашения</h3>';
  h += '<p class="mut">Кредит: <b>'+esc(c.name)+'</b> · Остаток: '+formatCurrency(c.remaining)+'</p>';
  
  // Стандартный график
  var monthsLeft = Math.ceil(c.remaining / c.monthlyPayment);
  var totalStandard = c.monthlyPayment * monthsLeft;
  
  h += '<div class="card"><h3>📊 Стандартное погашение</h3>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:center">';
  h += '<div><div class="mut">Осталось месяцев</div><div style="font-size:20px;font-weight:bold;color:#6c8cff">'+monthsLeft+'</div></div>';
  h += '<div><div class="mut">Всего заплатишь</div><div style="font-size:20px;font-weight:bold;color:#ff6b6b">'+formatCurrency(totalStandard)+'</div></div>';
  h += '</div></div>';
  
  // С досрочным погашением
  h += '<label>Дополнительный платёж в месяц (₽)</label>';
  h += '<input id="extra_pay" type="number" value="'+extraPayment+'" oninput="recalcPayoff('+i+')">';
  
  h += '<div id="payoff_result" class="card" style="background:linear-gradient(135deg,#1a2f1f,#1a2035);border-color:#3ecf8e">';
  h += '<h3 style="color:#3ecf8e;margin:0 0 10px 0">🚀 С досрочным погашением</h3>';
  h += '</div>';
  
  h += '<div class="card" style="background:linear-gradient(135deg,#2f2a1a,#1a2035);border-color:#f59e0b">';
  h += '<h3 style="color:#f59e0b;margin:0 0 10px 0">💡 Стратегии</h3>';
  h += '<div style="font-size:13px;line-height:1.6">';
  h += '<b>🎯 "Лавина"</b> — сначала кредит с самой высокой ставкой. Математически выгоднее.<br>';
  h += '<b>❄️ "Снежный ком"</b> — сначала самый маленький кредит. Психологически мотивирует.<br>';
  h += '<b>💰 Рефинансирование</b> — если найдёшь ставку ниже, перекредитуйся.';
  h += '</div></div>';
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="showCredits()">← Назад</button>';
  openModal(h);
  
  setTimeout(function(){recalcPayoff(i);}, 100);
}

function recalcPayoff(i){
  var c = db.credits[i];
  var extra = +document.getElementById('extra_pay').value || 0;
  var totalPayment = c.monthlyPayment + extra;
  
  var monthsLeft = 0;
  var remaining = c.remaining;
  var totalPaid = 0;
  var monthlyRate = c.rate / 100 / 12;
  
  while(remaining > 0 && monthsLeft < 600){
    var interest = remaining * monthlyRate;
    var principal = totalPayment - interest;
    if(principal >= remaining){
      totalPaid += remaining + interest;
      remaining = 0;
    } else {
      totalPaid += totalPayment;
      remaining -= principal;
    }
    monthsLeft++;
  }
  
  var standardMonths = Math.ceil(c.remaining / c.monthlyPayment);
  var standardTotal = c.monthlyPayment * standardMonths;
  var saved = standardTotal - totalPaid;
  var monthsSaved = standardMonths - monthsLeft;
  
  var h = '<h3 style="color:#3ecf8e;margin:0 0 10px 0">🚀 С досрочным погашением</h3>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:center">';
  h += '<div><div class="mut">Осталось месяцев</div><div style="font-size:20px;font-weight:bold;color:#3ecf8e">'+monthsLeft+'</div></div>';
  h += '<div><div class="mut">Всего заплатишь</div><div style="font-size:20px;font-weight:bold;color:#6c8cff">'+formatCurrency(Math.round(totalPaid))+'</div></div>';
  h += '</div>';
  h += '<div style="margin-top:15px;padding-top:15px;border-top:1px solid #242b36">';
  h += '<div style="display:flex;justify-content:space-between;margin-bottom:8px"><span>Экономия на процентах:</span><b style="color:#3ecf8e">'+formatCurrency(Math.round(saved))+'</b></div>';
  h += '<div style="display:flex;justify-content:space-between"><span>Сокращение срока:</span><b style="color:#3ecf8e">'+monthsSaved+' мес.</b></div>';
  h += '</div>';
  
  document.getElementById('payoff_result').innerHTML = h;
}

function deleteCredit(i){
  if(confirm('Удалить кредит "'+db.credits[i].name+'"?')){
    db.credits.splice(i, 1);
    save();
    showCredits();
  }
}

// === КАЛЕНДАРЬ ПЛАТЕЖЕЙ ===
function showPaymentCalendar(){
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var daysInMonth = new Date(year, month+1, 0).getDate();
  var monthName = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'][month];
  
  // Собираем платежи на месяц
  var paymentsByDay = {};
  
  // Регулярные платежи
  db.recurring.forEach(function(r){
    var days = r.freq === 'weekly' ? [1,8,15,22,29].filter(function(d){return d<=daysInMonth}) :
               r.freq === 'monthly' ? [15] :
               r.freq === 'yearly' && month === 0 ? [15] : [];
    days.forEach(function(d){
      if(!paymentsByDay[d]) paymentsByDay[d] = [];
      paymentsByDay[d].push({name: r.name, amt: r.amt, type: r.type, cat: r.cat});
    });
  });
  
  // Кредиты
  db.credits.forEach(function(c){
    if(!paymentsByDay[15]) paymentsByDay[15] = [];
    paymentsByDay[15].push({name: c.name, amt: c.monthlyPayment, type: 'out', cat: 'Кредит'});
  });
  
  // Копилки с дедлайном в этом месяце
  db.pots.forEach(function(p){
    if(p.deadline && p.deadline.startsWith(year+'-'+(month+1<10?'0':'')+(month+1))){
      var day = +p.deadline.split('-')[2];
      if(!paymentsByDay[day]) paymentsByDay[day] = [];
      paymentsByDay[day].push({name: 'Копилка: '+p.name, amt: 0, type: 'info', cat: 'Накопления'});
    }
  });
  
  var h = '<h3>📅 Календарь платежей</h3>';
  h += '<p class="mut">'+monthName+' '+year+'</p>';
  
  var totalPlanned = 0;
  h += '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:15px">';
  ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].forEach(function(d){
    h += '<div style="text-align:center;font-size:11px;color:#8b94a7;padding:4px">'+d+'</div>';
  });
  
  var firstDay = new Date(year, month, 1).getDay();
  if(firstDay === 0) firstDay = 7;
  for(var i=1; i<firstDay; i++){
    h += '<div></div>';
  }
  
  for(var d=1; d<=daysInMonth; d++){
    var hasPayments = paymentsByDay[d] && paymentsByDay[d].length > 0;
    var isToday = d === now.getDate();
    var bg = isToday ? '#6c8cff' : hasPayments ? '#2f1a1a' : '#1f2530';
    var color = isToday ? '#fff' : hasPayments ? '#ff6b6b' : '#e8ecf3';
    
    h += '<div style="background:'+bg+';color:'+color+';padding:6px;border-radius:4px;min-height:50px;cursor:pointer" onclick="showDayPayments('+d+')">';
    h += '<div style="font-size:11px;font-weight:bold">'+d+'</div>';
    if(hasPayments){
      paymentsByDay[d].forEach(function(p){
        if(p.type === 'out') totalPlanned += p.amt;
        h += '<div style="font-size:9px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(p.name)+'</div>';
      });
    }
    h += '</div>';
  }
  h += '</div>';
  
  h += '<div class="card" style="background:linear-gradient(135deg,#2f1a1a,#1a2035);border-color:#ff6b6b;text-align:center">';
  h += '<div class="mut" style="color:#fff">Запланировано расходов</div>';
  h += '<div style="font-size:24px;font-weight:bold;color:#ff6b6b;margin:8px 0">'+formatCurrency(totalPlanned)+'</div>';
  h += '</div>';
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function showDayPayments(day){
  var now = new Date();
  var paymentsByDay = {};
  
  db.recurring.forEach(function(r){
    var days = r.freq === 'weekly' ? [1,8,15,22,29].filter(function(d){return d<=31}) :
               r.freq === 'monthly' ? [15] : [];
    days.forEach(function(d){
      if(!paymentsByDay[d]) paymentsByDay[d] = [];
      paymentsByDay[d].push({name: r.name, amt: r.amt, type: r.type});
    });
  });
  
  db.credits.forEach(function(c){
    if(!paymentsByDay[15]) paymentsByDay[15] = [];
    paymentsByDay[15].push({name: c.name, amt: c.monthlyPayment, type: 'out'});
  });
  
  var payments = paymentsByDay[day] || [];
  var h = '<h3> Платежи '+day+' числа</h3>';
  
  if(payments.length === 0){
    h += '<div class="mut" style="text-align:center;padding:20px">Нет платежей</div>';
  } else {
    payments.forEach(function(p){
      h += '<div class="card" style="margin:8px 0">';
      h += '<div style="display:flex;justify-content:space-between;align-items:center">';
      h += '<div><b>'+esc(p.name)+'</b></div>';
      h += '<div style="font-size:16px;font-weight:bold;color:'+(p.type==='in'?'#3ecf8e':'#ff6b6b')+'">'+(p.type==='in'?'+':'-')+formatCurrency(p.amt)+'</div>';
      h += '</div></div>';
    });
  }
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="showPaymentCalendar()">← Назад</button>';
  openModal(h);
}

// === АНАЛИЗ ПО КЛИЕНТАМ ===
function showClientAnalysis(){
  var now = new Date();
  var monthStr = now.toISOString().slice(0,7);
  
  var byClient = {};
  var totalIncome = 0;
  
  db.finances.forEach(function(f){
    if(f.type !== 'in' || !f.date || !f.date.startsWith(monthStr)) return;
    var client = f.client || 'Не указан';
    if(!byClient[client]) byClient[client] = {income: 0, count: 0, lastPayment: ''};
    byClient[client].income += f.amt;
    byClient[client].count++;
    if(f.date > byClient[client].lastPayment) byClient[client].lastPayment = f.date;
    totalIncome += f.amt;
  });
  
  var clients = Object.keys(byClient).sort(function(a,b){return byClient[b].income - byClient[a].income});
  
  var h = '<h3>👥 Анализ по клиентам</h3>';
  h += '<p class="mut">За '+['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'][now.getMonth()]+'</p>';
  
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a;text-align:center">';
  h += '<div class="mut" style="color:#fff">Всего клиентов</div>';
  h += '<div style="font-size:28px;font-weight:bold;color:#3ecf8e;margin:8px 0">'+clients.length+'</div>';
  h += '<div class="mut">Общий доход: '+formatCurrency(totalIncome)+'</div>';
  h += '</div>';
  
  if(clients.length === 0){
    h += '<div class="mut" style="text-align:center;padding:20px">Нет доходов от клиентов за этот месяц</div>';
  } else {
    h += '<div class="card"><h3>🏆 Рейтинг клиентов</h3>';
    clients.forEach(function(c, i){
      var data = byClient[c];
      var pct = Math.round(data.income / totalIncome * 100);
      h += '<div style="margin:10px 0">';
      h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">';
      h += '<div><b>#'+(i+1)+' '+esc(c)+'</b><div class="mut" style="font-size:11px">'+data.count+' платежей · последний: '+data.lastPayment+'</div></div>';
      h += '<div style="text-align:right"><div style="font-size:16px;font-weight:bold;color:#3ecf8e">'+formatCurrency(data.income)+'</div><div class="mut" style="font-size:11px">'+pct+'%</div></div>';
      h += '</div>';
      h += '<div class="bar"><i style="width:'+pct+'%;background:#3ecf8e"></i></div>';
      h += '</div>';
    });
    h += '</div>';
    
    // Топ-3 приносят X%
    var top3Income = clients.slice(0,3).reduce(function(a,c){return a+byClient[c].income},0);
    var top3Pct = Math.round(top3Income / totalIncome * 100);
    h += '<div class="card" style="background:linear-gradient(135deg,#2f2a1a,#1a2035);border-color:#f59e0b">';
    h += '<h3 style="color:#f59e0b;margin:0 0 10px 0">💡 Инсайт</h3>';
    h += '<div style="font-size:14px">Топ-3 клиента приносят <b style="color:#f59e0b">'+top3Pct+'%</b> дохода ('+formatCurrency(top3Income)+').';
    if(top3Pct > 70) h += ' Высокая зависимость — диверсифицируй базу!';
    else h += ' Хорошее распределение!';
    h += '</div></div>';
  }
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

// === СЦЕНАРИИ "ЧТО ЕСЛИ" ===
function showWhatIf(){
  var now = new Date();
  var monthStr = now.toISOString().slice(0,7);
  var monthIncome = 0, monthExpense = 0;
  db.finances.forEach(function(f){
    if(!f.date || !f.date.startsWith(monthStr)) return;
    if(f.type === 'in') monthIncome += f.amt;
    else monthExpense += f.amt;
  });
  
  var h = '<h3>🔮 Сценарии "Что если"</h3>';
  h += '<p class="mut">Симулятор финансовых решений</p>';
  
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
  h += '<div class="mut" style="color:#fff">Текущий месяц</div>';
  h += '<div style="display:flex;justify-content:space-between;margin-top:10px">';
  h += '<div><div class="mut">Доход</div><div style="font-size:18px;font-weight:bold;color:#3ecf8e">'+formatCurrency(monthIncome)+'</div></div>';
  h += '<div><div class="mut">Расход</div><div style="font-size:18px;font-weight:bold;color:#ff6b6b">'+formatCurrency(monthExpense)+'</div></div>';
  h += '<div><div class="mut">Свободно</div><div style="font-size:18px;font-weight:bold;color:#6c8cff">'+formatCurrency(monthIncome-monthExpense)+'</div></div>';
  h += '</div></div>';
  
  h += '<h3 style="margin-top:15px">Выбери сценарий:</h3>';
  
  // Сценарий 1: Откладывать на 20% больше
  var save20 = Math.round(monthIncome*0.2);
  h += '<div class="card" style="margin:8px 0">';
  h += '<div style="font-weight:bold;margin-bottom:8px">💰 Откладывать на 20% больше</div>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center;font-size:12px">';
  h += '<div><div class="mut">Доход</div><div style="color:#3ecf8e;font-weight:bold">'+formatCurrency(monthIncome)+'</div></div>';
  h += '<div><div class="mut">Расход</div><div style="color:#ff6b6b;font-weight:bold">'+formatCurrency(monthExpense+save20)+'</div></div>';
  h += '<div><div class="mut">Свободно</div><div style="color:#6c8cff;font-weight:bold">'+formatCurrency(monthIncome-monthExpense-save20)+'</div></div>';
  h += '</div>';
  h += '<div class="mut" style="font-size:11px;margin-top:6px">Накопишь за год: '+formatCurrency(save20*12)+'</div>';
  h += '</div>';
  
  // Сценарий 2: Сократить расходы на 15%
  var newExp = Math.round(monthExpense*0.85);
  var saved15 = monthExpense - newExp;
  h += '<div class="card" style="margin:8px 0">';
  h += '<div style="font-weight:bold;margin-bottom:8px">✂️ Сократить расходы на 15%</div>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center;font-size:12px">';
  h += '<div><div class="mut">Доход</div><div style="color:#3ecf8e;font-weight:bold">'+formatCurrency(monthIncome)+'</div></div>';
  h += '<div><div class="mut">Расход</div><div style="color:#ff6b6b;font-weight:bold">'+formatCurrency(newExp)+'</div></div>';
  h += '<div><div class="mut">Свободно</div><div style="color:#6c8cff;font-weight:bold">'+formatCurrency(monthIncome-newExp)+'</div></div>';
  h += '</div>';
  h += '<div class="mut" style="font-size:11px;margin-top:6px">Экономия за год: '+formatCurrency(saved15*12)+'</div>';
  h += '</div>';
  
  // Сценарий 3: Увеличить доход на 30%
  var newInc = Math.round(monthIncome*1.3);
  var extraInc = newInc - monthIncome;
  h += '<div class="card" style="margin:8px 0">';
  h += '<div style="font-weight:bold;margin-bottom:8px"> Увеличить доход на 30%</div>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center;font-size:12px">';
  h += '<div><div class="mut">Доход</div><div style="color:#3ecf8e;font-weight:bold">'+formatCurrency(newInc)+'</div></div>';
  h += '<div><div class="mut">Расход</div><div style="color:#ff6b6b;font-weight:bold">'+formatCurrency(monthExpense)+'</div></div>';
  h += '<div><div class="mut">Свободно</div><div style="color:#6c8cff;font-weight:bold">'+formatCurrency(newInc-monthExpense)+'</div></div>';
  h += '</div>';
  h += '<div class="mut" style="font-size:11px;margin-top:6px">Доп. доход за год: '+formatCurrency(extraInc*12)+'</div>';
  h += '</div>';
  
  // Сценарий 4: Ипотека
  h += '<div class="card" style="margin:8px 0">';
  h += '<div style="font-weight:bold;margin-bottom:8px">🏠 Взять ипотеку (50К/мес)</div>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center;font-size:12px">';
  h += '<div><div class="mut">Доход</div><div style="color:#3ecf8e;font-weight:bold">'+formatCurrency(monthIncome)+'</div></div>';
  h += '<div><div class="mut">Расход</div><div style="color:#ff6b6b;font-weight:bold">'+formatCurrency(monthExpense+50000)+'</div></div>';
  h += '<div><div class="mut">Свободно</div><div style="color:'+(monthIncome-monthExpense-50000>=0?'#6c8cff':'#ff6b6b')+';font-weight:bold">'+formatCurrency(monthIncome-monthExpense-50000)+'</div></div>';
  h += '</div>';
  h += '<div class="mut" style="font-size:11px;margin-top:6px">За 30 лет заплатишь: '+formatCurrency(50000*360)+'</div>';
  h += '</div>';
  
  // Сценарий 5: Досрочное погашение
  h += '<div class="card" style="margin:8px 0">';
  h += '<div style="font-weight:bold;margin-bottom:8px">💳 Погасить кредит досрочно (+10К/мес)</div>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center;font-size:12px">';
  h += '<div><div class="mut">Доход</div><div style="color:#3ecf8e;font-weight:bold">'+formatCurrency(monthIncome)+'</div></div>';
  h += '<div><div class="mut">Расход</div><div style="color:#ff6b6b;font-weight:bold">'+formatCurrency(monthExpense+10000)+'</div></div>';
  h += '<div><div class="mut">Свободно</div><div style="color:'+(monthIncome-monthExpense-10000>=0?'#6c8cff':'#ff6b6b')+';font-weight:bold">'+formatCurrency(monthIncome-monthExpense-10000)+'</div></div>';
  h += '</div>';
  h += '<div class="mut" style="font-size:11px;margin-top:6px">Экономия на процентах: ~'+formatCurrency(10000*12*0.1)+'</div>';
  h += '</div>';
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

// === ПРОГНОЗ ДОСТИЖЕНИЯ ЦЕЛИ ===
function showGoalForecast(){
  if(db.pots.length === 0){
    alert('⚠️ Сначала создай копилку!');
    return;
  }
  
  var h = '<h3>🎯 Прогноз достижения целей</h3>';
  h += '<p class="mut">Когда ты накопишь на каждую цель?</p>';
  
  // Среднее накопление в месяц
  var monthStr = new Date().toISOString().slice(0,7);
  var monthSavings = 0;
  db.finances.forEach(function(f){
    if(f.type === 'out' && f.cat === 'Накопления' && f.date && f.date.startsWith(monthStr)){
      monthSavings += f.amt;
    }
  });
  
  // Если нет данных, берём среднее за 3 месяца
  if(monthSavings === 0){
    var totalSavings = 0, months = 0;
    for(var i=0; i<3; i++){
      var d = new Date();
      d.setMonth(d.getMonth() - i);
      var key = d.toISOString().slice(0,7);
      var m = 0;
      db.finances.forEach(function(f){
        if(f.type === 'out' && f.cat === 'Накопления' && f.date && f.date.startsWith(key)) m += f.amt;
      });
      if(m > 0){totalSavings += m; months++;}
    }
    monthSavings = months > 0 ? Math.round(totalSavings / months) : 5000;
  }
  
  h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a;text-align:center">';
  h += '<div class="mut" style="color:#fff">Среднее накопление в месяц</div>';
  h += '<div style="font-size:28px;font-weight:bold;color:#3ecf8e;margin:8px 0">'+formatCurrency(monthSavings)+'</div>';
  h += '<button class="btn small" style="background:#1f2530" onclick="editMonthlySavings()">✏️ Изменить</button>';
  h += '</div>';
  
  db.pots.forEach(function(p){
    var remaining = p.target - p.amount;
    var monthsNeeded = Math.ceil(remaining / monthSavings);
    var targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + monthsNeeded);
    var dateStr = targetDate.toLocaleDateString('ru-RU', {year:'numeric', month:'long'});
    
    var cat = POT_CATEGORIES[p.category] || POT_CATEGORIES.other;
    var urgency = monthsNeeded <= 3 ? '#3ecf8e' : monthsNeeded <= 6 ? '#f59e0b' : '#ff6b6b';
    
    h += '<div class="card" style="margin:8px 0;border-left:4px solid '+cat.color+'">';
    h += '<div style="display:flex;justify-content:space-between;align-items:flex-start">';
    h += '<div><div style="font-size:20px">'+cat.icon+'</div><b>'+esc(p.name)+'</b>';
    h += '<div class="mut" style="font-size:11px">'+formatCurrency(p.amount)+' из '+formatCurrency(p.target)+'</div></div>';
    h += '<div style="text-align:right">';
    h += '<div style="font-size:14px;font-weight:bold;color:'+urgency+'">'+monthsNeeded+' мес.</div>';
    h += '<div class="mut" style="font-size:10px">'+dateStr+'</div></div></div>';
    var pct = Math.round(p.amount / p.target * 100);
    h += '<div class="bar" style="margin-top:8px"><i style="width:'+pct+'%;background:'+cat.color+'"></i></div>';
    h += '</div>';
  });
  
  h += '<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function editMonthlySavings(){
  var val = prompt('Среднее накопление в месяц (₽):', 5000);
  if(val === null) return;
  var amt = +val;
  if(amt > 0){
    db.monthlySavings = amt;
    save();
    showGoalForecast();
  }
}


// === FIRE-КАЛЬКУЛЯТОР ===
function showFireCalculator(){
  var h='<h3>🔥 FIRE-калькулятор</h3>';
  h+='<p class="mut">Рассчитай, когда выйдешь на финансовую независимость</p>';
  
  // Текущие данные
  var currentSavings = db.assets.reduce(function(a,b){return a+b.amt},0) - db.liabilities.reduce(function(a,b){return a+b.amt},0);
  var monthlyIncome = 0, monthlyExpense = 0;
  var monthStr = new Date().toISOString().slice(0,7);
  db.finances.forEach(function(f){
    if(!f.date || !f.date.startsWith(monthStr)) return;
    if(f.type==='in') monthlyIncome += f.amt;
    else monthlyExpense += f.amt;
  });
  var monthlySavings = monthlyIncome - monthlyExpense;
  
  h+='<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:center">';
  h+='<div><div class="mut" style="color:#fff">Текущие накопления</div><div style="font-size:18px;font-weight:bold;color:#3ecf8e">'+formatCurrency(currentSavings)+'</div></div>';
  h+='<div><div class="mut" style="color:#fff">Ежемесячные сбережения</div><div style="font-size:18px;font-weight:bold;color:#6c8cff">'+formatCurrency(monthlySavings)+'</div></div>';
  h+='</div></div>';
  
  h+='<label>Годовые расходы (₽)</label>';
  h+='<input id="fire_expenses" type="number" value="'+Math.round(monthlyExpense*12)+'" style="margin-bottom:8px">';
  h+='<label>Текущие накопления (₽)</label>';
  h+='<input id="fire_current" type="number" value="'+currentSavings+'" style="margin-bottom:8px">';
  h+='<label>Ежемесячные сбережения (₽)</label>';
  h+='<input id="fire_monthly" type="number" value="'+monthlySavings+'" style="margin-bottom:8px">';
  h+='<label>Годовая доходность инвестиций (%)</label>';
  h+='<input id="fire_return" type="number" value="8" step="0.1" style="margin-bottom:8px">';
  
  h+='<button class="btn" style="width:100%;margin-top:10px" onclick="calculateFire()">🔥 Рассчитать FIRE</button>';
  h+='<div id="fire_result" style="margin-top:15px"></div>';
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function calculateFire(){
  var annualExpenses = +document.getElementById('fire_expenses').value;
  var currentSavings = +document.getElementById('fire_current').value;
  var monthlySavings = +document.getElementById('fire_monthly').value;
  var annualReturn = +document.getElementById('fire_return').value / 100;
  
  // Число FIRE = годовые расходы × 25 (правило 4%)
  var fireNumber = annualExpenses * 25;
  
  // Расчёт лет до FIRE
  var years = 0;
  var savings = currentSavings;
  var monthlyReturn = annualReturn / 12;
  
  while(savings < fireNumber && years < 100){
    for(var m=0; m<12; m++){
      savings = savings * (1 + monthlyReturn) + monthlySavings;
    }
    years++;
  }
  
  var fireYear = new Date().getFullYear() + years;
  var age = years > 0 ? 'в '+fireYear+' году' : 'уже достигнут!';
  
  var h='<div class="card" style="background:linear-gradient(135deg,#2f1a1a,#1a2035);border-color:#ff6b6b;text-align:center">';
  h+='<div class="mut" style="color:#fff">Число FIRE (цель)</div>';
  h+='<div style="font-size:32px;font-weight:bold;color:#ff6b6b;margin:10px 0">'+formatCurrency(fireNumber)+'</div>';
  h+='<div class="mut">Годовые расходы × 25 (правило 4%)</div>';
  h+='</div>';
  
  h+='<div class="card" style="background:linear-gradient(135deg,#1a2f1f,#1a2035);border-color:#3ecf8e;text-align:center">';
  h+='<div class="mut" style="color:#fff">До финансовой свободы</div>';
  h+='<div style="font-size:28px;font-weight:bold;color:#3ecf8e;margin:10px 0">'+years+' лет</div>';
  h+='<div class="mut">'+age+'</div>';
  h+='</div>';
  
  h+='<div class="card">';
  h+='<h3 style="margin:0 0 10px 0">📊 Прогноз роста капитала</h3>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center;font-size:12px">';
  
  var checkpoints = [5, 10, 15, 20, 25];
  checkpoints.forEach(function(y){
    var proj = currentSavings;
    for(var i=0; i<y*12; i++){
      proj = proj * (1 + monthlyReturn) + monthlySavings;
    }
    h+='<div><div class="mut">'+y+' лет</div><div style="font-weight:bold;color:#6c8cff">'+formatCurrency(Math.round(proj))+'</div></div>';
  });
  
  h+='</div></div>';
  
  h+='<div class="card" style="background:linear-gradient(135deg,#2f2a1a,#1a2035);border-color:#f59e0b">';
  h+='<h3 style="color:#f59e0b;margin:0 0 10px 0">💡 Как ускорить FIRE?</h3>';
  h+='<div style="font-size:13px;line-height:1.6">';
  h+='<b>1. Увеличь сбережения</b> — откладывай 50%+ дохода<br>';
  h+='<b>2. Снизь расходы</b> — оптимизируй подписки и привычки<br>';
  h+='<b>3. Инвестируй</b> — индексные фонды, недвижимость<br>';
  h+='<b>4. Увеличь доход</b> — фриланс, бизнес, пассивный доход';
  h+='</div></div>';
  
  document.getElementById('fire_result').innerHTML = h;
}

// === МЕСЯЧНЫЙ PDF-ОТЧЁТ ===
function showMonthlyReport(){
  var now = new Date();
  var monthStr = now.toISOString().slice(0,7);
  var monthName = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'][now.getMonth()];
  
  var monthIncome = 0, monthExpense = 0;
  var byCategory = {};
  var transactions = [];
  
  db.finances.forEach(function(f){
    if(!f.date || !f.date.startsWith(monthStr)) return;
    if(f.type==='in'){
      monthIncome += f.amt;
    } else {
      monthExpense += f.amt;
      byCategory[f.cat] = (byCategory[f.cat] || 0) + f.amt;
    }
    transactions.push(f);
  });
  
  var tax = calculateTax(monthIncome);
  var netProfit = monthIncome - monthExpense - tax.amount;
  var savingsRate = monthIncome > 0 ? Math.round((monthIncome - monthExpense) / monthIncome * 100) : 0;
  
  // Сравнение с прошлым месяцем
  var prevMonth = new Date(now.getFullYear(), now.getMonth()-1, 1);
  var prevMonthStr = prevMonth.toISOString().slice(0,7);
  var prevIncome = 0, prevExpense = 0;
  db.finances.forEach(function(f){
    if(!f.date || !f.date.startsWith(prevMonthStr)) return;
    if(f.type==='in') prevIncome += f.amt;
    else prevExpense += f.amt;
  });
  
  var incomeGrowth = prevIncome > 0 ? Math.round((monthIncome - prevIncome) / prevIncome * 100) : 0;
  var expenseGrowth = prevExpense > 0 ? Math.round((monthExpense - prevExpense) / prevExpense * 100) : 0;
  
  var h='<h3>📄 Месячный отчёт</h3>';
  h+='<p class="mut">'+monthName+' '+now.getFullYear()+'</p>';
  
  // Ключевые показатели
  h+='<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:center">';
  h+='<div><div class="mut" style="color:#fff">Доход</div><div style="font-size:18px;font-weight:bold;color:#3ecf8e">'+formatCurrency(monthIncome)+'</div>';
  if(prevIncome > 0) h+='<div class="mut" style="font-size:10px">'+(incomeGrowth>=0?'↑':'↓')+' '+Math.abs(incomeGrowth)+'% vs прошлый</div>';
  h+='</div>';
  h+='<div><div class="mut" style="color:#fff">Расход</div><div style="font-size:18px;font-weight:bold;color:#ff6b6b">'+formatCurrency(monthExpense)+'</div>';
  if(prevExpense > 0) h+='<div class="mut" style="font-size:10px">'+(expenseGrowth>=0?'↑':'↓')+' '+Math.abs(expenseGrowth)+'% vs прошлый</div>';
  h+='</div>';
  h+='<div><div class="mut" style="color:#fff">Налоги</div><div style="font-size:18px;font-weight:bold;color:#f59e0b">'+formatCurrency(tax.amount)+'</div></div>';
  h+='<div><div class="mut" style="color:#fff">Чистая прибыль</div><div style="font-size:18px;font-weight:bold;color:'+(netProfit>=0?'#3ecf8e':'#ff6b6b')+'">'+formatCurrency(netProfit)+'</div></div>';
  h+='</div></div>';
  
  // Норма сбережений
  h+='<div class="card" style="text-align:center">';
  h+='<div class="mut">Норма сбережений</div>';
  h+='<div style="font-size:32px;font-weight:bold;color:'+(savingsRate>=20?'#3ecf8e':savingsRate>=10?'#f59e0b':'#ff6b6b')+';margin:8px 0">'+savingsRate+'%</div>';
  h+='<div class="mut">'+(savingsRate>=20?'Отлично!':savingsRate>=10?'Хорошо, но можно лучше':'Нужно увеличивать')+'</div>';
  h+='</div>';
  
  // Расходы по категориям
  var cats = Object.keys(byCategory).sort(function(a,b){return byCategory[b]-byCategory[a]});
  if(cats.length > 0){
    h+='<div class="card"><h3>📊 Расходы по категориям</h3>';
    cats.forEach(function(cat){
      var pct = Math.round(byCategory[cat]/monthExpense*100);
      h+='<div style="margin:8px 0">';
      h+='<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px"><span>'+esc(cat)+'</span><b>'+formatCurrency(byCategory[cat])+' ('+pct+'%)</b></div>';
      h+='<div class="bar"><i style="width:'+pct+'%;background:#ff6b6b"></i></div>';
      h+='</div>';
    });
    h+='</div>';
  }
  
  // Топ-5 транзакций
  var topExpenses = transactions.filter(function(f){return f.type==='out'}).sort(function(a,b){return b.amt-a.amt}).slice(0,5);
  if(topExpenses.length > 0){
    h+='<div class="card"><h3> Крупнейшие расходы</h3>';
    topExpenses.forEach(function(f,i){
      h+='<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #242b36;font-size:12px">';
      h+='<div><b>#'+(i+1)+'</b> '+esc(f.cat)+(f.note?' · '+esc(f.note):'')+'</div>';
      h+='<div style="color:#ff6b6b;font-weight:bold">'+formatCurrency(f.amt)+'</div>';
      h+='</div>';
    });
    h+='</div>';
  }
  
  // Кнопки действий
  h+='<div style="display:flex;gap:8px;margin-top:15px">';
  h+='<button class="btn" style="background:#3ecf8e;flex:1" onclick="printMonthlyReport()">🖨 Печать / PDF</button>';
  h+='<button class="btn" style="background:#1f2530;flex:1" onclick="closeModal()">Закрыть</button>';
  h+='</div>';
  
  // Сохраняем данные для печати
  window._monthlyReportData = {
    month: monthName+' '+now.getFullYear(),
    income: monthIncome,
    expense: monthExpense,
    tax: tax.amount,
    netProfit: netProfit,
    savingsRate: savingsRate,
    categories: byCategory,
    transactions: transactions
  };
  
  openModal(h);
}

function printMonthlyReport(){
  var data = window._monthlyReportData;
  if(!data){alert('⚠️ Данные не загружены');return;}
  
  var html='<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Финансовый отчёт - '+data.month+'</title>';
  html+='<style>body{font-family:system-ui,sans-serif;color:#000;margin:0;padding:20px}';
  html+='h1{text-align:center;color:#2563eb;margin-bottom:5px}';
  html+='.header{text-align:center;color:#666;margin-bottom:30px}';
  html+='.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin:20px 0}';
  html+='.stat{background:#f3f4f6;padding:15px;border-radius:8px;text-align:center}';
  html+='.stat b{font-size:20px;display:block;margin-top:5px}';
  html+='.stat.income b{color:#059669}';
  html+='.stat.expense b{color:#dc2626}';
  html+='.stat.tax b{color:#f59e0b}';
  html+='.stat.profit b{color:#2563eb}';
  html+='table{width:100%;border-collapse:collapse;margin:20px 0}';
  html+='th,td{border:1px solid #ddd;padding:8px;text-align:left}';
  html+='th{background:#2563eb;color:#fff}';
  html+='.in{color:#059669;font-weight:bold}.out{color:#dc2626;font-weight:bold}';
  html+='@media print{body{padding:10px}}</style></head><body>';
  
  html+='<h1>📊 Финансовый отчёт</h1>';
  html+='<div class="header">'+data.month+'</div>';
  
  html+='<div class="stats">';
  html+='<div class="stat income">Доход<b>'+formatCurrency(data.income)+'</b></div>';
  html+='<div class="stat expense">Расход<b>'+formatCurrency(data.expense)+'</b></div>';
  html+='<div class="stat tax">Налоги<b>'+formatCurrency(data.tax)+'</b></div>';
  html+='<div class="stat profit">Чистая прибыль<b>'+formatCurrency(data.netProfit)+'</b></div>';
  html+='</div>';
  
  html+='<h2>Расходы по категориям</h2>';
  html+='<table><tr><th>Категория</th><th>Сумма</th><th>Доля</th></tr>';
  var cats = Object.keys(data.categories).sort(function(a,b){return data.categories[b]-data.categories[a]});
  cats.forEach(function(cat){
    var pct = Math.round(data.categories[cat]/data.expense*100);
    html+='<tr><td>'+esc(cat)+'</td><td>'+formatCurrency(data.categories[cat])+'</td><td>'+pct+'%</td></tr>';
  });
  html+='</table>';
  
  html+='<h2>Все операции</h2>';
  html+='<table><tr><th>Дата</th><th>Тип</th><th>Категория</th><th>Описание</th><th>Сумма</th></tr>';
  data.transactions.sort(function(a,b){return b.date.localeCompare(a.date)}).forEach(function(f){
    html+='<tr><td>'+f.date+'</td><td>'+(f.type==='in'?'Доход':'Расход')+'</td><td>'+esc(f.cat)+'</td><td>'+(f.note?esc(f.note):'')+'</td><td class="'+f.type+'">'+(f.type==='in'?'+':'-')+formatCurrency(f.amt)+'</td></tr>';
  });
  html+='</table>';
  
  html+='<div style="text-align:center;margin-top:30px;color:#666;font-size:12px">Сгенерировано в SoloDev v6.10.0 · '+new Date().toLocaleString('ru-RU')+'</div>';
  html+='</body></html>';
  
  var w = window.open('','_blank');
  w.document.write(html);
  w.document.close();
  setTimeout(function(){w.print();}, 500);
}


// === ПРОДУКТИВНОСТЬ ===
function renderProductivity(){
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
  if(!db.journal) db.journal = [];
  
  var h='<h2> Продуктивность</h2>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px">';
  h+='<button class="btn" style="background:#ff6b6b;padding:20px;font-size:16px" onclick="showPomodoro()"> Pomodoro</button>';
  h+='<button class="btn" style="background:#3ecf8e;padding:20px;font-size:16px" onclick="showHabits()">✅ Привычки</button>';
  h+='<button class="btn" style="background:#6c8cff;padding:20px;font-size:16px" onclick="showDiary()"> Дневник</button>';
  h+='<button class="btn" style="background:#9d6cff;padding:20px;font-size:16px" onclick="showFocusStats()">📊 Статистика</button>';
  h+='<button class="btn" style="background:#ffd700;padding:20px;font-size:16px;color:#000" onclick="showMoodTracker()">😊 Настроение</button>';
  h+='<button class="btn" style="background:#ff9500;padding:20px;font-size:16px" onclick="showDailyGoals()">🎯 Цели дня</button>';
  h+='<button class="btn" style="background:#00d4ff;padding:20px;font-size:16px;color:#000" onclick="showWaterTracker()"> Вода</button>';
  h+='<button class="btn" style="background:linear-gradient(135deg,#6c8cff,#9d6cff);padding:20px;font-size:16px" onclick="showJournal()">📋 Журнал</button>';
  h+='</div>';
  
  var todayStr = new Date().toISOString().slice(0,10);
  var todaySessions = (db.pomodoro.sessions || []).filter(function(s){return s.date===todayStr});
  var todayMinutes = todaySessions.reduce(function(a,s){return a+(s.duration||0)},0);
  var todayHours = Math.round(todayMinutes / 60 * 10) / 10;
  
  h+='<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
  h+='<h3 style="color:#fff;margin:0 0 15px 0">📊 Сегодня</h3>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center">';
  h+='<div><div class="mut" style="color:#fff">Сессий</div><div style="font-size:24px;font-weight:bold;color:#ff6b6b">'+todaySessions.length+'</div></div>';
  h+='<div><div class="mut" style="color:#fff">Минут</div><div style="font-size:24px;font-weight:bold;color:#3ecf8e">'+todayMinutes+'</div></div>';
  h+='<div><div class="mut" style="color:#fff">Часов</div><div style="font-size:24px;font-weight:bold;color:#6c8cff">'+todayHours+'</div></div>';
  h+='</div></div>';
  
  document.getElementById('app').innerHTML = h;
}

// === POMODORO ===
var pomodoroInterval = null;
var pomodoroTimeLeft = 0;
var pomodoroTotalTime = 0;

function showPomodoro(){
  if(!db.deals) db.deals = [];
  if(!db.investments) db.investments = [];
  if(!db.timeEntries) db.timeEntries = [];
  if(!db.subscriptions) db.subscriptions = [];
  if(!db.hourlyRate) db.hourlyRate = 2000;
  if(!db.pomodoro) db.pomodoro = {sessions:[], totalTime:0, dailyGoal:25};
  var h='<h3>🍅 Pomodoro-таймер</h3>';
  h+='<div style="text-align:center;padding:20px">';
  h+='<div id="pomodoro_timer" style="font-size:48px;font-weight:bold;color:#ff6b6b;margin:20px 0">25:00</div>';
  h+='<div id="pomodoro_status" style="color:#8b94a7;margin-bottom:20px">Готов к работе</div>';
  h+='<div style="display:flex;gap:10px;justify-content:center;margin-bottom:20px">';
  h+='<button class="btn" style="background:#3ecf8e" onclick="startPomodoro(25)">25 мин</button>';
  h+='<button class="btn" style="background:#6c8cff" onclick="startPomodoro(15)">15 мин</button>';
  h+='<button class="btn" style="background:#9d6cff" onclick="startPomodoro(5)">5 мин</button>';
  h+='</div>';
  h+='<div style="display:flex;gap:10px;justify-content:center">';
  h+='<button class="btn" style="background:#3ecf8e" onclick="pausePomodoro()">⏸ Пауза</button>';
  h+='<button class="btn" style="background:#6c8cff" onclick="resumePomodoro()">▶ Продолжить</button>';
  h+='<button class="btn" style="background:#ff6b6b" onclick="stopPomodoro()">⏹ Стоп</button>';
  h+='</div>';
  h+='</div>';
  h+='<div class="card" style="margin-top:15px">';
  h+='<label>Дневная цель (минут)</label>';
  h+='<input id="pomodoro_goal" type="number" value="'+(db.pomodoro.dailyGoal||25)+'" style="width:100%;padding:8px;margin:10px 0;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
  h+='<button class="btn" style="width:100%" onclick="savePomodoroSettings()">💾 Сохранить цель</button>';
  h+='</div>';
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function startPomodoro(minutes){
  if(pomodoroInterval) clearInterval(pomodoroInterval);
  pomodoroTimeLeft = minutes * 60;
  pomodoroTotalTime = minutes * 60;
  var statusEl = document.getElementById('pomodoro_status');
  if(statusEl) statusEl.textContent = ' В работе...';
  pomodoroInterval = setInterval(function(){
    pomodoroTimeLeft--;
    var mins = Math.floor(pomodoroTimeLeft / 60);
    var secs = pomodoroTimeLeft % 60;
    var timerEl = document.getElementById('pomodoro_timer');
    if(timerEl) timerEl.textContent = mins.toString().padStart(2,'0')+':'+secs.toString().padStart(2,'0');
    if(pomodoroTimeLeft <= 0){
      clearInterval(pomodoroInterval);
      pomodoroInterval = null;
      if(!db.deals) db.deals = [];
  if(!db.investments) db.investments = [];
  if(!db.timeEntries) db.timeEntries = [];
  if(!db.subscriptions) db.subscriptions = [];
  if(!db.hourlyRate) db.hourlyRate = 2000;
  if(!db.pomodoro) db.pomodoro = {sessions:[], totalTime:0, dailyGoal:25};
      var todayStr = new Date().toISOString().slice(0,10);
      db.pomodoro.sessions.push({date: todayStr, duration: pomodoroTotalTime/60, timestamp: new Date().toISOString()});
      db.pomodoro.totalTime = (db.pomodoro.totalTime || 0) + (pomodoroTotalTime/60);
      addToJournal('pomodoro', {duration: Math.round(pomodoroTotalTime/60)});
      localStorage.setItem('solodev', JSON.stringify(db));
      if(statusEl) statusEl.textContent = '✅ Сессия завершена!';
      alert('🍅 Pomodoro завершён! Отличная работа!');
      if(currentView === 'productivity') renderProductivity();
    }
  }, 1000);
}

function pausePomodoro(){
  if(pomodoroInterval){
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
    var statusEl = document.getElementById('pomodoro_status');
    if(statusEl) statusEl.textContent = ' На паузе';
  }
}

function resumePomodoro(){
  if(pomodoroTimeLeft > 0){
    var mins = Math.ceil(pomodoroTimeLeft / 60);
    startPomodoro(mins);
  }
}

function stopPomodoro(){
  if(pomodoroInterval){
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
  }
  pomodoroTimeLeft = 0;
  pomodoroTotalTime = 0;
  var timerEl = document.getElementById('pomodoro_timer');
  if(timerEl) timerEl.textContent = '25:00';
  var statusEl = document.getElementById('pomodoro_status');
  if(statusEl) statusEl.textContent = 'Готов к работе';
}

function savePomodoroSettings(){
  if(!db.deals) db.deals = [];
  if(!db.investments) db.investments = [];
  if(!db.timeEntries) db.timeEntries = [];
  if(!db.subscriptions) db.subscriptions = [];
  if(!db.hourlyRate) db.hourlyRate = 2000;
  if(!db.pomodoro) db.pomodoro = {sessions:[], totalTime:0, dailyGoal:25};
  var goalEl = document.getElementById('pomodoro_goal');
  if(goalEl && goalEl.value){
    db.pomodoro.dailyGoal = parseInt(goalEl.value) || 25;
    localStorage.setItem('solodev', JSON.stringify(db));
    alert('✅ Дневная цель сохранена: ' + db.pomodoro.dailyGoal + ' мин');
    showPomodoro();
  }
}

// === ПРИВЫЧКИ ===
function showHabits(){
  if(!db.habits) db.habits = [];
  var h='<h3>✅ Трекер привычек</h3>';
  h+='<p class="mut">Формируй полезные привычки с сериями 🔥</p>';
  if(db.habits.length === 0){
    h+='<div class="mut" style="text-align:center;padding:20px">Нет привычек. Создай первую!</div>';
  } else {
    db.habits.forEach(function(hab, index){
      var todayStr = new Date().toISOString().slice(0,10);
      var doneToday = hab.log && hab.log[todayStr];
      var streak = 0;
      var d = new Date();
      while(true){
        var ds = d.toISOString().slice(0,10);
        if(hab.log && hab.log[ds]){ streak++; d.setDate(d.getDate() - 1); }
        else { break; }
      }
      h+='<div class="card" style="margin:8px 0">';
      h+='<div style="display:flex;justify-content:space-between;align-items:flex-start">';
      h+='<div style="flex:1"><b style="font-size:15px">'+hab.name+'</b>';
      h+='<div class="mut" style="font-size:11px;margin-top:4px"> Серия: '+streak+' дней</div>';
      if(hab.description) h+='<div class="mut" style="font-size:11px">'+hab.description+'</div>';
      h+='</div>';
      h+='<div style="display:flex;gap:6px">';
      h+='<button class="btn small" style="background:'+(doneToday?'#3ecf8e':'#1f2530')+';padding:6px 12px" onclick="toggleHabit('+index+')">'+(doneToday?'✅':'⬜')+'</button>';
      h+='<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:4px 8px" onclick="deleteHabit('+index+')"></button>';
      h+='</div></div>';
    });
  }
  h+='<button class="btn" style="width:100%;margin-top:10px" onclick="addHabit()">+ Новая привычка</button>';
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:8px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function addHabit(){
  var h='<h3>➕ Новая привычка</h3>';
  h+='<label>Название</label><input id="habit_name" placeholder="Например: Медитация" style="width:100%;margin-bottom:10px;padding:8px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
  h+='<label>Описание</label><input id="habit_desc" placeholder="Кратко" style="width:100%;margin-bottom:10px;padding:8px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
  h+='<div style="display:flex;gap:10px;margin-top:15px">';
  h+='<button class="btn" style="flex:1" onclick="saveHabit()">💾 Сохранить</button>';
  h+='<button class="btn" style="background:#1f2530;flex:1" onclick="showHabits()">← Назад</button>';
  h+='</div>';
  openModal(h);
}

function saveHabit(){
  var nameEl = document.getElementById('habit_name');
  var descEl = document.getElementById('habit_desc');
  if(!nameEl || !nameEl.value.trim()){
    alert('⚠️ Введи название привычки!');
    return;
  }
  if(!db.habits) db.habits = [];
  var newId = Date.now().toString(36) + Math.random().toString(36).substr(2);
  db.habits.push({
    id: newId,
    name: nameEl.value.trim(),
    description: descEl ? descEl.value.trim() : '',
    log: {},
    created: new Date().toISOString().slice(0,10)
  });
  localStorage.setItem('solodev', JSON.stringify(db));
  alert('✅ Привычка "' + nameEl.value.trim() + '" сохранена!');
  showHabits();
}

function toggleHabit(index){
  if(!db.habits || !db.habits[index]) return;
  var todayStr = new Date().toISOString().slice(0,10);
  if(!db.habits[index].log) db.habits[index].log = {};
  if(db.habits[index].log[todayStr]){
    delete db.habits[index].log[todayStr];
    alert('⬜ Отменено на сегодня');
  } else {
    db.habits[index].log[todayStr] = true;
    alert('✅ Отлично! Привычка выполнена сегодня! 🔥');
    addToJournal('habit', {habitName: db.habits[index].name});
  }
  localStorage.setItem('solodev', JSON.stringify(db));
  showHabits();
  if(currentView === 'productivity') renderProductivity();
}

function deleteHabit(index){
  if(!db.habits || !db.habits[index]) return;
  if(confirm('Удалить привычку "' + db.habits[index].name + '"?')){
    db.habits.splice(index, 1);
    localStorage.setItem('solodev', JSON.stringify(db));
    alert('🗑 Привычка удалена');
    showHabits();
    if(currentView === 'productivity') renderProductivity();
  }
}

// === ДНЕВНИК ===
function showDiary(){
  if(!db.diary) db.diary = [];
  var h='<h3>📝 Дневник</h3>';
  h+='<p class="mut">Записывай мысли и рефлексируй</p>';
  h+='<textarea id="diary_entry" placeholder="Что произошло сегодня? Что я узнал? Что можно улучшить?" style="width:100%;min-height:120px;padding:10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff;margin-bottom:10px"></textarea>';
  h+='<button class="btn" style="width:100%;margin-bottom:15px" onclick="saveDiaryEntry()">💾 Сохранить запись</button>';
  if(db.diary.length > 0){
    h+='<h4 style="margin-top:20px">Последние записи:</h4>';
    db.diary.slice(-5).reverse().forEach(function(entry){
      h+='<div class="card" style="margin:8px 0">';
      h+='<div class="mut" style="font-size:11px;margin-bottom:5px">'+entry.date+'</div>';
      h+='<div>'+entry.text+'</div>';
      h+='</div>';
    });
  }
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function saveDiaryEntry(){
  var textEl = document.getElementById('diary_entry');
  if(!textEl || !textEl.value.trim()){
    alert('️ Напиши что-нибудь!');
    return;
  }
  if(!db.diary) db.diary = [];
  db.diary.push({
    date: new Date().toISOString().slice(0,10) + ' ' + new Date().toTimeString().slice(0,5),
    text: textEl.value.trim()
  });
  addToJournal('diary', {text: textEl.value.trim()});
  localStorage.setItem('solodev', JSON.stringify(db));
  alert('✅ Запись сохранена!');
        }
// === ВКЛАДКА ТАЙМ-ТРЕКЕР (ПОЛНЫЙ МОДУЛЬ) ===
function renderTimeTracker(){
  if(!db.timeEntries) db.timeEntries = [];
  if(!db.subscriptions) db.subscriptions = [];
  if(!db.hourlyRate) db.hourlyRate = 2000;
  var h='<h2> Тайм-трекер</h2>';
  h+='<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#ff9500;margin-bottom:15px">';
  h+='<div style="display:flex;justify-content:space-between;align-items:center">';
  h+='<div><div class="mut" style="color:#fff">Почасовая ставка</div><div style="font-size:24px;font-weight:bold;color:#ff9500">₽'+db.hourlyRate+'/час</div></div>';
  h+='<button class="btn small" style="background:#ff9500;color:#000" onclick="changeHourlyRate()">Изменить</button>';
  h+='</div></div>';
  var activeEntry = db.timeEntries.find(function(e){return !e.endTime;});
  if(activeEntry){
    h+='<div class="card" style="border:2px solid #3ecf8e;margin-bottom:15px;background:#102015">';
    h+='<h3 style="color:#3ecf8e;margin:0 0 10px 0">⏱ Сейчас работает</h3>';
    h+='<div style="font-size:16px;margin-bottom:5px"><b>'+activeEntry.project+'</b></div>';
    if(activeEntry.task) h+='<div class="mut" style="margin-bottom:10px;font-size:13px">'+activeEntry.task+'</div>';
    h+='<div style="font-size:36px;font-weight:bold;color:#3ecf8e;text-align:center;margin:15px 0" id="active_timer">00:00:00</div>';
    h+='<div style="text-align:center;margin-bottom:15px"><span class="mut">Заработано: </span><span style="color:#3ecf8e;font-weight:bold" id="active_earnings">₽0</span></div>';
    h+='<button class="btn" style="width:100%;background:#ff6b6b;font-size:16px;padding:15px" onclick="stopTimer()">⏹ Остановить и сохранить</button>';
    h+='</div>';
  } else {
    h+='<button class="btn" style="width:100%;margin-bottom:15px;background:#3ecf8e;font-size:16px;padding:15px" onclick="showStartTimer()">▶ Запустить таймер</button>';
  }
  var today = new Date().toISOString().slice(0,10);
  var weekStart = new Date(); weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  var weekStartStr = weekStart.toISOString().slice(0,10);
  var monthStart = today.slice(0,7);
  var todayHours = 0, weekHours = 0, monthHours = 0;
  var todayEarnings = 0, weekEarnings = 0, monthEarnings = 0;
  db.timeEntries.forEach(function(e){
    if(e.endTime && e.hours){
      var earnings = e.hours * db.hourlyRate;
      if(e.date === today){ todayHours += e.hours; todayEarnings += earnings; }
      if(e.date >= weekStartStr){ weekHours += e.hours; weekEarnings += earnings; }
      if(e.date.startsWith(monthStart)){ monthHours += e.hours; monthEarnings += earnings; }
    }
  });
  h+='<div class="card"><h3>📊 Статистика заработка</h3>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center">';
  h+='<div style="padding:10px;background:#1f2530;border-radius:8px"><div class="mut" style="font-size:11px">Сегодня</div><div style="font-size:18px;font-weight:bold;color:#6c8cff;margin:5px 0">'+todayHours.toFixed(2)+' ч</div><div style="font-size:13px;color:#3ecf8e">₽'+Math.round(todayEarnings).toLocaleString()+'</div></div>';
  h+='<div style="padding:10px;background:#1f2530;border-radius:8px"><div class="mut" style="font-size:11px">Неделя</div><div style="font-size:18px;font-weight:bold;color:#9d6cff;margin:5px 0">'+weekHours.toFixed(2)+' ч</div><div style="font-size:13px;color:#3ecf8e">₽'+Math.round(weekEarnings).toLocaleString()+'</div></div>';
  h+='<div style="padding:10px;background:#1f2530;border-radius:8px"><div class="mut" style="font-size:11px">Месяц</div><div style="font-size:18px;font-weight:bold;color:#ff9500;margin:5px 0">'+monthHours.toFixed(2)+' ч</div><div style="font-size:13px;color:#3ecf8e">₽'+Math.round(monthEarnings).toLocaleString()+'</div></div>';
  h+='</div></div>';
  var entriesByDate = {};
  db.timeEntries.filter(function(e){return e.endTime;}).sort(function(a,b){return b.date.localeCompare(a.date);}).forEach(function(e){
    if(!entriesByDate[e.date]) entriesByDate[e.date] = [];
    entriesByDate[e.date].push(e);
  });
  var dates = Object.keys(entriesByDate).slice(0,7);
  if(dates.length > 0){
    h+='<div style="margin-top:15px"><h3>📝 История записей</h3>';
    dates.forEach(function(date){
      var dayEntries = entriesByDate[date];
      var dayTotalHours = dayEntries.reduce(function(sum,e){return sum+(e.hours||0);},0);
      var dayTotalEarnings = dayTotalHours * db.hourlyRate;
      h+='<div class="card" style="margin-bottom:10px">';
      h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid #2a3040">';
      h+='<div style="font-weight:bold;color:#fff">'+formatDate(date)+'</div>';
      h+='<div style="text-align:right"><div style="font-size:14px;font-weight:bold;color:#6c8cff">'+dayTotalHours.toFixed(2)+' ч</div><div style="font-size:12px;color:#3ecf8e">₽'+Math.round(dayTotalEarnings).toLocaleString()+'</div></div>';
      h+='</div>';
      dayEntries.forEach(function(e){
        h+='<div style="padding:8px;margin:5px 0;background:#1f2530;border-radius:6px;border-left:3px solid #6c8cff">';
        h+='<div style="display:flex;justify-content:space-between;align-items:flex-start">';
        h+='<div style="flex:1">';
        h+='<div style="font-size:14px;font-weight:bold;color:#fff">'+e.project+'</div>';
        if(e.task) h+='<div class="mut" style="font-size:12px;margin-top:3px">'+e.task+'</div>';
        h+='<div class="mut" style="font-size:11px;margin-top:5px">'+formatTime(e.startTime)+' - '+formatTime(e.endTime)+'</div>';
        h+='</div>';
        h+='<div style="text-align:right;min-width:80px">';
        h+='<div style="font-size:15px;font-weight:bold;color:#3ecf8e">'+e.hours.toFixed(4)+' ч</div>';
        h+='<div style="font-size:12px;color:#6c8cff">₽'+Math.round(e.hours*db.hourlyRate).toLocaleString()+'</div>';
        h+='<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;margin-top:5px;padding:3px 8px;font-size:10px" onclick="deleteTimeEntry(\''+e.id+'\')">🗑</button>';
        h+='</div></div></div>';
      });
      h+='</div>';
    });
    h+='</div>';
  } else {
    h+='<div class="mut" style="text-align:center;padding:30px;margin-top:15px">Пока нет записей. Запусти таймер!</div>';
  }
  document.getElementById('app').innerHTML = h;
  if(activeEntry){
    if(window.activeTimerInterval) clearInterval(window.activeTimerInterval);
    window.activeTimerInterval = setInterval(function(){ updateActiveTimer(activeEntry); }, 1000);
    updateActiveTimer(activeEntry);
  }
}

function formatDate(dateStr){
  var date = new Date(dateStr);
  var months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  var days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  return days[date.getDay()]+', '+date.getDate()+' '+months[date.getMonth()]+' '+date.getFullYear()+' г.';
}

function formatTime(isoStr){
  if(!isoStr) return '';
  var date = new Date(isoStr);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  return (hours<10?'0':'')+hours+':'+(minutes<10?'0':'')+minutes;
}

function showStartTimer(){
  var h='<h3>▶ Запустить таймер</h3>';
  h+='<label style="color:#fff;font-size:12px">Проект/Клиент:</label>';
  h+='<select id="timer_project" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff">';
  if(!db.clients || db.clients.length === 0){
    h+='<option value="Общая работа">Общая работа</option>';
  } else {
    db.clients.forEach(function(c){
      h+='<option value="'+c.name+'">'+c.name+(c.company?' ('+c.company+')':'')+'</option>';
    });
  }
  h+='</select>';
  h+='<input id="timer_task" placeholder="Задача (например: Верстка главной)" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff">';
  h+='<button class="btn" style="width:100%;margin-top:10px;background:#3ecf8e;font-size:16px;padding:15px" onclick="startTimer()">▶ Запустить</button>';
  openModal(h);
}

function startTimer(){
  var project = document.getElementById('timer_project').value;
  var task = document.getElementById('timer_task').value.trim();
  if(!db.timeEntries) db.timeEntries = [];
  if(!db.subscriptions) db.subscriptions = [];
  db.timeEntries.push({
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    project: project, client: project, task: task,
    date: new Date().toISOString().slice(0,10),
    startTime: new Date().toISOString(), endTime: null, hours: 0
  });
  localStorage.setItem('solodev', JSON.stringify(db));
  closeModal();
  renderTimeTracker();
}

function stopTimer(){
  var activeEntry = db.timeEntries.find(function(e){return !e.endTime;});
  if(activeEntry){
    var end = new Date();
    var start = new Date(activeEntry.startTime);
    var diffMs = end - start;
    var hours = diffMs / (1000 * 60 * 60);
    activeEntry.endTime = end.toISOString();
    activeEntry.hours = Math.round(hours * 10000) / 10000;
    localStorage.setItem('solodev', JSON.stringify(db));
    if(window.activeTimerInterval) clearInterval(window.activeTimerInterval);
    alert('✅ Запись сохранена! Время: ' + activeEntry.hours.toFixed(2) + ' ч. Заработок: ₽' + Math.round(activeEntry.hours * db.hourlyRate).toLocaleString());
    renderTimeTracker();
  }
}

function updateActiveTimer(entry){
  var start = new Date(entry.startTime);
  var now = new Date();
  var diffMs = now - start;
  var hours = Math.floor(diffMs / (1000 * 60 * 60));
  var minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  var timeStr = (hours<10?'0':'')+hours+':'+(minutes<10?'0':'')+minutes+':'+(seconds<10?'0':'')+seconds;
  var timerEl = document.getElementById('active_timer');
  if(timerEl) timerEl.textContent = timeStr;
  
  var earningsEl = document.getElementById('active_earnings');
  if(earningsEl){
    var currentHours = diffMs / (1000 * 60 * 60);
    var currentEarnings = currentHours * db.hourlyRate;
    earningsEl.textContent = '₽'+Math.round(currentEarnings).toLocaleString();
  }
}

function changeHourlyRate(){
  var h='<h3>💰 Почасовая ставка</h3>';
  h+='<input id="new_rate" type="number" value="'+db.hourlyRate+'" placeholder="Ставка в ₽" style="width:100%;padding:10px;margin:10px 0;background:#1f2530;border:1px solid #ff9500;border-radius:6px;color:#fff;font-size:16px">';
  h+='<button class="btn" style="width:100%;margin-top:10px;background:#ff9500;font-size:16px;padding:15px" onclick="saveHourlyRate()">💾 Сохранить</button>';
  openModal(h);
}

function saveHourlyRate(){
  var rate = parseInt(document.getElementById('new_rate').value);
  if(rate > 0){
    db.hourlyRate = rate;
    localStorage.setItem('solodev', JSON.stringify(db));
    alert('✅ Ставка обновлена: ₽'+rate+'/час');
    closeModal();
    renderTimeTracker();
  }
}

function deleteTimeEntry(id){
  if(confirm('Удалить эту запись?')){
    db.timeEntries = db.timeEntries.filter(function(e){return e.id!==id;});
    localStorage.setItem('solodev', JSON.stringify(db));
    renderTimeTracker();
  }
}

// === ВКЛАДКА ПОДПИСКИ ===
function renderSubscriptions(){
  if(!db.subscriptions) db.subscriptions = [];
  var h='<h2>🔄 Подписки и регулярные расходы</h2>';
  
  // Статистика
  var monthlyTotal = 0, yearlyTotal = 0;
  var urgentSubs = [];
  var today = new Date();
  var todayStr = today.toISOString().slice(0,10);
  
  db.subscriptions.forEach(function(s){
    var amount = parseFloat(s.amount) || 0;
    if(s.billingCycle === 'yearly'){
      monthlyTotal += amount / 12;
      yearlyTotal += amount;
    } else {
      monthlyTotal += amount;
      yearlyTotal += amount * 12;
    }
    if(s.nextBillingDate){
      var daysUntil = Math.ceil((new Date(s.nextBillingDate) - today) / (1000*60*60*24));
      if(daysUntil >= 0 && daysUntil <= 3){
        urgentSubs.push({name: s.name, days: daysUntil, amount: amount});
      }
    }
  });
  
  h+='<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#ff9500;margin-bottom:15px">';
  h+='<div style="display:flex;justify-content:space-around;text-align:center">';
  h+='<div><div class="mut" style="color:#fff">В месяц</div><div style="font-size:20px;font-weight:bold;color:#ff9500">₽'+Math.round(monthlyTotal).toLocaleString()+'</div></div>';
  h+='<div><div class="mut" style="color:#fff">В год</div><div style="font-size:20px;font-weight:bold;color:#6c8cff">₽'+Math.round(yearlyTotal).toLocaleString()+'</div></div>';
  h+='</div></div>';
  
  // Предупреждения
  if(urgentSubs.length > 0){
    h+='<div class="card" style="border:2px solid #ff6b6b;margin-bottom:15px;background:#2a1015">';
    h+='<h3 style="color:#ff6b6b;margin:0 0 10px 0">⚠️ Скоро списание</h3>';
    urgentSubs.forEach(function(s){
      h+='<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;margin:5px 0;background:#1f2530;border-radius:6px">';
      h+='<div><b style="color:#fff">'+s.name+'</b><br><span class="mut" style="font-size:11px">Через '+s.days+' дн.</span></div>';
      h+='<div style="font-size:16px;font-weight:bold;color:#ff6b6b">₽'+s.amount.toLocaleString()+'</div>';
      h+='</div>';
    });
    h+='</div>';
  }
  
  h+='<button class="btn" style="width:100%;margin-bottom:15px;background:#9d6cff" onclick="showAddSubscription()">+ Добавить подписку</button>';
  
  // Группировка по категориям
  var categories = [
    {id:'dev', name:'💻 Разработка', color:'#6c8cff'},
    {id:'tools', name:' Инструменты', color:'#9d6cff'},
    {id:'entertainment', name:'🎬 Развлечения', color:'#ff9500'},
    {id:'other', name:' Другое', color:'#8b94a7'}
  ];
  
  categories.forEach(function(cat){
    var catSubs = db.subscriptions.filter(function(s){return s.category===cat.id;});
    if(catSubs.length > 0){
      var catMonthly = catSubs.reduce(function(sum,s){
        var amt = parseFloat(s.amount)||0;
        return sum + (s.billingCycle==='yearly' ? amt/12 : amt);
      }, 0);
      
      h+='<h4 style="color:'+cat.color+';margin:15px 0 10px 0">'+cat.name+' <span class="mut" style="font-size:12px">(₽'+Math.round(catMonthly)+'/мес)</span></h4>';
      catSubs.forEach(function(s){
        var daysUntil = s.nextBillingDate ? Math.ceil((new Date(s.nextBillingDate) - today) / (1000*60*60*24)) : null;
        var statusColor = daysUntil !== null ? (daysUntil <= 3 ? '#ff6b6b' : (daysUntil <= 7 ? '#ffd700' : '#3ecf8e')) : '#8b94a7';
        var statusText = daysUntil !== null ? (daysUntil === 0 ? 'Сегодня!' : 'Через '+daysUntil+' дн.') : 'Нет даты';
        
        h+='<div class="card" style="margin:8px 0;border-left:4px solid '+cat.color+'">';
        h+='<div style="display:flex;justify-content:space-between;align-items:flex-start">';
        h+='<div style="flex:1"><b style="font-size:15px">'+s.name+'</b>';
        if(s.notes) h+='<div class="mut" style="font-size:11px;margin-top:3px">'+s.notes+'</div>';
        h+='<div class="mut" style="font-size:11px;margin-top:3px">'+(s.billingCycle==='yearly'?'Раз в год':'Раз в месяц')+' | След.: '+formatDate(s.nextBillingDate||'')+'</div>';
        h+='</div>';
        h+='<div style="text-align:right;min-width:100px">';
        h+='<div style="font-size:18px;font-weight:bold;color:#ff9500">₽'+s.amount.toLocaleString()+'</div>';
        h+='<div style="font-size:11px;color:'+statusColor+';margin-top:3px">'+statusText+'</div>';
        h+='<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;margin-top:5px;padding:3px 8px;font-size:10px" onclick="deleteSubscription(\''+s.id+'\')">🗑</button>';
        h+='</div></div></div>';
      });
    }
  });
  
  if(db.subscriptions.length === 0){
    h+='<div class="mut" style="text-align:center;padding:30px">Пока нет подписок. Добавьте первую!</div>';
  }
  
  document.getElementById('app').innerHTML = h;
}

function showAddSubscription(){
  var h='<h3>➕ Новая подписка</h3>';
  h+='<input id="sub_name" placeholder="Название (GitHub Pro, Netflix...)" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #9d6cff;border-radius:6px;color:#fff">';
  h+='<select id="sub_category" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #9d6cff;border-radius:6px;color:#fff">';
  h+='<option value="dev">💻 Разработка</option>';
  h+='<option value="tools">🛠 Инструменты</option>';
  h+='<option value="entertainment">🎬 Развлечения</option>';
  h+='<option value="other">📦 Другое</option>';
  h+='</select>';
  h+='<input id="sub_amount" type="number" step="0.01" placeholder="Сумма (₽)" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #9d6cff;border-radius:6px;color:#fff">';
  h+='<select id="sub_cycle" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #9d6cff;border-radius:6px;color:#fff">';
  h+='<option value="monthly">Раз в месяц</option>';
  h+='<option value="yearly">Раз в год</option>';
  h+='</select>';
  h+='<input id="sub_date" type="date" placeholder="Дата следующего списания" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #9d6cff;border-radius:6px;color:#fff">';
  h+='<input id="sub_notes" placeholder="Заметки (необязательно)" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #9d6cff;border-radius:6px;color:#fff">';
  h+='<button class="btn" style="width:100%;margin-top:10px;background:#9d6cff" onclick="saveSubscription()">💾 Сохранить</button>';
  openModal(h);
}

function saveSubscription(){
  var name = document.getElementById('sub_name').value.trim();
  if(!name){alert('Введи название подписки!');return;}
  var amount = parseFloat(document.getElementById('sub_amount').value);
  if(!amount || amount <= 0){alert('Введи корректную сумму!');return;}
  if(!db.subscriptions) db.subscriptions = [];
  db.subscriptions.push({
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    name: name,
    category: document.getElementById('sub_category').value,
    amount: amount,
    billingCycle: document.getElementById('sub_cycle').value,
    nextBillingDate: document.getElementById('sub_date').value,
    notes: document.getElementById('sub_notes').value.trim(),
    created: new Date().toISOString().slice(0,10)
  });
  localStorage.setItem('solodev', JSON.stringify(db));
  alert('✅ Подписка добавлена! Всего: ' + db.subscriptions.length);
  closeModal();
  renderSubscriptions();
}

function deleteSubscription(id){
  if(confirm('Удалить эту подписку?')){
    db.subscriptions = db.subscriptions.filter(function(s){return s.id!==id;});
    localStorage.setItem('solodev', JSON.stringify(db));
    renderSubscriptions();
  }
}
// === КОНЕЦ ВКЛАДКИ ПОДПИСКИ ===

// === КОНЕЦ ВКЛАДКИ ТАЙМ-ТРЕКЕР ===

// === КОНЕЦ ВКЛАДКИ DEV TOOLS ===

// === КОНЕЦ ВКЛАДКИ АНАЛИТИКА ===

// === КОНЕЦ ВКЛАДКИ ГЕНЕРАТОРА ДОКУМЕНТОВ ===

// === КОНЕЦ ВКЛАДКИ ИНВЕСТИЦИИ ===

// === КОНЕЦ ВКЛАДКИ CRM ===

// === КОНЕЦ ВКЛАДКИ БАЗА ЗНАНИЙ ===

// === КОНЕЦ ВКЛАДКИ ЗДОРОВЬЕ ===

// === КОНЕЦ МОДУЛЯ ПРОДУКТИВНОСТИ ===

function showPomodoro(){
  var h='<h3>🍅 Pomodoro-таймер</h3>';
  h+='<p class="mut">Фокус на работе с интервалами отдыха</p>';
  
  h+='<div class="card" style="background:linear-gradient(135deg,#2f1a1a,#1a2035);border-color:#ff6b6b;text-align:center">';
  h+='<div id="pomodoro_timer" style="font-size:48px;font-weight:bold;color:#ff6b6b;margin:20px 0">25:00</div>';
  h+='<div id="pomodoro_status" class="mut">Готов к работе</div>';
  h+='</div>';
  
  h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:15px 0">';
  h+='<button class="btn" style="background:#ff6b6b" onclick="startPomodoro(25)">25 мин</button>';
  h+='<button class="btn" style="background:#6c8cff" onclick="startPomodoro(50)">50 мин</button>';
  h+='<button class="btn" style="background:#9d6cff" onclick="startPomodoro(90)">90 мин</button>';
  h+='</div>';
  
  h+='<div style="display:flex;gap:8px;margin-bottom:15px">';
  h+='<button class="btn" style="background:#3ecf8e;flex:1" onclick="pausePomodoro()">⏸ Пауза</button>';
  h+='<button class="btn" style="background:#6c8cff;flex:1" onclick="resumePomodoro()">▶ Продолжить</button>';
  h+='<button class="btn" style="background:#ff6b6b;flex:1" onclick="stopPomodoro()">⏹ Стоп</button>';
  h+='</div>';
  
  h+='<div class="card"><h3>⚙️ Настройки</h3>';
  h+='<label>Дневная цель (минут)</label>';
  h+='<input id="pomodoro_goal" type="number" value="'+(db.pomodoro.dailyGoal||25)+'" style="margin-bottom:10px">';
  h+='<button class="btn" style="width:100%" onclick="savePomodoroSettings()">💾 Сохранить</button>';
  h+='</div>';
  
  h+='<div class="card"><h3> История сессий</h3>';
  var recentSessions = db.pomodoro.sessions.slice(-5).reverse();
  if(recentSessions.length === 0){
    h+='<div class="mut" style="text-align:center;padding:10px">Нет сессий</div>';
  } else {
    recentSessions.forEach(function(s){
      h+='<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #242b36;font-size:12px">';
      h+='<div>'+s.date+' · '+s.duration+' мин</div>';
      h+='<div class="mut">'+(s.project||'Без проекта')+'</div>';
      h+='</div>';
    });
  }
  h+='</div>';
  
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

var pomodoroInterval = null;
var pomodoroTimeLeft = 0;
var pomodoroTotalTime = 0;

function startPomodoro(minutes){
  if(pomodoroInterval) clearInterval(pomodoroInterval);
  // Если время уже есть (была пауза), не сбрасываем его, иначе устанавливаем новое
  if(pomodoroTimeLeft === 0){
    pomodoroTimeLeft = minutes * 60;
    pomodoroTotalTime = minutes * 60;
  }
  var statusEl = document.getElementById('pomodoro_status');
  if(statusEl) statusEl.textContent = '🔥 В работе...';
  
  pomodoroInterval = setInterval(function(){
    pomodoroTimeLeft--;
    var mins = Math.floor(pomodoroTimeLeft / 60);
    var secs = pomodoroTimeLeft % 60;
    var timerEl = document.getElementById('pomodoro_timer');
    if(timerEl) timerEl.textContent = mins.toString().padStart(2,'0')+':'+secs.toString().padStart(2,'0');
    
    if(pomodoroTimeLeft <= 0){
      clearInterval(pomodoroInterval);
      pomodoroInterval = null;
      pomodoroTimeLeft = 0;
      if(statusEl) statusEl.textContent = '✅ Сессия завершена!';
      
      var todayStr = new Date().toISOString().slice(0,10);
      if(!db.deals) db.deals = [];
  if(!db.investments) db.investments = [];
  if(!db.timeEntries) db.timeEntries = [];
  if(!db.subscriptions) db.subscriptions = [];
  if(!db.hourlyRate) db.hourlyRate = 2000;
  if(!db.pomodoro) db.pomodoro = {sessions:[], totalTime:0, dailyGoal:25};
      db.pomodoro.sessions.push({date: todayStr, duration: pomodoroTotalTime/60, timestamp: new Date().toISOString()});
      db.pomodoro.totalTime = (db.pomodoro.totalTime || 0) + (pomodoroTotalTime/60);
      save();
      
      if('Notification' in window && Notification.permission === 'granted'){
        new Notification('🍅 Pomodoro завершён!', {body: 'Отличная работа!'});
      } else {
        alert('🍅 Pomodoro завершён!');
      }
      if(currentView === 'productivity') renderProductivity();
    }
  }, 1000);
}

function pausePomodoro(){
  if(pomodoroInterval){
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
  }
  var statusEl = document.getElementById('pomodoro_status');
  if(statusEl) statusEl.textContent = '⏸ На паузе';
}

function resumePomodoro(){
  if(pomodoroTimeLeft > 0){
    startPomodoro(Math.ceil(pomodoroTimeLeft / 60));
  }
}

function stopPomodoro(){
  if(pomodoroInterval){
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
  }
  pomodoroTimeLeft = 0;
  pomodoroTotalTime = 0;
  var timerEl = document.getElementById('pomodoro_timer');
  if(timerEl) timerEl.textContent = '25:00';
  var statusEl = document.getElementById('pomodoro_status');
  if(statusEl) statusEl.textContent = 'Готов к работе';
}

function savePomodoroSettings(){
  if(!db.deals) db.deals = [];
  if(!db.investments) db.investments = [];
  if(!db.timeEntries) db.timeEntries = [];
  if(!db.subscriptions) db.subscriptions = [];
  if(!db.hourlyRate) db.hourlyRate = 2000;
  if(!db.pomodoro) db.pomodoro = {sessions:[], totalTime:0, dailyGoal:25};
  var goalEl = document.getElementById('pomodoro_goal');
  if(goalEl && goalEl.value){
    db.pomodoro.dailyGoal = parseInt(goalEl.value) || 25;
    localStorage.setItem('solodev', JSON.stringify(db)); // Прямое сохранение
    alert('✅ Дневная цель сохранена: ' + db.pomodoro.dailyGoal + ' мин');
    showPomodoro(); // Перерисовываем окно с новым значением
  } else {
    alert('⚠️ Введите число минут');
  }
}


// === ТРЕКЕР ПРИВЫЧЕК (ИСПРАВЛЕННЫЙ) ===
function showHabits(){
  if(!db.habits) db.habits = [];
  var h='<h3>✅ Трекер привычек</h3>';
  h+='<p class="mut">Формируй полезные привычки с сериями 🔥</p>';
  if(db.habits.length === 0){
    h+='<div class="mut" style="text-align:center;padding:20px">Нет привычек. Создай первую!</div>';
  } else {
    db.habits.forEach(function(hab, index){
      var todayStr = new Date().toISOString().slice(0,10);
      var doneToday = hab.log && hab.log[todayStr];
      var streak = 0;
      var d = new Date();
      while(true){
        var ds = d.toISOString().slice(0,10);
        if(hab.log && hab.log[ds]){ streak++; d.setDate(d.getDate() - 1); }
        else { break; }
      }
      h+='<div class="card" style="margin:8px 0">';
      h+='<div style="display:flex;justify-content:space-between;align-items:flex-start">';
      h+='<div style="flex:1"><b style="font-size:15px">'+hab.name+'</b>';
      h+='<div class="mut" style="font-size:11px;margin-top:4px">🔥 Серия: '+streak+' дней</div>';
      if(hab.description) h+='<div class="mut" style="font-size:11px">'+hab.description+'</div>';
      h+='</div>';
      h+='<div style="display:flex;gap:6px">';
      h+='<button class="btn small" style="background:'+(doneToday?'#3ecf8e':'#1f2530')+';padding:6px 12px" onclick="toggleHabit('+index+')">'+(doneToday?'✅':'⬜')+'</button>';
      h+='<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:4px 8px" onclick="deleteHabit('+index+')">🗑</button>';
      h+='</div></div>';
    });
  }
  h+='<button class="btn" style="width:100%;margin-top:10px" onclick="addHabit()">+ Новая привычка</button>';
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:8px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function addHabit(){
  var h='<h3>➕ Новая привычка</h3>';
  h+='<label>Название</label><input id="habit_name" placeholder="Например: Медитация" style="width:100%;margin-bottom:10px;padding:8px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
  h+='<label>Описание</label><input id="habit_desc" placeholder="Кратко" style="width:100%;margin-bottom:10px;padding:8px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
  h+='<div style="display:flex;gap:10px;margin-top:15px">';
  h+='<button class="btn" style="flex:1" onclick="saveHabit()">💾 Сохранить</button>';
  h+='<button class="btn" style="background:#1f2530;flex:1" onclick="showHabits()">← Назад</button>';
  h+='</div>';
  openModal(h);
}

function saveHabit(){
  var nameEl = document.getElementById('habit_name');
  var descEl = document.getElementById('habit_desc');
  if(!nameEl || !nameEl.value.trim()){
    alert('⚠️ Введи название привычки!');
    return;
  }
  if(!db.habits) db.habits = [];
  var newId = Date.now().toString(36) + Math.random().toString(36).substr(2);
  db.habits.push({
    id: newId,
    name: nameEl.value.trim(),
    description: descEl ? descEl.value.trim() : '',
    log: {},
    created: new Date().toISOString().slice(0,10)
  });
  save();
  alert('✅ Привычка сохранена!');
  showHabits();
}

function toggleHabit(index){
  if(!db.habits || !db.habits[index]) return;
  var todayStr = new Date().toISOString().slice(0,10);
  if(!db.habits[index].log) db.habits[index].log = {};
  
  if(db.habits[index].log[todayStr]){
    delete db.habits[index].log[todayStr];
    alert('⬜ Отменено на сегодня');
  } else {
    db.habits[index].log[todayStr] = true;
    alert('✅ Отлично! Привычка выполнена сегодня! 🔥');
  }
  
  // Прямое и мгновенное сохранение
  localStorage.setItem('solodev', JSON.stringify(db));
  
  showHabits();
  if(currentView === 'productivity') renderProductivity();
}

function deleteHabit(index){
  if(!db.habits || !db.habits[index]) return;
  if(confirm('Удалить эту привычку?')){
    db.habits.splice(index, 1);
    save();
    showHabits();
    if(currentView === 'productivity') renderProductivity();
  }
}

function showDiary(){
  var h='<h3>📝 Дневник</h3>';
  h+='<p class="mut">Короткие заметки в конце дня</p>';
  
  h+='<textarea id="diary_text" rows="6" placeholder="Как прошёл день? Что удалось? Что можно улучшить?" style="width:100%;padding:10px;background:#1f2530;border:1px solid #6c8cff;border-radius:8px;color:#fff;font-size:13px;resize:vertical;margin-bottom:10px"></textarea>';
  h+='<button class="btn" style="width:100%;margin-bottom:15px" onclick="saveDiaryEntry()">💾 Сохранить запись</button>';
  
  if(db.diary.length === 0){
    h+='<div class="mut" style="text-align:center;padding:20px">Нет записей. Начни вести дневник!</div>';
  } else {
    h+='<div style="max-height:50vh;overflow:auto">';
    db.diary.slice().reverse().forEach(function(entry){
      h+='<div class="card" style="margin:8px 0">';
      h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
      h+='<b style="color:#6c8cff">'+entry.date+'</b>';
      h+='<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:2px 8px;font-size:10px" onclick="deleteDiaryEntry(\''+entry.id+'\')">🗑</button>';
      h+='</div>';
      h+='<div style="font-size:13px;line-height:1.5;white-space:pre-wrap">'+esc(entry.text)+'</div>';
      h+='</div>';
    });
    h+='</div>';
  }
  
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function saveDiaryEntry(){
  var text = document.getElementById('diary_text').value.trim();
  if(!text){alert('⚠️ Напиши хоть что-нибудь!');return;}
  db.diary.push({
    id: (typeof uid!=='undefined' ? uid() : Date.now().toString(36)+Math.random().toString(36).substr(2)),
    date: today(),
    text: text,
    timestamp: new Date().toISOString()
  });
  save();
  alert('✅ Запись сохранена');
  showDiary();
  if(currentView === 'productivity') renderProductivity();
}

function deleteDiaryEntry(id){
  if(confirm('Удалить запись?')){
    db.diary = db.diary.filter(function(d){return d.id!==id});
    save();
    showDiary();
  }
}

// === СТАТИСТИКА ФОКУСА ===
function showFocusStats(){
  var h='<h3>📊 Статистика фокуса</h3>';
  h+='<p class="mut">Анализ продуктивности</p>';
  
  // Общая статистика
  var totalSessions = db.pomodoro.sessions.length;
  var totalMinutes = db.pomodoro.totalTime || 0;
  var totalHours = Math.round(totalMinutes / 60 * 10) / 10;
  
  h+='<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#3a4a7a">';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center">';
  h+='<div><div class="mut" style="color:#fff">Всего сессий</div><div style="font-size:20px;font-weight:bold;color:#ff6b6b">'+totalSessions+'</div></div>';
  h+='<div><div class="mut" style="color:#fff">Всего минут</div><div style="font-size:20px;font-weight:bold;color:#3ecf8e">'+totalMinutes+'</div></div>';
  h+='<div><div class="mut" style="color:#fff">Всего часов</div><div style="font-size:20px;font-weight:bold;color:#6c8cff">'+totalHours+'</div></div>';
  h+='</div></div>';
  
  // Статистика за последние 7 дней
  h+='<div class="card"><h3>📅 Последние 7 дней</h3>';
  for(var i=6; i>=0; i--){
    var d = new Date();
    d.setDate(d.getDate() - i);
    var dateStr = d.toISOString().slice(0,10);
    var daySessions = db.pomodoro.sessions.filter(function(s){return s.date===dateStr});
    var dayMinutes = daySessions.reduce(function(a,s){return a+s.duration},0);
    var dayName = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'][d.getDay()];
    
    h+='<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #242b36">';
    h+='<div><b>'+dayName+'</b> <span class="mut">'+d.getDate()+'</span></div>';
    h+='<div style="text-align:right"><div style="font-weight:bold;color:#3ecf8e">'+dayMinutes+' мин</div>';
    h+='<div class="mut" style="font-size:10px">'+daySessions.length+' сессий</div></div>';
    h+='</div>';
  }
  h+='</div>';
  
  // Средняя продуктивность
  var avgPerDay = totalSessions > 0 ? Math.round(totalMinutes / 7) : 0;
  h+='<div class="card" style="text-align:center">';
  h+='<div class="mut">Среднее в день (7 дней)</div>';
  h+='<div style="font-size:28px;font-weight:bold;color:#9d6cff;margin:8px 0">'+avgPerDay+' мин</div>';
  h+='<div class="mut">'+(avgPerDay>=120?' Отличная продуктивность!':avgPerDay>=60?'👍 Хороший результат':'💪 Можно больше')+'</div>';
  h+='</div>';
  
  // Рекорды
  var bestDay = null;
  var bestDayMinutes = 0;
  var byDate = {};
  db.pomodoro.sessions.forEach(function(s){
    byDate[s.date] = (byDate[s.date] || 0) + s.duration;
  });
  Object.keys(byDate).forEach(function(date){
    if(byDate[date] > bestDayMinutes){
      bestDayMinutes = byDate[date];
      bestDay = date;
    }
  });
  
  if(bestDay){
    h+='<div class="card" style="background:linear-gradient(135deg,#2f2a1a,#1a2035);border-color:#f59e0b">';
    h+='<h3 style="color:#f59e0b;margin:0 0 10px 0">🏆 Рекорд</h3>';
    h+='<div style="font-size:13px">Лучший день: <b>'+bestDay+'</b></div>';
    h+='<div style="font-size:13px">Продуктивность: <b style="color:#f59e0b">'+bestDayMinutes+' минут</b></div>';
    h+='</div>';
  }
  
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:10px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function renderSettings(){
  var h='<h2>⚙️ Настройки</h2>';
  h+='<div class="card"><h3>👤 Профиль</h3>';
  h+='<label>Имя</label><input value="'+esc(db.profile.name)+'" onchange="db.profile.name=this.value;save()">';
  h+='<label>Специализация (основная)</label><input value="'+esc(db.profile.spec)+'" onchange="db.profile.spec=this.value;save()">';
  h+='<label>Телефон</label><input value="'+esc(db.profile.phone||'')+'" onchange="db.profile.phone=this.value;save()">';
  h+='<label>Email</label><input value="'+esc(db.profile.email||'')+'" onchange="db.profile.email=this.value;save()">';
  h+='</div>';
  h+='<div class="card"><h3>🎯 Мои специализации ('+((db.profile.specs||[]).length)+' выбрано)</h3><p class="mut">Отметьте ваши навыки — они будут использоваться в поиске вакансий и шаблонов</p><div class="spec-grid">';
  ALL_SPECS.forEach(function(sp){
    var checked=db.profile.specs&&db.profile.specs.indexOf(sp)>=0;
    h+='<label class="spec-check"><input type="checkbox" '+(checked?'checked':'')+' onchange="toggleSpec(\''+sp.replace(/'/g,"\\'")+'\')" style="width:auto"><span>'+sp+'</span></label>';
  });
  h+='</div></div>';
  h+='<div class="card"><h3>💾 Управление данными</h3>';
  h+='<p class="mut" style="margin-bottom:10px">Скачайте резервную копию или восстановите данные из файла</p>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">';
  h+='<button class="btn" style="background:#3ecf8e;padding:12px;font-size:14px" onclick="exportData()">📥 Экспорт</button>';
  h+='<button class="btn" style="background:#6c8cff;padding:12px;font-size:14px" onclick="importData()">📤 Импорт</button>';
  h+='</div></div>';
  h+='<div class="card"><h3> Сброс</h3><button class="btn" style="background:#ff6b6b" onclick="hardReset()">🗑 Сбросить всё</button></div>';
  document.getElementById('app').innerHTML=h;
}


function importData(){
  alert('📂 Выбор файла для импорта...');
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = function(e){
    alert('📄 Файл выбран: ' + (e.target.files[0] ? e.target.files[0].name : 'нет'));
    var file = e.target.files[0];
    if(!file){
      alert('❌ Файл не выбран');
      return;
    }
    var reader = new FileReader();
    reader.onload = function(event){
      try {
        alert('📖 Чтение файла...');
        var importedDb = JSON.parse(event.target.result);
        alert('✅ Файл прочитан. Тип: ' + typeof importedDb);
        alert('📋 Ключи в файле: ' + Object.keys(importedDb).join(', '));
        
        // Проверяем, что это объект и есть хотя бы profile или projects
        var isValid = importedDb && typeof importedDb === 'object' && (importedDb.profile || importedDb.projects || importedDb.clients);
        
        if(isValid){
          var confirmMsg = '⚠️ Внимание!\n\nЭто ЗАМЕНИТ все текущие данные на данные из файла.\n\nПродолжить?';
          if(confirm(confirmMsg)){
            alert('🔄 Замена данных...');
            db = importedDb;
            localStorage.setItem('solodev', JSON.stringify(db));
            alert('✅ Данные успешно импортированы!\n\nСтраница перезагрузится через 2 секунды...');
            setTimeout(function(){
              location.reload();
            }, 2000);
          } else {
            alert('❌ Импорт отменён пользователем');
          }
        } else {
          alert('❌ Неверный формат файла.\n\nЭто не резервная копия SoloDev.\nНайдено ключей: ' + Object.keys(importedDb || {}).length);
        }
      } catch(err){
        alert('❌ Ошибка чтения файла: ' + err.message);
        console.error('Import error:', err);
      }
    };
    reader.onerror = function(){
      alert('❌ Ошибка чтения файла (FileReader error)');
    };
    reader.readAsText(file);
  };
  input.click();
}

function exportData(){var blob=new Blob([JSON.stringify(db,null,2)],{type:'application/json'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='solodev_backup_'+today()+'.json';a.click()}
function hardReset(){if(confirm('Удалить все данные?')){localStorage.removeItem('solodev');location.reload()}}

function openModal(h){document.getElementById('modalContent').innerHTML=h;document.getElementById('modal').classList.add('on')}
function closeModal(){document.getElementById('modal').classList.remove('on')}

function loadExternalData(){
  var cacheBuster='?v='+Date.now();
  fetch('templates.json'+cacheBuster).then(function(r){return r.json()}).then(function(data){db.templates=data;save();render()}).catch(function(e){console.log('Templates error:',e)});
  fetch('sources.json'+cacheBuster).then(function(r){return r.json()}).then(function(data){db.sources=data;save();render()}).catch(function(e){console.log('Sources error:',e)});
  fetch('email_templates.json'+cacheBuster).then(function(r){return r.json()}).then(function(data){db.emailTemplates=data;save();render()}).catch(function(e){console.log('Email templates error:',e)});
  fetch('services.json'+cacheBuster).then(function(r){return r.json()}).then(function(data){db.services=data;save();render()}).catch(function(e){console.log('Services error:',e);});
}

window.onload=function(){
  try {
    if(!db.goals)db.goals=[];
    if(!db.recurring)db.recurring=[];
    if(!db.receivables)db.receivables=[];
    if(db.taxReserve===undefined)db.taxReserve=0;
    if(!db.budgets)db.budgets={};
    if(!db.pots)db.pots=[];
    if(!db.monthlyNeeds)db.monthlyNeeds=80000;
    if(!db.monthlyWants)db.monthlyWants=30000;
    if(!db.monthlySavings)db.monthlySavings=40000;
    if(!db.deals) db.deals = [];
  if(!db.investments) db.investments = [];
  if(!db.timeEntries) db.timeEntries = [];
  if(!db.subscriptions) db.subscriptions = [];
  if(!db.hourlyRate) db.hourlyRate = 2000;
  if(!db.pomodoro)db.pomodoro={sessions:[],totalTime:0,dailyGoal:25};
    if(!db.habits)db.habits=[];
    if(!db.diary)db.diary=[];
    if(!db.assets)db.assets=[];
    if(!db.liabilities)db.liabilities=[];
    if(!db.subscriptions)db.subscriptions=[];
    if(!db.quickTemplates)db.quickTemplates=[];
    if(!db.credits)db.credits=[];
    if(!db.paymentCalendar)db.paymentCalendar=[];
    if(!db.hourlyRate)db.hourlyRate=2000;
    save();
    
// === ГАРАНТИРОВАННОЕ ВОССТАНОВЛЕНИЕ ВКЛАДКИ ПРИ ЗАГРУЗКЕ ===
var savedView = localStorage.getItem('solodev_currentView');
if(savedView && ['home','dashboard','radar','projects','clients','finances','emails','pricing','productivity','settings'].includes(savedView)){
  currentView = savedView;
}
// ============================================================
renderNav();
    render();
    loadExternalData();
  } catch(e) {
    document.getElementById('app').innerHTML = '<div class="card" style="background:#2f1a1a;border-color:#ff6b6b"><h3>🚨 Ошибка загрузки</h3><pre style="color:#ff6b6b;font-size:12px;white-space:pre-wrap">'+e.message+'</pre><button class="btn" onclick="location.reload()">Перезагрузить</button></div>';
    console.error('SoloDev error:', e);
  }
};

function showBackupMenu(){ var h='<h3>💾 Резервное копирование</h3>'; h+='<button class="btn" style="width:100%;margin:10px 0;background:#3ecf8e" onclick="exportData()">📥 Экспорт данных</button>'; h+='<button class="btn" style="width:100%;margin:10px 0;background:#6c8cff" onclick="importData()">📤 Импорт данных</button>'; h+='<button class="btn" style="width:100%;background:#1f2530" onclick="closeModal()">Закрыть</button>'; openModal(h); }


// === ВОССТАНОВЛЕННЫЕ ФУНКЦИИ ===

function renderHealth(){
  if(!db.health) db.health = {sleep:7, water:0, steps:0};
  var h='<h2>🏥 Здоровье</h2>';
  h+='<div class="card"><h3>💧 Вода</h3><div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:24px;font-weight:bold;color:#6c8cff">'+db.health.water+' / 8</div><div><button class="btn small" onclick="updateHealth(\'water\', -1)">-</button> <button class="btn small" onclick="updateHealth(\'water\', 1)">+</button></div></div></div>';
  h+='<div class="card"><h3>😴 Сон</h3><div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:24px;font-weight:bold;color:#9d6cff">'+db.health.sleep+' ч</div><div><button class="btn small" onclick="updateHealth(\'sleep\', -0.5)">-</button> <button class="btn small" onclick="updateHealth(\'sleep\', 0.5)">+</button></div></div></div>';
  h+='<div class="card"><h3>🚶 Активность</h3><div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:24px;font-weight:bold;color:#3ecf8e">'+db.health.steps+' шагов</div><div><button class="btn small" onclick="updateHealth(\'steps\', -1000)">-</button> <button class="btn small" onclick="updateHealth(\'steps\', 1000)">+</button></div></div></div>';
  document.getElementById('app').innerHTML = h;
}
function updateHealth(key, val){ db.health[key] = Math.max(0, (db.health[key]||0) + val); localStorage.setItem('solodev', JSON.stringify(db)); renderHealth(); }

function renderKnowledge(){
  if(!db.knowledge) db.knowledge = [];
  var h='<h2>📚 База знаний</h2>';
  h+='<button class="btn" style="width:100%;margin-bottom:15px;background:#6c8cff" onclick="showAddKnowledge()">+ Добавить</button>';
  h+='<input type="text" id="knowledge_search" placeholder="🔍 Поиск..." oninput="filterKnowledge(this.value)" style="width:100%;padding:10px;margin-bottom:15px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
  h+='<div id="knowledge_list"></div>';
  document.getElementById('app').innerHTML = h;
  renderKnowledgeList(db.knowledge);
}
function renderKnowledgeList(items){
  var h=''; items.forEach(function(k){ h+='<div class="card" style="margin-bottom:10px"><div style="display:flex;justify-content:space-between"><b>'+k.title+'</b><button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b" onclick="deleteKnowledge(\''+k.id+'\')">🗑</button></div><div class="mut" style="font-size:12px;margin-top:5px">'+k.type+' | '+k.date+'</div>'+(k.content?'<div style="margin-top:8px;font-size:13px">'+k.content+'</div>':'')+'</div>'; });
  document.getElementById('knowledge_list').innerHTML = h || '<div class="mut" style="text-align:center">Ничего не найдено</div>';
}
function filterKnowledge(q){ var filtered = db.knowledge.filter(function(k){ return k.title.toLowerCase().includes(q.toLowerCase()) || (k.content&&k.content.toLowerCase().includes(q.toLowerCase())); }); renderKnowledgeList(filtered); }
function showAddKnowledge(){ var h='<h3>➕ Новое в базу знаний</h3><input id="k_title" placeholder="Название" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff"><select id="k_type" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff"><option value="Книга">📖 Книга</option><option value="Курс">🎓 Курс</option><option value="Ссылка">🔗 Ссылка</option><option value="Сниппет">💻 Сниппет</option></select><textarea id="k_content" placeholder="Описание" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff;min-height:80px"></textarea><button class="btn" style="width:100%;margin-top:10px;background:#6c8cff" onclick="saveKnowledge()">💾 Сохранить</button>'; openModal(h); }
function saveKnowledge(){ var title=document.getElementById('k_title').value.trim(); if(!title){alert('Введи название!');return;} if(!db.knowledge) db.knowledge=[]; db.knowledge.push({id:Date.now().toString(36), title:title, type:document.getElementById('k_type').value, content:document.getElementById('k_content').value.trim(), date:new Date().toISOString().slice(0,10)}); localStorage.setItem('solodev', JSON.stringify(db)); closeModal(); renderKnowledge(); }
function deleteKnowledge(id){ if(confirm('Удалить?')){ db.knowledge=db.knowledge.filter(function(k){return k.id!==id;}); localStorage.setItem('solodev', JSON.stringify(db)); renderKnowledge(); } }

function renderCRM(){
  if(!db.deals) db.deals = [];
  var h='<h2>🤝 CRM</h2><button class="btn" style="width:100%;margin-bottom:15px;background:#3ecf8e" onclick="showAddDeal()">+ Новая сделка</button>';
  var stages = {new:'Новые', negotiation:'Переговоры', in_progress:'В работе', completed:'Завершено'};
  var stageColors = {new:'#8b94a7', negotiation:'#ffd700', in_progress:'#6c8cff', completed:'#3ecf8e'};
  Object.keys(stages).forEach(function(stage){
    var deals = db.deals.filter(function(d){return d.stage===stage;});
    var sum = deals.reduce(function(s,d){return s+(parseFloat(d.amount)||0);},0);
    h+='<div class="card" style="border-left:4px solid '+stageColors[stage]+'"><h4 style="margin:0 0 10px 0;color:'+stageColors[stage]+'">'+stages[stage]+' ('+deals.length+') <span style="font-size:12px;color:#fff">₽'+sum.toLocaleString()+'</span></h4>';
    deals.forEach(function(d){
      h+='<div style="padding:8px;margin:5px 0;background:#1f2530;border-radius:4px"><div style="display:flex;justify-content:space-between"><b>'+d.name+'</b><span style="color:#3ecf8e">₽'+(parseFloat(d.amount)||0).toLocaleString()+'</span></div><div class="mut" style="font-size:11px">'+d.client+'</div><div style="margin-top:5px;display:flex;gap:5px">';
      if(stage!=='completed') h+='<button class="btn small" style="background:#3ecf8e;padding:2px 6px;font-size:10px" onclick="moveDeal(\''+d.id+'\',\'next\')">➡️</button>';
      h+='<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:2px 6px;font-size:10px" onclick="deleteDeal(\''+d.id+'\')">🗑</button></div></div>';
    });
    h+='</div>';
  });
  document.getElementById('app').innerHTML = h;
}
function showAddDeal(){ var h='<h3>➕ Новая сделка</h3><input id="deal_name" placeholder="Название" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff"><input id="deal_client" placeholder="Клиент" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff"><input id="deal_amount" type="number" placeholder="Сумма (₽)" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff"><button class="btn" style="width:100%;margin-top:10px;background:#3ecf8e" onclick="saveDeal()">💾 Сохранить</button>'; openModal(h); }
function saveDeal(){ var name=document.getElementById('deal_name').value.trim(); if(!name){alert('Введи название!');return;} if(!db.deals) db.deals=[]; db.deals.push({id:Date.now().toString(36), name:name, client:document.getElementById('deal_client').value.trim(), amount:parseFloat(document.getElementById('deal_amount').value)||0, stage:'new', date:new Date().toISOString().slice(0,10)}); localStorage.setItem('solodev', JSON.stringify(db)); alert('✅ Сделка сохранена! Всего: ' + db.deals.length); closeModal(); renderCRM(); }
function moveDeal(id, dir){ var stages=['new','negotiation','in_progress','completed']; var deal=db.deals.find(function(d){return d.id===id;}); if(deal){ var idx=stages.indexOf(deal.stage); if(dir==='next' && idx<stages.length-1) deal.stage=stages[idx+1]; localStorage.setItem('solodev', JSON.stringify(db)); renderCRM(); } }
function deleteDeal(id){ if(confirm('Удалить сделку?')){ db.deals=db.deals.filter(function(d){return d.id!==id;}); localStorage.setItem('solodev', JSON.stringify(db)); renderCRM(); } }

function renderInvestments(){
  if(!db.investments) db.investments = [];
  var h='<h2>📈 Инвестиции</h2>';
  var totalInvested = 0, totalCurrent = 0;
  db.investments.forEach(function(inv){ totalInvested += (parseFloat(inv.buyPrice)||0)*(parseFloat(inv.quantity)||0); totalCurrent += (parseFloat(inv.currentPrice)||0)*(parseFloat(inv.quantity)||0); });
  var profit = totalCurrent - totalInvested;
  var profitPercent = totalInvested > 0 ? ((profit / totalInvested) * 100).toFixed(2) : 0;
  var profitColor = profit >= 0 ? '#3ecf8e' : '#ff6b6b';
  var profitSign = profit >= 0 ? '+' : '';
  h+='<div class="card" style="background:linear-gradient(135deg,#1a2035,#102a20);border-color:#3ecf8e;margin-bottom:15px"><div style="display:flex;justify-content:space-around;text-align:center"><div><div class="mut" style="color:#fff">Вложено</div><div style="font-size:18px;font-weight:bold;color:#6c8cff">₽'+totalInvested.toLocaleString()+'</div></div><div><div class="mut" style="color:#fff">Сейчас</div><div style="font-size:18px;font-weight:bold;color:#fff">₽'+totalCurrent.toLocaleString()+'</div></div><div><div class="mut" style="color:#fff">Прибыль</div><div style="font-size:18px;font-weight:bold;color:'+profitColor+'">'+profitSign+'₽'+profit.toLocaleString()+' ('+profitSign+profitPercent+'%)</div></div></div></div>';
  h+='<button class="btn" style="width:100%;margin-bottom:15px;background:#3ecf8e" onclick="showAddInvestment()">+ Добавить актив</button>';
  var types = [{id:'stocks', name:'📊 Акции', color:'#6c8cff'},{id:'crypto', name:'₿ Крипто', color:'#ff9500'},{id:'bonds', name:'📜 Облигации', color:'#9d6cff'},{id:'deposit', name:'🏦 Депозиты', color:'#3ecf8e'},{id:'realty', name:'🏠 Недвижимость', color:'#ffd700'},{id:'other', name:'📦 Другое', color:'#8b94a7'}];
  types.forEach(function(type){
    var typeItems = db.investments.filter(function(i){return i.type===type.id;});
    if(typeItems.length > 0){
      h+='<h4 style="color:'+type.color+';margin:15px 0 10px 0">'+type.name+' ('+typeItems.length+')</h4>';
      typeItems.forEach(function(inv){
        var invested = (parseFloat(inv.buyPrice)||0)*(parseFloat(inv.quantity)||0);
        var current = (parseFloat(inv.currentPrice)||0)*(parseFloat(inv.quantity)||0);
        var p = current - invested;
        var pColor = p >= 0 ? '#3ecf8e' : '#ff6b6b';
        var pSign = p >= 0 ? '+' : '';
        h+='<div class="card" style="margin:8px 0;border-left:4px solid '+type.color+'"><div style="display:flex;justify-content:space-between;align-items:flex-start"><div style="flex:1"><b style="font-size:15px">'+inv.name+'</b>'+(inv.notes?'<div class="mut" style="font-size:11px;margin-top:3px">'+inv.notes+'</div>':'')+'<div class="mut" style="font-size:11px;margin-top:3px">Куплено: '+inv.date+' | '+inv.quantity+' шт. по ₽'+inv.buyPrice+'</div></div><div style="text-align:right;min-width:100px"><div style="font-size:11px;color:#8b94a7">Сейчас: ₽'+inv.currentPrice+'</div><div style="font-size:14px;font-weight:bold;color:'+pColor+'">'+pSign+'₽'+p.toLocaleString()+'</div><div style="font-size:11px;color:'+pColor+'">'+pSign+((invested>0)?((p/invested)*100).toFixed(1):'0')+'%</div></div></div><button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;margin-top:8px;width:100%" onclick="deleteInvestment(\''+inv.id+'\')">🗑 Удалить</button></div>';
      });
    }
  });
  if(db.investments.length === 0) h+='<div class="mut" style="text-align:center;padding:30px">Пока нет инвестиций. Добавьте первый актив!</div>';
  document.getElementById('app').innerHTML = h;
}
function showAddInvestment(){ var h='<h3>➕ Новый актив</h3><input id="inv_name" placeholder="Название (Sberbank, BTC...)" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff"><select id="inv_type" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff"><option value="stocks">📊 Акции</option><option value="crypto">₿ Крипто</option><option value="bonds">📜 Облигации</option><option value="deposit">🏦 Депозит</option><option value="realty">🏠 Недвижимость</option><option value="other">📦 Другое</option></select><input id="inv_quantity" type="number" step="0.0001" placeholder="Количество" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff"><input id="inv_buy_price" type="number" step="0.01" placeholder="Цена покупки (₽)" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff"><input id="inv_current_price" type="number" step="0.01" placeholder="Текущая цена (₽)" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff"><input id="inv_notes" placeholder="Заметки" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff"><button class="btn" style="width:100%;margin-top:10px;background:#3ecf8e" onclick="saveInvestment()">💾 Сохранить</button>'; openModal(h); }
function saveInvestment(){ var name=document.getElementById('inv_name').value.trim(); if(!name){alert('Введи название!');return;} if(!db.investments) db.investments=[]; db.investments.push({id:Date.now().toString(36)+Math.random().toString(36).substr(2), name:name, type:document.getElementById('inv_type').value, quantity:parseFloat(document.getElementById('inv_quantity').value)||0, buyPrice:parseFloat(document.getElementById('inv_buy_price').value)||0, currentPrice:parseFloat(document.getElementById('inv_current_price').value)||0, notes:document.getElementById('inv_notes').value.trim(), date:new Date().toISOString().slice(0,10)}); localStorage.setItem('solodev', JSON.stringify(db)); alert('Актив добавлен! Всего: ' + db.investments.length); closeModal(); renderInvestments(); }
function deleteInvestment(id){ if(confirm('Удалить этот актив?')){ db.investments=db.investments.filter(function(i){return i.id!==id;}); localStorage.setItem('solodev', JSON.stringify(db)); renderInvestments(); } }

function renderDocuments(){
    if (typeof openDocGenerator === 'function') {
        openDocGenerator();
        // Возвращаем роутер на главную, чтобы кнопки навигации и "Назад" работали корректно
        go('home');
    } else {
        document.getElementById('app').innerHTML = '<h2>📄 Генератор документов</h2><p>Загрузка...</p><button class="btn" onclick="go(\'home\')">⬅️ Назад</button>';
    }
}

function renderDevTools(){
  var h='<h2>🛠 Dev Tools</h2><div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#ff9500;margin-bottom:15px"><h3 style="color:#fff;margin:0">Инструменты разработчика</h3><p class="mut" style="margin:10px 0 0 0;color:#fff">Быстрые утилиты для повседневных задач</p></div>';
  h+='<button class="btn" style="width:100%;margin-bottom:10px;background:#6c8cff" onclick="showJSONFormatter()">📋 JSON Форматтер</button>';
  h+='<button class="btn" style="width:100%;margin-bottom:10px;background:#9d6cff" onclick="showBase64Tool()">🔐 Base64 Кодировщик</button>';
  h+='<button class="btn" style="width:100%;margin-bottom:10px;background:#3ecf8e" onclick="showPasswordGenerator()">🔑 Генератор паролей</button>';
  h+='<button class="btn" style="width:100%;margin-bottom:15px;background:#ff9500" onclick="showColorConverter()">🎨 Конвертер цветов</button>';
  document.getElementById('app').innerHTML = h;
}
function showJSONFormatter(){ var h='<h3>📋 JSON Форматтер</h3><textarea id="json_input" placeholder="Вставь JSON сюда..." style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-family:monospace;font-size:12px;min-height:120px"></textarea><button class="btn" style="width:100%;margin:5px 0;background:#6c8cff" onclick="formatJSON()">✨ Форматировать</button><button class="btn" style="width:100%;margin:5px 0;background:#1f2530" onclick="minifyJSON()">📦 Минифицировать</button><textarea id="json_output" readonly placeholder="Результат..." style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#3ecf8e;font-family:monospace;font-size:12px;min-height:120px"></textarea><button class="btn" style="width:100%;background:#3ecf8e" onclick="copyDevToolResult(\'json_output\')">📋 Копировать</button>'; openModal(h); }
function formatJSON(){ try{ var input=document.getElementById('json_input').value; var obj=JSON.parse(input); document.getElementById('json_output').value=JSON.stringify(obj,null,2); }catch(e){ document.getElementById('json_output').value='❌ Ошибка: '+e.message; } }
function minifyJSON(){ try{ var input=document.getElementById('json_input').value; var obj=JSON.parse(input); document.getElementById('json_output').value=JSON.stringify(obj); }catch(e){ document.getElementById('json_output').value='❌ Ошибка: '+e.message; } }
function showBase64Tool(){ var h='<h3>🔐 Base64 Кодировщик</h3><textarea id="base64_input" placeholder="Введи текст..." style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #9d6cff;border-radius:6px;color:#fff;font-family:monospace;font-size:12px;min-height:100px"></textarea><button class="btn" style="width:100%;margin:5px 0;background:#9d6cff" onclick="encodeBase64()">🔒 Кодировать</button><button class="btn" style="width:100%;margin:5px 0;background:#6c8cff" onclick="decodeBase64()">🔓 Декодировать</button><textarea id="base64_output" readonly placeholder="Результат..." style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#3ecf8e;font-family:monospace;font-size:12px;min-height:100px"></textarea><button class="btn" style="width:100%;background:#3ecf8e" onclick="copyDevToolResult(\'base64_output\')">📋 Копировать</button>'; openModal(h); }
function encodeBase64(){ try{ var input=document.getElementById('base64_input').value; document.getElementById('base64_output').value=btoa(unescape(encodeURIComponent(input))); }catch(e){ document.getElementById('base64_output').value='❌ Ошибка: '+e.message; } }
function decodeBase64(){ try{ var input=document.getElementById('base64_input').value; document.getElementById('base64_output').value=decodeURIComponent(escape(atob(input))); }catch(e){ document.getElementById('base64_output').value='❌ Ошибка: Неверный Base64'; } }
function showPasswordGenerator(){ var h='<h3>🔑 Генератор паролей</h3><label style="color:#fff;font-size:12px">Длина: <span id="pass_len_val">16</span></label><input id="pass_length" type="range" min="8" max="32" value="16" oninput="document.getElementById(\'pass_len_val\').textContent=this.value" style="width:100%;margin:10px 0"><div style="margin:10px 0"><label style="color:#fff;font-size:12px;display:block;margin:5px 0"><input type="checkbox" id="pass_upper" checked style="margin-right:5px"> Заглавные (A-Z)</label><label style="color:#fff;font-size:12px;display:block;margin:5px 0"><input type="checkbox" id="pass_lower" checked style="margin-right:5px"> Строчные (a-z)</label><label style="color:#fff;font-size:12px;display:block;margin:5px 0"><input type="checkbox" id="pass_numbers" checked style="margin-right:5px"> Цифры (0-9)</label><label style="color:#fff;font-size:12px;display:block;margin:5px 0"><input type="checkbox" id="pass_symbols" checked style="margin-right:5px"> Символы (!@#...)</label></div><button class="btn" style="width:100%;margin:10px 0;background:#3ecf8e" onclick="generatePassword()">🔑 Сгенерировать</button><input id="pass_result" readonly style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#3ecf8e;font-family:monospace;font-size:14px;text-align:center"><button class="btn" style="width:100%;background:#3ecf8e" onclick="copyDevToolResult(\'pass_result\')">📋 Копировать</button>'; openModal(h); }
function generatePassword(){ var length=parseInt(document.getElementById('pass_length').value), useUpper=document.getElementById('pass_upper').checked, useLower=document.getElementById('pass_lower').checked, useNumbers=document.getElementById('pass_numbers').checked, useSymbols=document.getElementById('pass_symbols').checked; var chars=''; if(useUpper) chars+='ABCDEFGHIJKLMNOPQRSTUVWXYZ'; if(useLower) chars+='abcdefghijklmnopqrstuvwxyz'; if(useNumbers) chars+='0123456789'; if(useSymbols) chars+='!@#$%^&*()_+-=[]{}|;:,.<>?'; if(chars===''){ document.getElementById('pass_result').value='Выбери тип символов!'; return; } var password=''; for(var i=0;i<length;i++){ password+=chars.charAt(Math.floor(Math.random()*chars.length)); } document.getElementById('pass_result').value=password; }
function showColorConverter(){ var h='<h3>🎨 Конвертер цветов</h3><label style="color:#fff;font-size:12px">HEX цвет:</label><input id="color_hex" placeholder="#ff9500" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #ff9500;border-radius:6px;color:#fff;font-family:monospace"><input id="color_picker" type="color" value="#ff9500" oninput="document.getElementById(\'color_hex\').value=this.value;convertColor()" style="width:100%;height:50px;margin:10px 0;border:none;border-radius:6px;cursor:pointer"><button class="btn" style="width:100%;margin:10px 0;background:#ff9500" onclick="convertColor()">🔄 Конвертировать</button><div id="color_result" style="padding:15px;margin:10px 0;background:#1f2530;border-radius:6px;text-align:center"><div style="width:100%;height:80px;background:#ff9500;border-radius:6px;margin-bottom:10px"></div><div style="color:#fff;font-size:14px">HEX: <b id="color_hex_val">#ff9500</b></div><div style="color:#fff;font-size:14px">RGB: <b id="color_rgb_val">rgb(255, 149, 0)</b></div></div><button class="btn" style="width:100%;background:#3ecf8e" onclick="copyColorValues()">📋 Копировать значения</button>'; openModal(h); }
function convertColor(){ var hex=document.getElementById('color_hex').value.trim(); if(!hex.startsWith('#')) hex='#'+hex; if(/^#[0-9A-F]{6}$/i.test(hex)){ var r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16); document.getElementById('color_hex_val').textContent=hex.toUpperCase(); document.getElementById('color_rgb_val').textContent='rgb('+r+', '+g+', '+b+')'; document.querySelector('#color_result div:first-child').style.background=hex; document.getElementById('color_picker').value=hex; } else { document.getElementById('color_hex_val').textContent='Неверный HEX'; document.getElementById('color_rgb_val').textContent='-'; } }
function copyColorValues(){ var hex=document.getElementById('color_hex_val').textContent, rgb=document.getElementById('color_rgb_val').textContent; navigator.clipboard.writeText('HEX: '+hex+'\nRGB: '+rgb).then(function(){ alert('✅ Скопировано!'); }).catch(function(){ alert('❌ Ошибка'); }); }
function copyDevToolResult(elementId){ var text=document.getElementById(elementId).value; if(!text||text.startsWith('❌')){ alert('Нечего копировать!'); return; } navigator.clipboard.writeText(text).then(function(){ alert('✅ Скопировано!'); }).catch(function(){ alert('❌ Ошибка'); }); }

// === УТИЛИТА: ЖУРНАЛ СОБЫТИЙ ===
function addToJournal(type, data) {
    if (!db.journal) db.journal = [];
    db.journal.push({
        id: Date.now().toString(36),
        type: type,
        data: data,
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toTimeString().slice(0, 5),
        timestamp: new Date().toISOString()
    });
    // Ограничиваем журнал последними 100 записями, чтобы не переполнять localStorage
    if (db.journal.length > 100) {
        db.journal = db.journal.slice(-100);
    }
    localStorage.setItem('solodev', JSON.stringify(db));
}
// === КОНЕЦ УТИЛИТЫ ЖУРНАЛА ===

// === ВКЛАДКА КАЛЬКУЛЯТОР СТОИМОСТИ ПРОЕКТА ===
function renderCalculator(){
  if(!db.estimates) db.estimates = [];
  var rate = db.hourlyRate || 2000;
  var h='<h2>🧮 Калькулятор стоимости проекта</h2>';
  
  h+='<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#ff9500;margin-bottom:15px">';
  h+='<div style="display:flex;justify-content:space-between;align-items:center">';
  h+='<div><div class="mut" style="color:#fff">Текущая ставка</div><div style="font-size:24px;font-weight:bold;color:#ff9500">₽'+rate+'/час</div></div>';
  h+='<button class="btn small" style="background:#ff9500;color:#000" onclick="go(\'timetracker\')">Изменить</button>';
  h+='</div></div>';

  h+='<div class="card">';
  h+='<h3>➕ Добавить задачу</h3>';
  h+='<input id="est_task_name" placeholder="Название задачи (напр. Верстка главной)" style="width:100%;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
  h+='<div style="display:flex;gap:10px">';
  h+='<input id="est_task_hours" type="number" step="0.5" placeholder="Часы" style="flex:1;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
  h+='<select id="est_task_complexity" style="flex:1;padding:10px;margin:5px 0;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
  h+='<option value="1">🟢 Простая (x1.0)</option>';
  h+='<option value="1.5">🟡 Средняя (x1.5)</option>';
  h+='<option value="2">🔴 Сложная (x2.0)</option>';
  h+='</select></div>';
  h+='<button class="btn" style="width:100%;margin-top:10px;background:#6c8cff" onclick="addEstimateTask()">Добавить задачу</button>';
  h+='</div>';

  h+='<div class="card" id="est_preview">';
  h+='<h3>📋 Текущий расчёт</h3>';
  h+='<div id="est_tasks_list"></div>';
  h+='<div style="margin-top:15px;border-top:1px solid #2a3040;padding-top:10px">';
  h+='<label style="color:#fff;font-size:12px">Риск-буфер:</label>';
  h+='<select id="est_buffer" onchange="updateEstimatePreview()" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ff9500;border-radius:6px;color:#fff">';
  h+='<option value="0">0% (Без буфера)</option>';
  h+='<option value="10">10% (Минимальный риск)</option>';
  h+='<option value="15" selected>15% (Средний риск)</option>';
  h+='<option value="20">20% (Стандарт)</option>';
  h+='<option value="30">30% (Высокий риск / Новый клиент)</option>';
  h+='</select>';
  h+='<div style="display:flex;justify-content:space-between;margin-top:10px;font-size:14px"><span>Итого часов:</span><b id="est_total_hours">0 ч</b></div>';
  h+='<div style="display:flex;justify-content:space-between;margin-top:5px;font-size:14px"><span>Стоимость без буфера:</span><b id="est_base_cost">₽0</b></div>';
  h+='<div style="display:flex;justify-content:space-between;margin-top:5px;font-size:18px;font-weight:bold;color:#3ecf8e"><span>ИТОГО К ОПЛАТЕ:</span><b id="est_total_cost">₽0</b></div>';
  h+='</div>';
  h+='<div style="display:flex;gap:10px;margin-top:15px">';
  h+='<button class="btn" style="flex:1;background:#3ecf8e" onclick="generateEstimateProposal()">📄 Сгенерировать КП</button>';
  h+='<button class="btn" style="flex:1;background:#9d6cff" onclick="saveEstimateToHistory()">💾 Сохранить</button>';
  h+='</div></div>';

  h+='<h3 style="margin-top:20px">📜 История расчётов</h3>';
  if(db.estimates && db.estimates.length > 0){
    db.estimates.slice().reverse().forEach(function(est, idx){
      var realIdx = db.estimates.length - 1 - idx;
      h+='<div class="card" style="margin-bottom:10px;border-left:4px solid #9d6cff">';
      h+='<div style="display:flex;justify-content:space-between"><b>'+(est.projectName || 'Без названия')+'</b><span style="color:#3ecf8e;font-weight:bold">₽'+est.totalCost.toLocaleString()+'</span></div>';
      h+='<div class="mut" style="font-size:11px;margin-top:5px">'+est.date+' | '+est.totalHours+' ч | Буфер: '+est.bufferPercent+'%</div>';
      h+='<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;margin-top:8px;width:100%" onclick="deleteEstimate('+realIdx+')">🗑 Удалить</button>';
      h+='</div>';
    });
  } else {
    h+='<div class="mut" style="text-align:center;padding:20px">История пуста</div>';
  }
  document.getElementById('app').innerHTML = h;
  if(!window.estTasks) window.estTasks = [];
  updateEstimatePreview();
}

function addEstimateTask(){
  var name = document.getElementById('est_task_name').value.trim();
  var hours = parseFloat(document.getElementById('est_task_hours').value);
  var complexity = parseFloat(document.getElementById('est_task_complexity').value);
  if(!name || !hours || hours <= 0){ alert('Заполни название и часы!'); return; }
  if(!window.estTasks) window.estTasks = [];
  window.estTasks.push({ name: name, hours: hours, complexity: complexity });
  document.getElementById('est_task_name').value = '';
  document.getElementById('est_task_hours').value = '';
  updateEstimatePreview();
}

function removeEstimateTask(index){
  window.estTasks.splice(index, 1);
  updateEstimatePreview();
}

function updateEstimatePreview(){
  if(!window.estTasks) window.estTasks = [];
  var rate = db.hourlyRate || 2000;
  var bufferEl = document.getElementById('est_buffer');
  var bufferPercent = bufferEl ? parseInt(bufferEl.value) : 10;
  var listHtml = '', totalHours = 0, baseCost = 0;

  window.estTasks.forEach(function(task, idx){
    var effectiveHours = task.hours * task.complexity;
    totalHours += effectiveHours;
    var taskCost = effectiveHours * rate;
    baseCost += taskCost;
    var compText = task.complexity === 1 ? '🟢' : (task.complexity === 1.5 ? '🟡' : '🔴');
    listHtml += '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;margin:5px 0;background:#1f2530;border-radius:6px">';
    listHtml += '<div style="flex:1"><div style="font-size:14px;font-weight:bold">'+compText+' '+task.name+'</div><div class="mut" style="font-size:11px">'+task.hours+' ч × '+task.complexity+' = '+effectiveHours.toFixed(1)+' эфф. ч</div></div>';
    listHtml += '<div style="text-align:right;margin-right:10px"><div style="color:#3ecf8e;font-weight:bold">₽'+Math.round(taskCost).toLocaleString()+'</div></div>';
    listHtml += '<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:2px 6px" onclick="removeEstimateTask('+idx+')">✕</button>';
    listHtml += '</div>';
  });

  if(window.estTasks.length === 0) listHtml = '<div class="mut" style="text-align:center;padding:10px">Задачи не добавлены</div>';
  var listEl = document.getElementById('est_tasks_list');
  if(listEl) listEl.innerHTML = listHtml;

  var totalCost = baseCost * (1 + bufferPercent / 100);
  var hoursEl = document.getElementById('est_total_hours');
  if(hoursEl) hoursEl.textContent = totalHours.toFixed(1) + ' ч';
  var baseEl = document.getElementById('est_base_cost');
  if(baseEl) baseEl.textContent = '₽' + Math.round(baseCost).toLocaleString();
  var totalEl = document.getElementById('est_total_cost');
  if(totalEl) totalEl.textContent = '₽' + Math.round(totalCost).toLocaleString();
}

function generateEstimateProposal(){
  if(!window.estTasks || window.estTasks.length === 0){ alert('Добавь хотя бы одну задачу!'); return; }
  var rate = db.hourlyRate || 2000;
  var bufferPercent = parseInt(document.getElementById('est_buffer').value);
  var totalHours = 0, baseCost = 0, tasksText = '';
  
  window.estTasks.forEach(function(task){
    var effHours = task.hours * task.complexity;
    totalHours += effHours;
    baseCost += effHours * rate;
    tasksText += '- ' + task.name + ' (' + task.hours + ' ч, сложность x' + task.complexity + ')\n';
  });
  
  var totalCost = Math.round(baseCost * (1 + bufferPercent / 100));
  var profileName = (db.profile && db.profile.name) ? db.profile.name : 'Исполнитель';
  
  var proposal = 'КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ\n\n';
  proposal += 'Здравствуйте!\n\n';
  proposal += 'Направляю оценку стоимости и сроков по вашему проекту.\n\n';
  proposal += '📋 Состав работ:\n' + tasksText + '\n';
  proposal += '⏱ Общие трудозатраты: ' + totalHours.toFixed(1) + ' часов\n';
  proposal += '💰 Стоимость работ: ' + Math.round(baseCost).toLocaleString() + ' ₽\n';
  if(bufferPercent > 0) proposal += '🛡 Риск-буфер (' + bufferPercent + '%): включён в итоговую сумму\n';
  proposal += '✅ ИТОГО К ОПЛАТЕ: ' + totalCost.toLocaleString() + ' ₽\n\n';
  proposal += 'Срок выполнения: обсуждается индивидуально после утверждения ТЗ.\n';
  proposal += 'Готов ответить на любые вопросы!\n\n';
  proposal += 'С уважением,\n' + profileName;

  var h = '<h3>📄 Коммерческое предложение</h3>';
  h += '<textarea id="proposal_text" readonly style="width:100%;padding:10px;margin:10px 0;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff;font-family:monospace;font-size:13px;min-height:250px">' + proposal + '</textarea>';
  h += '<button class="btn" style="width:100%;margin-bottom:10px;background:#3ecf8e" onclick="copyProposal()">📋 Копировать текст</button>';
  h += '<button class="btn" style="width:100%;background:#1f2530" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function copyProposal(){
  var text = document.getElementById('proposal_text').value;
  navigator.clipboard.writeText(text).then(function(){ alert('✅ КП скопировано в буфер обмена!'); }).catch(function(){ alert('❌ Не удалось скопировать'); });
}

function saveEstimateToHistory(){
  if(!window.estTasks || window.estTasks.length === 0){ alert('Нечего сохранять!'); return; }
  var rate = db.hourlyRate || 2000;
  var bufferPercent = parseInt(document.getElementById('est_buffer').value);
  var totalHours = 0, baseCost = 0;
  
  window.estTasks.forEach(function(task){
    totalHours += (task.hours * task.complexity);
    baseCost += (task.hours * task.complexity) * rate;
  });
  var totalCost = Math.round(baseCost * (1 + bufferPercent / 100));
  
  if(!db.estimates) db.estimates = [];
  db.estimates.push({
    id: Date.now().toString(36),
    projectName: window.estTasks[0].name + (window.estTasks.length > 1 ? ' и др.' : ''),
    tasks: JSON.parse(JSON.stringify(window.estTasks)),
    totalHours: totalHours.toFixed(1),
    baseCost: baseCost,
    bufferPercent: bufferPercent,
    totalCost: totalCost,
    date: new Date().toISOString().slice(0, 10)
  });
  localStorage.setItem('solodev', JSON.stringify(db));
  window.estTasks = [];
  alert('✅ Расчёт сохранён в историю!');
  renderCalculator();
}

function deleteEstimate(index){
  if(confirm('Удалить этот расчёт из истории?')){
    db.estimates.splice(index, 1);
    localStorage.setItem('solodev', JSON.stringify(db));
    renderCalculator();
  }
}

function showSmartAssistant(){
  var h='<h3>🤖 Умный помощник оценки</h3>';
  h+='<p class="mut" style="font-size:12px;margin-bottom:10px">Ответь на вопросы, и я помогу подобрать точные значения и подготовлю объяснение для клиента.</p>';
  
  h+='<label style="color:#fff;font-size:12px">Название задачи:</label>';
  h+='<input id="sa_task_name" placeholder="Например: Интеграция платёжной системы" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff">';
  
  h+='<label style="color:#fff;font-size:12px">Базовое время (часы в идеальных условиях):</label>';
  h+='<input id="sa_base_hours" type="number" step="0.5" placeholder="Сколько часов займёт, если всё пойдёт гладко?" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff">';
  
  h+='<div style="margin:10px 0;padding:10px;background:#1f2530;border-radius:6px">';
  h+='<div style="font-weight:bold;color:#ffd700;margin-bottom:5px">⚙️ Факторы сложности:</div>';
  h+='<label style="color:#fff;font-size:12px;display:block;margin:5px 0"><input type="checkbox" class="sa_complex" value="0.25" style="margin-right:5px"> Нестандартная логика / сложные алгоритмы</label>';
  h+='<label style="color:#fff;font-size:12px;display:block;margin:5px 0"><input type="checkbox" class="sa_complex" value="0.25" style="margin-right:5px"> Работа с чужим / legacy кодом</label>';
  h+='<label style="color:#fff;font-size:12px;display:block;margin:5px 0"><input type="checkbox" class="sa_complex" value="0.25" style="margin-right:5px"> Новая для меня технология / стек</label>';
  h+='<label style="color:#fff;font-size:12px;display:block;margin:5px 0"><input type="checkbox" class="sa_complex" value="0.25" style="margin-right:5px"> Жёсткие дедлайны / высокая нагрузка</label>';
  h+='</div>';
  
  h+='<div style="margin:10px 0;padding:10px;background:#1f2530;border-radius:6px">';
  h+='<div style="font-weight:bold;color:#ff9500;margin-bottom:5px">⚠️ Факторы риска:</div>';
  h+='<label style="color:#fff;font-size:12px;display:block;margin:5px 0"><input type="checkbox" class="sa_risk" value="10" style="margin-right:5px"> ТЗ размытое или может меняться</label>';
  h+='<label style="color:#fff;font-size:12px;display:block;margin:5px 0"><input type="checkbox" class="sa_risk" value="10" style="margin-right:5px"> Клиент новый / ранее не работали</label>';
  h+='<label style="color:#fff;font-size:12px;display:block;margin:5px 0"><input type="checkbox" class="sa_risk" value="10" style="margin-right:5px"> Зависимость от третьих лиц (ждём дизайн, API и т.д.)</label>';
  h+='</div>';
  
  h+='<button class="btn" style="width:100%;margin-top:10px;background:#ffd700;color:#000;font-weight:bold" onclick="calculateSmartEstimate()">🧮 Рассчитать и показать объяснение</button>';
  
  h+='<div id="sa_result" style="display:none;margin-top:15px;padding:15px;background:#102015;border:1px solid #3ecf8e;border-radius:6px">';
  h+='<div style="font-weight:bold;color:#3ecf8e;margin-bottom:10px">✅ Рекомендация помощника:</div>';
  h+='<div style="font-size:13px;color:#fff;margin-bottom:5px">• Множитель сложности: <b id="sa_rec_complex">x1.0</b></div>';
  h+='<div style="font-size:13px;color:#fff;margin-bottom:10px">• Риск-буфер: <b id="sa_rec_buffer">0%</b></div>';
  h+='<div style="font-size:12px;color:#ffd700;margin-bottom:5px;font-weight:bold">💬 Что сказать клиенту про риск-буфер:</div>';
  h+='<textarea id="sa_client_text" readonly style="width:100%;padding:8px;background:#1f2530;border:1px solid #6c8cff;border-radius:4px;color:#fff;font-size:12px;min-height:90px"></textarea>';
  h+='<button class="btn small" style="width:100%;margin-top:5px;background:#6c8cff" onclick="copySmartAssistantText()">📋 Копировать объяснение</button>';
  h+='<button class="btn small" style="width:100%;margin-top:5px;background:#3ecf8e" onclick="applySmartEstimate()">✅ Применить эти значения к задаче</button>';
  h+='</div>';
  openModal(h);
}

function calculateSmartEstimate(){
  var baseHours = parseFloat(document.getElementById('sa_base_hours').value) || 0;
  if(baseHours <= 0){ alert('Введи базовое время в часах!'); return; }
  
  var complexityMultiplier = 1.0;
  document.querySelectorAll('.sa_complex:checked').forEach(function(cb){ complexityMultiplier += parseFloat(cb.value); });
  if(complexityMultiplier > 2.0) complexityMultiplier = 2.0;
  
  var riskBuffer = 0;
  document.querySelectorAll('.sa_risk:checked').forEach(function(cb){ riskBuffer += parseInt(cb.value); });
  if(riskBuffer > 30) riskBuffer = 30;
  
  document.getElementById('sa_rec_complex').textContent = 'x' + complexityMultiplier;
  document.getElementById('sa_rec_buffer').textContent = riskBuffer + '%';
  
  var clientText = 'В данную оценку заложен риск-буфер в размере ' + riskBuffer + '%. ';
  if(riskBuffer === 0){
    clientText += 'Проект максимально прозрачен, ТЗ утверждено, риски минимальны, поэтому дополнительная страховка по времени и бюджету не требуется.';
  } else if(riskBuffer === 10){
    clientText += 'Этот небольшой резерв покрывает стандартные итерации правок и незначительные технические уточнения, гарантируя сдачу проекта в срок без потери качества.';
  } else if(riskBuffer === 20){
    clientText += 'Этот резерв необходим для покрытия возможных изменений в ТЗ, дополнительных итераций согласования и непредвиденных технических нюансов, что гарантирует стабильный результат и соблюдение дедлайнов.';
  } else {
    clientText += 'Учитывая новизну взаимодействия, возможные изменения требований и внешние зависимости, этот резерв критически важен. Он гарантирует, что проект будет доведён до конца надлежащего качества, даже если процесс потребует дополнительных итераций.';
  }
  
  document.getElementById('sa_client_text').value = clientText;
  document.getElementById('sa_result').style.display = 'block';
  
  window.sa_temp = {
    name: document.getElementById('sa_task_name').value.trim() || 'Новая задача',
    hours: baseHours,
    complexity: complexityMultiplier,
    buffer: riskBuffer
  };
}

function copySmartAssistantText(){
  var text = document.getElementById('sa_client_text').value;
  navigator.clipboard.writeText(text).then(function(){ alert('✅ Объяснение скопировано! Можешь вставить его в чат с клиентом.'); });
}

function applySmartEstimate(){
  if(!window.sa_temp) return;
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
  
  closeModal();
  addEstimateTask();
}

// === КОНЕЦ ВКЛАДКИ КАЛЬКУЛЯТОР ===


// === ДОБАВЛЕННЫЕ ФУНКЦИИ ПРОДУКТИВНОСТИ ===
function showDailyGoals() {
    if(!db.dailyGoals) db.dailyGoals = [];
    var h = '<h3>🎯 Ежедневные цели</h3><div id="daily_goals_list"></div>';
    h += '<input id="new_daily_goal" placeholder="Новая цель" style="width:100%;padding:10px;margin:10px 0;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
    h += '<button class="btn" style="width:100%;background:#3ecf8e" onclick="addDailyGoal()">Добавить</button>';
    openModal(h);
    renderDailyGoalsList();
}
function renderDailyGoalsList() {
    var list = document.getElementById('daily_goals_list'); if(!list) return;
    if(!db.dailyGoals || db.dailyGoals.length === 0) { list.innerHTML = '<div class="mut">Нет целей</div>'; return; }
    var html = '';
    db.dailyGoals.forEach(function(g, i) {
        html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;margin:5px 0;background:#1f2530;border-radius:6px">';
        html += '<span style="flex:1">'+(g.done?'<s>':'')+g.text+(g.done?'</s>':'')+'</span>';
        html += '<button class="btn small" style="background:'+(g.done?'#3ecf8e':'#6c8cff')+'" onclick="toggleDailyGoal('+i+')">'+(g.done?'↩':'✅')+'</button>';
        html += '<button class="btn small" style="background:#ff6b6b" onclick="deleteDailyGoal('+i+')">🗑</button></div>';
    });
    list.innerHTML = html;
}
function addDailyGoal() {
    var text = document.getElementById('new_daily_goal').value.trim(); if(!text) return;
    if(!db.dailyGoals) db.dailyGoals = [];
    db.dailyGoals.push({text: text, done: false});
    localStorage.setItem('solodev', JSON.stringify(db));
    document.getElementById('new_daily_goal').value = '';
    renderDailyGoalsList();
}
function toggleDailyGoal(index) {
    if(!db.dailyGoals || !db.dailyGoals[index]) return;
    db.dailyGoals[index].done = !db.dailyGoals[index].done;
    localStorage.setItem('solodev', JSON.stringify(db));
    renderDailyGoalsList();
}
function deleteDailyGoal(index) {
    if(!db.dailyGoals || !db.dailyGoals[index]) return;
    db.dailyGoals.splice(index, 1);
    localStorage.setItem('solodev', JSON.stringify(db));
    renderDailyGoalsList();
}

function showJournal() {
    if(!db.journal) db.journal = [];
    var h = '<h3>📜 Журнал событий</h3><div style="max-height:400px;overflow-y:auto">';
    if(db.journal.length === 0) h += '<div class="mut">Журнал пуст</div>';
    else {
        db.journal.slice().reverse().forEach(function(entry) {
            var icon = entry.type === 'pomodoro' ? '🍅' : (entry.type === 'habit' ? '✅' : '📝');
            var detail = entry.type === 'pomodoro' ? (entry.data.duration + ' мин') : (entry.data.habitName || entry.data.text || '');
            h += '<div style="padding:8px;margin:5px 0;background:#1f2530;border-radius:6px;border-left:3px solid #ffd700">';
            h += '<div style="font-size:12px;color:#ffd700">'+icon+' '+entry.date+' '+entry.time+'</div>';
            h += '<div style="font-size:13px;color:#fff">'+detail+'</div></div>';
        });
    }
    h += '</div><button class="btn" style="width:100%;margin-top:10px;background:#1f2530" onclick="closeModal()">Закрыть</button>';
    openModal(h);
}

function showMoodTracker() {
    var h = '<h3>😊 Трекер настроения</h3><div style="display:flex;justify-content:space-around;margin:15px 0">';
    h += '<button class="btn" style="flex:1;margin:0 5px;background:#ff6b6b" onclick="logMood(1)">😡</button>';
    h += '<button class="btn" style="flex:1;margin:0 5px;background:#ff9500" onclick="logMood(2)">😕</button>';
    h += '<button class="btn" style="flex:1;margin:0 5px;background:#ffd700;color:#000" onclick="logMood(3)">😐</button>';
    h += '<button class="btn" style="flex:1;margin:0 5px;background:#3ecf8e" onclick="logMood(4)">🙂</button>';
    h += '<button class="btn" style="flex:1;margin:0 5px;background:#6c8cff" onclick="logMood(5)">😄</button></div>';
    h += '<div id="mood_history" style="max-height:200px;overflow-y:auto"></div>';
    h += '<button class="btn" style="width:100%;margin-top:10px;background:#1f2530" onclick="closeModal()">Закрыть</button>';
    openModal(h);
    renderMoodHistory();
}
function logMood(level) {
    if(!db.mood) db.mood = [];
    db.mood.push({level: level, date: new Date().toISOString().slice(0,10), time: new Date().toTimeString().slice(0,5)});
    if(db.mood.length > 100) db.mood = db.mood.slice(-100);
    localStorage.setItem('solodev', JSON.stringify(db));
    renderMoodHistory();
}
function renderMoodHistory() {
    var el = document.getElementById('mood_history'); if(!el || !db.mood) return;
    var emojis = ['', '😡', '😕', '😐', '🙂', '😄'];
    var html = '';
    db.mood.slice().reverse().slice(0, 10).forEach(function(m) {
        html += '<div style="padding:5px;border-bottom:1px solid #242b36">'+emojis[m.level]+' '+m.date+' '+m.time+'</div>';
    });
    el.innerHTML = html || '<div class="mut">Нет записей</div>';
}

function showWaterTracker() {
    if(!db.water) db.water = {intake: 0, goal: 8, log: {}};
    var h = '<h3>💧 Трекер воды</h3><div style="text-align:center;margin:20px 0">';
    h += '<div style="font-size:48px;font-weight:bold;color:#6c8cff">'+db.water.intake+' / '+db.water.goal+' ст.</div>';
    h += '<div style="display:flex;gap:10px;justify-content:center;margin-top:15px">';
    h += '<button class="btn" style="background:#6c8cff" onclick="addWater(1)">+1 стакан</button>';
    h += '<button class="btn" style="background:#1f2530" onclick="addWater(-1)">-1 стакан</button></div></div>';
    h += '<button class="btn" style="width:100%;background:#1f2530" onclick="closeModal()">Закрыть</button>';
    openModal(h);
}
function addWater(amount) {
    if(!db.water) db.water = {intake: 0, goal: 8, log: {}};
    db.water.intake = Math.max(0, db.water.intake + amount);
    var today = new Date().toISOString().slice(0,10);
    if(!db.water.log[today]) db.water.log[today] = 0;
    db.water.log[today] = Math.max(0, (db.water.log[today] || 0) + amount);
    localStorage.setItem('solodev', JSON.stringify(db));
    showWaterTracker();
    if(currentView === 'productivity') renderProductivity();
}
// === КОНЕЦ ДОБАВЛЕННЫХ ФУНКЦИЙ ===


// === ДЕТЕКТОР ВЫГОРАНИЯ ===
function calculateBurnoutIndex() {
    var today = new Date();
    var weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    
    // 1. Анализ часов работы (Pomodoro)
    var weekSessions = db.pomodoro.sessions.filter(s => s.date >= weekAgo);
    var totalMinutes = weekSessions.reduce((sum, s) => sum + (s.duration || 0), 0);
    var totalHours = totalMinutes / 60;
    var avgHoursPerDay = totalHours / 7;
    
    // 2. Анализ настроения
    var weekMoods = db.mood.filter(m => m.date >= weekAgo);
    var avgMood = weekMoods.length > 0 ? weekMoods.reduce((sum, m) => sum + m.level, 0) / weekMoods.length : 3;
    
    // 3. Анализ воды
    var todayWater = db.water.log[today.toISOString().slice(0, 10)] || 0;
    var waterGoal = db.water.goal || 8;
    var waterPercent = Math.min(100, (todayWater / waterGoal) * 100);
    
    // 4. Анализ привычек
    var habitsDone = 0, habitsTotal = 0;
    var todayStr = today.toISOString().slice(0, 10);
    if (db.habits) {
        db.habits.forEach(function(hab) {
            habitsTotal++;
            if (hab.log && hab.log[todayStr]) habitsDone++;
        });
    }
    var habitPercent = habitsTotal > 0 ? (habitsDone / habitsTotal) * 100 : 100;
    
    // Расчёт индекса энергии (базовый балл: 100)
    var index = 100;
    
    // Штраф за переработку (норма: 8 часов в день)
    if (avgHoursPerDay > 8) {
        index -= Math.min(40, (avgHoursPerDay - 8) * 5);
    }
    
    // Штраф за низкое настроение (норма: 3+)
    if (avgMood < 3) {
        index -= (3 - avgMood) * 10;
    }
    
    // Штраф за недостаток воды
    if (waterPercent < 50) {
        index -= 10;
    }
    
    // Штраф за невыполненные привычки
    if (habitPercent < 50) {
        index -= 15;
    }
    
    index = Math.max(0, Math.min(100, Math.round(index)));
    
    return {
        index: index,
        totalHours: totalHours.toFixed(1),
        avgHoursPerDay: avgHoursPerDay.toFixed(1),
        avgMood: avgMood.toFixed(1),
        waterPercent: Math.round(waterPercent),
        habitPercent: Math.round(habitPercent),
        weekSessions: weekSessions.length
    };
}

function getBurnoutRecommendations(data) {
    var recs = [];
    
    if (data.avgHoursPerDay > 8) {
        recs.push({type: 'warning', text: '⚠️ Ты работаешь ' + data.avgHoursPerDay + ' часов в день (норма: 8). Сделай перерыв или распредели нагрузку.'});
    }
    
    if (data.avgMood < 3) {
        recs.push({type: 'danger', text: '🔴 Настроение ниже нормы (' + data.avgMood + '/5). Это сигнал о возможном выгорании. Подумай об отдыхе.'});
    }
    
    if (data.waterPercent < 50) {
        recs.push({type: 'warning', text: '💧 Ты пьёшь мало воды (' + data.waterPercent + '% от нормы). Обезвоживание снижает концентрацию.'});
    }
    
    if (data.habitPercent < 50) {
        recs.push({type: 'info', text: '🎯 Привычки выполняются на ' + data.habitPercent + '%. Стабильные рутины помогают бороться со стрессом.'});
    }
    
    if (data.index >= 70) {
        recs.push({type: 'success', text: '✅ Отличный баланс! Продолжай в том же духе.'});
    } else if (data.index >= 40) {
        recs.push({type: 'warning', text: '⚠️ Есть признаки усталости. Рекомендую сделать лёгкий день.'});
    } else {
        recs.push({type: 'danger', text: '🚨 Критический уровень! Настоятельно рекомендую взять выходной.'});
    }
    
    return recs;
}

function renderBurnout() {
    var data = calculateBurnoutIndex();
    var recs = getBurnoutRecommendations(data);
    var today = new Date();
    
    // Подсчёт количества дней с данными за последнюю неделю
    var daysWithData = 0;
    for (var i = 0; i < 7; i++) {
        var d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
        var hasPomodoro = db.pomodoro.sessions.some(s => s.date === d);
        var hasMood = db.mood.some(m => m.date === d);
        if (hasPomodoro || hasMood) daysWithData++;
    }
    var hasEnoughData = daysWithData >= 3;
    
    // История индекса за 7 дней
    var history = [];
    for (var i = 6; i >= 0; i--) {
        var d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        var dateStr = d.toISOString().slice(0, 10);
        var dayName = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'][d.getDay()];
        var daySessions = db.pomodoro.sessions.filter(s => s.date === dateStr);
        var dayMoods = db.mood.filter(m => m.date === dateStr);
        var dayHours = daySessions.reduce((sum, s) => sum + (s.duration || 0), 0) / 60;
        var dayMood = dayMoods.length > 0 ? dayMoods.reduce((sum, m) => sum + m.level, 0) / dayMoods.length : null;
        var dayIndex = 100;
        if (dayHours > 8) dayIndex -= Math.min(40, (dayHours - 8) * 5);
        if (dayMood !== null && dayMood < 3) dayIndex -= (3 - dayMood) * 10;
        if (dayMood === null && dayHours === 0) dayIndex = null;
        history.push({day: dayName, index: dayIndex, hours: dayHours});
    }
    
    var h = '<h2>🧠 Детектор выгорания</h2>';
    
    // Баннер с подсказкой
    if (!hasEnoughData) {
        h += '<div class="card" style="background:linear-gradient(135deg,#1f2530,#2a1040);border-color:#6c8cff;margin-bottom:15px">';
        h += '<div style="display:flex;align-items:center;gap:10px">';
        h += '<div style="font-size:24px">️</div>';
        h += '<div style="flex:1"><b style="color:#6c8cff">Нужно больше данных</b><div class="mut" style="font-size:12px;margin-top:4px">Для точного анализа используй Pomodoro и трекер настроения хотя бы 3 дня. Сейчас собрано данных за ' + daysWithData + ' дн. из 7.</div></div>';
        h += '</div></div>';
    }
    
    // Круговой индикатор
    var indexColor = hasEnoughData ? (data.index >= 70 ? '#3ecf8e' : (data.index >= 40 ? '#ffd700' : '#ff6b6b')) : '#6c8cff';
    var indexLabel = hasEnoughData ? (data.index >= 70 ? 'Отлично' : (data.index >= 40 ? 'Внимание' : 'Критично')) : 'Мало данных';
    
    h += '<div class="card" style="text-align:center;padding:30px;background:linear-gradient(135deg,#1a2035,#2a1040)">';
    h += '<div style="position:relative;width:150px;height:150px;margin:0 auto">';
    h += '<svg width="150" height="150" style="transform:rotate(-90deg)">';
    h += '<circle cx="75" cy="75" r="65" fill="none" stroke="#1f2530" stroke-width="10"></circle>';
    var dash = hasEnoughData ? (data.index * 4.08) : 0;
    h += '<circle cx="75" cy="75" r="65" fill="none" stroke="' + indexColor + '" stroke-width="10" stroke-dasharray="' + dash + ' 408" stroke-linecap="round"></circle>';
    h += '</svg>';
    h += '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center">';
    h += '<div style="font-size:36px;font-weight:bold;color:' + indexColor + '">' + (hasEnoughData ? data.index + '%' : '—') + '</div>';
    h += '<div style="font-size:12px;color:#fff">' + indexLabel + '</div>';
    h += '</div></div>';
    h += '<div style="margin-top:15px;font-size:14px;color:#fff">Индекс энергии за последние 7 дней</div>';
    h += '</div>';
    
    // График истории (SVG)
    h += '<div class="card"><h3>📈 Динамика за неделю</h3>';
    h += '<svg width="100%" height="120" viewBox="0 0 320 120" style="margin:10px 0">';
    var barWidth = 30, gap = 12, startX = 20;
    history.forEach(function(item, i) {
        var x = startX + i * (barWidth + gap);
        var barHeight = item.index !== null ? (item.index / 100) * 90 : 4;
        var y = 100 - barHeight;
        var color = item.index === null ? '#1f2530' : (item.index >= 70 ? '#3ecf8e' : (item.index >= 40 ? '#ffd700' : '#ff6b6b'));
        h += '<rect x="' + x + '" y="' + y + '" width="' + barWidth + '" height="' + barHeight + '" fill="' + color + '" rx="3"></rect>';
        h += '<text x="' + (x + barWidth/2) + '" y="115" text-anchor="middle" fill="#fff" font-size="10">' + item.day + '</text>';
        if (item.index !== null) {
            h += '<text x="' + (x + barWidth/2) + '" y="' + (y - 4) + '" text-anchor="middle" fill="#fff" font-size="9">' + item.index + '%</text>';
        }
    });
    h += '</svg>';
    h += '<div class="mut" style="font-size:11px;text-align:center">Серые столбцы = нет данных за день</div>';
    h += '</div>';
    
    // Статистика за неделю
    h += '<div class="card"><h3>📊 Статистика за неделю</h3>';
    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    var hoursText = data.totalHours > 0 ? data.totalHours + ' ч' : 'Нет данных';
    var hoursAvg = data.totalHours > 0 ? data.avgHoursPerDay + ' ч/день' : '—';
    var moodText = data.weekSessions > 0 || (db.mood && db.mood.filter(m => m.date >= new Date(today.getTime() - 7*24*60*60*1000).toISOString().slice(0,10)).length > 0) ? data.avgMood + '/5' : 'Нет данных';
    h += '<div style="padding:10px;background:#1f2530;border-radius:6px"><div class="mut" style="font-size:11px">Часов работы</div><b style="font-size:18px;color:#6c8cff">' + hoursText + '</b><div class="mut" style="font-size:11px">' + hoursAvg + '</div></div>';
    h += '<div style="padding:10px;background:#1f2530;border-radius:6px"><div class="mut" style="font-size:11px">Среднее настроение</div><b style="font-size:18px;color:#ffd700">' + moodText + '</b><div class="mut" style="font-size:11px">' + data.weekSessions + ' сессий</div></div>';
    var waterText = data.waterPercent > 0 ? data.waterPercent + '%' : 'Нет данных';
    h += '<div style="padding:10px;background:#1f2530;border-radius:6px"><div class="mut" style="font-size:11px">Вода сегодня</div><b style="font-size:18px;color:#6c8cff">' + waterText + '</b><div class="mut" style="font-size:11px">от нормы</div></div>';
    var habitText = data.habitPercent > 0 && data.habitPercent < 100 ? data.habitPercent + '%' : (data.habitPercent === 100 && (db.habits || []).length > 0 ? '100%' : 'Нет данных');
    h += '<div style="padding:10px;background:#1f2530;border-radius:6px"><div class="mut" style="font-size:11px">Привычки сегодня</div><b style="font-size:18px;color:#3ecf8e">' + habitText + '</b><div class="mut" style="font-size:11px">выполнено</div></div>';
    h += '</div></div>';
    
    // Рекомендации
    h += '<div class="card"><h3>💡 Рекомендации</h3>';
    if (!hasEnoughData) {
        h += '<div style="padding:10px;margin:8px 0;background:#1f2530;border-left:3px solid #6c8cff;border-radius:4px;font-size:13px;color:#fff">📝 Начни использовать Pomodoro-таймер и отмечай настроение каждый день. Через 3 дня рекомендации станут точными.</div>';
    }
    recs.forEach(function(rec) {
        var bgColor = rec.type === 'success' ? '#102015' : (rec.type === 'danger' ? '#201015' : '#1f2530');
        var borderColor = rec.type === 'success' ? '#3ecf8e' : (rec.type === 'danger' ? '#ff6b6b' : '#ffd700');
        h += '<div style="padding:10px;margin:8px 0;background:' + bgColor + ';border-left:3px solid ' + borderColor + ';border-radius:4px;font-size:13px;color:#fff">' + rec.text + '</div>';
    });
    h += '</div>';
    
    document.getElementById('app').innerHTML = h;
}
// === КОНЕЦ ДЕТЕКТОРА ВЫГОРАНИЯ ===


// === МОДУЛЬ KPI ФРИЛАНСЕРА ===
function renderKPI() {
    var today = new Date();
    var currentMonth = today.toISOString().slice(0, 7); // "2026-08"
    var daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    var daysPassed = today.getDate();
    
    // 1. Доход за месяц
    var monthIncome = 0;
    db.finances.forEach(function(f) {
        if (f.date && f.date.startsWith(currentMonth) && f.type === 'in') {
            monthIncome += (f.amt || 0);
        }
    });

    // 2. Часы работы (Pomodoro за месяц)
    var monthMinutes = 0;
    db.pomodoro.sessions.forEach(function(s) {
        if (s.date && s.date.startsWith(currentMonth)) {
            monthMinutes += (s.duration || 0);
        }
    });
    var monthHours = monthMinutes / 60;

    // 3. Эффективная ставка
    var effectiveRate = monthHours > 0 ? Math.round(monthIncome / monthHours) : 0;

    // 4. Утилизация (Цель: 6 часов в день * дней прошло)
    var targetHours = 6 * daysPassed; 
    var utilization = targetHours > 0 ? Math.round((monthHours / targetHours) * 100) : 0;
    if (utilization > 100) utilization = 100;

    // 5. Концентрация клиентов
    var clientIncome = {};
    db.finances.forEach(function(f) {
        if (f.date && f.date.startsWith(currentMonth) && f.type === 'in' && f.client) {
            clientIncome[f.client] = (clientIncome[f.client] || 0) + (f.amt || 0);
        }
    });
    var topClient = { name: '—', percent: 0, amount: 0 };
    var totalTrackedIncome = 0;
    Object.keys(clientIncome).forEach(function(c) {
        totalTrackedIncome += clientIncome[c];
        if (clientIncome[c] > topClient.amount) {
            topClient = { name: c, percent: 0, amount: clientIncome[c] };
        }
    });
    if (totalTrackedIncome > 0) {
        topClient.percent = Math.round((topClient.amount / totalTrackedIncome) * 100);
    }

    // Рендер UI
    var h = '<h2>📈 KPI Фрилансера</h2>';
    
    // Верхние метрики
    h += '<div class="grid" style="grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px">';
    h += '<div class="card" style="background:linear-gradient(135deg,#102015,#1a3025);border-color:#3ecf8e"><span class="stat">Доход (мес)</span><b style="font-size:20px;color:#3ecf8e">' + monthIncome.toLocaleString() + ' ₽</b></div>';
    h += '<div class="card" style="background:linear-gradient(135deg,#1f2530,#2a3040);border-color:#6c8cff"><span class="stat">Часов работы</span><b style="font-size:20px;color:#6c8cff">' + monthHours.toFixed(1) + ' ч</b></div>';
    h += '<div class="card" style="background:linear-gradient(135deg,#2a1040,#1a2035);border-color:#9d6cff"><span class="stat">Эфф. ставка</span><b style="font-size:20px;color:#9d6cff">' + effectiveRate.toLocaleString() + ' ₽/ч</b></div>';
    h += '<div class="card" style="background:linear-gradient(135deg,#201015,#301a25);border-color:#ff6b6b"><span class="stat">Дней прошло</span><b style="font-size:20px;color:#ff6b6b">' + daysPassed + ' / ' + daysInMonth + '</b></div>';
    h += '</div>';

    // Утилизация
    var utilColor = utilization >= 80 ? '#3ecf8e' : (utilization >= 50 ? '#ffd700' : '#ff6b6b');
    h += '<div class="card"><h3>⏱ Утилизация времени</h3>';
    h += '<div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="mut">Цель: 6 часов в день (' + targetHours + ' ч)</span><b style="color:' + utilColor + '">' + utilization + '%</b></div>';
    h += '<div class="bar" style="height:10px;background:#1f2530"><i style="width:' + utilization + '%;background:' + utilColor + '"></i></div>';
    h += '<div class="mut" style="font-size:11px;margin-top:8px">Показывает, насколько плотно ты загружен относительно комфортной нормы (6ч/день).</div></div>';

    // Концентрация клиентов
    h += '<div class="card"><h3> Концентрация клиентов</h3>';
    if (totalTrackedIncome === 0) {
        h += '<div class="mut" style="text-align:center;padding:10px">Нет данных по доходам с разбивкой по клиентам за этот месяц.</div>';
    } else {
        var riskColor = topClient.percent > 70 ? '#ff6b6b' : (topClient.percent > 40 ? '#ffd700' : '#3ecf8e');
        var riskText = topClient.percent > 70 ? 'Высокий риск!' : (topClient.percent > 40 ? 'Умеренный' : 'Отлично');
        h += '<div style="padding:12px;background:#1f2530;border-radius:8px;margin-bottom:10px">';
        h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
        h += '<b>' + esc(topClient.name) + '</b>';
        h += '<span style="padding:4px 10px;background:' + riskColor + ';color:#000;border-radius:12px;font-size:11px;font-weight:bold">' + riskText + '</span>';
        h += '</div>';
        h += '<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px"><span class="mut">Доля в доходе</span><b>' + topClient.percent + '%</b></div>';
        h += '<div style="display:flex;justify-content:space-between;font-size:13px"><span class="mut">Сумма</span><b>' + topClient.amount.toLocaleString() + ' ₽</b></div>';
        h += '</div>';
        h += '<div class="mut" style="font-size:11px">⚠️ Если один клиент даёт >70% дохода — это риск. Постарайся диверсифицировать портфель.</div>';
    }
    h += '</div>';

    document.getElementById('app').innerHTML = h;
}
// === КОНЕЦ МОДУЛЯ KPI ===


// === МОДУЛЬ ТРЕКЕРА НАЛОГОВ ===
function getTaxRate(system) {
    var rates = { usn6: 0.06, usn15: 0.15, npd: 0.06, osno: 0.13 };
    return rates[system] || 0.06;
}

function getTaxSystemName(system) {
    var names = { usn6: 'УСН 6%', usn15: 'УСН 15%', npd: 'НПД (самозанятость)', osno: 'ОСНО (НДФЛ)' };
    return names[system] || 'Неизвестно';
}

function calculateQuarterTax(year, quarter) {
    // Кварталы: 1 (янв-мар), 2 (апр-июн), 3 (июл-сен), 4 (окт-дек)
    var months = { 1: [0,1,2], 2: [3,4,5], 3: [6,7,8], 4: [9,10,11] };
    var monthList = months[quarter];
    
    var income = 0, expenses = 0;
    db.finances.forEach(function(f) {
        if (!f.date) return;
        var d = new Date(f.date);
        if (d.getFullYear() === year && monthList.indexOf(d.getMonth()) !== -1) {
            if (f.type === 'in') income += (f.amt || 0);
            else expenses += (f.amt || 0);
        }
    });
    
    var system = db.taxSystem || 'usn6';
    var tax = 0;
    if (system === 'usn6') {
        tax = income * 0.06;
    } else if (system === 'usn15') {
        tax = Math.max((income - expenses) * 0.15, income * 0.01);
    } else if (system === 'npd') {
        tax = income * 0.06;
    } else if (system === 'osno') {
        tax = income * 0.13;
    }
    
    return { income: income, expenses: expenses, tax: Math.round(tax) };
}

function getQuarterDeadlines(year) {
    return [
        { quarter: 1, deadline: year + '-04-25', label: '1 кв (янв-мар)' },
        { quarter: 2, deadline: year + '-07-25', label: '2 кв (апр-июн)' },
        { quarter: 3, deadline: year + '-10-25', label: '3 кв (июл-сен)' },
        { quarter: 4, deadline: (year + 1) + '-04-30', label: '4 кв (окт-дек)' }
    ];
}

function changeTaxSystem(system) {
    db.taxSystem = system;
    localStorage.setItem('solodev', JSON.stringify(db));
    renderTaxTracker();
}

function addTaxPayment(amount, quarter, year) {
    if (!db.taxPayments) db.taxPayments = [];
    db.taxPayments.push({
        date: new Date().toISOString().slice(0, 10),
        amount: parseFloat(amount),
        quarter: quarter,
        year: year,
        paid: true
    });
    if (db.taxReserve) db.taxReserve -= parseFloat(amount);
    if (db.taxReserve < 0) db.taxReserve = 0;
    localStorage.setItem('solodev', JSON.stringify(db));
    renderTaxTracker();
}

function renderTaxTracker() {
    var today = new Date();
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth(); // 0-11
    var currentQuarter = Math.floor(currentMonth / 3) + 1;
    var todayStr = today.toISOString().slice(0, 10);
    
    // Расчёт по текущему кварталу
    var currentQ = calculateQuarterTax(currentYear, currentQuarter);
    var taxRate = getTaxRate(db.taxSystem);
    var neededReserve = currentQ.tax;
    var currentReserve = db.taxReserve || 0;
    var reservePercent = neededReserve > 0 ? Math.round((currentReserve / neededReserve) * 100) : 0;
    if (reservePercent > 100) reservePercent = 100;
    
    // Дедлайны
    var deadlines = getQuarterDeadlines(currentYear);
    
    var h = '<h2>💸 Трекер налогов</h2>';
    
    // Выбор системы налогообложения
    h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#ffd700">';
    h += '<h3 style="margin-top:0">⚙️ Система налогообложения</h3>';
    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
    ['usn6','usn15','npd','osno'].forEach(function(sys) {
        var isActive = db.taxSystem === sys;
        h += '<button class="btn" style="background:' + (isActive ? '#ffd700' : '#1f2530') + ';color:' + (isActive ? '#000' : '#fff') + '" onclick="changeTaxSystem(\'' + sys + '\')">' + getTaxSystemName(sys) + '</button>';
    });
    h += '</div></div>';
    
    // Текущий квартал - главный блок
    var reserveColor = reservePercent >= 100 ? '#3ecf8e' : (reservePercent >= 50 ? '#ffd700' : '#ff6b6b');
    h += '<div class="card" style="background:linear-gradient(135deg,#102015,#1a3025);border-color:' + reserveColor + '">';
    h += '<h3 style="margin-top:0">📊 Текущий квартал (' + currentQuarter + '/4)</h3>';
    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px">';
    h += '<div style="padding:10px;background:#1f2530;border-radius:6px"><div class="mut" style="font-size:11px">Доход за квартал</div><b style="font-size:18px;color:#3ecf8e">' + currentQ.income.toLocaleString() + ' ₽</b></div>';
    h += '<div style="padding:10px;background:#1f2530;border-radius:6px"><div class="mut" style="font-size:11px">Налог к уплате</div><b style="font-size:18px;color:#ff6b6b">' + currentQ.tax.toLocaleString() + ' ₽</b></div>';
    h += '<div style="padding:10px;background:#1f2530;border-radius:6px"><div class="mut" style="font-size:11px">В резерве</div><b style="font-size:18px;color:#ffd700">' + Math.round(currentReserve).toLocaleString() + ' ₽</b></div>';
    h += '<div style="padding:10px;background:#1f2530;border-radius:6px"><div class="mut" style="font-size:11px">Готовность</div><b style="font-size:18px;color:' + reserveColor + '">' + reservePercent + '%</b></div>';
    h += '</div>';
    
    // Прогресс-бар резерва
    h += '<div style="margin-bottom:10px">';
    h += '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span class="mut">Прогресс накопления</span><span style="color:' + reserveColor + '">' + Math.round(currentReserve).toLocaleString() + ' / ' + currentQ.tax.toLocaleString() + ' ₽</span></div>';
    h += '<div class="bar" style="height:10px;background:#1f2530"><i style="width:' + reservePercent + '%;background:' + reserveColor + '"></i></div>';
    h += '</div>';
    
    // Кнопка пополнения резерва
    h += '<div style="display:flex;gap:8px">';
    h += '<button class="btn" style="flex:1;background:#3ecf8e" onclick="promptAddReserve()">+ Пополнить резерв</button>';
    h += '<button class="btn" style="flex:1;background:#6c8cff" onclick="promptPayTax(' + currentQuarter + ',' + currentYear + ')">Оплатить налог</button>';
    h += '</div></div>';
    
    // Дедлайны по кварталам
    h += '<div class="card"><h3>📅 Календарь платежей ' + currentYear + '</h3>';
    deadlines.forEach(function(d) {
        var isPast = d.deadline < todayStr;
        var isCurrent = d.quarter === currentQuarter;
        var borderColor = isPast ? '#ff6b6b' : (isCurrent ? '#ffd700' : '#3ecf8e');
        var status = isPast ? '✅ Пройден' : (isCurrent ? '🔥 Текущий' : '⏳ Впереди');
        
        var qData = calculateQuarterTax(currentYear, d.quarter);
        var paidAmount = 0;
        if (db.taxPayments) {
            db.taxPayments.forEach(function(p) {
                if (p.year === currentYear && p.quarter === d.quarter) paidAmount += (p.amount || 0);
            });
        }
        
        h += '<div style="padding:10px;margin:8px 0;background:#1f2530;border-left:3px solid ' + borderColor + ';border-radius:4px">';
        h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
        h += '<b>' + d.label + '</b>';
        h += '<span style="padding:3px 8px;background:' + borderColor + ';color:#000;border-radius:10px;font-size:10px;font-weight:bold">' + status + '</span>';
        h += '</div>';
        h += '<div style="display:flex;justify-content:space-between;font-size:12px">';
        h += '<span class="mut">Дедлайн: <b style="color:#fff">' + d.deadline + '</b></span>';
        h += '<span class="mut">Налог: <b style="color:#ff6b6b">' + qData.tax.toLocaleString() + ' ₽</b></span>';
        h += '</div>';
        if (paidAmount > 0) {
            h += '<div style="font-size:11px;color:#3ecf8e;margin-top:4px">✅ Оплачено: ' + paidAmount.toLocaleString() + ' ₽</div>';
        }
        h += '</div>';
    });
    h += '</div>';
    
    // Рекомендации
    h += '<div class="card"><h3>💡 Рекомендации</h3>';
    if (reservePercent < 50) {
        h += '<div style="padding:10px;margin:8px 0;background:#201015;border-left:3px solid #ff6b6b;border-radius:4px;font-size:13px;color:#fff">🚨 В резерве менее 50% от нужной суммы! Срочно отложи деньги, чтобы не остаться в минусе при оплате налога.</div>';
    } else if (reservePercent < 100) {
        h += '<div style="padding:10px;margin:8px 0;background:#1f2530;border-left:3px solid #ffd700;border-radius:4px;font-size:13px;color:#fff">⚠️ Резерв заполнен на ' + reservePercent + '%. Продолжай откладывать с каждого дохода.</div>';
    } else {
        h += '<div style="padding:10px;margin:8px 0;background:#102015;border-left:3px solid #3ecf8e;border-radius:4px;font-size:13px;color:#fff">✅ Отлично! Резерв полностью готов к оплате налога.</div>';
    }
    h += '<div class="mut" style="font-size:11px;margin-top:10px">Совет: откладывай ' + Math.round(taxRate * 100) + '% с каждого дохода сразу при получении.</div>';
    h += '</div>';
    
    document.getElementById('app').innerHTML = h;
}

function promptAddReserve() {
    var amount = prompt('Сколько отложить в налоговый резерв (₽)?');
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
        if (!db.taxReserve) db.taxReserve = 0;
        db.taxReserve += parseFloat(amount);
        localStorage.setItem('solodev', JSON.stringify(db));
        renderTaxTracker();
    }
}

function promptPayTax(quarter, year) {
    var currentQ = calculateQuarterTax(year, quarter);
    var amount = prompt('Сумма оплаты налога за ' + quarter + ' квартал ' + year + ' (рекомендуется: ' + currentQ.tax + ' ₽):');
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
        addTaxPayment(parseFloat(amount), quarter, year);
    }
}
// === КОНЕЦ МОДУЛЯ НАЛОГОВ ===


// === МОДУЛЬ КАЛЕНДАРЯ ДЕДЛАЙНОВ ===
var calendarCurrentDate = new Date();

function getCalendarEvents(year, month) {
    var events = [];
    var monthStr = year + '-' + String(month + 1).padStart(2, '0');
    var today = new Date().toISOString().slice(0, 10);
    
    // 1. Дедлайны проектов
    if (db.projects) {
        db.projects.forEach(function(p) {
            if (p.deadline && p.deadline.startsWith(monthStr) && p.stage < 3) {
                var daysLeft = Math.ceil((new Date(p.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                var color = daysLeft < 0 ? '#ff6b6b' : (daysLeft <= 3 ? '#ffd700' : '#3ecf8e');
                events.push({
                    date: p.deadline,
                    type: 'project',
                    title: p.name,
                    subtitle: p.client || 'Без клиента',
                    color: color,
                    icon: '📁',
                    daysLeft: daysLeft
                });
            }
        });
    }
    
    // 2. Финансовые платежи (входящие)
    if (db.finances) {
        db.finances.forEach(function(f) {
            if (f.date && f.date.startsWith(monthStr) && f.type === 'in' && f.amount > 0) {
                var daysLeft = Math.ceil((new Date(f.date) - new Date()) / (1000 * 60 * 60 * 24));
                var color = daysLeft < 0 ? '#ff6b6b' : (daysLeft <= 3 ? '#ffd700' : '#3ecf8e');
                events.push({
                    date: f.date,
                    type: 'finance',
                    title: 'Оплата: ' + (f.description || 'Без описания'),
                    subtitle: f.client || '',
                    color: color,
                    icon: '💰',
                    amount: f.amount,
                    daysLeft: daysLeft
                });
            }
        });
    }
    
    // 3. Налоговые платежи
    if (db.taxPayments) {
        db.taxPayments.forEach(function(p) {
            if (p.date && p.date.startsWith(monthStr)) {
                events.push({
                    date: p.date,
                    type: 'tax',
                    title: 'Налог: ' + p.quarter + ' кв. ' + p.year,
                    subtitle: 'Оплачено',
                    color: '#9d6cff',
                    icon: '🏛️',
                    amount: p.amount,
                    daysLeft: 0
                });
            }
        });
    }
    
    // 4. Налоговые дедлайны (будущие)
    var taxDeadlines = [
        { date: year + '-04-25', quarter: 1 },
        { date: year + '-07-25', quarter: 2 },
        { date: year + '-10-25', quarter: 3 },
        { date: (year + 1) + '-04-30', quarter: 4 }
    ];
    taxDeadlines.forEach(function(td) {
        if (td.date.startsWith(monthStr)) {
            var daysLeft = Math.ceil((new Date(td.date) - new Date()) / (1000 * 60 * 60 * 24));
            var color = daysLeft < 0 ? '#ff6b6b' : (daysLeft <= 3 ? '#ffd700' : '#3ecf8e');
            events.push({
                date: td.date,
                type: 'tax_deadline',
                title: 'Дедлайн налога: ' + td.quarter + ' кв.',
                subtitle: 'Квартальный платёж',
                color: color,
                icon: '⚠️',
                daysLeft: daysLeft
            });
        }
    });
    
    return events.sort(function(a, b) { return a.date.localeCompare(b.date); });
}

function navigateCalendar(direction) {
    calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() + direction);
    renderCalendar();
}

function renderCalendar() {
    var today = new Date().toISOString().slice(0, 10);
    var year = calendarCurrentDate.getFullYear();
    var month = calendarCurrentDate.getMonth();
    var monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    var dayNames = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
    
    var events = getCalendarEvents(year, month);
    
    var h = '<h2>📅 Календарь дедлайнов</h2>';
    
    // Навигация
    h += '<div class="card" style="padding:15px">';
    h += '<div style="display:flex;justify-content:space-between;align-items:center">';
    h += '<button class="btn small" style="background:#1f2530" onclick="navigateCalendar(-1)">◀ Пред.</button>';
    h += '<b style="font-size:18px;color:#fff">' + monthNames[month] + ' ' + year + '</b>';
    h += '<button class="btn small" style="background:#1f2530" onclick="navigateCalendar(1)">След. ▶</button>';
    h += '</div></div>';
    
    // Фильтры
    h += '<div class="card" style="padding:10px">';
    h += '<div style="display:flex;gap:8px;flex-wrap:wrap">';
    h += '<span style="padding:4px 10px;background:#1f2530;border-radius:12px;font-size:11px">📁 Проекты</span>';
    h += '<span style="padding:4px 10px;background:#1f2530;border-radius:12px;font-size:11px">💰 Платежи</span>';
    h += '<span style="padding:4px 10px;background:#1f2530;border-radius:12px;font-size:11px">🏛️ Налоги</span>';
    h += '<span style="padding:4px 10px;background:#1f2530;border-radius:12px;font-size:11px">⚠️ Дедлайны</span>';
    h += '</div></div>';
    
    // Сетка календаря
    h += '<div class="card">';
    h += '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:10px">';
    dayNames.forEach(function(d) {
        h += '<div style="text-align:center;font-size:11px;color:#6c8cff;font-weight:bold;padding:5px">' + d + '</div>';
    });
    h += '</div>';
    
    // Определяем первый день месяца и количество дней
    var firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1; // Пн=0, Вс=6
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    
    h += '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">';
    
    // Пустые ячейки до первого дня
    for (var i = 0; i < firstDay; i++) {
        h += '<div style="aspect-ratio:1"></div>';
    }
    
    // Дни месяца
    for (var day = 1; day <= daysInMonth; day++) {
        var dateStr = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
        var dayEvents = events.filter(function(e) { return e.date === dateStr; });
        var isToday = dateStr === today;
        
        h += '<div style="aspect-ratio:1;background:' + (isToday ? '#6c8cff' : '#1f2530') + ';border-radius:4px;padding:4px;position:relative;cursor:pointer" onclick="showDayDetails(\'' + dateStr + '\')">';
        h += '<div style="font-size:11px;font-weight:bold;color:#fff">' + day + '</div>';
        
        // Маркеры событий
        if (dayEvents.length > 0) {
            h += '<div style="display:flex;flex-wrap:wrap;gap:2px;margin-top:2px">';
            dayEvents.slice(0, 3).forEach(function(e) {
                h += '<div style="width:6px;height:6px;background:' + e.color + ';border-radius:50%"></div>';
            });
            h += '</div>';
        }
        
        h += '</div>';
    }
    
    h += '</div></div>';
    
    // Список событий на месяц
    h += '<div class="card"><h3> События месяца (' + events.length + ')</h3>';
    if (events.length === 0) {
        h += '<div class="mut" style="text-align:center;padding:20px">Нет событий в этом месяце</div>';
    } else {
        events.forEach(function(e) {
            var daysText = e.daysLeft < 0 ? 'Просрочено на ' + Math.abs(e.daysLeft) + ' дн.' : 
                          e.daysLeft === 0 ? 'Сегодня!' : 
                          e.daysLeft === 1 ? 'Завтра' : 
                          'Через ' + e.daysLeft + ' дн.';
            h += '<div style="padding:10px;margin:8px 0;background:#1f2530;border-left:3px solid ' + e.color + ';border-radius:4px">';
            h += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">';
            h += '<div style="flex:1"><b style="font-size:14px">' + e.icon + ' ' + e.title + '</b></div>';
            h += '<span style="padding:3px 8px;background:' + e.color + ';color:#000;border-radius:10px;font-size:10px;font-weight:bold">' + daysText + '</span>';
            h += '</div>';
            h += '<div style="display:flex;justify-content:space-between;font-size:12px">';
            h += '<span class="mut">' + e.subtitle + '</span>';
            h += '<span class="mut">' + e.date + '</span>';
            h += '</div>';
            if (e.amount) {
                h += '<div style="font-size:13px;color:#3ecf8e;margin-top:4px;font-weight:bold">' + e.amount.toLocaleString() + ' ₽</div>';
            }
            h += '</div>';
        });
    }
    h += '</div>';
    
    // Легенда
    h += '<div class="card" style="padding:10px">';
    h += '<div style="display:flex;gap:15px;flex-wrap:wrap;font-size:11px">';
    h += '<div style="display:flex;align-items:center;gap:5px"><div style="width:10px;height:10px;background:#ff6b6b;border-radius:50%"></div><span class="mut">Просрочено</span></div>';
    h += '<div style="display:flex;align-items:center;gap:5px"><div style="width:10px;height:10px;background:#ffd700;border-radius:50%"></div><span class="mut">Скоро (≤3 дня)</span></div>';
    h += '<div style="display:flex;align-items:center;gap:5px"><div style="width:10px;height:10px;background:#3ecf8e;border-radius:50%"></div><span class="mut">Есть время</span></div>';
    h += '</div></div>';
    
    document.getElementById('app').innerHTML = h;
}

function showDayDetails(dateStr) {
    var year = parseInt(dateStr.split('-')[0]);
    var month = parseInt(dateStr.split('-')[1]) - 1;
    var events = getCalendarEvents(year, month).filter(function(e) { return e.date === dateStr; });
    
    var h = '<h3>📅 ' + dateStr + '</h3>';
    if (events.length === 0) {
        h += '<div class="mut" style="text-align:center;padding:20px">Нет событий</div>';
    } else {
        events.forEach(function(e) {
            h += '<div style="padding:12px;margin:10px 0;background:#1f2530;border-left:3px solid ' + e.color + ';border-radius:4px">';
            h += '<div style="font-size:16px;font-weight:bold;margin-bottom:6px">' + e.icon + ' ' + e.title + '</div>';
            h += '<div class="mut" style="font-size:13px;margin-bottom:8px">' + e.subtitle + '</div>';
            if (e.amount) {
                h += '<div style="font-size:18px;color:#3ecf8e;font-weight:bold">' + e.amount.toLocaleString() + ' ₽</div>';
            }
            h += '</div>';
        });
    }
    h += '<button class="btn" style="width:100%;margin-top:15px;background:#1f2530" onclick="closeModal()">Закрыть</button>';
    openModal(h);
}
// === КОНЕЦ МОДУЛЯ КАЛЕНДАРЯ ===


// === МОДУЛЬ AI-ХАБА ===
function renderSmartHub() {
    var h = '<h2>🤖 AI-ассистент для рутины</h2>';
    
    h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#9d6cff">';
    h += '<h3 style="margin-top:0">🎯 4 инструмента в одном месте</h3>';
    h += '<div class="mut" style="font-size:13px;margin-bottom:15px">Умные помощники для повседневных задач фрилансера</div>';
    h += '</div>';
    
    // 4 карточки инструментов
    h += '<div class="grid" style="grid-template-columns:1fr 1fr;gap:10px">';
    
    h += '<div class="card" style="cursor:pointer;border-color:#6c8cff" onclick="showClientResponseGenerator()">';
    h += '<div style="font-size:32px;text-align:center;margin-bottom:8px">💬</div>';
    h += '<b style="display:block;text-align:center;margin-bottom:6px">Ответ клиенту</b>';
    h += '<div class="mut" style="font-size:11px;text-align:center">Генератор вежливых ответов с выбором тона</div>';
    h += '</div>';
    
    h += '<div class="card" style="cursor:pointer;border-color:#3ecf8e" onclick="showTechTranslator()">';
    h += '<div style="font-size:32px;text-align:center;margin-bottom:8px">🔄</div>';
    h += '<b style="display:block;text-align:center;margin-bottom:6px">Переводчик</b>';
    h += '<div class="mut" style="font-size:11px;text-align:center">Техтермины → понятный язык</div>';
    h += '</div>';
    
    h += '<div class="card" style="cursor:pointer;border-color:#ffd700" onclick="showProjectNameGenerator()">';
    h += '<div style="font-size:32px;text-align:center;margin-bottom:8px">💡</div>';
    h += '<b style="display:block;text-align:center;margin-bottom:6px">Названия</b>';
    h += '<div class="mut" style="font-size:11px;text-align:center">Генератор имён для проектов</div>';
    h += '</div>';
    
    h += '<div class="card" style="cursor:pointer;border-color:#ff6b6b" onclick="showWorkCalculator()">';
    h += '<div style="font-size:32px;text-align:center;margin-bottom:8px">🧮</div>';
    h += '<b style="display:block;text-align:center;margin-bottom:6px">Цель → Работа</b>';
    h += '<div class="mut" style="font-size:11px;text-align:center">Сколько работать для заработка X</div>';
    h += '</div>';
    
    h += '</div>';
    
    document.getElementById('app').innerHTML = h;
}

// === 1. ГЕНЕРАТОР ОТВЕТОВ КЛИЕНТАМ ===
function showClientResponseGenerator() {
    var h = '<h3>💬 Генератор ответов клиенту</h3>';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Ситуация:</label>';
    h += '<select id="crb_situation" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
    h += '<option value="agree">Согласие на работу</option>';
    h += '<option value="decline">Вежливый отказ</option>';
    h += '<option value="delay">Задержка сроков</option>';
    h += '<option value="price">Обсуждение цены</option>';
    h += '<option value="done">Сообщение о завершении</option>';
    h += '</select>';
    
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Тон:</label>';
    h += '<select id="crb_tone" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
    h += '<option value="formal">Формальный</option>';
    h += '<option value="friendly">Дружелюбный</option>';
    h += '<option value="casual">Неформальный</option>';
    h += '</select>';
    
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Имя клиента (опционально):</label>';
    h += '<input id="crb_name" placeholder="Иван" style="width:100%;padding:10px;margin:5px 0 15px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
    
    h += '<button class="btn" style="width:100%;background:#6c8cff" onclick="generateClientResponse()">✨ Сгенерировать</button>';
    h += '<div id="crb_result" style="display:none;margin-top:15px"></div>';
    
    openModal(h);
}

function generateClientResponse() {
    var situation = document.getElementById('crb_situation').value;
    var tone = document.getElementById('crb_tone').value;
    var name = document.getElementById('crb_name').value.trim() || 'Коллега';
    
    var templates = {
        agree: {
            formal: 'Здравствуйте, ' + name + '! Благодарю за обращение. Готов приступить к работе над вашим проектом. Уточню детали и подготовлю коммерческое предложение в ближайшее время.',
            friendly: 'Привет, ' + name + '! Рад, что ты обратился ко мне. С удовольствием возьмусь за твой проект. Давай обсудим детали и я подготовлю предложение.',
            casual: 'Привет, ' + name + '! Отличная идея, давай сделаем! Напиши мне подробности, и я всё посчитаю.'
        },
        decline: {
            formal: 'Здравствуйте, ' + name + '! Благодарю за интерес к моим услугам. К сожалению, в данный момент я не могу взять ваш проект из-за высокой загрузки. Рекомендую обратиться к коллегам [ссылка]. Буду рад сотрудничеству в будущем.',
            friendly: 'Привет, ' + name + '! Спасибо, что подумал обо мне. Сейчас у меня полная загрузка, но если проект не срочный, могу вернуться к разговору через месяц. Или могу порекомендовать проверенных специалистов.',
            casual: 'Привет, ' + name + '! Сейчас не смогу взять, очень загружен. Но если не горит — давай через месяц созвонимся?'
        },
        delay: {
            formal: 'Здравствуйте, ' + name + '! Хочу заранее предупредить о небольшом сдвиге сроков по проекту. По техническим причинам требуется дополнительное время на [причина]. Новый срок сдачи: [дата]. Приношу извинения за неудобства.',
            friendly: 'Привет, ' + name + '! Хочу быть честным: потребуется немного больше времени, чем планировали. Возникли нюансы с [причина]. Скорее всего, сдадим на [дата] позже. Надеюсь на понимание!',
            casual: 'Привет, ' + name + '! Слушай, тут такое дело — нужно чуть больше времени. Не переживай, всё под контролем, просто [причина]. Сдвинемся на пару дней.'
        },
        price: {
            formal: 'Здравствуйте, ' + name + '! Понимаю ваше желание оптимизировать бюджет. Стоимость обоснована сложностью задачи и временем, необходимым для качественного выполнения. Могу предложить поэтапную оплату или упрощённую версию проекта.',
            friendly: 'Привет, ' + name + '! Понимаю, что бюджет важен. Цена отражает время и качество. Можем обсудить варианты: разбить на этапы или упростить часть функционала. Что для тебя приоритетнее?',
            casual: 'Привет, ' + name + '! Цена не с потолка, честно. Но давай подумаем, что можно упростить, чтобы уложиться в бюджет. Главное — не потерять качество.'
        },
        done: {
            formal: 'Здравствуйте, ' + name + '! Рад сообщить, что работа над проектом завершена. Все задачи выполнены согласно ТЗ. Материалы отправлены на проверку. Буду рад отзыву и дальнейшему сотрудничеству.',
            friendly: 'Привет, ' + name + '! Отличные новости — проект готов! Всё сделал, как договаривались. Посмотри, пожалуйста, и дай знать, если нужны правки. Было приятно работать!',
            casual: 'Привет, ' + name + '! Готово! Всё сделал, проверяй. Если что — я на связи. Рад был поработать!'
        }
    };
    
    var text = templates[situation][tone];
    
    var resultHtml = '<div style="padding:15px;background:#1f2530;border-radius:6px;border:1px solid #6c8cff">';
    resultHtml += '<div style="font-weight:bold;color:#6c8cff;margin-bottom:10px">✨ Готовый ответ:</div>';
    resultHtml += '<textarea id="crb_text" readonly style="width:100%;padding:10px;background:#0f1520;border:1px solid #6c8cff;border-radius:4px;color:#fff;font-size:13px;min-height:120px;resize:vertical">' + text + '</textarea>';
    resultHtml += '<button class="btn" style="width:100%;margin-top:10px;background:#3ecf8e" onclick="copySmartHubText(\'crb_text\')">📋 Копировать</button>';
    resultHtml += '</div>';
    
    document.getElementById('crb_result').innerHTML = resultHtml;
    document.getElementById('crb_result').style.display = 'block';
}

// === 2. ПЕРЕВОДЧИК ТЕХТЕРМИНОВ ===
function showTechTranslator() {
    var h = '<h3>🔄 Переводчик техтерминов</h3>';
    h += '<label style="color:#3ecf8e;font-size:12px;font-weight:bold">Технический термин:</label>';
    h += '<input id="tt_term" placeholder="API, деплой, рефакторинг..." style="width:100%;padding:10px;margin:5px 0 15px;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff">';
    
    h += '<button class="btn" style="width:100%;background:#3ecf8e" onclick="translateTechTerm()">🔄 Перевести</button>';
    h += '<div id="tt_result" style="display:none;margin-top:15px"></div>';
    
    openModal(h);
}

function translateTechTerm() {
    var term = document.getElementById('tt_term').value.trim().toLowerCase();
    
    var dictionary = {
        'api': 'Интерфейс взаимодействия — как розетка в стене. Программа подключается к другой программе через стандартизированный способ обмена данными.',
        'деплой': 'Развёртывание — процесс публикации готового сайта или приложения в интернет, чтобы пользователи могли им пользоваться.',
        'рефакторинг': 'Улучшение кода без изменения его функций. Как ремонт в доме: ничего нового не строим, но делаем удобнее и надёжнее.',
        'баг': 'Ошибка в программе — когда что-то работает не так, как задумано. Как опечатка в тексте, только в коде.',
        'фронтенд': 'Внешняя часть сайта — то, что видит пользователь: кнопки, формы, анимации. Как фасад здания.',
        'бэкенд': 'Внутренняя часть сайта — серверная логика, базы данных, обработка запросов. Как фундамент и коммуникации в здании.',
        'база данных': 'Хранилище информации — как цифровой шкаф с папками. Хранит всех клиентов, заказы, товары и т.д.',
        'адаптив': 'Адаптивная вёрстка — когда сайт автоматически подстраивается под размер экрана: телефон, планшет, компьютер.',
        'хостинг': 'Аренда места на сервере в интернете, где хранится твой сайт. Как аренда офиса, только цифрового.',
        'домен': 'Имя сайта в интернете (например, google.com). Как адрес дома, только для веб-страницы.',
        'ssl': 'Сертификат безопасности — делает соединение между сайтом и пользователем защищённым. Как сейф для передачи данных.',
        'кэш': 'Временное хранилище данных для ускорения работы. Как заметки на столе, чтобы не бегать каждый раз в шкаф.',
        'git': 'Система контроля версий — как "машина времени" для кода. Позволяет откатиться к любой предыдущей версии.',
        'коммит': 'Сохранение изменений в Git. Как снимок текущего состояния проекта.',
        'пул-реквест': 'Запрос на внесение изменений в код. Как предложение коллеге: "Посмотри, что я сделал, одобришь?"',
        'тестирование': 'Проверка программы на ошибки — как техосмотр автомобиля перед продажей.',
        'оптимизация': 'Ускорение работы сайта или программы. Как тюнинг двигателя — едет быстрее, расходует меньше.',
        'интеграция': 'Соединение разных систем воедино. Как подключение принтера к компьютеру — они начинают работать вместе.',
        'парсер': 'Программа для автоматического сбора данных с сайтов. Как робот-пылесос, только собирает информацию.',
        'скрипт': 'Небольшая программа для автоматизации задач. Как инструкция для робота: "делай раз, делай два".',
        'верстка': 'Создание внешней оболочки сайта из HTML и CSS. Как украшение торта — делаем красиво и аккуратно.'
    };
    
    var translation = dictionary[term] || 'Не нашёл точного перевода. Попробуй другой термин или уточни контекст.';
    
    var resultHtml = '<div style="padding:15px;background:#1f2530;border-radius:6px;border:1px solid #3ecf8e">';
    resultHtml += '<div style="font-weight:bold;color:#3ecf8e;margin-bottom:10px">🔄 Объяснение для клиента:</div>';
    resultHtml += '<textarea id="tt_text" readonly style="width:100%;padding:10px;background:#0f1520;border:1px solid #3ecf8e;border-radius:4px;color:#fff;font-size:13px;min-height:100px;resize:vertical">' + translation + '</textarea>';
    resultHtml += '<button class="btn" style="width:100%;margin-top:10px;background:#6c8cff" onclick="copySmartHubText(\'tt_text\')">📋 Копировать</button>';
    resultHtml += '</div>';
    
    document.getElementById('tt_result').innerHTML = resultHtml;
    document.getElementById('tt_result').style.display = 'block';
}

// === 3. ГЕНЕРАТОР НАЗВАНИЙ ===
function showProjectNameGenerator() {
    var h = '<h3>💡 Генератор названий проектов</h3>';
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold">Язык:</label>';
    h += '<select id="png_language" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff"><option value="ru">🇷🇺 Русский</option><option value="zh">🇨🇳 Китайский</option><option value="en">🇬🇧 Английский</option></select>';
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold">Категория:</label>';
    h += '<select id="png_category" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff"><option value="tech">Технологии</option><option value="business">Бизнес</option><option value="creative">Креатив</option><option value="eco">Экология</option></select>';
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold">Стиль:</label>';
    h += '<select id="png_style" style="width:100%;padding:10px;margin:5px 0 15px;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff"><option value="modern">Современный</option><option value="classic">Классический</option><option value="playful">Игривый</option></select>';
    h += '<button class="btn" style="width:100%;background:#ffd700;color:#000" onclick="generateProjectNames()">✨ Сгенерировать 10 вариантов</button>';
    h += '<button class="btn small" style="width:100%;margin-top:8px;background:#1f2530" onclick="showHistory()">📜 История генераций</button>';
    h += '<div id="png_result" style="display:none;margin-top:15px"></div>';
    openModal(h);
}

function generateProjectNames() {
    var lang = document.getElementById("png_language").value;
    var category = document.getElementById("png_category").value;
    var style = document.getElementById("png_style").value;
    
    var bases = {
        ru: {
            tech: ["Код", "Техно", "Дата", "Веб", "Сеть", "Систем", "Ядро", "Поток", "Импульс", "Лаб", "Хаб", "Линк", "Синх", "Стек", "Узел", "Бит", "Алго", "Пиксель", "Квант", "Кибер"],
            business: ["Рост", "Прибыль", "Масштаб", "Венчур", "Бизнес", "Успех", "Рынок", "Сделка", "Фонд", "Актив", "Ценность", "Прайм", "Элит", "Апекс", "Пик", "Подъем", "Буст", "Капитал", "Империя", "Визион"],
            creative: ["Арт", "Дизайн", "Креатив", "Визуал", "Вдохновение", "Создание", "Мастерская", "Холст", "Палитра", "Кисть", "Цвет", "Форма", "Стиль", "Эстетика", "Гармония", "Ритм", "Мечта", "Муза", "Искра", "Сияние"],
            eco: ["Зеленый", "Эко", "Природа", "Земля", "Устойчивый", "Чистый", "Свежий", "Жизнь", "Цветение", "Рост", "Возрождение", "Восстановление", "Баланс", "Гармония", "Цикл", "Круг", "Корень", "Лист", "Лес", "Океан"]
        },
        zh: {
            tech: ["智", "科", "数", "网", "云", "芯", "流", "脉", "创", "联", "极", "元", "星", "光", "电", "算", "码", "量", "神", "幻"],
            business: ["盛", "达", "丰", "盈", "鼎", "泰", "瑞", "宏", "博", "信", "诚", "金", "宝", "源", "汇", "通", "兴", "旺", "昌", "隆"],
            creative: ["艺", "创", "美", "视", "灵感", "造", "工坊", "彩", "形", "风", "韵", "律", "梦", "光", "耀", "鲜", "纯", "新", "独", "雅"],
            eco: ["绿", "生态", "自然", "地", "源", "清", "新", "生", "茂", "长", "荣", "复", "衡", "和", "环", "圆", "根", "叶", "林", "海"]
        },
        en: {
            tech: ["Code", "Dev", "Tech", "Byte", "Logic", "Data", "Cloud", "Net", "Web", "App", "Sys", "Core", "Flow", "Pulse", "Nest", "Wave", "Lab", "Hub", "Link", "Sync"],
            business: ["Growth", "Profit", "Scale", "Venture", "Biz", "Success", "Market", "Trade", "Deal", "Fund", "Asset", "Value", "Prime", "Elite", "Apex", "Peak", "Rise", "Boost", "Thrive", "Prosper"],
            creative: ["Art", "Design", "Creative", "Visual", "Inspire", "Create", "Make", "Craft", "Studio", "Canvas", "Palette", "Brush", "Color", "Shape", "Form", "Style", "Aesthetic", "Harmony", "Rhythm", "Flow"],
            eco: ["Green", "Eco", "Nature", "Earth", "Sustain", "Pure", "Clean", "Fresh", "Vital", "Bloom", "Grow", "Thrive", "Flourish", "Renew", "Restore", "Balance", "Harmony", "Cycle", "Loop", "Circle"]
        }
    };
    
    var suffixes = {
        ru: {
            modern: ["Поток", "Импульс", "Гнездо", "Волна", "Лаб", "Хаб", "Линк", "Синх", "Стек", "Узел", "Сетка", "Меш", "Бит", "Алго", "Искра", "Свет", "Подъем", "Буст", "Ядро", "База"],
            classic: ["Решения", "Проекты", "Мастерская", "Профи", "Системы", "Группа", "Партнеры", "Советники", "Консалтинг", "Услуги", "Глобал", "Международный", "Объединенные", "Ассоциация", "Предприятие", "Корпорация", "Индустрия", "Холдинг", "Венчур", "Технологии"],
            playful: ["Истребители", "Ниндзя", "Панки", "Герои", "Друзья", "Воины", "Отряд", "Команда", "Банда", "Сила", "Стая", "Племя", "Клан", "Лига", "Гильдия", "Орден", "Братство", "Союз", "Альянс", "Фратрия"]
        },
        zh: {
            modern: ["科技", "网络", "云", "数据", "智能", "创新", "引擎", "动力", "空间", "矩阵", "互联", "未来", "先锋", "极速", "核心", "维度", "生态", "链", "节点", "平台"],
            classic: ["集团", "公司", "企业", "控股", "实业", "发展", "投资", "管理", "咨询", "服务", "国际", "联合", "环球", "世纪", "东方", "中华", "华夏", "天下", "四海", "九州"],
            playful: ["工作室", "小队", "联盟", "部落", "家族", "先锋", "创客", "达人", "玩家", "极客", "奇兵", "妙手", "天团", "梦之队", "精英", "王牌", "特攻", "游侠", "隐士", "行者"]
        },
        en: {
            modern: ["Flow", "Pulse", "Nest", "Wave", "Lab", "Hub", "Link", "Sync", "Stack", "Node", "Grid", "Mesh", "Bit", "Algo", "Spark", "Glow", "Rise", "Boost", "Core", "Base"],
            classic: ["Solutions", "Works", "Masters", "Pro", "Systems", "Group", "Partners", "Advisors", "Consulting", "Services", "Global", "International", "United", "Associates", "Enterprises", "Corporation", "Industries", "Holdings", "Ventures", "Technologies"],
            playful: ["Busters", "Ninjas", "Punks", "Heroes", "Buddies", "Warriors", "Squad", "Crew", "Gang", "Team", "Force", "Band", "Pack", "Tribe", "Clan", "League", "Guild", "Order", "Brotherhood", "Fellowship"]
        }
    };
    
    var prefixes = {
        ru: ["Нео", "Ультра", "Супер", "Мега", "Гипер", "Макс", "Про", "Плюс", "Прайм", "Элит", "Апекс", "Зен", "Нова", "Вихрь", "Квант", "Кибер", "Диджитал", "Смарт", "Рапид", "Свифт"],
        zh: ["新", "超", "极", "大", "天", "星", "云", "智", "创", "宏", "瑞", "金", "龙", "凤", "神", "海", "宇", "环", "太", "元"],
        en: ["Neo", "Ultra", "Super", "Mega", "Hyper", "Max", "Pro", "Plus", "Prime", "Elite", "Apex", "Zen", "Nova", "Vortex", "Quantum", "Cyber", "Digital", "Smart", "Rapid", "Swift"]
    };

    var selectedBases = bases[lang][category];
    var selectedSuffixes = suffixes[lang][style];
    var selectedPrefixes = prefixes[lang];
    
    var generatedNames = [];
    var attempts = 0;
    while (generatedNames.length < 10 && attempts < 500) {
        attempts++;
        var base = selectedBases[Math.floor(Math.random() * selectedBases.length)];
        var suffix = selectedSuffixes[Math.floor(Math.random() * selectedSuffixes.length)];
        var usePrefix = Math.random() > 0.6;
        var prefix = usePrefix ? selectedPrefixes[Math.floor(Math.random() * selectedPrefixes.length)] : "";
        var name = prefix + base + suffix;
        if (generatedNames.indexOf(name) === -1) generatedNames.push(name);
    }
    
    var langNames = { ru: "Русский", zh: "Китайский", en: "Английский" };
    generatedNames.forEach(function(name) { saveToHistory('Название', name); });
    var resultHtml = '<div style="padding:15px;background:#1f2530;border-radius:6px;border:1px solid #ffd700"><div style="font-weight:bold;color:#ffd700;margin-bottom:10px">✨ 10 уникальных названий (' + langNames[lang] + '):</div>';
    generatedNames.forEach(function(name, i) {
        resultHtml += '<div style="padding:10px;margin:5px 0;background:#0f1520;border-radius:4px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;font-weight:bold;color:#fff">' + (i+1) + '. ' + name + '</span>';
        resultHtml += '<button class="btn small" style="background:#6c8cff" onclick="navigator.clipboard.writeText(\'' + name + '\').then(function(){alert(\'✅ Скопировано: ' + name + '\')})">📋</button></div>';
    });
    resultHtml += '<button class="btn" style="width:100%;margin-top:10px;background:#ffd700;color:#000" onclick="generateProjectNames()">🔄 Ещё 10 вариантов</button></div>';
    document.getElementById("png_result").innerHTML = resultHtml;
    document.getElementById("png_result").style.display = "block";
}

function showWorkCalculator() {
    var h = '<h3>🧮 Сколько работать для цели?</h3>';
    h += '<label style="color:#ff6b6b;font-size:12px;font-weight:bold">Целевая сумма (₽):</label>';
    h += '<input id="wc_goal" type="number" placeholder="500000" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #ff6b6b;border-radius:6px;color:#fff">';
    
    h += '<label style="color:#ff6b6b;font-size:12px;font-weight:bold">Твоя ставка (₽/час):</label>';
    h += '<input id="wc_rate" type="number" placeholder="2000" value="' + (db.hourlyRate || 2000) + '" style="width:100%;padding:10px;margin:5px 0 15px;background:#1f2530;border:1px solid #ff6b6b;border-radius:6px;color:#fff">';
    
    h += '<button class="btn" style="width:100%;background:#ff6b6b" onclick="calculateWorkForGoal()">🧮 Рассчитать</button>';
    h += '<div id="wc_result" style="display:none;margin-top:15px"></div>';
    
    openModal(h);
}

function calculateWorkForGoal() {
    var goal = parseFloat(document.getElementById('wc_goal').value);
    var rate = parseFloat(document.getElementById('wc_rate').value);
    
    if (!goal || !rate || goal <= 0 || rate <= 0) {
        alert('Введи корректные значения');
        return;
    }
    
    var totalHours = Math.ceil(goal / rate);
    var daysAt8Hours = Math.ceil(totalHours / 8);
    var daysAt6Hours = Math.ceil(totalHours / 6);
    var weeksAt5Days = Math.ceil(daysAt5Days / 5);
    
    var resultHtml = '<div style="padding:15px;background:#1f2530;border-radius:6px;border:1px solid #ff6b6b">';
    resultHtml += '<div style="font-weight:bold;color:#ff6b6b;margin-bottom:10px">🧮 Расчёт:</div>';
    resultHtml += '<div style="font-size:14px;color:#fff;margin-bottom:8px">Чтобы заработать <b style="color:#3ecf8e">' + goal.toLocaleString() + ' ₽</b> при ставке <b>' + rate.toLocaleString() + ' ₽/час</b>:</div>';
    resultHtml += '<div style="padding:10px;margin:8px 0;background:#0f1520;border-radius:4px"><div class="mut" style="font-size:11px">Всего часов работы</div><b style="font-size:20px;color:#6c8cff">' + totalHours + ' ч</b></div>';
    resultHtml += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">';
    resultHtml += '<div style="padding:10px;background:#0f1520;border-radius:4px"><div class="mut" style="font-size:11px">При 8 ч/день</div><b style="font-size:16px;color:#ffd700">' + daysAt8Hours + ' дн.</b></div>';
    resultHtml += '<div style="padding:10px;background:#0f1520;border-radius:4px"><div class="mut" style="font-size:11px">При 6 ч/день</div><b style="font-size:16px;color:#ffd700">' + daysAt6Hours + ' дн.</b></div>';
    resultHtml += '</div>';
    resultHtml += '<div style="padding:10px;margin-top:10px;background:#0f1520;border-radius:4px;text-align:center"><div class="mut" style="font-size:11px">При 5-дневной рабочей неделе</div><b style="font-size:18px;color:#3ecf8e">' + weeksAt5Days + ' нед.</b></div>';
    resultHtml += '</div>';
    
    document.getElementById('wc_result').innerHTML = resultHtml;
    document.getElementById('wc_result').style.display = 'block';
}

// === УТИЛИТА ДЛЯ КОПИРОВАНИЯ ===
function copySmartHubText(elementId) {
    var text = document.getElementById(elementId).value;
    navigator.clipboard.writeText(text).then(function() {
        alert('✅ Скопировано!');
    });
}
// === КОНЕЦ МОДУЛЯ AI-ХАБА ===


// === МОДУЛЬ AI-ХАБА ===
function renderSmartHub() {
    var h = '<h2>🤖 AI-ассистент для рутины</h2>';
    h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#9d6cff"><h3 style="margin-top:0">🎯 4 инструмента в одном месте</h3><div class="mut" style="font-size:13px;margin-bottom:15px">Умные помощники для повседневных задач фрилансера</div></div>';
    h += '<div class="grid" style="grid-template-columns:1fr 1fr;gap:10px">';
    h += '<div class="card" style="cursor:pointer;border-color:#6c8cff" onclick="showClientResponseGenerator()"><div style="font-size:32px;text-align:center;margin-bottom:8px">💬</div><b style="display:block;text-align:center;margin-bottom:6px">Ответ клиенту</b><div class="mut" style="font-size:11px;text-align:center">Генератор вежливых ответов</div></div>';
    h += '<div class="card" style="cursor:pointer;border-color:#3ecf8e" onclick="showTechTranslator()"><div style="font-size:32px;text-align:center;margin-bottom:8px">🔄</div><b style="display:block;text-align:center;margin-bottom:6px">Переводчик</b><div class="mut" style="font-size:11px;text-align:center">Техтермины → понятный язык</div></div>';
    h += '<div class="card" style="cursor:pointer;border-color:#ffd700" onclick="showProjectNameGenerator()"><div style="font-size:32px;text-align:center;margin-bottom:8px">💡</div><b style="display:block;text-align:center;margin-bottom:6px">Названия</b><div class="mut" style="font-size:11px;text-align:center">Генератор имён для проектов</div></div>';
    h += '<div class="card" style="cursor:pointer;border-color:#ff6b6b" onclick="showWorkCalculator()"><div style="font-size:32px;text-align:center;margin-bottom:8px">🧮</div><b style="display:block;text-align:center;margin-bottom:6px">Цель → Работа</b><div class="mut" style="font-size:11px;text-align:center">Сколько работать для X ₽</div></div>';
    h += '</div>';
    h += '<div class="card" style="cursor:pointer;border-color:#3ecf8e;margin-top:15px" onclick="showTzGenerator()"><div style="font-size:32px;text-align:center;margin-bottom:8px">📄</div><b style="display:block;text-align:center;margin-bottom:6px">Генератор ТЗ</b><div class="mut" style="font-size:11px;text-align:center">Каркас техзадания для клиента</div></div>';
    document.getElementById('app').innerHTML = h;
}

function showClientResponseGenerator() {
    var h = '<h3>💬 Генератор ответов клиенту</h3>';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Ситуация:</label>';
    h += '<select id="crb_situation" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff"><option value="agree">Согласие на работу</option><option value="decline">Вежливый отказ</option><option value="delay">Задержка сроков</option><option value="price">Обсуждение цены</option><option value="done">Сообщение о завершении</option><option value="payment">💰 Напоминание об оплате</option><option value="review">⭐ Запрос отзыва</option><option value="edits">📝 Реакция на правки</option><option value="prepay">💳 Обсуждение предоплаты</option></select>';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Тон:</label>';
    h += '<select id="crb_tone" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff"><option value="formal">Формальный</option><option value="friendly">Дружелюбный</option><option value="casual">Неформальный</option></select>';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Имя клиента:</label>';
    h += '<input id="crb_name" placeholder="Иван" style="width:100%;padding:10px;margin:5px 0 15px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
    h += '<button class="btn" style="width:100%;background:#6c8cff" onclick="generateClientResponse()">✨ Сгенерировать</button>';
    h += '<button class="btn small" style="width:100%;margin-top:8px;background:#1f2530" onclick="showHistory()">📜 История генераций</button>';
    h += '<div id="crb_result" style="display:none;margin-top:15px"></div>';
    openModal(h);
}

function generateClientResponse() {
    var situation = document.getElementById('crb_situation').value;
    var tone = document.getElementById('crb_tone').value;
    var name = document.getElementById('crb_name').value.trim() || 'Коллега';
    var templates = {
        agree: { formal: 'Здравствуйте, ' + name + '! Благодарю за обращение. Готов приступить к работе. Уточню детали и подготовлю предложение.', friendly: 'Привет, ' + name + '! Рад, что ты обратился. С удовольствием возьмусь за проект. Давай обсудим детали.', casual: 'Привет, ' + name + '! Отличная идея, давай сделаем! Напиши подробности.' },
        decline: { formal: 'Здравствуйте, ' + name + '! К сожалению, сейчас не могу взять проект из-за загрузки. Буду рад сотрудничеству в будущем.', friendly: 'Привет, ' + name + '! Спасибо, что подумал обо мне. Сейчас полная загрузка, но могу вернуться через месяц.', casual: 'Привет, ' + name + '! Сейчас не смогу, очень загружен. Давай через месяц?' },
        delay: { formal: 'Здравствуйте, ' + name + '! Хочу предупредить о сдвиге сроков. Новый срок: [дата]. Приношу извинения.', friendly: 'Привет, ' + name + '! Потребуется больше времени. Сдвинемся на [дата]. Надеюсь на понимание!', casual: 'Привет, ' + name + '! Нужно чуть больше времени. Не переживай, всё под контролем.' },
        price: { formal: 'Здравствуйте, ' + name + '! Стоимость обоснована сложностью. Могу предложить поэтапную оплату.', friendly: 'Привет, ' + name + '! Цена отражает время и качество. Можем разбить на этапы.', casual: 'Привет, ' + name + '! Цена не с потолка. Давай подумаем, что упростить.' },
        done: { formal: 'Здравствуйте, ' + name + '! Работа завершена. Материалы отправлены на проверку.', friendly: 'Привет, ' + name + '! Проект готов! Посмотри и дай знать, если нужны правки.', casual: 'Привет, ' + name + '! Готово! Проверяй.' },
        payment: { formal: 'Здравствуйте, ' + name + '! Напоминаю о неоплаченном счёте №[номер] от [дата] на сумму [сумма]. Прошу оплатить в ближайшее время. Если возникли вопросы — готов обсудить.', friendly: 'Привет, ' + name + '! Напоминаю, что по проекту [название] осталась неоплаченная часть. Буду благодарен, если закроешь в ближайшие дни. Если что-то не так — дай знать!', casual: 'Привет, ' + name + '! Слушай, там по оплате зависло. Можешь глянуть, когда будет время?' },
        review: { formal: 'Здравствуйте, ' + name + '! Благодарю за сотрудничество. Буду признателен, если вы уделите 2 минуты и оставите отзыв о моей работе. Это очень поможет в развитии. Ссылка: [ссылка].', friendly: 'Привет, ' + name + '! Было приятно работать над проектом! Если тебе всё понравилось, оставь, пожалуйста, короткий отзыв — это очень поможет. Ссылка: [ссылка].', casual: 'Привет, ' + name + '! Рад, что всё получилось. Напиши пару слов, если не сложно — отзыв очень поможет!' },
        edits: { formal: 'Здравствуйте, ' + name + '! Получил ваши правки. Изучу и подготовлю обновлённую версию в течение [срок]. Если правки выходят за рамки ТЗ, обсудим дополнительные условия.', friendly: 'Привет, ' + name + '! Правки получил, всё понятно. Внесу в течение [срок]. Если появятся новые моменты — маякни.', casual: 'Привет, ' + name + '! Принял, сделаю. Если что-то ещё всплывёт — пиши.' },
        prepay: { formal: 'Здравствуйте, ' + name + '! Для старта работы необходима предоплата [сумма] ([процент]% от общей стоимости). После получения средств приступлю к реализации. Реквизиты отправлю отдельным сообщением.', friendly: 'Привет, ' + name + '! Чтобы начать работу, нужна предоплата [сумма] ([процент]%). Как только получу — сразу в бой. Реквизиты скину.', casual: 'Привет, ' + name + '! Для старта нужна предоплата [сумма]. Кидаю реквизиты, и погнали!' }
    };
    var text = templates[situation][tone];
    saveToHistory('Ответ клиенту', text);
    var resultHtml = '<div style="padding:15px;background:#1f2530;border-radius:6px;border:1px solid #6c8cff"><div style="font-weight:bold;color:#6c8cff;margin-bottom:10px">✨ Готовый ответ:</div>';
    resultHtml += '<textarea id="crb_text" readonly style="width:100%;padding:10px;background:#0f1520;border:1px solid #6c8cff;border-radius:4px;color:#fff;font-size:13px;min-height:120px">' + text + '</textarea>';
    resultHtml += '<button class="btn" style="width:100%;margin-top:10px;background:#3ecf8e" onclick="copySmartHubText(\'crb_text\')">📋 Копировать</button></div>';
    document.getElementById('crb_result').innerHTML = resultHtml;
    document.getElementById('crb_result').style.display = 'block';
}

function showTechTranslator() {
    var h = '<h3>🔄 Переводчик техтерминов</h3>';
    h += '<input id="tt_term" placeholder="api, деплой, рефакторинг..." style="width:100%;padding:10px;margin:5px 0 15px;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff">';
    h += '<button class="btn" style="width:100%;background:#3ecf8e" onclick="translateTechTerm()">🔄 Перевести</button>';
    h += '<button class="btn small" style="width:100%;margin-top:8px;background:#1f2530" onclick="showHistory()">📜 История генераций</button>';
    h += '<div id="tt_result" style="display:none;margin-top:15px"></div>';
    openModal(h);
}

function translateTechTerm() {
    var term = document.getElementById('tt_term').value.trim().toLowerCase();
    var dictionary = {
        'api': 'Интерфейс взаимодействия — как розетка в стене. Программа подключается к другой через стандартизированный обмен данными.',
        'деплой': 'Развёртывание — публикация сайта в интернет, чтобы пользователи могли им пользоваться.',
        'deploy': 'Развёртывание — публикация сайта в интернет, чтобы пользователи могли им пользоваться.',
        'рефакторинг': 'Улучшение кода без изменения функций. Как ремонт в доме: ничего нового, но удобнее.',
        'баг': 'Ошибка в программе — когда что-то работает не так. Как опечатка, только в коде.',
        'bug': 'Ошибка в программе — когда что-то работает не так.',
        'фронтенд': 'Внешняя часть сайта — то, что видит пользователь: кнопки, формы. Как фасад здания.',
        'frontend': 'Внешняя часть сайта — то, что видит пользователь.',
        'бэкенд': 'Внутренняя часть сайта — серверная логика, базы данных. Как фундамент здания.',
        'backend': 'Внутренняя часть сайта — серверная логика, базы данных.',
        'база данных': 'Хранилище информации — как шкаф с папками. Хранит клиентов, заказы, товары.',
        'database': 'Хранилище информации — как шкаф с папками.',
        'хостинг': 'Аренда места на сервере для сайта. Как аренда офиса, только цифрового.',
        'hosting': 'Аренда места на сервере для сайта.',
        'домен': 'Имя сайта (google.com). Как адрес дома, только для веб-страницы.',
        'domain': 'Имя сайта (google.com).',
        'ssl': 'Сертификат безопасности — защищает соединение. Как сейф для данных.',
        'кэш': 'Временное хранилище для ускорения. Как заметки на столе.',
        'cache': 'Временное хранилище для ускорения.',
        'git': 'Система контроля версий — как машина времени для кода.',
        'коммит': 'Сохранение изменений в Git. Как снимок проекта.',
        'commit': 'Сохранение изменений в Git.',
        'тестирование': 'Проверка программы на ошибки. Как техосмотр автомобиля.',
        'testing': 'Проверка программы на ошибки.',
        'оптимизация': 'Ускорение работы. Как тюнинг двигателя.',
        'optimization': 'Ускорение работы.',
        'интеграция': 'Соединение систем. Как подключение принтера к компьютеру.',
        'integration': 'Соединение систем.',
        'парсер': 'Программа для сбора данных с сайтов. Как робот-пылесос для информации.',
        'parser': 'Программа для сбора данных с сайтов.',
        'скрипт': 'Небольшая программа для автоматизации. Как инструкция для робота.',
        'script': 'Небольшая программа для автоматизации.',
        'сервер': 'Компьютер 24/7, обслуживающий запросы. Как официант в ресторане.',
        'server': 'Компьютер 24/7, обслуживающий запросы.',
        'клиент': 'Программа, отправляющая запросы. Как посетитель ресторана.',
        'client': 'Программа, отправляющая запросы.',
        'json': 'Формат обмена данными — универсальный язык программ.',
        'rest': 'Архитектурный стиль для API — правила хорошего тона программ.',
        'graphql': 'Язык запросов для API — клиент просит только нужные данные.',
        'токен': 'Цифровой ключ доступа. Как пропуск в офис.',
        'token': 'Цифровой ключ доступа.',
        'шифрование': 'Преобразование данных в нечитаемый вид. Как секретный код.',
        'encryption': 'Преобразование данных в нечитаемый вид.',
        'куки': 'Файлы в браузере. Как заметки: "этот пользователь уже заходил".',
        'cookies': 'Файлы в браузере.',
        'сессия': 'Время активности пользователя. Как визит в магазин.',
        'session': 'Время активности пользователя.',
        'контейнер': 'Изолированная среда для программы. Как коробка.',
        'container': 'Изолированная среда для программы.',
        'docker': 'Инструмент для контейнеров. Как упаковочная машина.',
        'облако': 'Удалённые серверы. Как облако — далеко, но доступно отовсюду.',
        'cloud': 'Удалённые серверы.',
        'cdn': 'Сеть серверов для быстрой доставки. Как филиалы банка.',
        'масштабирование': 'Увеличение мощности при росте. Как расширение дороги.',
        'нагрузка': 'Количество запросов. Как очередь в магазине.',
        'безопасность': 'Защита от угроз. Как замок на двери.',
        'security': 'Защита от угроз.',
        'уязвимость': 'Слабое место в защите. Как открытое окно.',
        'файрвол': 'Фильтр трафика. Как охранник на входе.',
        'firewall': 'Фильтр трафика.',
        'бэкап': 'Резервная копия. Как ксерокопия документа.',
        'backup': 'Резервная копия.',
        'автоматизация': 'Выполнение задач без человека. Как робот-пылесос.',
        'automation': 'Выполнение задач без человека.',
        'дебаг': 'Поиск ошибок. Как детектив ищет преступника.',
        'debug': 'Поиск ошибок.',
        'лог': 'Запись событий. Как дневник.',
        'log': 'Запись событий.',
        'мониторинг': 'Наблюдение за системой. Как камера видеонаблюдения.',
        'monitoring': 'Наблюдение за системой.',
        'дашборд': 'Панель с показателями. Как приборная панель в машине.',
        'dashboard': 'Панель с показателями.',
        'аналитика': 'Анализ данных. Как статистика в спорте.',
        'analytics': 'Анализ данных.',
        'конверсия': '% пользователей, совершивших действие. Как % покупателей.',
        'conversion': '% пользователей, совершивших действие.',
        'трафик': 'Количество посетителей. Как поток людей.',
        'traffic': 'Количество посетителей.',
        'seo': 'Оптимизация для поиска. Как настройка витрины.',
        'лендинг': 'Одностраничный сайт. Как рекламный щит.',
        'landing': 'Одностраничный сайт.',
        'crm': 'Система управления клиентами. Как картотека с историей.',
        'saas': 'ПО как услуга. Как подписка на Netflix.',
        'pwa': 'Сайт, работающий как приложение.',
        'spa': 'Сайт без перезагрузки страниц.',
        'компонент': 'Переиспользуемый элемент. Как Lego-блок.',
        'component': 'Переиспользуемый элемент.',
        'реакт': 'Библиотека для интерфейсов. Как конструктор.',
        'react': 'Библиотека для интерфейсов.',
        'вью': 'Лёгкий фреймворк. Как гибкий конструктор.',
        'vue': 'Лёгкий фреймворк.',
        'нода': 'JavaScript на сервере. Как движок для JS.',
        'node': 'JavaScript на сервере.',
        'npm': 'Менеджер пакетов. Как магазин приложений.',
        'зависимость': 'Библиотека, от которой зависит проект. Как деталь машины.',
        'dependency': 'Библиотека, от которой зависит проект.',
        'продакшен': 'Рабочая версия. Как открытый магазин.',
        'production': 'Рабочая версия.',
        'релиз': 'Выпуск версии. Как премьера фильма.',
        'release': 'Выпуск версии.',
        'стек': 'Набор технологий. Как набор инструментов.',
        'stack': 'Набор технологий.',
        'фулстек': 'Разработчик фронт+бэк. Как универсальный солдат.',
        'fullstack': 'Разработчик фронт+бэк.',
        'devops': 'Автоматизация разработки. Как конвейер на заводе.',
        'ci/cd': 'Автоматическая проверка и публикация.',
        'пайплайн': 'Последовательность автодействий. Как производственная линия.',
        'pipeline': 'Последовательность автодействий.',
        'ревью': 'Проверка кода коллегой. Как редактор текста.',
        'review': 'Проверка кода коллегой.',
        'мердж': 'Объединение изменений. Как слияние рек.',
        'merge': 'Объединение изменений.',
        'форк': 'Копия проекта. Как ответвление дороги.',
        'fork': 'Копия проекта.',
        'пуш': 'Отправка изменений. Как отправка письма.',
        'push': 'Отправка изменений.',
        'пул': 'Получение изменений. Как получение письма.',
        'pull': 'Получение изменений.',
        'бранч': 'Ветка в Git. Как параллельная дорога.',
        'branch': 'Ветка в Git.',
        'мейн': 'Основная ветка. Как главная дорога.',
        'main': 'Основная ветка.'
    };
    var translation = dictionary[term];
    var originalTranslation = translation;
    if (!translation) {
        var matches = Object.keys(dictionary).filter(function(key) { return key.indexOf(term) !== -1 || term.indexOf(key) !== -1; });
        if (matches.length > 0) {
            translation = 'Возможно, вы имели в виду:\n\n';
            matches.slice(0, 5).forEach(function(match) { translation += '• ' + match + ': ' + dictionary[match] + '\n\n'; });
        } else {
            translation = 'Не нашёл точного перевода. Попробуй другой термин.';
        }
    }
    if (originalTranslation) saveToHistory('Перевод', term + ': ' + originalTranslation);
    var resultHtml = '<div style="padding:15px;background:#1f2530;border-radius:6px;border:1px solid #3ecf8e"><div style="font-weight:bold;color:#3ecf8e;margin-bottom:10px">🔄 Объяснение:</div>';
    resultHtml += '<textarea id="tt_text" readonly style="width:100%;padding:10px;background:#0f1520;border:1px solid #3ecf8e;border-radius:4px;color:#fff;font-size:13px;min-height:100px">' + translation + '</textarea>';
    resultHtml += '<button class="btn" style="width:100%;margin-top:10px;background:#6c8cff" onclick="copySmartHubText(\'tt_text\')">📋 Копировать</button></div>';
    document.getElementById('tt_result').innerHTML = resultHtml;
    document.getElementById('tt_result').style.display = 'block';
}

function showProjectNameGenerator() {
    var h = '<h3>💡 Генератор названий проектов</h3>';
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold">Язык:</label>';
    h += '<select id="png_language" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff"><option value="ru">🇷🇺 Русский</option><option value="zh">🇨🇳 Китайский</option><option value="en">🇬🇧 Английский</option></select>';
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold">Категория:</label>';
    h += '<select id="png_category" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff"><option value="tech">Технологии</option><option value="business">Бизнес</option><option value="creative">Креатив</option><option value="eco">Экология</option></select>';
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold">Стиль:</label>';
    h += '<select id="png_style" style="width:100%;padding:10px;margin:5px 0 15px;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff"><option value="modern">Современный</option><option value="classic">Классический</option><option value="playful">Игривый</option></select>';
    h += '<button class="btn" style="width:100%;background:#ffd700;color:#000" onclick="generateProjectNames()">✨ Сгенерировать 10 вариантов</button>';
    h += '<button class="btn small" style="width:100%;margin-top:8px;background:#1f2530" onclick="showHistory()">📜 История генераций</button>';
    h += '<div id="png_result" style="display:none;margin-top:15px"></div>';
    openModal(h);
}

function generateProjectNames() {
    var lang = document.getElementById("png_language").value;
    var category = document.getElementById("png_category").value;
    var style = document.getElementById("png_style").value;
    
    var bases = {
        ru: {
            tech: ["Код", "Техно", "Дата", "Веб", "Сеть", "Систем", "Ядро", "Поток", "Импульс", "Лаб", "Хаб", "Линк", "Синх", "Стек", "Узел", "Бит", "Алго", "Пиксель", "Квант", "Кибер"],
            business: ["Рост", "Прибыль", "Масштаб", "Венчур", "Бизнес", "Успех", "Рынок", "Сделка", "Фонд", "Актив", "Ценность", "Прайм", "Элит", "Апекс", "Пик", "Подъем", "Буст", "Капитал", "Империя", "Визион"],
            creative: ["Арт", "Дизайн", "Креатив", "Визуал", "Вдохновение", "Создание", "Мастерская", "Холст", "Палитра", "Кисть", "Цвет", "Форма", "Стиль", "Эстетика", "Гармония", "Ритм", "Мечта", "Муза", "Искра", "Сияние"],
            eco: ["Зеленый", "Эко", "Природа", "Земля", "Устойчивый", "Чистый", "Свежий", "Жизнь", "Цветение", "Рост", "Возрождение", "Восстановление", "Баланс", "Гармония", "Цикл", "Круг", "Корень", "Лист", "Лес", "Океан"]
        },
        zh: {
            tech: ["智", "科", "数", "网", "云", "芯", "流", "脉", "创", "联", "极", "元", "星", "光", "电", "算", "码", "量", "神", "幻"],
            business: ["盛", "达", "丰", "盈", "鼎", "泰", "瑞", "宏", "博", "信", "诚", "金", "宝", "源", "汇", "通", "兴", "旺", "昌", "隆"],
            creative: ["艺", "创", "美", "视", "灵感", "造", "工坊", "彩", "形", "风", "韵", "律", "梦", "光", "耀", "鲜", "纯", "新", "独", "雅"],
            eco: ["绿", "生态", "自然", "地", "源", "清", "新", "生", "茂", "长", "荣", "复", "衡", "和", "环", "圆", "根", "叶", "林", "海"]
        },
        en: {
            tech: ["Code", "Dev", "Tech", "Byte", "Logic", "Data", "Cloud", "Net", "Web", "App", "Sys", "Core", "Flow", "Pulse", "Nest", "Wave", "Lab", "Hub", "Link", "Sync"],
            business: ["Growth", "Profit", "Scale", "Venture", "Biz", "Success", "Market", "Trade", "Deal", "Fund", "Asset", "Value", "Prime", "Elite", "Apex", "Peak", "Rise", "Boost", "Thrive", "Prosper"],
            creative: ["Art", "Design", "Creative", "Visual", "Inspire", "Create", "Make", "Craft", "Studio", "Canvas", "Palette", "Brush", "Color", "Shape", "Form", "Style", "Aesthetic", "Harmony", "Rhythm", "Flow"],
            eco: ["Green", "Eco", "Nature", "Earth", "Sustain", "Pure", "Clean", "Fresh", "Vital", "Bloom", "Grow", "Thrive", "Flourish", "Renew", "Restore", "Balance", "Harmony", "Cycle", "Loop", "Circle"]
        }
    };
    
    var suffixes = {
        ru: {
            modern: ["Поток", "Импульс", "Гнездо", "Волна", "Лаб", "Хаб", "Линк", "Синх", "Стек", "Узел", "Сетка", "Меш", "Бит", "Алго", "Искра", "Свет", "Подъем", "Буст", "Ядро", "База"],
            classic: ["Решения", "Проекты", "Мастерская", "Профи", "Системы", "Группа", "Партнеры", "Советники", "Консалтинг", "Услуги", "Глобал", "Международный", "Объединенные", "Ассоциация", "Предприятие", "Корпорация", "Индустрия", "Холдинг", "Венчур", "Технологии"],
            playful: ["Истребители", "Ниндзя", "Панки", "Герои", "Друзья", "Воины", "Отряд", "Команда", "Банда", "Сила", "Стая", "Племя", "Клан", "Лига", "Гильдия", "Орден", "Братство", "Союз", "Альянс", "Фратрия"]
        },
        zh: {
            modern: ["科技", "网络", "云", "数据", "智能", "创新", "引擎", "动力", "空间", "矩阵", "互联", "未来", "先锋", "极速", "核心", "维度", "生态", "链", "节点", "平台"],
            classic: ["集团", "公司", "企业", "控股", "实业", "发展", "投资", "管理", "咨询", "服务", "国际", "联合", "环球", "世纪", "东方", "中华", "华夏", "天下", "四海", "九州"],
            playful: ["工作室", "小队", "联盟", "部落", "家族", "先锋", "创客", "达人", "玩家", "极客", "奇兵", "妙手", "天团", "梦之队", "精英", "王牌", "特攻", "游侠", "隐士", "行者"]
        },
        en: {
            modern: ["Flow", "Pulse", "Nest", "Wave", "Lab", "Hub", "Link", "Sync", "Stack", "Node", "Grid", "Mesh", "Bit", "Algo", "Spark", "Glow", "Rise", "Boost", "Core", "Base"],
            classic: ["Solutions", "Works", "Masters", "Pro", "Systems", "Group", "Partners", "Advisors", "Consulting", "Services", "Global", "International", "United", "Associates", "Enterprises", "Corporation", "Industries", "Holdings", "Ventures", "Technologies"],
            playful: ["Busters", "Ninjas", "Punks", "Heroes", "Buddies", "Warriors", "Squad", "Crew", "Gang", "Team", "Force", "Band", "Pack", "Tribe", "Clan", "League", "Guild", "Order", "Brotherhood", "Fellowship"]
        }
    };
    
    var prefixes = {
        ru: ["Нео", "Ультра", "Супер", "Мега", "Гипер", "Макс", "Про", "Плюс", "Прайм", "Элит", "Апекс", "Зен", "Нова", "Вихрь", "Квант", "Кибер", "Диджитал", "Смарт", "Рапид", "Свифт"],
        zh: ["新", "超", "极", "大", "天", "星", "云", "智", "创", "宏", "瑞", "金", "龙", "凤", "神", "海", "宇", "环", "太", "元"],
        en: ["Neo", "Ultra", "Super", "Mega", "Hyper", "Max", "Pro", "Plus", "Prime", "Elite", "Apex", "Zen", "Nova", "Vortex", "Quantum", "Cyber", "Digital", "Smart", "Rapid", "Swift"]
    };

    var selectedBases = bases[lang][category];
    var selectedSuffixes = suffixes[lang][style];
    var selectedPrefixes = prefixes[lang];
    
    var generatedNames = [];
    var attempts = 0;
    while (generatedNames.length < 10 && attempts < 500) {
        attempts++;
        var base = selectedBases[Math.floor(Math.random() * selectedBases.length)];
        var suffix = selectedSuffixes[Math.floor(Math.random() * selectedSuffixes.length)];
        var usePrefix = Math.random() > 0.6;
        var prefix = usePrefix ? selectedPrefixes[Math.floor(Math.random() * selectedPrefixes.length)] : "";
        var name = prefix + base + suffix;
        if (generatedNames.indexOf(name) === -1) generatedNames.push(name);
    }
    
    var langNames = { ru: "Русский", zh: "Китайский", en: "Английский" };
    generatedNames.forEach(function(name) { saveToHistory('Название', name); });
    var resultHtml = '<div style="padding:15px;background:#1f2530;border-radius:6px;border:1px solid #ffd700"><div style="font-weight:bold;color:#ffd700;margin-bottom:10px">✨ 10 уникальных названий (' + langNames[lang] + '):</div>';
    generatedNames.forEach(function(name, i) {
        resultHtml += '<div style="padding:10px;margin:5px 0;background:#0f1520;border-radius:4px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;font-weight:bold;color:#fff">' + (i+1) + '. ' + name + '</span>';
        resultHtml += '<button class="btn small" style="background:#6c8cff" onclick="navigator.clipboard.writeText(\'' + name + '\').then(function(){alert(\'✅ Скопировано: ' + name + '\')})">📋</button></div>';
    });
    resultHtml += '<button class="btn" style="width:100%;margin-top:10px;background:#ffd700;color:#000" onclick="generateProjectNames()">🔄 Ещё 10 вариантов</button></div>';
    document.getElementById("png_result").innerHTML = resultHtml;
    document.getElementById("png_result").style.display = "block";
}

function showWorkCalculator() {
    var h = '<h3>🧮 Сколько работать для цели?</h3>';
    h += '<label style="color:#ff6b6b;font-size:12px;font-weight:bold">Целевая сумма (₽):</label>';
    h += '<input id="wc_goal" type="number" placeholder="500000" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #ff6b6b;border-radius:6px;color:#fff">';
    h += '<label style="color:#ff6b6b;font-size:12px;font-weight:bold">Твоя ставка (₽/час):</label>';
    h += '<input id="wc_rate" type="number" placeholder="2000" value="' + (db.hourlyRate || 2000) + '" style="width:100%;padding:10px;margin:5px 0 15px;background:#1f2530;border:1px solid #ff6b6b;border-radius:6px;color:#fff">';
    h += '<button class="btn" style="width:100%;background:#ff6b6b" onclick="calculateWorkForGoal()">🧮 Рассчитать</button>';
    h += '<div id="wc_result" style="display:none;margin-top:15px"></div>';
    openModal(h);
}

function calculateWorkForGoal() {
    var goal = parseFloat(document.getElementById('wc_goal').value);
    var rate = parseFloat(document.getElementById('wc_rate').value);
    if (!goal || !rate || goal <= 0 || rate <= 0) { alert('Введи корректные значения'); return; }
    var totalHours = Math.ceil(goal / rate);
    var daysAt8 = Math.ceil(totalHours / 8);
    var daysAt6 = Math.ceil(totalHours / 6);
    var weeksAt5 = Math.ceil(daysAt8 / 5);
    var resultHtml = '<div style="padding:15px;background:#1f2530;border-radius:6px;border:1px solid #ff6b6b"><div style="font-weight:bold;color:#ff6b6b;margin-bottom:10px">🧮 Расчёт:</div>';
    resultHtml += '<div style="font-size:14px;color:#fff;margin-bottom:8px">Для <b style="color:#3ecf8e">' + goal.toLocaleString() + ' ₽</b> при ставке <b>' + rate.toLocaleString() + ' ₽/ч</b>:</div>';
    resultHtml += '<div style="padding:10px;margin:8px 0;background:#0f1520;border-radius:4px"><div class="mut" style="font-size:11px">Всего часов</div><b style="font-size:20px;color:#6c8cff">' + totalHours + ' ч</b></div>';
    resultHtml += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">';
    resultHtml += '<div style="padding:10px;background:#0f1520;border-radius:4px"><div class="mut" style="font-size:11px">При 8 ч/день</div><b style="font-size:16px;color:#ffd700">' + daysAt8 + ' дн.</b></div>';
    resultHtml += '<div style="padding:10px;background:#0f1520;border-radius:4px"><div class="mut" style="font-size:11px">При 6 ч/день</div><b style="font-size:16px;color:#ffd700">' + daysAt6 + ' дн.</b></div>';
    resultHtml += '</div>';
    resultHtml += '<div style="padding:10px;margin-top:10px;background:#0f1520;border-radius:4px;text-align:center"><div class="mut" style="font-size:11px">При 5-дневной неделе</div><b style="font-size:18px;color:#3ecf8e">' + weeksAt5 + ' нед.</b></div></div>';
    document.getElementById('wc_result').innerHTML = resultHtml;
    document.getElementById('wc_result').style.display = 'block';
}

function copySmartHubText(elementId) {
    var text = document.getElementById(elementId).value;
    navigator.clipboard.writeText(text).then(function() { alert('✅ Скопировано!'); });
}

// === ИСТОРИЯ ГЕНЕРАЦИЙ ===
function saveToHistory(type, text) {
    if (!db.smarthubHistory) db.smarthubHistory = [];
    db.smarthubHistory.unshift({
        type: type,
        text: text,
        date: new Date().toISOString()
    });
    if (db.smarthubHistory.length > 20) db.smarthubHistory = db.smarthubHistory.slice(0, 20);
    localStorage.setItem('solodev', JSON.stringify(db));
}

function showHistory(filterType) {
    if (!window.historyFilter) window.historyFilter = 'all';
    if (filterType !== undefined) window.historyFilter = filterType;
    
    var h = '<h3>📜 История генераций</h3>';
    
    // Фильтры
    h += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:15px">';
    var filters = [
        {id: 'all', label: '🌐 Все', color: '#6c8cff'},
        {id: 'Ответ клиенту', label: '💬 Ответы', color: '#6c8cff'},
        {id: 'Перевод', label: '🔄 Переводы', color: '#3ecf8e'},
        {id: 'Название', label: '💡 Названия', color: '#ffd700'},
        {id: 'ТЗ', label: '📄 ТЗ', color: '#9d6cff'}
    ];
    filters.forEach(function(f) {
        var isActive = window.historyFilter === f.id;
        var bg = isActive ? f.color : '#1f2530';
        var color = isActive && f.id !== 'Название' ? '#000' : '#fff';
        h += '<button class="btn small" style="background:' + bg + ';color:' + color + '" onclick="showHistory(\'' + f.id + '\')">' + f.label + '</button>';
    });
    h += '</div>';
    
    if (!db.smarthubHistory || db.smarthubHistory.length === 0) {
        h += '<div class="mut" style="text-align:center;padding:20px">История пуста. Сгенерируй что-нибудь!</div>';
    } else {
        // Фильтрация
        var filtered = db.smarthubHistory.filter(function(item) {
            if (window.historyFilter === 'all') return true;
            if (window.historyFilter === 'ТЗ') return item.type.indexOf('ТЗ') === 0;
            return item.type === window.historyFilter;
        });
        
        if (filtered.length === 0) {
            h += '<div class="mut" style="text-align:center;padding:20px">Нет записей в этой категории</div>';
        } else {
            filtered.forEach(function(item) {
                var realIndex = db.smarthubHistory.indexOf(item);
                var date = new Date(item.date);
                var dateStr = date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
                var preview = item.text.length > 100 ? item.text.substring(0, 100) + '...' : item.text;
                
                // Цвет бордера по типу
                var borderColor = '#6c8cff';
                if (item.type === 'Перевод') borderColor = '#3ecf8e';
                else if (item.type === 'Название') borderColor = '#ffd700';
                else if (item.type.indexOf('ТЗ') === 0) borderColor = '#9d6cff';
                
                h += '<div style="padding:10px;margin:8px 0;background:#1f2530;border-left:3px solid ' + borderColor + ';border-radius:4px">';
                h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
                h += '<b style="color:' + borderColor + ';font-size:12px">' + item.type + '</b>';
                h += '<span class="mut" style="font-size:10px">' + dateStr + '</span>';
                h += '</div>';
                h += '<div style="font-size:12px;color:#fff;margin-bottom:8px;white-space:pre-wrap">' + preview + '</div>';
                h += '<div style="display:flex;gap:6px">';
                h += '<button class="btn small" style="background:#3ecf8e;flex:1" onclick="copyHistoryItem(' + realIndex + ')">📋 Копировать</button>';
                h += '<button class="btn small" style="background:#ff6b6b;flex:1" onclick="deleteHistoryItem(' + realIndex + ')">🗑 Удалить</button>';
                h += '</div></div>';
            });
        }
        h += '<button class="btn" style="width:100%;margin-top:10px;background:#1f2530;color:#ff6b6b;border:1px solid #ff6b6b" onclick="clearHistory()">🗑 Очистить всю историю</button>';
    }
    h += '<button class="btn" style="width:100%;margin-top:10px;background:#1f2530" onclick="closeModal()">Закрыть</button>';
    openModal(h);
}

function copyHistoryItem(index) {
    var item = db.smarthubHistory[index];
    navigator.clipboard.writeText(item.text).then(function() { alert('✅ Скопировано!'); });
}

function deleteHistoryItem(index) {
    db.smarthubHistory.splice(index, 1);
    localStorage.setItem('solodev', JSON.stringify(db));
    showHistory();
}

function clearHistory() {
    if (confirm('Удалить всю историю?')) {
        db.smarthubHistory = [];
        localStorage.setItem('solodev', JSON.stringify(db));
        showHistory();
    }
}

// === ГЕНЕРАТОР ТЗ ===
function showTzGenerator() {
    var h = '<h3>📄 Генератор ТЗ</h3>';
    h += '<label style="color:#3ecf8e;font-size:12px;font-weight:bold">Тип проекта:</label>';
    h += '<select id="tz_type" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff"><option value="landing">Лендинг</option><option value="multisite">Многостраничный сайт</option><option value="shop">Интернет-магазин</option><option value="webapp">Веб-приложение</option><option value="mobile">Мобильное приложение</option><option value="bot">Telegram-бот</option><option value="other">Другое</option></select>';
    h += '<label style="color:#3ecf8e;font-size:12px;font-weight:bold">Название проекта:</label>';
    h += '<input id="tz_name" placeholder="Например: Сайт для кофейни" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff">';
    h += '<label style="color:#3ecf8e;font-size:12px;font-weight:bold">Краткое описание (опционально):</label>';
    h += '<textarea id="tz_desc" placeholder="О чём проект, для кого..." style="width:100%;padding:10px;margin:5px 0 15px;background:#1f2530;border:1px solid #3ecf8e;border-radius:6px;color:#fff;min-height:60px"></textarea>';
    h += '<button class="btn" style="width:100%;background:#3ecf8e" onclick="generateTz()">✨ Сгенерировать ТЗ</button>';
    h += '<button class="btn small" style="width:100%;margin-top:8px;background:#1f2530" onclick="showHistory()">📜 История генераций</button>';
    h += '<div id="tz_result" style="display:none;margin-top:15px"></div>';
    openModal(h);
}

function generateTz() {
    var type = document.getElementById('tz_type').value;
    var name = document.getElementById('tz_name').value.trim() || 'Проект';
    var desc = document.getElementById('tz_desc').value.trim();
    
    var typeNames = {
        landing: 'Лендинг',
        multisite: 'Многостраничный сайт',
        shop: 'Интернет-магазин',
        webapp: 'Веб-приложение',
        mobile: 'Мобильное приложение',
        bot: 'Telegram-бот',
        other: 'Проект'
    };
    
    var features = {
        landing: ['Адаптивная вёрстка', 'Форма обратной связи', 'Блоки: герой, услуги, отзывы, контакты', 'SEO-оптимизация', 'Интеграция с CRM', 'Аналитика (Яндекс.Метрика)'],
        multisite: ['Главная + разделы', 'Админ-панель', 'Блог/новости', 'Поиск по сайту', 'Формы обратной связи', 'SEO-оптимизация'],
        shop: ['Каталог товаров', 'Корзина и оформление заказа', 'Личный кабинет', 'Онлайн-оплата', 'Интеграция с доставкой', 'Админ-панель для товаров'],
        webapp: ['Авторизация пользователей', 'Личный кабинет', 'Основной функционал приложения', 'Админ-панель', 'API для интеграций', 'Уведомления'],
        mobile: ['Экраны: регистрация, главная, профиль', 'Push-уведомления', 'Оффлайн-режим', 'Интеграция с API', 'Адаптация под iOS и Android', 'Публикация в сторах'],
        bot: ['Команды бота', 'Меню с кнопками', 'Интеграция с базой данных', 'Админ-панель', 'Уведомления', 'Аналитика использования'],
        other: ['Основной функционал', 'Интерфейс пользователя', 'Админ-панель', 'Интеграции', 'Тестирование', 'Документация']
    };
    
    var stages = [
        'Анализ требований и согласование ТЗ',
        'Прототипирование и дизайн',
        'Вёрстка / разработка интерфейса',
        'Программирование backend',
        'Интеграция и тестирование',
        'Запуск и передача заказчику'
    ];
    
    var tz = 'ТЕХНИЧЕСКОЕ ЗАДАНИЕ\n';
    tz += '═══════════════════════════\n\n';
    tz += '📌 Название: ' + name + '\n';
    tz += '📋 Тип: ' + typeNames[type] + '\n';
    if (desc) tz += '📝 Описание: ' + desc + '\n';
    tz += '\n1. ЦЕЛИ ПРОЕКТА\n';
    tz += '   • Создать качественный продукт, соответствующий требованиям\n';
    tz += '   • Обеспечить удобство использования для целевой аудитории\n';
    tz += '   • Достичь бизнес-целей заказчика\n\n';
    tz += '2. ФУНКЦИОНАЛЬНЫЕ ТРЕБОВАНИЯ\n';
    features[type].forEach(function(f, i) {
        tz += '   ' + (i+1) + '. ' + f + '\n';
    });
    tz += '\n3. ЭТАПЫ РАБОТЫ\n';
    stages.forEach(function(s, i) {
        tz += '   Этап ' + (i+1) + ': ' + s + '\n';
    });
    tz += '\n4. СРОКИ\n';
    tz += '   • Общий срок: [указать]\n';
    tz += '   • Промежуточные дедлайны по этапам\n\n';
    tz += '5. БЮДЖЕТ И ОПЛАТА\n';
    tz += '   • Стоимость: [указать]\n';
    tz += '   • Предоплата: 50%\n';
    tz += '   • Остаток: после сдачи проекта\n\n';
    tz += '6. УСЛОВИЯ\n';
    tz += '   • 2 раунда правок включены в стоимость\n';
    tz += '   • Дополнительные правки — по договорённости\n';
    tz += '   • Передача исходного кода после полной оплаты\n';
    tz += '   • Гарантия 30 дней после сдачи\n\n';
    tz += '7. КОНТАКТЫ\n';
    tz += '   • Исполнитель: [ваше имя]\n';
    tz += '   • Email: [ваш email]\n';
    tz += '   • Telegram: [ваш telegram]\n';
    
    saveToHistory('ТЗ: ' + name, tz);
    
    var resultHtml = '<div style="padding:15px;background:#1f2530;border-radius:6px;border:1px solid #3ecf8e"><div style="font-weight:bold;color:#3ecf8e;margin-bottom:10px">📄 Готовое ТЗ:</div>';
    resultHtml += '<textarea id="tz_text" readonly style="width:100%;padding:10px;background:#0f1520;border:1px solid #3ecf8e;border-radius:4px;color:#fff;font-size:12px;min-height:300px;font-family:monospace;white-space:pre-wrap">' + tz + '</textarea>';
    resultHtml += '<button class="btn" style="width:100%;margin-top:10px;background:#6c8cff" onclick="copySmartHubText(\'tz_text\')">📋 Копировать</button></div>';
    document.getElementById('tz_result').innerHTML = resultHtml;
    document.getElementById('tz_result').style.display = 'block';
}
// === КОНЕЦ ДОПОЛНЕНИЙ AI-ХАБА ===

// === КОНЕЦ AI-ХАБА ===

// === МОДУЛЬ ВОРОНКИ ОТКЛИКОВ ===
const leadStatuses = [
    { id: 'found', label: '📍 Найдена', color: '#6c8cff' },
    { id: 'sent', label: '📤 Отклик отправлен', color: '#9d6cff' },
    { id: 'call', label: '📞 Созвон', color: '#ffd700' },
    { id: 'offer', label: '✅ Оффер', color: '#3ecf8e' },
    { id: 'rejected', label: '❌ Отказ', color: '#ff6b6b' },
    { id: 'started', label: '🎉 Проект начат', color: '#3ecf8e' }
];

function renderLeadPipeline() {
    let h = '<h2>🎯 Воронка откликов</h2>';
    const totalLeads = db.leads.length;
    const sentCount = db.leads.filter(l => l.status !== 'found').length;
    const callCount = db.leads.filter(l => ['call','offer','started'].includes(l.status)).length;
    const offerCount = db.leads.filter(l => ['offer','started'].includes(l.status)).length;
    const conversionRate = totalLeads > 0 ? Math.round((offerCount / totalLeads) * 100) : 0;
    
    h += '<div class="grid" style="grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:15px">';
    h += '<div class="card" style="text-align:center"><div class="mut">Всего</div><b style="font-size:20px;color:#6c8cff">' + totalLeads + '</b></div>';
    h += '<div class="card" style="text-align:center"><div class="mut">Отправлено</div><b style="font-size:20px;color:#9d6cff">' + sentCount + '</b></div>';
    h += '<div class="card" style="text-align:center"><div class="mut">Созвонов</div><b style="font-size:20px;color:#ffd700">' + callCount + '</b></div>';
    h += '<div class="card" style="text-align:center;background:linear-gradient(135deg,#102015,#1a3025);border-color:#3ecf8e"><div class="mut" style="color:#fff">Конверсия</div><b style="font-size:20px;color:#3ecf8e">' + conversionRate + '%</b></div>';
    h += '</div>';
    
    h += '<button class="btn" style="width:100%;margin-bottom:15px;background:#3ecf8e" onclick="addLead()">+ Добавить отклик</button>';
    
    h += '<div style="display:flex;gap:8px;margin-bottom:15px;flex-wrap:wrap">';
    h += '<button class="btn small" style="background:' + (!window.leadFilter ? '#6c8cff' : '#1f2530') + '" onclick="window.leadFilter=null;renderLeadPipeline()">Все</button>';
    leadStatuses.forEach(s => {
        const count = db.leads.filter(l => l.status === s.id).length;
        if (count > 0) {
            h += '<button class="btn small" style="background:' + (window.leadFilter === s.id ? s.color : '#1f2530') + '" onclick="window.leadFilter=\'' + s.id + '\';renderLeadPipeline()">' + s.label + ' (' + count + ')</button>';
        }
    });
    h += '</div>';
    
    const filteredLeads = window.leadFilter ? db.leads.filter(l => l.status === window.leadFilter) : db.leads;
    
    if (filteredLeads.length === 0) {
        h += '<div class="card" style="text-align:center;padding:30px"><div class="mut">Нет откликов. Добавь первый!</div></div>';
    } else {
        const sortedLeads = [...filteredLeads].sort((a,b) => {
            const order = { found: 1, sent: 2, call: 3, offer: 4, started: 5, rejected: 6 };
            return (order[a.status] || 99) - (order[b.status] || 99);
        });
        
        sortedLeads.forEach(lead => {
            const status = leadStatuses.find(s => s.id === lead.status) || leadStatuses[0];
            const daysSinceUpdate = Math.floor((new Date() - new Date(lead.dateUpdated || lead.dateAdded)) / (1000 * 60 * 60 * 24));
            const isStale = daysSinceUpdate > 7 && ['found','sent','call'].includes(lead.status);
            
            h += '<div class="card" style="border-left:4px solid ' + status.color + (isStale ? ';opacity:0.7' : '') + '">';
            h += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">';
            h += '<div style="flex:1"><b style="font-size:15px;color:#fff">' + esc(lead.title) + '</b>';
            if (lead.company) h += '<div class="mut" style="font-size:12px;margin-top:2px">' + esc(lead.company) + '</div>';
            h += '</div>';
            h += '<span style="padding:4px 10px;background:' + status.color + ';color:#000;border-radius:12px;font-size:11px;font-weight:bold">' + status.label + '</span>';
            h += '</div>';
            
            if (lead.salary) h += '<div style="color:#3ecf8e;font-size:13px;margin:6px 0">💰 ' + esc(lead.salary) + '</div>';
            if (lead.notes) h += '<div style="font-size:12px;color:#e8ecf3;margin:6px 0;padding:8px;background:#1f2530;border-radius:4px">' + esc(lead.notes) + '</div>';
            
            h += '<div class="mut" style="font-size:11px;margin:8px 0">📅 ' + new Date(lead.dateAdded).toLocaleDateString('ru-RU');
            if (isStale) h += ' <span style="color:#ff6b6b">⚠️ Не обновлялось ' + daysSinceUpdate + ' дн.</span>';
            h += '</div>';
            
            h += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px">';
            if (lead.link) h += '<a href="' + esc(lead.link) + '" target="_blank" class="btn small" style="background:#6c8cff;text-decoration:none">🔗 Ссылка</a>';
            h += '<button class="btn small" style="background:#1f2530" onclick="editLead(\'' + lead.id + '\')">✏️ Изменить</button>';
            h += '<button class="btn small" style="background:#1f2530" onclick="changeLeadStatus(\'' + lead.id + '\')">🔄 Статус</button>';
            h += '<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;margin-left:auto" onclick="deleteLead(\'' + lead.id + '\')">🗑</button>';
            h += '</div></div>';
        });
    }
    document.getElementById('app').innerHTML = h;
}

function addLead() {
    let h = '<h3>🎯 Новый отклик</h3>';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Название вакансии/проекта:</label>';
    h += '<input id="lead_title" placeholder="Frontend Developer" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Компания:</label>';
    h += '<input id="lead_company" placeholder="Яндекс" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Ссылка:</label>';
    h += '<input id="lead_link" placeholder="https://..." style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Сумма:</label>';
    h += '<input id="lead_salary" placeholder="150 000 ₽" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Заметки:</label>';
    h += '<textarea id="lead_notes" placeholder="Стек, условия..." style="width:100%;padding:10px;margin:5px 0 15px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff;min-height:60px"></textarea>';
    h += '<button class="btn" style="width:100%;background:#3ecf8e" onclick="saveLead()">💾 Сохранить</button>';
    openModal(h);
}

function saveLead() {
    const title = document.getElementById('lead_title').value.trim();
    if (!title) { alert('Введи название'); return; }
    const lead = {
        id: 'lead_' + Date.now(),
        title: title,
        company: document.getElementById('lead_company').value.trim(),
        link: document.getElementById('lead_link').value.trim(),
        salary: document.getElementById('lead_salary').value.trim(),
        notes: document.getElementById('lead_notes').value.trim(),
        status: 'found',
        dateAdded: new Date().toISOString(),
        dateUpdated: new Date().toISOString()
    };
    if (!db.leads) db.leads = [];
    db.leads.push(lead);
    localStorage.setItem('solodev', JSON.stringify(db));
    closeModal();
    renderLeadPipeline();
}

function editLead(id) {
    const lead = db.leads.find(l => l.id === id);
    if (!lead) return;
    let h = '<h3>✏️ Редактировать отклик</h3>';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Название:</label>';
    h += '<input id="lead_title" value="' + esc(lead.title) + '" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Компания:</label>';
    h += '<input id="lead_company" value="' + esc(lead.company || '') + '" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Ссылка:</label>';
    h += '<input id="lead_link" value="' + esc(lead.link || '') + '" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Сумма:</label>';
    h += '<input id="lead_salary" value="' + esc(lead.salary || '') + '" style="width:100%;padding:10px;margin:5px 0 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff">';
    h += '<label style="color:#6c8cff;font-size:12px;font-weight:bold">Заметки:</label>';
    h += '<textarea id="lead_notes" style="width:100%;padding:10px;margin:5px 0 15px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff;min-height:60px">' + esc(lead.notes || '') + '</textarea>';
    h += '<button class="btn" style="width:100%;background:#3ecf8e" onclick="updateLead(\'' + id + '\')">💾 Сохранить</button>';
    openModal(h);
}

function updateLead(id) {
    const lead = db.leads.find(l => l.id === id);
    if (!lead) return;
    lead.title = document.getElementById('lead_title').value.trim();
    lead.company = document.getElementById('lead_company').value.trim();
    lead.link = document.getElementById('lead_link').value.trim();
    lead.salary = document.getElementById('lead_salary').value.trim();
    lead.notes = document.getElementById('lead_notes').value.trim();
    lead.dateUpdated = new Date().toISOString();
    localStorage.setItem('solodev', JSON.stringify(db));
    closeModal();
    renderLeadPipeline();
}

function changeLeadStatus(id) {
    const lead = db.leads.find(l => l.id === id);
    if (!lead) return;
    let h = '<h3>🔄 Изменить статус</h3>';
    h += '<div style="font-size:14px;color:#fff;margin-bottom:15px">' + esc(lead.title) + '</div>';
    h += '<div style="display:flex;flex-direction:column;gap:8px">';
    leadStatuses.forEach(status => {
        const isActive = lead.status === status.id;
        h += '<button class="btn" style="background:' + (isActive ? status.color : '#1f2530') + ';color:' + (isActive ? '#000' : '#fff') + ';text-align:left" onclick="setLeadStatus(\'' + id + '\',\'' + status.id + '\')">' + status.label + '</button>';
    });
    h += '</div>';
    openModal(h);
}

function setLeadStatus(id, status) {
    const lead = db.leads.find(l => l.id === id);
    if (!lead) return;
    lead.status = status;
    lead.dateUpdated = new Date().toISOString();
    localStorage.setItem('solodev', JSON.stringify(db));
    closeModal();
    renderLeadPipeline();
}

function deleteLead(id) {
    if (!confirm('Удалить этот отклик?')) return;
    db.leads = db.leads.filter(l => l.id !== id);
    localStorage.setItem('solodev', JSON.stringify(db));
    renderLeadPipeline();
}
// === КОНЕЦ МОДУЛЯ ВОРОНКИ ===

// === ГЛОБАЛЬНОЕ ИСПРАВЛЕНИЕ UI (перекрытие вкладок) ===
if (!document.getElementById('fix-ui-overlap')) {
    const style = document.createElement('style');
    style.id = 'fix-ui-overlap';
    style.innerHTML = `
        #app { padding-bottom: 80px !important; min-height: 100vh; }
        .tabs, .tab-bar { height: 60px !important; max-height: 60px !important; overflow: hidden; }
        .card { margin-bottom: 12px; }
        body { overscroll-behavior-y: none; }
    `;
    document.head.appendChild(style);
}

// === МОДУЛЬ ЮРИДИЧЕСКИЙ ХАБ (С ЗАГРУЗКОЙ ИЗ ОТДЕЛЬНОЙ БД) ===
let legalDataCache = null;

async function renderLawHub() {
    let h = '<h2>⚖️ Юридический справочник</h2>';
    
    if (!legalDataCache) {
        h += '<div class="card" style="text-align:center;padding:30px"><div class="mut">⏳ Загрузка базы данных законов...</div></div>';
        document.getElementById('app').innerHTML = h;
        
        try {
            const response = await fetch('legal_db.json');
            if (!response.ok) throw new Error('Не удалось загрузить legal_db.json');
            legalDataCache = await response.json();
        } catch (error) {
            document.getElementById('app').innerHTML = '<div class="card" style="text-align:center;padding:30px;border-color:#ff6b6b"><div style="color:#ff6b6b">❌ Ошибка загрузки базы данных. Проверьте интернет.</div></div>';
            return;
        }
    }

    h = '<h2>⚖️ Юридический справочник</h2>';
    
    h += '<div class="card" style="padding:10px;margin-bottom:15px">';
    h += '<input id="lawSearch" placeholder="🔍 Поиск закона или термина..." style="width:100%;padding:10px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-size:14px" oninput="filterLawHub()">';
    h += '</div>';

    h += '<div class="card" style="background:linear-gradient(135deg,#1a2035,#2a1040);border-color:#ffd700;margin-bottom:15px">';
    h += '<h3 style="margin-top:0">💡 Важно</h3>';
    h += '<div class="mut" style="font-size:13px">База данных загружается отдельно. Для сложных международных сделок рекомендуется консультация с профильным юристом.</div>';
    h += '</div>';

    h += '<h3>📋 Ключевые законы и требования</h3>';
    h += '<div id="lawsContainer" class="grid" style="grid-template-columns:1fr;gap:10px;margin-bottom:20px">';
    for (const [key, data] of Object.entries(legalDataCache.countries)) {
        const searchText = (key + ' ' + data.name + ' ' + data.laws.join(' ')).toLowerCase();
        h += '<div class="law-item card" style="border-left:4px solid #6c8cff" data-search="' + searchText + '">';
        h += '<h4 style="margin-top:0;margin-bottom:10px">' + data.name + '</h4>';
        h += '<ul style="padding-left:20px;margin:0;color:#e8ecf3;font-size:13px;line-height:1.5">';
        data.laws.forEach(law => {
            h += '<li style="margin-bottom:8px">' + law + '</li>';
        });
        h += '</ul></div>';
    }
    h += '</div>';

    h += '<h3>📖 Юридический словарь (' + legalDataCache.dictionary.length + ' терминов)</h3>';
    h += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:15px" id="dictFilters">';
    h += '<button data-category="all" onclick="filterDictByCategory(\'all\')" style="padding:6px 12px;border-radius:12px;border:1px solid #6c8cff;background:#6c8cff;color:#fff;font-size:12px;cursor:pointer">Все</button>';
    const dictCats = [...new Set(legalDataCache.dictionary.map(t => t.category).filter(Boolean))];
    dictCats.forEach(cat => {
        h += '<button data-category="' + cat.replace(/"/g, '&quot;') + '" onclick="filterDictByCategory(\'' + cat.replace(/'/g, "\\'") + '\')" style="padding:6px 12px;border-radius:12px;border:1px solid #6c8cff;background:transparent;color:#6c8cff;font-size:12px;cursor:pointer">' + cat + '</button>';
    });
    h += '</div>';
    h += '<div id="dictContainer" style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">';
    legalDataCache.dictionary.forEach(item => {
        const searchStr = (item.term + ' ' + item.def).toLowerCase();
        h += '<div class="dict-item card" style="padding:12px" data-search="' + searchStr + '" data-category="' + (item.category || '') + '">';
        h += '<b style="font-size:14px;color:#6c8cff">' + item.term + '</b>';
        h += '<div style="font-size:12px;color:#e8ecf3;margin-top:4px">' + item.def + '</div>';
        h += '</div>';
    });
    h += '<div id="moreDictMsg" class="mut" style="text-align:center;padding:10px">Используй поиск выше, чтобы найти любой термин из базы</div>';
    h += '</div>';

    h += '<h3>📝 Генератор оговорок для договора</h3>';
    const clauses = [
        { title: "Применимое право (РФ)", text: "Настоящий Договор регулируется и толкуется в соответствии с законодательством Российской Федерации. Все споры подлежат рассмотрению в суде по месту нахождения Исполнителя." },
        { title: "Конфиденциальность (NDA)", text: "Стороны обязуются не разглашать третьим лицам любую коммерческую, техническую или финансовую информацию, полученную в ходе исполнения настоящего Договора, в течение 3 (трех) лет после его окончания." },
        { title: "Переход исключительных прав (IP)", text: "Исключительное право на результат работ переходит к Заказчику в полном объеме с момента подписания Сторонами Акта сдачи-приемки и полной оплаты услуг Исполнителя." },
        { title: "Форс-мажор", text: "Стороны освобождаются от ответственности за частичное или полное неисполнение обязательств, если оно явилось следствием обстоятельств непреодолимой силы, возникших после заключения договора." }
    ];
    h += '<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">';
    clauses.forEach((clause, index) => {
        h += '<div class="card" style="padding:12px">';
        h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
        h += '<b style="font-size:14px;color:#fff">' + clause.title + '</b>';
        h += '<button class="btn small" style="background:#3ecf8e" onclick="navigator.clipboard.writeText(`' + clause.text.replace(/`/g, '\\`') + '`).then(()=>alert(\'✅ Скопировано!\'))">📋 Копировать</button>';
        h += '</div>';
        h += '<div style="font-size:12px;color:#e8ecf3;background:#1f2530;padding:10px;border-radius:4px;font-style:italic">' + clause.text + '</div>';
        h += '</div>';
    });
    h += '</div>';

    h += '<h3>🔍 Официальные базы (Актуальные редакции)</h3>';
    h += '<div class="grid" style="grid-template-columns:1fr 1fr;gap:10px">';
    h += '<a href="https://www.consultant.ru/" target="_blank" class="card" style="text-align:center;text-decoration:none;border-color:#3ecf8e"><div style="font-size:24px;margin-bottom:5px">🇷🇺</div><b style="color:#fff">КонсультантПлюс</b><div class="mut" style="font-size:11px">Законы РФ</div></a>';
    h += '<a href="https://pravo.by/" target="_blank" class="card" style="text-align:center;text-decoration:none;border-color:#3ecf8e"><div style="font-size:24px;margin-bottom:5px">🇧🇾</div><b style="color:#fff">Pravo.by</b><div class="mut" style="font-size:11px">Правовой портал РБ</div></a>';
    h += '<a href="http://www.gov.cn/zhengce/" target="_blank" class="card" style="text-align:center;text-decoration:none;border-color:#3ecf8e"><div style="font-size:24px;margin-bottom:5px">🇨🇳</div><b style="color:#fff">Gov.cn</b><div class="mut" style="font-size:11px">Госсовет КНР</div></a>';
    h += '<a href="https://eaeunion.org/" target="_blank" class="card" style="text-align:center;text-decoration:none;border-color:#3ecf8e"><div style="font-size:24px;margin-bottom:5px">🌍</div><b style="color:#fff">ЕАЭС</b><div class="mut" style="font-size:11px">Право ЕАЭС</div></a>';
    h += '</div>';

    document.getElementById('app').innerHTML = h;
}

function filterLawHub() {
    if (!legalDataCache) return;
    const query = document.getElementById('lawSearch').value.toLowerCase().trim();
    const lawItems = document.querySelectorAll('.law-item');
    const dictItems = document.querySelectorAll('.dict-item');
    const moreMsg = document.getElementById('moreDictMsg');
    
    let dictVisibleCount = 0;

    if (query === '') {
        lawItems.forEach(el => el.style.display = 'block');
        dictItems.forEach((el, i) => { el.style.display = i < 15 ? 'block' : 'none'; });
        moreMsg.style.display = 'block';
        moreMsg.textContent = 'Используй поиск выше, чтобы найти любой термин из базы';
        return;
    }

    lawItems.forEach(el => {
        el.style.display = el.getAttribute('data-search').includes(query) ? 'block' : 'none';
    });

    dictItems.forEach(el => {
        if (el.getAttribute('data-search').includes(query)) {
            el.style.display = 'block';
            dictVisibleCount++;
        } else {
            el.style.display = 'none';
        }
    });

    moreMsg.style.display = 'block';
    moreMsg.textContent = dictVisibleCount === 0 ? 'Ничего не найдено. Попробуйте другой запрос.' : 'Найдено терминов: ' + dictVisibleCount;
}
// === КОНЕЦ МОДУЛЯ ЮРИДИЧЕСКИЙ ХАБ ===


// === ГЛАВНОЕ МЕНЮ (ФИНАЛЬНАЯ РАБОЧАЯ ВЕРСИЯ) ===
function toggleMainMenu() {
    const popup = document.getElementById('mainMenuPopup');
    const btn = document.getElementById('mainMenuBtn');
    if (popup && btn) {
        if (popup.style.display === 'flex') {
            popup.style.display = 'none';
            btn.innerHTML = '💡';
        } else {
            popup.style.display = 'flex';
            btn.innerHTML = '❌';
        }
    }
}

function toggleNavBar() {
    const nav = document.getElementById('nav');
    const app = document.getElementById('app');
    if (nav) {
        if (nav.style.display === 'none') {
            nav.style.display = 'block';
            if (app) app.style.paddingTop = '70px';
        } else {
            nav.style.display = 'none';
            if (app) app.style.paddingTop = '10px';
        }
    }
}

function openSmartAssistant() {
    let h = '<h3>🤖 Умный помощник</h3>';
    h += '<div class="mut" style="font-size:13px;margin-bottom:15px">Ответь на 4 вопроса — рассчитаю время и стоимость.</div>';
    h += '<label style="color:#ffd700;font-size:14px;font-weight:bold">1. Что делаем?</label>';
    h += '<select id="sa_task" style="width:100%;padding:12px;margin:5px 0 15px;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff;font-size:14px">';
    h += '<option value="landing">🌐 Лендинг (~12 ч)</option>';
    h += '<option value="multisite">📄 Многостраничный (~40 ч)</option>';
    h += '<option value="shop">🛒 Интернет-магазин (~80 ч)</option>';
    h += '<option value="webapp">⚙️ Веб-приложение (~120 ч)</option>';
    h += '<option value="bot">🤖 Telegram-бот (~30 ч)</option>';
    h += '</select>';
    h += '<label style="color:#ffd700;font-size:14px;font-weight:bold">2. Сложность?</label>';
    h += '<select id="sa_complexity" style="width:100%;padding:12px;margin:5px 0 15px;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff;font-size:14px">';
    h += '<option value="simple">🟢 Простая</option>';
    h += '<option value="medium">🟡 Есть нюансы</option>';
    h += '<option value="hard">🔴 Сложная</option>';
    h += '</select>';
    h += '<label style="color:#ffd700;font-size:14px;font-weight:bold">3. Знакома технология?</label>';
    h += '<select id="sa_tech" style="width:100%;padding:12px;margin:5px 0 15px;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff;font-size:14px">';
    h += '<option value="expert">✅ Эксперт</option>';
    h += '<option value="familiar">🤔 Делал похожее</option>';
    h += '<option value="new">🆕 Новая</option>';
    h += '</select>';
    h += '<label style="color:#ffd700;font-size:14px;font-weight:bold">4. Какое ТЗ?</label>';
    h += '<select id="sa_spec" style="width:100%;padding:12px;margin:5px 0 20px;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff;font-size:14px">';
    h += '<option value="detailed">📋 Детальное</option>';
    h += '<option value="rough">📝 Примерное</option>';
    h += '<option value="none">❌ Нет ТЗ</option>';
    h += '</select>';
    h += '<button class="btn" style="width:100%;background:#ffd700;color:#000;font-size:16px;font-weight:bold" onclick="calculateSmart()">🧮 Рассчитать</button>';
    h += '<div id="sa_result" style="margin-top:15px"></div>';
    openModal(h);
}

function calculateSmart() {
    const task = document.getElementById('sa_task').value;
    const complexity = document.getElementById('sa_complexity').value;
    const tech = document.getElementById('sa_tech').value;
    const spec = document.getElementById('sa_spec').value;
    const baseHours = { landing: 12, multisite: 40, shop: 80, webapp: 120, bot: 30 };
    let hours = baseHours[task] || 20;
    const complexityMult = { simple: 0.8, medium: 1.2, hard: 1.8 };
    const techMult = { expert: 0.9, familiar: 1.1, new: 1.5 };
    const specMult = { detailed: 0.9, rough: 1.2, none: 1.4 };
    hours = Math.round(hours * complexityMult[complexity] * techMult[tech] * specMult[spec]);
    const rate = (typeof db !== 'undefined' && db.hourlyRate) ? db.hourlyRate : 2000;
    const cost = hours * rate;
    const resultHtml = '<div style="padding:15px;background:#1f2530;border-radius:8px;border:2px solid #3ecf8e;margin-top:15px">';
    resultHtml += '<div style="font-size:14px;color:#fff;margin-bottom:10px"><b>📊 Результат:</b></div>';
    resultHtml += '<div style="font-size:18px;color:#3ecf8e;margin-bottom:8px">⏱️ Время: <b>' + hours + ' часов</b></div>';
    resultHtml += '<div style="font-size:18px;color:#ffd700;margin-bottom:8px">💰 Стоимость: <b>' + cost.toLocaleString() + ' ₽</b></div>';
    resultHtml += '<div style="font-size:12px;color:#e8ecf3">При ставке ' + rate.toLocaleString() + ' ₽/ч</div>';
    resultHtml += '</div>';
    document.getElementById('sa_result').innerHTML = resultHtml;
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// === КОНЕЦ ГЛАВНОГО МЕНЮ ===

// === FIX: СКРЫТИЕ ПАНЕЛИ + ЗАГОЛОВКА ===
function toggleNavBar() {
    const nav = document.getElementById('nav');
    const h1 = document.querySelector('h1');
    const app = document.getElementById('app');
    
    if (!nav) return;

    if (nav.style.display === 'none') {
        // ПОКАЗЫВАЕМ панель и заголовок
        nav.style.display = '';
        if (h1) h1.style.display = '';
        if (app) {
            app.style.marginTop = '';
            app.style.paddingTop = '';
        }
    } else {
        // СКРЫВАЕМ панель и заголовок
        nav.style.display = 'none';
        if (h1) h1.style.display = 'none';
        if (app) {
            app.style.marginTop = '0';
            app.style.paddingTop = '10px';
        }
    }
}
// === КОНЕЦ FIX ===


// === ФИЛЬТР СЛОВАРЯ ПО КАТЕГОРИЯМ ===
function filterDictByCategory(category) {
    // 1. Фильтруем элементы словаря
    const items = document.querySelectorAll('.dict-item');
    items.forEach(el => {
        const elCat = el.getAttribute('data-category');
        if (category === 'all' || elCat === category) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
    
    // 2. Подсвечиваем активную кнопку
    const buttons = document.querySelectorAll('#dictFilters button');
    buttons.forEach(btn => {
        const btnCat = btn.getAttribute('data-category');
        if (btnCat === category) {
            btn.style.background = '#6c8cff';
            btn.style.color = '#fff';
            btn.style.borderColor = '#6c8cff';
        } else {
            btn.style.background = 'transparent';
            btn.style.color = '#6c8cff';
            btn.style.borderColor = '#6c8cff';
        }
    });
}
// === КОНЕЦ ФИЛЬТРА ===


// === УМНЫЙ ПОМОЩНИК 2.0: РЕЖИМ АНАЛИЗА НИШИ ===
function analyzeNiche() {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    
    // Шаг 1: Форма ввода
    modalContent.innerHTML = `
        <h3>🎯 Анализ ниши и генерация коммерческого предложения</h3>
        <div style="padding:15px;background:#1f2530;border-radius:8px;margin:15px 0">
            <label style="color:#ffd700;font-size:14px;font-weight:bold;display:block;margin-bottom:8px">1. Твоя ниша/профессия:</label>
            <input type="text" id="nicheInput" placeholder="Например: Веб-разработка для малого бизнеса" style="width:100%;padding:12px;background:#0f1419;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-size:14px;margin-bottom:15px">
            
            <label style="color:#ffd700;font-size:14px;font-weight:bold;display:block;margin-bottom:8px">2. Целевая аудитория:</label>
            <input type="text" id="targetAudience" placeholder="Например: Владельцы интернет-магазинов" style="width:100%;padding:12px;background:#0f1419;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-size:14px;margin-bottom:15px">
            
            <label style="color:#ffd700;font-size:14px;font-weight:bold;display:block;margin-bottom:8px">3. Дата анализа (для актуальности):</label>
            <input type="date" id="analysisDate" value="${new Date().toISOString().split('T')[0]}" style="width:100%;padding:12px;background:#0f1419;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-size:14px">
        </div>
        <button onclick="generateNicheAnalysis()" style="width:100%;padding:14px;background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer">🚀 Сгенерировать анализ</button>
    `;
    modal.style.display = 'flex';
}

function generateNicheAnalysis() {
    const niche = document.getElementById('nicheInput').value.trim();
    const audience = document.getElementById('targetAudience').value.trim();
    const date = document.getElementById('analysisDate').value;
    
    if (!niche || !audience) {
        alert('⚠️ Заполни все поля!');
        return;
    }
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = '<h3>🔍 Анализирую нишу...</h3><div style="text-align:center;padding:30px"><div style="font-size:48px">⏳</div><p style="color:#e8ecf3">Ищу боли клиентов в базе знаний и актуальные тренды...</p></div>';
    
    // Ищем релевантные термины в базе
    const relevantTerms = legalDataCache.dictionary.filter(term => {
        const searchStr = (term.term + ' ' + term.def).toLowerCase();
        return searchStr.includes('реклам') || searchStr.includes('персональн') || 
               searchStr.includes('договор') || searchStr.includes('налог') ||
               searchStr.includes('ответственн') || searchStr.includes('штраф');
    }).slice(0, 5);
    
    // Ищем актуальную информацию в Wikipedia
    const wikiQuery = encodeURIComponent(niche + ' тренды 2024');
    const wikiUrl = `https://ru.wikipedia.org/api/rest_v1/page/summary/${wikiQuery}`;
    
    fetch(wikiUrl)
        .then(response => response.json())
        .then(wikiData => {
            const trendInfo = wikiData.extract ? wikiData.extract.substring(0, 300) : 'Актуальные тренды: рост спроса на цифровизацию, ужесточение регулирования, повышение требований к безопасности данных.';
            
            // Генерируем анализ
            const painPoints = relevantTerms.map(term => `• **${term.term}**: ${term.def.substring(0, 100)}...`).join('\n');
            
            const analysis = `
                <h3>📊 Анализ ниши: ${niche}</h3>
                <div style="font-size:12px;color:#6c8cff;margin-bottom:15px">Дата анализа: ${date} | Целевая аудитория: ${audience}</div>
                
                <div style="padding:15px;background:#1f2530;border-radius:8px;margin-bottom:15px;border-left:4px solid #ff6b6b">
                    <h4 style="color:#ff6b6b;margin-top:0">🔥 Боли клиентов:</h4>
                    <ul style="color:#e8ecf3;font-size:13px;line-height:1.6;margin:0;padding-left:20px">
                        <li>Страх штрафов за нарушение законодательства (персональные данные, реклама, налоги)</li>
                        <li>Необходимость соответствия требованиям регуляторов (Роскомнадзор, ФНС, ФАС)</li>
                        <li>Риск судебных исков от клиентов и конкурентов</li>
                        <li>Сложность самостоятельного оформления документов</li>
                        <li>Незнание актуальных изменений в законодательстве</li>
                    </ul>
                </div>
                
                <div style="padding:15px;background:#1f2530;border-radius:8px;margin-bottom:15px;border-left:4px solid #3ecf8e">
                    <h4 style="color:#3ecf8e;margin-top:0">💡 Твоё коммерческое решение:</h4>
                    <p style="color:#e8ecf3;font-size:14px;line-height:1.6">
                        Предлагаю пакет <b>"${niche} + Юридическая защита под ключ"</b>:<br><br>
                        ✅ Разработка/настройка ${niche.toLowerCase()}<br>
                        ✅ Подготовка полного пакета документов (Оферта, Политика ПД, Договор)<br>
                        ✅ Аудит на соответствие требованиям законодательства<br>
                        ✅ Консультация по налогам и отчётности<br>
                        ✅ Поддержка и обновления при изменениях в законах
                    </p>
                </div>
                
                <div style="padding:15px;background:#1f2530;border-radius:8px;margin-bottom:15px;border-left:4px solid #ffd700">
                    <h4 style="color:#ffd700;margin-top:0"> Скрипт для первого сообщения клиенту:</h4>
                    <p style="color:#e8ecf3;font-size:13px;line-height:1.6;font-style:italic">
                        "Здравствуйте! Вижу, что вы развиваете ${audience.toLowerCase()}. 
                        Многие владельцы бизнеса сталкиваются с рисками штрафов до 500 000 ₽ за отсутствие правильных документов на сайте 
                        (политика конфиденциальности, оферта, согласие на обработку ПД).<br><br>
                        Я специализируюсь на создании ${niche.toLowerCase()} с полной юридической защитой. 
                        Могу провести бесплатный аудит вашего текущего решения и показать, где есть риски. 
                        Удобно созвониться на 15 минут на этой неделе?"
                    </p>
                </div>
                
                <div style="padding:15px;background:#1f2530;border-radius:8px;margin-bottom:15px;border-left:4px solid #6c8cff">
                    <h4 style="color:#6c8cff;margin-top:0">📚 Актуальные тренды (${date}):</h4>
                    <p style="color:#e8ecf3;font-size:13px;line-height:1.6">${trendInfo}</p>
                </div>
                
                <div style="padding:15px;background:#1f2530;border-radius:8px;margin-bottom:15px;border-left:4px solid #9d6cff">
                    <h4 style="color:#9d6cff;margin-top:0">⚖️ Ключевые законы для твоей ниши:</h4>
                    <ul style="color:#e8ecf3;font-size:12px;line-height:1.5;margin:0;padding-left:20px">
                        ${relevantTerms.map(term => `<li><b>${term.term}</b>: ${term.def.substring(0, 80)}...</li>`).join('')}
                    </ul>
                </div>
                
                <button onclick="closeModal()" style="width:100%;padding:12px;background:#6c8cff;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">Закрыть</button>
            `;
            
            modalContent.innerHTML = analysis;
        })
        .catch(error => {
            // Если Wikipedia недоступен, используем только локальную базу
            const analysis = `
                <h3>📊 Анализ ниши: ${niche}</h3>
                <div style="font-size:12px;color:#6c8cff;margin-bottom:15px">Дата анализа: ${date} | Целевая аудитория: ${audience}</div>
                
                <div style="padding:15px;background:#1f2530;border-radius:8px;margin-bottom:15px;border-left:4px solid #ff6b6b">
                    <h4 style="color:#ff6b6b;margin-top:0">🔥 Боли клиентов:</h4>
                    <ul style="color:#e8ecf3;font-size:13px;line-height:1.6;margin:0;padding-left:20px">
                        <li>Страх штрафов за нарушение законодательства</li>
                        <li>Необходимость соответствия требованиям регуляторов</li>
                        <li>Риск судебных исков</li>
                        <li>Сложность самостоятельного оформления документов</li>
                    </ul>
                </div>
                
                <div style="padding:15px;background:#1f2530;border-radius:8px;margin-bottom:15px;border-left:4px solid #3ecf8e">
                    <h4 style="color:#3ecf8e;margin-top:0">💡 Твоё коммерческое решение:</h4>
                    <p style="color:#e8ecf3;font-size:14px;line-height:1.6">
                        Предлагаю пакет <b>"${niche} + Юридическая защита под ключ"</b>:<br><br>
                        ✅ Разработка/настройка ${niche.toLowerCase()}<br>
                        ✅ Подготовка полного пакета документов<br>
                        ✅ Аудит на соответствие требованиям законодательства<br>
                        ✅ Консультация по налогам и отчётности
                    </p>
                </div>
                
                <div style="padding:15px;background:#1f2530;border-radius:8px;margin-bottom:15px;border-left:4px solid #ffd700">
                    <h4 style="color:#ffd700;margin-top:0">📝 Скрипт для первого сообщения:</h4>
                    <p style="color:#e8ecf3;font-size:13px;line-height:1.6;font-style:italic">
                        "Здравствуйте! Вижу, что вы развиваете ${audience.toLowerCase()}. 
                        Многие сталкиваются с рисками штрафов за отсутствие правильных документов. 
                        Я специализируюсь на ${niche.toLowerCase()} с полной юридической защитой. 
                        Могу провести бесплатный аудит. Удобно созвониться?"
                    </p>
                </div>
                
                <button onclick="closeModal()" style="width:100%;padding:12px;background:#6c8cff;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">Закрыть</button>
            `;
            
            modalContent.innerHTML = analysis;
        });
}

// === ОБНОВЛЕНИЕ БАЗЫ ДАННЫХ ИЗ ИНТЕРНЕТА ===
function updateDatabaseFromInternet() {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <h3>🔄 Обновление базы данных из интернета</h3>
        <div style="padding:15px;background:#1f2530;border-radius:8px;margin:15px 0">
            <label style="color:#ffd700;font-size:14px;font-weight:bold;display:block;margin-bottom:8px">Что искать для обновления базы?</label>
            <input type="text" id="updateQuery" placeholder="Например: Новые законы о персональных данных 2024" style="width:100%;padding:12px;background:#0f1419;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-size:14px">
        </div>
        <button onclick="searchAndUpdate()" style="width:100%;padding:14px;background:linear-gradient(135deg,#3ecf8e,#2ba876);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer">🔍 Найти и добавить в базу</button>
    `;
    modal.style.display = 'flex';
}

function searchAndUpdate() {
    const query = document.getElementById('updateQuery').value.trim();
    if (!query) {
        alert('⚠️ Введи запрос!');
        return;
    }
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = '<h3>🔍 Поиск актуальной информации...</h3><div style="text-align:center;padding:30px"><div style="font-size:48px">⏳</div><p style="color:#e8ecf3">Ищем в Wikipedia...</p></div>';
    
    const wikiUrl = `https://ru.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    
    fetch(wikiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.title && data.extract) {
                modalContent.innerHTML = `
                    <h3>✅ Найдена актуальная информация</h3>
                    <div style="padding:15px;background:#1f2530;border-radius:8px;margin:15px 0">
                        <h4 style="color:#6c8cff;margin-top:0">${data.title}</h4>
                        <p style="color:#e8ecf3;line-height:1.6">${data.extract}</p>
                    </div>
                    <div style="display:flex;gap:10px;flex-wrap:wrap">
                        <button onclick="addToDatabase('${data.title.replace(/'/g, "\'")}', '${data.extract.replace(/'/g, "\'").substring(0, 300)}...')" style="flex:1;padding:12px;background:#3ecf8e;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">➕ Добавить в базу</button>
                        <button onclick="closeModal()" style="flex:1;padding:12px;background:#6c757d;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">❌ Отмена</button>
                    </div>
                `;
            } else {
                modalContent.innerHTML = `
                    <h3>⚠️ Информация не найдена</h3>
                    <p style="color:#e8ecf3">Попробуйте другой запрос или уточните формулировку.</p>
                    <button onclick="closeModal()" style="width:100%;padding:12px;background:#6c8cff;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;margin-top:15px">Закрыть</button>
                `;
            }
        })
        .catch(error => {
            modalContent.innerHTML = `
                <h3>❌ Ошибка подключения</h3>
                <p style="color:#e8ecf3">Не удалось получить данные из интернета.</p>
                <button onclick="closeModal()" style="width:100%;padding:12px;background:#6c8cff;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;margin-top:15px">Закрыть</button>
            `;
        });
}

function addToDatabase(term, definition) {
    let customTerms = JSON.parse(localStorage.getItem('customLegalTerms') || '[]');
    customTerms.push({
        term: term,
        def: definition,
        category: 'Добавлено из интернета',
        dateAdded: new Date().toISOString()
    });
    localStorage.setItem('customLegalTerms', JSON.stringify(customTerms));
    
    alert('✅ Термин добавлен в локальную базу!\n\nОн будет доступен при следующем открытии вкладки "Право".');
    closeModal();
}

function loadCustomTerms() {
    const customTerms = JSON.parse(localStorage.getItem('customLegalTerms') || '[]');
    if (customTerms.length > 0 && legalDataCache) {
        legalDataCache.dictionary.push(...customTerms);
        console.log(`✅ Загружено ${customTerms.length} пользовательских терминов из localStorage`);
    }
}
// === КОНЕЦ УМНОГО ПОМОЩНИКА 2.0 ===

function renderAnalytics(){
    var h='<h2>📊 Аналитика</h2>';
    h+='<div class="card" style="text-align:center;padding:30px">';
    h+='<p style="font-size:16px;margin-bottom:20px">Модуль детальной аналитики находится в разработке.</p>';
    h+='<button class="btn" style="background:#6c8cff" onclick="go(\'home\')">⬅️ Вернуться на главную</button>';
    h+='</div>';
    document.getElementById('app').innerHTML = h;
}
