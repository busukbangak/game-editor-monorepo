class Script {

    constructor(entity, THREE) {
        this.entity = entity;
        this.THREE = THREE;
        this.entity.addEventListener('start', function (event) {

            console.log(event.message)

        });
    }

    update(tick) {/* 
        console.log('script2') */
    }

}
