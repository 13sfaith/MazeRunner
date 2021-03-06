class BoundaryManager {
	constructor(maze) {
		this.maze = maze;
	}

	isCompleted(ship) {
		let curCell = this.getCurCell(ship.pos);
		return curCell.isEnd;
	}

	isSafe(ship) {
		let points = ['left', 'right', 'top'];
		let padding = 3;

		for (let i = 0; i < points.length; i++) {
			let curCell = this.getCurCell(ship.points[points[i]]);
			
			if(curCell.walls.left){
					if (Math.abs(ship.points[points[i]].x - curCell.pos.left) < padding)
						return false;
			}
			if(curCell.walls.right){
					if (Math.abs(ship.points[points[i]].x - curCell.pos.right) < padding)
						return false;
			}
			if(curCell.walls.top){
					if (Math.abs(ship.points[points[i]].y - curCell.pos.top) < padding)
						return false;
			}
			if(curCell.walls.bottom){
					if (Math.abs(ship.points[points[i]].y - curCell.pos.bottom) < padding)
						return false;
			}
		}

		return true;
	}

	getNormalizedDistance(ship) {
		let points = ['left', 'right', 'top'];
		let padding = 3;
		let ret = [];

		for (let i = 0; i < points.length; i++) {
			let curCell = this.getCurCell(ship.points[points[i]]);
			
			if(curCell.walls.left){
				ret.push(Math.abs(ship.points[points[i]].x - curCell.pos.left) / (this.maze.size - padding));
			} else {
				ret.push(1);
			}

			if(curCell.walls.right){
				ret.push(Math.abs(ship.points[points[i]].x - curCell.pos.right) / (this.maze.size - padding));
			} else {
				ret.push(1);
			}

			if(curCell.walls.top){
				ret.push(Math.abs(ship.points[points[i]].y - curCell.pos.top) / (this.maze.size - padding));
			} else {
				ret.push(1);
			}

			if(curCell.walls.bottom){
				ret.push(Math.abs(ship.points[points[i]].y - curCell.pos.bottom) / (this.maze.size - padding));
			} else {
				ret.push(1);
			}
		}
		return ret;
		
	}

	getNormalizedCenterDistance(ship) {
		let padding = 3 + ship.size;
		let ret = [];

		let curCell = this.getCurCell(ship.pos);

		/* DISTANCE FROM END INPUT
		let endPos = createVector(0, 0);
		endPos.x = this.maze.cellList[this.maze.randomChoice].pos.left + (this.maze.size/2)
		endPos.y = this.maze.cellList[this.maze.randomChoice].pos.top + (this.maze.size/2)
		ret.push(ship.pos.dist(endPos) / this.maze.diagLen)
		*/
		
		if(curCell.walls.left){
			ret.push(Math.abs(ship.pos.x - curCell.pos.left) / (this.maze.size - padding));
		} else {
			ret.push(1);
		}

		if(curCell.walls.right){
			ret.push(Math.abs(ship.pos.x - curCell.pos.right) / (this.maze.size - padding));
		} else {
			ret.push(1);
		}

		if(curCell.walls.top){
			ret.push(Math.abs(ship.pos.y - curCell.pos.top) / (this.maze.size - padding));
		} else {
			ret.push(1);
		}

		if(curCell.walls.bottom){
			ret.push(Math.abs(ship.pos.y - curCell.pos.bottom) / (this.maze.size - padding));
		} else {
			ret.push(1);
		}

		return ret;
		
	}

	getCurCell(pos) {
		let x = Math.floor(pos.x / this.maze.size);
		let y = Math.floor(pos.y / this.maze.size);
		return this.maze.cellList[x + (y * this.maze.cols)];
	}

	getTargetVector() {
		let ret = createVector();
		ret.y = (this.maze.size * (Math.floor(Math.random() * this.rows))) - (this.maze.size / 2);
		ret.x = (this.maze.size * (Math.floor(Math.random() * this.cols))) - (this.maze.size / 2);
		return ret;
	}
		
}
