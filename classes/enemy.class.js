class Enemy extends MovableObject {
    
    energy = 2;
   
    // for controlling animation-fps with requestAnimationFrame()
    animationFPS = 20; //25;
    animationFrameInterval = 1000 / this.animationFPS;
    animationFrameTimer = 0; //cycles between 0 and Animation-FrameInterval

    checkAnimationFrameTime(deltaTime){
        if (this.animationFrameTimer > this.animationFrameInterval) {
            if (this instanceof Endboss) this.animateEndboss();
            else this.animateEnemies();
            this.animationFrameTimer = 0;
        } else {
            this.animationFrameTimer += deltaTime;
        }
    }

    checkHitarea() {
        this.imgY = this.y + 7;
        this.imgX = this.x + 5;
        this.imgWidth = this.width * 0.85;
        this.imgHeight = this.height * 0.79;
    }

    animateEnemies() {
        if (this.isDead()) this.loadImage(this.IMAGE_DEAD);
        else this.playAnimation(this.IMAGES_WALKING);
    }

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
        if (this.x < 0 - 2*this.width) this.x = world.level.levelEndX + 250; //move back into frame 

    }

    scoreAgainstEnemy() {

        if( !this.isHurt(1000)){ // has not been hit in the last 1000ms ( !isHurt(1000) ) OR !receivedHit (wann wieder true setzen)
            this.receivedHit = true;
            this.score++;
            world.character.receiveEnergy();
            this.receiveHit();
            // console.log(this, this.energy);
        }
    }

}