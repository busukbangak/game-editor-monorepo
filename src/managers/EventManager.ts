import { Manager } from './Manager'
import * as THREE from 'three';

class EventManager extends THREE.EventDispatcher implements Manager {

    events: { [eventname: string]: (event: THREE.Event) => void };

    constructor() {
        super();
        this.events = {};
    }

    on(name: string, event: (event: THREE.Event) => void) {
        this.events[name] = event;
        this.addEventListener(name, this.events[name]);
    }

    off(name: string) {
        this.removeEventListener(name, this.events[name])
    }

    fire(name: string, data: any) {
        if (data) {
            this.dispatchEvent({ type: name, data });
        } else {
            this.dispatchEvent({ type: name });
        }
    }

    got() {

    }
}

export { EventManager };