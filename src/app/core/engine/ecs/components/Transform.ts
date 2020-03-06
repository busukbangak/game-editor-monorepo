
import { Component } from "./Component";
import * as THREE from "three";

export class Transform implements Component {

    value: THREE.Group;

    constructor(value = new THREE.Group()) {
        this.value = value;
    }

}