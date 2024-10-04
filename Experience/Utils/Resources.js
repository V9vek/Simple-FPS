import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();
    
    // Options
    this.sources = sources;

    // Setup
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      switch (source.type) {
        case "gltfModel":
          this.load(this.loaders.gltfLoader, source);
          break;
        case "texture":
          this.load(this.loaders.textureLoader, source);
          break;
        case "cubeTexture":
          this.load(this.loaders.cubeTextureLoader, source);
          break;
        default:
          break;
      }
    }
  }

  load(loader, source) {
    loader.load(source.path, (file) => {
      this.items[source.name] = file;

      this.loaded += 1;

      if (this.loaded === this.toLoad) {
        this.trigger("ready");
      }
    });
  }
}
