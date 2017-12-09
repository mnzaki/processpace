import * as Surplus from 'surplus';

import processingSrc from 'file-loader!processing-js/processing.js'

export default props => {
  let canvas,
    view =
      <div>
        <canvas ref={canvas}></canvas>
        <script onLoad={() => Processing.reload()} src={processingSrc}></script>
      </div>;

  canvas.setAttribute('data-processing-sources', props.sources.join(' '));
  return view;
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
