class Enemy extends MovableObject {
    
    energy = 2;
    animationFPS = 25;
    animationFrameInterval = 1000 / this.animationFPS;
    animationFrameTimer = 0;
    hurtSound = new Audio('audio/Hit_02.wav');

    constructor(){
        super();
        this.hurtSound.playbackRate = 1.5;
        this.hurtSound.volume = 0.35;
    }

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
        this.imgY = this.y + 8;
        this.imgX = this.x + 5;
        this.imgWidth = this.width * 0.7;
        this.imgHeight = this.height * 0.75;
    }

    animateEnemies() {
        this.applyGravity();
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
        if (this.x < 0 - 2*this.width) this.x = world.level.levelEndX + 250;
    }

    scoreAgainstEnemy() {
        if( !this.isHurt(400)){ 
            this.receiveHit();
        }
    }

}