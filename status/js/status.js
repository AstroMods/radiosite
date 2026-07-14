function update(){document.getElementById('lastUpdated').textContent=new Date().toLocaleString();document.getElementById('latency').textContent=(20+Math.floor(Math.random()*15))+'ms';}
update();setInterval(update,30000);
