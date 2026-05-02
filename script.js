let money = 0;
let currentOrder = [];
let myPizza = [];
let unlocked = ['Sauce', 'Cheese', 'Pepperoni'];
let boostActive = false;
let boostTime = 0;

const emojis = { 
    Sauce:'🍅', Cheese:'🧀', Pepperoni:'🥩', 
    Onions:'🧅', Peppers:'🫑', Mushrooms:'🍄', OliveOil:'🏺' 
};

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if(id === 'shop-screen') document.getElementById('shop-money').innerText = money;
}

function startGame() {
    showScreen('game-screen');
    newCustomer();
}

function newCustomer() {
    myPizza = [];
    document.getElementById('topping-layer').innerHTML = "";
    
    // Generate order based on unlocked items
    let length = Math.floor(Math.random() * 2) + 2; // 2 to 3 steps
    currentOrder = [];
    for(let i=0; i<length; i++) {
        currentOrder.push(unlocked[Math.floor(Math.random() * unlocked.length)]);
    }
    
    document.getElementById('order-display').innerText = currentOrder.join(" ➔ ");
}

function addTopping(ing) {
    myPizza.push(ing);
    let t = document.createElement('div');
    t.className = 'topping-img';
    t.innerText = emojis[ing];
    // Random placement within the circle
    t.style.left = (Math.random() * 60 + 20) + "%";
    t.style.top = (Math.random() * 60 + 20) + "%";
    document.getElementById('topping-layer').appendChild(t);
}

function servePizza() {
    const feedback = document.getElementById('feedback-text');
    let isCorrect = JSON.stringify(myPizza) === JSON.stringify(currentOrder);

    if (isCorrect) {
        let reward = boostActive ? 30 : 20; // 1.5x reward (20 * 1.5 = 30)
        money += reward;
        feedback.innerText = "✨ PERFECT! +$" + reward;
        feedback.style.color = "#2ecc71";
    } else {
        money -= 10;
        feedback.innerText = "❌ WRONG ORDER! -$10";
        feedback.style.color = "#e74c3c";
    }

    document.getElementById('money').innerText = money;
    setTimeout(() => { feedback.innerText = ""; newCustomer(); }, 1500);
}

function buyIngredient(ing, cost) {
    if (money >= cost && !unlocked.includes(ing)) {
        money -= cost;
        unlocked.push(ing);
        document.getElementById(`btn-${ing}`).classList.remove('locked');
        document.getElementById(`btn-${ing}`).disabled = false;
        document.getElementById(`buy-${ing}`).disabled = true;
        document.getElementById(`buy-${ing}`).innerText = "UNLOCKED";
        document.getElementById('shop-money').innerText = money;
        document.getElementById('money').innerText = money;
    }
}

function buyBoost(cost) {
    if (money >= cost && !boostActive) {
        money -= cost;
        boostActive = true;
        boostTime = 60;
        document.getElementById('boost-timer').classList.remove('hidden');
        document.getElementById('shop-money').innerText = money;
        document.getElementById('money').innerText = money;
        
        let timer = setInterval(() => {
            boostTime--;
            document.getElementById('timer-secs').innerText = boostTime;
            if(boostTime <= 0) {
                clearInterval(timer);
                boostActive = false;
                document.getElementById('boost-timer').classList.add('hidden');
            }
        }, 1000);
    }
}

function changeBrightness(val) {
    document.getElementById('game-container').style.filter = `brightness(${val}%)`;
}

function changeTheme(color) {
    document.documentElement.style.setProperty('--main-bg', color);
}
