import * as THREE from "three";
import Experience from "../Experience";

export default class Wall {
  constructor(geo, pos) {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.geo = geo;
    this.pos = pos;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(this.geo.w, this.geo.h, this.geo.d);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "#F9F6EE",
    });
  }

  setMesh() {
    this.wall = new THREE.Mesh(this.geometry, this.material);
    this.wall.castShadow = true;
    this.wall.receiveShadow = true;
    this.wall.position.set(this.pos.x, this.pos.y, this.pos.z);
    this.scene.add(this.wall);
  }
}
