/* =========================
   Game Setup Hub — interactions
========================= */
document.addEventListener('DOMContentLoaded', () => {

  // Copy-to-clipboard for every code line's copy button
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy || '';
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        // fallback for browsers/contexts without Clipboard API access
        const tmp = document.createElement('textarea');
        tmp.value = text;
        tmp.style.position = 'fixed';
        tmp.style.opacity = '0';
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);
      }

      const original = btn.textContent;
      btn.textContent = 'Copied';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 1600);
    });
  });

  // Download button — replace href="#" above with the real file URL
  const downloadBtn = document.querySelector('[data-download]');
  if (downloadBtn && downloadBtn.getAttribute('href') === 'https://github.com/Vantix-Development/VRRadio/archive/refs/tags/v1.0.2.zip') {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.warn('Vantix: set a real download URL on the [data-download] link in game-setup-hub.html');
    });
  }
});
