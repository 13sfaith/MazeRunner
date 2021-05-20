class Cell {
	constructor (id, pos) {
		this.isVisited = false;
		this.id = id;
		this.walls = {left: true, right: true, top: true, bottom: true}
		this.pos = pos;
	}
}
