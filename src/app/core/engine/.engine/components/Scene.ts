
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

    fog: THREE.IFog | null;

    overrideMaterial: THREE.Material | null;

    autoUpdate: boolean;

    background: null | THREE.Color | THREE.Texture;

    environment: null | THREE.Texture

    readonly value: THREE.Scene;

    constructor(options?: Object) {
        this.active = false;
        this.fog = undefined;
        this.overrideMaterial = undefined;
        this.autoUpdate = true;
        this.background = undefined;
        this.environment = undefined;

        for (let i in this) {
            for (let k in options) {
                if (i === k) {
                    this[i] = options[k]
                }
            }
        }

        this.value = new THREE.Scene();

        if (this.autoUpdate) {
            this.value.autoUpdate = this.autoUpdate;
        }
        if (this.background) {
            this.value.background = this.background;
        }
        if (this.environment) {
            this.value.environment = this.environment;
        }
        if (this.fog) {
            this.value.fog = this.fog;
        }
        if (this.overrideMaterial) {
            this.value.overrideMaterial = this.overrideMaterial;
        }
    }

}