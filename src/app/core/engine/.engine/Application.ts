import { World } from './core/World';
import { Manager } from './managers/Manager'
import { EventManager } from './managers/EventManager';

export class Application {

    world: World;

    managers: Manager[];

    constructor() {
        this.world = new World();
        this.managers = [];
        this.managers.push(new EventManager())
    }

    start() {
        this.world.start();
    }

    stop() {
        this.world.stop();
    }

    getManager<T extends Manager>(Manager: new (...args: any) => T) {
        for (let manager of this.managers) {
            if (manager instanceof Manager) {
                return manager;
            }
        }
        return undefined;
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