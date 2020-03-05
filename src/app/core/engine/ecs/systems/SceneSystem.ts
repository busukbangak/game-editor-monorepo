import { System } from './System';
import { Entity } from '../entities/Entity';

export class SceneSystem extends System {


    constructor() {
        super();

    }


    initialize(entities: Entity[]) {
        console.log(entities);
    }


    update(tick: number, entities: Entity[]) {
        
    }


}