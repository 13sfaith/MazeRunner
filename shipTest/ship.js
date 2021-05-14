class Ship {
          constructor(pos, size = 9) {
                    this.pos = pos;
                    this.size = size;
                    this.vel = createVector(0.2, 0.2)
                    this.angle = 0;
                    this.turnSpeed = 0.07;
                    this.accel = 0.01;
          }

          drawShip() {
                    let scale = 4/5;
                    let flexAngle = 0;
                    flexAngle += this.angle;
                    // top
                    let top = createVector(0, 0);
                    top.x = this.pos.x + Math.cos(flexAngle) * this.size;
                    top.y = this.pos.y + Math.sin(flexAngle) * this.size;

                    //left
                    let left = createVector(0, 0);
                    flexAngle += (2 * PI) / 3;
                    left.x = this.pos.x + Math.cos(flexAngle) * this.size * (scale);
                    left.y = this.pos.y + Math.sin(flexAngle) * this.size * scale;

                    //right
                    let right = createVector(0, 0);
                    flexAngle += (2 * PI) / 3;
                    right.x = this.pos.x + Math.cos(flexAngle) * this.size * scale;
                    right.y = this.pos.y + Math.sin(flexAngle) * this.size * scale;

                    triangle(top.x, top.y, left.x, left.y, right.x, right.y);

          }

          updateShipPos() {
                    this.pos.add(this.vel);
          }

          accelShip() {
                    this.vel.x += Math.cos(this.angle) * this.accel;
                    this.vel.y += Math.sin(this.angle) * this.accel;
          }

          turnShipLeft() { this.angle -= this.turnSpeed }
          turnShipRight() { this.angle += this.turnSpeed }
}