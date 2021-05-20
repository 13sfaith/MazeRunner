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
				this.cellList.push(new Cell((k + (j * this.cols)), 
					{left: k*this.size, right: (k+1)*this.size, top: j*this.size, bottom: (j+1)*this.size}));
			}
		}
	}

	drawToScreen() {
		for (let j = 0; j < this.rows; j++)  {
			for (let k = 0; k < this.cols; k++) {
				let activeCell = this.cellList[(this.cols * j) + k];
				if (activeCell.walls.left)
					line(k * this.size, j * this.size, k * this.size, (j+1) * this.size);
				if (activeCell.walls.right)
					line((k+1) * this.size, j * this.size, (k+1) * this.size, (j+1) * this.size);
				if (activeCell.walls.top)
					line((k) * this.size, j * this.size, (k+1) * this.size, (j) * this.size);
				if (activeCell.walls.bottom)
					line((k) * this.size, (j+1) * this.size, (k+1) * this.size, (j+1) * this.size);
				/*
				let activeCell = this.cellList[(this.rows * j) + k];
				if (activeCell.walls.left)
					line(j * this.size, k * this.size, j * this.size, (k * this.size) + this.size);
				if (activeCell.walls.right)
					line((j * this.size) + this.size, k * this.size, (j * this.size) + this.size, (k * this.size) + this.size);
				if (activeCell.walls.top)
					line(j * this.size, k * this.size, (j * this.size) + this.size, k * this.size);
				if (activeCell.walls.bottom)
					line(j * this.size, (k * this.size) + this.size, (j * this.size) + this.size, (k * this.size) + this.size);
				*/
				
			}
		}
		//rect(2 * this.size, 2 * this.size, this.size)
	}


	mazeGen(cell) {
		let neigbors = this.findUnvisitedNeigbors(cell);
		cell.isVisited = true;

		if (Object.keys(neigbors).length == 0) return;

		let choice = Object.keys(neigbors)[Math.floor(Math.random() * Object.keys(neigbors).length)];

		switch(choice) {
			case 'left':
				neigbors[choice].walls.right = false;
				cell.walls.left = false;
				this.mazeGen(neigbors[choice]);
				break;
			case 'right':
				neigbors[choice].walls.left = false;
				cell.walls.right = false;
				this.mazeGen(neigbors[choice]);
				break;
			case 'top':
				neigbors[choice].walls.bottom = false;
				cell.walls.top = false;
				this.mazeGen(neigbors[choice]);
				break;
			case 'bottom':
				neigbors[choice].walls.top = false;
				cell.walls.bottom = false;
				this.mazeGen(neigbors[choice]);
				break;
		}
			
		this.mazeGen(cell);

	}

	findUnvisitedNeigbors(cell) {
		let index = cell.id;

		let neigbors = {};

		let tempCell = this.getRightCell(index);
		if (tempCell && !tempCell.isVisited)
			neigbors['right'] = (tempCell);
		tempCell = this.getLeftCell(index);
		if (tempCell && !tempCell.isVisited)
			neigbors['left'] = (tempCell);
		tempCell = this.getTopCell(index);
		if (tempCell && !tempCell.isVisited)
			neigbors['top'] = (tempCell);
		tempCell = this.getBottomCell(index);
		if (tempCell && !tempCell.isVisited)
			neigbors['bottom'] = (tempCell);
			
		return neigbors;
	}

	getRightCell(index) {
		index++;
		return index % this.cols == 0 ? null : this.cellList[index];
	}
	getLeftCell(index) {
		index--;
		return index % this.cols == this.cols - 1 ? null : this.cellList[index];
	}
	getTopCell(index) {
		index -= this.cols;
		return index < 0 ? null : this.cellList[index];
	}
	getBottomCell(index) {
		index += this.cols;
		return index >= this.total ? null : this.cellList[index];
	}

}
