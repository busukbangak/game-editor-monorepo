import { System } from './System';
import { Entity } from '../entities/Entity';
import { Script } from '../components/Script';
import { readFileSync } from 'fs';
import * as THREE from 'three';
import { Application } from '../../Application';

export class ScriptSystem extends System {

    scripts;

    app: Application;

    constructor(app: Application) {
        super();
        this.app = app;
        this.queries = [Script];
        this.scripts = [];
    }


    async initialize(entities: Entity[]) {

        let script1 = new Function('entity, THREE', readFileSync('./TestScript.js', 'utf8')
            + 'return new Script(entity, THREE)')(entities[0], this.app);
        this.scripts.push(script1);

        let script2 = new Function('entity, THREE', readFileSync('./TestScript2.js', 'utf8')
            + 'return new Script(entity, THREE)')(entities[0], this.app);
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