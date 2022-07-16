class MovableObject extends DrawableObject {

    speedX;
    speedY = 0;
    jumpHeight = 25; 
    acceleration = 2;
    currentImage = 0;
    isReversed_x = false;
    groundLevelY;// = canvasHeight - this.height - 45;
    energy = 100;
    keyboard = new Keyboard();
    energy = 100;
    lastHit = 0;

    checkHitarea() { // mb not
        this.imgY = this.y;
        this.imgX = this.x;
        this.imgWidth = this.width;
        this.imgHeight = this.height;
    }
        
    playAnimation(images){
        let i = this.currentImage % images.length;
        let imgPath = images[i];
        this.img = this.imgCache[imgPath];
        this.currentImage++;
    }

    createAudio(...audioPaths) {
        let audios = [];
        for (let i = 0; i < audioPaths.length; i++) {
            let audio = new Audio (audioPaths[i]);
            audios.push(audio);
        }
        if (audios.length === 1) return audios[0];
        else return audios;
    }

    playAnimationOnce(images){
        for(let i = 0; i < images.length; i++ ){
            let imgPath = images[i];
            this.img = this.imgCache[imgPath];
        }
    }

    applyGravity() {           
            if (this.isAboveGround() || this.speedY > 0) { 
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                // if on ground again: play landing sound
            } 
            else {  
                this.y = this.groundLevelY;
                this.speedY = 0;
            }
    }

    moveLeft() {
        this.x -= this.speedX;
    }

    moveRight() {
        this.x += this.speedX;
    }

    jump() {
        this.speedY = this.jumpHeight;
        if(this.jumpingSound) this.jumpingSound.play();
    }
    
    randomBounce() { // bounce left
        if (Math.random() < 0.3 && !this.isAboveGround()) this.jump();
        if (Math.random() < 0.4) this.moveLeft(); // adds a bit moredynamic
    }

    isWalkingRight() {
        return (this.keyboard.RIGHT && this.x < this.world.level.levelEndX);
    }

    isWalkingLeft() {
        return (this.keyboard.LEFT && this.x > 0 )
    }

    isJumping(){
        return (this.keyboard.UP || this.keyboard.SPACE) && !this.isAboveGround();
    }

    isFalling() {
        return (this.speedY < 0);
    }

    isAboveGround(){
        return this.y < this.groundLevelY;
    }

    isColliding(object) {
        return (
            //horizontal collision
            object.imgX < this.imgX + this.imgWidth && 
            object.imgX + object.imgWidth > this.imgX && 
            //vertical collision
            object.imgY < this.imgY + this.imgHeight &&
            object.imgY + object.imgHeight > this.imgY
        )
    }

    isJumpingOn(object) {
        return ( 
            this.isColliding(object) &&
            this.isFalling() &&
            this.imgY + this.imgHeight >= object.imgY && //+ object.imgHeight * 0.9
            this.imgY + this.imgHeight < object.imgY + 25
        );
    }

    isEnemy(obj) {
        return (obj instanceof Chicken || obj instanceof Chick || obj instanceof Endboss);
    }
    
    // receiveEnergy(){
    //     this.energy += 0.5;
    //     if (this.energy > 100) this.energy = 100;
    // }

    receiveHit(){
        this.energy -= 2;
        if (this.energy < 0) this.energy = 0;
        if (this.energy > 0) this.lastHit = Date.now();
        if (this.hurtSound) this.hurtSound.play();
    }
    
    isHurt( ms = 125 ){
        let deltaTime = Date.now() - this.lastHit; // ms since lastHit
        return (deltaTime < ms);
    }
    
    isDead(){
        return (this.energy == 0);
    }

}