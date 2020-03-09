import { System } from './System';
import { Entity } from '../entities/Entity';
import { Script } from '../components/Script';
import { readFileSync } from 'fs';
import * as THREE from 'three';

export class ScriptSystem extends System {

    scripts;

    constructor() {
        super();
        this.queries = [Script];
        this.scripts = [];
    }


    async initialize(entities: Entity[]) {

        let eventDispatcher = new THREE.EventDispatcher();

        let script1 = new Function('entity, THREE', readFileSync('/Users/user/Desktop/desktop-game-editor/TestScript.js', 'utf8')
            + 'return new Script(entity, THREE)')(eventDispatcher, THREE);
        this.scripts.push(script1);

        let script2 = new Function('entity, THREE', readFileSync('/Users/user/Desktop/desktop-game-editor/TestScript2.js', 'utf8')
            + 'return new Script(entity, THREE)')(eventDispatcher, THREE);
        this.scripts.push(script2);

        try {
            for (let script of this.scripts) {
                    script.update(0);   
            }
        } catch (e) {

            console.log(e)
        }

    }


    update(tick: number, entities: Entity[]) {
        for (let entity of entities) {

        }

        this.scripts = []



    }


}