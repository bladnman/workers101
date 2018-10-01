class BaseWorker extends BaseClass {
  constructor(properties={name:'worker'}) {
    super(properties);
    this.startProperties = properties;
    this.init();
  }
  init() {
    this.log('a star worker is born');
  }
}