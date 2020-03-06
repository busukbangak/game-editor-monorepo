
import { Component } from "./Component";
import { ThrowStmt } from "@angular/compiler";
import * as THREE from "three";

export class Renderer implements Component {

    value: THREE.WebGLRenderer;

    constructor(value?: THREE.WebGLRenderer) {
        this.value = value;
    }

}