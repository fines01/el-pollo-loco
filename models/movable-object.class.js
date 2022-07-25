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
    imgY = this.y;
    imgX = this.x;
    imgWidth = this.width;
    imgHeight = this.height;
    // volumeModifier = 1;

    /**
     * Corrects the dimensions of an object 's actual hit area compared to the dimensions of its image element
     */
    // checkHitarea() {
    //     this.imgY = this.y; // sets default values
    //     this.imgX = this.x;
    //     this.imgWidth = this.width;
    //     this.imgHeight = this.height;
    // }

    /**
     * @todo maybe define function here
     * right now I have my checkAnimationFrameTime() functions in following classes: 
     * Bottle, Enemy, Character, (possibly ThrowableObjects)
     * 
     */
    checkAnimationFrameTime(deltaTime, objectAnimation) {
        if (this.animationFrameTimer > this.animationFrameInterval) {
            // object specific animation function // this.animate()
            this.animationFrameTimer = 0;
        } else {
            this.animationFrameTimer += deltaTime;
        }
    }

    /**
     * Returns Audio Objects from any number of passed audio sources
     * @param  {...string} audioPaths - any number of audio sources
     * @returns {(Object | Object[])} Audio Object (single object or an array of objects)
     */
    createAudio(...audioPaths) {
        let audios = [];
        for (let path of audioPaths) {
            let audio = new Audio(path);
            audios.push(audio);
        }
        if (audios.length === 1) return audios[0];
        else return audios;
    }

    /**
     * Plays an animation by infinitely iterating over the passed images array and alternately 
     * assigning the object's img property to the corresponding HTMLImageElement Object from the imgCache.
     * @param {string[]} images - array of image sources
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let imgPath = images[i];
        this.img = this.imgCache[imgPath];
        this.currentImage++;
    }

    /**
     * Plays an animation by iterating once over the passed images array and alternately 
     * assigning the object's img property to the corresponding HTMLImageElement Object from the imgCache.
     * @todo [DECIDE:] keep? Not actually necessary (I could also just check currentImage & play while currentImage < imagesArr.length etc.)
     * @param {string[]} images - array of image sources
     */
    playAnimationOnce(images){
        for(let imgPath of images ){
            this.img = this.imgCache[imgPath];
        }
    }

    /**
     * Applies a simple gravitation animation 
     * @todo maybe rename speedY because it sounds stupid.
     */
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

    /** moves object left on canvas */
    moveLeft() {
        this.x -= this.speedX;
    }

    /** moves object right on canvas */
    moveRight() {
        this.x += this.speedX;
    }

    /**
     * @todo rename prop 'speedY'?
     * initializes jump start by assigning a positive number to the speedY property, 
     * plays jumping sound (if object has one assigned)
     */
    jump() {
        this.speedY = this.jumpHeight;
        if(this.jumpingSound) this.jumpingSound.play();
    }
    
    /**
     * Adds bouncing movement to objects.
     * (Objects are moved left per default)
     */
    randomBounce() { // bounce left
        if (Math.random() < 0.3 && !this.isAboveGround()) this.jump();
        if (Math.random() < 0.4) this.moveLeft(); // adds a bit moredynamic
    }

    /**
     * Adds a pulsing animation through alternating changes in size of the object
     * @param {number} pulseWidth - pixel number of max increase during the pulsation
     */
    pulse( pulseWidth ) {
        if (this.width < this.initialWidth+pulseWidth && this.height < this.initialHeight+pulseWidth) {
            this.width += pulseWidth;
            this.height += pulseWidth;
            this.x -= pulseWidth / 2
            this.y -= pulseWidth / 2;
        }
        else {
            this.width = this.initialWidth;
            this.height = this.initialHeight;
            this.x += pulseWidth / 2
            this.y += pulseWidth / 2;
        }
    }

    /**
     * Checks user input and game conditions for moving right
     * @returns {boolean}
     */
    isWalkingRight() {
        return (this.keyboard.RIGHT && this.x < this.world.level.levelEndX);
    }

/**
 * Checks user input and game conditions for moving left
 * @returns {boolean}
 */
    isWalkingLeft() {
        return (this.keyboard.LEFT && this.x > 0 )
    }

/**
 * Checks user input and game conditions for jumping
 * @returns {boolean}
 */
    isJumping(){
        return (this.keyboard.UP || this.keyboard.SPACE) && !this.isAboveGround();
    }

    /**
     * Checks wether object is in a falling motion
     * @returns {boolean}
     */
    isFalling() {
        return (this.speedY < 0);
    }

    /**
     * Checks if object is above ground level
     * @returns {boolean}
     */
    isAboveGround(){
        return this.y < this.groundLevelY;
    }

    /**
     * Checks if the passed object's hitbox-area is colliding horizontally or vertically with the objec'ts hitbox-area
     * @param {Object} object 
     * @returns {boolean}
     */
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

    /**
     * Checks if an object is jumping on the passed object
     * @param {Object} object 
     * @returns {boolean}
     */
    isJumpingOn(object) {
        return ( 
            this.isColliding(object) &&
            this.isFalling() &&
            this.imgY + this.imgHeight >= object.imgY && //+ object.imgHeight * 0.9
            this.imgY + this.imgHeight < object.imgY + 25
        );
    }

    /**
     * Checks if passed object is of type enemy
     * @todo remove (maybe unnecessary, I can just test if this instanceof Enemy, haha?)
     * @param {Object} obj 
     * @returns {boolean}
     */
    isEnemy(obj) {
        return (obj instanceof Chicken || obj instanceof Chick || obj instanceof Endboss);
    }
    
    /**
     * Checks if enough time has passed since the last hit and object is no longer in the hurt status
     * @param {number} ms - milliseconds during wich to stay in hurt status
     * @returns {boolean}
     */
    isHurt( ms = 125 ){
        let deltaTime = Date.now() - this.lastHit;
        return (deltaTime < ms);
    }
    
    /**
     * Checks if object has enough energy left
     * @returns {boolean}
     */
    isDead(){
        return (this.energy == 0);
    }

    /**
     * Applies consequences of a received blow
     */
    receiveHit() {
        this.energy -= 2;
        if (this.energy < 0) this.energy = 0;
        if (this.energy > 0) this.lastHit = Date.now();
        if (this.hurtSound) this.hurtSound.play();
    }

}