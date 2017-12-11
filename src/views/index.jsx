import { ProcessingCanvas } from './ProcessingCanvas';

import S from 's-js';
import main from 'file-loader!sketches/main.pde'
import store from 'store';

if (!store.sources) {
  store.sources = S.data([]);
}

store.sources([main]);

if (module.hot) {
  module.hot.accept();
}

export let AppView = () =>
  <ProcessingCanvas id="main" sources={store.sources}>
  </ProcessingCanvas>;

