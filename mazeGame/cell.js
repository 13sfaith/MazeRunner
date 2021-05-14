class Cell {
	constructor (id) {
		this.isVisited = false;
		this.id = id;
		this.walls = {left: true, right: true, top: true, bottom: true}
	}
}
