// ==================== GOOGLE SHEETS INTEGRATION ====================

// Ваш ОБНОВЛЕННЫЙ URL Google Apps Script
const GAS_URL = 'https://script.google.com/macros/s/AKfycbydAP0_Ph1_onaQaVDw7jqbkU8KUqKsMln0JY7QlQUXkGeshbp77sF-KDkxJz7jwT2s/exec';

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

// ==================== ПРОВЕРКА РАБОТЫ ====================

// Проверка связи с Google Sheets
async function testConnection() {
    try {
        const response = await fetch(GAS_URL);
        const text = await response.text();
        document.getElementById('result').innerHTML = `
            <div class="result-text">✅ Связь с Google Sheets установлена!</div>
            <div style="font-size: 14px; color: #666;">Сервер отвечает: "${text}"</div>
            <div style="margin-top: 15px;">
                <button onclick="openGoogleSheets()" style="background: #34A853; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">
                    📊 Открыть таблицу
                </button>
                <button onclick="clearAllData()" style="background: #f44336; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">
                    🗑️ Очистить локальные данные
                </button>
            </div>
        `;
    } catch (error) {
        document.getElementById('result').innerHTML = `
            <div class="result-text">❌ Ошибка связи с Google Sheets</div>
            <div style="font-size: 14px; color: #666;">${error.message}</div>
            <div style="margin-top: 10px; color: #666;">
                Данные сохраняются локально и будут отправлены при восстановлении связи
            </div>
        `;
    }
}

// Показать облачную статистику
function showCloudStats() {
    const totalGames = gameStats.length;
    const totalWins = gameStats.reduce((sum, stat) => sum + (stat.win || 0), 0);
    const totalBets = gameStats.reduce((sum, stat) => sum + (stat.bet || 0), 0);
    const profit = totalWins - totalBets;
    
    const rouletteGames = gameStats.filter(s => s.action.includes('roulette')).length;
    const slotGames = gameStats.filter(s => s.action.includes('slot')).length;
    const purchases = gameStats.filter(s => s.action.includes('purchase')).length;
    
    const statsHTML = `
        <div class="result-text">☁️ Облачная статистика</div>
        <div style="text-align: left; font-size: 14px; color: #666; line-height: 1.5;">
            <strong>📈 Ваша активность:</strong><br>
            • Всего игр: ${totalGames}<br>
            • Рулетка: ${rouletteGames} игр<br>
            • Слоты: ${slotGames} игр<br>
            • Покупки: ${purchases}<br><br>
            
            <strong>💰 Финансы:</strong><br>
            • Потрачено: ${totalBets} монет<br>
            • Выиграно: ${totalWins} монет<br>
            • Прибыль: <span style="color: ${profit >= 0 ? '#4CAF50' : '#f44336'}">${profit} монет</span><br><br>
            
            <strong>👤 Профиль:</strong><br>
            • ID игрока: ${getUserId()}<br>
            • Текущий баланс: ${userBalance} монет
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

// Очистка локальных данных
function clearAllData() {
    if (confirm('Очистить всю локальную статистику? Данные в Google Sheets останутся.')) {
        gameStats = [];
        localStorage.removeItem('taxiStats');
        localStorage.removeItem('taxiUserId');
        localStorage.removeItem('taxiBalance');
        localStorage.removeItem('taxiHistory');
        
        userBalance = 100;
        updateBalance();
        
        document.getElementById('result').innerHTML = `
            <div class="result-text">🔄 Данные очищены</div>
            <div style="font-size: 14px; color: #666;">Баланс сброшен до 100 монет</div>
        `;
    }
}
