/* ═══════════════════════════════════════════════════════════
   RIHAM — Women of the Year · Script
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════ NAV SCROLL ═══════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ═══════════════════ TIMELINE ══════════════════════════════ */
(function initTimeline() {
  const START_YEAR = 2026;
  const END_YEAR = 2029;

  // Entries: customize these later
  const entries = {
    '2026': { title: 'The Beginning', text: 'The year everything started — and nothing has been the same since.' },
    '2027': { title: 'Growing Together', text: 'Learning, laughing, and loving — side by side.' },
    '2028': { title: 'Deeper Connection', text: 'Every day discovering something new to love about you.' },
    '2029': { title: 'Our Future', text: 'Looking forward to all the beautiful moments ahead.' },
  };

  const container = document.getElementById('timeline-years');
  const entriesEl = document.getElementById('timeline-entries');
  const progressEl = document.getElementById('timeline-progress');
  const engagementEl = document.getElementById('timeline-engagement');
  const celebrationOverlay = document.getElementById('celebration-overlay');

  if (!container) return;

  // Generate year elements
  const allYears = [];
  for (let year = START_YEAR; year <= END_YEAR; year++) {
    allYears.push({ year, key: `${year}` });
  }

  allYears.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'timeline-year-node';
    div.dataset.index = i;
    div.dataset.key = item.key;

    div.innerHTML = `
      <div class="year-dot"></div>
      <span class="year-label">${item.year}</span>
    `;
    container.appendChild(div);
  });

  // Build entries HTML
  allYears.forEach((item) => {
    if (entries[item.key]) {
      const e = entries[item.key];
      const div = document.createElement('div');
      div.className = 'timeline-entry';
      div.dataset.key = item.key;
      div.innerHTML = `
        <p class="timeline-entry-year">${item.year}</p>
        <h3 class="timeline-entry-title">${e.title}</h3>
        <p class="timeline-entry-text">${e.text}</p>
      `;
      entriesEl.appendChild(div);
    }
  });

  // Scroll-driven activation
  let activeIndex = -1;
  const totalYears = allYears.length;
  let engagementRevealed = false;

  function updateTimeline(progress) {
    // progress 0..1
    const idx = Math.min(Math.floor(progress * totalYears), totalYears - 1);

    // Smooth progress bar
    let progressPct = 0;
    if (window.innerWidth <= 700) { // Mobile vertical progress
      progressPct = Math.min(Math.max(progress * 100, 0), 100);
      progressEl.style.height = progressPct + '%';
      progressEl.style.width = '2px';
    } else { // Desktop horizontal progress
      progressPct = Math.min(Math.max(progress * 100, 0), 100);
      progressEl.style.width = progressPct + '%';
      progressEl.style.height = '2px';
    }

    if (idx === activeIndex && progress < 0.99) return;

    activeIndex = Math.min(Math.floor(progress * (totalYears + 1)), totalYears - 1);

    const dots = container.querySelectorAll('.timeline-year-node');

    dots.forEach((dot, i) => {
      const dotEl = dot.querySelector('.year-dot');
      const labelEl = dot.querySelector('.year-label');

      dotEl.classList.toggle('active', i === activeIndex);
      dotEl.classList.toggle('passed', i < activeIndex);

      labelEl.classList.toggle('active', i === activeIndex);
      labelEl.classList.toggle('passed', i < activeIndex);
    });

    // Show corresponding entry
    if (activeIndex >= 0 && activeIndex < totalYears) {
      const allEntries = entriesEl.querySelectorAll('.timeline-entry');
      allEntries.forEach(e => e.classList.remove('visible'));

      const key = allYears[activeIndex].key;
      const activeEntry = entriesEl.querySelector(`.timeline-entry[data-key="${key}"]`);
      if (activeEntry) activeEntry.classList.add('visible');
    }

    // Engagement reached
    if (progress >= 0.95 && !engagementRevealed) {
      engagementRevealed = true;
      engagementEl.classList.add('revealed');

      // Trigger celebration after a short delay
      setTimeout(showCelebration, 800);
    }
  }

  function showCelebration() {
    if (celebrationOverlay.classList.contains('active')) return;
    celebrationOverlay.classList.add('active');

    // Add close button if not exists
    if (!celebrationOverlay.querySelector('.celebration-close')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'celebration-close';
      closeBtn.textContent = 'Close';
      closeBtn.onclick = () => celebrationOverlay.classList.remove('active');
      celebrationOverlay.querySelector('.celebration-content').appendChild(closeBtn);
    }

    // Generate hearts
    const heartsContainer = document.getElementById('celebration-hearts');
    heartsContainer.innerHTML = '';
    const heartEmojis = ['💖', '💕', '💍', '✨', '🥰'];
    for (let i = 0; i < 8; i++) {
      const h = document.createElement('span');
      h.className = 'celebration-heart';
      h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      h.style.setProperty('--delay', `${Math.random() * 0.5}s`);
      h.style.setProperty('--dur', `${0.8 + Math.random() * 0.4}s`);
      heartsContainer.appendChild(h);
    }
  }

  // Observe the timeline section
  const section = document.getElementById('timeline');
  function onScroll() {
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;
    // Calculate progress: 0 when top of section hits middle of screen, 1 when bottom hits middle
    const scrollStart = rect.top - windowH * 0.5;
    const scrollDistance = rect.height;

    let progress = -scrollStart / scrollDistance;

    updateTimeline(Math.max(0, Math.min(1, progress)));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ═══════════════════ TOP 10 LISTICLE ══════════════════════ */
(function initListicle() {
  const items = [
    {
      tag: 'PERSONALITY',
      title: 'Her Laugh Owns Every Room',
      desc: 'There\'s no sound in the world quite like it —  One laugh and everything feels like heaven.',
    },
    {
      tag: 'WARMTH',
      title: 'The Way She Makes You Feel ',
      desc: 'She is the only person in the world that can change ur mood in a second .she listen, remember, cares.',
    },
    {
      tag: 'BEAUTY',
      title: 'Those Eyes Are a Whole Universe',
      desc: 'everything in her shape , body , face , hair , voice heal my sickness.',
    },
    {
      tag: 'STRENGTH',
      title: 'The Quiet Strength She Carries',
      desc: 'She handles everything that she dont desserve to suffer from  — but i know there\'s big strength behind you.',
    },
    {
      tag: 'LOVE',
      title: 'Her Hugs Are a Safe Place',
      desc: 'World record holder, undisputed champion — when she hugs you, the world pauses. You could live there.',
    },
    {
      tag: 'SPIRIT',
      title: 'She Lights Up Every Space She Enters',
      desc: 'her ways are just in a difrent level.',
    },
    {
      tag: 'HEART',
      title: 'Her Heart is Bigger Than She Knows',
      desc: 'The kindness she gives so effortlessly — she doesn\'t even realize how rare and extraordinary that is.',
    },
    {
      tag: 'MAGIC',
      title: 'She Turns Ordinary Into Something Special',
      desc: 'A walk becomes an adventure. A quiet evening becomes a memory. She has the gift of making everything matter.',
    },
    {
      tag: 'POWER',
      title: 'The dedication she put in her life',
      desc: 'she struggle a lot but she is a lot more powerfull then she thinks .',
    },
    {
      tag: 'FOREVER',
      title: 'She is Simply Unforgettable',
      desc: 'Years from now, in every version of every story — she will still be the most remarkable person in my life. Always.',
    },
  ];

  const container = document.getElementById('listicle-items');
  if (!container) return;

  items.forEach((item, i) => {
    const div = document.createElement('article');
    div.className = 'listicle-item';
    div.style.transitionDelay = `${i * 0.06}s`;
    div.innerHTML = `
      <div class="listicle-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="listicle-content">
        <p class="listicle-item-tag">${item.tag}</p>
        <h3 class="listicle-item-title">${item.title}</h3>
        <p class="listicle-item-desc">${item.desc}</p>
        <div class="listicle-item-photo" style="background-image: url('${i + 1}.jpg')"></div>
      </div>
    `;
    container.appendChild(div);
  });

  // Intersection observer for animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  container.querySelectorAll('.listicle-item').forEach(el => observer.observe(el));
})();


/* ═══════════════════ AWARDS ════════════════════════════════ */
(function initAwards() {
  const cards = document.querySelectorAll('.award-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
})();


/* ═══════════════════ ENVELOPE ══════════════════════════════ */
(function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const hintEl = document.getElementById('envelope-hint');
  const stateEl = document.getElementById('envelope-state');
  if (!envelope) return;

  let clicks = 0;

  function handleEnvelopeClick() {
    clicks++;

    if (clicks === 1) {
      // First click: bounce
      envelope.classList.add('bounce');
      stateEl.textContent = 'Once more — open it ♡';
      hintEl.style.opacity = '0';
      envelope.addEventListener('animationend', () => {
        envelope.classList.remove('bounce');
      }, { once: true });
    } else if (clicks === 2) {
      // Second click: open
      envelope.classList.add('open');
      stateEl.textContent = 'Read it… it\'s just for you 💕';
    }
  }

  envelope.addEventListener('click', handleEnvelopeClick);
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleEnvelopeClick();
    }
  });
})();


/* ═══════════════════ LETTER SCROLL REVEAL ══════════════════ */
(function initLetterReveal() {
  const letter = document.getElementById('letter-paper');
  const envWrap = document.querySelector('.envelope-wrap');
  if (!envWrap) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  if (letter) observer.observe(letter);
  observer.observe(envWrap);
})();


/* ═══════════════════ COLOR PICKER LABEL ═══════════════════ */
(function initColorPicker() {
  const picker = document.getElementById('msg-color');
  const label = document.getElementById('color-label');
  if (!picker || !label) return;

  const colorNames = [
    { h: [330, 360], name: 'Deep Rose — like always' },
    { h: [0, 30], name: 'Warm Red — full of fire' },
    { h: [30, 60], name: 'Amber — golden and warm' },
    { h: [60, 90], name: 'Sunshine — bright and happy' },
    { h: [90, 150], name: 'Forest — calm and peaceful' },
    { h: [150, 200], name: 'Teal — deep and thoughtful' },
    { h: [200, 260], name: 'Ocean Blue — wide and free' },
    { h: [260, 300], name: 'Violet — mysterious and soft' },
    { h: [300, 330], name: 'Magenta — bold and alive' },
  ];

  function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h;
    if (max === min) h = 0;
    else if (max === r) h = ((g - b) / (max - min) + 6) % 6 * 60;
    else if (max === g) h = (b - r) / (max - min) * 60 + 120;
    else h = (r - g) / (max - min) * 60 + 240;
    return h;
  }

  picker.addEventListener('input', () => {
    const h = hexToHsl(picker.value);
    const match = colorNames.find(c => h >= c.h[0] && h < c.h[1]) || colorNames[0];
    label.textContent = match.name;
  });
})();


/* ═══════════════════ MESSAGE FORM ══════════════════════════ */
(function initMessageForm() {
  const form = document.getElementById('message-form');
  const submitBtn = document.getElementById('form-submit');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const mood = document.getElementById('msg-mood').value;
    const message = document.getElementById('msg-message').value.trim();
    const color = document.getElementById('msg-color').value;

    if (!message) {
      document.getElementById('msg-message').focus();
      return;
    }

    // Animate button
    submitBtn.textContent = 'Sending… 💌';
    submitBtn.disabled = true;

    // Google Apps Script Web App URL (deployed)
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwAjNM17I7YyinfDscCRvDm1bu9L2x35WMdXKQ_HrsLOzVxi85-1oOeJP5GEdq3nstV/exec';

    try {
      // When connected to Google Sheets, this will post data
      if (GOOGLE_SHEET_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mood, message, color, timestamp: new Date().toISOString() }),
        });
      }

      // Show success
      form.style.display = 'none';
      success.classList.add('show');

    } catch (err) {
      // Still show success for now (Google Sheets no-cors doesn't return a readable response)
      form.style.display = 'none';
      success.classList.add('show');
    }
  });
})();


/* ═══════════════════ GENERIC REVEAL OBSERVER ══════════════ */
(function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ═══════════════════ CURSOR GLOW ═══════════════════════════ */
(function initCursorGlow() {
  // Subtle custom cursor glow effect
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    background: radial-gradient(circle, rgba(200,50,90,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    top: 0; left: 0;
  `;
  document.body.appendChild(glow);

  let mx = -1000, my = -1000;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    glow.style.left = mx + 'px';
    glow.style.top = my + 'px';
  }, { passive: true });
})();
