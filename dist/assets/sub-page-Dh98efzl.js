import{m as c,h as s,n as u,c as d,i as f,b as p,p as h,r as g,d as m,f as y,g as i,s as l}from"./hud-D7Brf-1V.js";const v=`<!-- The foot of a company page: the other company pages, the way home, and
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
`;var S="/";function q(a){c(Object.assign({cursor:d,nav:u,hud:s,"page-foot":{markup:v}},a));var e=f(),t=p({home:S});t.onToggle(e.refresh),window.addEventListener("load",e.refresh),document.fonts&&document.fonts.ready.then(e.refresh),b(),A(),document.querySelectorAll("[data-year]").forEach(function(n){n.textContent=new Date().getFullYear()});var r=null;h?document.documentElement.classList.add("no-motion"):(g(),r=m(),y(),k());function o(n){r&&(n?r.stop():r.start())}return t.onToggle(o),{hold:o}}function b(){document.querySelectorAll("[data-back]").forEach(function(a){a.addEventListener("click",function(e){if(!(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)){var t=null;try{t=document.referrer&&new URL(document.referrer)}catch{t=null}!t||t.origin!==location.origin||history.length<2||(e.preventDefault(),history.back())}})})}function A(){document.querySelectorAll(".page-foot a").forEach(function(a){a.pathname===location.pathname&&a.setAttribute("aria-current","page")})}function k(){var a=document.querySelector(".sub-hero");i.timeline({defaults:{ease:"power3.out"}}).fromTo(l(a.querySelector("[data-split]")),{yPercent:105},{yPercent:0,duration:.9,stagger:.06},.1).fromTo(a.querySelectorAll("[data-rise]"),{y:18,opacity:0},{y:0,opacity:1,duration:.8,stagger:.08},.3),document.querySelectorAll(".sub-sec").forEach(function(e){var t=e.querySelector("[data-split]"),r=i.timeline({defaults:{ease:"power3.out"},scrollTrigger:{trigger:e,start:"top 88%",once:!0}});r.fromTo(e,{"--rule-in":0},{"--rule-in":1,duration:.9},0),t&&r.fromTo(l(t),{yPercent:105},{yPercent:0,duration:.8,stagger:.04},0),r.fromTo(e.querySelectorAll("[data-rise]"),{y:22,opacity:0},{y:0,opacity:1,duration:.7,stagger:.07},.12)})}export{q as b};
