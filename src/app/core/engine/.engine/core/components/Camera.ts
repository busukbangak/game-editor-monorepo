
import { Component } from "./Component";
import * as THREE from "three";

export class Camera implements Component {

    value: THREE.Camera;

    active: boolean;

    constructor(value = new THREE.PerspectiveCamera(), active = false) {
        this.value = value;
        this.active = active;
    }

}