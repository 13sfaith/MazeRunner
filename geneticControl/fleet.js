class Fleet {
	constructor(count = 1, boundaryManager, weights = []) {
		this.count = count;
		this.fleetList = [];
		this.deadList = [];
		this.completedList = [];
		this.boundaryManager = boundaryManager;

		this.target = boundaryManager.getTargetVector();

		this.weights = weights;
		this.maxLife = 20;

		this.greatestDistance = 0;

		this.canRespawn = false;

		this.populateFleet();

	}

	populateFleet() {
		for (let i = 0; i < this.count; i++) {
			this.fleetList.push(new Ship(createVector(24, 24), 9, this.weights));
		}
	}

	endGeneration() {
		let repopList = [];
		this.deadList.sort( (a, b) => { return a.finalDistance > b.finalDistance });
		//this.deadList.sort( (a, b) => { return a.cellList.length > b.cellList.length });
		for (let i = 0; i < this.completedList.length; i++) {
			if (repopList.length == 2) break;
			else repopList.push(this.completedList[i]);
		}
		for (let i = this.deadList.length - 1; i != 0; i--) {
			if (repopList.length == 2) break;
			else repopList.push(this.deadList[i]);
		}

		let rh = new RepopulationHandler();
		this.weights = rh.getNewWeights(repopList);

		this.canRespawn = true;

	}

	handleDraw() {
		let inputs = this.prepareInputs();
		let control = [];
		for (let i = 0; i < inputs.length; i++) {
			//let a = tf.tensor(inputs[i], [1, 16]);
			let a = tf.tensor(inputs[i], [1, inputs[i].length]);
			let pred = this.fleetList[i].model.predict(a);
			pred = pred.dataSync()
			control.push(pred.indexOf(Math.max(...pred)));
			//if (i == 0) console.log(pred);

		}

		if (this.fleetList.length == 0) {
			this.endGeneration();
		}

		for (let i = 0; i < this.fleetList.length; i++) {
			this.fleetList[i].drawShip();
			this.fleetList[i].updateShipPos();
			this.fleetList[i].handleInput(control[i]);
			this.fleetList[i].handleCellCount(this.boundaryManager.getCurCell(this.fleetList[i].pos));
		}

		for (let i = 0; i < this.fleetList.length; i++) {
			if (this.boundaryManager.isCompleted(this.fleetList[i])) {
				this.completedList.push(this.fleetList[i]);
				this.fleetList.splice(i, 1);
				i--;
			}
			else if (!this.boundaryManager.isSafe(this.fleetList[i]) || this.fleetList[i].stillCount > this.maxLife) {
				this.fleetList[i].calculateDeathMag(this.target);
				this.deadList.push(this.fleetList[i]);
				this.fleetList.splice(i, 1);
				i--;
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
			//temp[1] = this.fleetList[i].vel.x / this.fleetList[i].topSpeed
			//temp[2] = this.fleetList[i].vel.y / this.fleetList[i].topSpeed

			// points of ship
			//let points = this.boundaryManager.getNormalizedDistance(this.fleetList[i]);
			let points = this.boundaryManager.getNormalizedCenterDistance(this.fleetList[i]);

			for (const point in points) {
				temp.push(points[point]);
			}
			inputs.push(temp);

		}

		// here we should have the inputs ready for NN
		return inputs;
	}
}
