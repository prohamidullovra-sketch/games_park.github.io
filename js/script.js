// ==================== GOOGLE SHEETS INTEGRATION ====================

// Ваш URL Google Apps Script
const GAS_URL = 'https://script.google.com/macros/s/AKfycbxJfpJ6Td8F5fUouvuOjAGbnM-pF0ofOOLZGXoj09YFZOmhtW4S5Lw51b8_ahFJDiCF/exec';

// Глобальная переменная для статистики
let gameStats = JSON.parse(localStorage.getItem('taxiStats')) || [];

// Функция получения ID пользователя
function getUserId() {
    let userId = localStorage.getItem('taxiUserId');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('taxiUserId', userId);
    }
    return userId;
}

// Сохранение локальной статистики
function saveLocalStats(action, bet = 0, win = 0) {
    const statEntry = {
        timestamp: new Date().toLocaleString('ru-RU'),
        action: action,
        bet: bet,
        win: win,
        balance: userBalance,
        user_id: getUserId()
    };
    
    gameStats.push(statEntry);
    
    // Храним только последние 500 записей
    if (gameStats.length > 500) {
        gameStats = gameStats.slice(-500);
    }
    
    localStorage.setItem('taxiStats', JSON.stringify(gameStats));
}

// Отправка в Google Sheets
async function sendToGoogleSheets(action, bet = 0, win = 0) {
    const statsData = {
        user_id: getUserId(),
        action: action,
        bet: bet,
        win: win,
        balance: userBalance,
        user_agent: navigator.userAgent
    };
    
    console.log('📊 Отправка в Google Sheets:', statsData);
    
    // Всегда сохраняем локально
    saveLocalStats(action, bet, win);
    
    // Пытаемся отправить в Google Sheets
    try {
        const response = await fetch(GAS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statsData)
        });
        
        const result = await response.json();
        console.log('✅ Google Sheets ответ:', result);
        showNotification('☁️ Данные в облаке!');
        
    } catch (error) {
        console.log('⚠️ Не удалось отправить в облако, данные сохранены локально');
        showNotification('💾 Данные локально');
    }
}

// Функция уведомления
function showNotification(message) {
    // Удаляем старое уведомление если есть
    const oldNotification = document.getElementById('cloud-notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.id = 'cloud-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 12px 18px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        border: 2px solid rgba(255,255,255,0.3);
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Добавляем CSS анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ==================== ОБНОВЛЕНИЕ ИГРОВЫХ ФУНКЦИЙ ====================

// Обновляем функцию рулетки
function spinRoulette() {
    if (isSpinning || userBalance < 5) return;
    
    userBalance -= 5;
    updateBalance();
    isSpinning = true;
    
    // Отправляем в Google Sheets
    sendToGoogleSheets('roulette_spin', 5, 0);
    
    const wheel = document.getElementById('wheel');
    const resultDiv = document.getElementById('result');
    const spinBtn = document.getElementById('spinBtn');
    
    spinBtn.disabled = true;
    spinBtn.classList.remove('pulse');
    
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * rouletteResults.length);
        const result = rouletteResults[randomIndex];
        const spinDegrees = 1440 + (randomIndex * 30) + Math.random() * 15;
        
        wheel.style.transition = 'transform 4s cubic-bezier(0.1, 0.3, 0.2, 1)';
        wheel.style.transform = `rotate(${spinDegrees}deg)`;
        
        setTimeout(() => {
            userBalance += result.coins;
            updateBalance();
            
            resultDiv.innerHTML = `
                <div class="result-text">${result.text}</div>
                <div style="font-size: 14px; color: #666;">Баланс: ${userBalance} монет</div>
            `;
            
            resultDiv.className = 'result ' + (result.coins > 0 ? 'win-glow' : '');
            
            // Отправляем РЕЗУЛЬТАТ в Google Sheets
            sendToGoogleSheets('roulette_result', 5, result.coins);
            saveResult(result.text);
            
            setTimeout(() => {
                spinBtn.classList.add('pulse');
                spinBtn.disabled = false;
                isSpinning = false;
            }, 2000);
            
        }, 4000);
    }, 50);
}

// Обновляем функцию слотов
function spinSlots() {
    if (isSpinning || userBalance < 10) return;
    
    userBalance -= 10;
    updateBalance();
    isSpinning = true;
    
    // Отправляем в Google Sheets
    sendToGoogleSheets('slots_spin', 10, 0);
    
    const slots = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];
    const spinBtn = document.getElementById('spinSlotBtn');
    
    spinBtn.disabled = true;
    slots.forEach(slot => slot.classList.add('slot-spinning'));
    
    const spinDuration = 2000;
    const spinInterval = 100;
    
    let spins = 0;
    const maxSpins = spinDuration / spinInterval;
    
    const spinIntervalId = setInterval(() => {
        slots.forEach((slot, index) => {
            if (spins > maxSpins * (index + 1) / 3) return;
            slot.textContent = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        });
        
        spins++;
        if (spins >= maxSpins) {
            clearInterval(spinIntervalId);
            
            const finalResults = slots.map(() => slotSymbols[Math.floor(Math.random() * slotSymbols.length)]);
            slots.forEach((slot, i) => {
                slot.textContent = finalResults[i];
                slot.classList.remove('slot-spinning');
            });
            
            const resultStr = finalResults.join('');
            let winAmount = 0;
            let winMessage = "😔 Попробуйте еще раз!";
            
            if (slotPayouts[resultStr]) {
                winAmount = slotPayouts[resultStr];
                winMessage = `🎉 Выигрыш ${winAmount} монет!`;
            } else if (finalResults[0] === finalResults[1] || finalResults[1] === finalResults[2]) {
                winAmount = 15;
                winMessage = `👍 Две одинаковые! +15 монет`;
            }
            
            userBalance += winAmount;
            updateBalance();
            
            document.getElementById('result').innerHTML = `
                <div class="result-text">${winMessage}</div>
                <div style="font-size: 14px; color: #666;">Баланс: ${userBalance} монет</div>
            `;
            
            // Отправляем РЕЗУЛЬТАТ в Google Sheets
            sendToGoogleSheets('slots_result', 10, winAmount);
            saveResult(`🎰 Слоты: ${winMessage}`);
            
            spinBtn.disabled = false;
            isSpinning = false;
        }
    }, spinInterval);
}

// Обновляем функцию магазина
function buyItem() {
    if (selectedShopItem === null) return;
    
    const prices = [50, 100, 200, 1000];
    const items = [
        "🎁 Набор стикеров",
        "☕ Кофе с водителем", 
        "🚕 Поездка 15 мин",
        "💵 Вывод денег"
    ];
    
    const price = prices[selectedShopItem];
    const item = items[selectedShopItem];
    
    if (userBalance >= price) {
        userBalance -= price;
        updateBalance();
        
        // Отправляем в Google Sheets
        sendToGoogleSheets('shop_purchase', price, 0);
        
        document.getElementById('result').innerHTML = `
            <div class="result-text">🎉 Поздравляем с покупкой!</div>
            <div style="font-size: 14px; color: #666;">Вы приобрели: ${item}</div>
        `;
        
        saveResult(`🛍️ Куплен: ${item}`);
        selectedShopItem = null;
        document.querySelectorAll('.shop-item').forEach(item => item.classList.remove('selected'));
    } else {
        document.getElementById('result').innerHTML = `
            <div class="result-text">❌ Недостаточно монет</div>
            <div style="font-size: 14px; color: #666;">Нужно: ${price} монет</div>
        `;
    }
}

// ==================== ФУНКЦИИ СТАТИСТИКИ ====================

// Проверка связи с Google Sheets
async function testConnection() {
    try {
        const response = await fetch(GAS_URL);
        const text = await response.text();
        document.getElementById('result').innerHTML = `
            <div class="result-text">✅ Связь с Google Sheets установлена</div>
            <div style="font-size: 14px; color: #666;">Сервер отвечает: "${text}"</div>
            <button onclick="openGoogleSheets()" style="background: #34A853; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">
                📊 Открыть таблицу
            </button>
        `;
    } catch (error) {
        document.getElementById('result').innerHTML = `
            <div class="result-text">❌ Ошибка связи</div>
            <div style="font-size: 14px; color: #666;">${error.message}</div>
        `;
    }
}

// Показать облачную статистику
function showCloudStats() {
    const totalGames = gameStats.length;
    const totalWins = gameStats.reduce((sum, stat) => sum + (stat.win || 0), 0);
    const totalBets = gameStats.reduce((sum, stat) => sum + (stat.bet || 0), 0);
    const profit = totalWins - totalBets;
    
    const statsHTML = `
        <div class="result-text">☁️ Облачная статистика</div>
        <div style="text-align: left; font-size: 14px; color: #666; line-height: 1.5;">
            <strong>📈 Ваша активность:</strong><br>
            • Всего игр: ${totalGames}<br>
            • Потрачено: ${totalBets} монет<br>
            • Выиграно: ${totalWins} монет<br>
            • Прибыль: <span style="color: ${profit >= 0 ? '#4CAF50' : '#f44336'}">${profit} монет</span><br>
            • ID игрока: ${getUserId()}<br><br>
            
            <strong>☁️ Google Sheets:</strong><br>
            • Все данные дублируются в облако<br>
            • Доступ к полной истории<br>
            • Автоматическое резервное копирование
        </div>
        <div style="margin-top: 15px;">
            <button onclick="testConnection()" style="background: #FF9800; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">
                🔗 Проверить связь
            </button>
            <button onclick="openGoogleSheets()" style="background: #34A853; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">
                📊 Открыть таблицу
            </button>
            <button onclick="exportStats()" style="background: #2196F3; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">
                💾 Экспорт данных
            </button>
        </div>
    `;
    
    document.getElementById('result').innerHTML = statsHTML;
}

// Открыть Google Таблицу
function openGoogleSheets() {
    window.open('https://docs.google.com/spreadsheets/d/17t8gn3D_i-xhUv_iOJL6GPdlJDywdAaSaKmUBOoE15E/edit', '_blank');
}

// Экспорт статистики
function exportStats() {
    const dataStr = JSON.stringify(gameStats, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `taxi-stats-${getUserId()}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}
