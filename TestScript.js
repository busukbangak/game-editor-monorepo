class Script {

    constructor(entity, world) {
        this.entity = entity;
        this.world = world;

    }

    update(tick) {
        this.entity.components[1].value.rotation.y += 0.1;
        this.entity.components[1].value.rotation.x += 0.1;
        this.entity.components[1].value.position.x = -1;
        /*  console.log('script1') *//* 
        this.entity.dispatchEvent({ type: 'start', message: 'vroom vroom!' }); */
    }

}