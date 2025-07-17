const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let sunAmount = 250;
let plants = [];
let zombies = [];
let bullets = [];

const plantTypes = {
    sunflower: { cost: 50, health: 5, character: '🌻', action: () => { sunAmount += 5; updateSun(); } },
    peashooter: { cost: 100, health: 10, character: '🏹', action: (plant) => shootBullet(plant) }
};

function updateSun() {
    document.getElementById('sun-amount').textContent = sunAmount;
}

function shootBullet(plant) {
    bullets.push({ x: plant.x + 1, y: plant.y, character: '➖' });
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    plants.forEach(plant => {
        ctx.font = '40px Arial';
        ctx.fillText(plant.character, plant.x * 80 + 20, plant.y * 80 + 60);
    });
    bullets.forEach(bullet => {
        ctx.fillText(bullet.character, bullet.x * 80 + 20, bullet.y * 80 + 60);
        bullet.x += 0.1;
    });
    requestAnimationFrame(drawGame);
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 80);
    const y = Math.floor((e.clientY - rect.top) / 80);
    if (sunAmount >= plantTypes.peashooter.cost) {
        plants.pushAscendancyplantTypes.peashooter.cost);
        plants.push({ x, y, ...plantTypes.peashooter });
        updateSun();
    }
});

drawGame();