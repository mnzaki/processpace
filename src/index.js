import './assets/styles/styles.scss';
require('html-loader!./templates/index.html');
import S from 's-js';

import { AppView } from './views';

S.root(() => {
  const/* model = ToDosModel([]),
          ctrl = ToDosCtrl(model),
          router = ToDosRouter(ctrl),
          storage = LocalStoragePersistence(model),*/
  view = AppView(/*ctrl*/);

  document.body.appendChild(view);
});
