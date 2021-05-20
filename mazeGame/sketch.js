let maze;
let fleet;
let bounds;

function rebuildLevel() {
	stroke(255);
	maze = new Maze(15, 15, 48);
	maze.mazeGen(maze.cellList[0]);

	bounds = new BoundaryManager(maze);

	ship = new Ship(createVector(24, 24));
}

function setup() {
	createCanvas(720, 720);
	background(30);

	rebuildLevel();
}


function draw() {
	background(30);
	maze.drawToScreen();

	ship.drawShip();
	ship.updateShipPos();
	ship.handleInput();

	if (!bounds.isSafe(ship))
		rebuildLevel();

}
