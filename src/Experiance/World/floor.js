import * as three from "three";
import Experiance from "../experiance";
export default class Floor {
  constructor() {
    this.exp = new Experiance();
    this.resource = this.exp.resource;
    this.scene = this.exp.scene;

    this.setGeometry();
    this.setTexture();
    this.setMaterial();
    this.setMesh();
  }
  setGeometry() {
    this.geometry = new three.CircleGeometry(5, 64);
  }
  setTexture() {
    this.textures = {};
    this.textures.color = this.resource.items.grassColorTexture;
    this.textures.color.colorSpace = three.SRGBColorSpace;
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = three.RepeatWrapping;
    this.textures.color.wrapT = three.RepeatWrapping;

    this.textures.normal = this.resource.items.grassNormalTexture;
    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = three.RepeatWrapping;
    this.textures.normal.wrapT = three.RepeatWrapping;
  }
  setMaterial() {
    this.materail = new three.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
    });
  }
  setMesh() {
    this.mesh = new three.Mesh(this.geometry, this.materail);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
