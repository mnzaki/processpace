import S from 's-js';
import * as Surplus from 'surplus';
import p5 from 'services/p5';

export const P5Canvas = props => {
  if (!props.id || !props.sketch) throw new Error('need id and sketch!');

  // opts are reused accross calls to maintain live data
  let cont = <div/>, opts = {
    sketch: props.sketch(),
    container: cont
  };

  S(() => {
    let inst = new p5(opts);
    S.cleanup(final => inst.remove());
  });
  return cont;
}
