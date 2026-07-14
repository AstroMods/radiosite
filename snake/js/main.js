const c = document.getElementById('game'),
   x = c.getContext('2d');
let s = [{
      x: 10,
      y: 10
   }],
   d = {
      x: 1,
      y: 0
   },
   f = {
      x: 15,
      y: 15
   };
onkeydown = e => {
   if (e.key === 'ArrowUp') d = {
      x: 0,
      y: -1
   };
   if (e.key === 'ArrowDown') d = {
      x: 0,
      y: 1
   };
   if (e.key === 'ArrowLeft') d = {
      x: -1,
      y: 0
   };
   if (e.key === 'ArrowRight') d = {
      x: 1,
      y: 0
   };
}
setInterval(() => {
   let h = {
      x: (s[0].x + d.x + 30) % 30,
      y: (s[0].y + d.y + 30) % 30
   };
   s.unshift(h);
   if (h.x === f.x && h.y === f.y) f = {
      x: Math.random() * 30 | 0,
      y: Math.random() * 30 | 0
   };
   else s.pop();
   x.fillStyle = '#000';
   x.fillRect(0, 0, 600, 600);
   x.fillStyle = 'red';
   x.fillRect(f.x * 20, f.y * 20, 20, 20);
   x.fillStyle = '#0f0';
   for (const p of s) x.fillRect(p.x * 20, p.y * 20, 20, 20);
}, 120);
