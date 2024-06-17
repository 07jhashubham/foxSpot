import * as three from "three";
import Experiance from "./experiance";
import { OrbitControls } from "three/examples/jsm/Addons.js";
export default class Camera {
  constructor() {
    this.exp = new Experiance();
    this.size = this.exp.sizes;
    this.canvas = this.exp.canvas;
    this.scene = this.exp.scene;
    this.setInstance();
    this.setOrbitControls();
  }
  setInstance() {
    this.instance = new three.PerspectiveCamera(
      35,
      this.size.width / this.size.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }
  setOrbitControls() {
    this.control = new OrbitControls(this.instance, this.canvas);
    this.control.enableDamping = true;
  }
  resize() {
    this.instance.aspect = this.size.width / this.size.height;
    this.instance.updateProjectionMatrix();
  }
  update() {
    this.control.update();
  }
}
