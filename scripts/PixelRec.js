class PixelRec {
	 // x, y, size, color;
	 constructor(p, x, y, size) {
	 	this.p = p;
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = 'white';
		this.borderColor = 'grey';
	} 
	// constructor(x, y, size) {
	// 	this.x = x;
	// 	this.y = y;
	// 	this.size = size;
	// 	this.color = 'white';
	// } constructor(x, y, size, color) {
	// 	this.x = x;
	// 	this.y = y;
	// 	this.size = size;
	// 	this.color = color;
	// }

	click() {
		if (this.p.mouseX > this.x && this.p.mouseX < this.x+this.size && this.p.mouseY > this.y && this.p.mouseY < this.y+this.size)
			this.color = 'black';
		// for (var i=0; i<pixels.length; i++) {
		// 	for (var j=0; j<pixels[i].length; j++) {
		// 		console.log("coordinated :"+pixels[i][j].y+" "+pixels[i][j].x);
		// 	}
		// }
	}

	draw() {
		this.p.stroke(this.borderColor);
		this.p.fill(this.color);
		this.p.rect(this.x, this.y, this.size, this.size);
	}
}