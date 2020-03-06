
import { Component } from "./Component";
import * as THREE from "three";

export class Model implements Component {

    value: THREE.Mesh;

    constructor(value = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x0087E6, wireframe: false }))) {
        this.value = value;
    }

}