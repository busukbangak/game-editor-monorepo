import { System } from './System';
import { Entity } from '../entities/Entity';
import { Model } from '../components/Model';

export class ModelSystem extends System {


    constructor() {
        super();
        this.queries = [Model];

    }


    initialize(entities: Entity[]) {
        console.log(entities)
    }


    update(tick: number, entities: Entity[]) {
        
    }


}