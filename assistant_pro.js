// === ПРОФЕССИОНАЛЬНЫЙ УМНЫЙ ПОМОЩНИК 3.0 ===
// Множественные источники: Wikipedia + DuckDuckGo + локальная база
// Умный анализ вопросов, генерация ответов, анализ ниш

(function() {
    'use strict';
    
    // === РАСШИРЕННАЯ БАЗА ЗНАНИЙ ===
    const knowledgeBase = {
        business: [
            {keywords: ['клиент', 'клиентам', 'клиентов'], answer: "🎯 **Работа с клиентами:**\n\n**Привлечение:**\n• Холодные рассылки с персонализацией\n• Контент-маркетинг (экспертные статьи, кейсы)\n• Реферальная программа (скидка за рекомендацию)\n• Партнёрства с неконкурирующими бизнесами\n• Бесплатный аудит/консультация как лид-магнит\n\n**Удержание:**\n• Регулярные чекапы и отчёты\n• Прозрачная коммуникация\n• Бонусы за лояльность\n• Быстрое решение проблем\n\n💡 **Главное:** клиент платит за решение боли, а не за твоё время."},
            {keywords: ['боль', 'боли', 'проблем'], answer: "🔥 **Типичные боли клиентов:**\n\n1. **Страх потери денег** — нет гарантий результата\n2. **Негативный опыт** — обманули предыдущие подрядчики\n3. **Непонимание процесса** — не знают, что и зачем\n4. **Нет времени** — хотят 'под ключ'\n5. **Скрытые платежи** — боятся неожиданных расходов\n6. **Техническая сложность** — не разбираются в теме\n7. **Отсутствие поддержки** — бросают после сдачи\n\n💡 **Решение:** давай гарантии, прозрачные этапы, фиксированную цену и пост-поддержку."},
            {keywords: ['продаж', 'продать', 'чек', 'дороже'], answer: "💰 **Как продавать дороже:**\n\n1. **Позиционирование** — эксперт, а не исполнитель\n2. **Продавай результат** — не 'сделаю сайт', а 'увеличу конверсию на 30%'\n3. **Пакеты услуг** — базовый/стандарт/премиум\n4. **Социальное доказательство** — кейсы, отзывы, цифры\n5. **Ограничение** — 'беру 2 проекта в месяц'\n6. **Добавочная ценность** — бонусы, консультации, поддержка\n7. **ROI** — покажи, сколько клиент заработает/сэкономит\n\n **Формула цены:** (Желаемый доход + Расходы) / Часы × 1.3"},
            {keywords: ['возражен', 'отказ', 'дорого', 'подумаю'], answer: "🛡️ **Работа с возражениями:**\n\n**'Дорого'** → Разбей на месяцы: 'Это 5000₽/мес, а принесёт 50000₽'\n**'Подумаю'** → Выяви реальную причину: 'Что именно смущает?'\n**'У нас есть подрядчик'** → 'Предложу бесплатный аудит для сравнения'\n**'Сами сделаем'** → 'Сколько стоит ваше время? Ошибки дороже'\n**'Нет бюджета'** → 'Давайте начнём с минимального пакета'\n\n💡 **Правило:** не спорь, а выясняй реальное возражение за ним."},
            {keywords: ['масштаб', 'рост', 'развитие'], answer: "📈 **Масштабирование бизнеса:**\n\n1. **Систематизация** — SOP, чек-листы, шаблоны\n2. **Делегирование** — ассистент, подрядчики на рутину\n3. **Продуктизация** — пакеты, подписки, продукты\n4. **Автоматизация** — CRM, боты, автоворонки\n5. **Пассивный доход** — курсы, шаблоны, SaaS\n6. **Команда** — найм и обучение специалистов\n7. **Новые рынки** — география, ниши, каналы\n\n⚠️ **Сначала отладь процессы на малом объёме, потом масштабируй!"},
            {keywords: ['договор', 'контракт', 'оферта'], answer: "📋 **Обязательные пункты договора:**\n\n1. Предмет (что именно делаешь)\n2. Сроки и этапы с дедлайнами\n3. Стоимость и порядок оплаты\n4. Порядок приёмки и правки\n5. Права на интеллектуальную собственность\n6. Ответственность и штрафы\n7. Конфиденциальность (NDA)\n8. Форс-мажор\n9. Порядок расторжения\n10. Применимое право и арбитраж\n\n⚖️ **Без договора = риск неоплаты и судов. Всегда подписывай!**"},
            {keywords: ['налог', 'налоги', 'ндс', 'ндфл'], answer: "💸 **Налоги для фрилансера в РФ:**\n\n**Самозанятость (НПД):**\n• 4% с физлиц, 6% с юрлиц\n• Лимит: 2,4 млн ₽/год\n• Без отчётности, приложение 'Мой налог'\n\n**ИП на УСН:**\n• 6% с доходов или 15% с 'доходы-расходы'\n• Лимит: 265,8 млн ₽\n• Отчётность раз в год\n\n**ИП на патенте:**\n• Фиксированный налог\n• Лимит: 60 млн ₽\n\n💡 **Старт:** самозанятость → при росте ИП УСН 6%"},
            {keywords: ['реклам', 'маркетинг', 'продвиж'], answer: "📢 **Каналы продвижения:**\n\n**Бесплатные:**\n• Контент-маркетинг (блог, YouTube, Telegram)\n• SEO-оптимизация\n• Соцсети (экспертный контент)\n• Сарафанное радио\n• Партнёрства\n\n**Платные:**\n• Таргет (VK, Telegram Ads)\n• Контекст (Яндекс.Директ)\n• Influencer-маркетинг\n• Нативная реклама\n\n💡 **Для B2B:** LinkedIn, экспертные статьи, кейсы\n **Для B2C:** Instagram, TikTok, таргет"}
        ],
        security: [
            {keywords: ['кибер', 'безопасн', 'защит'], answer: "🔒 **Кибербезопасность для бизнеса:**\n\n**Базовый уровень:**\n• 2FA везде (Google Authenticator)\n• Менеджер паролей (Bitwarden, 1Password)\n• Регулярные обновления ПО\n• Антивирус + firewall\n• Бэкапы по правилу 3-2-1\n\n**Продвинутый:**\n• SIEM-система для мониторинга\n• Пентест раз в год\n• Обучение сотрудников фишингу\n• Политика минимальных привилегий\n• План реагирования на инциденты\n\n️ **Средняя стоимость утечки для малого бизнеса: 200 000 - 1 000 000 ₽**"},
            {keywords: ['фишинг', 'мошенник', 'обман'], answer: "🎣 **Фишинг и защита:**\n\n**Виды атак:**\n• Email-фишинг (поддельные письма)\n• Spear-phishing (целевой, с персонализацией)\n• Vishing (голосовой фишинг по телефону)\n• Smishing (SMS-фишинг)\n• Clone phishing (копия легитимного письма)\n\n**Признаки фишинга:**\n• Срочность ('срочно подтвердите!')\n• Подозрительные ссылки\n• Ошибки в тексте\n• Просьба конфиденциальных данных\n\n**Защита:**\n• Обучение сотрудников\n• DMARC, SPF, DKIM для домена\n• Фильтры спама\n• 2FA\n• Принцип 'проверь, потом кликни'"},
            {keywords: ['ddos', 'атак', 'взлом'], answer: "🌊 **DDoS-атаки:**\n\n**Типы:**\n• Volumetric (перегрузка канала)\n• Protocol (SYN flood)\n• Application layer (HTTP flood)\n\n**Признаки:**\n• Резкий рост трафика\n• Недоступность сайта\n• Замедление работы\n\n**Защита:**\n• Cloudflare (бесплатный план)\n• Rate limiting на сервере\n• WAF (Web Application Firewall)\n• CDN для распределения нагрузки\n• Масштабируемая инфраструктура\n\n💡 **Стоимость простоя e-commerce: 10 000 - 100 000 $/час**"},
            {keywords: ['утечк', 'данных', 'персональн'], answer: "🚨 **Утечка данных — действия:**\n\n**Первые 24 часа:**\n1. Изолировать затронутые системы\n2. Оценить масштаб\n3. Сменить все пароли и ключи\n4. Уведомить руководство и юристов\n\n**72 часа:**\n5. Уведомить Роскомнадзор (для ПД)\n6. Уведомить пострадавших\n7. Собрать доказательства\n8. Нанять экспертов по ИБ\n\n**После:**\n9. Пост-мортем анализ\n10. Усиление защиты\n11. Обновление плана реагирования\n\n⚠️ **Штрафы по 152-ФЗ: до 500 000 ₽, по GDPR: до 20 млн €**"},
            {keywords: ['gdpr', '152-фз', 'персональн'], answer: " **GDPR и 152-ФЗ:**\n\n**GDPR (ЕС):**\n• Явное согласие на обработку\n• Право на удаление (right to be forgotten)\n• Уведомление об утечках за 72 часа\n• DPO (Data Protection Officer)\n• Штрафы: до 20 млн € или 4% оборота\n\n**152-ФЗ (РФ):**\n• Локализация данных на серверах в РФ\n• Уведомление Роскомнадзора\n• Согласие на обработку ПД\n• Штрафы: до 500 000 ₽\n\n💡 **Для сайтов:** политика конфиденциальности + согласие на cookies + оферта"},
            {keywords: ['ransomware', 'шифровальщик', 'выкуп'], answer: "🦠 **Ransomware (шифровальщики):**\n\n**Как работает:**\n1. Проникает через фишинг/уязвимости\n2. Шифрует файлы\n3. Требует выкуп в криптовалюте\n4. Угрожает опубликовать данные\n\n**Известные:** WannaCry, NotPetya, LockBit\n\n**Защита:**\n• Бэкапы офлайн (правило 3-2-1)\n• Обновления и патчи\n• EDR (Endpoint Detection and Response)\n• Сегментация сети\n• План восстановления\n\n⚠️ **ФБР не рекомендует платить выкуп!**"},
            {keywords: ['парол', 'аутентификац', '2fa'], answer: "🔑 **Пароли и аутентификация:**\n\n**Правила паролей:**\n• Минимум 12 символов\n• Уникальный для каждого сервиса\n• Менеджер паролей (Bitwarden, 1Password)\n• Никаких '123456' и 'password'\n\n**2FA/MFA:**\n• SMS (базовый уровень)\n• TOTP (Google Authenticator, Authy)\n• Hardware key (YubiKey) — максимум защиты\n\n**Биометрия:**\n• Отпечаток пальца\n• Face ID\n• Удобно, но не абсолютно безопасно\n\n💡 **Включи 2FA везде, где возможно!**"}
        ],
        legal: [
            {keywords: ['ип', 'ооо', 'регистрац', 'бизнес'], answer: "🏢 **Регистрация бизнеса:**\n\n**Самозанятость:**\n• Регистрация за 5 минут в приложении\n• Лимит: 2,4 млн ₽/год\n• 4-6% налог\n\n**ИП:**\n• Госпошлина: 800 ₽ (или бесплатно через Госуслуги)\n• Срок: 3-5 дней\n• УСН 6% или патент\n\n**ООО:**\n• Госпошлина: 4000 ₽\n• Уставный капитал: от 10 000 ₽\n• Сложнее учёт и отчётность\n\n💡 **Для фрилансера:** начни с самозанятости, при росте → ИП"},
            {keywords: ['договор', 'сделк', 'контракт'], answer: " **Виды договоров:**\n\n**Для фрилансера:**\n• Договор возмездного оказания услуг\n• Договор подряда\n• Лицензионный договор (для ПО)\n• NDA (конфиденциальность)\n\n**Обязательные пункты:**\n• Предмет, сроки, цена\n• Порядок приёмки\n• Права на результат\n• Ответственность\n• Форс-мажор\n• Применимое право\n\n️ **Всегда подписывай договор! Устные договорённости = риски.**"},
            {keywords: ['штраф', 'ответственн', 'нарушен'], answer: "⚖️ **Ответственность бизнеса:**\n\n**Административная:**\n• Штрафы до 500 000 ₽ (ПД, реклама)\n• Приостановление деятельности до 90 дней\n• Дисквалификация директора\n\n**Гражданская:**\n• Возмещение убытков\n• Неустойка по договору\n• Компенсация морального вреда\n\n**Уголовная:**\n• Уклонение от налогов (ст. 198-199 УК)\n• Мошенничество (ст. 159 УК)\n• Нарушение авторских прав (ст. 146 УК)\n\n💡 **Страхование ответственности снижает риски!**"}
        ]
    };
    
    // === ПОИСК В ИНТЕРНЕТЕ ===
    async function searchWikipedia(query) {
        try {
            // Сначала ищем страницу
            const searchUrl = `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=3`;
            const searchResp = await fetch(searchUrl);
            const searchData = await searchResp.json();
            
            if (searchData.query && searchData.query.search && searchData.query.search.length > 0) {
                const title = searchData.query.search[0].title;
                // Получаем краткое содержание
                const summaryUrl = `https://ru.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
                const summaryResp = await fetch(summaryUrl);
                const summaryData = await summaryResp.json();
                
                if (summaryData.extract) {
                    return {
                        title: summaryData.title,
                        extract: summaryData.extract,
                        url: summaryData.content_urls?.desktop?.page || ''
                    };
                }
            }
        } catch (e) {
            console.log('Wikipedia search error:', e);
        }
        return null;
    }
    
    async function searchDuckDuckGo(query) {
        try {
            const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
            const resp = await fetch(url);
            const data = await resp.json();
            
            if (data.AbstractText) {
                return {
                    title: data.Heading || query,
                    extract: data.AbstractText,
                    url: data.AbstractURL || ''
                };
            }
            
            // Пробуем связанные темы
            if (data.RelatedTopics && data.RelatedTopics.length > 0) {
                const topic = data.RelatedTopics[0];
                if (topic.Text) {
                    return {
                        title: topic.Text.split(' - ')[0] || query,
                        extract: topic.Text,
                        url: topic.FirstURL || ''
                    };
                }
            }
        } catch (e) {
            console.log('DuckDuckGo search error:', e);
        }
        return null;
    }
    
    // === УМНЫЙ ПОИСК В БАЗЕ ЗНАНИЙ ===
    function searchKnowledgeBase(question) {
        const q = question.toLowerCase();
        const words = q.split(/\s+/).filter(w => w.length > 2);
        
        let bestMatch = null;
        let bestScore = 0;
        
        for (let category in knowledgeBase) {
            knowledgeBase[category].forEach(item => {
                let score = 0;
                item.keywords.forEach(keyword => {
                    if (q.includes(keyword)) score += 2;
                });
                words.forEach(word => {
                    if (q.includes(word)) score += 1;
                });
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = item;
                }
            });
        }
        
        return bestScore >= 2 ? bestMatch : null;
    }
    
    // === ПОИСК В ЮРИДИЧЕСКОЙ БАЗЕ ===
    function searchLegalDb(question, legalDataCache) {
        if (!legalDataCache || !legalDataCache.dictionary) return [];
        
        const q = question.toLowerCase();
        const words = q.split(/\s+/).filter(w => w.length > 3);
        
        return legalDataCache.dictionary.filter(term => {
            const searchText = (term.term + ' ' + term.def).toLowerCase();
            return words.some(word => searchText.includes(word));
        }).slice(0, 3);
    }
    
    // === ГЕНЕРАЦИЯ ОТВЕТА ===
    async function generateAnswer(question, legalDataCache) {
        const q = question.toLowerCase();
        
        // Приветствие
        if (q.match(/^(привет|здравствуй|хай|hello|hi)/)) {
            return " **Привет! Я профессиональный помощник SoloDev 3.0**\n\nМогу помочь с:\n• 💼 Бизнесом и клиентами\n• 🔒 Кибербезопасностью\n• ⚖️ Правом и налогами\n• 🌐 Актуальной информацией из интернета\n• 📊 Анализом ниш\n\nЗадай любой вопрос!";
        }
        
        let response = '';
        let sources = [];
        
        // 1. Поиск в локальной базе знаний
        const kbMatch = searchKnowledgeBase(question);
        if (kbMatch) {
            response += kbMatch.answer + '\n\n';
            sources.push('💾 База знаний SoloDev');
        }
        
        // 2. Поиск в юридической базе
        const legalMatches = searchLegalDb(question, legalDataCache);
        if (legalMatches.length > 0) {
            response += '⚖️ **Из юридической базы:**\n\n';
            legalMatches.forEach(term => {
                response += `• **${term.term}**: ${term.def}\n\n`;
            });
            sources.push('📚 Юридическая база');
        }
        
        // 3. Поиск в Wikipedia (параллельно с DuckDuckGo)
        const [wikiResult, ddgResult] = await Promise.all([
            searchWikipedia(question),
            searchDuckDuckGo(question)
        ]);
        
        if (wikiResult) {
            response += `🌐 **Wikipedia: ${wikiResult.title}**\n${wikiResult.extract}\n\n`;
            sources.push('🌐 Wikipedia');
        }
        
        if (ddgResult && (!wikiResult || ddgResult.title !== wikiResult.title)) {
            response += ` **DuckDuckGo: ${ddgResult.title}**\n${ddgResult.extract}\n\n`;
            sources.push(' DuckDuckGo');
        }
        
        // Если ничего не нашли
        if (!kbMatch && legalMatches.length === 0 && !wikiResult && !ddgResult) {
            response += `🤔 По запросу "${question}" не нашёл точного ответа.\n\n`;
            response += '💡 **Попробуй:**\n';
            response += '• Переформулировать вопрос\n';
            response += '• Использовать ключевые слова: "клиенты", "кибербезопасность", "налоги"\n';
            response += '• Задать более конкретный вопрос\n\n';
        }
        
        // Источники
        if (sources.length > 0) {
            response += `📎 **Источники:** ${sources.join(', ')}`;
        }
        
        return response;
    }
    
    // === АНАЛИЗ НИШИ ===
    async function analyzeNiche(niche, audience) {
        let response = `📊 **Анализ ниши: ${niche}**\n`;
        response += `🎯 **Целевая аудитория:** ${audience}\n\n`;
        
        // Боли клиентов
        response += ' **Боли клиентов:**\n';
        response += '• Страх потерять деньги и не получить результат\n';
        response += '• Негативный опыт с предыдущими подрядчиками\n';
        response += '• Непонимание технического процесса\n';
        response += '• Отсутствие времени разбираться самостоятельно\n';
        response += '• Боязнь скрытых платежей и неожиданных расходов\n\n';
        
        // Коммерческое решение
        response += ' **Твоё решение:**\n';
        response += `Пакет "${niche} под ключ":\n`;
        response += '✅ Разработка/настройка\n';
        response += '✅ Полная юридическая защита\n';
        response += '✅ Техническая поддержка\n';
        response += '✅ Обучение и документация\n\n';
        
        // Поиск актуальных трендов
        const trends = await searchWikipedia(niche + ' тренды');
        if (trends) {
            response += `📈 **Актуальная информация:**\n${trends.extract}\n\n`;
        }
        
        // Скрипт для клиента
        response += '📝 **Скрипт для первого контакта:**\n';
        response += `"Здравствуйте! Вижу, вы развиваете ${audience}. Многие сталкиваются с проблемами при выборе подрядчика. Я специализируюсь на ${niche} и предлагаю комплексное решение с гарантиями. Могу провести бесплатный аудит. Удобно созвониться?"\n\n`;
        
        return response;
    }
    
    // === ГЛОБАЛЬНЫЕ ФУНКЦИИ ===
    window.openProAssistant = function() {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');
        
        if (!modal || !modalContent) {
            alert('❌ Модальное окно не найдено');
            return;
        }
        
        modalContent.innerHTML = `
            <div style="max-height:85vh;display:flex;flex-direction:column">
                <h3 style="margin:0 0 10px 0">🤖 Профессиональный помощник 3.0</h3>
                <div style="font-size:12px;color:#6c8cff;margin-bottom:10px">
                    Бизнес • Кибербезопасность • Право • Интернет
                </div>
                <div id="chatHistory" style="flex:1;overflow-y:auto;max-height:55vh;background:#0f1419;border-radius:8px;padding:15px;margin-bottom:15px;min-height:250px">
                    <div style="color:#e8ecf3;font-size:14px;line-height:1.6">
                        👋 <b>Привет! Я умный помощник 3.0</b><br><br>
                        Могу помочь с:<br>
                        • 💼 Бизнесом и клиентами<br>
                        • 🔒 Кибербезопасностью<br>
                        • ⚖️ Правом и налогами<br>
                        • 🌐 Поиском в интернете<br>
                        •  Анализом ниш<br><br>
                        Задай вопрос или выбери тему ниже!
                    </div>
                </div>
                <div style="display:flex;gap:10px">
                    <input type="text" id="chatInput" placeholder="Задай вопрос..." 
                        style="flex:1;padding:12px;background:#1f2530;border:1px solid #6c8cff;border-radius:6px;color:#fff;font-size:14px"
                        onkeypress="if(event.key==='Enter')sendChatMessage()">
                    <button onclick="sendChatMessage()" 
                        style="padding:12px 20px;background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;font-weight:bold">
                        ➤
                    </button>
                </div>
                <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">
                    <button onclick="quickQuestion('Как найти клиентов?')" style="padding:6px 10px;background:#1f2530;border:1px solid #6c8cff;border-radius:12px;color:#6c8cff;font-size:11px;cursor:pointer">🎯 Клиенты</button>
                    <button onclick="quickQuestion('Кибербезопасность бизнеса')" style="padding:6px 10px;background:#1f2530;border:1px solid #3ecf8e;border-radius:12px;color:#3ecf8e;font-size:11px;cursor:pointer"> Безопасность</button>
                    <button onclick="quickQuestion('Налоги для фрилансера')" style="padding:6px 10px;background:#1f2530;border:1px solid #ffd700;border-radius:12px;color:#ffd700;font-size:11px;cursor:pointer">💸 Налоги</button>
                    <button onclick="quickQuestion('Как продать дороже?')" style="padding:6px 10px;background:#1f2530;border:1px solid #ff6b6b;border-radius:12px;color:#ff6b6b;font-size:11px;cursor:pointer">💰 Продажи</button>
                    <button onclick="quickQuestion('GDPR и персональные данные')" style="padding:6px 10px;background:#1f2530;border:1px solid #9d6cff;border-radius:12px;color:#9d6cff;font-size:11px;cursor:pointer">📜 GDPR</button>
                    <button onclick="quickQuestion('DDoS атака защита')" style="padding:6px 10px;background:#1f2530;border:1px solid #ff9500;border-radius:12px;color:#ff9500;font-size:11px;cursor:pointer">🌊 DDoS</button>
                </div>
                <button onclick="openNicheAnalysis()" style="margin-top:10px;padding:10px;background:linear-gradient(135deg,#ff6b6b,#ee5a6f);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:bold">
                    📊 Анализ ниши и генерация КП
                </button>
            </div>
        `;
        
        modal.style.display = 'flex';
        setTimeout(() => {
            const input = document.getElementById('chatInput');
            if (input) input.focus();
        }, 100);
    };
    
    window.sendChatMessage = async function() {
        const input = document.getElementById('chatInput');
        const history = document.getElementById('chatHistory');
        
        if (!input || !history) return;
        
        const question = input.value.trim();
        if (!question) return;
        
        // Вопрос пользователя
        history.innerHTML += `
            <div style="margin:15px 0;text-align:right">
                <div style="display:inline-block;background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;padding:10px 15px;border-radius:12px 12px 4px 12px;font-size:14px;max-width:80%">
                    ${question}
                </div>
            </div>
        `;
        
        input.value = '';
        history.scrollTop = history.scrollHeight;
        
        // Индикатор
        history.innerHTML += `<div id="typingIndicator" style="margin:10px 0;color:#6c8cff;font-size:13px"> Ищу информацию...</div>`;
        history.scrollTop = history.scrollHeight;
        
        // Генерация ответа
        const answer = await generateAnswer(question, window.legalDataCache);
        
        // Удаляем индикатор
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
        
        // Форматирование
        const formattedAnswer = answer
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
            .replace(/\n/g, '<br>');
        
        history.innerHTML += `
            <div style="margin:15px 0">
                <div style="display:inline-block;background:#1f2530;color:#e8ecf3;padding:10px 15px;border-radius:12px 12px 12px 4px;font-size:14px;max-width:85%;line-height:1.6">
                    ${formattedAnswer}
                </div>
            </div>
        `;
        
        history.scrollTop = history.scrollHeight;
    };
    
    window.quickQuestion = function(question) {
        const input = document.getElementById('chatInput');
        if (input) {
            input.value = question;
            sendChatMessage();
        }
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
            <button onclick="runNicheAnalysis()" style="width:100%;padding:14px;background:linear-gradient(135deg,#ff6b6b,#ee5a6f);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer"> Сгенерировать анализ</button>
            <button onclick="openProAssistant()" style="width:100%;padding:12px;background:#6c757d;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;margin-top:10px">← Назад к чату</button>
        `;
    };
    
    window.runNicheAnalysis = async function() {
        const niche = document.getElementById('nicheInput').value.trim();
        const audience = document.getElementById('targetAudience').value.trim();
        
        if (!niche || !audience) {
            alert('⚠️ Заполни оба поля!');
            return;
        }
        
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = '<h3>📊 Анализирую нишу...</h3><div style="text-align:center;padding:30px"><div style="font-size:48px">⏳</div><p style="color:#e8ecf3">Ищу информацию в интернете...</p></div>';
        
        const analysis = await analyzeNiche(niche, audience);
        const formattedAnalysis = analysis.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
        
        modalContent.innerHTML = `
            <div style="max-height:80vh;overflow-y:auto">
                <h3> Анализ ниши</h3>
                <div style="color:#e8ecf3;font-size:14px;line-height:1.6">${formattedAnalysis}</div>
                <button onclick="openProAssistant()" style="width:100%;padding:12px;background:#6c8cff;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;margin-top:15px">← Назад к чату</button>
            </div>
        `;
    };
    
    console.log('✅ Professional Assistant 3.0 loaded with internet search');
})();
// === КОНЕЦ ПРОФЕССИОНАЛЬНОГО ПОМОЩНИКА 3.0 ===
