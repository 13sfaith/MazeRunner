class Ship {
	constructor(pos, size = 9) {
		this.pos = pos;
		this.size = size;
		this.vel = createVector(0.2, 0.2)
		this.angle = 0;
		this.turnSpeed = 0.09;
		this.accel = 0.05;
		this.topSpeed = 0.75;
		this.drag = 0.99;
		this.points = { left: createVector(0, 0), right: createVector(0, 0), 
			top: createVector(0, 0), bottom: createVector(0, 0) };
	}

	drawShip() {
		let scale = 4/5;
		let flexAngle = 0;
		flexAngle += this.angle;
		// top
		this.points.top.x = this.pos.x + Math.cos(flexAngle) * this.size;
		this.points.top.y = this.pos.y + Math.sin(flexAngle) * this.size;

		//left
		flexAngle += (2 * PI) / 3;
		this.points.left.x = this.pos.x + Math.cos(flexAngle) * this.size * (scale);
		this.points.left.y = this.pos.y + Math.sin(flexAngle) * this.size * scale;

		//right
		flexAngle += (2 * PI) / 3;
		this.points.right.x = this.pos.x + Math.cos(flexAngle) * this.size * scale;
		this.points.right.y = this.pos.y + Math.sin(flexAngle) * this.size * scale;

		triangle(this.points.top.x, this.points.top.y, this.points.left.x, this.points.left.y, this.points.right.x, this.points.right.y);

	}

	updateShipPos() {
		this.vel.mult(this.drag);
		this.pos.add(this.vel);
	}

	accelShip() {
		this.vel.x += Math.cos(this.angle) * this.accel;
		if (this.vel.x > this.topSpeed)
			this.vel.x = this.topSpeed;
		if (this.vel.x < -this.topSpeed)
			this.vel.x = -this.topSpeed;
		this.vel.y += Math.sin(this.angle) * this.accel;
		if (this.vel.y > this.topSpeed)
			this.vel.y = this.topSpeed;
		if (this.vel.y < -this.topSpeed)
			this.vel.y = -this.topSpeed;
	}

	normalizeAngle() { this.angle = this.angle > (PI * 2) ? this.angle - (PI * 2) : this.angle; }
	turnShipLeft() { this.angle -= this.turnSpeed; normalizeAngle(); }
	turnShipRight() { this.angle += this.turnSpeed; normalizeAngle(); }

	handleInput() {
		if (keyIsDown(65)){ this.turnShipLeft(); }
		if (keyIsDown(68)){ this.turnShipRight(); }
		if (keyIsDown(87)){ this.accelShip(); }
	}
}
