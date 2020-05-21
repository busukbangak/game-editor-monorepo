
import { Component } from "./Component";
import * as THREE from "three";
import { Material } from "three";

enum ModelType {
    Box,
    Cone
}

class Model implements Component {

    type: ModelType;

    material: Material | Material[]

    value: THREE.Mesh;

    constructor(options?: Object) {
        this.type = undefined;
        this.material = new THREE.MeshStandardMaterial({color: 0xf28a3a});
        
        for (let i in this) {
            for (let k in options) {
                if (i === k) {
                    this[i] = options[k]
                }
            }
        }

        switch (this.type) {
            case ModelType.Box: this.value = new THREE.Mesh(new THREE.BoxGeometry(), this.material); break;
            case ModelType.Cone: this.value = new THREE.Mesh(new THREE.ConeGeometry(), this.material); break;
            default: this.value = new THREE.Mesh(new THREE.BoxGeometry(), this.material); break;
        }
        
    }

}

export { Model, ModelType};