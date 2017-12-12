import S from 's-js';
import * as Surplus from 'surplus';
import p5 from 'p5';

function p5WithLiveData(liveData, sketch, elem) {
  this.live = liveData;
  return p5.call(this, sketch, elem);
}
p5WithLiveData.prototype = p5.prototype;

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
      inst.remove();
    });
  });
  return cont;
}
