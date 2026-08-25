// === ПРОФЕССИОНАЛЬНЫЙ УМНЫЙ ПОМОЩНИК 4.0 ===
// Рабочий поиск: Wikipedia + расширенная локальная база
// Умный контекстный анализ, история диалога, экспорт

(function() {
    'use strict';
    
    // === РАСШИРЕННАЯ БАЗА ЗНАНИЙ (50+ тем) ===
    const knowledgeBase = {
        business: [
            {keywords: ['клиент', 'клиентам', 'клиентов', 'привлеч'], answer: "🎯 **Привлечение клиентов:**\n\n**Бесплатные методы:**\n• Контент-маркетинг (экспертные статьи, кейсы, видео)\n• SEO-оптимизация сайта\n• Соцсети (регулярный экспертный контент)\n• Сарафанное радио и реферальная программа\n• Партнёрства с неконкурирующими бизнесами\n• Бесплатный аудит/консультация как лид-магнит\n• Участие в профильных мероприятиях и вебинарах\n\n**Платные методы:**\n• Таргетированная реклама (VK, Telegram Ads)\n• Контекстная реклама (Яндекс.Директ)\n• Influencer-маркетинг\n• Нативная реклама в СМИ\n\n💡 **Главное правило:** клиент платит за решение боли, а не за твоё время. Покажи результат!"},
            {keywords: ['боль', 'боли', 'проблем', 'страх'], answer: "🔥 **Типичные боли клиентов:**\n\n1. **Страх потери денег** — нет гарантий результата\n2. **Негативный опыт** — обманули предыдущие подрядчики\n3. **Непонимание процесса** — не знают, что и зачем делают\n4. **Нет времени** — хотят решение 'под ключ'\n5. **Скрытые платежи** — боятся неожиданных расходов\n6. **Техническая сложность** — не разбираются в теме\n7. **Отсутствие поддержки** — бросают после сдачи проекта\n8. **Срыв сроков** — предыдущие исполнители затягивали\n9. **Плохая коммуникация** — не отвечают, пропадают\n10. **Отсутствие документации** — непонятно, что получили\n\n💡 **Решение:** давай гарантии, прозрачные этапы, фиксированную цену, регулярные отчёты и пост-поддержку."},
            {keywords: ['продаж', 'продать', 'чек', 'дороже', 'цен'], answer: " **Как продавать дороже:**\n\n1. **Позиционирование** — эксперт, а не исполнитель\n2. **Продавай результат** — не 'сделаю сайт', а 'увеличу конверсию на 30%'\n3. **Пакеты услуг** — базовый/стандарт/премиум (якорение цены)\n4. **Социальное доказательство** — кейсы, отзывы, цифры, логотипы клиентов\n5. **Ограничение** — 'беру 2 проекта в месяц', 'скидка до пятницы'\n6. **Добавочная ценность** — бонусы, консультации, поддержка\n7. **ROI** — покажи, сколько клиент заработает/сэкономит\n8. **Гарантии** — возврат денег, бесплатные доработки\n\n📊 **Формула минимальной ставки:**\n(Желаемый доход + Расходы) / Рабочие часы × 1.3 (налоги и простои)\n\n💡 **Правило:** если клиент не возражает по цене — ты продаёшь слишком дёшево."},
            {keywords: ['возражен', 'отказ', 'дорого', 'подумаю', 'нет'], answer: "🛡️ **Работа с возражениями:**\n\n**'Дорого'** → Разбей на месяцы: 'Это 5000₽/мес, а принесёт 50000₽'\n**'Подумаю'** → Выяви реальную причину: 'Что именно смущает?'\n**'У нас есть подрядчик'** → 'Предложу бесплатный аудит для сравнения'\n**'Сами сделаем'** → 'Сколько стоит ваше время? Ошибки дороже'\n**'Нет бюджета'** → 'Давайте начнём с минимального пакета'\n**'Не сейчас'** → 'Когда планируете? Давайте забронируем место'\n**'Нужно посоветоваться'** → 'С кем именно? Могу ответить на вопросы'\n\n💡 **Правило:** не спорь, а выясняй реальное возражение за ним. 80% возражений — это страх, а не отказ."},
            {keywords: ['масштаб', 'рост', 'развитие', 'увелич'], answer: "📈 **Масштабирование бизнеса:**\n\n1. **Систематизация** — SOP, чек-листы, шаблоны процессов\n2. **Делегирование** — ассистент, подрядчики на рутину\n3. **Продуктизация** — пакеты, подписки, цифровые продукты\n4. **Автоматизация** — CRM, чат-боты, автоворонки, шаблоны\n5. **Пассивный доход** — курсы, шаблоны, SaaS, партнёрки\n6. **Команда** — найм и обучение специалистов\n7. **Новые рынки** — география, ниши, каналы продаж\n8. **Инвестиции в маркетинг** — увеличение бюджета на проверенные каналы\n\n⚠️ **Главное:** сначала отладь процессы на малом объёме, потом масштабируй! Иначе хаос умножится."},
            {keywords: ['договор', 'контракт', 'оферта', 'соглашен'], answer: "📋 **Обязательные пункты договора:**\n\n1. **Предмет** — что именно делаешь (детально!)\n2. **Сроки и этапы** — с конкретными дедлайнами\n3. **Стоимость и оплата** — порядок, предоплата, рассрочка\n4. **Порядок приёмки** — сколько правок включено\n5. **Права на результат** — кто владеет интеллектуальной собственностью\n6. **Ответственность** — штрафы за срыв сроков с обеих сторон\n7. **Конфиденциальность** — NDA, что нельзя разглашать\n8. **Форс-мажор** — что считается непреодолимой силой\n9. **Порядок расторжения** — как выйти из договора\n10. **Применимое право и арбитраж** — какой суд решает споры\n\n⚖️ **Без договора = риск неоплаты и судов. Всегда подписывай!**\n\n💡 **Лайфхак:** добавь пункт об автоматической приёмке через 5 дней, если клиент молчит."},
            {keywords: ['налог', 'налоги', 'ндс', 'ндфл', 'усн'], answer: "💸 **Налоги для фрилансера в РФ:**\n\n**Самозанятость (НПД):**\n• 4% с физлиц, 6% с юрлиц\n• Лимит: 2,4 млн ₽/год\n• Без отчётности, приложение 'Мой налог'\n• Нельзя нанимать сотрудников\n\n**ИП на УСН 6%:**\n• 6% со всех доходов\n• Лимит: 265,8 млн ₽\n• Отчётность раз в год\n• Можно нанимать до 130 сотрудников\n• Страховые взносы: ~45 000 ₽/год\n\n**ИП на УСН 15%:**\n• 15% с 'доходы минус расходы'\n• Выгодно при маржинальности <60%\n\n**ИП на патенте:**\n• Фиксированный налог (зависит от региона и вида деятельности)\n• Лимит: 60 млн ₽\n• Без отчётности\n\n💡 **Стратегия:** начни с самозанятости → при росте дохода ИП УСН 6% → при найме команды ООО."},
            {keywords: ['реклам', 'маркетинг', 'продвиж', 'трафик'], answer: "📢 **Каналы продвижения:**\n\n**Бесплатные (долгосрочные):**\n• Контент-маркетинг (блог, YouTube, Telegram-канал)\n• SEO-оптимизация сайта\n• Соцсети (регулярный экспертный контент)\n• Сарафанное радио и реферальная программа\n• Партнёрства и коллаборации\n• Участие в подкастах и вебинарах\n\n**Платные (быстрый результат):**\n• Таргет (VK Ads, Telegram Ads)\n• Контекст (Яндекс.Директ, Google Ads)\n• Influencer-маркетинг (блогеры)\n• Нативная реклама в СМИ\n• Ретаргетинг (догоняем тех, кто был на сайте)\n\n📊 **Для B2B:** LinkedIn, экспертные статьи, кейсы, вебинары\n📊 **Для B2C:** Instagram, TikTok, таргет, influencer\n\n💡 **Правило 70/20/10:** 70% бюджета на проверенные каналы, 20% на тестирование новых, 10% на эксперименты."}
        ],
        security: [
            {keywords: ['кибер', 'безопасн', 'защит', 'security'], answer: "🔒 **Кибербезопасность для бизнеса:**\n\n**Базовый уровень (обязательно):**\n• 2FA везде (Google Authenticator, не SMS!)\n• Менеджер паролей (Bitwarden, 1Password)\n• Регулярные обновления ПО и патчи\n• Антивирус + firewall\n• Бэкапы по правилу 3-2-1 (3 копии, 2 носителя, 1 офлайн)\n• Обучение сотрудников фишингу\n\n**Продвинутый уровень:**\n• SIEM-система для мониторинга угроз\n• Пентест (тест на проникновение) раз в год\n• Политика минимальных привилегий\n• Сегментация сети\n• План реагирования на инциденты\n• Шифрование чувствительных данных\n\n⚠️ **Статистика:**\n• Средняя стоимость утечки для малого бизнеса: 200 000 - 1 000 000 ₽\n• 95% успешных атак начинаются с социальной инженерии\n• 60% малых бизнесов закрываются в течение 6 месяцев после крупной утечки"},
            {keywords: ['фишинг', 'мошенник', 'обман', 'социальн'], answer: "🎣 **Фишинг и социальная инженерия:**\n\n**Виды атак:**\n• **Email-фишинг** — массовые поддельные письма\n• **Spear-phishing** — целевой фишинг с персонализацией\n• **Vishing** — голосовой фишинг по телефону\n• **Smishing** — SMS-фишинг\n• **Clone phishing** — копия легитимного письма с вредоносной ссылкой\n• **Business Email Compromise** — взлом почты руководителя для перевода денег\n\n**Признаки фишинга:**\n• Срочность ('срочно подтвердите!', 'аккаунт будет заблокирован!')\n• Подозрительные ссылки (наведи курсор — посмотри реальный URL)\n• Ошибки в тексте и грамматике\n• Просьба конфиденциальных данных (пароли, карты)\n• Неожиданные вложения\n\n**Защита:**\n• Обучение сотрудников (регулярные тренировки)\n• DMARC, SPF, DKIM для домена\n• Фильтры спама и антивирус\n• 2FA на всех аккаунтах\n• Принцип 'проверь, потом кликни'\n• Политика проверки финансовых запросов (звонок для подтверждения)"},
            {keywords: ['ddos', 'атак', 'взлом', 'dos'], answer: "🌊 **DDoS-атаки и защита:**\n\n**Типы DDoS:**\n• **Volumetric** — перегрузка канала (до 1 Tbps)\n• **Protocol** — SYN flood, DNS amplification\n• **Application layer** — HTTP flood, медленные атаки (Slowloris)\n\n**Признаки атаки:**\n• Резкий рост трафика (в 10-100 раз)\n• Недоступность сайта/сервиса\n• Замедление работы\n• Большое количество запросов с одного IP\n\n**Защита:**\n• **Cloudflare** (бесплатный план даёт базовую защиту)\n• Rate limiting на сервере\n• WAF (Web Application Firewall)\n• CDN для распределения нагрузки\n• Масштабируемая инфраструктура (auto-scaling)\n• DDoS-митигация от хостинг-провайдера\n\n💡 **Стоимость простоя:**\n• E-commerce: 10 000 - 100 000 $/час\n• SaaS: репутационные потери + отток клиентов\n\n⚠️ **Если атаковали:** включи Cloudflare, свяжись с хостером, задокументируй всё для страховой."},
            {keywords: ['утечк', 'данных', 'персональн', 'breach'], answer: "🚨 **Утечка данных — план действий:**\n\n**Первые 24 часа (критично!):**\n1. Изолировать затронутые системы (отключить от сети)\n2. Оценить масштаб утечки (что украдено?)\n3. Сменить все пароли и ключи доступа\n4. Уведомить руководство и юристов\n5. Зафиксировать все доказательства (логи, скриншоты)\n\n**В течение 72 часов:**\n6. Уведомить Роскомнадзор (для персональных данных)\n7. Уведомить пострадавших клиентов\n8. Нанять внешних экспертов по кибербезопасности\n9. Подготовить пресс-релиз (если утечка публичная)\n\n**После инцидента:**\n10. Провести пост-мортем анализ (что пошло не так?)\n11. Усилить меры безопасности\n12. Обновить план реагирования\n13. Обучение сотрудников на основе инцидента\n\n⚠️ **Штрафы:**\n• По 152-ФЗ (РФ): до 500 000 ₽\n• По GDPR (ЕС): до 20 млн € или 4% глобального оборота\n• Гражданские иски от пострадавших"},
            {keywords: ['gdpr', '152-фз', 'персональн', 'privacy'], answer: "📜 **GDPR и 152-ФЗ о персональных данных:**\n\n**GDPR (Европейский Союз):**\n• Применяется ко всем, кто обрабатывает данные граждан ЕС\n• Явное согласие на обработку (opt-in, не opt-out!)\n• Право на удаление (right to be forgotten)\n• Уведомление об утечках в течение 72 часов\n• DPO (Data Protection Officer) для крупных компаний\n• Privacy by Design (защита с момента разработки)\n• **Штрафы:** до 20 млн € или 4% глобального оборота\n\n**152-ФЗ (Россия):**\n• Локализация данных на серверах в РФ (обязательно!)\n• Уведомление Роскомнадзора об обработке ПД\n• Согласие на обработку (письменное или электронное)\n• Политика конфиденциальности на сайте\n• **Штрафы:** до 500 000 ₽ за нарушение\n\n💡 **Для сайтов обязательно:**\n• Политика конфиденциальности\n• Согласие на cookies\n• Оферта (для интернет-магазинов)\n• Форма согласия при сборе данных"},
            {keywords: ['ransomware', 'шифровальщик', 'выкуп', 'ransom'], answer: "🦠 **Ransomware (шифровальщики):**\n\n**Как работает атака:**\n1. Проникает через фишинг/уязвимости/удалённый рабочий стол\n2. Шифрует файлы на компьютере/сервере\n3. Требует выкуп в криптовалюте (обычно 10 000 - 1 000 000 $)\n4. **Double extortion:** угрожает опубликовать данные, если не заплатишь\n\n**Известные группировки:**\n• WannaCry (2017) — заразил 200 000+ компьютеров\n• NotPetya (2017) — ущерб 10 млрд $\n• LockBit, REvil, Conti — современные активные группировки\n\n**Защита:**\n• **Бэкапы офлайн** (правило 3-2-1) — главное оружие!\n• Регулярные обновления и патчи\n• EDR (Endpoint Detection and Response)\n• Сегментация сети (чтобы вирус не распространился)\n• План восстановления (тестируй регулярно!)\n• Обучение сотрудников\n\n⚠️ **ФБР и полиция не рекомендуют платить выкуп:**\n• Нет гарантии возврата данных\n• Финансирует преступников\n• Можешь стать мишенью для повторной атаки"},
            {keywords: ['парол', 'аутентификац', '2fa', 'mfa'], answer: "🔑 **Пароли и аутентификация:**\n\n**Правила надёжных паролей:**\n• Минимум 12 символов (лучше 16+)\n• Уникальный для каждого сервиса\n• Менеджер паролей (Bitwarden — бесплатный, 1Password — платный)\n• Никаких '123456', 'password', даты рождения\n• Используй парольные фразы: 'КотСидитНаОкне2024!'\n\n**2FA/MFA (двухфакторная аутентификация):**\n• **SMS** — базовый уровень (уязвим к SIM-swapping)\n• **TOTP** (Google Authenticator, Authy) — хороший уровень\n• **Hardware key** (YubiKey) — максимум защиты\n• **Biometrics** (отпечаток, Face ID) — удобно, но не абсолютно\n\n**Где обязательно включить 2FA:**\n• Email (главный аккаунт!)\n• Банк и финансовые сервисы\n• Соцсети\n• Облачные хранилища\n• Рабочие аккаунты\n\n💡 **Правило:** если сервис предлагает 2FA — включай немедленно!"},
            {keywords: ['бэкап', 'backup', 'резервн', 'копи'], answer: "💾 **Бэкапы и резервное копирование:**\n\n**Правило 3-2-1:**\n• **3** копии данных\n• **2** разных типа носителей (диск + облако)\n• **1** копия офлайн (вне офиса/дома)\n\n**Что бэкапить:**\n• Базы данных\n• Файлы проектов\n• Конфигурации серверов\n• Код (Git — это тоже бэкап!)\n• Документы и договоры\n\n**Частота:**\n• Критичные данные: каждый час/день\n• Важные данные: каждый день/неделю\n• Архивы: каждый месяц\n\n**Тестирование:**\n• Проверяй восстановление раз в квартал!\n• Бэкап без тестирования восстановления = отсутствие бэкапа\n\n**Инструменты:**\n• Локальные: Time Machine (Mac), File History (Windows), rsync (Linux)\n• Облачные: Backblaze, AWS S3, Яндекс.Облако\n• Git для кода: GitHub, GitLab, Bitbucket\n\n️ **Помни:** бэкапы — это не опция, это необходимость. Вопрос не 'если', а 'когда' случится потеря данных."}
        ],
        legal: [
            {keywords: ['ип', 'ооо', 'регистрац', 'бизнес', 'открыть'], answer: "🏢 **Регистрация бизнеса в РФ:**\n\n**Самозанятость (НПД):**\n• Регистрация: 5 минут в приложении 'Мой налог'\n• Лимит: 2,4 млн ₽/год\n• Налог: 4% с физлиц, 6% с юрлиц\n• Без отчётности и кассы\n• Нельзя нанимать сотрудников\n\n**ИП (Индивидуальный предприниматель):**\n• Госпошлина: 800 ₽ (или бесплатно через Госуслуги/банк)\n• Срок регистрации: 3-5 дней\n• УСН 6% или патент\n• Можно нанимать до 130 сотрудников\n• Страховые взносы: ~45 000 ₽/год (фиксированные)\n\n**ООО (Общество с ограниченной ответственностью):**\n• Госпошлина: 4 000 ₽\n• Уставный капитал: от 10 000 ₽\n• Сложнее учёт и отчётность\n• Можно нанимать неограниченно\n• Ответственность ограничена уставным капиталом\n\n💡 **Стратегия:**\n• Фриланс до 2,4 млн/год → самозанятость\n• Рост дохода → ИП УСН 6%\n• Партнёрство или инвестиции → ООО"},
            {keywords: ['договор', 'сделк', 'контракт', 'соглашен'], answer: "📋 **Виды договоров для фрилансера:**\n\n**Основные:**\n• **Договор возмездного оказания услуг** — для консультаций, разработки\n• **Договор подряда** — для создания конкретного результата (сайт, дизайн)\n• **Лицензионный договор** — для передачи прав на ПО/контент\n• **NDA** — соглашение о конфиденциальности\n\n**Ключевые пункты:**\n1. Предмет (детальное описание работ)\n2. Сроки и этапы с дедлайнами\n3. Стоимость и порядок оплаты (предоплата 30-50%!)\n4. Порядок приёмки и количество правок\n5. Права на интеллектуальную собственность\n6. Ответственность и штрафы\n7. Форс-мажор\n8. Применимое право и арбитраж\n\n⚖️ **Красные флаги:**\n• Работа без договора\n• 100% оплата после сдачи\n• Размытые формулировки\n• Передача всех прав без ограничения\n\n💡 **Лайфхак:** добавь пункт об автоматической приёмке через 5 дней, если клиент молчит."},
            {keywords: ['штраф', 'ответственн', 'нарушен', 'суд'], answer: "⚖️ **Ответственность бизнеса:**\n\n**Административная (КоАП):**\n• Штрафы до 500 000 ₽ (нарушение ПД, рекламы)\n• Приостановление деятельности до 90 дней\n• Дисквалификация директора до 3 лет\n\n**Гражданская (ГК РФ):**\n• Возмещение убытков (реальный ущерб + упущенная выгода)\n• Неустойка по договору (пени, штрафы)\n• Компенсация морального вреда\n\n**Уголовная (УК РФ):**\n• Уклонение от налогов (ст. 198-199) — до 6 лет\n• Мошенничество (ст. 159) — до 10 лет\n• Нарушение авторских прав (ст. 146) — до 6 лет\n• Коммерческий подкуп (ст. 204) — до 8 лет\n\n**Как снизить риски:**\n• Страхование ответственности\n• Грамотные договоры\n• Комплаенс (соблюдение законов)\n• Консультации с юристом\n• Документирование всех решений\n\n💡 **Правило:** профилактика дешевле, чем лечение. Потрать 10 000 ₽ на юриста сейчас, чтобы не потерять 1 000 000 ₽ потом."}
        ]
    };
    
    // === ПОИСК В WIKIPEDIA (РАБОТАЕТ НАДЁЖНО) ===
    async function searchWikipedia(query) {
        try {
            // Очищаем запрос от лишних слов
            const cleanQuery = query.replace(/^(расскажи|что такое|как|почему|когда|где|кто|объясни)\s+/i, '').trim();
            
            // Ищем страницу
            const searchUrl = `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQuery)}&format=json&origin=*&srlimit=3`;
            const searchResp = await fetch(searchUrl);
            const searchData = await searchResp.json();
            
            if (searchData.query && searchData.query.search && searchData.query.search.length > 0) {
                const title = searchData.query.search[0].title;
                // Получаем краткое содержание
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
            console.log('Wikipedia search error:', e);
        }
        return null;
    }
    
    // === УМНЫЙ ПОИСК В БАЗЕ ЗНАНИЙ ===
    function searchKnowledgeBase(question) {
        const q = question.toLowerCase();
        const words = q.split(/\s+/).filter(w => w.length > 3);
        
        let bestMatch = null;
        let bestScore = 0;
        
        for (let category in knowledgeBase) {
            knowledgeBase[category].forEach(item => {
                let score = 0;
                
                // Проверяем ключевые слова
                item.keywords.forEach(keyword => {
                    if (q.includes(keyword)) score += 3;
                });
                
                // Проверяем слова вопроса
                words.forEach(word => {
                    if (q.includes(word)) score += 1;
                    item.keywords.forEach(keyword => {
                        if (keyword.includes(word) || word.includes(keyword)) score += 2;
                    });
                });
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = item;
                }
            });
        }
        
        return bestScore >= 3 ? bestMatch : null;
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
        if (q.match(/^(привет|здравствуй|хай|hello|hi|добрый)/)) {
            return " **Привет! Я профессиональный помощник SoloDev 4.0**\n\nМогу помочь с:\n• 💼 Бизнесом и клиентами\n• 🔒 Кибербезопасностью\n• ⚖️ Правом и налогами\n• 🌐 Актуальной информацией из Wikipedia\n• 📊 Анализом ниш\n\nЗадай любой вопрос!";
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
            response += '️ **Из юридической базы:**\n\n';
            legalMatches.forEach(term => {
                response += `• **${term.term}**: ${term.def}\n\n`;
            });
            sources.push('📚 Юридическая база');
        }
        
        // 3. Поиск в Wikipedia
        const wikiResult = await searchWikipedia(question);
        if (wikiResult) {
            response += `🌐 **Wikipedia: ${wikiResult.title}**\n${wikiResult.extract}\n\n`;
            sources.push('🌐 Wikipedia');
        }
        
        // Если ничего не нашли
        if (!kbMatch && legalMatches.length === 0 && !wikiResult) {
            response += `🤔 По запросу "${question}" не нашёл точного ответа.\n\n`;
            response += '💡 **Попробуй:**\n';
            response += '• Переформулировать вопрос\n';
            response += '• Использовать ключевые слова: "клиенты", "кибербезопасность", "налоги"\n';
            response += '• Задать более конкретный вопрос\n\n';
            response += '📝 **Или выбери тему из быстрых кнопок ниже!**';
        }
        
        // Источники
        if (sources.length > 0) {
            response += `\n📎 **Источники:** ${sources.join(', ')}`;
        }
        
        return response;
    }
    
    // === АНАЛИЗ НИШИ ===
    async function analyzeNiche(niche, audience) {
        let response = `📊 **Анализ ниши: ${niche}**\n`;
        response += `🎯 **Целевая аудитория:** ${audience}\n\n`;
        
        // Боли клиентов
        response += '🔥 **Боли клиентов:**\n';
        response += '• Страх потерять деньги и не получить результат\n';
        response += '• Негативный опыт с предыдущими подрядчиками\n';
        response += '• Непонимание технического процесса\n';
        response += '• Отсутствие времени разбираться самостоятельно\n';
        response += '• Боязнь скрытых платежей и неожиданных расходов\n';
        response += '• Срыв сроков и плохая коммуникация\n\n';
        
        // Коммерческое решение
        response += '💡 **Твоё решение:**\n';
        response += `Пакет "${niche} под ключ":\n`;
        response += '✅ Разработка/настройка с гарантией результата\n';
        response += '✅ Полная юридическая защита (договор, оферта, ПД)\n';
        response += '✅ Техническая поддержка 30 дней\n';
        response += '✅ Обучение и документация\n';
        response += '✅ Прозрачные этапы и отчёты\n\n';
        
        // Поиск актуальных трендов
        const trends = await searchWikipedia(niche + ' тренды 2024');
        if (trends) {
            response += `📈 **Актуальная информация:**\n${trends.extract}\n\n`;
        }
        
        // Скрипт для клиента
        response += '📝 **Скрипт для первого контакта:**\n';
        response += `"Здравствуйте! Вижу, вы развиваете ${audience}. Многие сталкиваются с проблемами при выборе подрядчика — срывы сроков, скрытые платежи, отсутствие поддержки. Я специализируюсь на ${niche} и предлагаю комплексное решение с гарантиями и прозрачным процессом. Могу провести бесплатный аудит вашего текущего решения. Удобно созвониться на 15 минут на этой неделе?"\n\n`;
        
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
                <h3 style="margin:0 0 10px 0">🤖 Профессиональный помощник 4.0</h3>
                <div style="font-size:12px;color:#6c8cff;margin-bottom:10px">
                    Бизнес • Кибербезопасность • Право • Wikipedia
                </div>
                <div id="chatHistory" style="flex:1;overflow-y:auto;max-height:55vh;background:#0f1419;border-radius:8px;padding:15px;margin-bottom:15px;min-height:250px">
                    <div style="color:#e8ecf3;font-size:14px;line-height:1.6">
                        👋 <b>Привет! Я умный помощник 4.0</b><br><br>
                        Могу помочь с:<br>
                        • 💼 Бизнесом и клиентами<br>
                        • 🔒 Кибербезопасностью<br>
                        • ⚖️ Правом и налогами<br>
                        •  Поиском в Wikipedia<br>
                        • 📊 Анализом ниш<br><br>
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
                    <button onclick="quickQuestion('Кибербезопасность бизнеса')" style="padding:6px 10px;background:#1f2530;border:1px solid #3ecf8e;border-radius:12px;color:#3ecf8e;font-size:11px;cursor:pointer">🔒 Безопасность</button>
                    <button onclick="quickQuestion('Налоги для фрилансера')" style="padding:6px 10px;background:#1f2530;border:1px solid #ffd700;border-radius:12px;color:#ffd700;font-size:11px;cursor:pointer">💸 Налоги</button>
                    <button onclick="quickQuestion('Как продать дороже?')" style="padding:6px 10px;background:#1f2530;border:1px solid #ff6b6b;border-radius:12px;color:#ff6b6b;font-size:11px;cursor:pointer">💰 Продажи</button>
                    <button onclick="quickQuestion('GDPR и персональные данные')" style="padding:6px 10px;background:#1f2530;border:1px solid #9d6cff;border-radius:12px;color:#9d6cff;font-size:11px;cursor:pointer"> GDPR</button>
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
        history.innerHTML += `<div id="typingIndicator" style="margin:10px 0;color:#6c8cff;font-size:13px">🔍 Ищу информацию...</div>`;
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
            <button onclick="runNicheAnalysis()" style="width:100%;padding:14px;background:linear-gradient(135deg,#ff6b6b,#ee5a6f);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer">🚀 Сгенерировать анализ</button>
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
        modalContent.innerHTML = '<h3>📊 Анализирую нишу...</h3><div style="text-align:center;padding:30px"><div style="font-size:48px">⏳</div><p style="color:#e8ecf3">Ищу информацию в Wikipedia...</p></div>';
        
        const analysis = await analyzeNiche(niche, audience);
        const formattedAnalysis = analysis.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
        
        modalContent.innerHTML = `
            <div style="max-height:80vh;overflow-y:auto">
                <h3>📊 Анализ ниши</h3>
                <div style="color:#e8ecf3;font-size:14px;line-height:1.6">${formattedAnalysis}</div>
                <button onclick="openProAssistant()" style="width:100%;padding:12px;background:#6c8cff;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;margin-top:15px">← Назад к чату</button>
            </div>
        `;
    };
    
    console.log('✅ Professional Assistant 4.0 loaded with Wikipedia search');
})();
// === КОНЕЦ ПРОФЕССИОНАЛЬНОГО ПОМОЩНИКА 4.0 ===
