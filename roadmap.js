/* ============================================================
   Roadmap page viewer — flips through assets/roadmap/p01..p58.jpg

   Only the current page and its neighbours are fetched, so the
   embed costs about one page of bandwidth rather than all 58.

   Expects #flipbook #fb-img #fb-page #fb-cur #fb-prev #fb-next
           #fb-range #fb-chips
   ============================================================ */
(function () {
  'use strict';
  var TOTAL = 58;
  var SECTIONS = [
    ['Cover', 1], ['Summary', 2], ['Ordinance', 9], ['Financials', 14],
    ['Timeline', 15], ['Case studies', 25], ['Appendix', 54]
  ];

  var book = document.getElementById('flipbook');
  if (!book) return;

  var img = document.getElementById('fb-img');
  var pageBox = document.getElementById('fb-page');
  var curEl = document.getElementById('fb-cur');
  var prevBtn = document.getElementById('fb-prev');
  var nextBtn = document.getElementById('fb-next');
  var range = document.getElementById('fb-range');
  var chipWrap = document.getElementById('fb-chips');
  var cur = 1, swapTimer;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function srcFor(n) { return 'assets/roadmap/p' + pad(n) + '.jpg'; }

  var chips = SECTIONS.map(function (s) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.textContent = s[0];
    b.title = 'Page ' + s[1];
    b.addEventListener('click', function () { show(s[1]); });
    chipWrap.appendChild(b);
    return b;
  });

  function markChips(n) {
    var active = -1;
    for (var i = 0; i < SECTIONS.length; i++) if (SECTIONS[i][1] <= n) active = i;
    for (var j = 0; j < chips.length; j++) chips[j].setAttribute('aria-current', j === active ? 'true' : 'false');
  }

  function preload(n) {
    if (n < 1 || n > TOTAL) return;
    var p = new Image(); p.src = srcFor(n);
  }

  function swap(n) {
    var src = srcFor(n);
    pageBox.classList.add('busy');
    var pre = new Image();
    pre.onload = pre.onerror = function () {
      if (n !== cur) return;
      img.src = src;
      img.alt = 'Page ' + n + ' of the Pine Island Stormwater Utility Implementation Roadmap';
      pageBox.classList.remove('busy');
      preload(n + 1); preload(n - 1);
    };
    pre.src = src;
  }

  function show(n, defer) {
    n = Math.max(1, Math.min(TOTAL, n));
    cur = n;
    curEl.textContent = pad(n);
    if (range.value !== String(n)) range.value = n;
    prevBtn.disabled = (n === 1);
    nextBtn.disabled = (n === TOTAL);
    markChips(n);
    clearTimeout(swapTimer);
    if (defer) swapTimer = setTimeout(function () { swap(n); }, 110);
    else swap(n);
  }

  prevBtn.addEventListener('click', function () { show(cur - 1); });
  nextBtn.addEventListener('click', function () { show(cur + 1); });
  range.addEventListener('input', function () { show(parseInt(range.value, 10), true); });

  var inView = false;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { inView = e[0].isIntersecting; }, { threshold: 0.12 }).observe(book);
  }
  document.addEventListener('keydown', function (e) {
    if (!inView) return;
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (e.key === 'ArrowLeft') { show(cur - 1); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { show(cur + 1); e.preventDefault(); }
  });

  markChips(1);
  preload(2);
})();
