let ship;
function setup() {
  createCanvas(720, 720);
  background(30);

  ship = new Ship(createVector(300, 300));

}


function draw() {

  background(30);
  ship.drawShip();
  ship.updateShipPos();

  if (keyIsDown(65)){ ship.turnShipLeft(); }
  if (keyIsDown(68)){ ship.turnShipRight(); }
  if (keyIsDown(87)){ ship.accelShip(); }

}
