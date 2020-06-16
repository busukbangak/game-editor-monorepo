import { Manager } from './Manager'
import * as THREE from 'three';
import { EventDispatcher } from 'three';

class EventManager implements Manager {

    private static events: { [eventname: string]: (event: THREE.Event) => void };

    private static eventHandler: EventDispatcher;

    constructor() {
        EventManager.events = {};
        EventManager.eventHandler = new EventDispatcher();
    }

    static on(name: string, event: (event: THREE.Event) => void) {
        this.events[name] = event;
        this.eventHandler.addEventListener(name, this.events[name]);
    }

    static off(name: string) {
        this.eventHandler.removeEventListener(name, this.events[name])
        delete this.events[name];
    }

    static fire(name: string, data: any = null) {
        this.eventHandler.dispatchEvent({type: name, data});

    }

    //TODO: Check if its implemented correctly
    static got(name: string) {
        return this.eventHandler.hasEventListener(name, this.events[name]);
    }
}

export { EventManager };