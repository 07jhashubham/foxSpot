import * as three from "three";
import Experiance from "../experiance";
import Environment from "./enviroment";
import Floor from "./floor";
import Fox from "./fox";
export default class World {
  constructor() {
    this.exp = new Experiance();
    this.scene = this.exp.scene;
    this.resource = this.exp.resource;

    // const testMesh = new three.Mesh(
    //   new three.BoxGeometry(1, 1, 1),
    //   new three.MeshStandardMaterial({ wireframe: false })
    // );
    // this.scene.add(testMesh);

    this.resource.on("ready", () => {
      this.floor = new Floor();
      this.fox = new Fox();
      this.enviroment = new Environment();
    });
  }
  update() {
    if (this.fox) this.fox.update();
  }
}
