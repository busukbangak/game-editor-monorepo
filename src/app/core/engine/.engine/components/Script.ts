
import { Component } from "./Component";
import { Entity } from "../entities/Entity";

export class Script implements Component {

    value: any;

    constructor() {
        this.value = undefined;
    }

}