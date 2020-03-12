
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

@Injectable({ providedIn: 'root' })
export class EngineService {

  app: Application;

  public constructor() { }

  public createApplication(canvas: HTMLCanvasElement): void {

    // create new application
    this.app = new Application();

    // create renderer
    this.app.world.createEntity()
      .addComponent(Renderer, { active: true, canvas: canvas, antialias: true, alpha: true });

     // create scene and get the component
    let scene = this.app.world.createEntity()
      .addComponent(Scene, { active: true, background: new THREE.Color(0x959595) })
      .getComponent(Scene)

    // create camera
    this.app.world.createEntity()
      .addComponent(Transform, { parent: scene })
      .addComponent(Camera, { active: true, type: CameraType.Perspective })

    // create model
    this.app.world.createEntity()
      .addComponent(Transform, { parent: scene })
      .addComponent(Model, {type: ModelType.Box , material: new THREE.MeshStandardMaterial({color: 0xf28a3a, wireframe: true})})
      .addComponent(Script)

    // create light
    this.app.world.createEntity()
      .addComponent(Transform, { parent: scene })
      .addComponent(Light)

    this.app.start();

    console.log(this)
  }
}