import { System } from './System';
import { Entity } from '../entities/Entity';
import { ScriptComponent } from '../components/ScriptComponent';
import { World } from '../World';
import { AssetManager, Asset } from '../managers/AssetManager';
import { transpile, ModuleKind, ScriptTarget } from 'typescript';
import { extname } from 'path';

class ScriptSystem extends System {

    constructor(world: World) {
        super(world);
        this.queries = [ScriptComponent];
    }


    async initialize(entities: Entity[]) {

        for (let entity of entities) {
            try {
                let scriptComponent = entity.getComponent(ScriptComponent);

                // If scriptComponent doesnt contain a script asset then skip
                if (!scriptComponent.asset || scriptComponent.value) {
                    continue;
                }

                // initialize script
                await this.initScript(entity);

            } catch (e) {
                console.warn(entity, e)
            }

        }

    }


    async update(tick: number, entities: Entity[]) {

        for (let entity of entities) {
            let scriptComponent = entity.getComponent(ScriptComponent);

            // Skip script, if it isnt enabled
            if (!scriptComponent.enabled) {
                continue;
            }

            // Reload script if condition is set
            if (scriptComponent.reload) {
                await this.reloadScript(entity);
            }

            // If Skip is empty, then skip
            if (!scriptComponent.value) {
                continue;
            }

            // Start script execution, depending on script type
            try {
                let script: any = scriptComponent.value;
                if (script) script.update();
            } catch (e) {
                console.error(entity, e)
                scriptComponent.value = undefined;
            }
        }

    }

    async initScript(entity: Entity) {
        // Get script asset
        let scriptComponent = entity.getComponent(ScriptComponent);
        let scriptAsset = scriptComponent.asset;

        // Get Script language (typescript/javascript)
        let scriptLanguage = extname(scriptAsset.path);

        // Get Script
        let script: string = scriptAsset.value;

        // Prepare typescript scripts, by removing import statements and transpiling it to javascript
        // TODO: Dont remove import words inside of code or somehow support packages
        if (scriptLanguage.includes('ts')) {
            const regex = /import .*/g;
            let match;
            while ((match = regex.exec(script)) !== null) {
                if (match.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                script = script.replace(match, '')
            }
            script = await transpile(script, { target: ScriptTarget.ES2020 })
        }

        // Get Script class name, initialize it and put it into the scriptComponent
        const regex = /class ([\S]+)/g;
        let match;

        while ((match = regex.exec(script)) !== null) {
            if (match.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            let ScriptClass = match[1];
            try {
                let parameters = [];
                scriptComponent.value = new Function(``, script + `return new ${ScriptClass}()`)();
                break;
            } catch (e) {
                // TODO: CATCH ERRORS CORRECTLY
                /*  console.error(e) */
            }
        }

        // Pass entity data to Script
        if (scriptComponent.value) {
            (scriptComponent.value as Entity).id = `script:${entity.id}`;
            (scriptComponent.value as Entity).tags = entity.tags;
            (scriptComponent.value as Entity).world = entity.world;
            (scriptComponent.value as Entity).components = entity.components;
        }

        // Start initialization method of script
        try {
            scriptComponent.value.start();
        } catch (e) {
            console.log(e);
        }

    }

    async reloadScript(entity: Entity) {

        let assetManager = this.world.getManager(AssetManager);
        let scriptComponent = entity.getComponent(ScriptComponent)
        let scriptAsset = scriptComponent.asset;

        /* // check if script exists in the asset database
        if (!assetManager.assets[scriptAsset.name]) {
            scriptComponent.reload = false;
            return console.warn(`Script "${scriptAsset.name}" doesn't exist in the asset database!`, entity)
        } */

        // Reload script to asset database
        scriptAsset = await assetManager.reloadAsset(scriptAsset.name);
        // Overwrite old scriptAsset with updated scriptAsset
        scriptComponent.asset = scriptAsset;
        // Initialize reloaded script on entity
        await this.initScript(entity)
        // Set component reload to false;
        scriptComponent.reload = false;
    }

}

export { ScriptSystem };