class Ship {
	constructor(pos, size = 9, weights) {
		this.pos = pos;
		this.startingPos = createVector(pos.x, pos.y);
		this.finalDistance = createVector(0, 0);
		this.size = size;
		this.vel = createVector(0.0, 0.0); 
		this.angle = Math.random() * (2 * PI);
		this.turnSpeed = 0.08;
		this.accel = 0.05;
		this.topSpeed = 0.35;
		this.drag = 0.99;
		this.stillCount = 0;
		this.points = { left: createVector(0, 0), right: createVector(0, 0), 
			top: createVector(0, 0), bottom: createVector(0, 0) };

		this.fill = '#fff';
			
		this.MutationRate = .001;
		this.MutationChance = 7;
		this.model = tf.sequential({
			layers: [
				tf.layers.dense({batchInputShape: [1, 16], units: 30, activation: 'elu'}),
				tf.layers.dense({units: 75, activation: 'relu'}),
				tf.layers.dense({units: 85, activation: 'relu'}),
				tf.layers.dense({units: 85, activation: 'relu'}),
				tf.layers.dense({units: 70, activation: 'relu'}),
				tf.layers.dense({units: 4, activation: 'elu'}),
			]
		});
		
		if (weights.length > 0) {
			let tempArr = [];
			if (Math.floor(Math.random() * 100) <= this.MutationChance) {
				tempArr[0] = weights[0].add(tf.scalar(Math.random() * this.MutationRate));
				tempArr[1] = weights[1].add(tf.scalar(Math.random() * this.MutationRate));
			} else {
				tempArr[0] = weights[0];
				tempArr[1] = weights[1];
			}

			this.model.getLayer(null, 1).setWeights(tempArr);

			if (Math.floor(Math.random() * 100) <= this.MutationChance) {
				tempArr[0] = weights[2].add(tf.scalar(Math.random() * this.MutationRate));
				tempArr[1] = weights[3].add(tf.scalar(Math.random() * this.MutationRate));
			} else {
				tempArr[0] = weights[2];
				tempArr[1] = weights[3];
			}

			this.model.getLayer(null, 2).setWeights(tempArr);

			if (Math.floor(Math.random() * 100) <= this.MutationChance) {
				tempArr[0] = weights[4].add(tf.scalar(Math.random() * this.MutationRate));
				tempArr[1] = weights[5].add(tf.scalar(Math.random() * this.MutationRate));
			} else {
				tempArr[0] = weights[4];
				tempArr[1] = weights[5];
			}

			this.model.getLayer(null, 3).setWeights(tempArr);

			if (Math.floor(Math.random() * 100) <= this.MutationChance) {
				tempArr[0] = weights[6].add(tf.scalar(Math.random() * this.MutationRate));
				tempArr[1] = weights[7].add(tf.scalar(Math.random() * this.MutationRate));
			} else {
				tempArr[0] = weights[6];
				tempArr[1] = weights[7];
			}

			this.model.getLayer(null, 4).setWeights(tempArr);
		}
	}

	calculateDeathMag() {
		this.finalDistance= p5.Vector.dist(this.pos, this.startingPos);
	}

	drawShip() {
		fill(this.fill);
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
		if (this.vel.mag() < 0.01) this.stillCount++;
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
					this.fill='#f00';
					break;
				case 1:
					this.turnShipLeft();
					this.fill='#0f0';
					break;
				case 2:
					this.turnShipRight();
					this.fill='#00f';
					break;
				case 3:
					this.fill='#fff';
					break;
			}
		}
	}
}
