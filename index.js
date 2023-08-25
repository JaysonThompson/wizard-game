import characterData from "./data.js";
import Character from "./Character.js";

let monsterArray = ["orc", "demon", "goblin"];
const attackBtn = document.getElementById("attack-button");

function getNewMonster() {
	const nextMonsterData = characterData[monsterArray.shift()];
	return nextMonsterData ? new Character(nextMonsterData) : {};
}

function attack() {
	wizard.setDiceHtml();
	monster.setDiceHtml();
	wizard.takeDamage(monster.currentDiceScore);
	monster.takeDamage(wizard.currentDiceScore);
	render();

	if (wizard.dead) {
		setTimeout(() => endGame(), 1500);
	} else if (monster.dead) {
		if (monsterArray.length > 0) {
			attackBtn.setAttribute("disabled", "disabled");
			setTimeout(() => {
				monster = getNewMonster();
				attackBtn.removeAttribute("disabled");
			}, 1000);
			setTimeout(() => render(), 1000);
		} else {
			setTimeout(() => endGame(), 1500);
		}
	}
}

function endGame() {
	const endMessage =
		wizard.dead && monster.dead
			? "No victors - all creatures are dead"
			: wizard.dead
			? "The Monsters are Victorious!"
			: "The Wizard Wins!";

	const endEmoji = wizard.health > 0 ? "🔮" : "💀";

	document.body.innerHTML = `<div class="end-game">
        <h2>Game Over</h2>
        <h3>${endMessage}</h3>
        <p class="end-emoji">${endEmoji}</p>
    </div>`;
}

attackBtn.addEventListener("click", attack);

function render() {
	document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
	document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}

const wizard = new Character(characterData.hero);
let monster = getNewMonster();

render();
