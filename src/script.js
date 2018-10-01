function main() {
  new Kitten({name:'kitten'});
}
window.onload = main;

// =====================================
class Kitten extends window.BaseClass {
  constructor(properties={}) {
    super(properties);
    
    // your code here
    this.log('i am here world');
    this.log('and I am roar');
    this.log('M E O W');
    
  }
}