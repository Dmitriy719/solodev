// SoloDev Patch v1.0
if(!db.prices)db.prices=[];if(!db.timeEntries)db.timeEntries=[];if(!db.goals)db.goals=[];if(!db.skills)db.skills=[];if(!db.knowledge)db.knowledge=[];if(!db.contracts)db.contracts=[];if(!db.tasks)db.tasks=[];if(!db.portfolio)db.portfolio=[];if(!db.notes)db.notes=[];

function renderPrice(){let h='<div class="row spread"><h2>💵 Прайс</h2><button class="btn" onclick="addPrice()">+ Услуга</button></div>';h+='<div class="card"><b>🧮 Калькулятор</b><div style="margin-top:10px"><label class="mut">Часов:</label><input type="number" id="calcHours" value="10" onchange="calcPrice()" style="width:100%;margin:5px 0"><label class="mut">Ставка (₽/час):</label><input type="number" id="calcRate" value="1500" onchange="calcPrice()" style="width:100%;margin:5px 0"><div id="calcResult" style="margin-top:10px;font-size:1.3em;color:var(--accent)"></div></div></div>';h+='<div class="card"><b>📋 Услуги</b>';if(!db.prices.length)h+='<div class="mut" style="margin-top:10px">Нет услуг</div>';db.prices.forEach((p,i)=>{h+='<div class="note" style="margin-top:8px"><div class="row spread"><b>'+esc(p.name)+'</b><span class="chip on">'+p.price+'₽</span></div><button class="btn sec" style="margin-top:5px" onclick="delPrice('+i+')">Удалить</button></div>'});h+='</div>';return h;}
function calcPrice(){const h=+document.getElementById('calcHours').value||0,r=+document.getElementById('calcRate').value||0;document.getElementById('calcResult').innerHTML='<b>'+(h*r).toLocaleString()+'₽</b>';}
function addPrice(){const n=prompt('Название:');if(!n)return;const p=+prompt('Цена:')||0;db.prices.push({name:n,price:p});save();render();}
function delPrice(i){db.prices.splice(i,1);save();render();}

function renderTime(){let h='<div class="row spread"><h2>⏱ Время</h2></div><div class="card"><div class="mut">Трекер времени</div></div>';return h;}

function renderGrowth(){let h='<div class="row spread"><h2> Рост</h2></div><div class="card"><div class="mut">Цели и навыки</div></div>';return h;}

function renderLawyer(){let h='<div class="row spread"><h2>⚖️ Юрист</h2></div><div class="card"><div class="mut">Шаблоны документов</div></div>';return h;}

function renderPlan(){let h='<div class="row spread"><h2>📅 План</h2><button class="btn" onclick="addTask()">+ Задача</button></div>';h+='<div class="card"><b>Задачи</b>';if(!db.tasks.length)h+='<div class="mut" style="margin-top:10px">Нет задач</div>';db.tasks.forEach((t,i)=>{h+='<div class="note" style="margin-top:5px"><b>'+esc(t.title)+'</b><button class="btn sec" style="margin-top:5px" onclick="delTask('+i+')">✕</button></div>'});h+='</div>';return h;}
function addTask(){const t=prompt('Задача:');if(!t)return;db.tasks.push({title:t,status:'todo'});save();render();}
function delTask(i){db.tasks.splice(i,1);save();render();}

function renderPortfolio(){return '<div class="row spread"><h2>💼 Портфолио</h2></div><div class="card"><div class="mut">Проекты</div></div>';}
function renderNotes(){return '<div class="row spread"><h2>📝 Заметки</h2></div><div class="card"><div class="mut">Заметки</div></div>';}
function renderAnalytics(){return '<div class="row spread"><h2> Аналитика</h2></div><div class="card"><div class="mut">Статистика</div></div>';}

const OLD_GO=go;go=function(v){const R={price:renderPrice,time:renderTime,growth:renderGrowth,lawyer:renderLawyer,plan:renderPlan,portfolio:renderPortfolio,notes:renderNotes,analytics:renderAnalytics};if(R[v]){document.getElementById('app').innerHTML=R[v]();document.getElementById('nav').innerHTML=renderNav(v);return;}OLD_GO(v);};

const OLD_NAV=renderNav;renderNav=function(a){const items=[{id:'home',icon:'🏠',label:'Главная'},{id:'clients',icon:'',label:'Клиенты'},{id:'projects',icon:'📁',label:'Проекты'},{id:'finances',icon:'💰',label:'Финансы'},{id:'taxes',icon:'',label:'Налоги'},{id:'price',icon:'💵',label:'Прайс'},{id:'time',icon:'⏱',label:'Время'},{id:'plan',icon:'📅',label:'План'},{id:'growth',icon:'🎯',label:'Рост'},{id:'lawyer',icon:'️',label:'Юрист'},{id:'portfolio',icon:'💼',label:'Портфолио'},{id:'notes',icon:'',label:'Заметки'},{id:'analytics',icon:'📊',label:'Аналитика'},{id:'settings',icon:'⚙️',label:'Настройки'}];let h='<div class="nav">';items.forEach(i=>{h+='<button class="nav-btn'+(i.id===a?' active':'')+'" onclick="go(\''+i.id+'\')">'+i.icon+'<br><small>'+i.label+'</small></button>';});h+='</div>';return h;};

console.log('✅ Patch loaded');
