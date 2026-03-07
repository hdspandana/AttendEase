(function(){
  const attendedEl = document.getElementById('attended');
  const absentEl   = document.getElementById('absent');
  const totalEl    = document.getElementById('totalSem');
  const targetEl   = document.getElementById('target');
  const calcBtn    = document.getElementById('calcBtn');

  const errorBox = document.getElementById('errorBox');
  const result   = document.getElementById('result');
  const summary  = document.getElementById('summary');
  const numbers  = document.getElementById('numbers');
  const big      = document.getElementById('big');
  const explain  = document.getElementById('explain');
  const shareRow = document.getElementById('shareRow');
  const waShare  = document.getElementById('waShare');
  const igShare  = document.getElementById('igShare');

  function hideAll(){
    errorBox.style.display = 'none';
    result.style.display   = 'none';
    shareRow.style.display = 'none';
    big.style.display      = 'none';
    explain.style.display  = 'none';
  }

  function showError(msg){
    errorBox.textContent   = msg;
    errorBox.style.display = 'block';
    result.style.display   = 'none';
    shareRow.style.display = 'none';
  }

  async function calculate(){
    hideAll();

    const payload = {
      attended : Number(attendedEl.value),
      absent   : Number(absentEl.value),
      totalSem : Number(totalEl.value),
      target   : Number(targetEl.value)
    };

    calcBtn.disabled    = true;
    calcBtn.textContent = 'Calculating…';

    try {
      const res  = await fetch(`${CONFIG.API_URL}/calculate`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.error){
        showError(data.error);
        if (data.unreachable){
          result.style.display = 'block';
          summary.innerHTML = `Conducted: <b>${data.conducted}</b> • Remaining: <b>${data.remaining}</b>`;
        }
        return;
      }

      const { conducted, attended, absent, remaining,
              currentPercent, requiredAttended,
              needToAttend, maxBunk, target } = data;

      result.style.display = 'block';
      summary.innerHTML =
        `Conducted: <b>${conducted}</b> • Attended: <b>${attended}</b> • ` +
        `Absent: <b>${absent}</b> • Remaining: <b>${remaining}</b>`;

      numbers.innerHTML =
        `Current Attendance: <b>${currentPercent.toFixed(2)}%</b><br>` +
        `Required by end: <b>${requiredAttended}</b>`;

      big.style.display = 'block';
      big.innerHTML = `${needToAttend} TO ATTEND🤷‍♀️ • ${maxBunk} CAN BUNK😎`;

      explain.style.display = 'block';
      explain.innerText =
        `Attend ${needToAttend} of the remaining ${remaining} classes to stay above ${target}%.`;

      const shareText =
        `Attendance Report\nAttended: ${attended}\nAbsent: ${absent}\n` +
        `Conducted: ${conducted}\nCurrent: ${currentPercent.toFixed(2)}%\n` +
        `Target: ${target}%\n${needToAttend} to attend • ${maxBunk} can bunk`;

      waShare.href = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      igShare.onclick = async () => {
        await navigator.clipboard.writeText(shareText);
        alert("Copied! Paste in Instagram.");
        window.open("https://www.instagram.com", "_blank");
      };

      shareRow.style.display = 'flex';

    } catch (err) {
      showError("Could not reach the server. Please try again.");
      console.error(err);
    } finally {
      calcBtn.disabled    = false;
      calcBtn.textContent = 'Calculate';
    }
  }

  calcBtn.addEventListener('click', calculate);
})();