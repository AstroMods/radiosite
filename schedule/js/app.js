/* =========================
   DATA (EDIT HERE ONLY)
========================= */

/* 📅 SCHEDULE */
const scheduleData = [
  { time: "TBD", title: "EMO NIGHT /w Vantix" }
];

/* 🎙️ PRESENTERS */
const presentersData = [
  {
    name: "Vinnie",
    role: "Chief Executive Officer",
    image: "https://cdn.discordapp.com/avatars/1078071377401221252/c18e95efc45aff8514d1b8f02211d313.png"
  },
  {
    name: "Laffy",
    role: "Chief Operating Officer",
    image: "https://cdn.discordapp.com/avatars/1418823351312453652/e8317cb908c45a239b00546a3655e791.png"
  },
   {
    name: "Frost",
    role: "Station Presenter",
    image: "https://cdn.discordapp.com/avatars/1433554476899504243/32d591af6da05ff81023ed1e8c02d256.png"
  },
  {
    name: "Ghost",
    role: "Station Presenter",
    image: "https://cdn.discordapp.com/avatars/1173825128384180285/06dc93f066151148530d650da90936c7.png"
  },
  {
    name: "Vincent",
    role: "Station Presenter",
    image: "https://cdn.discordapp.com/avatars/1356141977107955774/616d97e1f4147da7e545a6fc5d3ed713.png"
  },
   {
    name: "ghostdakid",
    role: "Station Partner",
    image: "https://vantixradio.online/assets/channels4_profile.jpg"
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
