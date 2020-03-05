import { Entity } from "../entities/Entity";
import { Component } from "./Component";


export class Animation extends Component {
    constructor(entity: Entity) {
        super(entity);
    }
}