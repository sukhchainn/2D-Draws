let sketch = function(p) {
	var pos = 1, draw=true;
	p.setup = () => {
		p.createCanvas(window.innerWidth - 460, window.innerHeight - 75);
		p.background("#FFFFFF");	//#f5f5f6
	}

	p.draw = () => {
		
	}
	p.mouseClicked = () => {
  		p.drawingContext.scale(2, 2);
  		console.log("mouseClicked");
	}
	p.mouseWheel = (event) => {
		// print(event.delta);
		if (event.delta > 0 || pos > 1)
		pos += event.delta;
		console.log(pos);
		//return false;
	}
	p.mouseMoved = () => {}
	p.mouseDragged = () => {}
	p.mousePressed = () => {}
	p.mouseReleased = () => {}
	p.doubleClicked = () => {}
	p.requestPointerLock = () => {}
	p.exitPointerLock = () => {}
};

new p5(sketch, 'canvas');