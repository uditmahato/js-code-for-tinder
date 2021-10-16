// ==UserScript==
// @name        Tinder Deblur
// @namespace   Violentmonkey Scripts
// @match       https://tinder.com/*
// @grant       none
// @version     1.3
// @author      Tajnymag
// @downloadURL https://gist.githubusercontent.com/Tajnymag/9de74305f9bb09aa940d26418bd508f1/raw/tinder.user.js
// @description Simple script using the official Tinde API to get clean photos of the users who liked you
// ==/UserScript==

async function unblur() {
  const teasers = await fetch("https://api.gotinder.com/v2/fast-match/teasers", { "headers": { "X-Auth-Token": localStorage.getItem('TinderWeb/APIToken') }}).then(res => res.json()).then(res => res.data.results);
  const teaserEls = document.querySelectorAll('.Expand.enterAnimationContainer > div:nth-child(1)');
  
  for (let i = 0; i < teaserEls.length; ++i) {
    const teaser = teasers[i];
    const teaserEl = teaserEls[i];
    
    const teaserImage = teaser.user.photos[0].url;
    
    teaserEl.style.backgroundImage = `url(${teaserImage})`;
  }
}

setInterval(() => {
    if (['/app/likes-you', '/app/gold-home'].includes(location.pathname)) {
      unblur();
    }
}, 5000);