import { Entity } from "./entities/Entity";
import { System } from "./systems/System";

export class World {

    entities: Entity[];

    systems: System[];

    tick: number;

    enabled: boolean;

    constructor() {
        this.entities = [];
        this.systems = [];
        this.enabled = true;
    }

    initialize() {
        // initialize systems
        for (let system of this.systems) {
            system.initialize(this.entities.filter((entity) => {
                for (let query of system.queries) {
                    if (entity.hasComponent(query)) {
                        return entity;
                    }
                }
            }));
        }

        // Start application loop when document is loaded
        if (document.readyState !== 'loading') {
            this.update(this.tick);
        } else {
            window.addEventListener('DOMContentLoaded', () => this.update(this.tick));
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
        // TODO: Check if this is good or bad
        this.initialize();
        this.enabled = true;
    }

    stop() {
        this.enabled = false;
    }

    update(tick: number) {
        if (this.enabled) {
            for (let system of this.systems) {
                if (system.enabled) {
                    system.update(tick, this.entities.filter((entity) => {
                        if (entity.hasComponents(system.queries)) {
                            return entity;
                        }
                    }));
                }
            }
        }

        this.tick = requestAnimationFrame(() => {
            this.update(this.tick);
        });
    }
}