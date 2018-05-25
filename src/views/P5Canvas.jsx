import S from 's-js';
import SArray from 's-array';
import * as Surplus from 'surplus';
import data from 'surplus-mixin-data';
import p5 from 'services/p5';
import midi from 'services/midi';

window.S = S;
const RangeControl = props => {
  return <div>
    <p>{props.value()}</p>
    <input type="range" {...data(props.value, 'input')} step={props.step} min={props.min} max={props.max} />
  </div>;
};

export const P5Canvas = props => {
  if (!props.id || !props.sketch) throw new Error('need id and sketch!');

  let p5Cont, controlKeys = SArray([]), controls = {};

  const elem =
    <div>
      <div ref={p5Cont}></div>
      {controlKeys.map(k => {
        return <div style="float: left">
          {controls[k].title} <RangeControl step={controls[k].step} min={controls[k].min} max={controls[k].max} value={controls[k].data} />
          <button onClick={bindMidiControl(k)}>midi input</button>
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

    if (inst.live.$sliders) {
      Object.keys(inst.live.$sliders).forEach(key => {
        if (typeof inst.live[key] == 'number') {
          controls[key] = controls[key] || { title: key, data: S.data() };
          const slider = inst.live.$sliders[key];
          if (slider) {
            Object.assign(controls[key], slider);
          }
          controls[key].data(inst.live[key]);
          S(() => {
            try {
              inst.live[key] = parseFloat(controls[key].data());
            } catch (e) {
              console.error(e);
            }
          });
        }
      });
      controlKeys(Object.keys(controls));
    }
  });

  return elem;

  function bindMidiControl(targetKey) {
    return () => {
      const control = controls[targetKey];
      if (control.unbindMidiControl) {
        control.unbindMidiControl();
      }

      // TODO show UI indication of 'capture mode'

      midi.captureControl().then(midiControl => {
        const idx = controlKeys().indexOf(targetKey),
          newKey = `${targetKey}_midi`,
          newControl = {
            title: `${control.title} (midi ${midiControl.title})`,
            data: control.data,
            unbindMidiControl: () => {
              delete controls[newKey];
              controlKeys.splice(idx, 1, targetKey);
            }
          };

        controls[newKey] = newControl;
        controlKeys.splice(idx, 1, newKey);

        S.root(dispose => {
          control._dispose = dispose;
          console.log('root computation evaled');
          S(() => control.data(midiControl.data()))
        });
      });
    }
  };
}
