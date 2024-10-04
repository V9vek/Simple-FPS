import * as THREE from "three";
import InputController from "../Utils/InputController";
import Experience from "../Experience";
import { clamp } from "three/src/math/MathUtils.js";

const KEYS = {
  a: 65,
  s: 83,
  w: 87,
  d: 68,
};

export default class FirstPersonCamera {
  constructor(camera) {
    // Options
    this.camera = camera;

    // do some refactoring here
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.timeElapsed = this.experience.time.delta * 0.002;

    // Setup
    this.inputController = new InputController();
    this.rotation = new THREE.Quaternion();
    this.phi = 0;
    this.phiSpeed = 4;
    this.theta = 0;
    this.thetaSpeed = 6;
    this.translation = new THREE.Vector3(0, 3, 20);
    this.headBobActive = false;
    this.headBobTimer = 0;
    this.sensitivity = 0.15;
  }

  update() {
    this.updateRotation();
    this.updateCamera();
    this.updateTranslation();
    this.updateHeadBob();
    this.inputController.update();
  }

  updateCamera() {
    this.camera.position.copy(this.translation);
    this.camera.quaternion.copy(this.rotation);
    this.camera.position.y += Math.sin(this.headBobTimer * 11) * 0.1;
  }

  updateHeadBob() {
    if (this.headBobActive) {
      const waveLength = Math.PI;
      const nextStep =
        1 + Math.floor(((this.headBobTimer + 0.000001) * 11) / waveLength);
      const nextStepTime = (nextStep * waveLength) / 11;

      this.headBobTimer = Math.min(
        this.headBobTimer + this.timeElapsed,
        nextStepTime
      );
      if (this.headBobTimer === nextStepTime) {
        this.headBobActive = false;
      }
    }
  }

  updateRotation() {
    const xh = this.inputController.current.mouseXDelta / this.sizes.width;
    const yh = this.inputController.current.mouseYDelta / this.sizes.height;

    this.phi += -xh * this.phiSpeed * this.sensitivity;
    console.log(this.phi);
    
    this.theta = clamp(
      this.theta + -yh * this.thetaSpeed * this.sensitivity,
      -Math.PI / 3,
      Math.PI / 3
    );

    const qx = new THREE.Quaternion();
    qx.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.phi);
    const qz = new THREE.Quaternion();
    qz.setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.theta);

    const q = new THREE.Quaternion().multiplyQuaternions(qx, qz);

    this.rotation.slerp(q, 0.5);
  }

  updateTranslation() {
    const forwardVelocity =
      (this.inputController.key(KEYS.w) ? 1 : 0) +
      (this.inputController.key(KEYS.s) ? -1 : 0);

    const strafeVelocity =
      (this.inputController.key(KEYS.a) ? 1 : 0) +
      (this.inputController.key(KEYS.d) ? -1 : 0);

    const qx = new THREE.Quaternion();
    qx.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.phi);

    // right handed co-ordinate system
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(qx);
    forward.multiplyScalar(forwardVelocity * this.timeElapsed * 10);

    const strafe = new THREE.Vector3(-1, 0, 0);
    strafe.applyQuaternion(qx);
    strafe.multiplyScalar(strafeVelocity * this.timeElapsed * 10);

    this.translation.add(forward).add(strafe);

    if (forwardVelocity || strafeVelocity) {
      this.headBobActive = true;
    }
  }
}
