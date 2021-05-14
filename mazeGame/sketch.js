let maze;
let ship;

function setup() {
	createCanvas(720, 720);
	background(30);

	stroke(255);
	maze = new Maze(15, 15, 48);
	maze.mazeGen(maze.cellList[0]);

	ship = new Ship(createVector(24, 24))
}


function draw() {
	background(30);
	maze.drawToScreen();

	ship.drawShip();
	ship.updateShipPos();
	ship.handleInput();

}
