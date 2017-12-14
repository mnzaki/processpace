export default p => {
  let absDelta = 10, delta = 10;

  p.live.$setDefaults({
    x: 10,
    y: 10
  });

  p.setup = () => {
    p.createLiveCanvas(700, 400);
    p.noStroke();
  };

  p.draw = () => {
    p.background(100, 100, 10, 20);
    p.ellipse(p.live.x, p.mouseY, 10, 7);
    p.ellipse(p.live.x, p.live.y*p.random(40), 10, 70);
    p.ellipse(p.width-p.live.x*p.random(2), p.live.y, 30, 70);
    if (p.live.x > p.mouseX) {
      p.live.x -= absDelta;
    } else {
      p.live.x += absDelta;
    }
    p.fill(p.random(255),
      p.map(0, p.height, 0, 255, p.mouseY),
      p.map(0, p.width, 0, 255, p.mouseX),
      100
    );
    if (p.live.x > p.width) delta = -absDelta;
    if (p.live.x < 0) delta = absDelta;
  }
};
