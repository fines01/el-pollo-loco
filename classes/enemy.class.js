class Enemy extends MovableObject {
    
    energy = 2;
    //receivedHit = false;

    scoreAgainstEnemy() {

        if( !this.isHurt(1000) ){ // has not been hit in the last 1000ms ( !isHurt(1000) ) OR !receivedHit (wann wieder true setzen)
            this.receivedHit = true;
            this.score++;
            world.character.receiveEnergy();
            this.receiveHit();
            // console.log(this, this.energy);
        }
    }

    animateEnemies() {
        
        setInterval(() => {
            if (this.isDead()) this.loadImage(this.IMAGE_DEAD);
            else this.playAnimation(this.IMAGES_WALKING);
        }, 1000/25); // 
        this.move();
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
        if (this.x < 0 - this.width) this.x = world.level.levelEndX; //move back into frame 

    }
}