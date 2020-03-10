import { System } from './System';
import { Entity } from '../entities/Entity';
import { Camera } from '../components/Camera';

export class CameraSystem extends System {


    constructor() {
        super();
        this.queries = [Camera];

    }


    initialize(entities: Entity[]) {
        console.log(entities)
    }


    update(tick: number, entities: Entity[]) {
        
    }


}