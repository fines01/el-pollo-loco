class Bottle extends ThrowableObject {

    width = 80;
    height = 80;
    groundLevelY = canvasHeight - this.height;
    initialY = 370;
    //acceleration;

    animationFPS = 20;
    animationFrameInterval = 1000 / this.animationFPS;
    animationFrameTimer = 0;

    audioPaths = [
        'audio/test/swish_3.wav', // throw sound
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

    constructor(levelEndX) {
        super();
        this.x = 200 + Math.random() * (levelEndX - 250);
        this.y = 100 + Math.random() * 225;        
        this.loadImage(this.IMAGE);
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.checkHitarea();
        this.setAudio();
    }

    checkHitarea() {
        this.imgY = this.y + 8;
        this.imgX = this.x + 31;
        this.imgWidth = this.width * 0.22;
        this.imgHeight = this.height * 0.78;
    }

    checkAnimationFrameTime(deltaTime) {
        if (this.animationFrameTimer > this.animationFrameInterval) {
            this.animateBottleThrow();
            this.animationFrameTimer = 0;
        } else {
            this.animationFrameTimer += deltaTime;
        }
    }

    animateBottleThrow() {
        this.throwSound.play();
        this.playAnimation(this.IMAGES_ROTATE);
    }

    setAudio() {
        [this.throwSound, this.splashSound, this.collectSound] = this.createAudio(...this.audioPaths);
        this.splashSound.playbackRate = 2;
        this.collectSound.volume = 0.6;
        this.throwSound.playbackRate = 1.5;
    }

    isOnGround() {
        return (this.y >= this.groundLevelY - 95);
    }
}