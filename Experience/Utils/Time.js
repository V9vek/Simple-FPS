import * as THREE from "three" 
import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super();

    // Setup
    this.start = Date.now(); // when Experience started
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 6;
    this.clock = new THREE.Clock()

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current; // time elapsed between the current and the previous frame
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
