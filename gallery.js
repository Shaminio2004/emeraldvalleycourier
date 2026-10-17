// Clickable photo gallery: tap a thumbnail in .photo-grid to view it large.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.photo-grid a'));
  if (!links.length) return;
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button>' +
    '<button class="lb-prev" aria-label="Previous">&#8249;</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button class="lb-next" aria-label="Next">&#8250;</button>';
  document.body.appendChild(box);
  var img = box.querySelector('img'), cap = box.querySelector('figcaption'), i = 0, x0 = null;
  function show(n) {
    i = (n + links.length) % links.length;
    img.src = links[i].href;
    img.alt = links[i].querySelector('img').alt;
    cap.textContent = (i + 1) + ' / ' + links.length + '  ·  ' + (links[i].dataset.caption || '');
  }
  function open(n) { show(n); box.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { box.classList.remove('open'); document.body.style.overflow = ''; }
  links.forEach(function (a, n) { a.addEventListener('click', function (e) { e.preventDefault(); open(n); }); });
  box.querySelector('.lb-close').onclick = close;
  box.querySelector('.lb-prev').onclick = function (e) { e.stopPropagation(); show(i - 1); };
  box.querySelector('.lb-next').onclick = function (e) { e.stopPropagation(); show(i + 1); };
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
  box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(dx < 0 ? i + 1 : i - 1);
    x0 = null;
  });
})();
