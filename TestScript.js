class Script {

    constructor(entity, THREE) {
        this.entity = entity;
        this.THREE = THREE;
        /*  this.entity = entity; */
    }

    update(tick) {
        this.entity.components[1].value.children[0].material.wireframe = true;
        this.entity.components[1].value.rotation.y += tick * 0.01;
        this.entity.components[1].value.rotation.x += tick * 0.01;
        /*  console.log('script1') */
        this.entity.dispatchEvent({ type: 'start', message: 'vroom vroom!' });
    }

}