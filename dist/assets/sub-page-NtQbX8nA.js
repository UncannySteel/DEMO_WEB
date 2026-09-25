import{m as s,l as c,h as u,n as d,b as f,i as p,d as g,p as h,r as m,j as y,k as v,f as S,g as i,s as l}from"./login-Dkbvblsg.js";const b=`<!-- The foot of a company page: the other company pages, the way home, and
     the landing page's footer mark to end on. -->
<footer class="page-foot" data-ground="ink">
  <div class="wrap">
    <div class="page-foot__grid">
      <div>
        <h4>Onextap</h4>
        <p class="page-foot__note">An application copilot, not an applicant tracking system.</p>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="/about/">About</a></li>
          <li><a href="/contact/">Contact</a></li>
          <li><a href="/privacy/">Privacy</a></li>
        </ul>
      </div>
      <div>
        <h4>The story</h4>
        <ul>
          <li><a href="/">Start from the top</a></li>
          <li><a href="/#price">Pricing</a></li>
        </ul>
      </div>
      <div>
        <p class="page-foot__note">&copy; <span data-year></span> Onextap. Chrome, Edge, Brave and Opera.</p>
      </div>
    </div>
    <p class="display page-foot__mark" aria-hidden="true">Onextap</p>
  </div>
</footer>
`;var k="/";function w(a){s(Object.assign({cursor:f,nav:d,hud:u,login:c,"page-foot":{markup:b}},a));var e=p(),t=g({home:k});t.onToggle(e.refresh),window.addEventListener("load",e.refresh),document.fonts&&document.fonts.ready.then(e.refresh),A(),T(),document.querySelectorAll("[data-year]").forEach(function(r){r.textContent=new Date().getFullYear()});var n=null;h?document.documentElement.classList.add("no-motion"):(m(),n=y(),v(),q());function o(r){n&&(r?n.stop():n.start())}return t.onToggle(o),S().onToggle(o),{hold:o}}function A(){document.querySelectorAll("[data-back]").forEach(function(a){a.addEventListener("click",function(e){if(!(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)){var t=null;try{t=document.referrer&&new URL(document.referrer)}catch{t=null}!t||t.origin!==location.origin||history.length<2||(e.preventDefault(),history.back())}})})}function T(){document.querySelectorAll(".page-foot a").forEach(function(a){a.pathname===location.pathname&&a.setAttribute("aria-current","page")})}function q(){var a=document.querySelector(".sub-hero");i.timeline({defaults:{ease:"power3.out"}}).fromTo(l(a.querySelector("[data-split]")),{yPercent:105},{yPercent:0,duration:.9,stagger:.06},.1).fromTo(a.querySelectorAll("[data-rise]"),{y:18,opacity:0},{y:0,opacity:1,duration:.8,stagger:.08},.3),document.querySelectorAll(".sub-sec").forEach(function(e){var t=e.querySelector("[data-split]"),n=i.timeline({defaults:{ease:"power3.out"},scrollTrigger:{trigger:e,start:"top 88%",once:!0}});n.fromTo(e,{"--rule-in":0},{"--rule-in":1,duration:.9},0),t&&n.fromTo(l(t),{yPercent:105},{yPercent:0,duration:.8,stagger:.04},0),n.fromTo(e.querySelectorAll("[data-rise]"),{y:22,opacity:0},{y:0,opacity:1,duration:.7,stagger:.07},.12)})}export{w as b};
