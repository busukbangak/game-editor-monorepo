import { System } from './System';
import { Entity } from '../entities/Entity';
import { ScriptComponent, Script } from '../components/ScriptComponent';
import { World } from '../World';
import { AssetManager, Asset } from '../managers/AssetManager';
import { transpile, ModuleKind, ScriptTarget } from 'typescript';
import { extname } from 'path';
import * as DOT from '../index';

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

        // Remove import statements since DOT is injected into the script scope
        const importRegex = /import .*/g;
        let importMatch;
        while ((importMatch = importRegex.exec(script)) !== null) {
            if (importMatch.index === importRegex.lastIndex) {
                importRegex.lastIndex++;
            }
            script = script.replace(importMatch[0], '')
        }

        // Transpile TypeScript scripts to JavaScript
        if (scriptLanguage.includes('ts')) {
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
                // Make DOT available in script scope by passing it as a parameter
                scriptComponent.value = new Function('DOT', `return (function() { ${script}; return new ${ScriptClass}(); })()`)(DOT);
                break;
            } catch (e) {
                // TODO: CATCH ERRORS CORRECTLY
                console.error('Error initializing script:', e)
            }
        }

        // Pass entity data to Script
        if (scriptComponent.value) {
            (scriptComponent.value as Script).entity = entity;
        }

        // Start initialization method of script
        if (scriptComponent.value && scriptComponent.value.start) {
            try {
                scriptComponent.value.start();
            } catch (e) {
                console.error('Error in script start():', e);
            }
        }

    }

    async reloadScript(entity: Entity) {

        let scriptComponent = entity.getComponent(ScriptComponent)
        let scriptAsset = scriptComponent.asset;

        /* // check if script exists in the asset database
        if (!AssetManager.assets[scriptAsset.name]) {
            scriptComponent.reload = false;
            return console.warn(`Script "${scriptAsset.name}" doesn't exist in the asset database!`, entity)
        } */

        // Reload script to asset database
        scriptAsset = await AssetManager.reloadAsset(scriptAsset.name);
        // Overwrite old scriptAsset with updated scriptAsset
        scriptComponent.asset = scriptAsset;
        // Initialize reloaded script on entity
        await this.initScript(entity)
        // Set component reload to false;
        scriptComponent.reload = false;
    }

}

export { ScriptSystem };