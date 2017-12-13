import S from 's-js';
import * as Surplus from 'surplus';
import p5 from 'p5';

function p5WithLiveData(liveData, sketch, elem) {
  this.live = liveData;
  return p5.call(this, sketch, elem);
}
p5WithLiveData.prototype = p5.prototype;

p5.prototype.createLiveCanvas = function(width, height, opt) {
  const canvas = this.createCanvas(width, height, opt).canvas;
  // draw last frame
  if (this.live._canvas) {
    canvas.getContext('2d').putImageData(this.live._canvas, 0, 0);
  }
};

export const P5Canvas = props => {
  if (!props.id || !props.sketch) throw new Error('need id and sketch!');
  let cont = <div/>,
    liveData = {
      setDefaults: defs => {
        Object.keys(defs).forEach(p => {
          liveData[p] = liveData[p] === undefined ? defs[p] : liveData[p];
        });
      }
    };
  S(() => {
    let inst = new p5WithLiveData(liveData, props.sketch(), cont);
    S.cleanup(final => {
      // save last frame
      const canvas = cont.querySelector('canvas');
      liveData._canvas =
        canvas
          .getContext('2d')
          .getImageData(0, 0, canvas.width, canvas.height);
      inst.remove();
    });
  });
  return cont;
}
