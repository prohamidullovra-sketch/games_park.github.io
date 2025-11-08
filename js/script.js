// Система монет
let userBalance = parseInt(localStorage.getItem('taxiBalance')) || 100;
let selectedShopItem = null;

// Обновляем баланс на странице
function updateBalance() {
    document.getElementById('balance').textContent = userBalance + ' монет';
    localStorage.setItem('taxiBalance', userBalance);
}

// Рулетка с монетами
const rouletteResults = [
    { coins: 50, text: "🎉 Джекпот! +50 монет!", type: "big_win" },
    { coins: 25, text: "🔥 Отлично! +25 монет!", type: "win" },
    { coins: 15, text: "⭐ Хорошо! +15 монет!", type: "win" },
    { coins: 10, text: "👍 Неплохо! +10 монет", type: "small_win" },
    { coins: 5, text: "💫 Маловато, но +5 монет", type: "small_win" },
    { coins: 0, text: "😔 Мимо! Попробуйте снова", type: "lose" },
    { coins: 0, text: "💫 Почти! Еще попытка?", type: "lose" },
    { coins: 0, text: "🎰 Упс! В следующий раз", type: "lose" },
    { coins: 0, text: "🌟 Близко! Продолжайте", type: "lose" },
    { coins: 0, text: "📉 Не в этот раз", type: "lose" },
    { coins: 0, text: "💔 Почти угадали!", type: "lose" },
    { coins: 0, text: "⚡ Почти! Не сдавайтесь", type: "lose" }
];

// Однорукий бандит
const slotSymbols = ['🍒', '🍋', '⭐', '🍉', '🔔', '💎'];
const slotPayouts = {
    '🍒🍒🍒': 50,
    '⭐⭐⭐': 100,
    '💎💎💎': 200,
    '🔔🔔🔔': 75
};

let isSpinning = false;
let resultsHistory = JSON.parse(localStorage.getItem('taxiHistory')) || [];

function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const elements = ['🚗', '🚕', '🚙', '💎', '⭐', '🎰'];
    
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + 'vw';
        element.style.animationDelay = Math.random() * 20 + 's';
        element.style.fontSize = (Math.random() * 20 + 16) + 'px';
        container.appendChild(element);
    }
}

function spinRoulette() {
    if (isSpinning || userBalance < 5) return;
    
    userBalance -= 5;
    updateBalance();
    isSpinning = true;
    
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
            
            saveResult(result.text);
            
            setTimeout(() => {
                spinBtn.classList.add('pulse');
                spinBtn.disabled = false;
                isSpinning = false;
            }, 2000);
            
        }, 4000);
    }, 50);
}

function spinSlots() {
    if (isSpinning || userBalance < 10) return;
    
    userBalance -= 10;
    updateBalance();
    isSpinning = true;
    
    const slots = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];
    const spinBtn = document.getElementById('spinSlotBtn');
    
    spinBtn.disabled = true;
    slots.forEach(slot => slot.classList.add('slot-spinning'));
    
    const results = [];
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
            
            // Финальные результаты
            const finalResults = slots.map(() => slotSymbols[Math.floor(Math.random() * slotSymbols.length)]);
            slots.forEach((slot, i) => {
                slot.textContent = finalResults[i];
                slot.classList.remove('slot-spinning');
            });
            
            // Проверка выигрыша
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
            
            saveResult(`🎰 Слоты: ${winMessage}`);
            
            spinBtn.disabled = false;
            isSpinning = false;
        }
    }, spinInterval);
}

function selectShopItem(index) {
    document.querySelectorAll('.shop-item').forEach(item => item.classList.remove('selected'));
    document.querySelectorAll('.shop-item')[index].classList.add('selected');
    selectedShopItem = index;
}

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

function saveResult(text) {
    const resultData = {
        text: text,
        balance: userBalance,
        timestamp: new Date().toLocaleString('ru-RU')
    };
    
    resultsHistory.unshift(resultData);
    if (resultsHistory.length > 20) resultsHistory = resultsHistory.slice(0, 20);
    localStorage.setItem('taxiHistory', JSON.stringify(resultsHistory));
}

function displayHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = '';
    
    if (resultsHistory.length === 0) {
        historyDiv.innerHTML = '<div style="text-align: center; color: #666;">История пуста</div>';
        return;
    }
    
    resultsHistory.forEach((item) => {
        const historyItem = document.createElement('div');
        historyItem.style.padding = '10px';
        historyItem.style.borderBottom = '1px solid #eee';
        historyItem.innerHTML = `
            <div>${item.text}</div>
            <small style="color: #666;">${item.timestamp}</small>
        `;
        historyDiv.appendChild(historyItem);
    });
}

function toggleHistory() {
    const historyDiv = document.getElementById('history');
    if (historyDiv.style.display === 'block') {
        historyDiv.style.display = 'none';
    } else {
        displayHistory();
        historyDiv.style.display = 'block';
    }
}

function showComingSoon(gameName) {
    document.getElementById('result').innerHTML = `
        <div class="result-text">🚧 Скоро будет!</div>
        <div style="font-size: 14px; color: #666;">Игра "${gameName}" в разработке</div>
    `;
}

function showGame(game) {
    if (game !== 'roulette') showComingSoon('Эта игра');
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    updateBalance();
});
