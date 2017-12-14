import p5 from 'p5';

export default function p5Constructor(opts) {
  this.live = Object.create({
    $setDefaults: function(defs) {
      Object.keys(defs).forEach(p => {
        this[p] = this[p] === undefined ? defs[p] : this[p];
      });
    }
  }, opts.liveData || {});

  this.remove = () => {
    // save last frame
    this.live._canvas =
      this.canvas
      .getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height);
    p5.remove.call(this);
  };

  return p5.call(this, opts.sketch, opts.container);
}

p5Constructor.prototype = p5.prototype;

p5.prototype.createLiveCanvas = function(width, height, opt) {
  const canvas = this.createCanvas(width, height, opt).canvas;
  // draw last frame
  if (this.live._canvas) {
    canvas.getContext('2d').putImageData(this.live._canvas, 0, 0);
  }
};