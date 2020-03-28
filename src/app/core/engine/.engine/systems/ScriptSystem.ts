import { System } from './System';
import { Entity } from '../entities/Entity';
import { Script } from '../components/Script';
import { World } from '../World';
import { AssetManager } from '../managers/AssetManager';

export class ScriptSystem extends System {

    constructor(world: World) {
        super(world);
        this.queries = [Script];
    }


    async initialize(entities: Entity[]) {

        for (let entity of entities) {
            try {
                if (entity.getComponent(Script).value) {
                    entity.getComponent(Script).reload = false;
                } else {
                    this.reloadScript(entity)
                }
            } catch (e) {
                console.warn(entity, e)
            }

        }

    }


    async update(tick: number, entities: Entity[]) {
        for (let entity of entities) {
            if (entity.getComponent(Script).reload) {
                this.reloadScript(entity);
            } try {
                let script: any = entity.getComponent(Script).value;
                if (script) {
                    switch (typeof script) {
                        case 'function': script(tick, entity, this.world); break;
                        case 'object': script.update(tick); break;
                    }
                }
            } catch (e) {
                console.error(entity, e)
                entity.getComponent(Script).value = undefined;
            }
        }

    }

    async reloadScript(entity: Entity) {
        let assetManager = this.world.getManager(AssetManager);

        // check if script exists
        if (!assetManager.assets[entity.getComponent(Script).name]) {
            entity.getComponent(Script).reload = false;
            return console.warn(`Script "${entity.getComponent(Script).name}" doesn't exist!`, entity)

        }

        let scriptAsset = assetManager.assets[entity.getComponent(Script).name];
        let script = new Function('entity, world', scriptAsset.value + 'return new Script(entity, world)')(entity, this.world);
        entity.getComponent(Script).value = script;
        entity.getComponent(Script).reload = false;
    }




}