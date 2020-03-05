import { Entity } from "../entities/Entity";
import { Component } from "./Component";

export class Sprite extends Component {
    constructor(entity: Entity) {
        super(entity);
    }
}