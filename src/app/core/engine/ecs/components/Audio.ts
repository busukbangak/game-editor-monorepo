import { Entity } from "../entities/Entity";
import { Component } from "./Component";


export class Audio extends Component {
    constructor(entity: Entity) {
        super(entity);
    }
}