
import { Component } from "./Component";
import * as THREE from "three";

export class Scene implements Component {

    value: THREE.Scene;

    active: boolean;

    constructor(value: THREE.Scene = new THREE.Scene, active = false) {
        this.value = value;
        this.active = active;
    }

}