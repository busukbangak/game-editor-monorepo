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

/**
 * World
 */
class World {

    entities: Entity[];

    systems: System[];

    assemblages: { [name: string]: Component[] };

    managers: Manager[];

    tick: number;

    stats: any;

    initialized: boolean;

    enabled: boolean;

    constructor() {
        // Default initialization
        this.entities = [];
        this.systems = [];
        this.assemblages = {};
        this.managers = [];
        this.tick = 0;
        this.initialized = false;
        this.enabled = false;

        // Init stats
        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);
        this.hideStats();

        // Create default managers
        this.managers.push(new AssetManager());
        this.managers.push(new EventManager());

        // Create default assemblages
        /* this.createAssemblage('default-renderer', new RendererEntity());
        this.createAssemblage('default-scene', new SceneEntity());
        this.createAssemblage('default-camera', new CameraEntity()); */

        // create default systems
        this.createSystem(RenderSystem);
        this.createSystem(ScriptSystem);
        this.createSystem(TransformSystem);
        
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

    getEntity() { }


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

    addSystem() { }

    removeSystem(system: System) {
    }

    getSystem() { }

    createAssemblage(name: string, entity: Entity) {
    }

    addAssemblage() { }

    removeAssemblage() { }

    getAssemblage(name: string) {
        return this.assemblages[name];
    }

    createManager() { }

    addManager(manager: Manager) {
        this.managers.push(manager);
    }

    removeManager() { }

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

    showStats() {
        this.stats.showPanel(0);
    }

    hideStats() {
        this.stats.showPanel(3);
    }

    update(tick: number) {
        this.stats.begin();

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

        this.stats.end();
        this.tick = requestAnimationFrame(() => this.update(this.tick));
    }
}

export { World };