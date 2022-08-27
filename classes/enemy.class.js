class Enemy extends MovableObject {
    
    energy = 2;
    animationFPS = 25;
    animationFrameInterval = 1000 / this.animationFPS;
    animationFrameTimer = 0;
    hurtSound = new Audio('audio/Hit_02.wav');

    /**
     * Sets the enemies sound properties and speed modifier
     */
    constructor(){
        super();
        this.hurtSound.playbackRate = 1.5;
        this.hurtSound.volume = 0.35;
        this.speedModifier = (levelCounter - 1) * 0.4; // todo change speed modifier 
    }

    /**
     * Compares the elapsed time in ms since the last animation frame to the object's defined animation frame interval,
     * applies the animation if enough time has passed.
     * @param {number} deltaTime - ms since the last animation frame was served in the game-loop 
     */
    checkAnimationFrameTime(deltaTime){
        if (this.animationFrameTimer > this.animationFrameInterval) {
            if (this instanceof Endboss) this.animateEndboss();
            else this.animateEnemies();
            this.animationFrameTimer = 0;
        } else {
            this.animationFrameTimer += deltaTime;
        }
    }

    /**
     * Corrects the dimensions of an object 's actual hit area compared to the dimensions of its image element
     */
    checkHitarea() {
        this.imgY = this.y + 8;
        this.imgX = this.x + 5;
        this.imgWidth = this.width * 0.7;
        this.imgHeight = this.height * 0.75;
    }

    /**
     * Plays enemy animations for chicks and chicken
     */
    animateEnemies() {
        this.applyGravity();
        if (this.isDead()) this.loadImage(this.IMAGE_DEAD);
        else this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Contains all enemie animations to be called in the checkAnimationFrameTime(dt) function
     */
    animate() {
        if (this instanceof Endboss) this.animateEndboss();
        else this.animateEnemies();
    }

    /**
     * Updates enemy movement on canvas
     */
    move() {
        this.checkHitarea();
        if (this.isDead()) {
            setTimeout(() => {
                this.markedForDeletion = true;
            }, 800);
        } else {
            this.moveLeft();
            this.randomBounce();
        }
        if (this.x < 0 - 2*this.width) this.x = world.level.levelEndX + 250;
    }

    /**
     * Hits enemy if it isn't already in hurt mode
     */
    scoreAgainstEnemy() {
        if( !this.isHurt(400)){ 
            this.receiveHit();
        }
    }

}