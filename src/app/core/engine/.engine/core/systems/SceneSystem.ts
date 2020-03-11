import { System } from './System';
import { Entity } from '../entities/Entity';
import { Scene } from '../components/Scene';
import * as THREE from 'three';

export class SceneSystem extends System {


    constructor() {
        super();
        this.queries = [Scene];

    }


    initialize(entities: Entity[]) {
        for (let entity of entities) {
            // update passed renderer values
            let sceneComponent = entity.getComponent(Scene);

            if (!sceneComponent.value) {
                sceneComponent.value = new THREE.Scene();
            }

            let scene = sceneComponent.value;

            if (sceneComponent.autoUpdate) {
                scene.autoUpdate = sceneComponent.autoUpdate;
            }
            if (sceneComponent.background) {
                scene.background = sceneComponent.background;
            }
            if (sceneComponent.environment) {
                scene.environment = sceneComponent.environment;
            }
            if (sceneComponent.fog) {
                scene.fog = sceneComponent.fog;
            }
            if (sceneComponent.overrideMaterial) {
                scene.overrideMaterial = sceneComponent.overrideMaterial;
            }

        }

    }


    update(tick: number, entities: Entity[]) {

    }


}