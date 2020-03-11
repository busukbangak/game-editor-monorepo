
import { Injectable } from '@angular/core';
import { Application } from './.engine/Application';
import { Renderer } from './.engine/core/components/Renderer';
import * as THREE from 'three';
import { Transform } from './.engine/core/components/Transform';
import { Model, ModelType } from './.engine/core/components/Model';
import { Script } from './.engine/core/components/Script';
import { SceneSystem } from './.engine/core/systems/SceneSystem';
import { CameraSystem } from './.engine/core/systems/CameraSystem';
import { ModelSystem } from './.engine/core/systems/ModelSystem';
import { LightSystem } from './.engine/core/systems/LightSystem';
import { TransformSystem } from './.engine/core/systems/TransformSystem';
import { ScriptSystem } from './.engine/core/systems/ScriptSystem';
import { RenderSystem } from './.engine/core/systems/RenderSystem';
import { Scene } from './.engine/core/components/Scene';
import { Camera, CameraType } from './.engine/core/components/Camera';
import { Light } from './.engine/core/components/Light';

@Injectable({ providedIn: 'root' })
export class EngineService {

  app: Application;

  public constructor() { }

  public createApplication(canvas: HTMLCanvasElement): void {

    // create new application
    this.app = new Application();

    // create renderer
    this.app.world.createEntity()
      .addComponent(Renderer, { active: true, options: { canvas: canvas, antialias: true, alpha: true } });

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

    // create systems
    this.app.world.createSystem(ScriptSystem, { app: this.app });
    this.app.world.createSystem(SceneSystem);
    this.app.world.createSystem(CameraSystem);
    this.app.world.createSystem(ModelSystem);
    this.app.world.createSystem(LightSystem);
    this.app.world.createSystem(TransformSystem);
    this.app.world.createSystem(RenderSystem);

    this.app.start();

    console.log(this)
  }
}