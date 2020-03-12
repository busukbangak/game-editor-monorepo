
import { Component } from "./Component";
import * as THREE from "three";
import { Scene } from "./Scene";

export class Transform implements Component {

    parent: Scene | Transform

    children: THREE.Object3D[];

    value: THREE.Group;

    constructor(options?: Object) {
        this.parent = undefined;
        this.children = [];

        for (let i in this) {
            for (let k in options) {
                if (i === k) {
                    this[i] = options[k]
                }
            }
        }


        this.value = new THREE.Group();

        if (this.parent) {
            this.parent.value.add(this.value)
        }
    }

}