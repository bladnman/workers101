let testWorker;
function main() {
  testWorker = new Test1();
}
function stopClicked() {
  testWorker.stop();
}
function startClicked() {
  testWorker.start();
}
function resetClicked() {
  testWorker.reset();
}
window.onload = main;

// =====================================
class Test1 extends window.BaseClass {
  constructor(properties={name:'Test1'}) {
    super(properties);
    
    this.worker;
    this._lastWorkerRef;

    this.initWorker();

  }
  initWorker() {
    this.worker = new Worker('./src/worker-counter.js');
    this.worker.onmessage = this.handleMessage.bind(this);
  }
  start() {
    this.worker.postMessage({action :'start'});
  }
  stop() {
    this.worker.postMessage({action :'stop'});
  }
  reset() {
    this.worker.postMessage({action :'reset'});
  }
  handleMessage(ev) {
    let payload           = ev.data;
    this._lastWorkerRef   = payload.ref;

    this.log(payload.count);
    if (payload.count >= 100) {
      this.log('stopping at 50');
      this.stop();
    }

    else if (payload.count === 5) {
      this.log('setting delay to 200ms');
      this.worker.postMessage({action :'setDelayMs', value:200});
    }

    else if (payload.count % 5 === 0) {
      let newDelay = Math.max(10, this._lastWorkerRef.delayMs - 10);

      if (newDelay !== this._lastWorkerRef.delayMs) {
        this.log(`setting delay to ${newDelay}ms`);
        this.worker.postMessage({action :'setDelayMs', value:newDelay});        
      }

    }
  }
}