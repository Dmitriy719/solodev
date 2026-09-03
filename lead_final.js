// === LEAD MAGNET КАЛЬКУЛЯТОР ДЛЯ КЛИЕНТОВ ===
(function() {
    'use strict';
    
    const pricing = {
        landing: { base: 30000, name: 'Лендинг', icon: '' },
        multisite: { base: 80000, name: 'Многостраничный сайт', icon: '' },
        shop: { base: 150000, name: 'Интернет-магазин', icon: '🛒' },
        bot: { base: 50000, name: 'Telegram-бот', icon: '' },
        webapp: { base: 250000, name: 'Веб-приложение', icon: '' }
    };
    
    const addons = {
        design: { price: 20000, name: 'Уникальный дизайн', icon: '🎨' },
        seo: { price: 15000, name: 'SEO-оптимизация', icon: '🔍' },
        crm: { price: 25000, name: 'Интеграция с CRM', icon: '' },
        mobile: { price: 10000, name: 'Мобильная версия', icon: '📱' },
        content: { price: 8000, name: 'Наполнение контентом', icon: '✍️' }
    };
    
    const urgency = {
        normal: { mult: 1, name: 'Стандартно (2-4 недели)', icon: '📅' },
        fast: { mult: 1.5, name: 'Быстро (1-2 недели) +50%', icon: '⚡' },
        urgent: { mult: 2, name: 'Срочно (3-7 дней) +100%', icon: '🔥' }
    };
    
    let currentStep = 0;
    let selections = {
        type: null,
        addons: [],
        urgency: 'normal',
        contact: ''
    };
    
    window.openLeadCalc = function() {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');
        if (!modal || !modalContent) return;
        
        currentStep = 0;
        selections = { type: null, addons: [], urgency: 'normal', contact: '' };
        
        modalContent.innerHTML = `
            <div style="max-height:85vh;display:flex;flex-direction:column;position:relative">
                <button onclick="closeModal()" style="position:absolute;top:10px;right:15px;background:none;border:none;color:#ff6b6b;font-size:28px;cursor:pointer;z-index:10">✕</button>
                
                <h3 style="margin:0 0 10px 0;text-align:center">🧮 Рассчитайте стоимость проекта</h3>
                <div style="font-size:12px;color:#6c8cff;text-align:center;margin-bottom:20px">Ответьте на 4 вопроса и узнайте цену за 1 минуту</div>
                
                <div id="leadCalcSteps" style="flex:1;overflow-y:auto"></div>
                
                <div id="leadCalcProgress" style="margin-top:15px;height:6px;background:#1f2530;border-radius:3px;overflow:hidden">
                    <div id="leadCalcProgressBar" style="height:100%;background:linear-gradient(90deg,#6c8cff,#9d6cff);transition:width 0.3s;width:25%"></div>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
        renderStep();
    };
    
    function renderStep() {
        const container = document.getElementById('leadCalcSteps');
        const progressBar = document.getElementById('leadCalcProgressBar');
        
        progressBar.style.width = ((currentStep + 1) * 25) + '%';
        
        if (currentStep === 0) {
            container.innerHTML = `
                <div style="padding:10px">
                    <h4 style="color:#ffd700;margin-bottom:15px">1️⃣ Какой тип проекта вам нужен?</h4>
                    <div style="display:flex;flex-direction:column;gap:10px">
                        ${Object.keys(pricing).map(key => `
                            <button onclick="selectType('${key}')" style="padding:15px;background:#1f2530;border:2px solid #2a303c;border-radius:8px;color:#fff;font-size:14px;cursor:pointer;text-align:left;display:flex;align-items:center;gap:12px" onmouseover="this.style.borderColor='#6c8cff'" onmouseout="this.style.borderColor='#2a303c'">
                                <span style="font-size:24px">${pricing[key].icon}</span>
                                <div>
                                    <div style="font-weight:bold">${pricing[key].name}</div>
                                    <div style="font-size:12px;color:#a0a8b8">от ${pricing[key].base.toLocaleString('ru-RU')} ₽</div>
                                </div>
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (currentStep === 1) {
            container.innerHTML = `
                <div style="padding:10px">
                    <h4 style="color:#ffd700;margin-bottom:15px">2️⃣ Дополнительные опции</h4>
                    <p style="color:#a0a8b8;font-size:13px;margin-bottom:15px">Выберите всё, что нужно (можно несколько)</p>
                    <div style="display:flex;flex-direction:column;gap:10px">
                        ${Object.keys(addons).map(key => `
                            <label style="padding:12px;background:#1f2530;border:2px solid #2a303c;border-radius:8px;color:#fff;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:12px" onmouseover="this.style.borderColor='#6c8cff'" onmouseout="this.style.borderColor='#2a303c'">
                                <input type="checkbox" value="${key}" onchange="toggleAddon('${key}')" style="width:20px;height:20px">
                                <span style="font-size:20px">${addons[key].icon}</span>
                                <div style="flex:1">
                                    <div>${addons[key].name}</div>
                                    <div style="font-size:12px;color:#3ecf8e">+${addons[key].price.toLocaleString('ru-RU')} ₽</div>
                                </div>
                            </label>
                        `).join('')}
                    </div>
                    <button onclick="nextStep()" style="width:100%;margin-top:20px;padding:14px;background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer">Далее →</button>
                </div>
            `;
        } else if (currentStep === 2) {
            container.innerHTML = `
                <div style="padding:10px">
                    <h4 style="color:#ffd700;margin-bottom:15px">3️ Насколько срочно?</h4>
                    <div style="display:flex;flex-direction:column;gap:10px">
                        ${Object.keys(urgency).map(key => `
                            <button onclick="selectUrgency('${key}')" style="padding:15px;background:#1f2530;border:2px solid #2a303c;border-radius:8px;color:#fff;font-size:14px;cursor:pointer;text-align:left;display:flex;align-items:center;gap:12px" onmouseover="this.style.borderColor='#6c8cff'" onmouseout="this.style.borderColor='#2a303c'">
                                <span style="font-size:24px">${urgency[key].icon}</span>
                                <div style="flex:1">
                                    <div style="font-weight:bold">${urgency[key].name}</div>
                                </div>
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (currentStep === 3) {
            container.innerHTML = `
                <div style="padding:10px">
                    <h4 style="color:#ffd700;margin-bottom:15px">4️⃣ Куда отправить детальное КП?</h4>
                    <p style="color:#a0a8b8;font-size:13px;margin-bottom:15px">Оставьте контакт, и я пришлю подробное предложение с примерами работ</p>
                    <input type="text" id="leadContact" placeholder="Telegram: @username или телефон" style="width:100%;padding:14px;background:#1f2530;border:1px solid #6c8cff;border-radius:8px;color:#fff;font-size:14px;margin-bottom:15px">
                    <button onclick="showResult()" style="width:100%;padding:14px;background:linear-gradient(135deg,#3ecf8e,#2eb87a);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer">📊 Показать расчёт</button>
                </div>
            `;
        } else if (currentStep === 4) {
            showFinalResult();
        }
    }
    
    window.selectType = function(key) {
        selections.type = key;
        currentStep = 1;
        renderStep();
    };
    
    window.toggleAddon = function(key) {
        const idx = selections.addons.indexOf(key);
        if (idx > -1) {
            selections.addons.splice(idx, 1);
        } else {
            selections.addons.push(key);
        }
    };
    
    window.selectUrgency = function(key) {
        selections.urgency = key;
        currentStep = 3;
        renderStep();
    };
    
    window.nextStep = function() {
        currentStep = 2;
        renderStep();
    };
    
    window.showResult = function() {
        const contact = document.getElementById('leadContact').value.trim();
        selections.contact = contact;
        currentStep = 4;
        renderStep();
    };
    
    function calculatePrice() {
        const base = pricing[selections.type].base;
        let addonsTotal = selections.addons.reduce((sum, key) => sum + addons[key].price, 0);
        const urgencyMult = urgency[selections.urgency].mult;
        const total = Math.round((base + addonsTotal) * urgencyMult);
        const minPrice = Math.round(total * 0.9);
        const maxPrice = Math.round(total * 1.1);
        return { total, minPrice, maxPrice };
    }
    
    function showFinalResult() {
        const container = document.getElementById('leadCalcSteps');
        const { total, minPrice, maxPrice } = calculatePrice();
        
        const typeInfo = pricing[selections.type];
        const addonsList = selections.addons.map(k => addons[k].name).join(', ') || 'Нет';
        const urgencyInfo = urgency[selections.urgency];
        
        container.innerHTML = `
            <div style="padding:10px">
                <div style="text-align:center;padding:20px;background:linear-gradient(135deg,#6c8cff,#9d6cff);border-radius:12px;margin-bottom:20px">
                    <div style="color:#fff;font-size:14px;margin-bottom:10px">💰 Ориентировочная стоимость</div>
                    <div style="color:#fff;font-size:48px;font-weight:bold">${total.toLocaleString('ru-RU')} ₽</div>
                    <div style="color:#e8ecf3;font-size:14px;margin-top:5px">вилка: ${minPrice.toLocaleString('ru-RU')} - ${maxPrice.toLocaleString('ru-RU')} ₽</div>
                </div>
                
                <div style="background:#1f2530;padding:15px;border-radius:8px;margin-bottom:15px">
                    <div style="color:#a0a8b8;font-size:12px;margin-bottom:8px">📋 Ваш проект:</div>
                    <div style="color:#fff;font-size:14px;margin-bottom:8px"><b>${typeInfo.icon} ${typeInfo.name}</b></div>
                    <div style="color:#a0a8b8;font-size:12px;margin-bottom:8px">Доп. опции:</div>
                    <div style="color:#fff;font-size:13px;margin-bottom:8px">${addonsList}</div>
                    <div style="color:#a0a8b8;font-size:12px;margin-bottom:8px">Срочность:</div>
                    <div style="color:#fff;font-size:13px">${urgencyInfo.icon} ${urgencyInfo.name}</div>
                </div>
                
                <div style="background:#0f1419;padding:15px;border-radius:8px;margin-bottom:15px">
                    <div style="color:#ffd700;font-size:14px;font-weight:bold;margin-bottom:10px"> Что дальше?</div>
                    <div style="color:#e8ecf3;font-size:13px;line-height:1.6">
                        Я свяжусь с вами в течение 24 часов и пришлю:<br>
                        ✅ Детальное коммерческое предложение<br>
                        ✅ Примеры похожих работ<br>
                        ✅ План работ по этапам<br>
                        ✅ Гарантии и условия
                    </div>
                </div>
                
                ${selections.contact ? `
                    <div style="background:#3ecf8e;padding:12px;border-radius:8px;text-align:center;margin-bottom:15px">
                        <div style="color:#fff;font-size:14px">✅ Заявка принята!</div>
                        <div style="color:#e8ecf3;font-size:12px;margin-top:5px">Контакт: ${selections.contact}</div>
                    </div>
                ` : ''}
                
                <button onclick="closeModal()" style="width:100%;padding:14px;background:#6c757d;color:#fff;border:none;border-radius:8px;font-size:16px;cursor:pointer">Закрыть</button>
            </div>
        `;
    }
    
    console.log('✅ Lead Magnet Calculator loaded');
})();
