class ThrowableObject extends CollectibleObject {

    // TODO wo interval - remove
    throw(x, y){
        this.x = x;
        this.y = y;
        this.speedY = 20;
        this.throwSound.play();

        // TODO: remove interval function
        setInterval( () => {

            this.checkHitarea();
            this.applyGravity();
            if (this.y < this.groundLevelY) {
                if (!world.character.isReversed_x) this.x += 16;
                if (world.character.isReversed_x) this.x -= 16;
            } else {
                this.markedForDeletion = true;
            }

        }, 1000/60);
    }

    animateThrow() {
        setInterval(()=>{
            this.playAnimation(this.IMAGES_ROTATE);
        },1000/20);
    }

    animateSplash() {
        this.playAnimation(this.IMAGES_SPLASH);
        this.splashSound.play();
    }
    

}