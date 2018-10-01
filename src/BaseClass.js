class BaseClass {
  constructor(properties={}) {
    /**
     * PROPERTIES
     *   class - class name used for element
     */
    this.startProperties = properties;
    this.element;
    this.logElement;
    this.name        = properties.name;
    this.className   = properties.class || this.name || 'base';
    this.__init();
  } 
  __init() {
    let className     = this.class || this.name;
    this.element      = this._attachNewElement(this.className);
    this.logElement   = this._attachNewElement(['log-area', this.className + '__log-area']);
    
    // Name tag
    if (this.startProperties.name) {
      let nameTagElem        = this._getNewElement('name-tag');
      nameTagElem.innerHTML  = this.startProperties.name;
      this.logElement.append(nameTagElem);
    }
  }
  _attachNewElement(classnames) {
    let element = this._getNewElement(classnames);  
    document.body.appendChild(element);
    return element;
  }
    
  _getNewElement(classnames) {
    let element = document.createElement("div");  
    let classArray = Array.isArray(classnames) ? classnames : [classnames];
    for(let name of classArray) {
      element.classList.add(name);  
    }
    return element;
  }
  setText(text) {
    this.element.innerHTML = text;
    return this.element;
  }
  appendText(text) {
    this.element.append(document.createTextNode(text));
    return this.element;
  }
  log(text) {
    let div = document.createElement('div');
    div.append(document.createTextNode(text));    
    this.logElement.insertBefore(div, this.logElement.firstChild);   
    
    // go to std-out
    console.log(`${this.name ? '['+this.name+'] ' : ''}`, text);
    
    return this.logElement; 
  }
}
window.BaseClass = BaseClass;