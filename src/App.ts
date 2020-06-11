import { World } from './World';

/**
 * Application class
 */
class App {

    /**
     * Active world
     */
    world: World;

    /**
     * Multiple worlds
     */
    worlds: World[];

    /**
     * Creates an application
     */
    constructor() {
        this.world = new World();
        this.worlds = [];
        this.worlds.push(this.world)
    }

    /**
     * Starts the active world
     */
    start() {
        this.world.start();
    }

    /**
     * Stops the active world
     */
    stop() {
        this.world.stop();
    }

}

export { App };