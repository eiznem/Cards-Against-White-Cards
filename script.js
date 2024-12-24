let lobby = JSON.parse(localStorage.getItem("lobby")) || [];
let round = JSON.parse(localStorage.getItem("round")) || 1;
let selectedCard = null;
let cards = [];

// Fetch cards from JSON
fetch("cards.json")
    .then((response) => response.json())
    .then((data) => {
        cards = data;
    });

function joinLobby() {
    const playerName = document.getElementById("playerName").value;
    if (playerName) {
        lobby.push(playerName);
        localStorage.setItem("lobby", JSON.stringify(lobby));
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
    const randomCards = [];
    while (randomCards.length < 4) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        if (!randomCards.includes(cards[randomIndex])) {
            randomCards.push(cards[randomIndex]);
        }
    }
    randomCards.forEach((card, index) => {
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
        localStorage.setItem("round", round);
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

// Check for updates to lobby or round in localStorage
setInterval(() => {
    const updatedLobby = JSON.parse(localStorage.getItem("lobby")) || [];
    if (updatedLobby.length !== lobby.length) {
        lobby = updatedLobby;
        document.getElementById("players").innerText = "Players: " + lobby.join(", ");
    }

    const updatedRound = JSON.parse(localStorage.getItem("round"));
    if (updatedRound && updatedRound !== round) {
        round = updatedRound;
        document.querySelector("h2").innerText = `Round ${round}`;
    }
}, 1000);

// Initialize lobby state on page load
document.getElementById("players").innerText = "Players: " + lobby.join(", ");
document.getElementById("startButton").style.display = lobby.length >= 2 ? "inline-block" : "none";
