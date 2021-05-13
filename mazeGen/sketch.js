let maze;

function setup() {
  createCanvas(720, 720);
  background(30);

	stroke(255);
	maze = new Maze(5, 5, 48);
	maze.mazeGen(maze.cellList[0]);
	console.log(maze.cellList);

}


function draw() {
	noLoop();
	maze.drawToScreen();

}
