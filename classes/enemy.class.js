class Enemy extends MovableObject {
    
    energy = 2;

    animateEnemies() {

        
        setInterval(() => {

            if (this.isDead()) this.loadImage(this.IMAGE_DEAD);
            else this.playAnimation(this.IMAGES_WALKING);
        }, 90 / this.speedX); // 
        this.move();
        //console.log('chicken start:',this.x, 'speed:',this.speedX);
    }

    move() {

        if (this.isDead()) {
            setTimeout(() => {
                this.markedForDeletion = true;
            }, 600);
        } else {
            this.moveLeft();
            this.randomBounce();
        }
        (this.x < 0 - this.width) && (this.x = 2 * canvasWidth); //move back into frame 2 ^⁼= amount of canvas-lengths for bgs
        let self = this;
        requestAnimationFrame(() => {
            self.move();
        });
    }
}