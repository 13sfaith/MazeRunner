function setup() {
  createCanvas(720, 720);
  background(30);

	stroke(255);
	var maze = new Maze(15, 15, 48);
	maze.drawToScreen();

}


function draw() {

}
