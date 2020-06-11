import { System } from './System';
import { Entity } from '../entities/Entity';
import { ScriptComponent } from '../components/ScriptComponent';
import { World } from '../World';
import { AssetManager } from '../managers/AssetManager';

class ScriptSystem extends System {

    constructor(world: World) {
        super(world);
        this.queries = [ScriptComponent];
    }


    async initialize(entities: Entity[]) {

        for (let entity of entities) {
            try {
                if (entity.getComponent(ScriptComponent).value) {
                    entity.getComponent(ScriptComponent).reload = false;
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
            if (entity.getComponent(ScriptComponent).reload) {
                this.reloadScript(entity);
            } try {
                let script: any = entity.getComponent(ScriptComponent).value;
              /*   console.log(typeof script) */ 
                if (script) {
                    switch (typeof script) {
                        case 'function': script(entity, this.world); break;
                        case 'object': script.update(entity, this.world); break;
                    }
                }
            } catch (e) {
                console.error(entity, e)
                entity.getComponent(ScriptComponent).value = undefined;
            }
        }

    }

    async reloadScript(entity: Entity) {
        let assetManager = this.world.getManager(AssetManager);

        // check if script exists
        if (!assetManager.assets[entity.getComponent(ScriptComponent).name]) {
            entity.getComponent(ScriptComponent).reload = false;
            return console.warn(`Script "${entity.getComponent(ScriptComponent).name}" doesn't exist!`, entity)

        }

        let scriptAsset = assetManager.assets[entity.getComponent(ScriptComponent).name];
        let script = new Function('entity, world', scriptAsset.value + 'return new Script(entity, world)')(entity, this.world);
        entity.getComponent(ScriptComponent).value = script;
        entity.getComponent(ScriptComponent).reload = false;
    }
}

export { ScriptSystem };