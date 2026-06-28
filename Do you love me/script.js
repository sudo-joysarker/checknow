const FORMSPREE_URL = 'https://formspree.io/f/mwvdbrbp'; // ← put your endpoint here

const artFrame = document.getElementById('artFrame');
const question = document.getElementById('question');
const sub      = document.getElementById('sub');
const btnRow   = document.getElementById('btnRow');
const yesBtn   = document.getElementById('yesBtn');
const noBtn    = document.getElementById('noBtn');
const stageEl  = document.querySelector('.stage');

// ---- Inline SVG doodles (cute line-art, no external images needed) ----
const ART = {
  shy: `<svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="150" fill="#fff"/>
    <ellipse cx="75" cy="85" rx="48" ry="42" fill="#fff" stroke="#3A2C2E" stroke-width="2.5"/>
    <circle cx="40" cy="60" r="9" fill="#fff" stroke="#3A2C2E" stroke-width="2.5"/>
    <circle cx="110" cy="60" r="9" fill="#fff" stroke="#3A2C2E" stroke-width="2.5"/>
    <path d="M58 80q4-6 8 0" stroke="#3A2C2E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M84 80q4-6 8 0" stroke="#3A2C2E" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="63" cy="95" rx="6" ry="4" fill="#F2A7B0"/>
    <ellipse cx="87" cy="95" rx="6" ry="4" fill="#F2A7B0"/>
    <path d="M68 100q7 6 14 0" stroke="#3A2C2E" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  </svg>`,
  panda: `<svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="150" fill="#fff"/>
    <ellipse cx="75" cy="90" rx="44" ry="40" fill="#fff" stroke="#2B2B2B" stroke-width="2.5"/>
    <circle cx="42" cy="55" r="13" fill="#2B2B2B"/>
    <circle cx="108" cy="55" r="13" fill="#2B2B2B"/>
    <ellipse cx="58" cy="80" rx="11" ry="13" fill="#2B2B2B"/>
    <ellipse cx="92" cy="80" rx="11" ry="13" fill="#2B2B2B"/>
    <circle cx="58" cy="80" r="3" fill="#fff"/>
    <circle cx="92" cy="80" r="3" fill="#fff"/>
    <ellipse cx="45" cy="100" rx="6" ry="4" fill="#F2A7B0"/>
    <ellipse cx="105" cy="100" rx="6" ry="4" fill="#F2A7B0"/>
    <ellipse cx="75" cy="100" rx="5" ry="4" fill="#2B2B2B"/>
    <path d="M68 106q7 5 14 0" stroke="#2B2B2B" stroke-width="2" stroke-linecap="round" fill="none"/>
  </svg>`,
  sad: `<svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="150" fill="#fff"/>
    <circle cx="60" cy="70" r="28" fill="#fff" stroke="#3A2C2E" stroke-width="2.5"/>
    <path d="M48 65q4-5 8 0" stroke="#3A2C2E" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M64 65q4-5 8 0" stroke="#3A2C2E" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M52 82q8-6 16 0" stroke="#3A2C2E" stroke-width="2.2" stroke-linecap="round" fill="none"/>
    <ellipse cx="90" cy="100" rx="34" ry="26" fill="#3A2C2E"/>
    <circle cx="80" cy="95" r="3" fill="#fff"/>
    <circle cx="100" cy="95" r="3" fill="#fff"/>
    <path d="M40 95q-6 10 2 18" stroke="#3A2C2E" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  </svg>`,
  beg: `<svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="150" fill="#fff"/>
    <circle cx="55" cy="80" r="9" fill="#B5895E"/>
    <ellipse cx="55" cy="95" rx="14" ry="10" fill="#B5895E"/>
    <circle cx="51" cy="78" r="1.6" fill="#2B2B2B"/>
    <circle cx="59" cy="78" r="1.6" fill="#2B2B2B"/>
    <ellipse cx="100" cy="78" rx="34" ry="32" fill="#fff" stroke="#3A2C2E" stroke-width="2.5"/>
    <circle cx="88" cy="72" r="3" fill="#2B2B2B"/>
    <circle cx="112" cy="72" r="3" fill="#2B2B2B"/>
    <ellipse cx="86" cy="88" rx="5" ry="3.4" fill="#F2A7B0"/>
    <ellipse cx="114" cy="88" rx="5" ry="3.4" fill="#F2A7B0"/>
    <path d="M93 94q7 5 14 0" stroke="#3A2C2E" stroke-width="2" stroke-linecap="round" fill="none"/>
  </svg>`,
  hopeful: `<svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="150" fill="#fff"/>
    <circle cx="75" cy="80" r="40" fill="#fff" stroke="#3A2C2E" stroke-width="2.5"/>
    <ellipse cx="55" cy="68" rx="6" ry="8" fill="#2B2B2B"/>
    <ellipse cx="95" cy="68" rx="6" ry="8" fill="#2B2B2B"/>
    <circle cx="53" cy="65" r="2" fill="#fff"/>
    <circle cx="93" cy="65" r="2" fill="#fff"/>
    <ellipse cx="48" cy="92" rx="7" ry="5" fill="#F2A7B0"/>
    <ellipse cx="102" cy="92" rx="7" ry="5" fill="#F2A7B0"/>
    <path d="M58 96q17 16 34 0" stroke="#3A2C2E" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    <path d="M20 40l8 8M130 40l-8 8M30 25l4 10" stroke="#E89AA8" stroke-width="2.4" stroke-linecap="round"/>
  </svg>`,
  happy: `<svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="150" fill="#fff"/>
    <ellipse cx="55" cy="85" rx="34" ry="32" fill="#B5895E" stroke="#3A2C2E" stroke-width="2"/>
    <circle cx="44" cy="78" r="3.4" fill="#2B2B2B"/>
    <circle cx="66" cy="78" r="3.4" fill="#2B2B2B"/>
    <ellipse cx="55" cy="94" rx="6" ry="4" fill="#fff"/>
    <ellipse cx="100" cy="80" rx="36" ry="34" fill="#fff" stroke="#3A2C2E" stroke-width="2.5"/>
    <path d="M88 73q4-6 8 0" stroke="#3A2C2E" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M104 73q4-6 8 0" stroke="#3A2C2E" stroke-width="2.4" stroke-linecap="round"/>
    <ellipse cx="92" cy="92" rx="6" ry="4" fill="#F2A7B0"/>
    <ellipse cx="116" cy="92" rx="6" ry="4" fill="#F2A7B0"/>
    <path d="M96 97q8 7 16 0" stroke="#3A2C2E" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    <path d="M60 60q6-10 14-2" stroke="#E89AA8" stroke-width="2" stroke-linecap="round" fill="none"/>
  </svg>`
};

// Stages matching the screenshots' escalating tone, 1:1 with your reference order
const stages = [
  { q: 'Do you love me? 🥺',                         s: 'not is all yours',                          art: ART.shy },
  { q: 'Please think again! 😢',                       s: "I'm giving me nothing.",                    art: ART.panda },
  { q: 'Ek aur baar Soch lo! 😢',                       s: 'kya star kon nhi ho Mil Maan jaoo 🙏',      art: ART.sad },
  { q: 'beautiful pls Man jao na! Kitna code likh waogi 💞', s: 'thik girl best hai yu in', art: ART.beg },
  { q: 'Last time, I promise! 🙏',                      s: 'You know the right button looks bigger now...', art: ART.hopeful },
];

let noClicks = 0;
let escapedMode = false;

function setArt(html) {
  artFrame.innerHTML = html;
  artFrame.classList.remove('bump');
  requestAnimationFrame(() => artFrame.classList.add('bump'));
}

setArt(ART.shy);

function escapeStage() {
  noClicks++;
  const idx = Math.min(noClicks - 1, stages.length - 1);
  const s = stages[idx];

  question.style.opacity = 0;
  sub.style.opacity = 0;

  setTimeout(() => {
    question.textContent = s.q;
    sub.textContent = s.s;
    setArt(s.art);
    question.style.opacity = 1;
    sub.style.opacity = 1;
  }, 160);

  growYesButton();

  // After a few "no"s, the No button starts dodging around the whole page,
  // not just the button row — matches the "tucked in a corner" look in the screenshots.
  if (noClicks >= 3 && !escapedMode) {
    escapedMode = true;
    noBtn.classList.add('escaped');
  }
  noBtn.textContent = noClicks >= 4 ? 'no' : 'No';

  if (escapedMode) placeEscapedButton();
}

function growYesButton() {
  const growth = Math.min(noClicks, 6);
  yesBtn.style.fontSize = (0.82 + growth * 0.06) + 'rem';
  yesBtn.style.padding  = (9 + growth * 2) + 'px ' + (22 + growth * 4) + 'px';
}

function placeEscapedButton() {
  const w = noBtn.offsetWidth || 60;
  const h = noBtn.offsetHeight || 36;
  const margin = 16;
  const maxX = window.innerWidth - w - margin;
  const maxY = window.innerHeight - h - margin;
  const x = margin + Math.random() * Math.max(maxX - margin, 40);
  const y = margin + Math.random() * Math.max(maxY - margin, 40);
  noBtn.style.left = x + 'px';
  noBtn.style.top  = y + 'px';
}

function dodgeInRow() {
  const rowRect = btnRow.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = Math.max(rowRect.width - btnRect.width, 30);
  const maxY = 60;
  const randX = (Math.random() - 0.5) * 2 * maxX * 0.5;
  const randY = (Math.random() - 0.5) * 2 * maxY;
  noBtn.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
  noBtn.style.transform = `translate(${randX}px, ${randY}px)`;
}

const canHover = window.matchMedia('(hover: hover)').matches;
if (canHover) {
  noBtn.addEventListener('mouseenter', () => {
    if (escapedMode) placeEscapedButton();
    else dodgeInRow();
  });
}

noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  escapeStage();
  if (escapedMode) placeEscapedButton();
  else dodgeInRow();
});

window.addEventListener('resize', () => {
  if (escapedMode) placeEscapedButton();
});

// ===== YES: final screen =====
yesBtn.addEventListener('click', async () => {
  showFinalState();
  launchConfetti();
  await notifyByEmail();
});

function showFinalState() {
  stageEl.classList.add('is-final');
  setArt(ART.happy);
  question.style.opacity = 0;
  sub.style.opacity = 0;
  setTimeout(() => {
    question.textContent = 'I knew it! You Love me a lot 🐱';
    sub.textContent = '';
    question.style.opacity = 1;
  }, 160);
}

function launchConfetti() {
  const layer = document.getElementById('confetti');
  const emojis = ['🎉', '💖', '✨', '🌸', '💌'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('span');
    piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.animationDuration = (2.4 + Math.random() * 1.8) + 's';
    piece.style.fontSize = (0.9 + Math.random() * 1.1) + 'rem';
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

async function notifyByEmail() {
  if (!FORMSPREE_URL || FORMSPREE_URL.includes('YOUR_FORM_ID')) {
    console.warn('Formspree endpoint not set — no email will be sent.');
    return;
  }
  try {
    await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: '💌 She clicked Yes!',
        message: `Yes was clicked after ${noClicks} "No" click(s).`,
        no_clicks_before_yes: noClicks,
        time: new Date().toLocaleString(),
      }),
    });
  } catch (err) {
    console.warn('Could not send notification:', err);
  }
}
