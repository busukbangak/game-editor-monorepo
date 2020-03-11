
import { Component } from "./Component";
import * as THREE from "three";
import { Material } from "three";

export enum ModelType {
    Box,
    Cone
}

export class Model implements Component {

    type: ModelType;

    material: Material | Material[]

    value: THREE.Mesh;

    constructor(type = ModelType.Box, material: Material | Material[] = new THREE.MeshStandardMaterial({color: 0xf28a3a})) {
        this.type = type;
        this.material = material;
        this.value = undefined;
    }

}