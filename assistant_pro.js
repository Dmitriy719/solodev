// === ПРОФЕССИОНАЛЬНЫЙ УМНЫЙ ПОМОЩНИК 5.0 (PREMIUM) ===
// История чата, копирование ответов, умный парсинг, расширенная база

(function() {
    'use strict';
    
    // === РАСШИРЕННАЯ БАЗА ЗНАНИЙ (PREMIUM) ===
    const knowledgeBase = {
        business: [
            {keywords: ['клиент', 'клиентам', 'клиентов', 'привлеч', 'лид'], answer: "🎯 **Привлечение клиентов (Лидогенерация):**\n\n**Быстрые результаты (1-7 дней):**\n• Холодные рассылки с персонализацией (не спам!)\n• Таргетированная реклама (VK, Telegram Ads)\n• Авито / Профи.ру (для услуг)\n• Партнёрские обмены с неконкурирующими нишами\n\n**Долгосрочные (1-6 месяцев):**\n• Контент-маркетинг (экспертные статьи, кейсы с цифрами)\n• SEO-оптимизация\n• Личный бренд в соцсетях\n• Реферальная программа ('приведи друга — получи скидку 20%')\n\n💡 **Главное:** клиент покупает не услугу, а решение своей боли. Продавай результат!"},
            {keywords: ['боль', 'боли', 'проблем', 'страх', 'возражен'], answer: "🔥 **Топ-7 болей клиентов и как их закрыть:**\n\n1. **'Обманут в прошлый раз'** → Давай гарантию возврата или поэтапную оплату.\n2. **'Скрытые платежи'** → Фиксируй цену в договоре, прописывай, что НЕ входит в стоимость.\n3. **'Сорвут сроки'** → Добавь в договор штраф для СЕБЯ за просрочку (это резко повышает доверие).\n4. **'Не разбираюсь в теме'** → Говори на языке выгоды, а не технических терминов.\n5. **'Пропадет после оплаты'** → Обещай (и давай) еженедельные отчёты о прогрессе.\n6. **'Сложно начать'** → Сделай первый шаг бесплатным (аудит, консультация, прототип).\n7. **'Нет времени'** → Предлагай решение 'под ключ' с минимумом вопросов к клиенту."},
            {keywords: ['продаж', 'продать', 'чек', 'дороже', 'цен'], answer: "💰 **Как продавать дорого и уверенно:**\n\n1. **Якорение цены**: всегда давай 3 варианта (Базовый, Стандарт, Премиум). Большинство выберет средний.\n2. **Продавай ROI**: 'Этот сайт стоит 100 000 ₽, но принесёт вам 300 000 ₽ прибыли в первый месяц'.\n3. **Дефицит**: 'Беру только 2 проекта в месяц, на следующий месяц осталось 1 место'.\n4. **Социальное доказательство**: скриншоты отзывов, логотипы клиентов, кейсы 'было/стало'.\n5. **Бонусы вместо скидок**: не снижай цену, добавь ценность ('бесплатная поддержка 1 месяц').\n\n📊 **Формула цены**: (Желаемый доход в месяц + Расходы) / 100 часов × 1.3 (налог и простои)."},
            {keywords: ['тз', 'техническое задание', 'требован'], answer: "📝 **Как составить идеальное ТЗ (и защитить себя):**\n\n**Структура ТЗ:**\n1. Цель проекта (какую бизнес-задачу решаем).\n2. Целевая аудитория.\n3. Функциональные требования (что конкретно должно работать).\n4. Нефункциональные требования (скорость, дизайн, совместимость).\n5. Этапы и сроки с контрольными точками.\n6. Критерии приёмки (как поймём, что работа выполнена).\n\n⚠️ **Золотое правило:** всё, чего нет в ТЗ, не будет сделано. Любые изменения после утверждения ТЗ = доп. соглашение и доплата. Никогда не начинай работу без подписанного ТЗ!"},
            {keywords: ['контрагент', 'проверк', 'мошенник', 'риск'], answer: "🔍 **Проверка контрагента за 15 минут:**\n\n1. **ЕГРЮЛ/ЕГРИП** (сайт ФНС): действует ли компания, кто директор, нет ли массы учредителей.\n2. **Картотека арбитражных дел** (kad.arbitr.ru): судится ли компания, часто ли она ответчик.\n3. **ФССП** (fssp.gov.ru): есть ли у директора или компании долги.\n4. **Реестр недобросовестных поставщиков** (для госзакупок).\n5. **Сайт и соцсети**: выглядят ли они живыми, есть ли реальные отзывы.\n\n🚩 **Красные флаги:** массовый адрес регистрации, директор-номинал, свежие изменения в уставе, требование 100% предоплаты на карту физлица."},
            {keywords: ['переговор', 'встреч', 'звонк', 'общен'], answer: "🤝 **Правила успешных переговоров:**\n\n1. **Готовься**: узнай о компании клиента всё до звонка.\n2. **Слушай 80%, говори 20%**: задавай открытые вопросы ('Какая главная задача стоит сейчас?').\n3. **Отражай**: 'Правильно ли я понял, что ваша главная боль — это срывы сроков?'.\n4. **Не оправдывайся по цене**: обосновывай ценность. 'Это стоит X, потому что включает Y, что сэкономит вам Z'.\n5. **Всегда завершай следующим шагом**: 'Отправляю коммерческое предложение сегодня, созваниваемся в четверг для обсуждения. Договорились?'."}
        ],
        security: [
            {keywords: ['кибер', 'безопасн', 'защит', 'взлом'], answer: "🔒 **Чек-лист кибербезопасности для фрилансера/малого бизнеса:**\n\n✅ **Обязательно (база):**\n• Двухфакторная аутентификация (2FA) на почте, хостинге, банке.\n• Менеджер паролей (Bitwarden, 1Password). Никаких '123456'.\n• Резервные копии по правилу 3-2-1 (3 копии, 2 разных носителя, 1 офлайн).\n• Обновления ОС и антивирус.\n\n✅ **Продвинуто:**\n• Отдельный рабочий и личный компьютер/профиль.\n• Шифрование диска (BitLocker, FileVault).\n• NDA с подрядчиками, имеющими доступ к данным.\n• Регулярный аудит прав доступа.\n\n⚠️ **Помни:** 95% взломов начинаются с фишинга или украденного пароля, а не с хакерских атак из фильмов."},
            {keywords: ['фишинг', 'мошенник', 'письм', 'ссылк'], answer: "🎣 **Как распознать фишинг и не потерять деньги:**\n\n**Признаки подделки:**\n• Срочность: 'Ваш аккаунт будет заблокирован через 24 часа!'\n• Странный адрес отправителя: `support@sberbank-security.com` вместо `sberbank.ru`.\n• Ошибки в тексте, странные шрифты.\n• Просьба перейти по ссылке и ввести пароль или данные карты.\n\n**Правила защиты:**\n1. Никогда не переходи по ссылкам из подозрительных писем. Заходи на сайт вручную.\n2. Проверяй URL: `yandex.ru` и `yandex-login.ru` — это разные сайты.\n3. Включи 2FA везде.\n4. Если просят срочно перевести деньги 'партнёру' от имени директора — обязательно перезвони директору по известному тебе номеру."},
            {keywords: ['бэкап', 'backup', 'резервн', 'копи', 'потеря'], answer: "💾 **Правило резервного копирования 3-2-1:**\n\n• **3** копии данных (основная + 2 резервные).\n• **2** разных типа носителей (например, внешний диск + облако).\n• **1** копия хранится офлайн или в другом географическом месте (защита от пожара, кражи или шифровальщика).\n\n**Что бэкапить в первую очередь:**\n1. Базы данных и код проектов.\n2. Финансовые документы и договоры.\n3. Переписку с ключевыми клиентами.\n\n⚠️ **Главное правило:** бэкап, который ты не проверял на восстановление, не считается бэкапом. Делай тестовое восстановление раз в квартал!"}
        ],
        legal: [
            {keywords: ['налог', 'налоги', 'ндс', 'ндфл', 'усн', 'самозанят'], answer: "💸 **Налоги для фрилансера и малого бизнеса (РФ):**\n\n**1. Самозанятость (НПД):**\n• Идеально для старта. Регистрация за 5 минут.\n• 4% при работе с физлицами, 6% с юрлицами/ИП.\n• Лимит: 2,4 млн ₽ в год.\n• Нет отчётности, всё через приложение 'Мой налог'.\n\n**2. ИП на УСН 6% (Доходы):**\n• Когда доход превысил 2,4 млн ₽ или нужны сотрудники.\n• Платишь 6% со всей выручки + фиксированные взносы (~45 000 ₽/год).\n• Можно уменьшать налог на сумму взносов (вплоть до 0 ₽).\n\n**3. ИП на УСН 15% (Доходы минус расходы):**\n• Выгодно, если документально подтверждённые расходы составляют более 60-70% от оборота.\n\n💡 **Совет:** Никогда не принимай оплату на личную карту от юрлица регулярно — банк заблокирует счёт по 115-ФЗ. Используй легальные статусы."},
            {keywords: ['договор', 'оферта', 'контракт', 'соглашен'], answer: "📋 **5 смертельных ошибок в договоре с клиентом:**\n\n1. **Размытый предмет**: 'Сделать сайт'. Надо: 'Разработать 5-страничный сайт по ТЗ (Приложение 1)'.\n2. **Нет дедлайнов**: 'В кратчайшие сроки'. Надо: 'В течение 14 рабочих дней с момента предоплаты'.\n3. **Бесконечные правки**: Надо: 'В стоимость включено 2 итерации правок. Далее — 1000 ₽/час'.\n4. **Отсутствие автоматической приёмки**: Добавь: 'Если в течение 5 рабочих дней нет мотивированного отказа, работа считается принятой'.\n5. **Передача всех прав до оплаты**: Надо: 'Исключительные права переходят заказчику только после 100% оплаты'.\n\n💡 Используй конструкторы оферт для сайтов, если работаешь с физлицами."}
        ]
    };
    
    // === УМНАЯ ОЧИСТКА ЗАПРОСА ===
    function cleanQuery(query) {
        return query.replace(/^(расскажи|объясни|что такое|как сделать|как|почему|когда|где|кто|давай|пожалуйста)\s+(про|о|насчет)?\s*/i, '').trim();
    }
    
    // === ПОИСК В WIKIPEDIA ===
    async function searchWikipedia(query) {
        try {
            const cleanQ = cleanQuery(query);
            const searchUrl = `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQ)}&format=json&origin=*&srlimit=2`;
            const searchResp = await fetch(searchUrl);
            const searchData = await searchResp.json();
            
            if (searchData.query?.search?.length > 0) {
                const title = searchData.query.search[0].title;
                const summaryUrl = `https://ru.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
                const summaryResp = await fetch(summaryUrl);
                const summaryData = await summaryResp.json();
                
                if (summaryData.extract && summaryData.extract.length > 50) {
                    return {
                        title: summaryData.title,
                        extract: summaryData.extract,
                        url: summaryData.content_urls?.desktop?.page || ''
                    };
                }
            }
        } catch (e) {
            console.log('Wiki error:', e);
        }
        return null;
    }
    
    // === ПОИСК В БАЗЕ ===
    function searchKnowledgeBase(question) {
        const q = question.toLowerCase();
        const words = q.split(/\s+/).filter(w => w.length > 3);
        let bestMatch = null, bestScore = 0;
        
        for (let cat in knowledgeBase) {
            knowledgeBase[cat].forEach(item => {
                let score = 0;
                item.keywords.forEach(kw => { if (q.includes(kw)) score += 3; });
                words.forEach(w => { 
                    if (q.includes(w)) score += 1;
                    item.keywords.forEach(kw => { if (kw.includes(w) || w.includes(kw)) score += 2; });
                });
                if (score > bestScore) { bestScore = score; bestMatch = item; }
            });
        }
        return bestScore >= 3 ? bestMatch : null;
    }
    
    function searchLegalDb(question, legalDataCache) {
        if (!legalDataCache?.dictionary) return [];
        const q = question.toLowerCase();
        const words = q.split(/\s+/).filter(w => w.length > 3);
        return legalDataCache.dictionary.filter(term => {
            const searchText = (term.term + ' ' + term.def).toLowerCase();
            return words.some(w => searchText.includes(w));
        }).slice(0, 3);
    }
    
    // === ГЕНЕРАЦИЯ ОТВЕТА ===
    async function generateAnswer(question, legalDataCache) {
        const q = question.toLowerCase();
        if (q.match(/^(привет|здравствуй|хай|hello|hi|добрый)/)) {
            return "👋 **Привет! Я профессиональный помощник SoloDev 5.0**\n\nЯ умею:\n• 💼 Давать советы по бизнесу и продажам\n• 🔒 Объяснять кибербезопасность простым языком\n• ⚖️ Подсказывать по налогам и договорам\n• 🌐 Искать актуальную информацию в Wikipedia\n• 📊 Анализировать ниши и составлять скрипты\n\nПросто задай вопрос или выбери тему ниже!";
        }
        
        let response = '';
        let sources = [];
        
        const kbMatch = searchKnowledgeBase(question);
        if (kbMatch) {
            response += kbMatch.answer + '\n\n';
            sources.push('💾 База знаний SoloDev');
        }
        
        const legalMatches = searchLegalDb(question, legalDataCache);
        if (legalMatches.length > 0) {
            response += '⚖️ **Из юридической базы:**\n\n';
            legalMatches.forEach(term => { response += `• **${term.term}**: ${term.def}\n\n`; });
            sources.push('📚 Юридическая база');
        }
        
        const wikiResult = await searchWikipedia(question);
        if (wikiResult) {
            response += `🌐 **Wikipedia: ${wikiResult.title}**\n${wikiResult.extract}\n\n`;
            sources.push('🌐 Wikipedia');
        }
        
        if (!kbMatch && legalMatches.length === 0 && !wikiResult) {
            response += `🤔 По запросу "${question}" не нашёл точного ответа.\n\n💡 **Попробуй:**\n• Переформулировать вопрос короче\n• Использовать ключевые слова: "клиенты", "налоги", "договор", "фишинг"\n• Или выбери одну из быстрых тем ниже!`;
        }
        
        if (sources.length > 0) response += `\n📎 **Источники:** ${sources.join(', ')}`;
        return response;
    }
    
    // === АНАЛИЗ НИШИ ===
    async function analyzeNiche(niche, audience) {
        let response = `📊 **Анализ ниши: ${niche}**\n🎯 **Аудитория:** ${audience}\n\n`;
        response += `🔥 **Боли клиентов:**\n• Страх слить бюджет без результата\n• Негативный опыт с прошлыми подрядчиками\n• Непонимание технических терминов и процессов\n• Боязнь скрытых доплат и срыва сроков\n\n`;
        response += `💡 **Твоё предложение:**\nПакет "${niche} под ключ":\n✅ Гарантия результата или возврат денег\n✅ Полная юридическая защита (договор, оферта)\n✅ Еженедельные отчёты о прогрессе\n✅ 30 дней бесплатной поддержки после сдачи\n\n`;
        
        const trends = await searchWikipedia(niche + ' тренды 2024');
        if (trends) response += `📈 **Тренды:** ${trends.extract}\n\n`;
        
        response += `📝 **Скрипт для первого контакта:**\n"Здравствуйте! Вижу, вы развиваете ${audience}. Многие в этой нише сталкиваются со срывами сроков и скрытыми платежами от подрядчиков. Я специализируюсь на ${niche} и работаю по прозрачной системе с гарантиями и еженедельными отчётами. Могу провести бесплатный 15-минутный аудит вашего текущего проекта. Удобно созвониться на этой неделе?"\n\n`;
        
        response += `🚀 **Первые 3 шага:**\n1. Подготовь 3 кейса с цифрами (было/стало).\n2. Настрой простой лендинг с формой заявки.\n3. Сделай 20 точечных холодных контактов в день.`;
        return response;
    }
    
    // === УПРАВЛЕНИЕ ИСТОРИЕЙ ЧАТА ===
    function saveChatHistory(html) {
        localStorage.setItem('soloDevChatHistory', html);
    }
    
    function loadChatHistory() {
        return localStorage.getItem('soloDevChatHistory') || `
            <div style="color:#e8ecf3;font-size:14px;line-height:1.6">
                👋 <b>Привет! Я умный помощник 5.0</b><br><br>
                Могу помочь с:<br>
                • 💼 Бизнесом и клиентами<br>
                • 🔒 Кибербезопасностью<br>
                • ⚖️ Правом и налогами<br>
                • 🌐 Поиском в Wikipedia<br>
                • 📊 Анализом ниш<br><br>
                Задай вопрос или выбери тему ниже!
            </div>`;
    }
    
    function clearChatHistory() {
        localStorage.removeItem('soloDevChatHistory');
        const history = document.getElementById('chatHistory');
        if (history) history.innerHTML = loadChatHistory();
    }
    
    // === ГЛОБАЛЬНЫЕ ФУНКЦИИ ===
    window.openProAssistant = function() {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');
        if (!modal || !modalContent) return;
        
        modalContent.innerHTML = `
            <div style="max-height:85vh;display:flex;flex-direction:column">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                    <h3 style="margin:0">🤖 Помощник 5.0</h3>
                    <button onclick="clearChatHistory()" style="background:none;border:1px solid #ff6b6b;color:#ff6b6b;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:11px" title="Очистить историю">🗑️ Очистить</button>
                </div>
                <div style="font-size:12px;color:#6c8cff;margin-bottom:10px">Бизнес • Безопасность • Право • Wikipedia</div>
                <div id="chatHistory" style="flex:1;overflow-y:auto;max-height:55vh;background:#0f1419;border-radius:8px;padding:15px;margin-bottom:15px;min-height:250px">
                    ${loadChatHistory()}
                </div>
                <div style="display:flex;gap:10px">
                    <input type="text" id="chatInput" placeholder="Задай вопрос..." style="flex:1;padding:12px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-size:14px" onkeypress="if(event.key==='Enter')sendChatMessage()">
                    <button onclick="sendChatMessage()" style="padding:12px 20px;background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;font-weight:bold">➤</button>
                </div>
                <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">
                    <button onclick="quickQuestion('Как найти клиентов?')" style="padding:6px 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:12px;color:#6c8cff;font-size:11px;cursor:pointer">🎯 Клиенты</button>
                    <button onclick="quickQuestion('Кибербезопасность')" style="padding:6px 10px;background:#1f2530;border:1px solid #3ecf8e;border-radius:12px;color:#3ecf8e;font-size:11px;cursor:pointer">🔒 Безопасность</button>
                    <button onclick="quickQuestion('Налоги для фрилансера')" style="padding:6px 10px;background:#1f2530;border:1px solid #ffd700;border-radius:12px;color:#ffd700;font-size:11px;cursor:pointer">💸 Налоги</button>
                    <button onclick="quickQuestion('Ошибки в договоре')" style="padding:6px 10px;background:#1f2530;border:1px solid #ff6b6b;border-radius:12px;color:#ff6b6b;font-size:11px;cursor:pointer">📋 Договор</button>
                </div>
                <button onclick="openNicheAnalysis()" style="margin-top:10px;padding:10px;background:linear-gradient(135deg,#ff6b6b,#ee5a6f);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:bold">📊 Анализ ниши и генерация КП</button>
            </div>
        `;
        modal.style.display = 'flex';
        setTimeout(() => { const input = document.getElementById('chatInput'); if (input) input.focus(); }, 100);
        
        // Скролл вниз при загрузке
        const history = document.getElementById('chatHistory');
        if (history) history.scrollTop = history.scrollHeight;
    };
    
    window.sendChatMessage = async function() {
        const input = document.getElementById('chatInput');
        const history = document.getElementById('chatHistory');
        if (!input || !history) return;
        
        const question = input.value.trim();
        if (!question) return;
        
        const userBubble = `<div style="margin:15px 0;text-align:right"><div style="display:inline-block;background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;padding:10px 15px;border-radius:12px 12px 4px 12px;font-size:14px;max-width:80%">${question}</div></div>`;
        history.innerHTML += userBubble;
        input.value = '';
        history.scrollTop = history.scrollHeight;
        
        history.innerHTML += `<div id="typingIndicator" style="margin:10px 0;color:#6c8cff;font-size:13px">🔍 Ищу информацию...</div>`;
        history.scrollTop = history.scrollHeight;
        
        const answer = await generateAnswer(question, window.legalDataCache);
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
        
        const formattedAnswer = answer.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
        const safeAnswer = answer.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        
        const assistantBubble = `
            <div style="margin:15px 0">
                <div style="display:inline-block;background:#1f2530;color:#e8ecf3;padding:10px 15px;border-radius:12px 12px 12px 4px;font-size:14px;max-width:85%;line-height:1.6">
                    ${formattedAnswer}
                    <div style="margin-top:10px;text-align:right">
                        <button onclick="copyToClipboard(this, '${safeAnswer}')" style="background:#2a303c;border:1px solid #6c8cff;color:#6c8cff;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:11px">📋 Копировать</button>
                    </div>
                </div>
            </div>
        `;
        history.innerHTML += assistantBubble;
        history.scrollTop = history.scrollHeight;
        saveChatHistory(history.innerHTML);
    };
    
    window.copyToClipboard = function(btn, text) {
        // Декодируем HTML-сущности и убираем markdown для чистого текста
        const txt = text.replace(/&quot;/g, '"').replace(/\\'/g, "'").replace(/<br>/g, '\n').replace(/<b>|<\/b>/g, '');
        navigator.clipboard.writeText(txt).then(() => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '✅ Скопировано!';
            btn.style.borderColor = '#3ecf8e';
            btn.style.color = '#3ecf8e';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.borderColor = '#6c8cff';
                btn.style.color = '#6c8cff';
            }, 2000);
        });
    };
    
    window.quickQuestion = function(question) {
        const input = document.getElementById('chatInput');
        if (input) { input.value = question; sendChatMessage(); }
    };
    
    window.openNicheAnalysis = function() {
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = `
            <h3>📊 Анализ ниши</h3>
            <div style="padding:15px;background:#1f2530;border-radius:8px;margin:15px 0">
                <label style="color:#ffd700;font-size:14px;font-weight:bold;display:block;margin-bottom:8px">Твоя ниша:</label>
                <input type="text" id="nicheInput" placeholder="Например: Веб-разработка" style="width:100%;padding:12px;background:#0f1419;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-size:14px;margin-bottom:15px">
                <label style="color:#ffd700;font-size:14px;font-weight:bold;display:block;margin-bottom:8px">Целевая аудитория:</label>
                <input type="text" id="targetAudience" placeholder="Например: Малый бизнес" style="width:100%;padding:12px;background:#0f1419;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-size:14px">
            </div>
            <button onclick="runNicheAnalysis()" style="width:100%;padding:14px;background:linear-gradient(135deg,#ff6b6b,#ee5a6f);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer">🚀 Сгенерировать анализ</button>
            <button onclick="openProAssistant()" style="width:100%;padding:12px;background:#6c757d;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;margin-top:10px">← Назад к чату</button>
        `;
    };
    
    window.runNicheAnalysis = async function() {
        const niche = document.getElementById('nicheInput').value.trim();
        const audience = document.getElementById('targetAudience').value.trim();
        if (!niche || !audience) { alert('⚠️ Заполни оба поля!'); return; }
        
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = '<h3>📊 Анализирую нишу...</h3><div style="text-align:center;padding:30px"><div style="font-size:48px">⏳</div><p style="color:#e8ecf3">Ищу информацию в Wikipedia...</p></div>';
        
        const analysis = await analyzeNiche(niche, audience);
        const formattedAnalysis = analysis.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
        
        const safeAnalysis = analysis.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        
        modalContent.innerHTML = `
            <div style="max-height:80vh;overflow-y:auto">
                <h3>📊 Анализ ниши</h3>
                <div style="color:#e8ecf3;font-size:14px;line-height:1.6;background:#1f2530;padding:15px;border-radius:8px">
                    ${formattedAnalysis}
                    <div style="margin-top:15px;text-align:right">
                        <button onclick="copyToClipboard(this, '${safeAnalysis}')" style="background:#2a303c;border:1px solid #3ecf8e;color:#3ecf8e;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px">📋 Копировать весь анализ</button>
                    </div>
                </div>
                <button onclick="openProAssistant()" style="width:100%;padding:12px;background:#6c8cff;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;margin-top:15px">← Назад к чату</button>
            </div>
        `;
    };
    
    console.log('✅ Professional Assistant 5.0 (Premium) loaded');
})();
