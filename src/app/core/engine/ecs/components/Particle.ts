import { Entity } from "../entities/Entity";
import { Component } from "./Component";


export class Particle extends Component {
    constructor(entity: Entity) {
        super(entity);
    }
}