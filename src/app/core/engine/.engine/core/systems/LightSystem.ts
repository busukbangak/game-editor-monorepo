import { System } from './System';
import { Entity } from '../entities/Entity';
import { Light, LightType } from '../components/Light';
import * as THREE from 'three';

export class LightSystem extends System {


    constructor() {
        super();
        this.queries = [Light];
        
    }


    initialize(entities: Entity[]) {
        for (let entity of entities) {
            let lightComponent = entity.getComponent(Light);
            switch(lightComponent.type) {
                case LightType.Ambient: lightComponent.value = new THREE.AmbientLight(0xffffff); break;
            }
            
        }
    }


    update(tick: number, entities: Entity[]) {
    }


}