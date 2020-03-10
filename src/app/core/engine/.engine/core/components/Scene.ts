
import { Component } from "./Component";
import * as THREE from "three";

export interface SceneParameters {
	fog: THREE.IFog | null,
	overrideMaterial: THREE.Material | null,
	autoUpdate: boolean,
	background: null | THREE.Color | THREE.Texture,
	environment: null | THREE.Texture
}

export class Scene implements Component {

    active: boolean;

    options: SceneParameters;

    value: THREE.Scene;

    constructor(active = false, options?: SceneParameters) {
        this.options = options;
        this.active = active;
        this.value = new THREE.Scene();
    }

}