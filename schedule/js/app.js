/* =========================
   DATA (EDIT HERE ONLY)
========================= */

/* 📅 SCHEDULE */
const scheduleData = [
  { time: "08:00 - 10:00", title: "Morning Beats with DJ Nova" },
  { time: "10:00 - 13:00", title: "Chill Zone Mix" },
  { time: "13:00 - 16:00", title: "Afternoon Drive with DJ Vex" },
  { time: "16:00 - 20:00", title: "Live Requests & Top Hits" },
  { time: "20:00 - 00:00", title: "Night EDM Session" }
];

/* 🎙️ PRESENTERS */
const presentersData = [
  {
    name: "DJ Nova",
    role: "Morning Host",
    image: "https://i.imgur.com/1Q9Z1Zm.png"
  },
  {
    name: "DJ Vex",
    role: "Afternoon Drive",
    image: "https://i.imgur.com/2mXzY8A.png"
  },
  {
    name: "Luna Wave",
    role: "Chill / Night DJ",
    image: "https://i.imgur.com/3xQZy7B.png"
  },
  {
    name: "Axel R",
    role: "Live Requests DJ",
    image: "https://i.imgur.com/4kYzP9C.png"
  }
];

/* =========================
   RENDER FUNCTIONS
========================= */

function loadSchedule() {
  const el = document.getElementById("schedule");
  el.innerHTML = "";

  scheduleData.forEach(show => {
    el.innerHTML += `
      <div class="card">
        <div class="time">${show.time}</div>
        ${show.title}
      </div>
    `;
  });
}

function loadPresenters() {
  const el = document.getElementById("presenters");
  el.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "grid";

  presentersData.forEach(p => {
    grid.innerHTML += `
      <div class="presenter">
        <img class="avatar" src="${p.image}" alt="${p.name}">
        <div class="name">${p.name}</div>
        <div class="role">${p.role}</div>
      </div>
    `;
  });

  el.appendChild(grid);
}

/* =========================
   TABS SYSTEM
========================= */

document.addEventListener("DOMContentLoaded", () => {
  loadSchedule();
  loadPresenters();

  const buttons = document.querySelectorAll(".tab-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;

      document.querySelectorAll(".section")
        .forEach(s => s.classList.remove("active"));

      document.getElementById(tab).classList.add("active");

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});
