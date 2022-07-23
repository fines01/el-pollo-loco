class Character extends MovableObject {

    x = 150;
    y = 220;
    height = 210;
    width = 140;

    imgY = this.y + 120;
    imgX = this.x + 25;
    imgWidth = this.width*0.7;
    imgHeight = this.height*0.55;

    groundLevelY = 220;
    speedX = 8;//1.5;
    jumpHeight = 28;
    
    animationFPS = 35; //25;
    animationFrameInterval = 1000/this.animationFPS;
    animationFrameTimer = 0;
    
    audioPaths = 
    [
        'audio/step1.mp3', // walking sound
        'audio/death-3.ogg', // dying sound
        'audio/hit26.mp3.flac', // hurting sound 
        'audio/swosh-06.flac' // jumping sound flac
    ];
    
    IMAGES_IDLE = 
    [
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/IDLE/I-1.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/IDLE/I-2.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/IDLE/I-3.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/IDLE/I-4.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/IDLE/I-5.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/IDLE/I-6.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/IDLE/I-7.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/IDLE/I-8.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/IDLE/I-9.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/IDLE/I-10.png',
    ];
    IMAGES_SLEEPING = 
    [
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/LONG_IDLE/I-11.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/LONG_IDLE/I-12.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/LONG_IDLE/I-13.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/LONG_IDLE/I-14.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/LONG_IDLE/I-15.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/LONG_IDLE/I-16.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/LONG_IDLE/I-17.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/LONG_IDLE/I-18.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/LONG_IDLE/I-19.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/1.IDLE/LONG_IDLE/I-20.png',
    ];

    IMAGES_WALKING = 
    [
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/2.Secuencia_caminata/W-26.png',
    ];
    IMAGES_JUMPING = 
    [
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/3.Secuencia_salto/J-31.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/3.Secuencia_salto/J-32.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/3.Secuencia_salto/J-33.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/3.Secuencia_salto/J-34.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/3.Secuencia_salto/J-35.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/3.Secuencia_salto/J-36.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/3.Secuencia_salto/J-37.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/3.Secuencia_salto/J-38.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/3.Secuencia_salto/J-39.png', 
    ];
    IMAGES_HURT = [
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/4.Herido/H-41.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/4.Herido/H-42.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/4.Herido/H-43.png',
    ];
    IMAGES_DYING = 
    [
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/5.Muerte/D-51.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/5.Muerte/D-52.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/5.Muerte/D-53.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/5.Muerte/D-54.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/5.Muerte/D-55.png',
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/5.Muerte/D-56.png',
    ];

    /**
     * Creates a character instance
     * @param {Object} world - current instance of World object
     */
    constructor(world) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        this.setAudio();
        this.setSpeed();
        this.world = world;
    }

    /**
     * Corrects the dimensions of an object 's actual hit area compared to the dimensions of its image element
     */
    checkHitarea() {
        this.imgY = this.y + 95;
        this.imgX = this.x + 25;
        this.imgWidth = this.width * 0.5;
        this.imgHeight = this.height * 0.5;
    }

    /**
    * Creates Audio instances from given audio sources,
    * sets their audio properties of playback speed and volume.
    */
    setAudio() {
        [this.walkingSound, this.dyingSound, this.hurtSound, this.jumpingSound] = this.createAudio(...this.audioPaths);
        this.hurtSound.playbackRate = 2;
        this.hurtSound.volume=0.3;
        this.jumpingSound.playbackRate = 1.2;
        this.walkingSound.playbackRate = 2;
        this.dyingSound.volume = 0.1;
        this.dyingSound.playbackRate = 2;
    }

    /**
     * Sets speed of character depending on the current level
     */
    setSpeed() {
        this.speedX = 8 + ( (levelCounter-1) * 0.8);
    }
 
   /**
    * Compares the elapsed time in ms since the last animation frame to the object's defined animation frame interval,
    * applies the animation if enough time has passed.
    * @param {number} deltaTime - ms since the last animation frame was served in the game-loop 
    */
    checkAnimationFrameTime(deltaTime) {
        if (this.animationFrameTimer > this.animationFrameInterval) {
            this.animate();
            this.animationFrameTimer = 0;
        } 
        else {
            this.animationFrameTimer += deltaTime;
        }
    }

    /**
     * @todo [MAYBE] check standing time of character and play sleeping animations if character is idle for too long??
     * @param {number} deltaTime 
     */
    checkIdleTime( deltaTime) {
        let trackTime;
        //...
    }
    
    /**
     * Determines if character is able to throw a bottle and checks for corresponding user inputs
     * @param {number} collectedBottles - amount of collected bottles
     * @returns 
     */
    canThrow(collectedBottles) {
        return (this.keyboard.ENTER && !this.isHurt() && collectedBottles > 0);
    }

    isWalking() {
        return ( (this.isWalkingRight() || this.isWalkingLeft() ) && !this.isAboveGround()); // check unnecc ()
    }

    isStanding() {
        return ( !this.isAboveGround() && !this.isWalking() && !this.isDead());
    }

    /**
     * Checks if character hurts an enemy
     * @param {Object} enemy 
     * @returns {boolean}
     */
    isHittingEnemy(enemy) {
        return (this.isColliding(enemy) && !this.isHurt() && !this.isJumpingOn(enemy) && !enemy.isDead()); // because dead enemies don't get removed immediately (for visual effects)
    }

    /**
     * Plays visual and acoustic dying animation of character
     */
    animateDeath() {
        this.playAnimationOnce(this.IMAGES_DYING);
        this.groundLevelY += 20;
        this.dyingSound.play();
    }

    walkRight() {
        this.moveRight();
        this.isReversed_x = false;
    }

    walkLeft() {
        this.moveLeft();
        this.isReversed_x = true;
    }

    /**
     * Plays visual character animation depending on character states
     */
    animate() {
        this.applyGravity(); 
        if (this.isDead()) this.animateDeath();
        else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
        else if (this.isWalking()) this.playAnimation(this.IMAGES_WALKING);
        else if (this.isStanding()) this.playAnimation(this.IMAGES_IDLE);
        else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
    }

    /**
     * Updates character movement on canvas
     */
    move() {
        this.checkHitarea();
        if (this.isJumping()) this.jump();
        if (this.isWalkingRight()) this.walkRight()
        if (this.isWalkingLeft()) this.walkLeft();
        if (this.isWalking()) this.walkingSound.play();
        this.world.camera_x = -this.x + 100;
    }
    
}