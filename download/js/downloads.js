document.addEventListener("DOMContentLoaded", () => {

    const downloadURL =
        "https://github.com/Vantix-Development/VRRadio/releases/latest";

    // BUTTON CLICK EFFECTS (safe + reusable)
    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {

            btn.style.transform = "scale(0.96)";

            setTimeout(() => {
                btn.style.transform = "";
            }, 120);

        });
    });

    // DOWNLOAD BUTTON (UX IMPROVED)
    const downloadBtn = document.querySelector(".download-btn");

    if (downloadBtn) {

        let isDownloading = false;

        downloadBtn.addEventListener("click", () => {

            if (isDownloading) return;
            isDownloading = true;

            const originalText = downloadBtn.textContent;

            // UI FEEDBACK
            downloadBtn.textContent = "Preparing Download...";
            downloadBtn.disabled = true;
            downloadBtn.style.opacity = "0.7";
            downloadBtn.style.cursor = "not-allowed";

            // small delay = feels like real action
            setTimeout(() => {

                downloadBtn.textContent = "Downloading...";

                // trigger download
                const a = document.createElement("a");
                a.href = downloadURL;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                document.body.appendChild(a);
                a.click();
                a.remove();

                // reset after short UX delay
                setTimeout(() => {
                    downloadBtn.textContent = originalText;
                    downloadBtn.disabled = false;
                    downloadBtn.style.opacity = "";
                    downloadBtn.style.cursor = "";

                    isDownloading = false;

                }, 1200);

            }, 600);
        });
    }

});
