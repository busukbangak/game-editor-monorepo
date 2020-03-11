import { System } from './System';
import { Entity } from '../entities/Entity';
import { Camera, CameraType } from '../components/Camera';
import * as THREE from 'three';

export class CameraSystem extends System {


    constructor() {
        super();
        this.queries = [Camera];

    }


    initialize(entities: Entity[]) {
        for (let entity of entities) {
            let cameraComponent = entity.getComponent(Camera);
            switch(cameraComponent.type) {
                /* case CameraType.Array: this.value = new THREE.ArrayCamera(); break;
                case CameraType.Cube: this.value = new THREE.CubeCamera(); break;
                case CameraType.Orthographic: this.value = new THREE.OrthographicCamera(); break;*/
                case CameraType.Perspective: cameraComponent.value = new THREE.PerspectiveCamera(); break;/* 
                case CameraType.Stereo: this.value = new THREE.StereoCamera(); break;*/
            }
            
        }
    }


    update(tick: number, entities: Entity[]) {

    }


}