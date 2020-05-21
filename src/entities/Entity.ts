import { nanoid } from 'nanoid';
import { Component } from '../components/Component';

enum ComponentType {
    Camera = 'Camera'
}

class Entity {

    id: string;

    components: Component[];

    constructor() {
        this.id = nanoid();
        this.components = [];
    }

    addComponent<T extends Component>(Component: new (...args: any) => T, values?: Object) {
        let component = new Component(values);
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

export { Entity, ComponentType };