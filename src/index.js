import './assets/styles/styles.scss';
import HelloWorld from './assets/js/hello-world';

require('html-loader!./templates/index.html');

let indexPage = new HelloWorld('Hello from index page!');
console.log(indexPage.sayHello());

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
