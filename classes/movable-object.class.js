class MovableObject extends DrawableObject {

    speedX;
    speedY = 0;
    jumpHeight = 25; 
    acceleration = 2;
    currentImage = 0;
    isReversed_x = false;
    groundLevelY;// = canvasHeight - this.height - 45; //TEST 45px ca. // GN
    energy = 100;
    keyboard = new Keyboard();
    energy = 100;
    lastHit = 0;

    // as sometimes the actual image is much smaller than the size of the png file:
    checkHitarea() { // mb not
        this.imgY = this.y;
        this.imgX = this.x;
        this.imgWidth = this.width;
        this.imgHeight = this.height;
    }
        
    playAnimation(images){
        //setInterval(() => { // 
        let i = this.currentImage % images.length;
        let imgPath = images[i];
        this.img = this.imgCache[imgPath];
        this.currentImage++;
        //}, 90 / this.speedX); // 
    }

    playAnimationOnce(images){
        for(let i = 0; i < images.length; i++ ){
            let imgPath = images[i];
            this.img = this.imgCache[imgPath];
        }
    }

    applyGravity() {

        setInterval( ()=>{
            
            if (this.isAboveGround() || this.speedY > 0) { 
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
            else {  
                this.y = this.groundLevelY;
                this.speedY = 0;
            }

        }, 1000/25);

    }

    moveLeft() {
        this.x -= this.speedX;
    }

    moveRight() {
        this.x += this.speedX;
    }

    jump() {
        this.speedY = this.jumpHeight;
    }
    
    randomBounce() { // bounce left
        Math.random() < 0.3 && !this.isAboveGround() && this.jump();
        Math.random() < 0.4 && this.moveLeft(); // makes it a bit more dynamic? maybe? (if moving left at all)
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

    // mb better function name?? remove?
    isCollidingMultiple(correction = 0, ...objects){
        for (let i = 0; i < objects.length; i++){
            this.isColliding(objects[i], correction);
            // console.log(this,' HIT BY ', objects[i]);
            this.receiveHit();
        }
    }

    isJumpingOn(object) {
        return ( 
            this.isColliding(object) &&
            this.isFalling() &&
            this.imgY + this.imgHeight >= object.imgY && //+ object.imgHeight * 0.9
            this.imgY + this.imgHeight < object.imgY + 25
        );
    }
    
    receiveHit(){
        this.energy -= 2;
        if (this.energy < 0) this.energy = 0;
        if (this.energy > 0) this.lastHit = new Date().getTime(); // Timestamp: ms since 1.1.1970
    }

    receiveEnergy(){
        this.energy += 2;
        if (this.energy > 100) this.energy = 100;
    }
    
    isHurt( ms = 500 ){
        let dt = new Date().getTime() - this.lastHit; // ms since lastHit
        return (dt < ms);
    }
    
    isDead(){
        return (this.energy == 0);
    }

}