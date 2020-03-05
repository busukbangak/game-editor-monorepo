import { Component } from "./Component";
import { Entity } from "../entities/Entity";

export class Scene extends Component {

    id: string;

    constructor(entity?: Entity, id?: string) {
        super(entity);

        this.id = id;

    }
}