class MovableObject extends DrawableObject {

    speedX;
    speedY = 0;
    acceleration = 2;
    currentImage = 0;
    isReversed_x = false;
    groundLevel_y = canvasHeight - this.height - 45; //TEST 45px geschätzt
    energy = 100; // energy reserve


    // constructor(){
    //     super();
    // }

    playAnimation(images){
        setInterval( () => {
            let i = this.currentImage % images.length;
            let imgPath = images[i];
            this.img = this.imgCache[imgPath];
            //console.log(this.imgCache);
            this.currentImage++;
        }, this.speedX * 350);
    }

    applyGravity() {
        if (this.isAboveGround(this.initialY) || this.speedY > 0) { // 110: initial y of jew object
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else { // um Ungenauigkeiten zu vermeiden. (sonst ev. zu viel zu y angerechnet in letztem Schleifendurchlauf. Gibt auch noch eine Art "Federung" durch die Korrektur).
            this.y = this.initialY; // = initial- oder groundValue für jew y des Objektes.
        }

        let self = this;
        requestAnimationFrame( () => {
            this.applyGravity(); // oder setInterval ca. 25 fps
        });
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

    isAboveGround(){
        // (this instanceof ThrowableObject) && (return true);
        return this.y < this.groundLevel_y;
    }
    
    isColliding(){}
    
    isHurt(){}
    
    isDead(){}

    receiveHit(){}

}