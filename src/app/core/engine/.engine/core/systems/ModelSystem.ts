import { System } from './System';
import { Entity } from '../entities/Entity';
import { Model, ModelType } from '../components/Model';
import * as THREE from 'three';

export class ModelSystem extends System {


    constructor() {
        super();
        this.queries = [Model];

    }


    initialize(entities: Entity[]) {
        for (let entity of entities) {
            let modelComponent = entity.getComponent(Model);
            switch (modelComponent.type) {
                case ModelType.Box: modelComponent.value = new THREE.Mesh(new THREE.BoxGeometry()); break;
                case ModelType.Cone: modelComponent.value = new THREE.Mesh(new THREE.ConeGeometry()); break;
            }

            if(modelComponent.material) {
                modelComponent.value.material = modelComponent.material;
            }
        }

    }


    update(tick: number, entities: Entity[]) {

    }


}