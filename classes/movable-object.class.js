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
    //animationPlaying = false;
    world; // connect to class World
    energy = 100;
    lastHit = 0;

    playAnimation(images){
        //setInterval(() => { // 
            let i = this.currentImage % images.length;
            let imgPath = images[i];
            this.img = this.imgCache[imgPath];
            //console.log(this.imgCache);
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
        return (this.keyboard.RIGHT && this.x < this.world.level.levelEnd_x);
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

    isColliding(object, correction = 0) { // second parameter: optional (estimated) correction factor, as some img files are bigger than actual image
        let objectX = object.x + object.width * correction;
        let objectY = object.y + object.height * correction;
        let objectWidth = object.width - object.width * correction;
        let objectHeight = object.height - object.height * correction;
        // Na toll pepe bild ist auch zu hoch        
        return (
        //horizontal collision
        objectX  < this.x + this.width &&
        objectX  + objectWidth  > this.x &&
        //vertical collision
        objectY  < this.y + this.height &&
        objectY  + objectHeight  > this.y
        )
    }

    isJumpingOn(object) {
        return ( 
            this.isColliding(object, 0.5) &&
            this.isFalling() &&
            //this.y + this.height == object.y
            this.y + this.height >= object.y + object.height * 0.25
        );
    }
    
    receiveHit(){
        this.energy -= 2;
        (this.energy < 0) && (this.energy = 0);
        (this.energy > 0) && (this.lastHit = new Date().getTime() ); // Timestamp: ms since 1.1.1970
    }

    receiveEnergy(){
        this.energy += 2;
        if (this.energy > 100) this.energy = 100;
    }
    
    isHurt(){
        let dt = new Date().getTime() - this.lastHit; // ms since lastHit
        return dt < 500;
    }
    
    isDead(){
        return (this.energy == 0);
    }

}