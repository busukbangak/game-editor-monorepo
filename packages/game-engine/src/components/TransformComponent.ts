
import { Component } from "./Component";
import * as THREE from "three";
import { SceneComponent } from "./SceneComponent";

// TODO: wire toplevel fields properly
class TransformComponent implements Component {

    parent: SceneComponent | TransformComponent

    children: TransformComponent[];

    position: THREE.Vector3;

    rotation: THREE.Euler;

    quaternion: THREE.Quaternion;

    scale: THREE.Vector3;

    value: THREE.Group | THREE.Scene;

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

export { TransformComponent };