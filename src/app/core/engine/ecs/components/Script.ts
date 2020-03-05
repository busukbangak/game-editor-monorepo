import { Entity } from "../entities/Entity";
import { Component } from "./Component";


export class Script extends Component {
    constructor(entity: Entity) {
        super(entity);
    }
}