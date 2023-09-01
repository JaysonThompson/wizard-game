import { demon, goblin, orc, wizard } from "./images";

const characterData = {
	hero: {
		name: "Wizard",
		avatar: wizard,
		health: 60,
		diceCount: 3,
		currentDiceScore: [],
	},
	orc: {
		name: "Orc",
		avatar: orc,
		health: 30,
		diceCount: 1,
		currentDiceScore: [],
	},
	demon: {
		name: "Demon",
		avatar: demon,
		health: 25,
		diceCount: 2,
		currentDiceScore: [],
	},
	goblin: {
		name: "Goblin",
		avatar: goblin,
		health: 20,
		diceCount: 3,
		currentDiceScore: [],
	},
};

export default characterData;
