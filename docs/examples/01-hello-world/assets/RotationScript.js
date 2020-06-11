class RotationScript {

    x = 0.01;

    y = 0.01;

    update(entity, world) {
        entity.getComponent(DOT.Transform).value.rotation.x += this.x;
        entity.getComponent(DOT.Transform).value.rotation.y += this.y;
    }
}