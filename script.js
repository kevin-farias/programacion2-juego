const zombie = document.getElementById('zombie');
const statusText = document.getElementById('status');
const timerText = document.getElementById('timer');
const breathText = document.getElementById('breath');

let zombiePos = 10;
let meditating = false;
let gameOver = false;

let survivalTime = 0;
let breathTime = 5.0;
let breathInterval, survivalInterval;

function moveZombie() {
  if (gameOver) return;

  if (meditating) {
    zombiePos = Math.max(0, zombiePos - 0.2);
  } else {
    zombiePos = Math.min(70, zombiePos + 0.5);
  }

  zombie.style.left = zombiePos + "%";

  if (zombiePos >= 65) {
    statusText.innerText = "¡El zombi te alcanzó! 😱";
    clearInterval(survivalInterval);
    clearInterval(breathInterval);
    gameOver = true;
  }

  requestAnimationFrame(moveZombie);
}

document.body.addEventListener('mousedown', () => {
  if (gameOver || meditating) return;
  meditating = true;
  breathTime = 5.0;
  statusText.innerText = "Respira profundo... estás en paz.";

  breathInterval = setInterval(() => {
    if (!meditating || gameOver) return;
    breathTime -= 0.1;
    breathText.innerText = `Tiempo restante de respiración: ${breathTime.toFixed(1)}s`;
    if (breathTime <= 0) {
      statusText.innerText = "¡Te quedaste sin aire! 😵";
      clearInterval(survivalInterval);
      clearInterval(breathInterval);
      gameOver = true;
    }
  }, 100);
});

document.body.addEventListener('mouseup', () => {
  if (gameOver) return;
  meditating = false;
  breathText.innerText = "Tiempo restante de respiración: 5.0s";
  clearInterval(breathInterval);
  statusText.innerText = "¡Cuidado! Has salido de tu zen.";
});

// Cronómetro de supervivencia
survivalInterval = setInterval(() => {
  if (!gameOver) {
    survivalTime += 0.1;
    timerText.innerText = `Tiempo de supervivencia: ${survivalTime.toFixed(1)}s`;
  }
}, 100);

// Inicia animación del juego
moveZombie();
