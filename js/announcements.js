async function loadAnnouncements() {
    try {
        const res = await fetch("/an-config.json?cache=" + Date.now());
        const data = await res.json();

        const list = document.getElementById("announcementList");

        if (!Array.isArray(data) || data.length === 0) {
            list.innerHTML = `<div class="announcement-item">No announcements.</div>`;
            return;
        }

        list.innerHTML = data.map(item => `
            <div class="announcement-item">
                📢 ${item.text}
                <div class="announcement-time">
                    ${item.time || ""}
                </div>
            </div>
        `).join("");

    } catch (err) {
        console.error("Announcement load error:", err);
    }
}

// initial load
loadAnnouncements();

// auto refresh every 20 seconds
setInterval(loadAnnouncements, 20000);
