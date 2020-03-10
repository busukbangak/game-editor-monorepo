
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

    constructor(active = false, type: CameraType = CameraType.Perspective) {

        switch(type) {
            /* case CameraType.Array: this.value = new THREE.ArrayCamera();
            case CameraType.Cube: this.value = new THREE.CubeCamera();
            case CameraType.Orthographic: this.value = new THREE.OrthographicCamera(); */
            case CameraType.Perspective: this.value = new THREE.PerspectiveCamera();/* 
            case CameraType.Stereo: this.value = new THREE.StereoCamera(); */
        }
        this.active = active;
    }

}