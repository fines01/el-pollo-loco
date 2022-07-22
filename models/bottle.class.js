class Bottle extends ThrowableObject {

    width = 80;
    height = 80;
    initialWidth = this.width;
    initialHeight = this.height;
    groundLevelY = canvasHeight - this.height;
    initialY = 370;
    //acceleration;
    animationFPS = 20;
    animationFrameInterval = 1000 / this.animationFPS;
    animationFrameTimer = 0;
    pulseAnimationFPS = 4;
    pulseAnimationRatio = this.animationFPS/this.pulseAnimationFPS;
    pulseTimer = 0;

    audioPaths = [
        'audio/swish_3.wav', // throw sound
        'audio/Bottle Break.wav', // bottle break sound
        'audio/coin.wav' // collect bottle sound
    ];
    IMAGE = 'img/6.botella/1.Marcador.png'; // img/6.botella/1.Marcador.png // 'img/7.Marcadores/Icono/Botella.png'
    IMAGES_GROUND = [
        'img/6.botella/2.Botella_enterrada1.png',
        'img/6.botella/2.Botella_enterrada2.png'
    ];
    IMAGES_ROTATE = [
        'img/6.botella/Rotaci¢n/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotaci¢n/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotaci¢n/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotaci¢n/Mesa de trabajo 1 copia 6.png',
    ];
    IMAGES_SPLASH = [
        'img/6.botella/Rotaci¢n/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotaci¢n/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotaci¢n/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotaci¢n/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotaci¢n/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        'img/6.botella/Rotaci¢n/Splash de salsa/Mesa de trabajo 1 copia 12.png'
    ]

    /**
     * Creates either a collectible or throwable bottle object
     * @todo animations for Coins, Bottles, Enemies (Chicken, Chicks) only need to be initialized when game starts, not when they are created (at instnciating level)
     * @param {number} levelEndX - x coordinate of end of level
     * @param {boolean} throwObject - true as default if bottle is created to be thrown, false if bottle is created to be collected
     */
    constructor(levelEndX, throwObject = true) {
        super();
        this.throwObject = throwObject;
        this.x = 200 + Math.random() * (levelEndX - 250);
        this.y = 100 + Math.random() * 225;        
        this.loadImage(this.IMAGE);
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.checkHitarea();
        this.setAudio();
    }

    /**
     * Corrects the dimensions of an object's actual hit area against the dimensions of its image element
     */
    checkHitarea() {
        this.imgY = this.y + 8;
        this.imgX = this.x + 31;
        this.imgWidth = this.width * 0.22;
        this.imgHeight = this.height * 0.78;
    }

    /**
     * Checks the elapsed time in ms since the last animation frame against the defined animation frame interval of the object,
     * and applies the animation if enough time has passed.
     * @param {number} deltaTime - ms since the last animation frame was served in the main game-loop 
     */
    checkAnimationFrameTime(deltaTime) {
        if (this.animationFrameTimer > this.animationFrameInterval) {
            if (this.throwObject) this.animateBottleThrow();
            if (!this.throwObject) this.animateBottlePulse();
            this.animationFrameTimer = 0;
        } else {
            this.animationFrameTimer += deltaTime;
        }
    }

    /**
     * Adds a pulsing animation to bottles.
     * Since the pulsing animation needs to run at lower FPS, 
     * the ratio to the main animationFPS (for throw animations) is used to time the pulsing animation
     */
    animateBottlePulse() {
        this.pulseTimer++;
        if (this.pulseTimer >= this.pulseAnimationRatio) {
            this.pulse(9);
            this.pulseTimer = 0;
        }
    }

    /** Animates bottle throw */
    animateBottleThrow() {
        this.throwSound.play();
        this.playAnimation(this.IMAGES_ROTATE);
    }

    /**
     * Creates Audio instances from the given audio sources,
     * and sets the audio properties of playback speed and volume.
     */
    setAudio() {
        [this.throwSound, this.splashSound, this.collectSound] = this.createAudio(...this.audioPaths);
        this.splashSound.playbackRate = 2;
        this.collectSound.volume = 0.6;
        this.throwSound.playbackRate = 1.5;
    }

    /**
     * Checks if object is on ground level.
     * @returns {boolean}
     */
    isOnGround() {
        return (this.y >= this.groundLevelY - 95);
    }
}