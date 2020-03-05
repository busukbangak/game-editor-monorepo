import { Entity } from "../entities/Entity";
import { Component } from "./Component";

export class Rigidbody extends Component {
    constructor(entity: Entity) {
        super(entity);
    }
}