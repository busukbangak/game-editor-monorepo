
import { Component } from "./Component";
import * as THREE from "three";

export class Transform implements Component {

    parent: THREE.Object3D

    value: THREE.Group;

    constructor(parent?: THREE.Object3D) {
        this.parent = parent;
        this.value = new THREE.Group();
    }

}