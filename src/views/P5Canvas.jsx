import S from 's-js';
import SArray from 's-array';
import * as Surplus from 'surplus';
import data from 'surplus-mixin-data';
import p5 from 'services/p5';

const RangeControl = props => {
  return <div>
    {props.value()}
    <input type="range" {...data(props.value)} min={props.min} max={props.max} />
  </div>;
};

export const P5Canvas = props => {
  if (!props.id || !props.sketch) throw new Error('need id and sketch!');

  let p5Cont, controlKeys = SArray([]), controls = {};

  const elem =
    <div>
      <div ref={p5Cont}></div>
      {controlKeys.map(k => {
        return <div>
          {k} <RangeControl value={controls[k]} />
        </div>;
        })
      }
    </div>;

  // opts are reused accross instances to maintain live data
  const opts = { container: p5Cont };

  S(() => {
    opts.sketch = props.sketch();
    let inst = new p5(opts);
    S.cleanup(final => inst.remove());

    Object.keys(inst.live).forEach(key => {
      if (typeof inst.live[key] == 'number') {
        controls[key] = controls[key] || S.data();
        controls[key](inst.live[key]);
        S(() => {
          try {
            inst.live[key] = parseInt(controls[key]());
          } catch (e) {
            console.error(e);
          }
        });
      }
    });
    controlKeys(Object.keys(controls));
  });

  return elem;
}
