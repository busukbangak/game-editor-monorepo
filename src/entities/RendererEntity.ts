import { Entity } from './Entity';
import { Renderer } from '../components/Renderer';

class RendererEntity extends Entity {
    

    constructor(canvas) {
        super();


        this.addComponent(Renderer, { 
            active: true,
            canvas: canvas, 
            antialias: true, 
            alpha: true 
        });

    }
}

export { RendererEntity };