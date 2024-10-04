import Experience from "../Experience";

export default class InputController {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;

    //
    this.current = {
      leftButton: false,
      rightButton: false,
      mouseX: 0,
      mouseY: 0,
      mouseXDelta: 0,
      mouseYDelta: 0,
    };
    this.previous = null;
    this.keys = {};

    // mouse events
    document.addEventListener("mousedown", (e) => this.onMouseDown(e), false);
    document.addEventListener("mouseup", (e) => this.onMouseUp(e), false);
    document.addEventListener("mousemove", (e) => this.onMouseMove(e), false);
    document.addEventListener("keydown", (e) => this.onKeyDown(e), false);
    document.addEventListener("keyup", (e) => this.onKeyUp(e), false);
  }

  onMouseDown(e) {
    switch (e.button) {
      case 0: {
        this.current.leftButton = true;
        break;
      }
      case 1: {
        this.current.rightButton = true;
        break;
      }
    }
  }

  onMouseUp(e) {
    switch (e.button) {
      case 0: {
        this.current.leftButton = false;
        break;
      }
      case 1: {
        this.current.rightButton = false;
        break;
      }
    }
  }

  onMouseMove(e) {
    this.current.mouseX = e.pageX - this.sizes.width / 2;
    this.current.mouseY = e.pageY - this.sizes.height / 2;
    // console.log(this.current);

    if (this.previous === null) {
      this.previous = { ...this.current };
    }

    this.current.mouseXDelta = this.current.mouseX - this.previous.mouseX;
    this.current.mouseYDelta = this.current.mouseY - this.previous.mouseY;
  }

  onKeyDown(e) {
    this.keys[e.keyCode] = true;
  }

  onKeyUp(e) {
    this.keys[e.keyCode] = false;
  }

  key(keyCode) {
    return this.keys[keyCode];
  }

  update() {
    if (this.previous !== null) {
      this.current.mouseXDelta = this.current.mouseX - this.previous.mouseX;
      this.current.mouseYDelta = this.current.mouseY - this.previous.mouseY;

      this.previous = { ...this.current };
    }
  }
}
