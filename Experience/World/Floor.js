import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(60, 60, 10, 10);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "#dac378",
    });
  }

  setMesh() {
    this.floor = new THREE.Mesh(this.geometry, this.material);
    this.floor.rotation.x = -Math.PI / 2
    this.floor.receiveShadow = true
    this.scene.add(this.floor)
  }
}
