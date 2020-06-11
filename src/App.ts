import { World } from './World';

class App {

    world: World;

    worlds: World[];

    constructor() {
        this.world = new World();
        this.worlds = [];
        this.worlds.push(this.world)
    }

    start() {
        this.world.start();
    }

    stop() {
        this.world.stop();
    }

}

export { App };