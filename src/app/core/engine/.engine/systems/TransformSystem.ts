import { System } from './System';
import { Entity } from '../entities/Entity';
import { Transform } from '../components/Transform';
import { Camera } from '../components/Camera';
import { Model } from '../components/Model';
import { Light } from '../components/Light';

export class TransformSystem extends System {


    constructor() {
        super();
        this.queries = [Transform];

    }


    initialize(entities: Entity[]) {
        for (let entity of entities) {
            let transformObject = entity.getComponent(Transform).value;

            for (let component of entity.components) {
                if (component instanceof Camera) {
                    transformObject.add(component.value)
                }
                if (component instanceof Model) {
                    transformObject.add(component.value)
                }
                if (component instanceof Light) {
                    transformObject.add(component.value)
                }
            }
        }
    }


    update(tick: number, entities: Entity[]) {
    }


}