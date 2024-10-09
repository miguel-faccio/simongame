let sequence = [];
let playerInput = [];
let score = 0;
let gameStarted = false;
const buttons = document.querySelectorAll('.game-button');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('game-message');

// Mapeia os índices dos botões para suas cores
const buttonColors = [
    'rgba(255, 0, 0, 0.8)',   // Pyro (red to orange)
    'rgba(255, 165, 0, 0.8)', // Geo (orange to yellow)
    'rgba(0, 170, 5, 0.8)',   // Dendro (green)
    'rgba(0, 156, 96, 0.8)',  // Anemo (greenish)
    'rgba(170, 241, 241, 0.8)', // Cryo (light blue)
    'rgba(173, 216, 230, 0.8)', // Hydro (blue)
    'rgba(128, 0, 128, 0.8)'  // Electro (purple)
];

document.getElementById('start-game').addEventListener('click', startGame);

function startGame() {
    sequence = [];
    score = 0;
    playerInput = [];
    gameStarted = true;
    scoreDisplay.textContent = score;
    messageDisplay.textContent = '';
    nextSequence();
}

function nextSequence() {
    playerInput = [];
    score++;
    scoreDisplay.textContent = score;

    const randomButton = Math.floor(Math.random() * buttons.length);
    sequence.push(randomButton);
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        highlightButton(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 1000);
}

function highlightButton(index) {
    const button = buttons[index];
    const color = buttonColors[index]; // Obter a cor correspondente ao botão
    button.classList.add('active');

    // Aplicar a aura colorida
    button.style.boxShadow = `0 0 20px 5px ${color}`;

    // Remove a classe após um tempo para criar o efeito de brilho
    setTimeout(() => {
        button.classList.remove('active');
        button.style.boxShadow = ''; // Remove a aura ao voltar ao normal
    }, 500);
}

// Captura a entrada do jogador
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (!gameStarted) return;
        playerInput.push(index);
        highlightButton(index);
        checkPlayerInput();
    });
});

function checkPlayerInput() {
    const lastIndex = playerInput.length - 1;
    if (playerInput[lastIndex] !== sequence[lastIndex]) {
        messageDisplay.textContent = 'Você errou! Tente novamente.';
        gameStarted = false;
        return;
    }
    if (playerInput.length === sequence.length) {
        setTimeout(nextSequence, 1000);
    }
}
