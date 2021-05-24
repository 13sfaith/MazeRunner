class Ship {
	constructor(pos, size = 9, weights) {
		this.pos = pos;
		this.startingPos = createVector(pos.x, pos.y);
		this.finalDistance = createVector(0, 0);
		this.size = size;
		this.vel = createVector(0.0, 0.0); 
		//this.angle = Math.random() * (2 * PI);
		this.angle = (Math.random() * 3 * PI / 2) - (PI / 2);
		this.angle = PI;
		this.turnSpeed = 0.2;
		this.accel = 0.15;
		this.topSpeed = 2;
		this.drag = 0.89;
		this.stillCount = 0;
		this.points = { left: createVector(0, 0), right: createVector(0, 0), 
			top: createVector(0, 0), bottom: createVector(0, 0) };

		this.fill = '#fff';
		this.curCell = -1;
		this.cellList = [];
			
		this.MutationRate = .03;
		this.MutationChance = 1;
		this.model = tf.sequential({
			layers: [
				//tf.layers.dense({batchInputShape: [1, 16], units: 30, activation: 'elu'}),
				//tf.layers.dense({inputShape: [16], units: 12, activation: 'elu'}),
				tf.layers.dense({inputShape: [6], units: 20, activation: 'elu'}),
				tf.layers.dense({units: 20, activation: 'elu'}),
				tf.layers.dense({units: 3, activation: 'elu'}),
			]
		});

		if (weights.length > 0) {
			let w = 0;
			let tempArr = [];
			for (let i = 1; i < this.model.layers.length - 1; i++)
			{
				if (Math.floor(Math.random() * 100) <= this.MutationChance) {
					//tempArr[0] = weights[w].add(tf.scalar(Math.random() * this.MutationRate));
					tempArr[0] = weights[w].add(tf.truncatedNormal(weights[w].shape, 0, this.MutationRate));
					w++;
					tempArr[1] = weights[w].add(tf.truncatedNormal(weights[w].shape, 0, this.MutationRate));
					w++;
				} else {
					tempArr[0] = weights[w];
					w++;
					tempArr[1] = weights[w];
					w++;
				}

				this.model.getLayer(null, i).setWeights(tempArr)
			}
		}
			/*
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
			*/
	}

	calculateDeathMag(target) {
		this.finalDistance= p5.Vector.dist(this.pos, this.startingPos);
		//this.finalDistance= p5.Vector.dist(this.pos, target);
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

	handleCellCount(curCell) {
		if (curCell.id != this.curCell && !this.cellList.includes(curCell.id)) {
			this.cellList.push(curCell.id)
		}

	}
}
