import * as three from "three";
import Experiance from "../experiance";
export default class Environment {
  constructor() {
    this.exp = new Experiance();
    this.resource = this.exp.resource;

    this.scene = this.exp.scene;
    this.sunlight();
    this.setEnviroment();
  }
  sunlight() {
    this.sunDirectionLight = new three.DirectionalLight("#ffffff", 4);
    this.sunDirectionLight.position.set(3, 3, -2.25);
    this.sunDirectionLight.castShadow = true;
    this.sunDirectionLight.shadow.camera.far = 15;
    this.sunDirectionLight.shadow.normalBiaa = 0.05;
    // this.direc = new three.CameraHelper(this.sunDirectionLight.shadow.camera);
    // this.scene.add(this.direc);

    this.sunDirectionLight.shadow.mapSize.set(1024, 1024);
    this.scene.add(this.sunDirectionLight);
  }
  setEnviroment() {
    this.enviromentMap = {};
    this.enviromentMap.texture = this.resource.items.enviromentMapTexture;
    this.enviromentMap.intensity = 0.4;
    this.enviromentMap.colorSpace = three.SRGBColorSpace;
    this.scene.environment = this.enviromentMap.texture;

    this.enviromentMap.updateMaterail = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof three.Mesh &&
          child.material instanceof three.MeshStandardMaterial
        ) {
          child.material.envMap = this.enviromentMap.texture;
          child.material.envMapIntensity = this.enviromentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.enviromentMap.updateMaterail();
  }
}
