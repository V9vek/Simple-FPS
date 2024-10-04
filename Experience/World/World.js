import * as THREE from "three";
import Experience from "../Experience";
import FirstPersonCamera from "./FirstPersonCamera";
import Floor from "./Floor";
import Environment from "./Environment";
import Wall from "./Wall";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.fpsCamera = new FirstPersonCamera(this.experience.camera.instance);

    this.resources.on("ready", () => {
      console.log("resources loaded");
      this.environment = new Environment();
      this.floor = new Floor();

      this.wall1 = new Wall({ w: 60, h: 8, d: 4 }, { x: 0, y: 0, z: -30 });
      this.wall2 = new Wall({ w: 60, h: 8, d: 4 }, { x: 0, y: 0, z: 30 });
      this.wall3 = new Wall({ w: 4, h: 8, d: 60 }, { x: -30, y: 0, z: 0 });
      this.wall4 = new Wall({ w: 4, h: 8, d: 60 }, { x: 30, y: 0, z: 0 });

      const box = new THREE.Mesh(
        new THREE.BoxGeometry(4, 4, 4),
        new THREE.MeshStandardMaterial({ color: "#BDB5D5" })
      );
      box.position.set(10, 2, 0);
      box.castShadow = true;
      box.receiveShadow = true;
      this.scene.add(box);
    });
  }

  update() {
    this.fpsCamera.update();
  }
}
