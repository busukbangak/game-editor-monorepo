
import { Component } from "./Component";
import * as THREE from "three";

enum LightType {
    Ambient
}

class LightComponent implements Component {

    type: LightType;

    value: THREE.Light;

    constructor(options?: Object) {
        this.type = undefined;

        for (let i in this) {
            for (let k in options) {
                if (i === k) {
                    this[i] = options[k]
                }
            }
        }

        switch(this.type) {
            case LightType.Ambient: this.value = new THREE.AmbientLight(0xffffff); break;
            default: this.value = new THREE.AmbientLight(0xffffff); break;
        }
    }

}

export { LightComponent, LightType};