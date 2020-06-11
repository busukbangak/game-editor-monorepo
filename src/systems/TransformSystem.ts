import { System } from './System';
import { Entity } from '../entities/Entity';
import { TransformComponent } from '../components/TransformComponent';
import { CameraComponent } from '../components/CameraComponent';
import { ModelComponent } from '../components/ModelComponent';
import { LightComponent } from '../components/LightComponent';
import { World } from '../World';
import { RenderSystem } from './RenderSystem';

class TransformSystem extends System {


    constructor(world: World) {
        super(world);
        this.queries = [TransformComponent];
    }


    initialize(entities: Entity[]) {
        for (let entity of entities) {

            let transformComponent = entity.getComponent(TransformComponent);
            let transform = transformComponent.value;
 
            // add all the other components with position to grouped transform element
            for (let component of entity.components) {
                if (component instanceof CameraComponent) {
                    transform.add(component.value)
                }
                if (component instanceof ModelComponent) {
                    transform.add(component.value)
                }
                if (component instanceof LightComponent) {
                    transform.add(component.value)
                }
            }

            // If entity doesnt have a parent, add it to the active scene from renderer system
            if(!transformComponent.parent) {
                let activeSceneComponent = (this.world.systems[0] as RenderSystem).activeScene
                let activeScene = activeSceneComponent.value;
                activeScene.add(transform)

                transformComponent.parent = activeSceneComponent;
            }
        }

    }


    update(tick: number, entities: Entity[]) {
        for (let entity of entities) {

            let transformComponent = entity.getComponent(TransformComponent);
            let transform = transformComponent.value;

            if(!transform) {
                transform = (this.world.systems[2] as RenderSystem).activeScene.value;
            }

            // add all the other components with position to grouped transform element
            for (let component of entity.components) {
                if (component instanceof CameraComponent) {
                    transform.add(component.value)
                }
                if (component instanceof ModelComponent) {
                    transform.add(component.value)
                }
                if (component instanceof LightComponent) {
                    transform.add(component.value)
                }
            }
            // If entity doesnt have a parent, add it to the active scene from renderer system
            if(!transformComponent.parent) {
                let activeSceneComponent = (this.world.systems[0] as RenderSystem).activeScene
                let activeScene = activeSceneComponent.value;
                activeScene.add(transform)

                transformComponent.parent = activeSceneComponent;
            }
        }
    }
}

export { TransformSystem };