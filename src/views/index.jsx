import { P5Canvas } from './P5Canvas.jsx';

import S from 's-js';
import * as Surplus from 'surplus';
import store from 'store';
import sketch1 from 'sketches/sketch1.js';

if (!store.sketch) {
  store.sketch = S.data();
}

store.sketch(sketch1);

if (module.hot) {
  module.hot.accept();
}

export const AppView = () => {
  return <P5Canvas id="main" sketch={store.sketch}></P5Canvas>;
};
