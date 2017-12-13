export default p => {
  p.live.setDefaults({
    x: 10,
    y: 10
  });

  p.setup = () => {
    p.createCanvas(500, 500);
    p.fill(30);
  };

  p.draw = () => {
    p.background(140);
    p.ellipse(p.live.x, p.live.y*20, 30, 70);
    p.ellipse(p.live.x, p.live.y*p.random(40), 30, 70);
    p.ellipse(p.live.x*4, p.live.y*20, 30, 70);
    p.live.x += 10;
    p.fill(p.random(255));
    if (p.live.x > p.width) p.live.x = 0;
  }
};
