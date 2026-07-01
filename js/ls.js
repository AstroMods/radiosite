import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://roxffpgzusrbynuuehwd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJveGZmcGd6dXNyYnludXVlaHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4OTMzMTYsImV4cCI6MjA5ODQ2OTMxNn0.hd1S7IO_BfeQH6fY5bBRrxBQODVETu0FlqwDaVBAwQg"
);

let userId = localStorage.getItem("uid");

if (!userId) {
  userId = crypto.randomUUID();
  localStorage.setItem("uid", userId);
}

// smooth counter animation
let currentDisplayed = 0;

function animateCount(target) {
  const step = () => {
    if (currentDisplayed === target) return;

    const diff = target - currentDisplayed;
    currentDisplayed += Math.sign(diff);

    document.getElementById("listenerCount").textContent = currentDisplayed;

    requestAnimationFrame(step);
  };

  step();
}

// LIVE badge toggle
function updateLiveBadge(count) {
  let badge = document.getElementById("liveBadge");

  if (!badge) {
    badge = document.createElement("span");
    badge.id = "liveBadge";
    badge.style.marginLeft = "8px";
    badge.style.padding = "2px 6px";
    badge.style.fontSize = "10px";
    badge.style.background = "red";
    badge.style.color = "white";
    badge.style.borderRadius = "4px";
    document.querySelector(".listener-counter").appendChild(badge);
  }

  badge.textContent = count > 0 ? "LIVE" : "OFFLINE";
  badge.style.background = count > 0 ? "red" : "gray";
}

async function goOnline() {
  try {
    await supabase.from("online_users").upsert({
      id: userId,
      last_seen: Date.now()
    });
  } catch (err) {
    console.error("goOnline error:", err);
  }
}

async function updateCount() {
  try {
    const { data, error } = await supabase
      .from("online_users")
      .select("id");

    if (error) throw error;

    const count = data?.length || 0;

    animateCount(count);
    updateLiveBadge(count);

  } catch (err) {
    console.error("updateCount error:", err);
    animateCount(0);
    updateLiveBadge(0);
  }
}

window.addEventListener("beforeunload", async () => {
  try {
    await supabase.from("online_users").delete().eq("id", userId);
  } catch (err) {}
});

async function start() {
  await goOnline();
  await updateCount();

  setInterval(async () => {
    await goOnline();
    await updateCount();
  }, 5000);
}

start();
