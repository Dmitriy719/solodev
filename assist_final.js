// === ПРОФЕССИОНАЛЬНЫЙ УМНЫЙ ПОМОЩНИК 5.0 (PREMIUM) ===
(function() {
    'use strict';
    const knowledgeBase = {
        business: [
            {keywords: ['клиент', 'клиентам', 'клиентов', 'привлеч', 'лид'], answer: "🎯 **Привлечение клиентов:**\n\n**Быстрые методы:**\n• Холодные рассылки с персонализацией\n• Таргет (VK, Telegram Ads)\n• Партнёрства с неконкурирующими нишами\n• Бесплатный аудит как лид-магнит\n\n**Долгосрочные:**\n• Контент-маркетинг (кейсы с цифрами)\n• SEO и личный бренд\n• Реферальная программа\n\n💡 Клиент покупает не услугу, а решение своей боли. Продавай результат!"},
            {keywords: ['боль', 'боли', 'проблем', 'страх', 'возражен'], answer: "🔥 **Топ болей клиентов и решения:**\n\n1. 'Обманут в прошлый раз' → Давай гарантию возврата или поэтапную оплату.\n2. 'Скрытые платежи' → Фиксируй цену в договоре, прописывай, что НЕ входит.\n3. 'Сорвут сроки' → Добавь в договор штраф для СЕБЯ за просрочку (это резко повышает доверие).\n4. 'Не разбираюсь в теме' → Говори на языке выгоды, а не тех. терминов.\n5. 'Пропадет после оплаты' → Обещай и давай еженедельные отчёты."},
            {keywords: ['продаж', 'продать', 'чек', 'дороже', 'цен'], answer: "💰 **Как продавать дороже:**\n\n1. **Якорение**: давай 3 варианта (Базовый, Стандарт, Премиум).\n2. **Продавай ROI**: 'Это стоит 100к, но принесёт 300к прибыли'.\n3. **Дефицит**: 'Беру 2 проекта в месяц, осталось 1 место'.\n4. **Бонусы вместо скидок**: не снижай цену, добавь ценность ('поддержка 1 мес. в подарок').\n\n📊 Формула: (Желаемый доход + Расходы) / 100 часов × 1.3"},
            {keywords: ['тз', 'техническое задание', 'требован'], answer: "📝 **Как составить идеальное ТЗ:**\n\n1. Цель проекта (какую бизнес-задачу решаем).\n2. Целевая аудитория.\n3. Функциональные требования (что конкретно работает).\n4. Этапы и сроки с контрольными точками.\n5. Критерии приёмки.\n\n⚠️ Золотое правило: всё, чего нет в ТЗ, не будет сделано. Любые изменения после утверждения = доп. соглашение и доплата."},
            {keywords: ['договор', 'оферта', 'контракт', 'соглашен'], answer: "📋 **5 смертельных ошибок в договоре:**\n\n1. Размытый предмет ('сделать сайт' вместо '5 страниц по ТЗ').\n2. Нет дедлайнов ('в кратчайшие сроки').\n3. Бесконечные правки (надо: 'включено 2 итерации, далее 1000р/час').\n4. Отсутствие авто-приёмки ('если в течение 5 дней нет отказа, работа принята').\n5. Передача прав до оплаты (права переходят только после 100% оплаты)."}
        ],
        security: [
            {keywords: ['кибер', 'безопасн', 'защит', 'взлом'], answer: "🔒 **Чек-лист кибербезопасности:**\n\n✅ 2FA на почте, хостинге, банке (не SMS, а приложение!).\n✅ Менеджер паролей (Bitwarden, 1Password).\n✅ Бэкапы по правилу 3-2-1 (3 копии, 2 носителя, 1 офлайн).\n✅ Обновления ОС и антивирус.\n\n⚠️ 95% взломов начинаются с фишинга или украденного пароля, а не с хакерских атак из фильмов."},
            {keywords: ['фишинг', 'мошенник', 'письм', 'ссылк'], answer: "🎣 **Как распознать фишинг:**\n\n• Срочность: 'Аккаунт будет заблокирован через 24 часа!'\n• Странный адрес: `support@sberbank-security.com` вместо `sberbank.ru`\n• Просьба перейти по ссылке и ввести пароль/данные карты.\n\n**Защита:** Никогда не переходи по ссылкам из писем. Заходи на сайт вручную. Включи 2FA."},
            {keywords: ['бэкап', 'backup', 'резервн', 'копи', 'потеря'], answer: "💾 **Правило бэкапов 3-2-1:**\n\n• 3 копии данных.\n• 2 разных типа носителей (диск + облако).\n• 1 копия офлайн (защита от шифровальщика).\n\n⚠️ Бэкап, который ты не проверял на восстановление, не считается бэкапом. Делай тест раз в квартал!"}
        ],
        legal: [
            {keywords: ['налог', 'налоги', 'ндс', 'ндфл', 'усн', 'самозанят'], answer: "💸 **Налоги для фрилансера (РФ):**\n\n**Самозанятость:** 4% (физлица) / 6% (юрлица). Лимит 2,4 млн ₽/год. Нет отчётности.\n**ИП УСН 6%:** Когда доход >2,4 млн или нужны сотрудники. Можно уменьшать налог на сумму взносов.\n**ИП УСН 15%:** Выгодно, если расходы >60% от оборота.\n\n💡 Никогда не принимай регулярную оплату от юрлица на личную карту — банк заблокирует счёт по 115-ФЗ."}
        ]
    };

    function cleanQuery(q) { return q.replace(/^(расскажи|объясни|что такое|как|почему|когда|где|кто|давай|пожалуйста)\s+(про|о|насчет)?\s*/i, '').trim(); }

    async function searchWikipedia(query) {
        try {
            const cleanQ = cleanQuery(query);
            const url = `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQ)}&format=json&origin=*&srlimit=2`;
            const resp = await fetch(url);
            const data = await resp.json();
            if (data.query?.search?.length > 0) {
                const title = data.query.search[0].title;
                const sumUrl = `https://ru.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
                const sumResp = await fetch(sumUrl);
                const sumData = await sumResp.json();
                if (sumData.extract && sumData.extract.length > 50) return { title: sumData.title, extract: sumData.extract };
            }
        } catch (e) { console.log('Wiki error:', e); }
        return null;
    }

    function searchKB(q) {
        const lowerQ = q.toLowerCase();
        const words = lowerQ.split(/\s+/).filter(w => w.length > 3);
        let best = null, bestScore = 0;
        for (let cat in knowledgeBase) {
            knowledgeBase[cat].forEach(item => {
                let score = 0;
                item.keywords.forEach(kw => { if (lowerQ.includes(kw)) score += 3; });
                words.forEach(w => { if (lowerQ.includes(w)) score += 1; item.keywords.forEach(kw => { if (kw.includes(w) || w.includes(kw)) score += 2; }); });
                if (score > bestScore) { bestScore = score; best = item; }
            });
        }
        return bestScore >= 3 ? best : null;
    }

    function searchLegal(q, cache) {
        if (!cache?.dictionary) return [];
        const words = q.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        return cache.dictionary.filter(t => words.some(w => (t.term + ' ' + t.def).toLowerCase().includes(w))).slice(0, 3);
    }

    async function generateAnswer(q, cache) {
        if (q.toLowerCase().match(/^(привет|здравствуй|хай|hello|hi|добрый)/)) return "👋 **Привет! Я помощник SoloDev 5.0**\n\nЯ умею:\n• 💼 Давать советы по бизнесу\n• 🔒 Объяснять кибербезопасность\n• ⚖️ Подсказывать по налогам и договорам\n• 🌐 Искать в Wikipedia\n• 📊 Анализировать ниши\n\nЗадай вопрос!";
        let res = '', sources = [];
        const kb = searchKB(q);
        if (kb) { res += kb.answer + '\n\n'; sources.push('💾 База знаний'); }
        const legal = searchLegal(q, cache);
        if (legal.length > 0) { res += '⚖️ **Из юридической базы:**\n\n' + legal.map(t => `• **${t.term}**: ${t.def}`).join('\n\n') + '\n\n'; sources.push('📚 Юр. база'); }
        const wiki = await searchWikipedia(q);
        if (wiki) { res += `🌐 **Wikipedia: ${wiki.title}**\n${wiki.extract}\n\n`; sources.push('🌐 Wikipedia'); }
        if (!kb && legal.length === 0 && !wiki) res = `🤔 Не нашёл точного ответа по запросу "${q}".\n\n💡 Попробуй: "клиенты", "налоги", "договор", "фишинг" или выбери тему ниже.`;
        if (sources.length > 0) res += `\n📎 **Источники:** ${sources.join(', ')}`;
        return res;
    }

    async function analyzeNiche(niche, audience) {
        let r = `📊 **Анализ ниши: ${niche}**\n🎯 **Аудитория:** ${audience}\n\n🔥 **Боли:**\n• Страх слить бюджет\n• Негативный опыт с прошлыми подрядчиками\n• Боязнь скрытых доплат и срыва сроков\n\n💡 **Предложение:**\nПакет "${niche} под ключ":\n✅ Гарантия результата\n✅ Юр. защита (договор, оферта)\n✅ Еженедельные отчёты\n✅ 30 дней поддержки\n\n`;
        const trends = await searchWikipedia(niche + ' тренды 2024');
        if (trends) r += `📈 **Тренды:** ${trends.extract}\n\n`;
        r += `📝 **Скрипт:**\n"Здравствуйте! Вижу, вы развиваете ${audience}. Многие сталкиваются со срывами сроков. Я специализируюсь на ${niche} и работаю по прозрачной системе с гарантиями. Могу провести бесплатный 15-минутный аудит. Удобно созвониться?"\n\n🚀 **Первые 3 шага:**\n1. Подготовь 3 кейса с цифрами.\n2. Настрой лендинг с формой.\n3. Сделай 20 точечных контактов в день.`;
        return r;
    }

    function saveHistory(html) { localStorage.setItem('soloDevChatHistory', html); }
    function loadHistory() { return localStorage.getItem('soloDevChatHistory') || `<div style="color:#e8ecf3;font-size:14px;line-height:1.6">👋 <b>Привет! Я помощник 5.0</b><br><br>Могу помочь с:<br>• 💼 Бизнесом<br>• 🔒 Безопасностью<br>• ⚖️ Правом<br>• 🌐 Wikipedia<br>• 📊 Анализом ниш<br><br>Задай вопрос!</div>`; }
    function clearHistory() { localStorage.removeItem('soloDevChatHistory'); const h = document.getElementById('chatHistory'); if (h) h.innerHTML = loadHistory(); }

    window.openProAssistant = function() {
        const m = document.getElementById('modal'), mc = document.getElementById('modalContent');
        if (!m || !mc) return;
        mc.innerHTML = `<div style="max-height:85vh;display:flex;flex-direction:column">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <h3 style="margin:0">🤖 Помощник 5.0</h3>
                    <button onclick="closeModal()" style="background:none;border:none;color:#ff6b6b;font-size:24px;cursor:pointer;padding:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center" title="Закрыть">✕</button>
                </div>
                <button onclick="clearHistory()" style="background:none;border:1px solid #ff6b6b;color:#ff6b6b;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:11px">🗑️ Очистить</button>
            </div>
            <div style="font-size:12px;color:#6c8cff;margin-bottom:10px">Бизнес • Безопасность • Право • Wikipedia</div>
            <div id="chatHistory" style="flex:1;overflow-y:auto;max-height:55vh;background:#0f1419;border-radius:8px;padding:15px;margin-bottom:15px;min-height:250px">${loadHistory()}</div>
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
        </div>`;
        m.style.display = 'flex';
        setTimeout(() => { const i = document.getElementById('chatInput'); if (i) i.focus(); }, 100);
        const h = document.getElementById('chatHistory'); if (h) h.scrollTop = h.scrollHeight;
    };

    window.sendChatMessage = async function() {
        const input = document.getElementById('chatInput'), history = document.getElementById('chatHistory');
        if (!input || !history) return;
        const q = input.value.trim(); if (!q) return;
        history.innerHTML += `<div style="margin:15px 0;text-align:right"><div style="display:inline-block;background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;padding:10px 15px;border-radius:12px 12px 4px 12px;font-size:14px;max-width:80%">${q}</div></div>`;
        input.value = ''; history.scrollTop = history.scrollHeight;
        history.innerHTML += `<div id="typingIndicator" style="margin:10px 0;color:#6c8cff;font-size:13px">🔍 Ищу...</div>`;
        history.scrollTop = history.scrollHeight;
        const ans = await generateAnswer(q, window.legalDataCache);
        const ind = document.getElementById('typingIndicator'); if (ind) ind.remove();
        const fmt = ans.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
        const safe = ans.replace(/'/g, "\'").replace(/"/g, '&quot;');
        history.innerHTML += `<div style="margin:15px 0"><div style="display:inline-block;background:#1f2530;color:#e8ecf3;padding:10px 15px;border-radius:12px 12px 12px 4px;font-size:14px;max-width:85%;line-height:1.6">${fmt}<div style="margin-top:10px;text-align:right"><button onclick="copyText(this, '${safe}')" style="background:#2a303c;border:1px solid #6c8cff;color:#6c8cff;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:11px">📋 Копировать</button></div></div></div>`;
        history.scrollTop = history.scrollHeight; saveHistory(history.innerHTML);
    };

    window.copyText = function(btn, text) {
        const txt = text.replace(/&quot;/g, '"').replace(/\\'/g, "'").replace(/<br>/g, '\n').replace(/<b>|<\/b>/g, '');
        navigator.clipboard.writeText(txt).then(() => {
            const orig = btn.innerHTML; btn.innerHTML = '✅ Скопировано!'; btn.style.borderColor = '#3ecf8e'; btn.style.color = '#3ecf8e';
            setTimeout(() => { btn.innerHTML = orig; btn.style.borderColor = '#6c8cff'; btn.style.color = '#6c8cff'; }, 2000);
        });
    };

    window.quickQuestion = function(q) { const i = document.getElementById('chatInput'); if (i) { i.value = q; sendChatMessage(); } };

    window.openNicheAnalysis = function() {
        const mc = document.getElementById('modalContent');
        mc.innerHTML = `<h3>📊 Анализ ниши</h3><div style="padding:15px;background:#1f2530;border-radius:8px;margin:15px 0">
            <label style="color:#ffd700;font-size:14px;font-weight:bold;display:block;margin-bottom:8px">Твоя ниша:</label>
            <input type="text" id="nicheInput" placeholder="Например: Веб-разработка" style="width:100%;padding:12px;background:#0f1419;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-size:14px;margin-bottom:15px">
            <label style="color:#ffd700;font-size:14px;font-weight:bold;display:block;margin-bottom:8px">Целевая аудитория:</label>
            <input type="text" id="targetAudience" placeholder="Например: Малый бизнес" style="width:100%;padding:12px;background:#0f1419;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-size:14px">
        </div>
        <button onclick="runNicheAnalysis()" style="width:100%;padding:14px;background:linear-gradient(135deg,#ff6b6b,#ee5a6f);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer">🚀 Сгенерировать</button>
        <button onclick="openProAssistant()" style="width:100%;padding:12px;background:#6c757d;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;margin-top:10px">← Назад</button>`;
    };

    window.runNicheAnalysis = async function() {
        const n = document.getElementById('nicheInput').value.trim(), a = document.getElementById('targetAudience').value.trim();
        if (!n || !a) { alert('⚠️ Заполни оба поля!'); return; }
        const mc = document.getElementById('modalContent');
        mc.innerHTML = '<h3>📊 Анализирую...</h3><div style="text-align:center;padding:30px"><div style="font-size:48px">⏳</div><p style="color:#e8ecf3">Ищу в Wikipedia...</p></div>';
        const ans = await analyzeNiche(n, a);
        const fmt = ans.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
        const safe = ans.replace(/'/g, "\'").replace(/"/g, '&quot;');
        mc.innerHTML = `<div style="max-height:80vh;overflow-y:auto"><h3>📊 Анализ ниши</h3><div style="color:#e8ecf3;font-size:14px;line-height:1.6;background:#1f2530;padding:15px;border-radius:8px">${fmt}<div style="margin-top:15px;text-align:right"><button onclick="copyText(this, '${safe}')" style="background:#2a303c;border:1px solid #3ecf8e;color:#3ecf8e;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px">📋 Копировать весь анализ</button></div></div><button onclick="openProAssistant()" style="width:100%;padding:12px;background:#6c8cff;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;margin-top:15px">← Назад</button></div>`;
    };
    console.log('✅ Assistant 5.0 Premium loaded');
})();