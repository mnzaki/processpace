import { P5Canvas } from './P5Canvas.jsx';

import S from 's-js';
import * as Surplus from 'surplus';
import store from 'store';
import sketch1 from 'sketches/fields_of_fpu_error.js';

if (!store.sketch) {
  store.sketch = S.data();
}

if (module.hot) {
  module.hot.accept('sketches/fields_of_fpu_error.js', () => {
    store.sketch(sketch1);
  });
}

store.sketch(sketch1);

export const AppView = () => {
  return <P5Canvas id="main" sketch={store.sketch}></P5Canvas>;
};
