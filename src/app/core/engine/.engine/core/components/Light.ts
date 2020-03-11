
import { Component } from "./Component";
import * as THREE from "three";

export enum LightType {
    Ambient
}

export class Light implements Component {

    type: LightType;

    value: THREE.Light;

    constructor(type: LightType = LightType.Ambient) {
        this.type = type;
        this.value = undefined;
    }

}