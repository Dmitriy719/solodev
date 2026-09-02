// === ГЕНЕРАТОР ДОКУМЕНТОВ SOLODEV ===
(function() {
    'use strict';

    const templates = {
        contract: {
            name: "📝 Договор авторского заказа",
            fields: [
                { id: "contractor", label: "Исполнитель (ФИО или ИП)", placeholder: "Иванов Иван Иванович" },
                { id: "client", label: "Заказчик (Название или ФИО)", placeholder: "ООО 'Ромашка' или Петр Петров" },
                { id: "service", label: "Описание услуги/работы", placeholder: "Разработка лендинга по предоставленному ТЗ" },
                { id: "price", label: "Стоимость работ (₽)", placeholder: "50000" },
                { id: "deadline", label: "Срок выполнения (дней)", placeholder: "14" },
                { id: "prepayment", label: "Предоплата (%)", placeholder: "50" }
            ],
            template: `ДОГОВОР АВТОРСКОГО ЗАКАЗА № {{doc_number}}

г. {{city}}                                                                                              «{{date}}»

{{contractor}}, именуемый(ая) в дальнейшем «Исполнитель», и
{{client}}, именуемый(ая) в дальнейшем «Заказчик», заключили настоящий Договор о нижеследующем:

1. ПРЕДМЕТ ДОГОВОРА
1.1. Исполнитель обязуется по заданию Заказчика создать произведение: {{service}}, а Заказчик обязуется принять и оплатить его.
1.2. Исключительное право на созданное произведение переходит к Заказчику в полном объеме с момента полной оплаты.

2. СТОИМОСТЬ И ПОРЯДОК РАСЧЕТОВ
2.1. Общая стоимость работ составляет {{price}} ({{price_words}}) рублей.
2.2. Заказчик выплачивает Исполнителю предоплату в размере {{prepayment}}% в течение 3 банковских дней с момента подписания Договора.
2.3. Окончательный расчет производится в течение 3 банковских дней после подписания Акта сдачи-приемки работ.

3. СРОКИ ВЫПОЛНЕНИЯ
3.1. Срок выполнения работ: {{deadline}} рабочих дней с момента получения предоплаты и всех необходимых материалов от Заказчика.

4. ПОРЯДОК СДАЧИ-ПРИЕМКИ
4.1. Исполнитель направляет результат Заказчику. У Заказчика есть 5 (пять) рабочих дней для направления мотивированных замечаний.
4.2. В случае отсутствия замечаний в указанный срок, работы считаются принятыми в полном объеме и подлежат оплате.

5. РЕКВИЗИТЫ И ПОДПИСИ СТОРОН
Исполнитель: {{contractor}}
Заказчик: {{client}}

Подпись Исполнителя: _________________      Подпись Заказчика: _________________`
        },
        nda: {
            name: "🤫 Соглашение о неразглашении (NDA)",
            fields: [
                { id: "disclosing", label: "Сторона, раскрывающая информацию", placeholder: "ООО 'Технологии'" },
                { id: "receiving", label: "Сторона, получающая информацию", placeholder: "Иванов И.И." },
                { id: "purpose", label: "Цель раскрытия информации", placeholder: "Оценка возможности сотрудничества по проекту X" },
                { id: "term", label: "Срок действия соглашения (лет)", placeholder: "3" }
            ],
            template: `СОГЛАШЕНИЕ О КОНФИДЕНЦИАЛЬНОСТИ (NDA)

г. {{city}}                                                                                              «{{date}}»

{{disclosing}}, именуемая в дальнейшем «Раскрывающая сторона», и
{{receiving}}, именуемая в дальнейшем «Получающая сторона», заключили настоящее Соглашение:

1. ПРЕДМЕТ СОГЛАШЕНИЯ
1.1. Стороны намереваются обсудить вопросы, связанные с: {{purpose}} (далее – «Цель»).
1.2. В ходе обсуждений Раскрывающая сторона может передать Получающей стороне конфиденциальную информацию (технические, финансовые, коммерческие данные).

2. ОБЯЗАТЕЛЬСТВА ПОЛУЧАЮЩЕЙ СТОРОНЫ
2.1. Получающая сторона обязуется:
   а) Использовать информацию исключительно для достижения Цели;
   б) Не раскрывать информацию третьим лицам без письменного согласия Раскрывающей стороны;
   в) Принять все разумные меры для защиты информации от несанкционированного доступа.

3. СРОК ДЕЙСТВИЯ
3.1. Настоящее Соглашение вступает в силу с даты подписания и действует в течение {{term}} лет.
3.2. Обязательства по конфиденциальности сохраняют силу в течение {{term}} лет после прекращения действия Соглашения.

4. ОТВЕТСТВЕННОСТЬ
4.1. В случае нарушения условий настоящего Соглашения, виновная сторона обязана возместить документально подтвержденные убытки.

Подпись Раскрывающей стороны: _________________
Подпись Получающей стороны: _________________`
        },
        kp: {
            name: "💼 Коммерческое предложение",
            fields: [
                { id: "client_name", label: "Имя клиента или название компании", placeholder: "Александр, ООО 'Вектор'" },
                { id: "my_name", label: "Ваше имя/название студии", placeholder: "Дмитрий, SoloDev" },
                { id: "problem", label: "Проблема клиента (боль)", placeholder: "низкая конверсия сайта, отсутствие мобильной версии" },
                { id: "solution", label: "Ваше решение", placeholder: "Разработка современного адаптивного лендинга с интеграцией CRM" },
                { id: "price_kp", label: "Стоимость решения", placeholder: "от 80 000 ₽" },
                { id: "contact", label: "Ваши контакты для связи", placeholder: "Telegram: @username, тел. +7..." }
            ],
            template: `Коммерческое предложение

Уважаемый(ая) {{client_name}}!

Меня зовут {{my_name}}. Я изучил вашу текущую ситуацию и заметил, что {{problem}}. Это может приводить к потере клиентов и снижению прибыли.

Я предлагаю комплексное решение:
✅ {{solution}}

Что вы получите:
• Профессиональный результат, соответствующий современным стандартам.
• Прозрачный процесс работы с еженедельными отчетами.
• Гарантию на выполненные работы и техническую поддержку.

Стоимость проекта: {{price_kp}}
Ориентировочные сроки: 2-4 недели (в зависимости от сложности).

Я готов провести бесплатную 15-минутную консультацию, чтобы обсудить детали и ответить на ваши вопросы.

С уважением,
{{my_name}}
Контакты: {{contact}}`
        }
    };

    window.openDocGenerator = function() {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');
        if (!modal || !modalContent) return;

        let optionsHtml = '';
        for (let key in templates) {
            optionsHtml += `<option value="${key}">${templates[key].name}</option>`;
        }

        modalContent.innerHTML = `
            <div style="max-height:85vh;display:flex;flex-direction:column">
                <h3 style="margin:0 0 15px 0">📄 Генератор документов</h3>
                
                <div id="docFormStep" style="flex:1;overflow-y:auto">
                    <label style="color:#ffd700;font-size:14px;font-weight:bold;display:block;margin-bottom:8px">Выберите шаблон:</label>
                    <select id="docTemplateSelect" onchange="renderDocFields()" style="width:100%;padding:12px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-size:14px;margin-bottom:20px">
                        ${optionsHtml}
                    </select>
                    
                    <div id="docFieldsContainer" style="display:flex;flex-direction:column;gap:15px"></div>
                    
                    <button onclick="generateDocument()" style="width:100%;padding:14px;margin-top:25px;background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer">⚡ Сгенерировать документ</button>
                </div>

                <div id="docResultStep" style="flex:1;overflow-y:auto;display:none">
                    <div style="display:flex;gap:10px;margin-bottom:15px">
                        <button onclick="showDocForm()" style="flex:1;padding:10px;background:#6c757d;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">← Назад к форме</button>
                        <button onclick="copyDocument()" style="flex:1;padding:10px;background:#3ecf8e;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">📋 Копировать</button>
                        <button onclick="downloadDocument()" style="flex:1;padding:10px;background:#6c8cff;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">💾 Скачать .txt</button>
                    </div>
                    <textarea id="docResultText" readonly style="width:100%;height:60vh;background:#0f1419;border:1px solid #6c8cff;border-radius:8px;color:#e8ecf3;padding:15px;font-family:monospace;font-size:13px;line-height:1.5;resize:none"></textarea>
                </div>
            </div>
        `;
        modal.style.display = 'flex';
        renderDocFields();
    };

    window.renderDocFields = function() {
        const key = document.getElementById('docTemplateSelect').value;
        const container = document.getElementById('docFieldsContainer');
        const fields = templates[key].fields;
        
        let html = '';
        fields.forEach(field => {
            const savedValue = localStorage.getItem('doc_field_' + field.id) || '';
            html += `
                <div>
                    <label style="color:#e8ecf3;font-size:13px;display:block;margin-bottom:6px">${field.label}</label>
                    <input type="text" id="field_${field.id}" value="${savedValue}" placeholder="${field.placeholder}" 
                        style="width:100%;padding:12px;background:#1f2530;border:1px solid #2a303c;border-radius:6px;color:#fff;font-size:14px"
                        oninput="localStorage.setItem('doc_field_${field.id}', this.value)">
                </div>
            `;
        });
        container.innerHTML = html;
    };

    window.showDocForm = function() {
        document.getElementById('docFormStep').style.display = 'block';
        document.getElementById('docResultStep').style.display = 'none';
    };

    window.generateDocument = function() {
        const key = document.getElementById('docTemplateSelect').value;
        let text = templates[key].template;
        const fields = templates[key].fields;
        
        // Общие переменные
        const today = new Date();
        const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
        text = text.replace(/{{date}}/g, `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()} г.`);
        text = text.replace(/{{city}}/g, "Москва"); // Можно сделать полем, но для простоты заглушка
        text = text.replace(/{{doc_number}}/g, Math.floor(Math.random() * 1000) + "/2024");

        // Переменные из формы
        fields.forEach(field => {
            const val = document.getElementById('field_' + field.id).value.trim() || "[НЕ ЗАПОЛНЕНО]";
            const regex = new RegExp(`{{${field.id}}}`, 'g');
            text = text.replace(regex, val);
        });

        // Спец. замена для цены прописью (упрощенная)
        if (key === 'contract') {
            const priceVal = document.getElementById('field_price').value.trim();
            if (priceVal) {
                text = text.replace('{{price_words}}', `(сумма прописью, уточните в банке)`); 
            }
        }

        document.getElementById('docResultText').value = text;
        document.getElementById('docFormStep').style.display = 'none';
        document.getElementById('docResultStep').style.display = 'block';
    };

    window.copyDocument = function() {
        const textarea = document.getElementById('docResultText');
        textarea.select();
        document.execCommand('copy'); // Надежнее для мобильных, чем navigator.clipboard
        
        const btn = event.target;
        const orig = btn.innerHTML;
        btn.innerHTML = '✅ Скопировано!';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
    };

    window.downloadDocument = function() {
        const text = document.getElementById('docResultText').value;
        const key = document.getElementById('docTemplateSelect').value;
        const fileName = templates[key].name.replace(/[^a-zа-яё0-9]/gi, '_') + '.txt';
        
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    console.log('✅ Document Generator loaded');
})();
