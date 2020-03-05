import { System } from './System';
import { Entity } from '../entities/Entity';
import { Light } from '../components/Light';

export class LightSystem extends System {


    constructor() {
        super();
        this.queries = [Light];

    }


    initialize(entities: Entity[]) {
        console.log(entities)
    }


    update(tick: number, entities: Entity[]) {
    }


}