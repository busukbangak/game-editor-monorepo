
import { Component } from "./Component";
import * as THREE from "three";
import { Material } from "three";

enum ModelType {
    Box,
    Cone
}

class ModelComponent implements Component {

    type: ModelType;

    material: Material | Material[]

    wireframe: boolean;

    value: THREE.Mesh;

    constructor(options?: Object) {
        this.type = undefined;
        
        this.wireframe = false;
        this.material = undefined;
        
        for (let i in this) {
            for (let k in options) {
                if (i === k) {
                    this[i] = options[k]
                }
            }
        }

        if(!this.material) {
            this.material = new THREE.MeshStandardMaterial({color: parseInt('0x'+Math.floor(Math.random()*16777215).toString(16)), wireframe: this.wireframe});
        }

        if(this.wireframe) {
            // TODO: Adjust Material to wireframe
        }

        switch (this.type) {
            case ModelType.Box: this.value = new THREE.Mesh(new THREE.BoxGeometry(), this.material); break;
            case ModelType.Cone: this.value = new THREE.Mesh(new THREE.ConeGeometry(), this.material); break;
            default: this.value = new THREE.Mesh(new THREE.BoxGeometry(), this.material); break;
        }
        
    }

}

export { ModelComponent, ModelType};