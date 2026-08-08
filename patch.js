// ===== ПАТЧ ДЛЯ SOLODEV v0.9 =====
// Добавляет все недостающие функции для фрилансера

// Инициализация данных
if(!db.prices) db.prices = [];
if(!db.timeEntries) db.timeEntries = [];
if(!db.goals) db.goals = [];
if(!db.skills) db.skills = [];
if(!db.knowledge) db.knowledge = [];
if(!db.contracts) db.contracts = [];
if(!db.tasks) db.tasks = [];
if(!db.portfolio) db.portfolio = [];
if(!db.notes) db.notes = [];

// ===== ПРАЙС =====
function renderPrice(){
  let h = `<div class="row spread"><h2> Прайс</h2><button class="btn" onclick="addPrice()">+ Услуга</button></div>`;
  
  // Калькулятор
  h += `<div class="card ai"><b>🧮 Калькулятор стоимости</b>
    <div style="margin-top:10px">
      <label class="mut">Часов работы:</label>
      <input type="number" id="calcHours" value="10" onchange="calcPrice()" style="width:100%;margin:5px 0">
      <label class="mut">Ставка (₽/час):</label>
      <input type="number" id="calcRate" value="${db.profile.rate||1500}" onchange="calcPrice()" style="width:100%;margin:5px 0">
      <label class="mut">Сложность:</label>
      <select id="calcComplexity" onchange="calcPrice()" style="width:100%;margin:5px 0">
        <option value="1">Простая (x1)</option>
        <option value="1.3" selected>Средняя (x1.3)</option>
        <option value="1.7">Сложная (x1.7)</option>
        <option value="2.2">Очень сложная (x2.2)</option>
      </select>
      <div id="calcResult" style="margin-top:10px;font-size:1.3em;color:var(--accent)"></div>
    </div>
  </div>`;
  
  // Список услуг
  h += `<div class="card"><b>📋 Мои услуги</b>`;
  if(!db.prices.length) h += `<div class="mut" style="margin-top:10px">Нет услуг. Добавьте первую!</div>`;
  db.prices.forEach((p,i) => {
    h += `<div class="note" style="margin-top:8px">
      <div class="row spread"><b>${esc(p.name)}</b><span class="chip on">${p.price}₽</span></div>
      <div class="mut">${esc(p.desc||'')}</div>
      <button class="btn sec" style="margin-top:5px;padding:4px 8px" onclick="delPrice(${i})">Удалить</button>
    </div>`;
  });
  h += `</div>`;
  return h;
}

function calcPrice(){
  const hours = +document.getElementById('calcHours').value || 0;
  const rate = +document.getElementById('calcRate').value || 0;
  const complexity = +document.getElementById('calcComplexity').value || 1;
  const total = Math.round(hours * rate * complexity);
  document.getElementById('calcResult').innerHTML = ` Итого: <b>${total.toLocaleString()}₽</b>`;
}

function addPrice(){
  const name = prompt('Название услуги:');
  if(!name) return;
  const price = +prompt('Цена (₽):') || 0;
  const desc = prompt('Описание:') || '';
  db.prices.push({name, price, desc});
  save(); render();
}

function delPrice(i){
  if(confirm('Удалить услугу?')){
    db.prices.splice(i,1);
    save(); render();
  }
}

// ===== ВРЕМЯ =====
let timerInterval = null;
let timerStart = null;

function renderTime(){
  let h = `<div class="row spread"><h2>⏱ Время</h2>`;
  if(timerStart){
    h += `<button class="btn danger" onclick="stopTimer()">⏹ Остановить</button>`;
  } else {
    h += `<button class="btn" onclick="startTimer()">▶ Старт</button>`;
  }
  h += `</div>`;
  
  // Таймер
  if(timerStart){
    const elapsed = Math.floor((Date.now() - timerStart) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    h += `<div class="card ai" style="text-align:center;font-size:2em;color:var(--accent)">
      ${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}
      <div style="font-size:0.5em;color:var(--mut)">Таймер активен</div>
    </div>`;
  }
  
  // Сегодня
  const today = new Date().toDateString();
  const todayEntries = db.timeEntries.filter(e => new Date(e.start).toDateString() === today);
  const todayTotal = todayEntries.reduce((sum, e) => sum + (e.duration || 0), 0);
  h += `<div class="card"><b>📅 Сегодня</b>
    <div style="font-size:1.5em;color:var(--accent);margin-top:5px">${Math.floor(todayTotal/3600)}ч ${Math.floor((todayTotal%3600)/60)}м</div>
  </div>`;
  
  // Список записей
  h += `<div class="card"><b>📊 История</b>`;
  if(!db.timeEntries.length) h += `<div class="mut" style="margin-top:10px">Нет записей</div>`;
  [...db.timeEntries].reverse().slice(0,20).forEach(e => {
    const date = new Date(e.start).toLocaleString('ru-RU', {day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
    const mins = Math.floor((e.duration||0)/60);
    h += `<div class="note" style="margin-top:5px">
      <div class="row spread"><b>${esc(e.task||'Без задачи')}</b><span class="chip on">${mins}м</span></div>
      <div class="mut">${date}</div>
    </div>`;
  });
  h += `</div>`;
  return h;
}

function startTimer(){
  const task = prompt('Над чем работаете?') || 'Без задачи';
  timerStart = Date.now();
  timerInterval = setInterval(() => { if(document.getElementById('app')) render(); }, 1000);
  save(); render();
}

function stopTimer(){
  if(!timerStart) return;
  const duration = Math.floor((Date.now() - timerStart) / 1000);
  const task = prompt('Что сделали?') || 'Без задачи';
  db.timeEntries.push({task, start: timerStart, duration});
  timerStart = null;
  clearInterval(timerInterval);
  save(); render();
}

// ===== РОСТ =====
function renderGrowth(){
  let h = `<div class="row spread"><h2>🎯 Рост</h2></div>`;
  
  // Цели
  h += `<div class="card"><b>🎯 Цели</b>
    <button class="btn sec" style="margin-top:5px" onclick="addGoal()">+ Добавить цель</button>`;
  if(!db.goals.length) h += `<div class="mut" style="margin-top:10px">Нет целей</div>`;
  db.goals.forEach((g,i) => {
    h += `<div class="note" style="margin-top:8px">
      <div class="row spread"><b>${esc(g.title)}</b>
        <span class="chip ${g.done?'on':'off'}">${g.done?'✓':'○'}</span>
      </div>
      <div class="mut">${esc(g.desc||'')}</div>
      <div style="margin-top:5px">
        <input type="range" min="0" max="100" value="${g.progress||0}" onchange="updateGoal(${i},this.value)" style="width:100%">
        <div class="mut">${g.progress||0}%</div>
      </div>
      <button class="btn sec" style="margin-top:5px;padding:4px 8px" onclick="delGoal(${i})">Удалить</button>
    </div>`;
  });
  h += `</div>`;
  
  // Навыки
  h += `<div class="card"><b>💪 Навыки</b>
    <button class="btn sec" style="margin-top:5px" onclick="addSkill()">+ Добавить навык</button>`;
  if(!db.skills.length) h += `<div class="mut" style="margin-top:10px">Нет навыков</div>`;
  db.skills.forEach((s,i) => {
    h += `<div class="note" style="margin-top:8px">
      <div class="row spread"><b>${esc(s.name)}</b>
        <span class="chip on">${'★'.repeat(s.level||1)}${'☆'.repeat(5-(s.level||1))}</span>
      </div>
      <button class="btn sec" style="margin-top:5px;padding:4px 8px" onclick="delSkill(${i})">Удалить</button>
    </div>`;
  });
  h += `</div>`;
  
  // База знаний
  h += `<div class="card"><b>📚 База знаний</b>
    <button class="btn sec" style="margin-top:5px" onclick="addKnowledge()">+ Добавить</button>`;
  if(!db.knowledge.length) h += `<div class="mut" style="margin-top:10px">Пусто</div>`;
  db.knowledge.forEach((k,i) => {
    h += `<div class="note" style="margin-top:8px">
      <div class="row spread"><b>${esc(k.title)}</b>
        <span class="chip on">${esc(k.category||'Общее')}</span>
      </div>
      <div class="mut">${esc(k.content||'').substring(0,100)}...</div>
      <button class="btn sec" style="margin-top:5px;padding:4px 8px" onclick="delKnowledge(${i})">Удалить</button>
    </div>`;
  });
  h += `</div>`;
  return h;
}

function addGoal(){
  const title = prompt('Цель:');
  if(!title) return;
  const desc = prompt('Описание:') || '';
  db.goals.push({title, desc, progress:0, done:false});
  save(); render();
}

function updateGoal(i, val){
  db.goals[i].progress = +val;
  db.goals[i].done = +val >= 100;
  save(); render();
}

function delGoal(i){
  if(confirm('Удалить цель?')){ db.goals.splice(i,1); save(); render(); }
}

function addSkill(){
  const name = prompt('Навык:');
  if(!name) return;
  const level = +prompt('Уровень (1-5):') || 1;
  db.skills.push({name, level: Math.min(5, Math.max(1, level))});
  save(); render();
}

function delSkill(i){
  if(confirm('Удалить навык?')){ db.skills.splice(i,1); save(); render(); }
}

function addKnowledge(){
  const title = prompt('Заголовок:');
  if(!title) return;
  const category = prompt('Категория:') || 'Общее';
  const content = prompt('Содержание:') || '';
  db.knowledge.push({title, category, content});
  save(); render();
}

function delKnowledge(i){
  if(confirm('Удалить запись?')){ db.knowledge.splice(i,1); save(); render(); }
}

// ===== ЮРИСТ =====
const CONTRACT_TEMPLATES = {
  'Договор на разработку': `ДОГОВОР ВОЗМЕЗДНОГО ОКАЗАНИЯ УСЛУГ\n\nг. _________ «___» _________ 20__ г.\n\n_________, именуемый(ая) в дальнейшем «Заказчик», с одной стороны, и _________, именуемый(ая) в дальнейшем «Исполнитель», с другой стороны, заключили настоящий договор о нижеследующем:\n\n1. ПРЕДМЕТ ДОГОВОРА\n1.1. Исполнитель обязуется оказать Заказчику услуги по разработке _________, а Заказчик обязуется принять и оплатить эти услуги.\n\n2. СТОИМОСТЬ И ПОРЯДОК РАСЧЕТОВ\n2.1. Стоимость услуг составляет _________ рублей.\n2.2. Оплата производится в следующем порядке: _________\n\n3. СРОКИ\n3.1. Начало работ: «___» _________ 20__ г.\n3.2. Окончание работ: «___» _________ 20__ г.\n\n4. ОТВЕТСТВЕННОСТЬ СТОРОН\n4.1. Стороны несут ответственность в соответствии с действующим законодательством.\n\n5. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ\n5.1. Договор вступает в силу с момента подписания.\n\nПодписи сторон:\nЗаказчик: _________ / _________\nИсполнитель: _________ / _________`,
  
  'Акт выполненных работ': `АКТ ВЫПОПЛЕННЫХ РАБОТ №___\n\nк договору №___ от «___» _________ 20__ г.\n\nг. _________ «___» _________ 20__ г.\n\nМы, нижеподписавшиеся, Заказчик _________ и Исполнитель _________, составили настоящий акт о том, что:\n\n1. Исполнитель выполнил следующие работы:\n   - _________\n   - _________\n\n2. Работы выполнены в полном объеме, в срок и с надлежащим качеством.\n\n3. Стоимость выполненных работ составляет _________ рублей.\n\n4. Заказчик претензий по объему, качеству и срокам выполнения работ не имеет.\n\nПодписи сторон:\nЗаказчик: _________ / _________\nИсполнитель: _________ / _________`,
  
  'NDA (Соглашение о неразглашении)': `СОГЛАШЕНИЕ О НЕРАЗГЛАШЕНИИ КОНФИДЕНЦИАЛЬНОЙ ИНФОРМАЦИИ\n\nг. _________ «___» _________ 20__ г.\n\n_________ и _________, именуемые в дальнейшем «Стороны», заключили настоящее соглашение:\n\n1. ПРЕДМЕТ СОГЛАШЕНИЯ\n1.1. Стороны обязуются не разглашать конфиденциальную информацию, полученную в ходе сотрудничества.\n\n2. КОНФИДЕНЦИАЛЬНАЯ ИНФОРМАЦИЯ\n2.1. К конфиденциальной информации относятся: технические решения, исходный код, бизнес-процессы, финансовые данные, клиентская база.\n\n3. ОБЯЗАТЕЛЬСТВА СТОРОН\n3.1. Не передавать информацию третьим лицам без письменного согласия.\n3.2. Использовать информацию только для целей сотрудничества.\n3.3. Принять меры для защиты информации.\n\n4. СРОК ДЕЙСТВИЯ\n4.1. Соглашение действует в течение _________ лет с момента подписания.\n\n5. ОТВЕТСТВЕННОСТЬ\n5.1. За нарушение условий соглашения виновная сторона уплачивает штраф в размере _________ рублей.\n\nПодписи сторон:\nСторона 1: _________ / _________\nСторона 2: _________ / _________`
};

function renderLawyer(){
  let h = `<div class="row spread"><h2>⚖️ Юрист</h2></div>`;
  
  // Шаблоны
  h += `<div class="card"><b> Шаблоны документов</b>`;
  Object.keys(CONTRACT_TEMPLATES).forEach(name => {
    h += `<button class="btn sec" style="width:100%;margin-top:5px" onclick="useContract('${name.replace(/'/g,"\\'")}')">${name}</button>`;
  });
  h += `</div>`;
  
  // Мои документы
  h += `<div class="card"><b>📁 Мои документы</b>
    <button class="btn sec" style="margin-top:5px" onclick="addContract()">+ Создать</button>`;
  if(!db.contracts.length) h += `<div class="mut" style="margin-top:10px">Нет документов</div>`;
  db.contracts.forEach((c,i) => {
    h += `<div class="note" style="margin-top:8px">
      <div class="row spread"><b>${esc(c.title)}</b>
        <span class="chip on">${new Date(c.date).toLocaleDateString('ru-RU')}</span>
      </div>
      <button class="btn sec" style="margin-top:5px;padding:4px 8px" onclick="viewContract(${i})">Открыть</button>
      <button class="btn sec" style="margin-top:5px;padding:4px 8px" onclick="delContract(${i})">Удалить</button>
    </div>`;
  });
  h += `</div>`;
  return h;
}

function useContract(name){
  const content = CONTRACT_TEMPLATES[name];
  const title = prompt('Название документа:', name);
  if(!title) return;
  db.contracts.push({title, content, date: Date.now()});
  save(); render();
  alert('Документ создан! Откройте его в разделе "Мои документы"');
}

function addContract(){
  const title = prompt('Название:');
  if(!title) return;
  const content = prompt('Текст документа:') || '';
  db.contracts.push({title, content, date: Date.now()});
  save(); render();
}

function viewContract(i){
  const c = db.contracts[i];
  alert(`${c.title}\n\n${c.content}`);
}

function delContract(i){
  if(confirm('Удалить документ?')){ db.contracts.splice(i,1); save(); render(); }
}

// ===== ПЛАН =====
function renderPlan(){
  let h = `<div class="row spread"><h2>📅 План</h2><button class="btn" onclick="addTask()">+ Задача</button></div>`;
  
  // Статистика
  const total = db.tasks.length;
  const done = db.tasks.filter(t => t.status === 'done').length;
  const progress = total ? Math.round(done/total*100) : 0;
  h += `<div class="card ai"><b>📊 Прогресс</b>
    <div style="margin-top:10px">
      <div class="row spread"><span class="mut">Выполнено:</span><b>${done}/${total} (${progress}%)</b></div>
      <div style="background:var(--bg2);height:8px;border-radius:4px;margin-top:5px;overflow:hidden">
        <div style="background:var(--accent);height:100%;width:${progress}%"></div>
      </div>
    </div>
  </div>`;
  
  // Kanban
  const columns = [
    {id:'todo', title:'📋 К выполнению', color:'var(--mut)'},
    {id:'progress', title:' В работе', color:'var(--accent)'},
    {id:'done', title:'✓ Готово', color:'var(--ok)'}
  ];
  
  columns.forEach(col => {
    const tasks = db.tasks.filter(t => t.status === col.id);
    h += `<div class="card"><b style="color:${col.color}">${col.title} (${tasks.length})</b>`;
    if(!tasks.length) h += `<div class="mut" style="margin-top:5px">Пусто</div>`;
    tasks.forEach(t => {
      h += `<div class="note" style="margin-top:5px">
        <div class="row spread"><b>${esc(t.title)}</b>
          ${t.deadline?`<span class="chip ${new Date(t.deadline)<Date.now()?'off':'on'}">${new Date(t.deadline).toLocaleDateString('ru-RU',{day:'2-digit',month:'2-digit'})}</span>`:''}
        </div>
        ${t.desc?`<div class="mut">${esc(t.desc).substring(0,80)}...</div>`:''}
        <div style="margin-top:5px">
          ${col.id!=='todo'?`<button class="btn sec" style="padding:3px 6px" onclick="moveTask(${db.tasks.indexOf(t)},'${col.id==='done'?'progress':'todo'}')">←</button>`:''}
          ${col.id!=='done'?`<button class="btn sec" style="padding:3px 6px" onclick="moveTask(${db.tasks.indexOf(t)},'${col.id==='todo'?'progress':'done'}')">→</button>`:''}
          <button class="btn sec" style="padding:3px 6px" onclick="delTask(${db.tasks.indexOf(t)})">✕</button>
        </div>
      </div>`;
    });
    h += `</div>`;
  });
  return h;
}

function addTask(){
  const title = prompt('Задача:');
  if(!title) return;
  const desc = prompt('Описание:') || '';
  const deadline = prompt('Дедлайн (ГГГГ-ММ-ДД):') || '';
  db.tasks.push({title, desc, deadline, status:'todo'});
  save(); render();
}

function moveTask(i, status){
  db.tasks[i].status = status;
  save(); render();
}

function delTask(i){
  if(confirm('Удалить задачу?')){ db.tasks.splice(i,1); save(); render(); }
}

// ===== ПОРТФОЛИО =====
function renderPortfolio(){
  let h = `<div class="row spread"><h2>💼 Портфолио</h2><button class="btn" onclick="addPortfolio()">+ Проект</button></div>`;
  
  if(!db.portfolio.length) h += `<div class="card"><div class="mut">Добавьте проекты для портфолио</div></div>`;
  db.portfolio.forEach((p,i) => {
    h += `<div class="card">
      <div class="row spread"><b>${esc(p.title)}</b>
        <span class="chip on">${esc(p.tech||'')}</span>
      </div>
      <div class="mut" style="margin-top:5px">${esc(p.desc||'')}</div>
      ${p.link?`<a href="${esc(p.link)}" target="_blank" class="mut" style="margin-top:5px;display:block">🔗 ${esc(p.link)}</a>`:''}
      <button class="btn sec" style="margin-top:5px;padding:4px 8px" onclick="delPortfolio(${i})">Удалить</button>
    </div>`;
  });
  return h;
}

function addPortfolio(){
  const title = prompt('Название проекта:');
  if(!title) return;
  const tech = prompt('Технологии:') || '';
  const desc = prompt('Описание:') || '';
  const link = prompt('Ссылка:') || '';
  db.portfolio.push({title, tech, desc, link});
  save(); render();
}

function delPortfolio(i){
  if(confirm('Удалить проект?')){ db.portfolio.splice(i,1); save(); render(); }
}

// ===== ЗАМЕТКИ =====
function renderNotes(){
  let h = `<div class="row spread"><h2>📝 Заметки</h2><button class="btn" onclick="addNote()">+ Заметка</button></div>`;
  
  if(!db.notes.length) h += `<div class="card"><div class="mut">Нет заметок</div></div>`;
  [...db.notes].reverse().forEach((n,i) => {
    const realIdx = db.notes.length - 1 - i;
    h += `<div class="card">
      <div class="row spread"><b>${esc(n.title)}</b>
        <span class="chip on">${new Date(n.date).toLocaleDateString('ru-RU')}</span>
      </div>
      <div class="mut" style="margin-top:5px;white-space:pre-wrap">${esc(n.content)}</div>
      <button class="btn sec" style="margin-top:5px;padding:4px 8px" onclick="delNote(${realIdx})">Удалить</button>
    </div>`;
  });
  return h;
}

function addNote(){
  const title = prompt('Заголовок:');
  if(!title) return;
  const content = prompt('Текст заметки:') || '';
  db.notes.push({title, content, date: Date.now()});
  save(); render();
}

function delNote(i){
  if(confirm('Удалить заметку?')){ db.notes.splice(i,1); save(); render(); }
}

// ===== АНАЛИТИКА =====
function renderAnalytics(){
  let h = `<div class="row spread"><h2>📊 Аналитика</h2></div>`;
  
  // Доходы по месяцам
  const months = {};
  db.projects.filter(p => p.stage==='Оплачен').forEach(p => {
    const m = new Date(p.date||Date.now()).toLocaleString('ru-RU',{month:'long',year:'numeric'});
    months[m] = (months[m]||0) + (p.budget||0);
  });
  
  h += `<div class="card"><b>💰 Доходы по месяцам</b>`;
  if(!Object.keys(months).length) h += `<div class="mut" style="margin-top:10px">Нет оплаченных проектов</div>`;
  Object.entries(months).forEach(([m, sum]) => {
    h += `<div class="row spread" style="margin-top:5px"><span>${m}</span><b>${sum.toLocaleString()}₽</b></div>`;
  });
  h += `</div>`;
  
  // Статистика
  const totalClients = db.clients.length;
  const totalProjects = db.projects.length;
  const totalRevenue = db.projects.filter(p=>p.stage==='Оплачен').reduce((s,p)=>s+(p.budget||0),0);
  const avgCheck = totalProjects ? Math.round(totalRevenue/totalProjects) : 0;
  
  h += `<div class="card"><b>📈 Общая статистика</b>
    <div class="row spread" style="margin-top:10px"><span class="mut">Клиентов:</span><b>${totalClients}</b></div>
    <div class="row spread" style="margin-top:5px"><span class="mut">Проектов:</span><b>${totalProjects}</b></div>
    <div class="row spread" style="margin-top:5px"><span class="mut">Общий доход:</span><b>${totalRevenue.toLocaleString()}₽</b></div>
    <div class="row spread" style="margin-top:5px"><span class="mut">Средний чек:</span><b>${avgCheck.toLocaleString()}₽</b></div>
  </div>`;
  
  // Время
  const totalTime = db.timeEntries.reduce((s,e)=>s+(e.duration||0),0);
  const totalHours = Math.floor(totalTime/3600);
  h += `<div class="card"><b>⏱ Отработано времени</b>
    <div style="font-size:2em;color:var(--accent);margin-top:10px">${totalHours} часов</div>
  </div>`;
  
  return h;
}

// ===== ИНТЕГРАЦИЯ С НАВИГАЦИЕЙ =====
const OLD_GO = go;
go = function(view){
  if(['price','time','growth','lawyer','plan','portfolio','notes','analytics'].includes(view)){
    const renderers = {
      price: renderPrice,
      time: renderTime,
      growth: renderGrowth,
      lawyer: renderLawyer,
      plan: renderPlan,
      portfolio: renderPortfolio,
      notes: renderNotes,
      analytics: renderAnalytics
    };
    document.getElementById('app').innerHTML = renderers[view]();
    document.getElementById('nav').innerHTML = renderNav(view);
    return;
  }
  OLD_GO(view);
};

// Обновление навигации
const OLD_RENDER_NAV = renderNav;
renderNav = function(active){
  const items = [
    {id:'home', icon:'🏠', label:'Главная'},
    {id:'clients', icon:'👥', label:'Клиенты'},
    {id:'projects', icon:'📁', label:'Проекты'},
    {id:'finances', icon:'💰', label:'Финансы'},
    {id:'taxes', icon:'🧾', label:'Налоги'},
    {id:'price', icon:'💵', label:'Прайс'},
    {id:'time', icon:'⏱', label:'Время'},
    {id:'plan', icon:'📅', label:'План'},
    {id:'growth', icon:'🎯', label:'Рост'},
    {id:'lawyer', icon:'⚖', label:'Юрист'},
    {id:'portfolio', icon:'💼', label:'Портфолио'},
    {id:'notes', icon:'📝', label:'Заметки'},
    {id:'analytics', icon:'📊', label:'Аналитика'},
    {id:'settings', icon:'⚙', label:'Настройки'}
  ];
  
  let h = '<div class="nav">';
  items.forEach(item => {
    const isActive = item.id === active;
    h += `<button class="nav-btn ${isActive?'active':''}" onclick="go('${item.id}')">${item.icon}<br><small>${item.label}</small></button>`;
  });
  h += '</div>';
  return h;
};

console.log('✅ SoloDev Patch v0.9 загружен! Все функции активны.');
