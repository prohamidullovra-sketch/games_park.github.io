* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: 
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    min-height: 100vh;
    padding: 20px;
    overflow-x: hidden;
}

.game-hub {
    display: grid;
    grid-template-columns: 320px 1fr 320px;
    gap: 30px;
    max-width: 1600px;
    margin: 0 auto;
}

/* Балланс пользователя */
.balance-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.balance {
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(45deg, #FFD700, #FFA500);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 10px 0;
}

/* Сайдбар с играми */
.sidebar {
    background: rgba(30, 30, 40, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 25px;
    padding: 25px;
    box-shadow: 
        0 25px 50px rgba(0,0,0,0.4),
        0 0 0 1px rgba(255,255,255,0.1);
    height: fit-content;
}

.sidebar h2 {
    background: linear-gradient(45deg, #ff6b6b, #ffa726);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 800;
    text-align: center;
}

.game-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.game-btn {
    padding: 15px 18px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #2a2a3a, #3a3a4a);
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    border: 2px solid transparent;
}

.game-btn:hover {
    transform: translateY(-2px);
    border-color: #ff6b6b;
    box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
}

.game-btn.active {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
}

.admin-btn {
    margin-top: 20px;
    background: linear-gradient(45deg, #ff4757, #ff3742) !important;
}

/* Основной контент */
.main-content {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 25px;
    padding: 30px;
    box-shadow: 
        0 25px 50px rgba(0,0,0,0.25),
        0 0 0 1px rgba(255,255,255,0.3);
    min-height: 600px;
}

.game-header {
    text-align: center;
    margin-bottom: 30px;
}

.taxi-icon {
    font-size: 40px;
    margin-bottom: 10px;
    filter: drop-shadow(0 5px 10px rgba(0,0,0,0.2));
}

.game-header h1 {
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 8px;
}

.subtitle {
    color: #666;
    font-size: 16px;
}

/* Рулетка */
.roulette-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.roulette-container {
    position: relative;
    width: 450px;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Исправление для рулетки */
.wheel {
    width: 400px;
    height: 400px;
    border-radius: 50%;
    position: relative;
    transition: transform 4s cubic-bezier(0.1, 0.3, 0.2, 1);
    box-shadow: 
        0 15px 30px rgba(0,0,0,0.3),
        inset 0 0 60px rgba(255,255,255,0.4);
    border: 10px solid white;
    overflow: hidden;
    transform-origin: center center;
}

.svg-container {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#rouletteSvg {
    display: block;
    transform-origin: center center;
}

.pointer {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 60px;
    background: linear-gradient(45deg, #ff4757, #ff3742);
    clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
    z-index: 100;
    border-radius: 0 0 5px 5px;
    box-shadow: 0 10px 25px rgba(255, 71, 87, 0.5);
}

.pointer::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 25px;
    height: 25px;
    background: rgba(255,255,255,0.3);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

/* Однорукий бандит */
.slot-machine {
    background: linear-gradient(135deg, #2a2a3a, #3a3a4a);
    border-radius: 15px;
    padding: 20px;
    margin: 15px 0;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.slot-machine h3 {
    color: white;
    text-align: center;
    margin-bottom: 15px;
    font-size: 18px;
}

.slots-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 15px;
}

.slot {
    width: 60px;
    height: 60px;
    background: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    box-shadow: inset 0 0 8px rgba(0,0,0,0.3);
    border: 2px solid #ff6b6b;
}

.slot-machine-buttons {
    display: flex;
    gap: 10px;
}

.spin-slot-btn {
    flex: 1;
    padding: 10px;
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s ease;
}

.spin-slot-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(255, 107, 107, 0.4);
}

.spin-slot-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Магазин */
.shop {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
}

.shop h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #2d3436;
}

.shop-items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 20px;
}

.shop-item {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.shop-item:hover {
    transform: translateY(-3px);
    border-color: #667eea;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.shop-item.selected {
    border-color: #ff6b6b;
    background: linear-gradient(135deg, #ffeaa7, #fd79a8);
}

.item-price {
    font-weight: 600;
    color: #ff6b6b;
    margin-top: 8px;
}

.shop-buttons {
    display: flex;
    gap: 10px;
}

.buy-btn {
    flex: 1;
    padding: 12px;
    background: linear-gradient(45deg, #4ecdc4, #45b7d1);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.buy-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(77, 205, 196, 0.4);
}

.buy-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Игры */
.game-area {
    display: none;
    text-align: center;
}

.game-area.active {
    display: block;
}

/* Сапер */
.minesweeper-board {
    display: grid;
    grid-template-columns: repeat(8, 40px);
    gap: 2px;
    margin: 20px auto;
    justify-content: center;
}

.minesweeper-cell {
    width: 40px;
    height: 40px;
    background: #ddd;
    border: 2px solid #999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
}

.minesweeper-cell.revealed {
    background: #eee;
    border-color: #777;
}

.minesweeper-cell.mine {
    background: #ff6b6b;
}

/* Три в ряд */
.match3-board {
    display: grid;
    grid-template-columns: repeat(8, 50px);
    gap: 2px;
    margin: 20px auto;
    justify-content: center;
}

.match3-cell {
    width: 50px;
    height: 50px;
    border: 2px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
    background: white;
}

.match3-cell.selected {
    border-color: #ff6b6b;
    background: #ffeaa7;
}

/* Общие стили для результатов */
.result {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border-radius: 15px;
    padding: 20px;
    margin: 15px auto;
    border: 2px solid rgba(255,255,255,0.8);
    width: 100%;
    max-width: 400px;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 
        inset 0 2px 10px rgba(0,0,0,0.1),
        0 5px 20px rgba(0,0,0,0.05);
}

.result-text {
    font-size: 18px;
    font-weight: 600;
    color: #2d3436;
    margin-bottom: 5px;
}

.buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin: 20px 0;
}

button {
    padding: 12px 25px;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.spin-btn {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
}

.spin-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
}

.spin-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.history-btn {
    background: linear-gradient(45deg, #a29bfe, #6c5ce7);
    color: white;
}

.history-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(108, 92, 231, 0.4);
}

.history {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border-radius: 15px;
    padding: 20px;
    margin-top: 20px;
    max-height: 200px;
    overflow-y: auto;
    display: none;
    text-align: center;
}

/* Админ панель */
.admin-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0,0,0,0.3);
    z-index: 1000;
    display: none;
}

.admin-panel h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #2d3436;
}

.admin-input {
    width: 100%;
    padding: 15px;
    border: 2px solid #ddd;
    border-radius: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    text-align: center;
}

.admin-buttons {
    display: flex;
    gap: 15px;
}

.admin-btn-panel {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.confirm-btn {
    background: linear-gradient(45deg, #4ecdc4, #45b7d1);
    color: white;
}

.cancel-btn {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
}

.floating-elements {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.floating-element {
    position: absolute;
    font-size: 20px;
    opacity: 0.1;
    animation: float 20s infinite linear;
}

@keyframes float {
    0% { transform: translateY(100vh) rotate(0deg); }
    100% { transform: translateY(-100px) rotate(360deg); }
}

.pulse { animation: pulse 2s infinite; }
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.win-glow { animation: winGlow 2s infinite alternate; }
@keyframes winGlow {
    from { box-shadow: 0 0 20px rgba(76, 175, 80, 0.6); }
    to { box-shadow: 0 0 30px rgba(76, 175, 80, 0.9); }
}

.slot-spinning {
    animation: slotSpin 0.1s infinite;
}

@keyframes slotSpin {
    from { transform: translateY(-10px); }
    to { transform: translateY(10px); }
}
