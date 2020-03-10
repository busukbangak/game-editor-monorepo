
import { Component } from "./Component";
import * as THREE from "three";

export class Light implements Component {

    value: THREE.Light;

    constructor(value = new THREE.AmbientLight(0xffffff)) {
        this.value = value;
    }

}