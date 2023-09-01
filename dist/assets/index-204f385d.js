(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();const v="/assets/demon-14b744dd.png",p="/assets/goblin-5f455828.png",b="/assets/orc-52393e2f.png",y="/assets/wizard-ab2651a7.png",u={hero:{name:"Wizard",avatar:y,health:60,diceCount:3,currentDiceScore:[]},orc:{name:"Orc",avatar:b,health:30,diceCount:1,currentDiceScore:[]},demon:{name:"Demon",avatar:v,health:25,diceCount:2,currentDiceScore:[]},goblin:{name:"Goblin",avatar:p,health:20,diceCount:3,currentDiceScore:[]}};function D(r){return new Array(r).fill(0).map(()=>Math.floor(Math.random()*6)+1)}function H(r){return new Array(r).fill("").map(()=>'<div class="placeholder-dice"></div>').join("")}const $=(r,t)=>100*r/t;function m(r){Object.assign(this,r),this.maxHealth=this.health,this.diceHtml=H(this.diceCount),this.getHealthBarHtml=function(){const t=$(this.health,this.maxHealth);return`
        <div class="health-bar-outer">
            <div class="health-bar-inner ${t<=25?"danger":""}" 
                style="width: ${t}%;">
            </div>
        </div>
        `},this.takeDamage=function(t){const s=t.reduce((c,e)=>c+=e,0);this.health-=s,this.health<=0&&(this.health=0,this.dead=!0)},this.getCharacterHtml=function(){const{name:t,avatar:s,health:c,diceHtml:e}=this,n=this.getHealthBarHtml();return` 
        <div class="character-card">
            <h4 class="name">${t}</h4>
            <img class="avatar" src="./${s}" />
            <div class="health">health: <b> ${c} </b></div>
            ${n}
            <div class="dice-container">
                ${e}
            </div>
        </div>`},this.setDiceHtml=function(){this.currentDiceScore=D(this.diceCount),this.diceHtml=this.currentDiceScore.map(t=>`<div class="dice">${t}</div>`).join("")}}let f=["orc","demon","goblin"];const d=document.getElementById("attack-button");function g(){const r=u[f.shift()];return r?new m(r):{}}function w(){a.setDiceHtml(),i.setDiceHtml(),a.takeDamage(i.currentDiceScore),i.takeDamage(a.currentDiceScore),l(),a.dead?setTimeout(()=>h(),1500):i.dead&&(f.length>0?(d.setAttribute("disabled","disabled"),setTimeout(()=>{i=g(),d.removeAttribute("disabled")},1e3),setTimeout(()=>l(),1e3)):setTimeout(()=>h(),1500))}function h(){const r=a.dead&&i.dead?"No victors - all creatures are dead":a.dead?"The Monsters are Victorious!":"The Wizard Wins!",t=a.health>0?"🔮":"💀";document.body.innerHTML=`<div class="end-game">
        <h2>Game Over</h2>
        <h3>${r}</h3>
        <p class="end-emoji">${t}</p>
    </div>`}d.addEventListener("click",w);function l(){document.getElementById("hero").innerHTML=a.getCharacterHtml(),document.getElementById("monster").innerHTML=i.getCharacterHtml()}const a=new m(u.hero);let i=g();l();
