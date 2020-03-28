
import { Injectable } from '@angular/core';
import { Application } from './.engine/Application';
import { Renderer } from './.engine/components/Renderer';
import * as THREE from 'three';
import { Transform } from './.engine/components/Transform';
import { Model, ModelType } from './.engine/components/Model';
import { Script } from './.engine/components/Script';
import { Scene } from './.engine/components/Scene';
import { Camera, CameraType } from './.engine/components/Camera';
import { Light } from './.engine/components/Light';
import { AssetManager } from './.engine/managers/AssetManager';

import { OrbitControls } from './scripts/OrbitControls'
import { TransformControls } from './scripts/TransformControls'


@Injectable({ providedIn: 'root' })
export class EngineService {

  app: Application;

  public constructor() { }

  public async createApplication(canvas: HTMLCanvasElement) {

    // create new application
    this.app = new Application();

    // load assets immediately
    /* await this.app.world.getManager(AssetManager).loadAsset('file:///Users/user/Desktop/desktop-game-editor/TestScript2.js');
    await this.app.world.getManager(AssetManager).loadAsset('file:///Users/user/Desktop/desktop-game-editor/TestScript.js', 'rotate'); */

    // create renderer
    let renderer = this.app.world.createEntity()
      .addComponent(Renderer, { active: true, canvas: canvas, antialias: true, alpha: true })
      .getComponent(Renderer).value

    // create scene and get the component
    let sceneComponent = this.app.world.createEntity()
      .addComponent(Scene, { active: true, background: new THREE.Color(0x959595) })
      .getComponent(Scene)

    // create camera
    let cameraEntity = this.app.world.createEntity()
      .addComponent(Transform, { parent: sceneComponent })
      .addComponent(Camera, { active: true, type: CameraType.Perspective })

    cameraEntity.getComponent(Transform)
      .value.position.set(5, 5, 5);

    // create model
    let modelEntity = this.app.world.createEntity()
      .addComponent(Transform, { parent: sceneComponent })
      .addComponent(Model, { type: ModelType.Box, material: new THREE.MeshStandardMaterial({ color: 0xf28a3a, wireframe: false }) })

    // create light
    this.app.world.createEntity()
      .addComponent(Transform, { parent: sceneComponent })
      .addComponent(Light)

    let orbit = new OrbitControls(cameraEntity.getComponent(Camera).value, renderer.domElement)


    let transform = new TransformControls(cameraEntity.getComponent(Camera).value, renderer.domElement);
    transform.addEventListener('dragging-changed', function (event) {
      orbit.enabled = !event.value;
    });

    sceneComponent.value.add(transform)
    transform.attach(modelEntity.getComponent(Model).value)


    this.app.start();

    console.log(this)
  }
}