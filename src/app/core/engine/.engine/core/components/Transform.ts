
import { Component } from "./Component";
import * as THREE from "three";
import { Scene } from "./Scene";

export class Transform implements Component {

    parent: Scene | Transform 

    children: THREE.Object3D[];

    value: THREE.Group;

    constructor(parent?: Scene | Transform) {
        this.parent = parent;
        this.children = [];
        this.value = undefined;
    }

}