import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunlight();
    this.setEnvironmentMap();
  }

  setSunlight() {
    const distance = 0;
    const angle = Math.PI / 4.0;
    const penumbra = 0.5;
    const decay = 0.5;

    this.sunlight = new THREE.SpotLight(
      "#ffffff",
      40,
      distance,
      angle,
      penumbra,
      decay
    );
    this.sunlight.castShadow = true;
    // this.sunlight.shadow.camera.far = 100;
    this.sunlight.shadow.mapSize.set(4096, 4096);
    this.sunlight.position.set(100, 100, 0);

    this.scene.add(this.sunlight);

    // const helper = new THREE.DirectionalLightHelper(this.sunlight, 5);
    // this.scene.add(helper);

    // const directionalLightCameraHelper = new THREE.CameraHelper(
    //   this.sunlight.shadow.camera
    // );
    // this.scene.add(directionalLightCameraHelper);
    // directionalLightCameraHelper.visible = true;
  }

  setEnvironmentMap() {
    this.environmentMap = {};

    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    // this.environmentMap.texture.encoding = THREE.sRGBEncoding;
    this.environmentMap.colorSpace = THREE.SRGBColorSpace;

    this.scene.background = this.environmentMap.texture;
    this.scene.environment = this.environmentMap.texture;
  }
}
