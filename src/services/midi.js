import S from 's-js';

export default {
  controls: {},

  init() {
    if (this.midiAccess) return;

    /*
    navigator.requestMIDIAccess().then(_midiAccess => {
      this.midiAccess = _midiAccess;
      for (let inp of this.midiAccess.inputs.values()) {
        inp.onmidimessage = this.handleEvent.bind(this);
        console.log(inp);
      }
    });
    */
  },

  handleEvent(evt) {
    console.log('midi message', evt.data);
    if (this._capture) {
      this._capture(evt);
      this._capture = null;
    }

    if (evt.data[0] == 191) {
      // control messsage
      const control = this.controls[evt.data[1]];
      if (control) {
        control.data(evt.data[2]);
      }
    }
  },

  // wait for next midi message and return a control
  // object with a 'data' property (S.data())
  // representing the  value of that control
  captureControl() {
    return new Promise((resolve, reject) => {
      this._capture = evt => {
        let control = this.controls[evt.data[1]];
        if (!control) {
          control = this.controls[evt.data[1]] = {
            title: evt.data[1],
            data: S.data()
          };
        }
        resolve(control);
      }
    });
  }
}
