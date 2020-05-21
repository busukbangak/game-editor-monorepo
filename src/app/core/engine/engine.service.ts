
import { Injectable } from '@angular/core';

import * as THREE from 'three';
import * as DOT from '@awanali/dot-engine';

import { OrbitScript } from './scripts/OrbitScript'
import { TransformScript } from './scripts/TransformScript'

@Injectable({ providedIn: 'root' })
export class EngineService {

  app: DOT.Application;

  public constructor() { }

  public async createApplication(canvas: HTMLCanvasElement) {

    // create new application
    this.app = new DOT.Application();

    // load assets immediately
    /* await this.app.world.getManager(AssetManager).loadAsset('file:///Users/user/Desktop/desktop-game-editor/TestScript2.js');
    await this.app.world.getManager(AssetManager).loadAsset('file:///Users/user/Desktop/desktop-game-editor/TestScript.js', 'rotate'); */

    // create renderer
    let renderer = this.app.world.createEntity()
      .addComponent(DOT.Renderer, { active: true, canvas: canvas, antialias: true, alpha: true })
      .getComponent(DOT.Renderer).value

    // create scene and get the component
    let sceneComponent = this.app.world.createEntity()
      .addComponent(DOT.Scene, { active: true, background: new THREE.Color(0x959595) })
      .getComponent(DOT.Scene)

    // create camera
    let cameraEntity = this.app.world.createEntity()
      .addComponent(DOT.Transform, { parent: sceneComponent })
      .addComponent(DOT.Camera, { active: true, type: DOT.CameraType.Perspective })

    // set camera position
    cameraEntity.getComponent(DOT.Transform)
      .value.position.set(5, 5, 5);

    // add camera orbit script
    cameraEntity.addComponent(DOT.Script, {
      value: new OrbitScript(cameraEntity.getComponent(DOT.Camera).value, renderer.domElement)
    })

    // create model
    let modelEntity = this.app.world.createEntity()
      .addComponent(DOT.Transform, { parent: sceneComponent })
      .addComponent(DOT.Model, { type: DOT.ModelType.Box, material: new THREE.MeshStandardMaterial({ color: 0xf28a3a, wireframe: false }) })

    modelEntity.addComponent(DOT.Script, {
      value: new TransformScript(cameraEntity.getComponent(DOT.Camera).value, renderer.domElement, sceneComponent.value, cameraEntity.getComponent(DOT.Script).value, modelEntity.getComponent(DOT.Model).value)
    })

    // create light
    this.app.world.createEntity()
      .addComponent(DOT.Transform, { parent: sceneComponent })
      .addComponent(DOT.Light)

    this.app.start();

    console.log(this)
  }
}