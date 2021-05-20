class Fleet {
	constructor(count = 1, boundaryManager, weights = []) {
		this.count = count;
		this.fleetList = [];
		this.deadList = [];
		this.boundaryManager = boundaryManager;

		this.weights = weights

		this.canRespawn = false;

		this.populateFleet();

	}

	populateFleet() {
		for (let i = 0; i < this.count; i++) {
			this.fleetList.push(new Ship(createVector(24, 24), 9, this.weights));
		}
	}

	handleDraw() {
		let inputs = this.prepareInputs();
		let control = [];
		for (let i = 0; i < inputs.length; i++) {
			let a = tf.tensor(inputs[i], [1, 15]);
			let pred = this.fleetList[i].model.predict(a);
			pred = pred.dataSync()
			control.push(pred.indexOf(Math.max(...pred)));

		}

		if (this.fleetList.length == 0) {
			let a = this.deadList[this.count - 1].model.getLayer(null, 1).getWeights();
			let b = this.deadList[this.count - 2].model.getLayer(null, 1).getWeights();

			//let weights0 = a[0].add(b[0]).div(tf.scalar(2));
			//let weights1 = a[1].add(b[1]).div(tf.scalar(2));

			this.weights[0] = (a[0]);
			this.weights[1] = (a[1]);

			a = this.deadList[this.count - 1].model.getLayer(null, 2).getWeights();
			b = this.deadList[this.count - 2].model.getLayer(null, 2).getWeights();

			//weights0 = a[0].add(b[0]).div(tf.scalar(2));
			//weights1 = a[1].add(b[1]).div(tf.scalar(2));

			this.weights[2] = (a[0]);
			this.weights[3] = (a[1]);

			this.canRespawn = true;
		}

			

		
		for (let i = 0; i < this.fleetList.length; i++) {
			this.fleetList[i].drawShip();
			this.fleetList[i].updateShipPos();
			this.fleetList[i].handleInput(control[i]);
		}

		for (let i = 0; i < this.fleetList.length; i++) {
			if (!this.boundaryManager.isSafe(this.fleetList[i])) {
					this.deadList.push(this.fleetList[i]);
					this.fleetList.splice(i, 1);
			}
		}
	}
		

	prepareInputs() {
		let inputs = [];
		for (let i = 0; i < this.fleetList.length; i++) {	
			let temp = [];
			// angle of ship
			temp[0] = this.fleetList[i].angle / (2 * PI);

			// velocity of ship
			temp[1] = this.fleetList[i].vel.x / this.fleetList[i].topSpeed
			temp[2] = this.fleetList[i].vel.y / this.fleetList[i].topSpeed

			// points of ship
			let points = this.boundaryManager.getNormalizedDistance(this.fleetList[i]);

			for (const point in points) {
				temp.push(points[point]);
			}
			inputs.push(temp);

		}

		// here we should have the inputs ready for NN
		return inputs;
	}
}
