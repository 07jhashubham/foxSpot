import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super();
    this.currentTime = Date.now();
    this.start = this.currentTime;
    this.elappsedTime = 0;
    this.delta = 16;
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
  tick() {
    const now = Date.now();
    this.delta = now - this.currentTime;
    this.currentTime = now;
    this.elappsedTime = this.currentTime - this.start;
    this.trigger("tick");
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
