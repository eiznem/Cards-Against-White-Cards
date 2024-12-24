let lobby = [];
let round = 1;
let selectedCard = null;
let cards = ["Card 1", "Card 2", "Card 3", "Card 4"]; // Replace with a JSON-based card library for more options

function joinLobby() {
    const playerName = document.getElementById("playerName").value;
    if (playerName) {
        lobby.push(playerName);
        document.getElementById("players").innerText = "Players: " + lobby.join(", ");
        document.getElementById("startButton").style.display = lobby.length >= 2 ? "inline-block" : "none";
    }
}

function startGame() {
    document.getElementById("lobby").style.display = "none";
    document.getElementById("game").style.display = "block";
    showCards();
    startTimer(60); // Start a 60-second timer
}

function showCards() {
    const cardContainer = document.getElementById("cards");
    cardContainer.innerHTML = ""; // Clear previous cards
    cards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.innerText = card;
        cardElement.onclick = () => selectCard(index);
        cardContainer.appendChild(cardElement);
    });
}

function selectCard(index) {
    const cardElements = document.querySelectorAll(".card");
    cardElements.forEach((el, idx) => {
        el.classList.toggle("selected", idx === index);
    });
    selectedCard = index;
}

function submitVote() {
    if (selectedCard !== null) {
        alert(`You voted for: ${cards[selectedCard]}`);
        nextRound();
    } else {
        alert("Please select a card before submitting.");
    }
}

function nextRound() {
    if (round < 10) {
        round++;
        document.querySelector("h2").innerText = `Round ${round}`;
        showCards();
        startTimer(60);
    } else {
        alert("Game Over!");
        location.reload(); // Restart the game
    }
}

function startTimer(seconds) {
    const timerElement = document.getElementById("timer");
    timerElement.innerText = `Time remaining: ${seconds}s`;
    const interval = setInterval(() => {
        seconds--;
        timerElement.innerText = `Time remaining: ${seconds}s`;
        if (seconds <= 0) {
            clearInterval(interval);
            alert("Time's up! Moving to the next round.");
            nextRound();
        }
    }, 1000);
}
