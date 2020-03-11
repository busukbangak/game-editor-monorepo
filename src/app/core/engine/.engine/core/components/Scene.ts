
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

    value: THREE.Scene;

    constructor(active = false, fog?: THREE.IFog | null, overrideMaterial?: THREE.Material | null, autoUpdate?: boolean,
        background?: null | THREE.Color | THREE.Texture, environment?: null | THREE.Texture) {

        this.active = active;
        this.fog = fog;
        this.overrideMaterial = overrideMaterial;
        this.autoUpdate = autoUpdate;
        this.background = background;
        this.environment = environment;
        this.value = undefined;
    }

}