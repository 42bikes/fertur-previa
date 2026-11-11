/* Voyara — interações (JS puro, sem dependências) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header com sombra ao rolar ---------- */
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- menu mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('menu-mobile');

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    mobileNav.hidden = true;
  }

  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    if (open) {
      closeMenu();
    } else {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
      mobileNav.hidden = false;
    }
  });

  mobileNav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !mobileNav.hidden) {
      closeMenu();
      toggle.focus();
    }
  });

  /* ---------- reveal no scroll ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- contadores ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCount(el) {
    var target = Number(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) {
      el.textContent = target.toLocaleString('pt-BR') + suffix;
      return;
    }
    var start = performance.now();
    var duration = 1400;
    function tick(now) {
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toLocaleString('pt-BR') + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- filtro de experiências ---------- */
  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('#tour-grid .tour');
  var empty = document.querySelector('.filter-empty');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      var filter = chip.getAttribute('data-filter');
      var visible = 0;
      cards.forEach(function (card) {
        var match = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.classList.toggle('is-hidden', !match);
        if (match) visible++;
      });
      if (empty) empty.hidden = visible > 0;
    });
  });

  /* ---------- depoimentos ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dotsWrap = document.getElementById('dots');
  var current = 0;
  var timer = null;

  if (slides.length) {
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.setAttribute('aria-label', 'Depoimento ' + (i + 1));
      b.addEventListener('click', function () { go(i); });
      dotsWrap.appendChild(b);
    });

    var dots = Array.prototype.slice.call(dotsWrap.children);

    function go(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
      dots.forEach(function (d, i) { d.setAttribute('aria-selected', i === current ? 'true' : 'false'); });
      restart();
    }

    function restart() {
      if (reduceMotion) return;
      clearInterval(timer);
      timer = setInterval(function () { go(current + 1); }, 7000);
    }

    document.getElementById('next').addEventListener('click', function () { go(current + 1); });
    document.getElementById('prev').addEventListener('click', function () { go(current - 1); });

    var slider = document.getElementById('slider');
    slider.addEventListener('mouseenter', function () { clearInterval(timer); });
    slider.addEventListener('mouseleave', restart);
    restart();
  }

  /* ---------- toast ---------- */
  var toast = document.getElementById('toast');
  var toastTimer = null;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 4800);
  }

  /* ---------- formulários de demonstração ---------- */
  var booking = document.getElementById('booking');
  booking.addEventListener('submit', function (e) {
    e.preventDefault();
    var destino = document.getElementById('destino').value;
    var mes = document.getElementById('mes').value;
    var viajantes = document.getElementById('viajantes').value;
    var quando = mes
      ? new Date(mes + '-01T12:00:00').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
      : 'data a definir';
    var servico = destino.indexOf('O que você') === 0 ? 'serviço a definir' : destino;
    showToast('Demonstração: orçamento de ' + servico + ' · ' + quando + ' · ' + viajantes + '.');
  });

  var lead = document.getElementById('lead');
  lead.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('email');
    var destino = document.getElementById('destino-cta').value.trim();
    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showToast('Informe um e-mail válido para receber o orçamento.');
      email.focus();
      return;
    }
    showToast('Demonstração: a Fertur responderia no WhatsApp' + (destino ? ' sobre ' + destino : '') + '. Nenhum dado foi enviado.');
    lead.reset();
  });

  /* ---------- ano no rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
