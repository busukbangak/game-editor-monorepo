import { System } from './System';
import { Entity } from '../entities/Entity';
import { Transform } from '../components/Transform';

export class TransformSystem extends System {


    constructor() {
        super();
        this.queries = [Transform];

    }


    initialize(entities: Entity[]) {
        console.log(entities)
    }


    update(tick: number, entities: Entity[]) {

    }


}