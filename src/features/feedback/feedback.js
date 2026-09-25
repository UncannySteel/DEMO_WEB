import markup from './feedback.html?raw';
import './feedback.css';

export { markup };

/* --- the feedback window --------------------------------------------------
   Any [data-feedback] button opens it. While it is open everything behind it
   is inert, so nothing but the window can be clicked, tabbed to or read out,
   and the page is held still (onToggle). Escape, the ×, Cancel or a click
   outside the window closes it, and focus goes back to the button that
   opened it. The form checks itself before it goes; `send` is where it goes.

   No feedback endpoint is wired up yet. Until one is, a note is announced on
   the document as an 'onextap:feedback' event (detail: the note) and counts
   as sent. Pass initFeedback({ send }) a function that posts the note and
   returns a promise to send it somewhere real. */
var MIN_LENGTH = 10;

function announce(note) {
  document.dispatchEvent(new CustomEvent('onextap:feedback', { detail: note }));
  return Promise.resolve();
}

export function initFeedback(opts) {
  var send = (opts && opts.send) || announce;
  var root = document.getElementById('feedback');
  var form = document.getElementById('fbForm');
  var done = document.getElementById('fbDone');
  var submit = document.getElementById('fbSubmit');
  var submitLabel = submit.querySelector('.fb__submit');
  var sendErr = document.getElementById('fbSendErr');
  var count = document.getElementById('fbCount');
  var message = form.elements.message;
  var email = form.elements.email;
  var open = false, opener = null, held = [], toggled = [];

  // `from` is the button that opened it: Safari does not focus a button on
  // a click, so what has focus is not always what was pressed.
  function setOpen(next, from) {
    if (next === open) return;
    open = next;
    if (open) {
      opener = from || document.activeElement;
      reset();
      // Hold everything else inert, remembering what we changed: the closed
      // menu is inert already, and has to stay that way afterwards.
      Array.prototype.forEach.call(document.body.children, function (el) {
        if (el === root || el.inert) return;
        el.inert = true;
        held.push(el);
      });
    } else {
      held.forEach(function (el) { el.inert = false; });
      held = [];
    }
    root.inert = !open;
    root.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('fb-open', open);
    toggled.forEach(function (fn) { fn(open); });
    if (open) form.querySelector('input[name="kind"]:checked').focus();
    else if (opener && opener.isConnected) opener.focus();
  }

  function reset() {
    form.reset();
    form.hidden = false;
    done.hidden = true;
    [message, email].forEach(function (input) { setError(input, ''); });
    sendErr.textContent = '';
    setBusy(false);
    countUp();
  }

  function countUp() { count.textContent = message.value.length + ' / ' + message.maxLength; }

  /* --- checking --------------------------------------------------------- */
  function setError(input, text) {
    input.closest('.fb__field').classList.toggle('is-bad', !!text);
    input.setAttribute('aria-invalid', text ? 'true' : 'false');
    document.getElementById(input.getAttribute('aria-describedby')).textContent = text;
    return !text;
  }
  function checkMessage() {
    var text = message.value.trim();
    return setError(message,
      !text ? 'Tell us what’s on your mind.' :
      text.length < MIN_LENGTH ? 'A little more, please: ' + MIN_LENGTH + ' characters or so.' : '');
  }
  function checkEmail() {
    var text = email.value.trim();
    return setError(email, text && !email.checkValidity() ? 'That email doesn’t look right.' : '');
  }

  // Once a field has been marked wrong, it is re-checked as it is fixed.
  message.addEventListener('input', function () {
    countUp();
    if (message.getAttribute('aria-invalid') === 'true') checkMessage();
  });
  email.addEventListener('input', function () {
    if (email.getAttribute('aria-invalid') === 'true') checkEmail();
  });

  /* --- sending ---------------------------------------------------------- */
  function setBusy(busy) {
    submit.disabled = busy;
    submitLabel.textContent = busy ? 'Sending…' : 'Send feedback';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = checkMessage();
    ok = checkEmail() && ok;
    if (!ok) {
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }
    sendErr.textContent = '';
    setBusy(true);
    Promise.resolve(send({
      kind: form.elements.kind.value,
      message: message.value.trim(),
      email: email.value.trim() || null,
      page: location.pathname,
      at: new Date().toISOString()
    })).then(function () {
      form.hidden = true;
      done.hidden = false;
      document.getElementById('fbDoneTitle').focus();
    }, function () {
      sendErr.textContent = 'That didn’t go through. Try again in a moment.';
    }).then(function () { setBusy(false); });
  });

  /* --- opening and closing ---------------------------------------------- */
  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    var trigger = e.target.closest('[data-feedback]');
    if (trigger) setOpen(true, trigger);
    else if (open && e.target.closest('[data-fb-close]')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (!open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'Tab') {
      wrapTab(e);
    }
  });

  // With the page inert, Tab past the window's last control would leave for
  // the browser's own toolbar; it comes round to the first instead (and
  // Shift+Tab the other way).
  function wrapTab(e) {
    var stops = Array.prototype.filter.call(
      root.querySelectorAll('button, input, textarea, a[href]'),
      function (el) { return !el.disabled && el.getClientRects().length > 0; });
    if (!stops.length) return;
    var first = stops[0], last = stops[stops.length - 1];
    var at = document.activeElement;
    if (e.shiftKey && (at === first || !root.contains(at))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (at === last || !root.contains(at))) {
      e.preventDefault();
      first.focus();
    }
  }

  return {
    open: function () { setOpen(true); },
    close: function () { setOpen(false); },
    onToggle: function (fn) { toggled.push(fn); }
  };
}
