import { System } from './System';
import { Entity } from '../entities/Entity';
import { Script } from '../components/Script';

export class ScriptSystem extends System {


    constructor() {
        super();
        this.queries = [Script];

    }


    initialize(entities: Entity[]) {
        console.log(entities)
    }


    update(tick: number, entities: Entity[]) {
        
    }


}