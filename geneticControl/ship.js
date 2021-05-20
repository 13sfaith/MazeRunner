class Ship {
	constructor(pos, size = 9, weights) {
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
		this.model = tf.sequential({
			layers: [
				tf.layers.dense({batchInputShape: [1, 15], units: 30, activation: 'sigmoid'}),
				tf.layers.dense({units: 55, activation: 'hardSigmoid'}),
				tf.layers.dense({units: 40, activation: 'hardSigmoid'}),
				tf.layers.dense({units: 4, activation: 'sigmoid'}),
			]
		});
		
		if (weights.length > 0) {
			let tempArr = [];
			tempArr[0] = weights[0].add(tf.scalar(Math.random() * .2));
			tempArr[1] = weights[1].add(tf.scalar(Math.random() * .2));

			this.model.getLayer(null, 1).setWeights(tempArr);

			tempArr[0] = weights[2].add(tf.scalar(Math.random() * .2));
			tempArr[1] = weights[3].add(tf.scalar(Math.random() * .2));

			this.model.getLayer(null, 2).setWeights(tempArr);
		}
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

	normalizeAngle() { 
		this.angle = this.angle > (PI * 2) ? this.angle - (PI * 2) : this.angle; 
		this.angle = this.angle < 0 ? this.angle + (PI * 2) : this.angle; 
	}
	turnShipLeft() { this.angle -= this.turnSpeed; this.normalizeAngle(); }
	turnShipRight() { this.angle += this.turnSpeed; this.normalizeAngle(); }

	handleInput(value) {
		if (value == null) {
			if (keyIsDown(65)){ this.turnShipLeft(); }
			if (keyIsDown(68)){ this.turnShipRight(); }
			if (keyIsDown(87)){ this.accelShip(); }
		} else {
			switch (value) {
				case 0:
					this.accelShip();
					break;
				case 1:
					this.turnShipLeft();
					break;
				case 2:
					this.turnShipRight();
					break;
			}
		}
	}
}
