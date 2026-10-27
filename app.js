const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let reduced = reduceQuery.matches;

const $ = (selector, root = document) => root.querySelector(selector);
const rand = (min, max) => min + Math.random() * (max - min);
const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const ambient = $('#ambient');
const lens = $('#lens');
const lensEmit = $('#lensEmit');
const bands = $('#bands');
const faces = $('#faces');
const spring = $('#spring');
const springInner = $('#springInner');
const pad = $('#pad');
const ink = $('#ink');
const pencil = $('#pencil');
const mend = $('#mend');
const photoBurst = $('#photoBurst');
const showerLayer = $('#shower');

const heartColors = ['#c9a8ef', '#e8b7d7', '#bda2ea', '#f3bfd9', '#d8b8ff'];
let lensTimer = null;

function buildAmbient() {
  if (reduced) return;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 18; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'bg-heart';
    heart.textContent = Math.random() < 0.32 ? '♡' : '♥';
    heart.style.left = `${rand(1, 98).toFixed(1)}vw`;
    heart.style.color = heartColors[i % heartColors.length];
    const duration = rand(17, 32);
    heart.style.setProperty('--sz', `${rand(9, 22).toFixed(0)}px`);
    heart.style.setProperty('--dur', `${duration.toFixed(1)}s`);
    heart.style.setProperty('--delay', `${(-Math.random() * duration).toFixed(1)}s`);
    heart.style.setProperty('--sway', `${rand(-90, 90).toFixed(0)}px`);
    heart.style.setProperty('--rot', `${rand(-70, 70).toFixed(0)}deg`);
    heart.style.setProperty('--op', rand(0.1, 0.34).toFixed(2));
    fragment.appendChild(heart);
  }
  ambient.appendChild(fragment);
}

function flyLensHeart(power = 1) {
  if (!lensEmit || reduced) return;
  const heart = document.createElement('span');
  heart.className = 'lens-heart-fly';
  heart.textContent = '♥';
  heart.style.color = ['#ff6cae','#ff8fc4','#b78cff','#ffa3cf','#e083ff'][Math.floor(Math.random() * 5)];
  heart.style.fontSize = `${(rand(2.4, 3.9) * Math.min(power, 1.25)).toFixed(2)}cqw`;
  heart.style.left = `${(50 + rand(-8, 8)).toFixed(1)}%`;
  heart.style.top = `${(52 + rand(-7, 8)).toFixed(1)}%`;
  heart.style.setProperty('--dx', `${(rand(-9, 17) * power).toFixed(1)}cqw`);
  heart.style.setProperty('--dy', `${(rand(-11, -24) * power).toFixed(1)}cqw`);
  heart.style.setProperty('--rot', `${rand(-45, 45).toFixed(0)}deg`);
  heart.style.setProperty('--sc', rand(0.6, 1.25).toFixed(2));
  heart.style.setProperty('--dur', `${rand(2, 3.4).toFixed(2)}s`);
  lensEmit.appendChild(heart);
  window.setTimeout(() => heart.remove(), 4200);
}

function startLensFlow() {
  window.clearInterval(lensTimer);
  if (reduced) return;
  lensTimer = window.setInterval(() => {
    if (document.hidden) return;
    flyLensHeart();
    if (Math.random() < 0.7) {
      window.setTimeout(() => {
        if (!document.hidden) flyLensHeart();
      }, 150);
    }
  }, 430);
}

function burstAt(xPct, yPct, count, spread = 1) {
  if (!photoBurst || reduced) return;
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'pop-heart';
    heart.textContent = '♥';
    heart.style.left = `${xPct}%`;
    heart.style.top = `${yPct}%`;
    heart.style.color = ['#ff8fbe', '#c9a8ff', '#ffb6d5'][i % 3];
    heart.style.fontSize = `${rand(1.3, 2.4).toFixed(2)}cqw`;
    heart.style.setProperty('--dx', `${(rand(-7, 7) * spread).toFixed(1)}cqw`);
    heart.style.setProperty('--dy', `${(rand(-8, -17) * spread).toFixed(1)}cqw`);
    heart.style.setProperty('--rot', `${rand(-40, 40).toFixed(0)}deg`);
    heart.style.setProperty('--dur', `${rand(1.1, 1.9).toFixed(2)}s`);
    heart.style.setProperty('--delay', `${(i * 0.035).toFixed(2)}s`);
    photoBurst.appendChild(heart);
    window.setTimeout(() => heart.remove(), 2400);
  }
}

let cheerTimer = null;
function cheerBands() {
  faces.classList.remove('cheer');
  void faces.getBoundingClientRect();
  faces.classList.add('cheer');
  window.clearTimeout(cheerTimer);
  cheerTimer = window.setTimeout(() => faces.classList.remove('cheer'), 1000);
  [316, 375, 436, 491].forEach((x, index) => {
    window.setTimeout(() => burstAt(x / 10.24, 49.4, 3, 1), index * 80);
  });
}

let springTimer = null;
function boingSpring() {
  springInner.classList.remove('hard');
  void springInner.offsetWidth;
  springInner.classList.add('hard');
  window.clearTimeout(springTimer);
  springTimer = window.setTimeout(() => springInner.classList.remove('hard'), 2600);
  burstAt(61.8, 61.2, 7, 1.15);
}

function shower(count = 30) {
  if (reduced || !showerLayer) return;
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'shower-heart';
    const sparkle = Math.random() < 0.18;
    heart.textContent = sparkle ? '✦' : '♥';
    heart.style.left = `${rand(0, 100).toFixed(1)}vw`;
    heart.style.fontSize = `${rand(11, 30).toFixed(0)}px`;
    heart.style.color = sparkle ? '#c9a8ff' : heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.style.setProperty('--dur', `${rand(2.6, 4.6).toFixed(2)}s`);
    heart.style.setProperty('--dx', `${rand(-120, 120).toFixed(0)}px`);
    heart.style.setProperty('--rot', `${rand(-100, 100).toFixed(0)}deg`);
    heart.style.animationDelay = `${rand(0, 0.45).toFixed(2)}s`;
    showerLayer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 5600);
  }
}

function showToast() {
  const old = $('.toast');
  if (old) old.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = document.createElement('span');
  icon.className = 't-heart';
  icon.textContent = '♥';
  toast.appendChild(icon);
  toast.appendChild(document.createTextNode('다 잘될꺼야'));
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3100);
}

const letterLines = ['승연아', '다 잘될꺼야♡'];
let writeToken = 0;

function buildInk() {
  ink.innerHTML = '';
  letterLines.forEach((text) => {
    const line = document.createElement('span');
    line.className = 'ink-line';
    Array.from(text).forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.setProperty('--r', `${rand(-2.2, 2.2).toFixed(1)}deg`);
      line.appendChild(span);
    });
    ink.appendChild(line);
  });
}

function movePencil(span) {
  const x = span.offsetLeft + span.offsetWidth + 1;
  const y = span.offsetTop + span.offsetHeight - 2;
  pencil.style.setProperty('--x', `${x.toFixed(1)}px`);
  pencil.style.setProperty('--y', `${y.toFixed(1)}px`);
}

async function writeLetter() {
  const token = (writeToken += 1);
  ink.classList.remove('erase');
  buildInk();

  if (reduced) {
    ink.querySelectorAll('.ink-line span').forEach((span) => span.classList.add('on'));
    return;
  }

  const first = ink.querySelector('.ink-line span');
  if (first) {
    pencil.style.transition = 'none';
    movePencil(first);
    void pencil.offsetWidth;
    pencil.style.transition = '';
  }

  await sleep(520);
  if (token !== writeToken) return;
  pencil.classList.add('on');

  const lines = Array.from(ink.querySelectorAll('.ink-line'));
  for (let li = 0; li < lines.length; li += 1) {
    const spans = Array.from(lines[li].querySelectorAll('span'));
    for (let si = 0; si < spans.length; si += 1) {
      if (token !== writeToken) return;
      const span = spans[si];
      span.classList.add('on');
      movePencil(span);
      await sleep(rand(112, 172));
    }
    pencil.classList.add('lift');
    await sleep(280);
    pencil.classList.remove('lift');
    if (li < lines.length - 1) {
      await sleep(160);
      if (token !== writeToken) return;
    }
  }

  pencil.classList.remove('on');
  const last = ink.querySelector('.ink-line:last-child span:last-child');
  if (last) last.classList.add('pop');

  await sleep(5400);
  if (token !== writeToken) return;
  ink.classList.add('erase');
  await sleep(1000);
  if (token !== writeToken) return;
  writeLetter();
}

let restartTimer = null;
function restartWriting() {
  if (reduced) {
    writeToken += 1;
    ink.classList.remove('erase');
    buildInk();
    ink.querySelectorAll('.ink-line span').forEach((span) => span.classList.add('on'));
    return;
  }
  writeToken += 1;
  pencil.classList.remove('on');
  ink.classList.remove('erase');
  buildInk();
  window.clearTimeout(restartTimer);
  restartTimer = window.setTimeout(() => writeLetter(), 240);
}

buildAmbient();
startLensFlow();

bands.addEventListener('click', cheerBands);

lens.addEventListener('click', () => {
  for (let i = 0; i < 14; i += 1) {
    window.setTimeout(() => flyLensHeart(1.5), i * 32);
  }
  lens.classList.add('burst');
  window.setTimeout(() => lens.classList.remove('burst'), 700);
});

spring.addEventListener('click', boingSpring);

pad.addEventListener('click', restartWriting);

mend.addEventListener('click', () => {
  shower(34);
  showToast();
  cheerBands();
  boingSpring();
  for (let i = 0; i < 16; i += 1) {
    window.setTimeout(() => flyLensHeart(1.45), i * 36);
  }
  restartWriting();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    window.clearInterval(lensTimer);
  } else {
    startLensFlow();
  }
});

if (reduceQuery.addEventListener) {
  reduceQuery.addEventListener('change', (event) => {
    reduced = event.matches;
    if (reduced) {
      window.clearInterval(lensTimer);
      ambient.innerHTML = '';
      ink.classList.remove('erase');
      buildInk();
      ink.querySelectorAll('.ink-line span').forEach((span) => span.classList.add('on'));
      pencil.classList.remove('on');
    } else {
      startLensFlow();
      buildAmbient();
    }
  });
}

window.setTimeout(() => writeLetter(), 1500);


