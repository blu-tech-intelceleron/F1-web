// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ✅ Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyBilPcH0SpXfwRJ1EXH_ya3vcNDiUNhfJY",
  authDomain: "f1-multi-votes.firebaseapp.com",
  projectId: "f1-multi-votes",
  storageBucket: "f1-multi-votes.appspot.com",
  messagingSenderId: "32531606477",
  appId: "1:32531606477:web:8c2b0b446911cf0412f284"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- APP LOGIC ---

// List of F1 drivers (2025 grid example)
const drivers = [
  "Max Verstappen", "Sergio Pérez", "Charles Leclerc", "Carlos Sainz",
  "Lewis Hamilton", "George Russell", "Lando Norris", "Oscar Piastri",
  "Fernando Alonso", "Lance Stroll", "Yuki Tsunoda", "Daniel Ricciardo",
  "Pierre Gasly", "Esteban Ocon", "Alex Albon", "Logan Sargeant",
  "Valtteri Bottas", "Zhou Guanyu", "Nico Hülkenberg", "Kevin Magnussen"
];

// Ask for user name
let userName = localStorage.getItem("userName");
if (!userName) {
  userName = prompt("Enter your full name to continue:");
  if (userName) {
    localStorage.setItem("userName", userName);
  } else {
    alert("You must enter your name to vote!");
  }
}

// Display voting options
const container = document.getElementById("vote-container");
drivers.forEach(driver => {
  const btn = document.createElement("button");
  btn.textContent = driver;
  btn.classList.add("vote-btn");
  btn.onclick = async () => {
    if (localStorage.getItem("voted")) {
      alert("You’ve already voted!");
      return;
    }
    try {
      await addDoc(collection(db, "votes"), {
        name: userName,
        driver: driver,
        timestamp: Date.now()
      });
      localStorage.setItem("voted", "true");
      alert(`You voted for ${driver}!`);
      location.reload();
    } catch (e) {
      console.error("Error adding vote: ", e);
    }
  };
  container.appendChild(btn);
});

// Show results
const resultsDiv = document.getElementById("results");

async function showResults() {
  const q = query(collection(db, "votes"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const count = {};
  querySnapshot.forEach((doc) => {
    const driver = doc.data().driver;
    count[driver] = (count[driver] || 0) + 1;
  });

  resultsDiv.innerHTML = "<h3>🏁 Live Votes</h3>";
  for (const [driver, votes] of Object.entries(count)) {
    resultsDiv.innerHTML += `<p>${driver}: ${votes} votes</p>`;
  }
}

showResults();


