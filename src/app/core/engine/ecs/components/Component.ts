import { Entity } from "../entities/Entity";

export abstract class Component {

    entity: Entity;

    constructor(entity: Entity) {
    }
}
