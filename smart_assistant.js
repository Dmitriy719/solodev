// === УМНЫЙ ПОМОЩНИК ОЦЕНКИ (Безопасный модуль) ===
var TASK_CATALOG = {
    landing: {name: '🌐 Лендинг (1 страница)', base: 12},
    multisite: {name: '🌐 Многостраничный сайт (5-10 стр)', base: 60},
    shop: {name: '🛒 Интернет-магазин', base: 120},
    webapp: {name: '💻 Веб-приложение / сервис', base: 160},
    mobile: {name: '📱 Мобильное приложение', base: 240},
    integration: {name: '🔌 Интеграция API / платёжки', base: 16},
    layout: {name: '🎨 Вёрстка макета', base: 24},
    parser: {name: '🕷 Скрипт / парсер / бот', base: 16},
    server: {name: '⚙️ Настройка сервера / деплой', base: 8},
    bugfix: {name: '🐛 Багфикс / мелкие правки', base: 4},
    other: {name: '📦 Другое', base: 8}
};

function showSmartAssistant(){
    var h = '<h3>🤖 Умный помощник оценки</h3>';
    h += '<p class="mut" style="font-size:12px;margin-bottom:10px">Я сам рассчитаю время и стоимость. Ответь на 4 вопроса.</p>';
    
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold">1. Что делаем?</label>';
    h += '<select id="sa_task_type" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff">';
    Object.keys(TASK_CATALOG).forEach(function(key){
        var t = TASK_CATALOG[key];
        h += '<option value="'+key+'">'+t.name+' (~'+t.base+' ч базово)</option>';
    });
    h += '</select>';
    
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold;margin-top:10px;display:block">2. Насколько сложно?</label>';
    h += '<select id="sa_difficulty" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff">';
    h += '<option value="1">🟢 Стандартная задача, всё понятно</option>';
    h += '<option value="1.4" selected>🟡 Есть нюансы, нужно подумать</option>';
    h += '<option value="1.8">🔴 Сложная архитектура / много логики</option>';
    h += '</select>';
    
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold;margin-top:10px;display:block">3. Насколько знакома технология?</label>';
    h += '<select id="sa_familiarity" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff">';
    h += '<option value="1">✅ Делал много раз, знаю наизусть</option>';
    h += '<option value="1.25" selected>🤔 Делал похожее, но есть новые моменты</option>';
    h += '<option value="1.5">🆕 Технология новая для меня</option>';
    h += '</select>';
    
    h += '<label style="color:#ffd700;font-size:12px;font-weight:bold;margin-top:10px;display:block">4. Какое ТЗ?</label>';
    h += '<select id="sa_spec" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff">';
    h += '<option value="1">📋 Чёткое ТЗ, всё утверждено</option>';
    h += '<option value="1.2" selected>📝 Примерное понимание, детали уточним</option>';
    h += '<option value="1.5">❓ "Сделайте красиво", ТЗ нет</option>';
    h += '</select>';
    
    h += '<button class="btn" style="width:100%;margin-top:15px;background:#ffd700;color:#000;font-weight:bold" onclick="calculateSmartEstimate()">🧮 Рассчитать оценку</button>';
    h += '<div id="sa_result" style="display:none;margin-top:15px"></div>';
    openModal(h);
}

function calculateSmartEstimate(){
    var typeKey = document.getElementById('sa_task_type').value;
    var difficulty = parseFloat(document.getElementById('sa_difficulty').value);
    var familiarity = parseFloat(document.getElementById('sa_familiarity').value);
    var spec = parseFloat(document.getElementById('sa_spec').value);
    
    var baseHours = TASK_CATALOG[typeKey].base;
    var taskName = TASK_CATALOG[typeKey].name;
    var estimatedHours = Math.round(baseHours * difficulty * familiarity * spec * 10) / 10;
    
    var bufferPercent = 0;
    if(spec >= 1.5) bufferPercent += 15;
    else if(spec >= 1.2) bufferPercent += 10;
    if(familiarity >= 1.5) bufferPercent += 10;
    else if(familiarity >= 1.25) bufferPercent += 5;
    if(bufferPercent > 30) bufferPercent = 30;
    
    var rate = (typeof db !== 'undefined' && db.hourlyRate) ? db.hourlyRate : 2000;
    var baseCost = Math.round(estimatedHours * rate);
    var totalCost = Math.round(baseCost * (1 + bufferPercent / 100));
    var bufferAmount = totalCost - baseCost;
    
    var bufferExplanation = '🛡 Риск-буфер ' + bufferPercent + '% — это как запас топлива в самолёте. ';
    bufferExplanation += 'Пилот никогда не берёт ровно столько, сколько нужно до аэропорта — всегда есть резерв на ветер или обход грозы.\n\n';
    bufferExplanation += 'В разработке так же: ';
    if(spec >= 1.2) bufferExplanation += '• ТЗ может уточняться в процессе (это нормально)\n';
    if(familiarity >= 1.25) bufferExplanation += '• Могут всплыть технические нюансы\n';
    bufferExplanation += '• Этот резерв гарантирует сдачу в срок без внезапных доплат.';

    var clientText = 'В оценку заложен резерв ' + bufferPercent + '% на случай уточнений по ТЗ и технических нюансов. ';
    clientText += 'Это стандартная практика, которая защищает от срыва сроков и гарантирует, что вы получите результат без внезапных доплат в процессе работы. ';
    clientText += 'Если всё пройдёт гладко — резерв не будет использован.';
    
    var resultHtml = '<div style="padding:15px;background:#102015;border:1px solid #3ecf8e;border-radius:6px">';
    resultHtml += '<div style="font-weight:bold;color:#3ecf8e;margin-bottom:10px">✅ Расчёт готов:</div>';
    resultHtml += '<div style="font-size:13px;color:#fff;margin-bottom:5px">📋 Задача: <b>' + taskName + '</b></div>';
    resultHtml += '<div style="font-size:13px;color:#fff;margin-bottom:5px">⏱ Базовое время: <b>' + baseHours + ' ч</b></div>';
    resultHtml += '<div style="font-size:13px;color:#fff;margin-bottom:5px">⚙️ Множители: сложность ×' + difficulty + ', опыт ×' + familiarity + ', ТЗ ×' + spec + '</div>';
    resultHtml += '<div style="font-size:15px;color:#fff;margin-bottom:10px;padding:8px;background:#1f2530;border-radius:4px">📊 Итого: <b style="color:#3ecf8e">' + estimatedHours + ' часов</b></div>';
    resultHtml += '<div style="font-size:13px;color:#fff;margin-bottom:5px">💰 Стоимость: <b>' + baseCost.toLocaleString() + ' ₽</b></div>';
    resultHtml += '<div style="font-size:13px;color:#fff;margin-bottom:5px">🛡 Буфер ' + bufferPercent + '%: <b>+' + bufferAmount.toLocaleString() + ' ₽</b></div>';
    resultHtml += '<div style="font-size:16px;color:#3ecf8e;font-weight:bold;margin-bottom:10px">✅ ИТОГО: ' + totalCost.toLocaleString() + ' ₽</div>';
    resultHtml += '<div style="font-size:11px;color:#ffd700;margin-bottom:5px;font-weight:bold">💡 Что такое риск-буфер (для тебя):</div>';
    resultHtml += '<div style="font-size:11px;color:#fff;margin-bottom:10px;white-space:pre-wrap">' + bufferExplanation + '</div>';
    resultHtml += '<div style="font-size:11px;color:#6c8cff;margin-bottom:5px;font-weight:bold">💬 Ответ клиенту (скопируй и отправь):</div>';
    resultHtml += '<textarea id="sa_client_text" readonly style="width:100%;padding:8px;background:#1f2530;border:1px solid #6c8cff;border-radius:4px;color:#fff;font-size:11px;min-height:70px">' + clientText + '</textarea>';
    resultHtml += '<button class="btn small" style="width:100%;margin-top:5px;background:#6c8cff" onclick="copySmartAssistantText()">📋 Копировать ответ клиенту</button>';
    resultHtml += '<button class="btn small" style="width:100%;margin-top:5px;background:#3ecf8e" onclick="applySmartEstimate()">✅ Перенести в калькулятор</button>';
    resultHtml += '</div>';
    
    document.getElementById('sa_result').innerHTML = resultHtml;
    document.getElementById('sa_result').style.display = 'block';
    
    window.sa_temp = { name: taskName, hours: estimatedHours, complexity: difficulty, buffer: bufferPercent };
}

function copySmartAssistantText(){
    var text = document.getElementById('sa_client_text').value;
    navigator.clipboard.writeText(text).then(function(){ alert('✅ Скопировано! Вставь в чат с клиентом.'); });
}

function applySmartEstimate(){
    if(!window.sa_temp) return;
    closeModal();
    if(document.getElementById('est_task_name')) {
        document.getElementById('est_task_name').value = window.sa_temp.name;
        document.getElementById('est_task_hours').value = window.sa_temp.hours;
        var compSelect = document.getElementById('est_task_complexity');
        for(var i=0; i<compSelect.options.length; i++){
            if(parseFloat(compSelect.options[i].value) === window.sa_temp.complexity){ compSelect.selectedIndex = i; break; }
        }
        var bufSelect = document.getElementById('est_buffer');
        for(var i=0; i<bufSelect.options.length; i++){
            if(parseInt(bufSelect.options[i].value) === window.sa_temp.buffer){ bufSelect.selectedIndex = i; break; }
        }
        if(typeof addEstimateTask === 'function') addEstimateTask();
    }
}

// Автоматически добавляем кнопку в калькулятор при его рендере
if(typeof renderCalculator === 'function') {
    var originalRenderCalc = renderCalculator;
    renderCalculator = function() {
        originalRenderCalc();
        setTimeout(function(){
            var header = document.querySelector('#app h2');
            if(header && header.textContent.includes('Калькулятор')) {
                var btn = document.createElement('button');
                btn.className = 'btn';
                btn.style.cssText = 'width:100%;margin-bottom:15px;background:#ffd700;color:#000;font-weight:bold';
                btn.textContent = '🤖 Умный помощник оценки';
                btn.onclick = showSmartAssistant;
                header.parentNode.insertBefore(btn, header.nextSibling);
            }
        }, 100);
    };
}
// === КОНЕЦ МОДУЛЯ УМНОГО ПОМОЩНИКА ===
