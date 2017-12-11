import S from 's-js';
import * as Surplus from 'surplus';

import processingSrc from 'file-loader!processing-js/processing.js'

export const ProcessingCanvas = props => {
  if (!props.id) throw new Error('need id!');

  let canvas,
    view =
      <div>
        <canvas id={props.id} ref={canvas}></canvas>
        <script onLoad={onScriptLoad} src={processingSrc}></script>
      </div>;

  return view;

  function onScriptLoad() {
    S(() => {
      let sources = props.sources();
      if (typeof Processing == 'undefined') return;

      Processing.loadSketchFromSources(canvas, sources, pInst => {
        pInst.live = props.liveData || {};
      });
    });
  }
}

/*
  processing.addEventListener('load', () => {
    // set up processing sources
    const canvas = document.getElementById('playground')

    // processing instance

    canvas.addEventListener('keydown', (e)=>{
      if(e.keyCode == 8){
        e.preventDefault();
        const pInstance = Processing.getInstanceById('playground')
        pInstance.key = new Char(pInstance.CODED)
        pInstance.keyCode = new Char(pInstance.DELETE)
        pInstance.keyPressed()
      }
    })

    // reload Processing to catch changes
    Processing.reload()
  })
*/
