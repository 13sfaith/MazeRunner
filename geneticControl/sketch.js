let maze;
let fleet;
let bounds;
let tempWeights = [];

function rebuildLevel() {
	stroke(255);
	maze = new Maze(15, 15, 48);
	maze.mazeGen(maze.cellList[0]);

	bounds = new BoundaryManager(maze);

	fleet = new Fleet(10, bounds, tempWeights);
}

function setup() {
	createCanvas(720, 720);
	background(30);

	rebuildLevel();
}


function draw() {
	background(30);
	maze.drawToScreen();

	fleet.handleDraw();

	if (fleet.canRespawn) {
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
