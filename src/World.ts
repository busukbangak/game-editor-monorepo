import { Entity } from "./entities/Entity";
import { System } from "./systems/System";
import { ScriptSystem } from './systems/ScriptSystem';
import { TransformSystem } from './systems/TransformSystem';
import { RenderSystem } from './systems/RenderSystem';
import { Manager } from "./managers/Manager";
import { AssetManager } from "./managers/AssetManager";
import { EventManager } from "./managers/EventManager";

class World {

    entities: Entity[];

    systems: System[];

    assemblages: Entity[];

    managers: Manager[];

    tick: number;

    initialized: boolean;

    enabled: boolean;
    

    constructor() {
        this.entities = [];
        this.systems = [];
        this.assemblages = [];
        this.managers = [];
        this.tick = 0;
        this.initialized = false;
        this.enabled = false;

        this.managers.push(new AssetManager())
        this.managers.push(new EventManager())

    }

    async initialize() {
        
        // create default systems
        
        this.createSystem(RenderSystem);
        this.createSystem(ScriptSystem);
        this.createSystem(TransformSystem);

        // initialize systems
        for (let system of this.systems) {
            await system.initialize(this.entities.filter((entity) => {
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

    addEntity(entity: Entity) {
        this.entities.push(entity)
        return entity;
    }

    removeEntity(entity: Entity) {
    }


    createSystem<T extends System>(System: new (...args: any) => T, values?: object) {
        let system = new System(this);

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

    getManager<T extends Manager>(Manager: new (...args: any) => T) {
        for (let manager of this.managers) {
            if (manager instanceof Manager) {
                return manager;
            }
        }
        return undefined;
    }

    start() {
        if (!this.initialized) {
            this.initialize();
            this.initialized = true;
        }
        if (this.enabled) {
            console.warn('Application is already running');
        }
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

export { World };