/* SafeHer — SOS Panel JavaScript */

let sosHoldTimer = null;
let sosActive = false;
let holdProgress = 0;

const sosBigBtn = document.getElementById('sosBigBtn');
const sosStatus = document.getElementById('sosStatus');
const sosStatusText = document.getElementById('sosStatusText');
const sosCountdown = document.getElementById('sosCountdown');

if (sosBigBtn) {
  // Hold interaction for SOS
  sosBigBtn.addEventListener('mousedown', startSOSHold);
  sosBigBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startSOSHold(); });
  sosBigBtn.addEventListener('mouseup', cancelSOSHold);
  sosBigBtn.addEventListener('mouseleave', cancelSOSHold);
  sosBigBtn.addEventListener('touchend', cancelSOSHold);
}

function startSOSHold() {
  if (sosActive) return;
  holdProgress = 0;
  sosBigBtn.style.transform = 'scale(0.95)';

  const interval = setInterval(() => {
    holdProgress += 50;
    const pct = Math.min(holdProgress / 2000, 1);
    sosBigBtn.style.background = `conic-gradient(#b91c1c ${pct * 360}deg, #dc2626 0deg)`;

    if (holdProgress >= 2000) {
      clearInterval(interval);
      triggerSOS();
    }
  }, 50);

  sosHoldTimer = interval;
}

function cancelSOSHold() {
  if (sosHoldTimer) clearInterval(sosHoldTimer);
  if (!sosActive) {
    sosBigBtn.style.transform = '';
    sosBigBtn.style.background = '';
  }
}

function triggerSOS() {
  sosActive = true;
  sosBigBtn.style.transform = '';
  sosBigBtn.style.background = '#b91c1c';
  sosBigBtn.querySelector('.sos-emoji').textContent = '✅';
  sosBigBtn.querySelector('span:last-child').textContent = 'Sent!';

  if (sosStatus) {
    sosStatus.style.display = 'block';
    sosStatusText.textContent = '🚨 SOS Alert Sent! Help is coming.';
  }

  // Simulate contact notifications
  const contacts = ['Priya (Mom)', 'Ravi (Brother)', 'Anjali (Colleague)'];
  let delay = 0;
  contacts.forEach((name, i) => {
    setTimeout(() => {
      if (sosCountdown) {
        sosCountdown.textContent = `✅ ${name} has been notified`;
      }
    }, delay);
    delay += 1000;
  });

  setTimeout(() => {
    if (sosCountdown) {
      sosCountdown.textContent = '📍 Your location is being shared every 30 seconds';
    }
  }, delay);

  // Vibrate if available
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200, 100, 200]);
  }

  // Reset after 10 seconds
  setTimeout(() => {
    resetSOS();
  }, 10000);
}

function resetSOS() {
  sosActive = false;
  if (sosBigBtn) {
    sosBigBtn.style.background = '';
    sosBigBtn.querySelector('.sos-emoji').textContent = '🆘';
    sosBigBtn.querySelector('span:last-child').textContent = 'SOS';
  }
  if (sosStatus) {
    setTimeout(() => { sosStatus.style.display = 'none'; }, 2000);
    if (sosStatusText) sosStatusText.textContent = '✅ Alert cleared — Stay safe!';
  }
}

// Toggle SOS options
function toggleOpt(btn) {
  btn.classList.toggle('active');
}

// Safe Walk toggle
function toggleSafeWalk(checkbox) {
  const status = document.getElementById('safeWalkStatus');
  if (status) {
    status.style.display = checkbox.checked ? 'block' : 'none';
  }
  if (checkbox.checked && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      () => console.log('📍 Location access granted for Safe Walk'),
      () => console.log('📍 Location access denied')
    );
  }
}

// Expose functions to window
window.toggleOpt = toggleOpt;
window.toggleSafeWalk = toggleSafeWalk;

// Keyboard shortcut: Escape to cancel SOS
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sosActive) resetSOS();
});

// Show notification that SOS is ready
setTimeout(() => {
  const readyBadge = document.createElement('div');
  readyBadge.style.cssText = `
    position: fixed; bottom: 24px; right: 24px;
    background: var(--green-600); color: white;
    padding: 12px 20px; border-radius: 999px;
    font-size: 0.85rem; font-weight: 700;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    z-index: 999; opacity: 0; transition: opacity 0.4s;
  `;
  readyBadge.textContent = '✅ SOS Ready — Hold button to activate';
  document.body.appendChild(readyBadge);

  setTimeout(() => { readyBadge.style.opacity = '1'; }, 100);
  setTimeout(() => {
    readyBadge.style.opacity = '0';
    setTimeout(() => readyBadge.remove(), 400);
  }, 3000);
}, 1000);