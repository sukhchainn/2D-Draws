var canvas = document.getElementById("canvas");
var size = 5, redraw=true, width = window.innerWidth - 460, height = window.innerHeight - 75;
var canvasX1 = canvas.offsetLeft, canvasY1 = canvas.offsetTop, canvasX2 = canvasX1+width, canvasY2 = canvasY1+height;
var pixels = new Array(), pixelRow=0;
var colors = ['white', 'black'], colorSelected = 1;

let sketch = function(p) {
	var x=0, y=0;
	p.setup = () => {
		p5.disableFriendlyErrors = true;
		p.createCanvas(width, height);
		p.background("#FFFFFF");	//#f5f5f6
		p.strokeWeight(0.2);

		pixels.push(new Array());
		while (y < height) {
			pixels[pixelRow].push(new PixelRec(p, x, y, size, false));
			if (x > width) {
				x=0;
				y+=size;
				pixels.push(new Array());
				pixelRow++;
			} else {
				x+=size;
			}
		}
		for (var i=0; i<pixels.length; i++) {
			for (var j=0; j<pixels[i].length; j++) {
				pixels[i][j].resize(size);
				pixels[i][j].draw();
			}
		}
		redraw = false;
	}

	p.draw = () => {
		if (redraw) {
			let a = (p.mouseX)/size;
			let b = (p.mouseY)/size;
			a = parseInt(a);
			b = parseInt(b);
			console.log(a+" yes "+b);
			pixels[b][a].draw();
			redraw = false;
		}
	}
	p.mouseClicked = () => {
		canvasClick();
  	}
	p.mouseWheel = (event) => {
		// print(event.delta);
		if (event.delta > 0 || size > 1)
		size += event.delta/2;
		console.log(size);
		// resize();
		//return false;
	}
	p.mouseMoved = () => {}
	p.mouseDragged = (event) => {
		// for (var i=0; i<pixels.length; i++) {
		// 	for (var j=0; j<pixels[i].length; j++) {
		// 		pixels[i][j].click();
		// 	}
		// }
		canvasClick();
	}
	p.mousePressed = () => {}
	p.mouseReleased = () => {}
	p.doubleClicked = () => {}
	p.keyTyped = () => {
		switch(p.key) {
			case 'z':
				colorSelected = 0;
				break;
			case 'x':
				colorSelected = 1;
				break;
		}
		console.log(p.key, colorSelected);
		return false;
	}
	p.requestPointerLock = () => {}
	p.exitPointerLock = () => {}

	canvasClick = () => {
		if (event.x > canvasX1 && event.y > canvasY1
			 && event.x < canvasX2 && event.y < canvasY2) {
				let a = (p.mouseX)/size;
				let b = (p.mouseY)/size;
				a = parseInt(a);
				b = parseInt(b);
				pixels[b][a].click(colors[colorSelected]);
				redraw = true;
			}
	}
	resize = () => {
		// resize the canvas according to the zoom level

		// draw the resized canvas
		for (var i=0; i<pixels.length; i++) {
			for (var j=0; j<pixels[i].length; j++) {
				pixels[i][j].resize(size);
				pixels[i][j].draw();
			}
		}
		redraw = false;
	}
};

new p5(sketch, 'canvas');