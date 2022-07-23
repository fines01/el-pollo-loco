class ThrowableObject extends CollectibleObject {

    /**
     * Sets throw coordinates for the beginning of a throw, 
     * assigns object's velocity a positive number
     * and plays throw animation (only needs to be played once at beginning)
     * @todo cleanup function (single functionality) --> play throw sound here?
     * @param {number} x - x coordinate for start of throw
     * @param {number} y - y coordinate for start of throw
     */
    setThrowStart(x, y){
        this.x = x;
        this.y = y;
        this.speedY = 20;
        this.isThrown = true;
        this.throwSound.play();
        this.applyThrowMovement();
    }
    
    /**
     * Sets an interval to apply gravitation and update the throw movement accordingly
     * @todo [DECIDE IF:] maybe remove setInterval(): apply this in main game loop, instead of using an interval function here
     */
    applyThrowMovement(){ // moveThrowObj or moveThrow() to stay a bit more consistent?
        setInterval(() => {
            this.checkHitarea();
            this.applyGravity();
            if (this.y < this.groundLevelY) {
                if (!world.character.isReversed_x) this.x += 16;
                if (world.character.isReversed_x) this.x -= 16;
            } else {
                this.markedForDeletion = true;
            }
        }, 1000 / 60);
    }

    /**
     * play throw animation
     * @todo [DECIDE IF:] remove setInterval() function & instead apply checkAnimationFrameTime() here as well?
     * @todo [DECIDE IF:] play throw sound here (but only at the beginning of the throw, so only at first animation loop)
     */
    animateThrow() {
        setInterval(()=>{
            this.playAnimation(this.IMAGES_ROTATE);
        },1000/20);
    }

    /**
     * play visual and auditory splash animation
     */
    animateSplash() {
        this.playAnimation(this.IMAGES_SPLASH);
        this.splashSound.play();
    }
    
}