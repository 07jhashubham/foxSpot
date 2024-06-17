import * as three from "three";
import Experiance from "./experiance";
export default class Renderer {
  constructor() {
    this.exp = new Experiance();
    this.canvas = this.exp.canvas;
    this.size = this.exp.sizes;
    this.scene = this.exp.scene;
    this.camera = this.exp.camera;

    this.setInstance();
  }
  setInstance() {
    this.instace = new three.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instace.setSize(this.size.width, this.size.height);
    this.instace.pixelRatio = this.size.pixelRatio;
    this.instace.shadowMap.enabled = true;
    this.instace.shadowMap.type = three.PCFSoftShadowMap;
    this.instace.setClearColor("#211d20");
    this.instace.toneMapping = three.CineonToneMapping;
    this.instace.toneMappingExposure = 1.75;
  }
  resize() {
    this.instace.setSize(this.size.width, this.size.height);
    this.instace.pixelRatio = this.size.pixelRatio;
  }
  update() {
    this.instace.render(this.scene, this.camera.instance);
  }
}
