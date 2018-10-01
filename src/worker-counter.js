

class MyWorker {
  constructor(context) {
    this.counter            = 0;
    this.timer              = undefined;
    this.initialDelayMs     = 500;
    this.delayMs            = 500;
    this.start();
    context.addEventListener('message', this.handleMessage.bind(this), false);
  }
  start() {
    this.timer = setTimeout(this._timerFired.bind(this), this.delayMs);
  }
  stop() {
    if (!!this.timer) {
      clearTimeout(this.timer);      
    }
    this.timer = null;
  }
  reset() {
    this.counter = 0;
    this.delayMs = this.initialDelayMs;
  }
  sendMessage(data) {
    console.log('[Worker] --> sending', data);
    postMessage(data);
  }
  handleMessage(ev) {

    let payload = ev.data;
    
    console.log(payload, 'we heard from you');
    if (!payload || !payload.action) {
      console.log('incorrect message format', payload);
      return;
    }
    switch (payload.action) {
      case 'start':
        this.start();
        break;

      case 'stop':
        this.stop();
        break;

      case 'reset':
        this.reset();
        break;

      case 'setDelayMs':
        if ('value' in payload) {
          let wasRunning = !!this.timer;
          this.stop();
          this.delayMs = payload.value;
          if (wasRunning) {
            this.start();
          }
        }

        // incorrect message
        else {
          console.warn('must include a value to set delay');
        }
        break;
  
      default:
        break;
    }
  }

  /**
   * INTERNALS
   */
  _timerFired() {
    this.counter++;
    this.start();
    this.sendMessage({
      count : this.counter,
      ref : this,
    });
  }
}


const worker = new MyWorker(self);