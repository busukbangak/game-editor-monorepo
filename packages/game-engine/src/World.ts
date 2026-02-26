import { Entity } from "./entities/Entity";
import { System } from "./systems/System";
import { ScriptSystem } from './systems/ScriptSystem';
import { TransformSystem } from './systems/TransformSystem';
import { RenderSystem } from './systems/RenderSystem';
import { Manager } from "./managers/Manager";
import { AssetManager } from "./managers/AssetManager";
import { EventManager } from "./managers/EventManager";
import { Component } from "./components/Component";
import * as Stats from "stats-js";
import { StatisticManager } from "./managers/StatisticManager";


/**
 * World
 */
class World {

    entities: Entity[];

    systems: System[];

    managers: Manager[];

    tick: number;

    initialized: boolean;

    enabled: boolean;

    constructor() {
        // Default initialization
        this.entities = [];
        this.systems = [];
        this.managers = [];
        this.tick = 0;
        this.initialized = false;
        this.enabled = false;

        // Create default managers
        this.addManager(AssetManager);
        this.addManager(EventManager);
        this.addManager(StatisticManager);

        // create default systems
        this.addSystem(RenderSystem);
        this.addSystem(ScriptSystem);
        this.addSystem(TransformSystem);

    }

    async initialize() {

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

    addEntity(name?: string): Entity;
    addEntity(entity?: Entity): Entity;
    addEntity(entityOrName?: string | Entity): Entity {
        let entity: Entity;
        if (entityOrName instanceof Entity) {
            entity = entityOrName;
        } else if (typeof entityOrName === 'string') {
            entity = new Entity(entityOrName);
        } else {
            entity = new Entity();
        }
        this.entities.push(entity);
        return entity;
    }

    removeEntity(entity: Entity) {
    }

    addSystem<T extends System>(System: new (...args: any) => T, values?: object) {
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

    addManager<T extends Manager>(Manager: new (...args: any) => T, values?: object) {
        let manager = new Manager();

        for (let i in manager) {
            for (let k in values) {
                if (i === k) {
                    manager[i] = values[k];
                }
            }
        }
        this.managers.push(manager);
        return manager;
    }

    removeManager() { 
        
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
        StatisticManager.beginMonitoring();

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

        StatisticManager.endMonitoring();
        this.tick = requestAnimationFrame(() => this.update(this.tick));
    }
}

export { World };