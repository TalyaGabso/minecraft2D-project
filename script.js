//buttons
const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart");
const exitBtn = document.querySelector(".exit");

const landingPage = document.querySelector(".landing-page");
const mainPage = document.querySelector(".main-page");
const world = document.querySelector(".world");
//tools
const pickAxa = document.querySelector(".pickaxa");
const shovel = document.querySelector(".shovel");
const axe = document.querySelector(".axe");
//element
const element = document.querySelector(".sidebar-element");

let currentTool;
let currentTile;
let currentElement;
let listOfElements = [];

const matrixWorld = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
	[6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
	[6, 6, 0, 0, 0, 0, 0, 0, 2, 0, 3, 0, 0],
	[6, 6, 6, 0, 0, 0, 0, 2, 2, 2, 3, 6, 6],
	[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
	[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
	[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
	[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
	[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
];
let updatedWorld = JSON.parse(JSON.stringify(matrixWorld));
//start the game

function startGame() {
	landingPage.style.display = "none";

	createWorld(matrixWorld);
}
//create the metrix
function createWorld(matrixWorld) {
	let tile;
	let row = document.createElement("div");
	world.appendChild(row);
	row.classList.add(".row");
	//i=column
	for (let i = 0; i < matrixWorld.length; i++) {
		//j=row
		for (let j = 0; j < matrixWorld[i].length; j++) {
			tile = document.createElement("div");
			tile.classList.add("tile");
			addTileElement(matrixWorld[j][i], tile, j, i);
			row.appendChild(tile);
			tile.addEventListener("click", clickTile);
		}
		row = document.createElement("div");
		world.appendChild(row);
		row.classList.add(".row");
	}
}
//create the type element for each tile
function addTileElement(type, tile, row, col) {
	switch (type) {
		case 0:
			tile.classList.add("sky");
			tile.setAttribute("data-type", "sky");
			tile.setAttribute("data-row", row);
			tile.setAttribute("data-col", col);
			break;
		case 1:
			tile.classList.add("cloud");
			tile.setAttribute("data-type", "cloud");
			tile.setAttribute("data-row", row);
			tile.setAttribute("data-col", col);
			break;
		case 2:
			tile.classList.add("leaves");
			tile.setAttribute("data-type", "leaves");
			tile.setAttribute("data-row", row);
			tile.setAttribute("data-col", col);
			break;
		case 3:
			tile.classList.add("oakLog");
			tile.setAttribute("data-type", "oakLog");
			tile.setAttribute("data-row", row);
			tile.setAttribute("data-col", col);
			break;
		case 4:
			tile.classList.add("grass");
			tile.setAttribute("data-type", "grass");
			tile.setAttribute("data-row", row);
			tile.setAttribute("data-col", col);
			break;
		case 5:
			tile.classList.add("soil");
			tile.setAttribute("data-type", "soil");
			tile.setAttribute("data-row", row);
			tile.setAttribute("data-col", col);
			break;
		case 6:
			tile.classList.add("rock");
			tile.setAttribute("data-type", "rock");
			tile.setAttribute("data-row", row);
			tile.setAttribute("data-col", col);
			break;
	}
}
//----------sidebar----------//
//selecting tools function
pickAxa.addEventListener("click", () => selectTool("pickaxe"));
shovel.addEventListener("click", () => selectTool("shovel"));
axe.addEventListener("click", () => selectTool("axe"));
//add selected class to tool
function selectTool(tool) {
	currentTool = tool;
	pickAxa.classList.remove("selected");
	shovel.classList.remove("selected");
	axe.classList.remove("selected");
	switch (tool) {
		case "pickaxe":
			pickAxa.classList.add("selected");
			break;
		case "shovel":
			shovel.classList.add("selected");
			break;
		case "axe":
			axe.classList.add("selected");
			break;
	}
}

function clickTile(e) {
	// debugger;
	currentTile = e.currentTarget.getAttribute("data-type");
	console.log(`click tile ${currentTile}, tool ${currentTool}`);

	if (currentElement) {
		setTile(e.target);
		return;
	}

	if (listOfElements.length >= 1) {
		console.log("Inventory is full");
		return;
	}

	if (!currentTool) {
		console.log("No tool");
		return;
	}

	const deadTiles = ["sky", "cloud"];
	if (deadTiles.includes(currentTile)) {
		console.log("Dead Tile");
		return;
	}

	const pickAxeTiles = ["rock"];
	if (currentTool == "pickaxe" && pickAxeTiles.includes(currentTile)) {
		removeTile(e.target);
	}
	const shovelTiles = ["grass", "soil"];
	if (currentTool == "shovel" && shovelTiles.includes(currentTile)) {
		removeTile(e.target);
	}
	const axeTiles = ["oakLog", "leaves"];
	if (currentTool == "axe" && axeTiles.includes(currentTile)) {
		removeTile(e.target);
	}
}

function removeTile(target) {
	let row = target.getAttribute("data-row");
	let col = target.getAttribute("data-col");
	if (checkForSky(+row, +col)) {
		let type = target.getAttribute("data-type");
		target.setAttribute("data-type", "sky");
		target.classList.add("sky");
		target.classList.remove(type);

		element.setAttribute("data-type", type);
		element.classList.add(type);

		listOfElements.push(type);

		updateMatix(target);
	}
}

function setTile(target) {
	let row = target.getAttribute("data-row");
	let col = target.getAttribute("data-col");
	if(checkAllSky(+row,+col)) return;

	let type = target.getAttribute("data-type");
	if (type != "sky") return;

	target.setAttribute("data-type", currentElement);
	target.classList.add(currentElement);
	target.classList.remove("sky");

	element.classList.remove(currentElement);
	element.removeAttribute("data-type");

	listOfElements.pop();
	currentElement = null;

	updateMatix(target);
}

function checkForSky(row, col) {
	return (
		isSky(row - 1, col - 1) ||
		isSky(row - 1, col) ||
		isSky(row - 1, col + 1) ||
		isSky(row, col - 1) ||
		isSky(row, col + 1) ||
		isSky(row + 1, col - 1) ||
		isSky(row + 1, col) ||
		isSky(row + 1, col + 1)
	);
}
//disable float
function checkAllSky(row, col) {
	return (
		isSky(row - 1, col - 1) &&
		isSky(row - 1, col) &&
		isSky(row - 1, col + 1) &&
		isSky(row, col - 1) &&
		isSky(row, col + 1) &&
		isSky(row + 1, col - 1) &&
		isSky(row + 1, col) &&
		isSky(row + 1, col + 1)
	);
}

function isSky(row, col) {
	console.log(row,col);
	if (row < 0 || row > updatedWorld.length) return true;
	if (col < 0 || col > updatedWorld.length) return true;
	console.log(updatedWorld[row][col]);
	return updatedWorld[row][col] == 0;
}

function updateMatix(target) {
	let row = target.getAttribute("data-row");
	let col = target.getAttribute("data-col");
	let type = target.getAttribute("data-type");
	updatedWorld[row][col] = getElementType(type);
	// console.log(updatedWorld);
}

function getElementName(type) {
	switch (type) {
		case 0:
			return "sky";
		case 1:
			return "cloud";
		case 2:
			return "leaves";
		case 3:
			return "oakLog";
		case 4:
			return "grass";
		case 5:
			return "soil";
		case 6:
			return "rock";
	}
}

function getElementType(name) {
	switch (name) {
		case "sky":
			return 0;
		case "cloud":
			return 1;
		case "leaves":
			return 2;
		case "oakLog":
			return 3;
		case "grass":
			return 4;
		case "soil":
			return 5;
		case "rock":
			return 6;
	}
}

//element selected
element.addEventListener("click", (e) => {
	currentElement = e.target.getAttribute("data-type");
});

//buttons function
startBtn.addEventListener("click", () => {
	startGame();
});
restartBtn.addEventListener("click", () => {
	world.innerHTML='';
	startGame();

	});
exitBtn.addEventListener("click", () => window.location.reload());
