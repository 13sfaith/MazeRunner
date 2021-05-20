let maze;
let fleet;
let bounds;
let tempWeights = [];

function rebuildLevel() {
	stroke(255);
	maze = new Maze(10, 10, 72);
	maze.mazeGen(maze.cellList[0]);

	bounds = new BoundaryManager(maze);

	fleet = new Fleet(10, bounds, tempWeights);

}

function setup() {
	createCanvas(720, 720);
	background(30);

	rebuildLevel();
}


let epoch = 0;
let iterations = 100;
function draw() {
	background(30);
	maze.drawToScreen();

	fleet.handleDraw();

	if (fleet.canRespawn) {
		epoch++;
		console.log(`Epoch: ${epoch}`);
		tempWeights = fleet.weights;
		rebuildLevel();
	}

	/*
	ship.drawShip();
	ship.updateShipPos();
	ship.handleInput();

	if (!bounds.isSafe(ship))
		rebuildLevel();
		*/

}
