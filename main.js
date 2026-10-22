// Roblox Dance · web
'use strict';
const $ = (s) => document.querySelector(s);
const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch { /* nada */ } } };
const NAMES = { en: 'English', es: 'Español', pt: 'Português' };
let lang = store.get('rd-lang') || ((navigator.language || 'en').slice(0, 2) in NAMES ? navigator.language.slice(0, 2) : 'en');

function applyLang() {
  const T = WEB_T[lang] || WEB_T.en;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = T[el.dataset.t] ?? el.textContent; });
  document.querySelectorAll('[data-t-html]').forEach((el) => { el.innerHTML = T[el.dataset.tHtml]; });
}
$('#lang').innerHTML = Object.entries(NAMES).map(([k, n]) => `<option value="${k}">${n}</option>`).join('');
$('#lang').value = lang;
$('#lang').onchange = (e) => { lang = e.target.value; store.set('rd-lang', lang); applyLang(); };

// ---------- héroe: escenarios que cambian + chat de TikTok de mentira ----------
const shots = [...document.querySelectorAll('#shot img')];
const sceneNames = ['🪩 Fiesta', '🏖️ Playa', '🌌 Galaxia', '🌳 Parque', '🍭 Dulces'];
let si = 0;
setInterval(() => {
  shots[si].classList.remove('on');
  si = (si + 1) % shots.length;
  shots[si].classList.add('on');
  $('#sceneTag').textContent = sceneNames[si];
}, 4200);
const fans = ['luna22', 'pepe.gg', 'sofi_tk', 'gamerx', 'mike_07', 'ana_live', 'zoe.rbx'];
const robloxNames = ['Builderman', 'Shedletsky', 'Linkmon99', 'Stickmasterluke', 'KreekCraft', 'Tofuu'];
const pick = (a) => a[(Math.random() * a.length) | 0];
setInterval(() => {
  const chat = $('#chat'), T = WEB_T[lang] || WEB_T.en;
  const d = document.createElement('div');
  const gift = Math.random() < 0.22;
  d.className = gift ? 'gift' : '';
  d.innerHTML = gift
    ? `<span class="av">🎁</span><span><b>${pick(fans)}</b> ${T.chatGift}</span>`
    : `<span class="av">💬</span><span><b>${pick(fans)}</b>: ${pick(robloxNames)}</span>`;
  chat.appendChild(d);
  while (chat.children.length > 4) chat.firstChild.remove();
}, 1700);

// ---------- botones gelatinosos y aparición al hacer scroll ----------
document.addEventListener('click', (e) => {
  const b = e.target.closest('.btn'); if (!b) return;
  b.classList.remove('wobble'); void b.offsetWidth; b.classList.add('wobble');
  const r = b.getBoundingClientRect(), g = document.createElement('span');
  g.className = 'goo'; g.style.left = (e.clientX - r.left) + 'px'; g.style.top = (e.clientY - r.top) + 'px';
  b.append(g); setTimeout(() => g.remove(), 700);
});
const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
fetch('https://raw.githubusercontent.com/cristiancordova1207/TikTok-Dance-Releases/main/latest.json').then((r) => r.json()).then((d) => { $('#ver').textContent = 'v' + d.version; }).catch(() => {});
// visita (para las estadísticas de Stats Fluxy; la cuenta el servidor de la web, sin claves aquí)
let seen = false;
try { seen = !!sessionStorage.getItem('rd-v'); sessionStorage.setItem('rd-v', '1'); } catch { /* nada */ }
if (!seen) fetch('/api/visit', { method: 'POST', body: JSON.stringify({ ref: document.referrer }) }).catch(() => {});
applyLang();
