// === УМНЫЙ ГЕНЕРАТОР ДОКУМЕНТОВ (МОДАЛЬНАЯ ВЕРСИЯ) ===
(function() {
    'use strict';

    const pricingEngine = {
        services: {
            landing: { base: 30000, name: "Лендинг", hours: 40 },
            multisite: { base: 80000, name: "Многостраничный сайт", hours: 120 },
            shop: { base: 150000, name: "Интернет-магазин", hours: 200 },
            bot: { base: 50000, name: "Telegram-бот", hours: 60 },
            audit: { base: 15000, name: "Аудит сайта", hours: 10 }
        },
        complexity: { simple: 1, medium: 1.4, hard: 2 },
        urgency: { normal: 1, fast: 1.5, urgent: 2 }
    };

    const templates = {
        contract: {
            name: "📝 Договор авторского заказа",
            hasCalc: true,
            fields: [
                { id: "contractor", label: "Исполнитель", placeholder: "Иванов Иван Иванович" },
                { id: "client", label: "Заказчик", placeholder: "ООО 'Ромашка'" },
                { id: "service", label: "Описание работ", placeholder: "Разработка лендинга по ТЗ" },
                { id: "price", label: "Стоимость (₽)", placeholder: "50000" },
                { id: "deadline", label: "Срок (дней)", placeholder: "14" },
                { id: "prepayment", label: "Предоплата (%)", type: "select", options: ["30", "50", "70", "100"] }
            ],
            template: `ДОГОВОР АВТОРСКОГО ЗАКАЗА № {{doc_number}}\n\nг. Москва, «{{date}}»\n\n{{contractor}} (Исполнитель) и {{client}} (Заказчик) заключили договор:\n\n1. Исполнитель создает: {{service}}.\n2. Стоимость: {{price}} рублей. Предоплата: {{prepayment}}%.\n3. Срок: {{deadline}} рабочих дней с момента предоплаты.\n4. Исключительные права переходят Заказчику после полной оплаты.\n5. Споры решаются путем переговоров, затем в суде по месту нахождения Исполнителя.\n\nИсполнитель: _________________   Заказчик: _________________`
        },
        kp: {
            name: "💼 Коммерческое предложение",
            hasCalc: true,
            fields: [
                { id: "client_name", label: "Клиент", placeholder: "Александр, ООО 'Вектор'" },
                { id: "my_name", label: "Вы", placeholder: "Дмитрий, SoloDev" },
                { id: "problem", label: "Проблема клиента", placeholder: "низкая конверсия сайта" },
                { id: "solution", label: "Ваше решение", placeholder: "Адаптивный лендинг с CRM" },
                { id: "price_kp", label: "Стоимость", placeholder: "от 80 000 ₽" },
                { id: "deadline_kp", label: "Сроки", placeholder: "2-3 недели" }
            ],
            template: `Коммерческое предложение\n\nУважаемый(ая) {{client_name}}!\n\nМеня зовут {{my_name}}. Я вижу, что {{problem}}. \n\nЯ предлагаю: ✅ {{solution}}\n\nВы получите:\n• Профессиональный результат\n• Прозрачные отчеты\n• Гарантию и поддержку 30 дней\n\nСтоимость: {{price_kp}}\nСроки: {{deadline_kp}}\n\nГотов обсудить детали на бесплатной 15-минутной встрече.\n\nС уважением,\n{{my_name}}`
        },
        nda: {
            name: "🤫 NDA (О неразглашении)",
            hasCalc: false,
            fields: [
                { id: "disclosing", label: "Раскрывающая сторона", placeholder: "ООО 'Технологии'" },
                { id: "receiving", label: "Получающая сторона", placeholder: "Иванов И.И." },
                { id: "term", label: "Срок (лет)", type: "select", options: ["1", "2", "3", "5"] }
            ],
            template: `СОГЛАШЕНИЕ О КОНФИДЕНЦИАЛЬНОСТИ (NDA)\n\nг. Москва, «{{date}}»\n\n{{disclosing}} и {{receiving}} договорились:\n\n1. Стороны обсуждают совместный проект.\n2. Получающая сторона обязуется не разглашать технические и финансовые данные.\n3. Срок действия: {{term}} лет.\n4. Штраф за разглашение: 500 000 рублей.\n\nПодписи: _________________`
        }
    };

    let currentTemplate = null;

    window.openDocGenerator = function() {
        const mc = document.getElementById('modalContent');
        if (!mc) return;

        let opts = '';
        for (let k in templates) opts += `<option value="${k}">${templates[k].name}</option>`;

        mc.innerHTML = `
            <div style="max-height:85vh;display:flex;flex-direction:column;position:relative">
                <button onclick="closeModal()" style="position:absolute;top:10px;right:15px;background:none;border:none;color:#ff6b6b;font-size:28px;cursor:pointer;z-index:10">✕</button>
                <h3 style="margin:0 0 15px 0;padding-right:30px">📄 Генератор документов</h3>
                
                <div id="docFormStep" style="flex:1;overflow-y:auto;padding-right:5px">
                    <label style="color:#ffd700;font-size:14px;font-weight:bold;display:block;margin-bottom:8px">Шаблон:</label>
                    <select id="docTemplateSelect" onchange="renderDocFields()" style="width:100%;padding:12px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-size:14px;margin-bottom:20px">${opts}</select>
                    
                    <div id="smartCalc" style="background:#0f1419;border:1px solid #ffd700;border-radius:8px;padding:15px;margin-bottom:20px;display:none">
                        <h4 style="color:#ffd700;margin:0 0 10px 0;font-size:14px">🧮 Умный калькулятор</h4>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                            <select id="calc_s" onchange="calcPrice()" style="padding:8px;background:#1f2530;border:1px solid #2a303c;border-radius:4px;color:#fff;font-size:13px">
                                <option value="">Тип проекта</option>
                                ${Object.keys(pricingEngine.services).map(k => `<option value="${k}">${pricingEngine.services[k].name}</option>`).join('')}
                            </select>
                            <select id="calc_c" onchange="calcPrice()" style="padding:8px;background:#1f2530;border:1px solid #2a303c;border-radius:4px;color:#fff;font-size:13px">
                                <option value="simple">Простой</option><option value="medium" selected>Средний</option><option value="hard">Сложный</option>
                            </select>
                            <select id="calc_u" onchange="calcPrice()" style="padding:8px;background:#1f2530;border:1px solid #2a303c;border-radius:4px;color:#fff;font-size:13px;grid-column:span 2">
                                <option value="normal" selected>Стандартно</option><option value="fast">Быстро (+50%)</option><option value="urgent">Срочно (+100%)</option>
                            </select>
                        </div>
                        <div id="calcRes" style="margin-top:10px;padding:10px;background:#1f2530;border-radius:4px;display:none">
                            <div style="color:#3ecf8e;font-weight:bold">💰 <span id="cPrice">0</span> ₽ | ⏱️ <span id="cHours">0</span> ч.</div>
                            <button onclick="applyCalc()" style="margin-top:8px;width:100%;padding:8px;background:#3ecf8e;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px">✅ Применить к документу</button>
                        </div>
                    </div>

                    <div id="docFields" style="display:flex;flex-direction:column;gap:12px"></div>
                    <button onclick="genDoc()" style="width:100%;padding:14px;margin-top:20px;background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer">⚡ Сгенерировать</button>
                </div>

                <div id="docResStep" style="flex:1;overflow-y:auto;display:none">
                    <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap">
                        <button onclick="backToForm()" style="flex:1;padding:10px;background:#6c757d;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">← Назад</button>
                        <button onclick="copyDoc()" style="flex:1;padding:10px;background:#3ecf8e;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">📋 Копировать</button>
                        <button onclick="downloadDoc()" style="flex:1;padding:10px;background:#6c8cff;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">💾 Скачать</button>
                    </div>
                    <textarea id="docText" readonly style="width:100%;height:55vh;background:#0f1419;border:1px solid #6c8cff;border-radius:8px;color:#e8ecf3;padding:15px;font-family:monospace;font-size:13px;line-height:1.5;resize:none"></textarea>
                </div>
            </div>`;
        
        document.getElementById('modal').style.display = 'flex';
        renderDocFields();
    };

    window.renderDocFields = function() {
        const key = document.getElementById('docTemplateSelect').value;
        currentTemplate = key;
        
        // Показываем калькулятор только для Договора и КП
        document.getElementById('smartCalc').style.display = templates[key].hasCalc ? 'block' : 'none';
        document.getElementById('calcRes').style.display = 'none';
        document.getElementById('calc_s').value = '';

        const container = document.getElementById('docFields');
        let html = '';
        templates[key].fields.forEach(f => {
            const val = localStorage.getItem('doc_'+f.id) || '';
            if (f.type === 'select') {
                html += `<div><label style="color:#a0a8b8;font-size:12px;display:block;margin-bottom:4px">${f.label}</label>
                <select id="f_${f.id}" onchange="localStorage.setItem('doc_${f.id}',this.value)" style="width:100%;padding:12px;background:#1f2530;border:1px solid #2a303c;border-radius:6px;color:#fff;font-size:14px">
                ${f.options.map(o => `<option value="${o}" ${val===o?'selected':''}>${o}</option>`).join('')}</select></div>`;
            } else {
                html += `<div><label style="color:#a0a8b8;font-size:12px;display:block;margin-bottom:4px">${f.label}</label>
                <input type="text" id="f_${f.id}" value="${val}" placeholder="${f.placeholder}" style="width:100%;padding:12px;background:#1f2530;border:1px solid #2a303c;border-radius:6px;color:#fff;font-size:14px" oninput="localStorage.setItem('doc_${f.id}',this.value)"></div>`;
            }
        });
        container.innerHTML = html;
    };

    window.calcPrice = function() {
        const s = document.getElementById('calc_s').value;
        if (!s) { document.getElementById('calcRes').style.display = 'none'; return; }
        const base = pricingEngine.services[s].base;
        const hrs = pricingEngine.services[s].hours;
        const mult = pricingEngine.complexity[document.getElementById('calc_c').value] * pricingEngine.urgency[document.getElementById('calc_u').value];
        
        document.getElementById('cPrice').textContent = Math.round(base * mult).toLocaleString('ru-RU');
        document.getElementById('cHours').textContent = Math.round(hrs * mult);
        document.getElementById('calcRes').style.display = 'block';
    };

    window.applyCalc = function() {
        const p = document.getElementById('cPrice').textContent.replace(/\s/g, '');
        const h = document.getElementById('cHours').textContent;
        
        if (currentTemplate === 'contract') {
            const pf = document.getElementById('f_price'); if(pf) pf.value = p;
            const df = document.getElementById('f_deadline'); if(df) df.value = Math.ceil(h / 8);
        } else if (currentTemplate === 'kp') {
            const pf = document.getElementById('f_price_kp'); if(pf) pf.value = 'от ' + p + ' ₽';
            const df = document.getElementById('f_deadline_kp'); if(df) df.value = Math.ceil(h / 40) + '-' + (Math.ceil(h / 40) + 2) + ' недели';
        }
        const btn = event.target;
        btn.textContent = '✅ Применено!';
        setTimeout(() => { btn.textContent = '✅ Применить к документу'; }, 1500);
    };

    window.genDoc = function() {
        let text = templates[currentTemplate].template;
        const today = new Date();
        const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
        text = text.replace(/{{date}}/g, `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`);
        text = text.replace(/{{doc_number}}/g, Math.floor(Math.random()*900+100) + "/2024");
        
        templates[currentTemplate].fields.forEach(f => {
            const val = document.getElementById('f_' + f.id)?.value.trim() || "[НЕ ЗАПОЛНЕНО]";
            text = text.replace(new RegExp(`{{${f.id}}}`, 'g'), val);
        });
        
        document.getElementById('docText').value = text;
        document.getElementById('docFormStep').style.display = 'none';
        document.getElementById('docResStep').style.display = 'block';
    };

    window.backToForm = function() {
        document.getElementById('docResStep').style.display = 'none';
        document.getElementById('docFormStep').style.display = 'block';
    };

    window.copyDoc = function() {
        const ta = document.getElementById('docText');
        ta.select();
        document.execCommand('copy');
        const btn = event.target;
        const orig = btn.innerHTML;
        btn.innerHTML = '✅ Скопировано!';
        setTimeout(() => { btn.innerHTML = orig; }, 1500);
    };

    window.downloadDoc = function() {
        const text = document.getElementById('docText').value;
        const fileName = templates[currentTemplate].name.replace(/[^a-zа-яё0-9]/gi, '_') + '.txt';
        // ИСПРАВЛЕНИЕ КОДИРОВКИ: BOM-маркер для Windows/Android
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
})();
