import { Component } from "../components/Component";
import { Entity } from "../entities/Entity";

export abstract class System {

    queries: Component[];

    enabled: boolean;

    constructor(queries?: Component[]) {
        this.enabled = true;
        this.queries = queries;
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

