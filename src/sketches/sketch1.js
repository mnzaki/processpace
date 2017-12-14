export default p => {
  let delta = 10;

  p.live.$setDefaults({
    x: 10,
    y: 10
  });

  p.setup = () => {
    p.createLiveCanvas(700, 400);
    p.fill(30);
  };

  p.draw = () => {
    p.background(150, 100, 10, 20);
    p.ellipse(p.live.x, p.live.y, 10, 7);
    p.ellipse(p.live.x, p.live.y*p.random(40), 10, 70);
    p.ellipse(p.live.x*4, p.live.y, 30, 70);
    p.live.x += delta;
    p.fill(p.random(255), 100, 100);
    if (p.live.x > p.width) delta = -p.abs(delta);
    if (p.live.x < 0) delta = p.abs(delta);
  }
};
