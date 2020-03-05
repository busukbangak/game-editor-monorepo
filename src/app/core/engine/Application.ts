import { World } from './ecs/World';
import { SceneSystem } from './ecs/systems/SceneSystem'
import { Scene } from './ecs/components/Scene';
import { Transform } from './ecs/components/Transform';
import { Camera } from './ecs/components/Camera';
import { Model } from './ecs/components/Model';


export class Application {

    world: World;

    assets: any;

    tick: number;

    constructor(canvas: HTMLCanvasElement) {

        // create game world
        this.world = new World();

        let camera = this.world.createEntity()
            .addComponent(Scene, {id: '0'})
            .addComponent(Transform)
            .addComponent(Camera)

        let cubeModel = this.world.createEntity()
            .addComponent(Scene, {id: '0'})
            .addComponent(Transform)
            .addComponent(Model, {mesh: 'Box', material: 'Gray'})

        this.world.createSystem(SceneSystem);

        this.start();

        console.log(this)

    }

    public start(): void {

        this.world.initialize();

        if (document.readyState !== 'loading') {
            this.update();
        } else {
            window.addEventListener('DOMContentLoaded', () => {
                this.update();
            });
        }
    }


    public update(): void {
        this.world.update(this.tick);
        this.tick = requestAnimationFrame(() => {
            this.update();
        });
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