class MovableObject extends DrawableObject {

    speedX;
    speedY = 0;
    acceleration = 2;
    currentImage = 0;
    isReversed_x = false;
    groundLevel_y;// = canvasHeight - this.height - 45; //TEST 45px ca. // GN
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
            // else { // um Ungenauigkeiten zu vermeiden. (sonst ev. zu viel zu y angerechnet in letztem Schleifendurchlauf. 
            //     this.y = this.groundLevel_y;
            // }

        }, 1000/25);

    }

    moveLeft() {
        this.x -= this.speedX;
    }

    moveRight() {
        this.x += this.speedX;
    }

    jump() {
        this.speedY = 23;
    }
    
    isWalkingRight() {
        return (this.keyboard.RIGHT && this.x < this.world.levelEnd_x);
    }

    isWalkingLeft() {
        return (this.keyboard.LEFT && this.x > 0 )
    }

    isJumping(){
        return (this.keyboard.UP || this.keyboard.SPACE) && !this.isAboveGround();
    }

    isAboveGround(){
        return this.y < this.groundLevel_y;
    }
    
    // Todo: improve collision-detecting functions 
    isCollidingHorizonatlly(object) { // or 'isCollidingX()'? // !!attention: some pictures are a bit bigger than the chracter (Pepe pic much higher and bit wider)
        return ( this.x + this.width > object.x
            && this.x < object.x + object.width 
            && this.y + this.height > object.y + object.height*0.25
            //&& !object.isDead()
            && !this.isAboveGround()
            && !this.isHurt());
            // && this.x < object.x 
        }

    isCollidingVertically(object) { // or isCollidingY ?
        return (this.x + this.width > object.x
            && this.x < object.x + object.width
            && this.y + this.height > object.y 
            && this.y + this.height < object.y + object.height*0.25);
    }

    receiveHit(){
        this.energy -= 2;
        (this.energy < 0) && (this.energy = 0);
        (this.energy > 0) && (this.lastHit = new Date().getTime() ); // Timestamp: ms since 1.1.1970
    }

    receivePoint(){
        this.energy += 2;
        (this.energy > 100) && (this.energy = 100 );
    }
    
    isHurt(){
        let dt = new Date().getTime() - this.lastHit; // ms since lastHit
        return dt < 500;
    }
    
    isDead(){
        return (this.energy == 0);
    }

}