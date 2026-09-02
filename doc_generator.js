// === УМНЫЙ ГЕНЕРАТОР ДОКУМЕНТОВ SOLODEV 2.0 ===
// Вкладка + умный калькулятор стоимости + автозаполнение из базы + правильная кодировка

(function() {
    'use strict';

    // База знаний для автозаполнения юридических формулировок
    const legalPhrases = {
        contract: {
            force_majeure: "Форс-мажор: стихийные бедствия, военные действия, акты государственных органов. Сторона, не исполнившая обязательства из-за форс-мажора, освобождается от ответственности, но обязана уведомить другую сторону в течение 5 рабочих дней.",
            dispute: "Споры решаются путём переговоров. При недостижении согласия — в арбитражном суде по месту нахождения Исполнителя.",
            ip_rights: "Исключительное право на результат работы переходит к Заказчику с момента полной оплаты. До оплаты все права принадлежат Исполнителю."
        },
        nda: {
            confidential_info: "Конфиденциальная информация: технические решения, бизнес-планы, финансовые данные, клиентские базы, исходный код, пароли и ключи доступа.",
            exceptions: "Не является конфиденциальной: информация, ставшая общедоступной не по вине Получающей стороны; информация, полученная от третьих лиц без обязательств о неразглашении."
        }
    };

    // Умный калькулятор стоимости
    const pricingEngine = {
        services: {
            landing: { base: 30000, name: "Лендинг", hours: 40 },
            multisite: { base: 80000, name: "Многостраничный сайт", hours: 120 },
            shop: { base: 150000, name: "Интернет-магазин", hours: 200 },
            webapp: { base: 250000, name: "Веб-приложение", hours: 400 },
            bot: { base: 50000, name: "Telegram-бот", hours: 60 },
            design: { base: 20000, name: "Дизайн (UI/UX)", hours: 30 },
            audit: { base: 15000, name: "Аудит сайта", hours: 10 }
        },
        complexity: { simple: 1, medium: 1.4, hard: 2 },
        urgency: { normal: 1, fast: 1.5, urgent: 2 }
    };

    const templates = {
        contract: {
            name: "📝 Договор авторского заказа",
            hasCalculator: true,
            fields: [
                { id: "contractor", label: "Исполнитель (ФИО или ИП)", placeholder: "Иванов Иван Иванович / ИП Иванов И.И." },
                { id: "client", label: "Заказчик (Название или ФИО)", placeholder: "ООО 'Ромашка' или Петр Петров" },
                { id: "service_type", label: "Тип услуги", type: "select", options: ["Лендинг", "Многостраничный сайт", "Интернет-магазин", "Веб-приложение", "Telegram-бот", "Дизайн", "Аудит", "Другое"] },
                { id: "service", label: "Детальное описание работ", placeholder: "Разработка адаптивного лендинга по предоставленному ТЗ с интеграцией CRM" },
                { id: "price", label: "Стоимость (₽) — можно заполнить вручную или рассчитать", placeholder: "50000" },
                { id: "deadline", label: "Срок выполнения (рабочих дней)", placeholder: "14" },
                { id: "prepayment", label: "Предоплата (%)", type: "select", options: ["30", "50", "70", "100"] }
            ],
            template: `ДОГОВОР АВТОРСКОГО ЗАКАЗА № {{doc_number}}

г. {{city}}                                                                                              «{{date}}»

{{contractor}}, именуемый(ая) в дальнейшем «Исполнитель», и
{{client}}, именуемый(ая) в дальнейшем «Заказчик», заключили настоящий Договор о нижеследующем:

1. ПРЕДМЕТ ДОГОВОРА
1.1. Исполнитель обязуется по заданию Заказчика создать произведение: {{service}}, а Заказчик обязуется принять и оплатить его.
1.2. {{ip_rights}}

2. СТОИМОСТЬ И ПОРЯДОК РАСЧЕТОВ
2.1. Общая стоимость работ составляет {{price}} рублей.
2.2. Заказчик выплачивает Исполнителю предоплату в размере {{prepayment}}% в течение 3 банковских дней с момента подписания Договора.
2.3. Окончательный расчет производится в течение 3 банковских дней после подписания Акта сдачи-приемки работ.

3. СРОКИ ВЫПОЛНЕНИЯ
3.1. Срок выполнения работ: {{deadline}} рабочих дней с момента получения предоплаты и всех необходимых материалов от Заказчика.
3.2. При нарушении сроков Исполнитель уплачивает пени в размере 0,1% от стоимости работ за каждый день просрочки.

4. ПОРЯДОК СДАЧИ-ПРИЕМКИ
4.1. Исполнитель направляет результат Заказчику. У Заказчика есть 5 (пять) рабочих дней для направления мотивированных замечаний.
4.2. В случае отсутствия замечаний в указанный срок, работы считаются принятыми в полном объеме и подлежат оплате.
4.3. В стоимость включено 2 (две) итерации правок. Дополнительные правки оплачиваются отдельно из расчета 1500 ₽/час.

5. ФОРС-МАЖОР
5.1. {{force_majeure}}

6. РАЗРЕШЕНИЕ СПОРОВ
6.1. {{dispute}}

7. РЕКВИЗИТЫ И ПОДПИСИ СТОРОН
Исполнитель: {{contractor}}
Заказчик: {{client}}

Подпись Исполнителя: _________________      Подпись Заказчика: _________________`
        },
        nda: {
            name: "🤫 Соглашение о неразглашении (NDA)",
            hasCalculator: false,
            fields: [
                { id: "disclosing", label: "Сторона, раскрывающая информацию", placeholder: "ООО 'Технологии'" },
                { id: "receiving", label: "Сторона, получающая информацию", placeholder: "Иванов И.И." },
                { id: "purpose", label: "Цель раскрытия информации", placeholder: "Оценка возможности сотрудничества по проекту X" },
                { id: "term", label: "Срок действия соглашения (лет)", type: "select", options: ["1", "2", "3", "5"] }
            ],
            template: `СОГЛАШЕНИЕ О КОНФИДЕНЦИАЛЬНОСТИ (NDA)

г. {{city}}                                                                                              «{{date}}»

{{disclosing}}, именуемая в дальнейшем «Раскрывающая сторона», и
{{receiving}}, именуемая в дальнейшем «Получающая сторона», заключили настоящее Соглашение:

1. ПРЕДМЕТ СОГЛАШЕНИЯ
1.1. Стороны намереваются обсудить вопросы, связанные с: {{purpose}} (далее – «Цель»).
1.2. В ходе обсуждений Раскрывающая сторона может передать Получающей стороне конфиденциальную информацию.
1.3. {{confidential_info}}

2. ОБЯЗАТЕЛЬСТВА ПОЛУЧАЮЩЕЙ СТОРОНЫ
2.1. Получающая сторона обязуется:
   а) Использовать информацию исключительно для достижения Цели;
   б) Не раскрывать информацию третьим лицам без письменного согласия Раскрывающей стороны;
   в) Принять все разумные меры для защиты информации от несанкционированного доступа.

3. ИСКЛЮЧЕНИЯ
3.1. {{exceptions}}

4. СРОК ДЕЙСТВИЯ
4.1. Настоящее Соглашение вступает в силу с даты подписания и действует в течение {{term}} лет.
4.2. Обязательства по конфиденциальности сохраняют силу в течение {{term}} лет после прекращения действия Соглашения.

5. ОТВЕТСТВЕННОСТЬ
5.1. В случае нарушения условий настоящего Соглашения, виновная сторона обязана возместить документально подтвержденные убытки, а также уплатить штраф в размере 500 000 рублей.

Подпись Раскрывающей стороны: _________________
Подпись Получающей стороны: _________________`
        },
        kp: {
            name: "💼 Коммерческое предложение",
            hasCalculator: true,
            fields: [
                { id: "client_name", label: "Имя клиента или название компании", placeholder: "Александр, ООО 'Вектор'" },
                { id: "my_name", label: "Ваше имя/название студии", placeholder: "Дмитрий, SoloDev" },
                { id: "problem", label: "Проблема клиента (боль)", placeholder: "низкая конверсия сайта, отсутствие мобильной версии" },
                { id: "solution", label: "Ваше решение", placeholder: "Разработка современного адаптивного лендинга с интеграцией CRM" },
                { id: "price_kp", label: "Стоимость решения", placeholder: "от 80 000 ₽" },
                { id: "deadline_kp", label: "Ориентировочные сроки", placeholder: "2-4 недели" },
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
• Гарантию на выполненные работы и техническую поддержку 30 дней.
• Полную юридическую защиту (договор, акт, передача прав).

Стоимость проекта: {{price_kp}}
Ориентировочные сроки: {{deadline_kp}}

Этапы работы:
1. Брифинг и ТЗ (2-3 дня)
2. Дизайн и согласование (5-7 дней)
3. Разработка (7-14 дней)
4. Тестирование и запуск (2-3 дня)

Я готов провести бесплатную 15-минутную консультацию, чтобы обсудить детали и ответить на ваши вопросы.

С уважением,
{{my_name}}
Контакты: {{contact}}`
        },
        act: {
            name: "📋 Акт сдачи-приемки работ",
            hasCalculator: false,
            fields: [
                { id: "act_contractor", label: "Исполнитель", placeholder: "Иванов Иван Иванович" },
                { id: "act_client", label: "Заказчик", placeholder: "ООО 'Ромашка'" },
                { id: "act_service", label: "Выполненные работы", placeholder: "Разработка лендинга по договору № 123 от 01.01.2024" },
                { id: "act_price", label: "Сумма акта (₽)", placeholder: "50000" },
                { id: "act_contract", label: "Номер договора", placeholder: "123" }
            ],
            template: `АКТ СДАЧИ-ПРИЕМКИ РАБОТ № {{doc_number}}

к Договору авторского заказа № {{act_contract}}

г. {{city}}                                                                                              «{{date}}»

{{act_contractor}}, именуемый(ая) в дальнейшем «Исполнитель», и
{{act_client}}, именуемый(ая) в дальнейшем «Заказчик», составили настоящий Акт о нижеследующем:

1. Исполнитель сдал, а Заказчик принял следующие работы:
   {{act_service}}

2. Стоимость выполненных работ составляет {{act_price}} рублей.

3. Заказчик претензий по объему, качеству и срокам выполнения работ не имеет.

4. Настоящий Акт составлен в двух экземплярах, имеющих равную юридическую силу, по одному для каждой из Сторон.

Подпись Исполнителя: _________________      Подпись Заказчика: _________________`
        }
    };

    // Рендер вкладки Документы
    window.renderDocs = function() {
        const app = document.getElementById('app');
        if (!app) return;

        let html = '<div style="padding:20px;max-width:900px;margin:0 auto">';
        html += '<h2 style="color:#fff;margin-bottom:20px"> Генератор документов</h2>';
        html += '<p style="color:#a0a8b8;margin-bottom:30px">Профессиональные шаблоны документов с умным калькулятором стоимости и автозаполнением из юридической базы.</p>';

        // Карточки шаблонов
        html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;margin-bottom:30px">';
        for (let key in templates) {
            const t = templates[key];
            html += `
                <div onclick="openDocTemplate('${key}')" style="background:#1f2530;border:2px solid #2a303c;border-radius:12px;padding:20px;cursor:pointer;transition:all 0.2s" onmouseover="this.style.borderColor='#6c8cff';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='#2a303c';this.style.transform='translateY(0)'">
                    <div style="font-size:32px;margin-bottom:10px">${t.name.split(' ')[0]}</div>
                    <div style="color:#fff;font-size:16px;font-weight:bold;margin-bottom:8px">${t.name.substring(t.name.indexOf(' ') + 1)}</div>
                    <div style="color:#a0a8b8;font-size:13px">${t.hasCalculator ? '🧮 С калькулятором стоимости' : '📝 Стандартный шаблон'}</div>
                </div>
            `;
        }
        html += '</div>';

        // Форма генерации
        html += '<div id="docGeneratorForm" style="background:#1f2530;border-radius:12px;padding:25px;display:none">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">';
        html += '<h3 id="docFormTitle" style="color:#fff;margin:0"></h3>';
        html += '<button onclick="closeDocForm()" style="background:none;border:none;color:#ff6b6b;font-size:20px;cursor:pointer">✕</button>';
        html += '</div>';

        // Умный калькулятор (показывается только для шаблонов с hasCalculator)
        html += '<div id="smartCalculator" style="background:#0f1419;border-radius:8px;padding:20px;margin-bottom:20px;display:none">';
        html += '<h4 style="color:#ffd700;margin:0 0 15px 0">🧮 Умный калькулятор стоимости</h4>';
        html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px">';
        html += '<div><label style="color:#a0a8b8;font-size:12px;display:block;margin-bottom:6px">Тип проекта</label><select id="calc_service" onchange="calculatePrice()" style="width:100%;padding:10px;background:#1f2530;border:1px solid #2a303c;border-radius:6px;color:#fff;font-size:14px"><option value="">-- Выберите --</option>';
        for (let key in pricingEngine.services) {
            html += `<option value="${key}">${pricingEngine.services[key].name}</option>`;
        }
        html += '</select></div>';
        html += '<div><label style="color:#a0a8b8;font-size:12px;display:block;margin-bottom:6px">Сложность</label><select id="calc_complexity" onchange="calculatePrice()" style="width:100%;padding:10px;background:#1f2530;border:1px solid #2a303c;border-radius:6px;color:#fff;font-size:14px"><option value="simple">🟢 Простая</option><option value="medium" selected> Средняя</option><option value="hard">🔴 Сложная</option></select></div>';
        html += '<div><label style="color:#a0a8b8;font-size:12px;display:block;margin-bottom:6px">Срочность</label><select id="calc_urgency" onchange="calculatePrice()" style="width:100%;padding:10px;background:#1f2530;border:1px solid #2a303c;border-radius:6px;color:#fff;font-size:14px"><option value="normal" selected>📅 Стандартно</option><option value="fast">⚡ Быстро (+50%)</option><option value="urgent">🔥 Срочно (+100%)</option></select></div>';
        html += '</div>';
        html += '<div id="calcResult" style="margin-top:15px;padding:15px;background:#1f2530;border-radius:6px;display:none"><div style="color:#3ecf8e;font-size:18px;font-weight:bold">💰 Рекомендуемая цена: <span id="calcPrice">0</span> ₽</div><div style="color:#a0a8b8;font-size:13px;margin-top:5px">⏱️ Примерное время: <span id="calcHours">0</span> часов</div><button onclick="applyCalculatedPrice()" style="margin-top:10px;padding:8px 16px;background:#3ecf8e;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">✅ Применить к документу</button></div>';
        html += '</div>';

        // Поля формы
        html += '<div id="docFieldsContainer" style="display:flex;flex-direction:column;gap:15px"></div>';

        // Кнопки действий
        html += '<div style="display:flex;gap:10px;margin-top:25px;flex-wrap:wrap">';
        html += '<button onclick="generateDocument()" style="flex:1;min-width:200px;padding:14px;background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer">⚡ Сгенерировать документ</button>';
        html += '</div>';
        html += '</div>';

        // Результат
        html += '<div id="docResult" style="background:#1f2530;border-radius:12px;padding:25px;display:none">';
        html += '<h3 style="color:#fff;margin:0 0 15px 0">✅ Документ готов</h3>';
        html += '<div style="display:flex;gap:10px;margin-bottom:15px;flex-wrap:wrap">';
        html += '<button onclick="showDocFormAgain()" style="padding:10px 20px;background:#6c757d;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">← Редактировать</button>';
        html += '<button onclick="copyDocument()" style="padding:10px 20px;background:#3ecf8e;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">📋 Копировать</button>';
        html += '<button onclick="downloadDocument()" style="padding:10px 20px;background:#6c8cff;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">💾 Скачать .txt</button>';
        html += '</div>';
        html += '<textarea id="docResultText" readonly style="width:100%;height:60vh;background:#0f1419;border:1px solid #6c8cff;border-radius:8px;color:#e8ecf3;padding:15px;font-family:monospace;font-size:13px;line-height:1.5;resize:none"></textarea>';
        html += '</div>';

        html += '</div>';
        app.innerHTML = html;
    };

    let currentTemplate = null;

    window.openDocTemplate = function(key) {
        currentTemplate = key;
        document.getElementById('docGeneratorForm').style.display = 'block';
        document.getElementById('docResult').style.display = 'none';
        document.getElementById('docFormTitle').textContent = templates[key].name;

        // Показываем калькулятор только для подходящих шаблонов
        const calc = document.getElementById('smartCalculator');
        if (templates[key].hasCalculator) {
            calc.style.display = 'block';
        } else {
            calc.style.display = 'none';
        }

        // Рендерим поля
        const container = document.getElementById('docFieldsContainer');
        let html = '';
        templates[key].fields.forEach(field => {
            const savedValue = localStorage.getItem('doc_field_' + field.id) || '';
            if (field.type === 'select') {
                html += `<div><label style="color:#e8ecf3;font-size:13px;display:block;margin-bottom:6px">${field.label}</label><select id="field_${field.id}" onchange="localStorage.setItem('doc_field_${field.id}', this.value)" style="width:100%;padding:12px;background:#1f2530;border:1px solid #2a303c;border-radius:6px;color:#fff;font-size:14px">`;
                field.options.forEach(opt => {
                    html += `<option value="${opt}" ${savedValue === opt ? 'selected' : ''}>${opt}</option>`;
                });
                html += '</select></div>';
            } else {
                html += `<div><label style="color:#e8ecf3;font-size:13px;display:block;margin-bottom:6px">${field.label}</label><input type="text" id="field_${field.id}" value="${savedValue}" placeholder="${field.placeholder}" style="width:100%;padding:12px;background:#1f2530;border:1px solid #2a303c;border-radius:6px;color:#fff;font-size:14px" oninput="localStorage.setItem('doc_field_${field.id}', this.value)"></div>`;
            }
        });
        container.innerHTML = html;

        // Скролл к форме
        document.getElementById('docGeneratorForm').scrollIntoView({ behavior: 'smooth' });
    };

    window.closeDocForm = function() {
        document.getElementById('docGeneratorForm').style.display = 'none';
        currentTemplate = null;
    };

    window.showDocFormAgain = function() {
        document.getElementById('docResult').style.display = 'none';
        document.getElementById('docGeneratorForm').style.display = 'block';
    };

    // Умный калькулятор
    window.calculatePrice = function() {
        const service = document.getElementById('calc_service').value;
        const complexity = document.getElementById('calc_complexity').value;
        const urgency = document.getElementById('calc_urgency').value;

        if (!service) {
            document.getElementById('calcResult').style.display = 'none';
            return;
        }

        const base = pricingEngine.services[service].base;
        const hours = pricingEngine.services[service].hours;
        const price = Math.round(base * pricingEngine.complexity[complexity] * pricingEngine.urgency[urgency]);
        const finalHours = Math.round(hours * pricingEngine.complexity[complexity] * pricingEngine.urgency[urgency]);

        document.getElementById('calcPrice').textContent = price.toLocaleString('ru-RU');
        document.getElementById('calcHours').textContent = finalHours;
        document.getElementById('calcResult').style.display = 'block';
    };

    window.applyCalculatedPrice = function() {
        const price = document.getElementById('calcPrice').textContent.replace(/\s/g, '');
        const hours = document.getElementById('calcHours').textContent;
        
        // Применяем к соответствующему полю
        if (currentTemplate === 'contract') {
            const priceField = document.getElementById('field_price');
            if (priceField) priceField.value = price;
            const deadlineField = document.getElementById('field_deadline');
            if (deadlineField) deadlineField.value = Math.ceil(hours / 8); // Переводим часы в дни
        } else if (currentTemplate === 'kp') {
            const priceField = document.getElementById('field_price_kp');
            if (priceField) priceField.value = 'от ' + price + ' ₽';
            const deadlineField = document.getElementById('field_deadline_kp');
            if (deadlineField) {
                const weeks = Math.ceil(hours / 40);
                deadlineField.value = weeks + '-' + (weeks + 2) + ' недели';
            }
        }

        // Визуальная обратная связь
        const btn = event.target;
        btn.textContent = '✅ Применено!';
        setTimeout(() => { btn.textContent = '✅ Применить к документу'; }, 2000);
    };

    window.generateDocument = function() {
        if (!currentTemplate) return;
        let text = templates[currentTemplate].template;

        // Общие переменные
        const today = new Date();
        const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
        text = text.replace(/{{date}}/g, `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()} г.`);
        text = text.replace(/{{city}}/g, "Москва");
        text = text.replace(/{{doc_number}}/g, Math.floor(Math.random() * 900 + 100) + "/2024");

        // Юридические формулировки из базы
        if (legalPhrases[currentTemplate]) {
            for (let key in legalPhrases[currentTemplate]) {
                text = text.replace(new RegExp(`{{${key}}}`, 'g'), legalPhrases[currentTemplate][key]);
            }
        }

        // Переменные из формы
        templates[currentTemplate].fields.forEach(field => {
            const val = document.getElementById('field_' + field.id)?.value.trim() || "[НЕ ЗАПОЛНЕНО]";
            text = text.replace(new RegExp(`{{${field.id}}}`, 'g'), val);
        });

        document.getElementById('docResultText').value = text;
        document.getElementById('docGeneratorForm').style.display = 'none';
        document.getElementById('docResult').style.display = 'block';
        document.getElementById('docResult').scrollIntoView({ behavior: 'smooth' });
    };

    window.copyDocument = function() {
        const textarea = document.getElementById('docResultText');
        textarea.select();
        document.execCommand('copy');
        
        const btn = event.target;
        const orig = btn.innerHTML;
        btn.innerHTML = '✅ Скопировано!';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
    };

    // ИСПРАВЛЕНИЕ КОДИРОВКИ: добавляем BOM-маркер UTF-8
    window.downloadDocument = function() {
        const text = document.getElementById('docResultText').value;
        const key = currentTemplate;
        const fileName = templates[key].name.replace(/[^a-zа-яё0-9]/gi, '_') + '.txt';
        
        // Добавляем BOM (Byte Order Mark) для корректного отображения кириллицы в Windows/Android
        const BOM = '\uFEFF';
        const blob = new Blob([BOM + text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    console.log('✅ Smart Document Generator 2.0 loaded');
})();
