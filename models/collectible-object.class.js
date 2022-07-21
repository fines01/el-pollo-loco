class CollectibleObject extends MovableObject { 
    
    // TODO: REMOVE Class?!

    animationFPS = 2;
    animationFrameInterval = 1000 / this.animationFPS;
    animationFrameTimer = 0;

    checkAnimationFrameTime(deltaTime) { // here instead of in bottle and coin extra?
        if (this.animationFrameTimer > this.animationFrameInterval) {
            this.pulse(6);
            this.animationFrameTimer = 0;
        } else {
            this.animationFrameTimer += deltaTime;
        }
    }
}