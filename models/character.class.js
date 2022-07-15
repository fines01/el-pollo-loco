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
        'audio/test/Hero_Death_00.wav', // dying sound - nope
        'audio/test/hit26.mp3.flac', // hurting sound ...hmm
        'audio/test/swosh-06.flac' // jumping sound flac
    ];
    
    IMAGES_IDLE = [];
    IMAGES_SLEEPING = [];
    IMAGES_ANGRY = []; 

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

    constructor(world) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        this.setAudio();
        this.world = world;
    }

    checkHitarea() {
        this.imgY = this.y + 90;
        this.imgX = this.x + 25;
        this.imgWidth = this.width * 0.55;
        this.imgHeight = this.height * 0.55;
    }

    setAudio() {
        [this.walkingSound, this.dyingSound, this.hurtSound, this.jumpingSound] = this.createAudio(...this.audioPaths);
        this.hurtSound.playbackRate = 2;
        this.hurtSound.volume=0.3;
        this.jumpingSound.playbackRate = 1.2;
        this.walkingSound.playbackRate = 2;
    }

    canThrow(collectedBottles) {
        return (this.keyboard.ENTER && !this.isHurt(200) && collectedBottles > 0);
    }

    checkAnimationFrameTime(deltaTime) {
        if (this.animationFrameTimer > this.animationFrameInterval) {
            this.animate();
            this.animationFrameTimer = 0;
        } 
        else {
            this.animationFrameTimer += deltaTime;
        }
    }

    animate() { // über 14 Zeilen !! kevin meint hier ev besser switch-case... meh
        this.applyGravity(); 
        if(this.isDead()){
            this.playAnimationOnce(this.IMAGES_DYING);
            this.groundLevelY += 20;
        }
        else if(this.isHurt()){ // only if NOT jumping on enemy
            this.playAnimation(this.IMAGES_HURT);
        }
        else if((this.isWalkingRight() || this.isWalkingLeft() )&& !this.isAboveGround()){
            this.walkingSound.play();
            this.playAnimation(this.IMAGES_WALKING);
        }
        else if(this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    move(){
        this.checkHitarea();
        if(this.isJumping()){
            this.jump();
        }
        if(this.isWalkingRight()){
            this.moveRight();
            this.isReversed_x = false;
        }
        if(this.isWalkingLeft()) {
            this.moveLeft();
            this.isReversed_x = true;
        }
        // if (this.isDead()) this.dyindSound.play();
        this.world.camera_x = -this.x + 100;
    }
    
}