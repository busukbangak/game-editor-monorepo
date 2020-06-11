import { Entity } from './Entity';
import { RendererComponent } from '../components/RendererComponent';

class RendererEntity extends Entity {
    

    constructor(canvas?: HTMLCanvasElement) {
        super();


        this.addComponent(RendererComponent, { 
            active: true,
            canvas: canvas, 
            antialias: true, 
            alpha: true,
            resize: true
        });

    }
}

export { RendererEntity };