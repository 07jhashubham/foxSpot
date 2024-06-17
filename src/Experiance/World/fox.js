import Experiance from "../experiance";
import * as three from "three";

export default class Fox {
  constructor() {
    this.exp = new Experiance();
    this.resources = this.exp.resource;
    this.scene = this.exp.scene;
    this.time = this.exp.time;
    this.debug = this.exp.debug;

    //debug
    this.debugFolder = this.debug.ui.addFolder("Fox");

    this.modelsrc = this.resources.items.foxModel;

    this.setModel();
    this.setAnimation();
  }
  setModel() {
    this.model = this.modelsrc.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof three.Mesh) {
        child.castShadow = true;
      }
    });
  }
  setAnimation() {
    this.animation = {};
    this.animation.mixer = new three.AnimationMixer(this.model);

    this.animation.actions = {};
    this.animation.actions.idel = this.animation.mixer.clipAction(
      this.modelsrc.animations[0]
    );
    this.animation.actions.walking = this.animation.mixer.clipAction(
      this.modelsrc.animations[1]
    );
    this.animation.actions.running = this.animation.mixer.clipAction(
      this.modelsrc.animations[2]
    );

    this.animation.current = this.animation.actions.running;
    this.animation.current.play();

    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const old = this.animation.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(old, 3);

      this.animation.current = newAction;
    };
    if (this.debug.active) {
      const debugObject = {
        playIdle: () => {
          this.animation.play("idel");
        },
        playWalking: () => {
          this.animation.play("walking");
        },
        playRunning: () => {
          this.animation.play("running");
        },
      };
      this.debugFolder.add(debugObject, "playIdle");
      this.debugFolder.add(debugObject, "playWalking");
      this.debugFolder.add(debugObject, "playRunning");
    }
  }
  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
