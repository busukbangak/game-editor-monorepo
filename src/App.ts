import { World } from './World';

class App {

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

export { App };


/*
PhysicsSystem
CameraSystem
AudioSystem
AnimationSystem
*/