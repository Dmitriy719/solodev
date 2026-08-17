
var ALL_SPECS=['Фронтенд','Бэкенд','Fullstack','Мобильная разработка','iOS','Android','Flutter','React Native','Боты (Telegram/VK)','DevOps','SRE','QA','Автотесты','Дизайн','UI/UX','Графический дизайн','Data Science','Machine Learning','Deep Learning','Computer Vision','NLP','1С','GameDev','Unity','Unreal Engine','Администрирование','Системный анализ','Бизнес-анализ','Техподдержка','ERP/CRM','Blockchain','Web3','AR/VR','Кибербезопасность','Pentest','Embedded','IoT','Python','JavaScript','TypeScript','React','Vue','Angular','Node.js','PHP','Laravel','Java','C#','.NET','Go','Rust','Swift','Kotlin','C/C++','Ruby','Django','Flask','FastAPI','Spring','WordPress','Bitrix','SQL','PostgreSQL','MySQL','MongoDB','Redis','Elasticsearch','Docker','Kubernetes','AWS','Azure','GCP','Yandex Cloud','Linux','Windows Server','Networking','Scrum/Agile','Project Management','Product Management','SEO','SMM','Контекстная реклама','Таргет','Email-маркетинг','Контент-маркетинг','Видеопродакшн','3D-моделирование','Анимация','Саунд-дизайн','Техническое писательство','Локализация'];
var db={profile:{name:'Дмитрий',spec:'Fullstack разработчик',specs:['Фронтенд','Бэкенд','Боты (Telegram/VK)'],phone:'+79001234567',email:'dev@example.com'},clients:[{id:'1',name:'Алексей',company:'TechStart',budget:45000,status:'В работе'}],projects:[{id:'1',name:'Интернет-магазин',client:'Алексей',budget:45000,stage:1,deadline:'2026-09-01',estimatedHours:40,tasks:[{id:'1',text:'Сверстать главную',done:false}]}],finances:[{id:'1',date:'2026-08-14',type:'in',amt:30000,cat:'Проект'},{id:'2',date:'2026-08-13',type:'in',amt:15000,cat:'Проект'},{id:'3',date:'2026-08-12',type:'in',amt:20000,cat:'Проект'},{id:'4',date:'2026-08-11',type:'in',amt:10000,cat:'Проект'}],leads:[],pains:[],sources:[],templates:[],showAllTemplates:false,autoLeads:[],currentSearchSpec:null,hhSearchStatus:'',emailTemplates:[],services:{},currency:'RUB',taxJurisdiction:'russia',taxSystem:'npd',exchangeRates:{USD:92.50,EUR:100.20,CNY:12.80,BYN:28.50,KZT:0.19,RUB:1},goals:[],recurring:[],receivables:[],taxReserve:0,budgets:{},pots:[],monthlyNeeds:80000,monthlyWants:30000,monthlySavings:40000,quickTemplates:[],hourlyRate:2000,credits:[],paymentCalendar:[]};
var currentView='home';
var TABS=[{id:'home',icon:'🏠',label:'Главная'},{id:'dashboard',icon:'📊',label:'Дашборд'},{id:'radar',icon:'🎯',label:'Радар'},{id:'projects',icon:'📁',label:'Проекты'},{id:'clients',icon:'👥',label:'Клиенты'},{id:'finances',icon:'💰',label:'Финансы'},{id:'emails',icon:'✉️',label:'Шаблоны'},{id:'pricing',icon:'💵',label:'Прайс'},{id:'productivity',icon:'⏱',label:'Продуктивность'},{id:'settings',icon:'⚙️',label:'Настройки'}];

function save(){localStorage.setItem('solodev',JSON.stringify(db))}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function today(){return new Date().toISOString().slice(0,10)}
function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

function renderNav(){
  var h='';
  TABS.forEach(function(t){h+='<button class="btn small '+(currentView===t.id?'active':'')+'" onclick="go(\''+t.id+'\')">'+t.icon+' '+t.label+'</button>'});
  document.getElementById('nav').innerHTML=h;
}
function go(id){currentView=id;renderNav();render()}
function render(){
  if(currentView==='home')renderHome();
  else if(currentView==='dashboard')renderDashboard();
  else if(currentView==='radar')renderRadar();
  else if(currentView==='projects')renderProjects();
  else if(currentView==='clients')renderClients();
  else if(currentView==='finances')renderFinances();
  else if(currentView==='productivity')renderProductivity();
  else if(currentView==='emails')renderEmails();
  else if(currentView==='pricing')renderPricing();
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
  try {
    if(!db.pomodoro) db.pomodoro = {sessions:[], totalTime:0, dailyGoal:25};
    if(!db.habits) db.habits = [];
    if(!db.diary) db.diary = [];
    
    var h='<h2>⏱ Продуктивность</h2>';
    h+='<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:15px">';
    h+='<button class="btn" style="background:#ff6b6b" onclick="showPomodoro()">🍅 Pomodoro</button>';
    h+='<button class="btn" style="background:#3ecf8e" onclick="showHabits()">✅ Привычки</button>';
    h+='<button class="btn" style="background:#6c8cff" onclick="showDiary()">📝 Дневник</button>';
    h+='<button class="btn" style="background:#9d6cff" onclick="showFocusStats()">📊 Статистика</button>';
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
  } catch(e) {
    console.error("Productivity Error:", e);
    document.getElementById('app').innerHTML = '<h2>⏱ Ошибка</h2><p>Произошла ошибка при загрузке.</p><button class="btn" onclick="go(\'home\')">🏠 На главную</button>';
  }
}


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
  db.pomodoro.dailyGoal = +document.getElementById('pomodoro_goal').value || 25;
  save();
  alert('✅ Настройки сохранены');
}

// === ТРЕКЕР ПРИВЫЧЕК ===
function showHabits(){
  var h='<h3>✅ Трекер привычек</h3>';
  h+='<p class="mut">Формируй полезные привычки с сериями 🔥</p>';
  
  if(db.habits.length === 0){
    h+='<div class="mut" style="text-align:center;padding:20px">Нет привычек. Создай первую!</div>';
  } else {
    db.habits.forEach(function(hab){
      var streak = calculateStreak(hab);
      var today = today();
      var doneToday = hab.log && hab.log[today];
      var totalDays = hab.log ? Object.keys(hab.log).length : 0;
      
      h+='<div class="card" style="margin:8px 0">';
      h+='<div style="display:flex;justify-content:space-between;align-items:flex-start">';
      h+='<div style="flex:1"><b style="font-size:15px">'+esc(hab.name)+'</b>';
      h+='<div class="mut" style="font-size:11px;margin-top:4px">🔥 Серия: '+streak+' дней · Всего: '+totalDays+' дней</div>';
      if(hab.description) h+='<div class="mut" style="font-size:11px">'+esc(hab.description)+'</div>';
      h+='</div>';
      h+='<div style="display:flex;gap:6px">';
      h+='<button class="btn small" style="background:'+(doneToday?'#3ecf8e':'#1f2530')+';padding:6px 12px" onclick="toggleHabit(\''+hab.id+'\')">'+(doneToday?'✅':'⬜')+'</button>';
      h+='<button class="btn small" style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;padding:4px 8px" onclick="deleteHabit(\''+hab.id+'\')">🗑</button>';
      h+='</div></div>';
      
      // Мини-календарь за последние 7 дней
      h+='<div style="display:flex;gap:4px;margin-top:8px">';
      for(var i=6; i>=0; i--){
        var d = new Date();
        d.setDate(d.getDate() - i);
        var dateStr = d.toISOString().slice(0,10);
        var done = hab.log && hab.log[dateStr];
        h+='<div style="flex:1;text-align:center;padding:4px;background:'+(done?'#3ecf8e':'#1f2530')+';border-radius:4px;font-size:10px">';
        h+=d.getDate()+'</div>';
      }
      h+='</div></div>';
    });
  }
  
  h+='<button class="btn" style="width:100%;margin-top:10px" onclick="addHabit()">+ Новая привычка</button>';
  h+='<button class="btn" style="background:#1f2530;width:100%;margin-top:8px" onclick="closeModal()">Закрыть</button>';
  openModal(h);
}

function addHabit(){
  var h='<h3>➕ Новая привычка</h3>';
  h+='<label>Название</label><input id="habit_name" placeholder="Например: Медитация, Чтение, Спорт">';
  h+='<label>Описание (необязательно)</label><input id="habit_desc" placeholder="Краткое описание">';
  h+='<div style="display:flex;gap:10px;margin-top:15px">';
  h+='<button class="btn" onclick="saveHabit()">💾 Сохранить</button>';
  h+='<button class="btn" style="background:#1f2530" onclick="showHabits()">← Назад</button>';
  h+='</div>';
  openModal(h);
}

function saveHabit(){
  var name = document.getElementById('habit_name').value.trim();
  if(!name){alert('⚠️ Введи название!');return;}
  db.habits.push({
    id: (typeof uid!=='undefined' ? uid() : Date.now().toString(36)+Math.random().toString(36).substr(2)),
    name: name,
    description: document.getElementById('habit_desc').value,
    log: {},
    created: today()
  });
  save();
  showHabits();
}

function toggleHabit(id){
  var habit = db.habits.find(function(h){return h.id===id});
  if(!habit) return;
  var today = today();
  if(!habit.log) habit.log = {};
  if(habit.log[today]){
    delete habit.log[today];
  } else {
    habit.log[today] = true;
  }
  save();
  showHabits();
  if(currentView === 'productivity') renderProductivity();
}

function deleteHabit(id){
  if(confirm('Удалить привычку?')){
    db.habits = db.habits.filter(function(h){return h.id!==id});
    save();
    showHabits();
  }
}

function calculateStreak(habit){
  if(!habit.log) return 0;
  var streak = 0;
  var d = new Date();
  while(true){
    var dateStr = d.toISOString().slice(0,10);
    if(habit.log[dateStr]){
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

// === ДНЕВНИК ===
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
  h+='<div class="card"><h3>📥 Экспорт данных</h3><button class="btn" onclick="exportData()">📥 Скачать JSON бэкап</button></div>';
  h+='<div class="card"><h3> Сброс</h3><button class="btn" style="background:#ff6b6b" onclick="hardReset()">🗑 Сбросить всё</button></div>';
  document.getElementById('app').innerHTML=h;
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
    renderNav();
    render();
    loadExternalData();
  } catch(e) {
    document.getElementById('app').innerHTML = '<div class="card" style="background:#2f1a1a;border-color:#ff6b6b"><h3>🚨 Ошибка загрузки</h3><pre style="color:#ff6b6b;font-size:12px;white-space:pre-wrap">'+e.message+'</pre><button class="btn" onclick="location.reload()">Перезагрузить</button></div>';
    console.error('SoloDev error:', e);
  }
};
