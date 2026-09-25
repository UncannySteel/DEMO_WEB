import{c as w}from"./login-Dkbvblsg.js";import{b as E}from"./sub-page-NtQbX8nA.js";const S=`<!-- The feedback window (Contact). Any [data-feedback] button opens it; it
     is dressed as the demo form's browser window (shared/styles/dialog.css).
     Closed, it is inert and out of sight; open, everything behind it is
     inert instead. -->
<div class="dlg fb" id="feedback" data-lenis-prevent inert>
  <div class="dlg__scrim" data-dlg-close></div>

  <div class="dlg__win" role="dialog" aria-modal="true" aria-labelledby="fbTitle" aria-describedby="fbIntro">
    <div class="dlg__bar">
      <span class="dlg__dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="dlg__url" aria-hidden="true">onextap / contact / feedback</span>
      <button class="dlg__x" type="button" data-dlg-close aria-label="Close feedback">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>

    <form class="dlg__body" id="fbForm" novalidate>
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
        <button class="btn btn--ghost" type="button" data-dlg-close>Cancel</button>
        <button class="btn btn--solid" type="submit" id="fbSubmit"><span class="fb__submit">Send feedback</span> <span class="btn__arrow">→</span></button>
      </div>
    </form>

    <div class="dlg__body fb__done" id="fbDone" hidden>
      <p class="fb__aside">thank you.</p>
      <h2 class="display fb__title" id="fbDoneTitle" tabindex="-1">Got it.</h2>
      <p class="fb__intro">It's with the people building Onextap. If you left an email, the reply comes from one of us.</p>
      <div class="fb__actions">
        <button class="btn btn--solid" type="button" data-dlg-close>Close</button>
      </div>
    </div>
  </div>
</div>
`;var f=10;function x(i){return document.dispatchEvent(new CustomEvent("onextap:feedback",{detail:i})),Promise.resolve()}function _(i){var h=i&&i.send||x,m=document.getElementById("feedback"),a=document.getElementById("fbForm"),r=document.getElementById("fbDone"),c=document.getElementById("fbSubmit"),v=c.querySelector(".fb__submit"),d=document.getElementById("fbSendErr"),g=document.getElementById("fbCount"),n=a.elements.message,s=a.elements.email,k=w(m,{trigger:"[data-feedback]",reset:y,focus:function(){return a.querySelector('input[name="kind"]:checked')}});function y(){a.reset(),a.hidden=!1,r.hidden=!0,[n,s].forEach(function(e){l(e,"")}),d.textContent="",o(!1),b()}function b(){g.textContent=n.value.length+" / "+n.maxLength}function l(e,t){return e.closest(".fb__field").classList.toggle("is-bad",!!t),e.setAttribute("aria-invalid",t?"true":"false"),document.getElementById(e.getAttribute("aria-describedby")).textContent=t,!t}function u(){var e=n.value.trim();return l(n,e?e.length<f?"A little more, please: "+f+" characters or so.":"":"Tell us what’s on your mind.")}function p(){var e=s.value.trim();return l(s,e&&!s.checkValidity()?"That email doesn’t look right.":"")}n.addEventListener("input",function(){b(),n.getAttribute("aria-invalid")==="true"&&u()}),s.addEventListener("input",function(){s.getAttribute("aria-invalid")==="true"&&p()});function o(e){c.disabled=e,v.textContent=e?"Sending…":"Send feedback"}return a.addEventListener("submit",function(e){e.preventDefault();var t=u();if(t=p()&&t,!t){a.querySelector('[aria-invalid="true"]').focus();return}d.textContent="",o(!0),Promise.resolve(h({kind:a.elements.kind.value,message:n.value.trim(),email:s.value.trim()||null,page:location.pathname,at:new Date().toISOString()})).then(function(){a.hidden=!0,r.hidden=!1,document.getElementById("fbDoneTitle").focus()},function(){d.textContent="That didn’t go through. Try again in a moment."}).then(function(){o(!1)})}),k}const C=Object.freeze(Object.defineProperty({__proto__:null,initFeedback:_,markup:S},Symbol.toStringTag,{value:"Module"})),T=`<!-- ══ Contact ══ the feedback window, and quick answers before it ═════ -->
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
      <button class="btn btn--lit" type="button" data-feedback aria-haspopup="dialog">Give feedback <span class="btn__arrow">→</span></button>
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
          <button class="btn btn--solid fb-card__btn" type="button" data-feedback aria-haspopup="dialog">Open the feedback window <span class="btn__arrow">→</span></button>
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
            <dd>Greenhouse, Lever, Workday, Ashby, iCIMS, Workable, SmartRecruiters and Taleo. Another one giving you trouble? <button class="faq__link" type="button" data-feedback aria-haspopup="dialog">Tell us which</button>.</dd>
          </div>
        </dl>
      </div>
    </section>
  </div>
</div>
`;var I=E({contact:{markup:T},feedback:C});_().onToggle(I.hold);
