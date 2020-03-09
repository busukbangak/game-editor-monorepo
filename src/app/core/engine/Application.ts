import { World } from './ecs/World';
import { Renderer } from './ecs/components/Renderer';
import { Scene } from './ecs/components/Scene';
import { Transform } from './ecs/components/Transform';
import { Camera } from './ecs/components/Camera';
import { Model } from './ecs/components/Model';
import { Light } from './ecs/components/Light';
import { SceneSystem } from './ecs/systems/SceneSystem'
import { TransformSystem } from './ecs/systems/TransformSystem';
import * as THREE from 'three';
import { RenderSystem } from './ecs/systems/RenderSystem';
import { Entity } from './ecs/entities/Entity';
import { Script } from './ecs/components/Script';
import { ScriptSystem } from './ecs/systems/ScriptSystem';
import { readFile, readFileSync } from 'fs';


export class Application {

    world: World;

    assets: string;

    constructor(canvas: HTMLCanvasElement) {

        // create game world
        this.world = new World();

        // create renderer
        let rendererEntity = this.world.createEntity()
            .addComponent(Renderer, { value: new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true }) })

        // create scene
        let sceneEntity = this.world.createEntity()
            .addComponent(Scene, { active: true })
            
        let scene = sceneEntity.getComponent(Scene).value;
        scene.background = new THREE.Color(0x959595);

        // create camera
        let cameraEntity = this.world.createEntity()
            .addComponent(Scene, { value: scene })
            .addComponent(Transform)
            .addComponent(Camera, { active: true })

        let camera = cameraEntity.getComponent(Camera).value;
        camera.position.z = 10;

        // create model
        this.world.createEntity()
            .addComponent(Scene, { value: scene })
            .addComponent(Transform)
            .addComponent(Model)
            .addComponent(Script)

        // create light
        this.world.createEntity()
            .addComponent(Scene, { value: scene })
            .addComponent(Transform)
            .addComponent(Light)

        // create systems
        this.world.createSystem(TransformSystem);
        this.world.createSystem(SceneSystem);
        this.world.createSystem(ScriptSystem);
        this.world.createSystem(RenderSystem);

        this.world.start();

        console.log(this)

    }


}



/*

World

Entity
Component
System

Components:
Scene (OBJECT3d)
Script braucht das object 3d als refrenz zum manipulieren
Light (OBJECT3d)
Camera (OBJECT3d)
Model (OBJECT3d)
Rigidbody braucht das object 3d als refrenz zum manipulieren
Audio  (OBJECT3d)
Animation braucht das object 3d als refrenz zum manipulieren

Systems:
RenderSystem (Scene, Model)
PhysicsSystem
ScriptSystem
LightSystem
ModelSystem
CameraSystem
AudioSystem
AnimationSystem







*/