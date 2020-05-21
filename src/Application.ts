import { World } from './World';

class Application {

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

export { Application };


/*
PhysicsSystem
CameraSystem
AudioSystem
AnimationSystem
*/