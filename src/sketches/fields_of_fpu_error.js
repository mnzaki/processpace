
const DELTA_WASD = 5

export default p => {
  //event listener
  window.addEventListener("keydown", onKeyDown, false);
  window.addEventListener("keyup", onKeyUp, false);

  function onKeyDown(event) {
    let keyCode = event.keyCode;
    let delta = DELTA_WASD
    if (event.shiftKey) delta *= 10
    let muldelta = delta * 0.001
    switch (keyCode) {
      case 68: //d
        p.live.objx += delta
        break;
      case 83: //s
        p.live.objy += delta
        break;
      case 65: //a
        p.live.objx -= delta
        break;
      case 87: //w
        p.live.objy -= delta
        break;

      case 76: //l
        p.live.mul += muldelta
        break;
      case 75: //k
        p.live.mulpow -= muldelta
        break;
      case 74: //j
        p.live.mul -= muldelta
        break;
      case 73: //i
        p.live.mulpow += muldelta
        break;
    }
    p.updateSliders()
  }

  function onKeyUp(event) {
    var keyCode = event.keyCode;

    switch (keyCode) {
      case 68: //d
        break;
      case 83: //s
        break;
      case 65: //a
        break;
      case 87: //w
        break;
    }
  }

  let absDelta = 10, delta = 10;

  p.live.$setDefaults({
    x: 10,
    y: 10,
    mul: 0.08,
    mulpow: 1,
    pow: 2,
    objx: 0,
    objy: 0,
  });

  p.live.$sliders = {
    mul: { step: 0.001, max: 5 },
    mulpow: { step: 0.001, max: 3 },
    pow: { step: 0.1, max: 10 }
  };

  let img;
  p.setup = () => {
    p.createLiveCanvas(500, 500);
    img = p.createImage(p.width, p.height);
    p.noStroke();
    p.live.x = -p.width/2;
    p.live.y = -p.height/2;
  };

  var ts = p.millis();
  p.draw = () => {
    //p.background(0, 0, 0, 1);
    //p.ellipse(p.live.x, p.mouseY, 10, 7);
    //p.ellipse(p.live.x, p.live.y*p.random(40), 10, 70);
    //p.ellipse(p.width-p.live.x*p.random(2), p.live.y - p.mouseY + p.height, 30, 70);
    //if (p.live.x > p.mouseX) {
    //  p.live.x -= absDelta;
    //} else {
    //  p.live.x += absDelta;
    //}
    //p.fill(p.random(255),
    //  p.map(0, p.height, 0, 255, p.mouseY),
    //  p.map(0, p.width, 0, 255, p.mouseX),
    //  100
    //);
    //if (p.live.x > p.width) delta = -absDelta;
    //if (p.live.x < 0) delta = absDelta;

    img.loadPixels();

    const delta = (p.millis() - ts)/100000000;
    ts = p.millis()
    let mouseX = p.mouseX - p.width/2;
    let mouseY = p.mouseY - p.height/2;
    if (mouseX < p.width/2) {
      const dx = delta * mouseX ;
      p.live.x += dx;
    }
    if (mouseY < p.height/2) {
      const dy = delta * mouseY;
      p.live.y += dy;
    }
    for (let i = 0; i < p.width; i++) {
      for (let j = 0; j < p.height; j++) {
        const val = getValue(p.live.x+i+p.live.objx, p.live.y+j+p.live.objy, p.live.mul, p.live.mulpow, p.live.pow) * 255;
        const index = (i + j * p.width) * 4;

        img.pixels[index] = val;
        img.pixels[index+1] = val;
        img.pixels[index+2] = val;
        img.pixels[index+3] = 255;
      }
    }

    img.updatePixels();
    p.image(img, 0, 0);

  }

	function getValue(i, j, mul, mulpow, pow) {
		let a;
    mul = Math.pow(mul,Math.pow(mulpow, mulpow))
		i *= mul;
		j *= mul;
		a = mul*mul*(i * i + j * j);
    a = Math.pow(a, 1/mulpow);
		a -= Math.floor(a);
		a = Math.max(a, 1.0 - a);
		return Math.pow(a, pow);
	}


};

