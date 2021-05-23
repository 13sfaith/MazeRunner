class Fleet {
	constructor(count = 1, boundaryManager, weights = []) {
		this.count = count;
		this.fleetList = [];
		this.deadList = [];
		this.boundaryManager = boundaryManager;

		this.target = boundaryManager.getTargetVector();

		this.weights = weights;
		this.maxLife = 10;

		this.greatestDistance = 0;

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
			let a = tf.tensor(inputs[i], [1, 16]);
			let pred = this.fleetList[i].model.predict(a);
			pred = pred.dataSync()
			control.push(pred.indexOf(Math.max(...pred)));
			//if (i == 0) console.log(pred);

		}

		if (this.fleetList.length == 0) {
			this.deadList.sort( (a, b) => { return a.finalDistance > b.finalDistance });
			if (this.greatestDistance < this.deadList[this.deadList.length - 1].finalDistance) this.greatestDistance = this.deadList[this.deadList.length - 1].finalDistance;
			let rh = new RepopulationHandler();
			this.weights = rh.getNewWeights(this.deadList);
			/*
			let modelA = this.deadList[this.count - 1];
			let modelB = this.deadList[this.count - 2];

			let a = modelA.model.getLayer(null, 1).getWeights();
			let b = modelB.model.getLayer(null, 1).getWeights();

			//let weights0 = a[0].add(b[0]).div(tf.scalar(2));
			//let weights1 = a[1].add(b[1]).div(tf.scalar(2));

			this.weights[0] = (a[0]);
			this.weights[1] = (a[1]);

			a = modelA.model.getLayer(null, 2).getWeights();
			b = modelB.model.getLayer(null, 2).getWeights();

			this.weights[2] = (b[0]);
			this.weights[3] = (b[1]);

			a = modelA.model.getLayer(null, 3).getWeights();
			b = modelB.model.getLayer(null, 3).getWeights();

			this.weights[4] = (a[0]);
			this.weights[5] = (a[1]);

			a = modelA.model.getLayer(null, 4).getWeights();
			b = modelB.model.getLayer(null, 4).getWeights();

			this.weights[6] = (b[0]);
			this.weights[7] = (b[1]);
			*/

			this.canRespawn = true;
		}

			

		
		for (let i = 0; i < this.fleetList.length; i++) {
			this.fleetList[i].drawShip();
			this.fleetList[i].updateShipPos();
			this.fleetList[i].handleInput(control[i]);
			this.fleetList[i].handleCellCount(this.boundaryManager.getCurCell(this.fleetList[i].pos));
		}

		for (let i = 0; i < this.fleetList.length; i++) {
			if (!this.boundaryManager.isSafe(this.fleetList[i]) || this.fleetList[i].stillCount > this.maxLife) {
				this.fleetList[i].calculateDeathMag(this.target);
				this.deadList.push(this.fleetList[i]);
				this.fleetList.splice(i, 1);
			}
		}
	}
		

	prepareInputs() {
		let inputs = [];
		for (let i = 0; i < this.fleetList.length; i++) {	
			let temp = [];
			temp[0] = this.fleetList[i].stillCount / this.maxLife;

			// angle of ship
			temp[1] = this.fleetList[i].angle / (2 * PI);

			// velocity of ship
			temp[2] = this.fleetList[i].vel.x / this.fleetList[i].topSpeed
			temp[3] = this.fleetList[i].vel.y / this.fleetList[i].topSpeed

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
