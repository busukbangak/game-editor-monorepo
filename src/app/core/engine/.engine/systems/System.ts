import { Component } from "../components/Component";
import { Entity } from "../entities/Entity";

export abstract class System {

    queries: Array<new (...args: any) => Component>;

    enabled: boolean;

    constructor() {
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

