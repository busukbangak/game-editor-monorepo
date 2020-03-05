import { Entity } from "./entities/Entity";
import { System } from "./systems/System";

export class World {

    entities: Entity[];

    systems: System[];

    enabled: boolean;

    constructor() {
        this.entities = [];
        this.systems = [];
        this.enabled = true;
    }

    initialize() {
        for (let system of this.systems) {
            system.initialize(this.entities);
        }
    }

    createEntity() {
        let entity = new Entity();
        this.entities.push(entity)  
        return entity;
    }

    removeEntity(entity: Entity) {
    }


    createSystem<T extends System>(System: new (...args: any) => T, values?: object) {
        let system = new System();

        for (let i in system) {
            for (let k in values) {
                if (i === k) {
                    system[i] = values[k];
                }
            }
        }
        this.systems.push(system);
        return system;
    }

    removeSystem(system: System) {
    }

    start() {
        this.enabled = true;
    }

    stop() {
        this.enabled = false;
    }

    update(tick: number) {
        if (!this.enabled) {
            return;
        }

        for (let key in this.systems) {
            if (this.systems[key].enabled) {
                this.systems[key].update(tick, this.entities)
            }
        }
    }
}