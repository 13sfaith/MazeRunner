class Maze {
	constructor(rows, cols, size) {
		this.size = size ? size : 20;
		this.rows = rows;
		this.cols = cols;
		this.total = rows * cols;

		this.cellList = [];
		this.populateCellList();

		this.curCell = this.cellList[this.total - 1];
	}

	populateCellList() {
		for (let j = 0; j < this.rows; j++) {
			for (let k = 0; k < this.cols; k++) {
				this.cellList.push(new Cell(k + (j * this.cols)));
			}
		}
	}

	drawToScreen() {
		for (let j = 0; j < this.rows; j++)  {
			for (let k = 0; k < this.cols; k++) {
				let activeCell = this.cellList[(this.cols * j) + k];
				if (activeCell.walls.left)
					line(j * this.size, k * this.size, j * this.size, (k * this.size) + this.size);
				if (activeCell.walls.right)
					line((j * this.size) + this.size, k * this.size, (j * this.size) + this.size, (k * this.size) + this.size);
				if (activeCell.walls.top)
					line(j * this.size, k * this.size, (j * this.size) + this.size, k * this.size);
				if (activeCell.walls.bottom)
					line(j * this.size, (k * this.size) + this.size, (j * this.size) + this.size, (k * this.size) + this.size);
				
			}
		}
	}


	mazeGen() {
		let neighbors = findUnvisitedNeighbors();
		this.curCell.isVisited = true;

		if (Object.keys(neighbors).length == 0) return;

		let choice = Object.keys(neighbors)[Math.floor(Math.random() * Object.keys(neighbors).length)];

		switch(choice) {
			case 'left':
				neighbors[choice].walls.right = false;
				this.curCell = neigbors[choice]
				break;
			case 'right':
				neighbors[choice].walls.left = false;
				this.curCell = neigbors[choice]
				break;
			case 'top':
				neighbors[choice].walls.bottom = false;
				this.curCell = neigbors[choice]
				break;
			case 'bottom':
				neighbors[choice].walls.top = false;
				this.curCell = neigbors[choice]
				break;
		}
			
		mazeGen();

	}

	findUnvisitedNeighbors() {
		let index = this.curCell.id;
	}

}
