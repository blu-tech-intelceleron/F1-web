// 🕒 Countdown Timer
const nextRaceDate = new Date("2025-11-09T13:00:00Z"); // Example: São Paulo GP
const timerEl = document.getElementById("timer");

function updateCountdown() {
  const now = new Date();
  const diff = nextRaceDate - now;
  if (diff <= 0) {
    timerEl.textContent = "🏁 Race in progress or finished!";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  timerEl.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 🧠 Quiz Game
const quizData = [
  { q: "Who won the 2024 F1 World Championship?", a: "Max Verstappen" },
  { q: "Which team uses a prancing horse logo?", a: "Ferrari" },
  { q: "How many wheels does an F1 car have?", a: "4" },
];
let currentQ = 0;

const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");

function showQuestion() {
  quizContainer.textContent = quizData[currentQ].q;
}
showQuestion();

nextBtn.addEventListener("click", () => {
  currentQ = (currentQ + 1) % quizData.length;
  showQuestion();
});

// 🗳️ Voting System
const voteForm = document.getElementById("vote-form");
const result = document.getElementById("vote-result");

voteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("driver-name").value.trim();
  if (!name) return;
  result.textContent = `✅ You voted for ${name}!`;
  localStorage.setItem("vote", name);
  voteForm.reset();
});

// 🏆 Standings (static placeholder for now)
const standings = [
  { pos: 1, driver: "Max Verstappen", team: "Red Bull" },
  { pos: 2, driver: "Lando Norris", team: "McLaren" },
  { pos: 3, driver: "Charles Leclerc", team: "Ferrari" },
];

const standingsList = document.getElementById("standings-list");
standingsList.innerHTML = standings
  .map((s) => `<li>${s.pos}. ${s.driver} – ${s.team}</li>`)
  .join("");
