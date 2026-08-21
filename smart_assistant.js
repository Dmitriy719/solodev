var TASK_CATALOG={landing:{name:'🌐 Лендинг',base:12},multisite:{name:'🌐 Многостраничный',base:60},shop:{name:' Магазин',base:120},webapp:{name:'💻 Веб-приложение',base:160},mobile:{name:' Мобильное',base:240},integration:{name:'🔌 Интеграция API',base:16},layout:{name:' Вёрстка',base:24},parser:{name:'🕷 Скрипт/бот',base:16},server:{name:'⚙️ Сервер',base:8},bugfix:{name:'🐛 Багфикс',base:4},other:{name:'📦 Другое',base:8}};

function showSmartAssistant(){
    var h='<h3>🤖 Умный помощник</h3><p class="mut" style="font-size:12px">Ответь на 4 вопроса — я рассчитаю время и стоимость.</p>';
    h+='<label style="color:#ffd700;font-size:12px;font-weight:bold">1. Что делаем?</label><select id="sa_task_type" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff">';
    Object.keys(TASK_CATALOG).forEach(function(key){var t=TASK_CATALOG[key];h+='<option value="'+key+'">'+t.name+' (~'+t.base+' ч)</option>';});
    h+='</select>';
    h+='<label style="color:#ffd700;font-size:12px;font-weight:bold;margin-top:10px;display:block">2. Сложность?</label><select id="sa_difficulty" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff"><option value="1">🟢 Стандартная</option><option value="1.4" selected>🟡 Есть нюансы</option><option value="1.8">🔴 Сложная</option></select>';
    h+='<label style="color:#ffd700;font-size:12px;font-weight:bold;margin-top:10px;display:block">3. Знакома технология?</label><select id="sa_familiarity" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff"><option value="1">✅ Делал много раз</option><option value="1.25" selected>🤔 Делал похожее</option><option value="1.5">🆕 Новая для меня</option></select>';
    h+='<label style="color:#ffd700;font-size:12px;font-weight:bold;margin-top:10px;display:block">4. Какое ТЗ?</label><select id="sa_spec" style="width:100%;padding:8px;margin:5px 0;background:#1f2530;border:1px solid #ffd700;border-radius:6px;color:#fff"><option value="1">📋 Чёткое ТЗ</option><option value="1.2" selected>📝 Примерное</option><option value="1.5">❓ ТЗ нет</option></select>';
    h+='<button class="btn" style="width:100%;margin-top:15px;background:#ffd700;color:#000;font-weight:bold" onclick="calculateSmartEstimate()">🧮 Рассчитать</button><div id="sa_result" style="display:none;margin-top:15px"></div>';
    openModal(h);
}

function calculateSmartEstimate(){
    var typeKey=document.getElementById('sa_task_type').value;
    var difficulty=parseFloat(document.getElementById('sa_difficulty').value);
    var familiarity=parseFloat(document.getElementById('sa_familiarity').value);
    var spec=parseFloat(document.getElementById('sa_spec').value);
    var baseHours=TASK_CATALOG[typeKey].base;
    var taskName=TASK_CATALOG[typeKey].name;
    var estimatedHours=Math.round(baseHours*difficulty*familiarity*spec*10)/10;
    var bufferPercent=0;
    if(spec>=1.5)bufferPercent+=15;else if(spec>=1.2)bufferPercent+=10;
    if(familiarity>=1.5)bufferPercent+=10;else if(familiarity>=1.25)bufferPercent+=5;
    if(bufferPercent>30)bufferPercent=30;
    var rate=(typeof db!=='undefined'&&db.hourlyRate)?db.hourlyRate:2000;
    var baseCost=Math.round(estimatedHours*rate);
    var totalCost=Math.round(baseCost*(1+bufferPercent/100));
    var bufferAmount=totalCost-baseCost;
    var bufferExplanation='🛡 Риск-буфер '+bufferPercent+'% — как запас топлива в самолёте. Пилот всегда берёт больше на случай ветра или обхода грозы. В разработке так же: ';
    if(spec>=1.2)bufferExplanation+='• ТЗ может уточняться\n';
    if(familiarity>=1.25)bufferExplanation+='• Могут всплыть нюансы\n';
    bufferExplanation+='• Резерв гарантирует сдачу в срок без доплат.';
    var clientText='В оценку заложен резерв '+bufferPercent+'% на случай уточнений по ТЗ и технических нюансов. Это стандартная практика, защищающая от срыва сроков и гарантирующая результат без внезапных доплат. Если всё пройдёт гладко — резерв не будет использован.';
    var resultHtml='<div style="padding:15px;background:#102015;border:1px solid #3ecf8e;border-radius:6px"><div style="font-weight:bold;color:#3ecf8e;margin-bottom:10px">✅ Расчёт:</div><div style="font-size:13px;color:#fff;margin-bottom:5px">📋 '+taskName+'</div><div style="font-size:13px;color:#fff;margin-bottom:5px">⏱ База: <b>'+baseHours+' ч</b></div><div style="font-size:13px;color:#fff;margin-bottom:5px">⚙️ Множители: ×'+difficulty+' ×'+familiarity+' ×'+spec+'</div><div style="font-size:15px;color:#fff;margin-bottom:10px;padding:8px;background:#1f2530;border-radius:4px">📊 Итого: <b style="color:#3ecf8e">'+estimatedHours+' ч</b></div><div style="font-size:13px;color:#fff;margin-bottom:5px">💰 Без буфера: <b>'+baseCost.toLocaleString()+' ₽</b></div><div style="font-size:13px;color:#fff;margin-bottom:5px">🛡 Буфер '+bufferPercent+'%: <b>+'+bufferAmount.toLocaleString()+' ₽</b></div><div style="font-size:16px;color:#3ecf8e;font-weight:bold;margin-bottom:10px">✅ ИТОГО: '+totalCost.toLocaleString()+' ₽</div><div style="font-size:11px;color:#ffd700;margin-bottom:5px;font-weight:bold">💡 Для тебя:</div><div style="font-size:11px;color:#fff;margin-bottom:10px;white-space:pre-wrap">'+bufferExplanation+'</div><div style="font-size:11px;color:#6c8cff;margin-bottom:5px;font-weight:bold">💬 Клиенту:</div><textarea id="sa_client_text" readonly style="width:100%;padding:8px;background:#1f2530;border:1px solid #6c8cff;border-radius:4px;color:#fff;font-size:11px;min-height:60px">'+clientText+'</textarea><button class="btn small" style="width:100%;margin-top:5px;background:#6c8cff" onclick="copySmartAssistantText()">📋 Копировать</button><button class="btn small" style="width:100%;margin-top:5px;background:#3ecf8e" onclick="applySmartEstimate()">✅ В калькулятор</button></div>';
    document.getElementById('sa_result').innerHTML=resultHtml;
    document.getElementById('sa_result').style.display='block';
    window.sa_temp={name:taskName,hours:estimatedHours,complexity:difficulty,buffer:bufferPercent};
}

function copySmartAssistantText(){
    var text=document.getElementById('sa_client_text').value;
    navigator.clipboard.writeText(text).then(function(){alert('✅ Скопировано!');});
}

function applySmartEstimate(){
    if(!window.sa_temp)return;
    closeModal();
    setTimeout(function(){
        var nameEl=document.getElementById('est_task_name');
        var hoursEl=document.getElementById('est_task_hours');
        var compSelect=document.getElementById('est_task_complexity');
        var bufSelect=document.getElementById('est_buffer');
        if(nameEl&&hoursEl&&compSelect&&bufSelect){
            nameEl.value=window.sa_temp.name;
            hoursEl.value=window.sa_temp.hours;
            for(var i=0;i<compSelect.options.length;i++){
                if(parseFloat(compSelect.options[i].value)===window.sa_temp.complexity){
                    compSelect.selectedIndex=i;break;
                }
            }
            for(var i=0;i<bufSelect.options.length;i++){
                if(parseInt(bufSelect.options[i].value)===window.sa_temp.buffer){
                    bufSelect.selectedIndex=i;break;
                }
            }
            if(typeof addEstimateTask==='function')addEstimateTask();
            updateEstimatePreview();
        }
    },300);
}

if(typeof renderCalculator==='function'){
    var originalRenderCalc=renderCalculator;
    renderCalculator=function(){
        originalRenderCalc();
        setTimeout(function(){
            var existingBtn=document.querySelector('.smart-assistant-btn');
            if(!existingBtn){
                var header=document.querySelector('#app h2');
                if(header&&header.textContent.includes('Калькулятор')){
                    var btn=document.createElement('button');
                    btn.className='btn smart-assistant-btn';
                    btn.style.cssText='width:100%;margin-bottom:15px;background:#ffd700;color:#000;font-weight:bold';
                    btn.textContent='🤖 Умный помощник оценки';
                    btn.onclick=showSmartAssistant;
                    header.parentNode.insertBefore(btn,header.nextSibling);
                }
            }
        },200);
    };
}
