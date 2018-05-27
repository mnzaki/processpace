
export default p => {
  let absDelta = 10, delta = 10;

  p.live.$setDefaults({
    x: 10,
    y: 10,
    mul: 0.08,
    mulpow: 1,
    pow: 2
  });

  p.live.$sliders = {
    mul: { step: 0.001, max: 5 },
    mulpow: { step: 0.001, max: 20 },
    pow: { step: 0.1, max: 10 }
  };

  let img;
  p.setup = () => {
    p.createLiveCanvas(500, 500);
    img = p.createImage(p.width, p.height);
    p.noStroke();
  };

  p.live.x = 0;
  p.live.y = 0;

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
    const dx = delta * (p.mouseX - p.width/2),
          dy = delta * (p.mouseY - p.height/2);
    p.live.x += dx;
    p.live.y += dy;
    for (let i = 0; i < p.width; i++) {
      for (let j = 0; j < p.height; j++) {
        const val = getValue(p.live.x+i, p.live.y+j, Math.pow(p.live.mul,Math.pow(p.live.mulpow, p.live.mulpow)), p.live.pow) * 255;
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

	function getValue(i, j, mul, pow) {
		let a;
		i *= mul;
		j *= mul;
		a = mul*mul*(i * i + j * j);
    //a = Math.sqrt(a);
		a -= Math.floor(a);
		a = Math.max(a, 1.0 - a);
		return Math.pow(a, pow);
	}


};
