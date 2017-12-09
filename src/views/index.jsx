import ProcessingCanvas from './ProcessingCanvas';

import main from 'file-loader!../sketches/main.pde'

export const AppView = () =>
  <ProcessingCanvas sources={[main]}></ProcessingCanvas>;
