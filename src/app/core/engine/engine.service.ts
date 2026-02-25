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
    let testScript = await DOT.AssetManager.loadAsset('testScript', '/app/assets/TestScript.js');

    // create renderer
    let renderer = this.app.world.addEntity()
      .addComponent(DOT.Renderer, { active: true, canvas: canvas, antialias: true, alpha: true })
      .getComponent(DOT.Renderer).value

    // create scene and get the component
    let sceneComponent = this.app.world.addEntity()
      .addComponent(DOT.Scene, { active: true, background: new THREE.Color(0x959595) })
      .getComponent(DOT.Scene)

    // create camera
    let cameraEntity = this.app.world.addEntity()
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
    let modelEntityBox = this.app.world.addEntity()
      .addComponent(DOT.Transform, { parent: sceneComponent })
      .addComponent(DOT.Model, { type: DOT.ModelType.Box, material: new THREE.MeshStandardMaterial({ color: 0xf28a3a, wireframe: true }) })
      .addComponent(DOT.Script, { asset: testScript, enabled: true })

    let modelEntityCone = this.app.world.addEntity()
      .addComponent(DOT.Transform, { parent: sceneComponent })
      .addComponent(DOT.Model, { type: DOT.ModelType.Cone, material: new THREE.MeshStandardMaterial({ color: 0x2a8af2, wireframe: false }) })
    
    // set cone position
    modelEntityCone.getComponent(DOT.Transform)
      .value.position.set(2, 0, 0);
    
    modelEntityCone.addComponent(DOT.Script, {
      value: new TransformScript(cameraEntity.getComponent(DOT.Camera).value, renderer.domElement, sceneComponent.value, cameraEntity.getComponent(DOT.Script).value, modelEntityCone.getComponent(DOT.Model).value),
      enabled: false // TODO: BUG - Doesnt disable script
    })

    // create light
    this.app.world.addEntity()
      .addComponent(DOT.Transform, { parent: sceneComponent })
      .addComponent(DOT.Light)

    this.app.start();

    console.log(this)
  }
}