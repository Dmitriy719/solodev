// === POMODORO ТАЙМЕР SOLODEV ===
(function() {
    'use strict';
    
    let timerInterval = null;
    let timeLeft = 25 * 60; // 25 минут в секундах
    let isRunning = false;
    let isWorkTime = true; // true = работа, false = перерыв
    let completedPomodoros = 0;
    
    const WORK_TIME = 25 * 60;
    const SHORT_BREAK = 5 * 60;
    const LONG_BREAK = 15 * 60;
    
    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    
    function updateDisplay() {
        const timerEl = document.getElementById('pomodoroTimer');
        const statusEl = document.getElementById('pomodoroStatus');
        const btnEl = document.getElementById('pomodoroBtn');
        
        if (timerEl) {
            timerEl.textContent = formatTime(timeLeft);
            timerEl.style.color = isWorkTime ? '#ff6b6b' : '#3ecf8e';
        }
        
        if (statusEl) {
            statusEl.textContent = isWorkTime ? '🔥 Время работать!' : '☕ Время отдохнуть!';
        }
        
        if (btnEl) {
            btnEl.textContent = isRunning ? '⏸️ Пауза' : '▶️ Старт';
        }
    }
    
    function tick() {
        timeLeft--;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            if (isWorkTime) {
                completedPomodoros++;
                localStorage.setItem('pomodoro_count', completedPomodoros);
                
                // Каждые 4 помодоро - длинный перерыв
                if (completedPomodoros % 4 === 0) {
                    timeLeft = LONG_BREAK;
                } else {
                    timeLeft = SHORT_BREAK;
                }
                isWorkTime = false;
                
                // Уведомление
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('SoloDev Pomodoro', {
                        body: 'Отличная работа! Время отдохнуть ☕',
                        icon: 'icon.svg'
                    });
                }
            } else {
                timeLeft = WORK_TIME;
                isWorkTime = true;
                
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('SoloDev Pomodoro', {
                        body: 'Перерыв окончен! Время работать ',
                        icon: 'icon.svg'
                    });
                }
            }
            
            updateDisplay();
            return;
        }
        
        updateDisplay();
    }
    
    window.openPomodoro = function() {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');
        
        if (!modal || !modalContent) return;
        
        // Загружаем сохранённый счётчик
        completedPomodoros = parseInt(localStorage.getItem('pomodoro_count') || '0');
        
        modalContent.innerHTML = `
            <div style="max-height:85vh;display:flex;flex-direction:column;position:relative">
                <button onclick="closeModal()" style="position:absolute;top:10px;right:15px;background:none;border:none;color:#ff6b6b;font-size:28px;cursor:pointer;z-index:10">✕</button>
                
                <h3 style="margin:0 0 20px 0;text-align:center">🍅 Pomodoro Таймер</h3>
                
                <div style="text-align:center;padding:30px;background:#0f1419;border-radius:12px;margin-bottom:20px">
                    <div id="pomodoroStatus" style="color:#6c8cff;font-size:16px;margin-bottom:15px">🔥 Время работать!</div>
                    <div id="pomodoroTimer" style="font-size:72px;font-weight:bold;color:#ff6b6b;font-family:monospace;margin-bottom:20px">25:00</div>
                    <button id="pomodoroBtn" onclick="togglePomodoro()" style="padding:15px 40px;background:linear-gradient(135deg,#6c8cff,#9d6cff);color:#fff;border:none;border-radius:8px;font-size:18px;font-weight:bold;cursor:pointer">▶️ Старт</button>
                </div>
                
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:20px">
                    <div style="background:#1f2530;padding:15px;border-radius:8px;text-align:center">
                        <div style="color:#a0a8b8;font-size:12px;margin-bottom:5px">Выполнено сегодня</div>
                        <div id="pomodoroCount" style="color:#3ecf8e;font-size:32px;font-weight:bold">${completedPomodoros}</div>
                    </div>
                    <div style="background:#1f2530;padding:15px;border-radius:8px;text-align:center">
                        <div style="color:#a0a8b8;font-size:12px;margin-bottom:5px">Время фокуса</div>
                        <div style="color:#ffd700;font-size:32px;font-weight:bold">${Math.floor(completedPomodoros * 25 / 60)}ч ${completedPomodoros * 25 % 60}м</div>
                    </div>
                </div>
                
                <div style="background:#1f2530;padding:15px;border-radius:8px">
                    <div style="color:#a0a8b8;font-size:12px;margin-bottom:10px">Настройки:</div>
                    <div style="display:flex;gap:10px;flex-wrap:wrap">
                        <button onclick="resetPomodoro()" style="flex:1;padding:10px;background:#6c757d;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">🔄 Сброс</button>
                        <button onclick="resetDailyCount()" style="flex:1;padding:10px;background:#ff6b6b;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px">🗑️ Обнулить день</button>
                    </div>
                </div>
                
                <div style="margin-top:15px;padding:15px;background:#0f1419;border-radius:8px;font-size:12px;color:#a0a8b8">
                    <b style="color:#ffd700">Как работает:</b><br>
                    • 25 минут работы → 5 минут перерыв<br>
                    • Каждые 4 помодоро → 15 минут перерыв<br>
                    • Уведомления при смене режима
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
        updateDisplay();
        
        // Запрашиваем разрешение на уведомления
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    };
    
    window.togglePomodoro = function() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
        } else {
            timerInterval = setInterval(tick, 1000);
            isRunning = true;
        }
        updateDisplay();
    };
    
    window.resetPomodoro = function() {
        clearInterval(timerInterval);
        isRunning = false;
        timeLeft = WORK_TIME;
        isWorkTime = true;
        updateDisplay();
    };
    
    window.resetDailyCount = function() {
        if (confirm('Обнулить счётчик за сегодня?')) {
            completedPomodoros = 0;
            localStorage.setItem('pomodoro_count', '0');
            document.getElementById('pomodoroCount').textContent = '0';
        }
    };
    
    console.log('✅ Pomodoro Timer loaded');
})();
