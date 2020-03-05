import { Entity } from "../entities/Entity";
import { Component } from "./Component";

export class Light extends Component {
    constructor(entity: Entity) {
        super(entity);
    }
}