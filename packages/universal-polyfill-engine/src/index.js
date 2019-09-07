export default {
  engine: null,
  
  get() {
    return this.engine;
  },

  set(engine) {
    return (this.engine = engine);
  }
}