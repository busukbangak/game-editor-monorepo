
import { Component } from "./Component";
import * as THREE from "three";

export enum CameraType {
    Array,
    Cube,
    Orthographic,
    Perspective,
    Stereo
}

export class Camera implements Component {

    active: boolean;

    type: CameraType;

    value: THREE.Camera;

    constructor(options?: Object) {
        this.active = false;
        this.type = undefined;

        for (let i in this) {
            for (let k in options) {
                if (i === k) {
                    this[i] = options[k]
                }
            }
        }

        switch(this.type) {
            /* case CameraType.Array: this.value = new THREE.ArrayCamera(); break;
            case CameraType.Cube: this.value = new THREE.CubeCamera(); break;
            case CameraType.Orthographic: this.value = new THREE.OrthographicCamera(); break;*/
            case CameraType.Perspective: this.value = new THREE.PerspectiveCamera(); break;/* 
            case CameraType.Stereo: this.value = new THREE.StereoCamera(); break;*/
            default: this.value = new THREE.PerspectiveCamera(); break;
        }

    }

}