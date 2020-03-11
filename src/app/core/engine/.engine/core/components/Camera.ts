
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
        this.active = active;
        this.type = type;
        this.value = undefined;
    }

}