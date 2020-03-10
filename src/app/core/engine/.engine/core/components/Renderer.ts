
import { Component } from "./Component";
import { ThrowStmt } from "@angular/compiler";
import * as THREE from "three";

export class Renderer implements Component {

    active: boolean;

    options: THREE.WebGLRendererParameters;

    value: THREE.WebGLRenderer;

    constructor(active: boolean = false, options?: THREE.WebGLRendererParameters) {
        // TODO: Initialize WebRenderer here
        this.active = active;
        this.options = options;
        this.value = undefined;
    }

}