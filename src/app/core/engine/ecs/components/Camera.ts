import { Component } from "./Component";
import { Entity } from "../entities/Entity";

export enum CameraType {
    Perspective = 'Perspective',
    Orthographic = 'Orthographic'
}


export class Camera extends Component {

    cameraType: CameraType;

    constructor(entity: Entity, cameraType: CameraType = CameraType.Perspective) {
        super(entity);
        this.cameraType = cameraType;

    }

}