import {
	getDiceRollArray,
	getDicePlaceholerHtml,
	getPercentage,
} from "./utils";

function Character(data) {
	Object.assign(this, data);

	this.maxHealth = this.health;

	this.diceHtml = getDicePlaceholerHtml(this.diceCount);

	this.getHealthBarHtml = function () {
		const percent = getPercentage(this.health, this.maxHealth);
		return `
        <div class="health-bar-outer">
            <div class="health-bar-inner ${percent <= 25 ? "danger" : ""}" 
                style="width: ${percent}%;">
            </div>
        </div>
        `;
	};

	this.takeDamage = function (attackScoreArray) {
		const totalAttackScore = attackScoreArray.reduce((total, dice) => {
			return (total += dice);
		}, 0);
		this.health -= totalAttackScore;
		if (this.health <= 0) {
			this.health = 0;
			this.dead = true;
		}
	};

	this.getCharacterHtml = function () {
		const { name, avatar, health, diceHtml } = this;
		const healthBar = this.getHealthBarHtml();
		return ` 
        <div class="character-card">
            <h4 class="name">${name}</h4>
            <img class="avatar" src="./${avatar}" />
            <div class="health">health: <b> ${health} </b></div>
            ${healthBar}
            <div class="dice-container">
                ${diceHtml}
            </div>
        </div>`;
	};

	this.setDiceHtml = function () {
		this.currentDiceScore = getDiceRollArray(this.diceCount);
		this.diceHtml = this.currentDiceScore
			.map((dice) => `<div class="dice">${dice}</div>`)
			.join("");
	};
}

export default Character;
