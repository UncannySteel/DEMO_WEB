import"./hud-D7Brf-1V.js";import{b as B}from"./sub-page-Dh98efzl.js";const L=`<!-- The feedback window (Contact). Any [data-feedback] button opens it; it
     is dressed as the demo form's browser window. Closed, it is inert and
     out of sight; open, everything behind it is inert instead. -->
<div class="fb" id="feedback" data-lenis-prevent inert>
  <div class="fb__scrim" data-fb-close></div>

  <div class="fb__win" role="dialog" aria-modal="true" aria-labelledby="fbTitle" aria-describedby="fbIntro">
    <div class="fb__bar">
      <span class="fb__dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="fb__url" aria-hidden="true">onextap / contact / feedback</span>
      <button class="fb__x" type="button" data-fb-close aria-label="Close feedback">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>

    <form class="fb__body" id="fbForm" novalidate>
      <p class="label fb__eyebrow">Feedback</p>
      <h2 class="display fb__title" id="fbTitle">Tell us straight.</h2>
      <p class="fb__intro" id="fbIntro">Short or long, rough or polished. We read all of it.</p>

      <fieldset class="fb__field fb__kinds">
        <legend class="fb__k">what's it about?</legend>
        <div class="fb__chips">
          <label class="fb__chip"><input type="radio" name="kind" value="idea" checked><span>An idea</span></label>
          <label class="fb__chip"><input type="radio" name="kind" value="bug"><span>Something broke</span></label>
          <label class="fb__chip"><input type="radio" name="kind" value="board"><span>A job board</span></label>
          <label class="fb__chip"><input type="radio" name="kind" value="other"><span>Something else</span></label>
        </div>
      </fieldset>

      <div class="fb__field">
        <div class="fb__krow">
          <label class="fb__k" for="fbMessage">message</label>
          <span class="fb__count" id="fbCount" aria-hidden="true">0 / 1000</span>
        </div>
        <textarea class="fb__inp" id="fbMessage" name="message" rows="5" maxlength="1000"
                  required aria-describedby="fbMessageErr"
                  placeholder="What happened, or what should happen?"></textarea>
        <p class="fb__err" id="fbMessageErr"></p>
      </div>

      <div class="fb__field">
        <label class="fb__k" for="fbEmail">email <span class="fb__opt">— optional, if you'd like a reply</span></label>
        <input class="fb__inp" id="fbEmail" name="email" type="email" autocomplete="email"
               inputmode="email" aria-describedby="fbEmailErr" placeholder="you@example.com">
        <p class="fb__err" id="fbEmailErr"></p>
      </div>

      <p class="fb__err fb__err--send" id="fbSendErr" role="alert"></p>
      <div class="fb__actions">
        <button class="btn btn--ghost" type="button" data-fb-close>Cancel</button>
        <button class="btn btn--solid" type="submit" id="fbSubmit"><span class="fb__submit">Send feedback</span> <span class="btn__arrow">→</span></button>
      </div>
    </form>

    <div class="fb__body fb__done" id="fbDone" hidden>
      <p class="fb__aside">thank you.</p>
      <h2 class="display fb__title" id="fbDoneTitle" tabindex="-1">Got it.</h2>
      <p class="fb__intro">It's with the people building Onextap. If you left an email, the reply comes from one of us.</p>
      <div class="fb__actions">
        <button class="btn btn--solid" type="button" data-fb-close>Close</button>
      </div>
    </div>
  </div>
</div>
`;var S=10;function M(r){return document.dispatchEvent(new CustomEvent("onextap:feedback",{detail:r})),Promise.resolve()}function T(r){var C=r&&r.send||M,l=document.getElementById("feedback"),s=document.getElementById("fbForm"),_=document.getElementById("fbDone"),m=document.getElementById("fbSubmit"),x=m.querySelector(".fb__submit"),u=document.getElementById("fbSendErr"),I=document.getElementById("fbCount"),i=s.elements.message,d=s.elements.email,t=!1,c=null,f=[],v=[];function o(e,n){e!==t&&(t=e,t?(c=n||document.activeElement,q(),Array.prototype.forEach.call(document.body.children,function(a){a===l||a.inert||(a.inert=!0,f.push(a))})):(f.forEach(function(a){a.inert=!1}),f=[]),l.inert=!t,l.classList.toggle("is-open",t),document.documentElement.classList.toggle("fb-open",t),v.forEach(function(a){a(t)}),t?s.querySelector('input[name="kind"]:checked').focus():c&&c.isConnected&&c.focus())}function q(){s.reset(),s.hidden=!1,_.hidden=!0,[i,d].forEach(function(e){p(e,"")}),u.textContent="",h(!1),g()}function g(){I.textContent=i.value.length+" / "+i.maxLength}function p(e,n){return e.closest(".fb__field").classList.toggle("is-bad",!!n),e.setAttribute("aria-invalid",n?"true":"false"),document.getElementById(e.getAttribute("aria-describedby")).textContent=n,!n}function y(){var e=i.value.trim();return p(i,e?e.length<S?"A little more, please: "+S+" characters or so.":"":"Tell us what’s on your mind.")}function k(){var e=d.value.trim();return p(d,e&&!d.checkValidity()?"That email doesn’t look right.":"")}i.addEventListener("input",function(){g(),i.getAttribute("aria-invalid")==="true"&&y()}),d.addEventListener("input",function(){d.getAttribute("aria-invalid")==="true"&&k()});function h(e){m.disabled=e,x.textContent=e?"Sending…":"Send feedback"}s.addEventListener("submit",function(e){e.preventDefault();var n=y();if(n=k()&&n,!n){s.querySelector('[aria-invalid="true"]').focus();return}u.textContent="",h(!0),Promise.resolve(C({kind:s.elements.kind.value,message:i.value.trim(),email:d.value.trim()||null,page:location.pathname,at:new Date().toISOString()})).then(function(){s.hidden=!0,_.hidden=!1,document.getElementById("fbDoneTitle").focus()},function(){u.textContent="That didn’t go through. Try again in a moment."}).then(function(){h(!1)})}),document.addEventListener("click",function(e){if(e.target.closest){var n=e.target.closest("[data-feedback]");n?o(!0,n):t&&e.target.closest("[data-fb-close]")&&o(!1)}}),document.addEventListener("keydown",function(e){t&&(e.key==="Escape"?(e.preventDefault(),o(!1)):e.key==="Tab"&&A(e))});function A(e){var n=Array.prototype.filter.call(l.querySelectorAll("button, input, textarea, a[href]"),function(E){return!E.disabled&&E.getClientRects().length>0});if(n.length){var a=n[0],w=n[n.length-1],b=document.activeElement;e.shiftKey&&(b===a||!l.contains(b))?(e.preventDefault(),w.focus()):!e.shiftKey&&(b===w||!l.contains(b))&&(e.preventDefault(),a.focus())}}return{open:function(){o(!0)},close:function(){o(!1)},onToggle:function(e){v.push(e)}}}const O=Object.freeze(Object.defineProperty({__proto__:null,initFeedback:T,markup:L},Symbol.toStringTag,{value:"Module"})),D=`<!-- ══ Contact ══ the feedback window, and quick answers before it ═════ -->
<section class="sub-hero" data-ground="ink">
  <div class="wrap">
    <a class="back" href="/" data-back><span class="back__arrow" aria-hidden="true">←</span> Back</a>
    <p class="label sub-hero__label" data-rise><span class="sub-hero__num">02</span>Company — Contact</p>
    <h1 class="display sub-hero__title" data-split>Talk to us.</h1>
    <p class="sub-hero__aside" data-rise>no ticket queue. just us.</p>
    <p class="lede sub-hero__lede" data-rise>
      Tell us what broke, what's missing, or which job board fought back. It goes straight to
      the people building Onextap.
    </p>
    <div class="sub-hero__actions" data-rise>
      <button class="btn btn--lit" type="button" data-feedback>Give feedback <span class="btn__arrow">→</span></button>
    </div>
  </div>
</section>

<div class="sub-body" data-ground="bone">
  <div class="wrap">
    <section class="sub-sec" aria-labelledby="contact-feedback">
      <p class="label">01 / Feedback</p>
      <div>
        <h2 class="display sub-sec__title" id="contact-feedback" data-split>Found a snag? Say so.</h2>
        <div class="fb-card" data-rise>
          <div class="fb-card__text">
            <p class="fb-card__lead">The quickest way to reach us is the feedback window. Worth including:</p>
            <ul class="sub-list">
              <li><span class="tick" aria-hidden="true">◆</span> <span>The job board, and the page the form was on.</span></li>
              <li><span class="tick" aria-hidden="true">◆</span> <span>What you expected Onextap to fill, and what it did.</span></li>
              <li><span class="tick" aria-hidden="true">◆</span> <span>Your browser — Chrome, Edge, Brave or Opera.</span></li>
            </ul>
          </div>
          <button class="btn btn--solid fb-card__btn" type="button" data-feedback>Open the feedback window <span class="btn__arrow">→</span></button>
        </div>
      </div>
    </section>

    <section class="sub-sec" aria-labelledby="contact-faq">
      <p class="label">02 / Before you write</p>
      <div>
        <h2 class="display sub-sec__title" id="contact-faq" data-split>Quick answers.</h2>
        <dl class="faq" data-rise>
          <div class="faq__row">
            <dt>How much is it?</dt>
            <dd>Free forever, no card. Premium is $5 a month for unlimited AI answers. <a href="/#price">See pricing</a>.</dd>
          </div>
          <div class="faq__row">
            <dt>Where does my data go?</dt>
            <dd>Your profile stays in your browser; only answer drafting leaves it. <a href="/privacy/">The details</a>.</dd>
          </div>
          <div class="faq__row">
            <dt>Which browsers?</dt>
            <dd>Chrome, Edge, Brave and Opera.</dd>
          </div>
          <div class="faq__row">
            <dt>Which job boards?</dt>
            <dd>Greenhouse, Lever, Workday, Ashby, iCIMS, Workable, SmartRecruiters and Taleo. Another one giving you trouble? <button class="faq__link" type="button" data-feedback>Tell us which</button>.</dd>
          </div>
        </dl>
      </div>
    </section>
  </div>
</div>
`;var W=B({contact:{markup:D},feedback:O});T().onToggle(W.hold);
