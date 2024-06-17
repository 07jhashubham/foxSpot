import Sizes from "./Utils/sizes";
import Camera from "./camera";
import Renderer from "./renderer";
import Time from "./Utils/time";
import * as three from "three";
import World from "./World/world";
import Resource from "./Utils/resource";
import sources from "./sources";
import Debug from "./Utils/debug";

let instance = null;

export default class Experiance {
  constructor(canvas) {
    if (instance) return instance;
    instance = this;
    //global Variable
    window.experiace = this;

    //objects
    this.canvas = canvas;

    //setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.debug = new Debug();
    this.resource = new Resource(sources);
    this.scene = new three.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // console.log(this.sizes.height);
    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("tick", () => {
      this.update();
    });
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
}
