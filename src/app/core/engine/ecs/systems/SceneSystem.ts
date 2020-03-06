import { System } from './System';
import { Entity } from '../entities/Entity';
import { Scene } from '../components/Scene';
import { Transform } from '../components/Transform';

export class SceneSystem extends System {


    constructor() {
        super();
        this.queries = [Scene];
    }


    initialize(entities: Entity[]) {
        for (let entity of entities) {
            let sceneObject = entity.getComponent(Scene).value;

            for (let component of entity.components) {
                if (component instanceof Transform) {
                    sceneObject.add(component.value)
                }
            }
        }
    }


    update(tick: number, entities: Entity[]) {
    }


}