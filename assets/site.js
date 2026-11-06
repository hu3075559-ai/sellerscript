/* SellerScript shared site behaviour: lead capture + copy buttons. */
(function () {
  'use strict';
  var LEADS_ENDPOINT = 'https://lunasign.me/api/leads';
  var SITE_KEY = 'sellerscript';

  function wireSubscribe(form) {
    if (!form) return;
    var emailEl = form.querySelector('input[type="email"]');
    var hpEl = form.querySelector('input[name="hp"]');
    var msgEl = form.querySelector('.sub-msg');
    var btn = form.querySelector('button[type="submit"]');
    var source = form.getAttribute('data-source') || 'pro-waitlist';
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var email = (emailEl.value || '').trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        msgEl.textContent = 'Please enter a valid email address.';
        msgEl.className = 'sub-msg err';
        return;
      }
      btn.disabled = true;
      msgEl.textContent = 'Joining…';
      msgEl.className = 'sub-msg';
      fetch(LEADS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ site: SITE_KEY, email: email, source: source, hp: hpEl ? hpEl.value : '' })
      }).then(function (r) { return r.json(); }).then(function (data) {
        if (data && data.ok) {
          msgEl.textContent = data.status === 'already'
            ? 'You are already on the list — we will email you when Pro launches.'
            : 'You are in. We will email you when SellerScript Pro launches.';
          msgEl.className = 'sub-msg ok';
          form.reset();
        } else {
          msgEl.textContent = 'Something went wrong (' + ((data && data.error) || 'unknown') + '). Please try again.';
          msgEl.className = 'sub-msg err';
        }
      }).catch(function () {
        msgEl.textContent = 'Network error — please try again in a moment.';
        msgEl.className = 'sub-msg err';
      }).finally(function () { btn.disabled = false; });
    });
  }

  document.querySelectorAll('form.subscribe').forEach(wireSubscribe);

  document.querySelectorAll('[data-copy-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var el = document.getElementById(btn.getAttribute('data-copy-target'));
      if (!el) return;
      var text = el.getAttribute('data-plain') || el.innerText || el.value || '';
      function done() {
        var old = btn.textContent;
        btn.textContent = 'Copied ✓';
        setTimeout(function () { btn.textContent = old; }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) { /* noop */ }
        document.body.removeChild(ta); done();
      }
    });
  });
})();
