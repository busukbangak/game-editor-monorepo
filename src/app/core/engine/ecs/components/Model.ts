import { Entity } from "../entities/Entity";
import { Component } from "./Component";

export class Model extends Component {


    constructor(entity: Entity) {
        super(entity);
    }

}