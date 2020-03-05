import * as shortid from 'shortid';
import { Component } from '../components/Component';

export enum ComponentType {
    Camera = 'Camera'
}

export class Entity {

    id: string;

    components: Component[];

    constructor() {
        this.id = shortid.generate();
        this.components = [];
    }

    addComponent<T extends Component>(Component: new (...args: any) => T, values?: object) {
        let component = new Component(this);

        for (let i in component) {
            for (let k in values) {
                if (i === k) {
                    component[i] = values[k];
                }
            }
        }

        this.components.push(component);
        return this;
    }

    removeComponent(component: Component) {
    }

    hasComponent<T extends Component>(QueriedComponent: new (...args: any) => T) {
        for (let component of this.components) {
            if (component instanceof QueriedComponent) {
                return true;
            }
        }
        return false;
    }

    hasComponents<T extends Component>(QueriedComponents: Array<new (...args: any) => T>) {
        for (let QueriedComponent of QueriedComponents) {
            if (!this.hasComponent(QueriedComponent)) {
                return false;
            }
        }
        return true;
    }

    getComponent<T extends Component>(Component: new (...args: any) => T) {
        for (let component of this.components) {
            if (component instanceof Component) {
                return component;
            }
        }
        return undefined;
    }
}