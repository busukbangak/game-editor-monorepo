import { World } from './World';
import { AssetManager } from './managers/AssetManager';

export class Application {

    world: World;

    constructor() {
        this.world = new World();
    }

    start() {
        this.world.start();
    }

    stop() {
        this.world.stop();
    }

}



/*
PhysicsSystem
CameraSystem
AudioSystem
AnimationSystem
*/