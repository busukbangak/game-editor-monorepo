import { Component } from "../components/Component";
import { Entity } from "../entities/Entity";
import { World } from "../World";

abstract class System {

    world: World;

    queries: Array<new (...args: any) => Component>;

    enabled: boolean;

    constructor(world: World) {
        this.world = world;
        this.enabled = true;
        this.queries = [];
    }

    abstract initialize(entities: Entity[]);

    abstract update(tick: number, entities: Entity[]);

    start() {
        this.enabled = true;
    }

    stop() {
        this.enabled = false;
    }
}

export { System };
