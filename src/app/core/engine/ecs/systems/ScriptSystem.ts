import { System } from './System';
import { Entity } from '../entities/Entity';
import { Script } from '../components/Script';
import * as tsParser from 'typescript-parser';
import { readFileSync } from 'fs';
import { Transform } from '../components/Transform'

export class ScriptSystem extends System {


    constructor() {
        super();
        this.queries = [Script];
    }


    async initialize(entities: Entity[]) {

        for (let entity of entities) {

        }
    }


    update(tick: number, entities: Entity[]) {
        for (let entity of entities) {
            try {
                entity.getComponent(Script).value = readFileSync('/Users/user/Desktop/desktop-game-editor/TestScript.js', 'utf8');
                const script = eval(`
                (function (element) { 
                    ${entity.getComponent(Script).value}
                    
                    let soundPlayer = new SoundPlayer('meow');
                    
                    return soundPlayer;
                })`);

                console.log(script().playSound())

            } catch (e) {
                console.log(e)
            }
        }

    }


}