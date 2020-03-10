
import { Injectable, ElementRef } from '@angular/core';
import { Application } from './Application';
import { Renderer } from './.engine/components/Renderer';
import * as THREE from 'three';
import { Transform } from './.engine/components/Transform';
import { Model } from './.engine/components/Model';
import { Script } from './.engine/components/Script';
import { TransformSystem } from './.engine/systems/TransformSystem';
import { SceneSystem } from './.engine/systems/SceneSystem';
import { ScriptSystem } from './.engine/systems/ScriptSystem';
import { RenderSystem } from './.engine/systems/RenderSystem';
import { Scene } from './.engine/components/Scene';
import { Camera } from './.engine/components/Camera';
import { Light } from './.engine/components/Light';

@Injectable({ providedIn: 'root' })
export class EngineService {

  app: Application;

  public constructor() { }

  public createApplication(canvas: HTMLCanvasElement): void {

    this.app = new Application();
    let world = this.app.world;

    // create renderer
    let rendererEntity = world.createEntity()
      .addComponent(Renderer, { value: new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true }) })

    // create scene
    let sceneEntity = world.createEntity()
      .addComponent(Scene, { active: true })

    let scene = sceneEntity.getComponent(Scene).value;
    scene.background = new THREE.Color(0x959595);

    // create camera
    let cameraEntity = world.createEntity()
      .addComponent(Scene, { value: scene })
      .addComponent(Transform)
      .addComponent(Camera, { active: true })

    let camera = cameraEntity.getComponent(Camera).value;
    camera.position.z = 10;

    // create model
    world.createEntity()
      .addComponent(Scene, { value: scene })
      .addComponent(Transform)
      .addComponent(Model)
      .addComponent(Script)

    // create light
    world.createEntity()
      .addComponent(Scene, { value: scene })
      .addComponent(Transform)
      .addComponent(Light)

    // create systems
    world.createSystem(TransformSystem);
    world.createSystem(SceneSystem);
    world.createSystem(ScriptSystem);
    world.createSystem(RenderSystem);

    this.app.start();

    console.log(this)
  }
}