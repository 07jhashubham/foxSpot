import { GLTFLoader } from "three/examples/jsm/Addons.js";
import EventEmitter from "./EventEmitter";
import * as three from "three";

export default class Resource extends EventEmitter {
  constructor(sources) {
    super(sources);
    this.sources = sources;
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.setLoaders();
    this.startLoading();
  }
  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.cubeTextureLoader = new three.CubeTextureLoader();
    this.loaders.textureLoader = new three.TextureLoader();
  }
  startLoading() {
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.setloaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.setloaded(source, file);
        });
      } else if (source.type === "cubeTextureLoader") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.setloaded(source, file);
        });
      }
    }
  }
  setloaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
