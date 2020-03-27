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
                this.reloadScript(entity)
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
                let entityScript: any = entity.getComponent(Script).value;
                if (entityScript) {
                    entityScript.update(tick);
                }
            } catch (e) {
                console.warn(entity, e)
            }
        }

    }

    async reloadScript(entity: Entity) {
        let assetManager = this.world.getManager(AssetManager);

        // check if script exists
        if (!assetManager.assets[entity.getComponent(Script).name]) {
            return console.warn(`Script "${entity.getComponent(Script).name}" doesn't exist!`)
        }

        let scriptAsset = assetManager.assets[entity.getComponent(Script).name];
        let script = new Function('entity, world', scriptAsset.value + 'return new Script(entity, world)')(entity, this.world);
        entity.getComponent(Script).value = script;
        entity.getComponent(Script).reload = false;
    }




}