// === ПРОФЕССИОНАЛЬНЫЙ УМНЫЙ ПОМОЩНИК 2.0 ===
// Отвечает на вопросы по бизнесу, клиентам, кибербезопасности, праву
// Использует локальную базу + Wikipedia API

(function() {
    'use strict';
    
    // База знаний по бизнесу и работе с клиентами
    const businessKnowledge = [
        {q: "как найти клиентов", a: "🎯 Способы привлечения клиентов:\n\n1. Холодные рассылки (email, LinkedIn)\n2. Контент-маркетинг (блог, YouTube)\n3. Сарафанное радио и реферальная программа\n4. Партнёрства с complementary-бизнесами\n5. Участие в профильных мероприятиях\n6. Таргетированная реклама\n7. Бесплатные консультации/аудит как лид-магнит\n\n💡 Ключ: решай конкретную боль клиента, а не продавай услугу."},
        {q: "боли клиентов", a: " Основные боли клиентов фрилансеров и агентств:\n\n1. Страх потерять деньги (неполучение результата)\n2. Непонимание процесса и сроков\n3. Боязнь технических сложностей\n4. Отсутствие времени разбираться\n5. Негативный опыт с предыдущими исполнителями\n6. Скрытые платежи и неожиданные расходы\n7. Отсутствие поддержки после сдачи проекта\n\n💡 Решение: давай гарантии, прозрачный процесс и пост-поддержку."},
        {q: "как продать дороже", a: "💰 Как повысить чек:\n\n1. Позиционируйся как эксперт (кейсы, отзывы, сертификаты)\n2. Продавай результат, а не процесс\n3. Предлагай пакеты (базовый/стандарт/премиум)\n4. Добавляй ценность (бонусы, консультации)\n5. Работай с возражениями заранее\n6. Показывай ROI клиента (сколько он заработает/сэкономит)\n7. Создавай дефицит (ограниченные места, дедлайны)\n\n Формула: Цена = Ценность для клиента × 10%"},
        {q: "договор с клиентом", a: "📋 Обязательные пункты договора с клиентом:\n\n1. Предмет договора (что именно делаешь)\n2. Сроки и этапы работ\n3. Стоимость и порядок оплаты\n4. Порядок приёмки работ\n5. Права на интеллектуальную собственность\n6. Ответственность сторон и штрафы\n7. Порядок расторжения\n8. Конфиденциальность (NDA)\n9. Форс-мажор\n10. Применимое право и арбитраж\n\n️ Без договора = риск неоплаты и судебных споров."},
        {q: "как работать с возражениями", a: "️ Работа с возражениями:\n\n'Дорого' → Покажи ROI и разбей на ежемесячную стоимость\n'Подумаю' → Выяви реальное возражение, предложи бонус за решение сейчас\n'У нас уже есть подрядчик' → Предложи бесплатный аудит для сравнения\n'Не уверены в результате' → Покажи кейсы, предложи поэтапную оплату\n'Сами сделаем' → Объясни стоимость их времени и рисков ошибок\n\n💡 Главное: не спорь, а выясняй реальную причину возражения."},
        {q: "кибербезопасность бизнеса", a: "🔒 Кибербезопасность для бизнеса:\n\n1. Двухфакторная аутентификация (2FA) везде\n2. Регулярные бэкапы (правило 3-2-1)\n3. Обучение сотрудников фишингу\n4. Обновление ПО и патчи безопасности\n5. Антивирус и firewall\n6. Шифрование чувствительных данных\n7. Политика паролей (менеджер паролей)\n8. Резервные копии офлайн\n9. План реагирования на инциденты\n10. Аудит безопасности раз в год\n\n⚠️ Средняя стоимость утечки данных для малого бизнеса: 200 000 - 1 000 000 ₽"},
        {q: "защита данных gdpr", a: "🇪🇺 GDPR (General Data Protection Regulation):\n\nКому применяется: всем, кто обрабатывает данные граждан ЕС\n\nОсновные требования:\n• Явное согласие на обработку данных\n• Право на удаление данных (right to be forgotten)\n• Уведомление об утечках в течение 72 часов\n• Назначение DPO (Data Protection Officer)\n• Privacy by Design\n\nШтрафы: до 20 млн € или 4% глобального оборота\n\n🇺 Аналог в РФ: 152-ФЗ 'О персональных данных' + локализация данных на серверах в России"},
        {q: "налоги для фрилансера", a: "💸 Налоги для фрилансера в РФ:\n\n1. Самозанятость (НПД):\n   • 4% с физлиц, 6% с юрлиц\n   • Лимит: 2,4 млн ₽/год\n   • Без отчётности, всё через приложение 'Мой налог'\n\n2. ИП на УСН:\n   • 6% с доходов или 15% с 'доходы минус расходы'\n   • Лимит: 265,8 млн ₽\n   • Нужна отчётность раз в год\n\n3. ИП на патенте:\n   • Фиксированный налог\n   • Лимит: 60 млн ₽\n\n💡 Для старта: самозанятость. При росте дохода → ИП на УСН 6%."},
        {q: "как масштабировать бизнес", a: "📈 Масштабирование бизнеса:\n\n1. Систематизация процессов (SOP, чек-листы)\n2. Делегирование рутины (ассистент, подрядчики)\n3. Продуктизация услуг (пакеты, подписки)\n4. Автоматизация (CRM, чат-боты, шаблоны)\n5. Пассивный доход (курсы, шаблоны, SaaS)\n6. Партнёрства и аффилиаты\n7. Выход на новые рынки/ниши\n8. Инвестиции в маркетинг (увеличение бюджета на проверенные каналы)\n\n⚠️ Главное: сначала отладь процессы на малом объёме, потом масштабируй."},
        {q: "ценообразование услуг", a: "💡 Методы ценообразования:\n\n1. Cost-plus: себестоимость + маржа (30-50%)\n2. Рыночное: как у конкурентов ± дифференциация\n3. Value-based: % от ценности для клиента (10-20% от ROI)\n4. Hourly: почасовая ставка (для нестандартных задач)\n5. Project-based: фикс за проект (предпочтительно)\n6. Retainer: ежемесячная подписка на поддержку\n\n Формула минимальной ставки:\n(Желаемый доход + Расходы) / Рабочие часы в месяц × 1.3 (на налоги и простои)"},
        {q: "социальная инженерия", a: "🎭 Социальная инженерия в кибербезопасности:\n\nМетоды атак:\n• Фишинг (поддельные письма/сайты)\n• Претекстинг (выдуманный сценарий для получения данных)\n• Байтинг (заражённые флешки/файлы)\n• Кви про кво (предложение 'помощи' для установки malware)\n• Tailgating (проход в охраняемую зону за сотрудником)\n\nЗащита:\n• Обучение сотрудников\n• Политика проверки запросов\n• Многофакторная аутентификация\n• Принцип минимальных привилегий\n\n⚠️ 95% успешных кибератак начинаются с социальной инженерии"},
        {q: "ransomware шифровальщик", a: "🦠 Ransomware (шифровальщики):\n\nКак работает:\n1. Проникает через фишинг/уязвимости\n2. Шифрует файлы на компьютере/сервере\n3. Требует выкуп (обычно в криптовалюте)\n4. Угрожает опубликовать данные (double extortion)\n\nИзвестные примеры: WannaCry, NotPetya, LockBit\n\nЗащита:\n• Регулярные бэкапы (офлайн, правило 3-2-1)\n• Обновление ПО и патчи\n• Антивирус нового поколения (EDR)\n• Сегментация сети\n• План восстановления\n\n⚠️ ФБР не рекомендует платить выкуп — не гарантирует возврат данных"},
        {q: "ddos атака защита", a: "🌊 DDoS-атаки и защита:\n\nТипы DDoS:\n• Volumetric (перегрузка канала, до 1 Tbps)\n• Protocol (SYN flood, DNS amplification)\n• Application layer (HTTP flood, медленные атаки)\n\nПризнаки атаки:\n• Резкий рост трафика\n• Недоступность сайта/сервиса\n• Замедление работы\n\nЗащита:\n• CDN (Cloudflare, Akamai)\n• DDoS-митигация от провайдера\n• Rate limiting\n• Web Application Firewall (WAF)\n• Масштабируемая инфраструктура\n\n💡 Стоимость простой для e-commerce: 10 000 - 100 000 $/час"},
        {q: "утечка данных что делать", a: "🚨 Действия при утечке данных:\n\nНемедленно (первые 24 часа):\n1. Изолировать затронутые системы\n2. Оценить масштаб утечки\n3. Сменить все пароли и ключи\n4. Уведомить руководство и юристов\n\nВ течение 72 часов:\n5. Уведомить регулятора (Роскомнадзор для ПД)\n6. Уведомить пострадавших клиентов\n7. Собрать доказательства для расследования\n8. Нанять внешних экспертов по кибербезопасности\n\nПосле:\n9. Провести пост-мортем анализ\n10. Усилить меры безопасности\n11. Обновить план реагирования\n\n⚠️ По GDPR уведомление обязательно в течение 72 часов"}
    ];
    
    // Категории вопросов
    const categories = {
        business: ['клиент', 'продаж', 'бизнес', 'деньг', 'цен', 'стоим', 'заработ', 'доход', 'прибыл', 'маркетинг', 'реклам', 'продвиж'],
        security: ['кибер', 'безопасн', 'взлом', 'атак', 'вирус', 'фишинг', 'утечк', 'данных', 'gdpr', 'шифр', 'парол', 'ddos'],
        legal: ['закон', 'прав', 'налог', 'договор', 'суд', 'штраф', 'коап', 'гк рф', 'тк рф', 'ип', 'ооо', 'самозанят'],
        general: ['привет', 'здравствуй', 'помоги', 'как', 'что', 'почему', 'когда', 'где']
    };
    
    // Определение категории вопроса
    function detectCategory(question) {
        const q = question.toLowerCase();
        let scores = {business: 0, security: 0, legal: 0};
        
        for (let cat in categories) {
            if (cat === 'general') continue;
            categories[cat].forEach(keyword => {
                if (q.includes(keyword)) scores[cat]++;
            });
        }
        
        let maxCat = 'general';
        let maxScore = 0;
        for (let cat in scores) {
            if (scores[cat] > maxScore) {
                maxScore = scores[cat];
                maxCat = cat;
            }
        }
        return maxCat;
    }
    
    // Поиск ответа в базе знаний
    function searchKnowledgeBase(question) {
        const q = question.toLowerCase();
        const words = q.split(/\s+/).filter(w => w.length > 3);
        
        let bestMatch = null;
        let bestScore = 0;
        
        businessKnowledge.forEach(item => {
            let score = 0;
            const itemText = (item.q + ' ' + item.a).toLowerCase();
            words.forEach(word => {
                if (itemText.includes(word)) score++;
            });
            if (score > bestScore) {
                bestScore = score;
                bestMatch = item;
            }
        });
        
        return bestScore >= 1 ? bestMatch : null;
    }
    
    // Поиск в legal_db
    function searchLegalDb(question, legalDataCache) {
        if (!legalDataCache || !legalDataCache.dictionary) return null;
        
        const q = question.toLowerCase();
        const words = q.split(/\s+/).filter(w => w.length > 3);
        
        let bestMatch = null;
        let bestScore = 0;
        
        legalDataCache.dictionary.forEach(term => {
            let score = 0;
            const itemText = (term.term + ' ' + term.def).toLowerCase();
            words.forEach(word => {
                if (itemText.includes(word)) score++;
            });
            if (score > bestScore) {
                bestScore = score;
                bestMatch = term;
            }
        });
        
        return bestScore >= 1 ? bestMatch : null;
    }
    
    // Поиск в Wikipedia
    async function searchWikipedia(query) {
        try {
            const url = `https://ru.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
            const response = await fetch(url);
            if (!response.ok) return null;
            const data = await response.json();
            if (data.title && data.extract) {
                return {title: data.title, extract: data.extract};
            }
        } catch (e) {
            console.log('Wikipedia search failed:', e);
        }
        return null;
    }
    
    // Генерация ответа
    async function generateAnswer(question, legalDataCache) {
        const category = detectCategory(question);
        const kbAnswer = searchKnowledgeBase(question);
        const legalAnswer = searchLegalDb(question, legalDataCache);
        
        let response = '';
        let sources = [];
        
        // Приветствие
        if (question.toLowerCase().match(/^(привет|здравствуй|хай|hello)/)) {
            response = '👋 Привет! Я профессиональный умный помощник SoloDev.\n\nМогу помочь с:\n• 💼 Бизнесом и работой с клиентами\n• 🔒 Кибербезопасностью\n• ⚖️ Правом и налогами\n• 📊 Анализом ниш и генерацией КП\n\nЗадай любой вопрос!';
            return response;
        }
        
        // Ответ из базы знаний
        if (kbAnswer) {
            response += kbAnswer.a + '\n\n';
            sources.push('💾 База знаний SoloDev');
        }
        
        // Ответ из юридической базы
        if (legalAnswer) {
            response += `⚖️ **${legalAnswer.term}**\n${legalAnswer.def}\n\n`;
            sources.push('📚 Юридическая база');
        }
        
        // Если ничего не нашли в локальных базах
        if (!kbAnswer && !legalAnswer) {
            response += `🤔 По запросу "${question}" в локальных базах точного ответа не найдено.\n\n`;
            response += '💡 Попробуй переформулировать вопрос или использовать ключевые слова:\n';
            response += '• Для бизнеса: "клиенты", "продажи", "цены"\n';
            response += '• Для кибербезопасности: "взлом", "фишинг", "ddos"\n';
            response += '• Для права: "налоги", "договор", "штрафы"\n\n';
        }
        
        // Поиск в Wikipedia для актуальности
        const wikiResult = await searchWikipedia(question);
        if (wikiResult) {
            response += `🌐 **Актуальная информация из Wikipedia:**\n\n**${wikiResult.title}**\n${wikiResult.extract}\n\n`;
            sources.push('🌐 Wikipedia');
        }
        
        // Источники
        if (sources.length > 0) {
            response += `📎 Источники: ${sources.join(', ')}`;
        }
        
        return response;
    }
    
    // Глобальные функции
    window.openProAssistant = function() {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');
        
        if (!modal || !modalContent) {
            alert('❌ Модальное окно не найдено. Проверь, что index.html загружен корректно.');
            return;
        }
        
        modalContent.innerHTML = `
            <div style="max-height:80vh;display:flex;flex-direction:column">
                <h3 style="margin:0 0 15px 0">🤖 Профессиональный помощник SoloDev</h3>
                <div style="font-size:12px;color:#6c8cff;margin-bottom:10px">
                    Спрашивай о бизнесе, клиентах, кибербезопасности, праве и налогах
                </div>
                <div id="chatHistory" style="flex:1;overflow-y:auto;max-height:50vh;background:#0f1419;border-radius:8px;padding:15px;margin-bottom:15px;min-height:200px">
                    <div style="color:#e8ecf3;font-size:14px;line-height:1.6">
                        👋 Привет! Я профессиональный помощник.<br><br>
                        Могу помочь с:<br>
                        • 💼 Бизнесом и клиентами<br>
                        • 🔒 Кибербезопасностью<br>
                        • ⚖️ Правом и налогами<br>
                        • 📊 Анализом ниш<br><br>
                        Задай вопрос!
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
                <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
                    <button onclick="quickQuestion('Как найти клиентов?')" style="padding:6px 12px;background:#1f2530;border:1px solid #6c8cff;border-radius:12px;color:#6c8cff;font-size:11px;cursor:pointer">🎯 Клиенты</button>
                    <button onclick="quickQuestion('Кибербезопасность бизнеса')" style="padding:6px 12px;background:#1f2530;border:1px solid #3ecf8e;border-radius:12px;color:#3ecf8e;font-size:11px;cursor:pointer">🔒 Безопасность</button>
                    <button onclick="quickQuestion('Налоги для фрилансера')" style="padding:6px 12px;background:#1f2530;border:1px solid #ffd700;border-radius:12px;color:#ffd700;font-size:11px;cursor:pointer"> Налоги</button>
                    <button onclick="quickQuestion('Как продать дороже?')" style="padding:6px 12px;background:#1f2530;border:1px solid #ff6b6b;border-radius:12px;color:#ff6b6b;font-size:11px;cursor:pointer">💰 Продажи</button>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
        
        // Фокус на поле ввода
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
        
        // Добавляем вопрос пользователя
        history.innerHTML += `
            <div style="margin:15px 0;text-align:right">
                <div style="display:inline-block;background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;padding:10px 15px;border-radius:12px 12px 4px 12px;font-size:14px;max-width:80%">
                    ${question}
                </div>
            </div>
        `;
        
        input.value = '';
        history.scrollTop = history.scrollHeight;
        
        // Показываем индикатор загрузки
        history.innerHTML += `
            <div id="typingIndicator" style="margin:10px 0;color:#6c8cff;font-size:13px">
                🤖 Печатает...
            </div>
        `;
        history.scrollTop = history.scrollHeight;
        
        // Генерируем ответ
        const answer = await generateAnswer(question, window.legalDataCache);
        
        // Удаляем индикатор
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
        
        // Добавляем ответ (форматируем markdown-подобный текст)
        const formattedAnswer = answer
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
            .replace(/\n/g, '<br>');
        
        history.innerHTML += `
            <div style="margin:15px 0">
                <div style="display:inline-block;background:#1f2530;color:#e8ecf3;padding:10px 15px;border-radius:12px 12px 12px 4px;font-size:14px;max-width:80%;line-height:1.6">
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
    
    console.log('✅ Professional Assistant 2.0 loaded');
})();
// === КОНЕЦ ПРОФЕССИОНАЛЬНОГО ПОМОЩНИКА ===
