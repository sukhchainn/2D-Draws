

var x=0, y=0;
let sketch = function(p) {
	var canvas = document.getElementById("canvas");
	var size = 10, redraw=true, width = window.innerWidth - 460, height = window.innerHeight - 75;
	var canvasX1 = canvas.offsetLeft, canvasY1 = canvas.offsetTop, canvasX2 = canvasX1+width, canvasY2 = canvasY1+height;
	var pixels = new Array(), pixelRow=0;
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
			pixels[b][a].draw();
			redraw = false;
		}
	}
	p.mouseClicked = () => {
		if (event.x > canvasX1 && event.y > canvasY1
		 && event.x < canvasX2 && event.y < canvasY2) {
			let a = (p.mouseX)/size;
			let b = (p.mouseY)/size;
			a = parseInt(a);
			b = parseInt(b);
			pixels[b][a].click();
			redraw = true;
		}
  	}
	p.mouseWheel = (event) => {
		// print(event.delta);
		if (event.delta > 0 || size > 1)
		size += event.delta/2;
		console.log(size);
		//return false;
	}
	p.mouseMoved = () => {}
	p.mouseDragged = (event) => {
		// for (var i=0; i<pixels.length; i++) {
		// 	for (var j=0; j<pixels[i].length; j++) {
		// 		pixels[i][j].click();
		// 	}
		// }
		if (event.x > canvasX1 && event.y > canvasY1
		 && event.x < canvasX2 && event.y < canvasY2) {
			let a = (p.mouseX)/size;
			let b = (p.mouseY)/size;
			a = parseInt(a);
			b = parseInt(b);
			pixels[b][a].click();
			redraw = true;
		}
	}
	p.mousePressed = () => {}
	p.mouseReleased = () => {}
	p.doubleClicked = () => {}
	p.requestPointerLock = () => {}
	p.exitPointerLock = () => {}
};

new p5(sketch, 'canvas');