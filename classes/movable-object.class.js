class MovableObject extends DrawableObject {

    speedX;
    speedY = 0;
    acceleration = 2;
    currentImage = 0;
    isReversed_x = false;
    groundLevel_y;// = canvasHeight - this.height - 45; //TEST 45px ca. // GN
    energy = 100; // energy reserve
    keyboard = new Keyboard();
    //animationPlaying = false;
    world; // connect to class World to have access to props level & camera_x...? ov pepe: mabe through DrawableObject extends World?? aber macht das sonst Sinn?

    playAnimation(images){
        //setInterval(() => { // 
            //this.animationPlaying = true;
            let i = this.currentImage % images.length;
            let imgPath = images[i];
            this.img = this.imgCache[imgPath];
            //console.log(this.imgCache);
            this.currentImage++;
        //}, 90 / this.speedX); // 
    }

    applyGravity() {

        setInterval( ()=>{

            if (this.isAboveGround() || this.speedY > 0) { // 110: initial y of resp object
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
            // else { // um Ungenauigkeiten zu vermeiden. (sonst ev. zu viel zu y angerechnet in letztem Schleifendurchlauf. 
            //     this.y = this.groundLevel_y; // = initial- oder groundValue für jew y des Objektes.
            // }

        }, 1000/25);

        // let self = this;
        // requestAnimationFrame( () => {
        //     this.applyGravity(); // oder setInterval ca. 25 fps
        // });
    }

    moveLeft() {
        this.x -= this.speedX;
    }

    moveRight() {
        this.x += this.speedX;
    }

    jump() {
        this.speedY = 23;
        // this.applyGravity();
    }
    
    isWalkingRight() {
        //console.log(this.x, this.world.level)
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
    
    isColliding(){}
    
    isHurt(){}
    
    isDead(){}

    receiveHit(){}

}