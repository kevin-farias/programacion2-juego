const zombie = document.getElementById('zombie');
const statusText = document.getElementById('status');

let zombiePos = 10; // posición inicial
let meditating = false;
let gameOver = false;

function moveZombie() {
  if (gameOver) return;

  if (meditating) {
    zombiePos = Math.max(0, zombiePos - 0.2); // se aleja
  } else {
    zombiePos = Math.min(70, zombiePos + 0.5); // se acerca
  }

  zombie.style.left = zombiePos + "%";

  if (zombiePos >= 65) {
    statusText.innerText = "¡El zombi te alcanzó! 😱";
    gameOver = true;
  }

  requestAnimationFrame(moveZombie);
}

document.body.addEventListener('mousedown', () => {
  if (gameOver) return;
  meditating = true;
  statusText.innerText = "Respira profundo... estás en paz.";
});

document.body.addEventListener('mouseup', () => {
  if (gameOver) return;
  meditating = false;
  statusText.innerText = "¡Cuidado! Has salido de tu zen.";
});

// Arranca la animación
moveZombie();
