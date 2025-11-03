// 🕒 COUNTDOWN TIMER
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

// 🧠 QUIZ GAME
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

// 🏆 LIVE DRIVER STANDINGS (Ergast API)
async function loadStandings() {
  const list = document.getElementById("standings-list");
  try {
    const res = await fetch("https://ergast.com/api/f1/current/driverStandings.json");
    const data = await res.json();
    const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    list.innerHTML = standings
      .map(
        (d) =>
          `<li>${d.position}. ${d.Driver.givenName} ${d.Driver.familyName} – ${d.Constructors[0].name} (${d.points} pts)</li>`
      )
      .join("");
  } catch (err) {
    list.innerHTML = "<li>⚠️ Could not load live standings</li>";
  }
}
loadStandings();

// 🗳️ VOTING SYSTEM (MULTIPLE CHOICE)
const drivers = [
  "Max Verstappen",
  "Sergio Pérez",
  "Charles Leclerc",
  "Carlos Sainz",
  "Lando Norris",
  "Oscar Piastri",
  "Lewis Hamilton",
  "George Russell",
  "Fernando Alonso",
  "Lance Stroll",
  "Yuki Tsunoda",
  "Daniel Ricciardo",
  "Alex Albon",
  "Logan Sargeant",
  "Nico Hülkenberg",
  "Kevin Magnussen",
  "Esteban Ocon",
  "Pierre Gasly",
  "Valtteri Bottas",
  "Zhou Guanyu"
];

const voteForm = document.getElementById("vote-form");
const result = document.getElementById("vote-result");

let votes = JSON.parse(localStorage.getItem("votes")) || {};
let votedDriver = localStorage.getItem("votedDriver");

// Build driver list dynamically
function renderVoteOptions() {
  if (votedDriver) {
    showResults();
    return;
  }

  voteForm.innerHTML = drivers
    .map(
      (d) => `
      <label style="display:block;margin:6px 0;">
        <input type="radio" name="driver" value="${d}" required /> ${d}
      </label>`
    )
    .join("") + `<button type="submit">Vote</button>`;
}

voteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (votedDriver) return;

  const selected = document.querySelector('input[name="driver"]:checked');
  if (!selected) return alert("Please select a driver!");

  const name = selected.value;
  votes[name] = (votes[name] || 0) + 1;
  localStorage.setItem("votes", JSON.stringify(votes));
  localStorage.setItem("votedDriver", name);
  votedDriver = name;
  showResults();
});

function showResults() {
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  result.innerHTML = `<h3>You voted for ${votedDriver}! 🏎️</h3><p>Current vote totals:</p><ul>` +
    drivers
      .map(
        (d) =>
          `<li>${d}: ${votes[d] || 0} vote${(votes[d] || 0) === 1 ? "" : "s"} (${totalVotes ? Math.round(((votes[d] || 0) / totalVotes) * 100) : 0}%)</li>`
      )
      .join("") +
    "</ul>";
}

renderVoteOptions();
