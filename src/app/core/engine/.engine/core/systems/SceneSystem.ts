import { System } from './System';
import { Entity } from '../entities/Entity';
import { Scene } from '../components/Scene';
import { Transform } from '../components/Transform';
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
            let scene = sceneComponent.value;
            let sceneOptions = sceneComponent.options;

            if (sceneOptions) {
                if (sceneOptions.autoUpdate) {
                    scene.autoUpdate = sceneOptions.autoUpdate;
                }
                if (sceneOptions.background) {
                    scene.background = sceneOptions.background;
                }
                if (sceneOptions.environment) {
                    scene.environment = sceneOptions.environment;
                }
                if (sceneOptions.fog) {
                    scene.fog = sceneOptions.fog;
                }
                if (sceneOptions.overrideMaterial) {
                    scene.overrideMaterial = sceneOptions.overrideMaterial;
                }
            }
        }
    }


    update(tick: number, entities: Entity[]) {
    }


}