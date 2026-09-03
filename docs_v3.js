// === ГЕНЕРАТОР ДОКУМЕНТОВ v3.0 (ПОЛНАЯ ПЕРЕЗАПИСЬ) ===
// Модульная архитектура, не конфликтует с другими кнопками

(function() {
    'use strict';
    
    // База шаблонов
    const templates = {
        contract: {
            name: "Договор авторского заказа",
            icon: "📝",
            hasCalculator: true,
            fields: [
                { id: "contractor", label: "Исполнитель", placeholder: "Иванов Иван Иванович" },
                { id: "client", label: "Заказчик", placeholder: "ООО Ромашка" },
                { id: "service", label: "Описание работ", placeholder: "Разработка лендинга" },
                { id: "price", label: "Стоимость (руб)", placeholder: "50000" },
                { id: "deadline", label: "Срок (дней)", placeholder: "14" },
                { id: "prepayment", label: "Предоплата (%)", type: "select", options: ["30", "50", "70", "100"] }
            ],
            template: `ДОГОВОР АВТОРСКОГО ЗАКАЗА

г. Москва, {{date}}

{{contractor}} (Исполнитель) и {{client}} (Заказчик) заключили договор:

1. ПРЕДМЕТ
Исполнитель создаёт: {{service}}

2. СТОИМОСТЬ И ОПЛАТА
Стоимость: {{price}} рублей
Предоплата: {{prepayment}}%
Окончательный расчёт: в течение 3 дней после приёмки

3. СРОКИ
Срок выполнения: {{deadline}} рабочих дней с момента предоплаты

4. ПРАВА
Исключительные права переходят Заказчику после полной оплаты

5. ПОРЯДОК ПРИЁМКИ
Заказчик проверяет работу в течение 5 дней. Если нет замечаний - работа принята.

Подпись Исполнителя: _________________
Подпись Заказчика: _________________`
        },
        
        kp: {
            name: "Коммерческое предложение",
            icon: "💼",
            hasCalculator: true,
            fields: [
                { id: "client_name", label: "Клиент", placeholder: "Александр, ООО Вектор" },
                { id: "my_name", label: "Вы", placeholder: "Дмитрий, SoloDev" },
                { id: "problem", label: "Проблема клиента", placeholder: "низкая конверсия сайта" },
                { id: "solution", label: "Ваше решение", placeholder: "Адаптивный лендинг с CRM" },
                { id: "price_kp", label: "Стоимость", placeholder: "от 80000 руб" },
                { id: "deadline_kp", label: "Сроки", placeholder: "2-3 недели" }
            ],
            template: `Коммерческое предложение

Уважаемый(ая) {{client_name}}!

Меня зовут {{my_name}}.

Я вижу, что {{problem}}. Это приводит к потере клиентов и прибыли.

Я предлагаю: {{solution}}

Вы получите:
• Профессиональный результат
• Прозрачные отчёты о прогрессе
• Гарантию и поддержку 30 дней
• Полную юридическую защиту

Стоимость: {{price_kp}}
Сроки: {{deadline_kp}}

Готов обсудить детали на бесплатной 15-минутной встрече.

С уважением,
{{my_name}}`
        },
        
        nda: {
            name: "NDA (О неразглашении)",
            icon: "🤫",
            hasCalculator: false,
            fields: [
                { id: "disclosing", label: "Раскрывающая сторона", placeholder: "ООО Технологии" },
                { id: "receiving", label: "Получающая сторона", placeholder: "Иванов И.И." },
                { id: "term", label: "Срок (лет)", type: "select", options: ["1", "2", "3", "5"] }
            ],
            template: `СОГЛАШЕНИЕ О КОНФИДЕНЦИАЛЬНОСТИ (NDA)

г. Москва, {{date}}

{{disclosing}} и {{receiving}} договорились:

1. Стороны обсуждают совместный проект
2. Получающая сторона не разглашает технические и финансовые данные
3. Срок действия: {{term}} лет
4. Штраф за разглашение: 500000 рублей

Подписи: _________________`
        }
    };
    
    // Калькулятор цен
    const pricingEngine = {
        services: {
            landing: { base: 30000, name: "Лендинг", hours: 40 },
            multisite: { base: 80000, name: "Многостраничный сайт", hours: 120 },
            shop: { base: 150000, name: "Интернет-магазин", hours: 200 },
            bot: { base: 50000, name: "Telegram-бот", hours: 60 }
        },
        complexity: { simple: 1, medium: 1.4, hard: 2 },
        urgency: { normal: 1, fast: 1.5, urgent: 2 }
    };
    
    let currentTemplate = null;
    let currentStep = 'select'; // select, form, result
    
    // Главная функция открытия
    window.openDocGenerator = function() {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');
        
        if (!modal || !modalContent) {
            console.error('Модальное окно не найдено!');
            return;
        }
        
        currentStep = 'select';
        currentTemplate = null;
        
        renderSelectTemplate();
        
        modal.style.display = 'flex';
    };
    
    // Шаг 1: Выбор шаблона
    function renderSelectTemplate() {
        const modalContent = document.getElementById('modalContent');
        
        let html = `
            <div style="max-height:85vh;display:flex;flex-direction:column">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                    <h3 style="margin:0">📄 Генератор документов</h3>
                    <button onclick="closeModal()" style="background:none;border:none;color:#ff6b6b;font-size:24px;cursor:pointer">✕</button>
                </div>
                
                <p style="color:#a0a8b8;font-size:14px;margin-bottom:20px">Выберите тип документа:</p>
                
                <div style="display:flex;flex-direction:column;gap:12px">
        `;
        
        for (let key in templates) {
            const t = templates[key];
            html += `
                <button onclick="selectDocTemplate('${key}')" style="padding:20px;background:#1f2530;border:2px solid #2a303c;border-radius:8px;color:#fff;font-size:16px;cursor:pointer;text-align:left;display:flex;align-items:center;gap:15px" onmouseover="this.style.borderColor='#6c8cff'" onmouseout="this.style.borderColor='#2a303c'">
                    <span style="font-size:32px">${t.icon}</span>
                    <div style="flex:1">
                        <div style="font-weight:bold;margin-bottom:4px">${t.name}</div>
                        <div style="font-size:12px;color:#a0a8b8">${t.hasCalculator ? 'С калькулятором стоимости' : 'Стандартный шаблон'}</div>
                    </div>
                    <span style="color:#6c8cff;font-size:20px">→</span>
                </button>
            `;
        }
        
        html += `
                </div>
            </div>
        `;
        
        modalContent.innerHTML = html;
    }
    
    // Выбор шаблона
    window.selectDocTemplate = function(key) {
        currentTemplate = key;
        currentStep = 'form';
        renderForm();
    };
    
    // Шаг 2: Форма заполнения
    function renderForm() {
        const modalContent = document.getElementById('modalContent');
        const t = templates[currentTemplate];
        
        let html = `
            <div style="max-height:85vh;display:flex;flex-direction:column">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                    <h3 style="margin:0">${t.icon} ${t.name}</h3>
                    <button onclick="closeModal()" style="background:none;border:none;color:#ff6b6b;font-size:24px;cursor:pointer">✕</button>
                </div>
                
                <button onclick="backToSelect()" style="margin-bottom:15px;padding:8px 16px;background:#6c757d;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">← Назад к выбору</button>
        `;
        
        // Калькулятор (если есть)
        if (t.hasCalculator) {
            html += `
                <div style="background:#0f1419;border:2px solid #ffd700;border-radius:8px;padding:15px;margin-bottom:20px">
                    <h4 style="color:#ffd700;margin:0 0 12px 0;font-size:14px">🧮 Умный калькулятор</h4>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
                        <select id="calc_service" onchange="calculateDocPrice()" style="padding:10px;background:#1f2530;border:1px solid #2a303c;border-radius:6px;color:#fff;font-size:13px">
                            <option value="">Тип проекта</option>
                            ${Object.keys(pricingEngine.services).map(k => `<option value="${k}">${pricingEngine.services[k].name}</option>`).join('')}
                        </select>
                        <select id="calc_complexity" onchange="calculateDocPrice()" style="padding:10px;background:#1f2530;border:1px solid #2a303c;border-radius:6px;color:#fff;font-size:13px">
                            <option value="simple">Простой</option>
                            <option value="medium" selected>Средний</option>
                            <option value="hard">Сложный</option>
                        </select>
                        <select id="calc_urgency" onchange="calculateDocPrice()" style="padding:10px;background:#1f2530;border:1px solid #2a303c;border-radius:6px;color:#fff;font-size:13px;grid-column:span 2">
                            <option value="normal" selected>Стандартно</option>
                            <option value="fast">Быстро (+50%)</option>
                            <option value="urgent">Срочно (+100%)</option>
                        </select>
                    </div>
                    <div id="calcResult" style="display:none;padding:10px;background:#1f2530;border-radius:6px;margin-bottom:10px">
                        <div style="color:#3ecf8e;font-weight:bold">💰 <span id="calcPrice">0</span> руб | ⏱️ <span id="calcHours">0</span> ч</div>
                        <button onclick="applyCalcToDoc()" style="margin-top:8px;width:100%;padding:8px;background:#3ecf8e;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">✅ Применить к документу</button>
                    </div>
                </div>
            `;
        }
        
        // Поля формы
        html += `<div style="display:flex;flex-direction:column;gap:12px">`;
        
        t.fields.forEach(f => {
            const savedValue = localStorage.getItem('doc_' + f.id) || '';
            
            if (f.type === 'select') {
                html += `
                    <div>
                        <label style="color:#a0a8b8;font-size:12px;display:block;margin-bottom:6px">${f.label}</label>
                        <select id="field_${f.id}" onchange="localStorage.setItem('doc_${f.id}', this.value)" style="width:100%;padding:12px;background:#1f2530;border:1px solid #2a303c;border-radius:6px;color:#fff;font-size:14px">
                            ${f.options.map(o => `<option value="${o}" ${savedValue === o ? 'selected' : ''}>${o}</option>`).join('')}
                        </select>
                    </div>
                `;
            } else {
                html += `
                    <div>
                        <label style="color:#a0a8b8;font-size:12px;display:block;margin-bottom:6px">${f.label}</label>
                        <input type="text" id="field_${f.id}" value="${savedValue}" placeholder="${f.placeholder}" style="width:100%;padding:12px;background:#1f2530;border:1px solid #2a303c;border-radius:6px;color:#fff;font-size:14px" oninput="localStorage.setItem('doc_${f.id}', this.value)">
                    </div>
                `;
            }
        });
        
        html += `</div>`;
        
        // Кнопка генерации
        html += `
                <button onclick="generateDoc()" style="width:100%;margin-top:20px;padding:14px;background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer">⚡ Сгенерировать документ</button>
            </div>
        `;
        
        modalContent.innerHTML = html;
    }
    
    // Назад к выбору
    window.backToSelect = function() {
        currentStep = 'select';
        currentTemplate = null;
        renderSelectTemplate();
    };
    
    // Калькулятор
    window.calculateDocPrice = function() {
        const service = document.getElementById('calc_service').value;
        if (!service) {
            document.getElementById('calcResult').style.display = 'none';
            return;
        }
        
        const base = pricingEngine.services[service].base;
        const hours = pricingEngine.services[service].hours;
        const complexity = document.getElementById('calc_complexity').value;
        const urgency = document.getElementById('calc_urgency').value;
        
        const mult = pricingEngine.complexity[complexity] * pricingEngine.urgency[urgency];
        const price = Math.round(base * mult);
        const finalHours = Math.round(hours * mult);
        
        document.getElementById('calcPrice').textContent = price.toLocaleString('ru-RU');
        document.getElementById('calcHours').textContent = finalHours;
        document.getElementById('calcResult').style.display = 'block';
    };
    
    // Применить калькулятор к документу
    window.applyCalcToDoc = function() {
        const price = document.getElementById('calcPrice').textContent.replace(/\s/g, '');
        const hours = document.getElementById('calcHours').textContent;
        
        if (currentTemplate === 'contract') {
            const priceField = document.getElementById('field_price');
            if (priceField) priceField.value = price;
            const deadlineField = document.getElementById('field_deadline');
            if (deadlineField) deadlineField.value = Math.ceil(hours / 8);
        } else if (currentTemplate === 'kp') {
            const priceField = document.getElementById('field_price_kp');
            if (priceField) priceField.value = 'от ' + price + ' руб';
            const deadlineField = document.getElementById('field_deadline_kp');
            if (deadlineField) deadlineField.value = Math.ceil(hours / 40) + '-' + (Math.ceil(hours / 40) + 2) + ' недели';
        }
        
        const btn = event.target;
        btn.textContent = '✅ Применено!';
        setTimeout(() => { btn.textContent = '✅ Применить к документу'; }, 1500);
    };
    
    // Генерация документа
    window.generateDoc = function() {
        const t = templates[currentTemplate];
        let text = t.template;
        
        // Дата
        const today = new Date();
        const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
        text = text.replace(/{{date}}/g, `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`);
        
        // Поля формы
        t.fields.forEach(f => {
            const val = document.getElementById('field_' + f.id)?.value.trim() || '[НЕ ЗАПОЛНЕНО]';
            text = text.replace(new RegExp(`{{${f.id}}}`, 'g'), val);
        });
        
        // Показываем результат
        showDocResult(text);
    };
    
    // Шаг 3: Результат
    function showDocResult(text) {
        const modalContent = document.getElementById('modalContent');
        
        modalContent.innerHTML = `
            <div style="max-height:85vh;display:flex;flex-direction:column">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                    <h3 style="margin:0">✅ Документ готов</h3>
                    <button onclick="closeModal()" style="background:none;border:none;color:#ff6b6b;font-size:24px;cursor:pointer">✕</button>
                </div>
                
                <div style="display:flex;gap:10px;margin-bottom:15px;flex-wrap:wrap">
                    <button onclick="backToForm()" style="flex:1;padding:10px;background:#6c757d;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">← Редактировать</button>
                    <button onclick="copyDocText()" style="flex:1;padding:10px;background:#3ecf8e;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">📋 Копировать</button>
                    <button onclick="downloadDocText()" style="flex:1;padding:10px;background:#6c8cff;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">💾 Скачать</button>
                </div>
                
                <textarea id="docResultText" readonly style="flex:1;background:#0f1419;border:1px solid #6c8cff;border-radius:8px;color:#e8ecf3;padding:15px;font-family:monospace;font-size:13px;line-height:1.5;resize:none;min-height:400px">${text}</textarea>
            </div>
        `;
    }
    
    // Назад к форме
    window.backToForm = function() {
        currentStep = 'form';
        renderForm();
    };
    
    // Копировать
    window.copyDocText = function() {
        const textarea = document.getElementById('docResultText');
        textarea.select();
        document.execCommand('copy');
        
        const btn = event.target;
        const orig = btn.innerHTML;
        btn.innerHTML = '✅ Скопировано!';
        setTimeout(() => { btn.innerHTML = orig; }, 1500);
    };
    
    // Скачать
    window.downloadDocText = function() {
        const text = document.getElementById('docResultText').value;
        const fileName = templates[currentTemplate].name + '.txt';
        
        // BOM для корректной кодировки
        const blob = new Blob(['\uFEFF' + text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    console.log('✅ Генератор документов v3.0 загружен');
})();
