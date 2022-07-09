class Character extends MovableObject {

    x = 150;
    y = 135;
    height = 210;
    width = 140;

    // as iactual image is smaller than png:
    imgY = this.y + 120;
    imgX = this.x + 25;
    imgWidth = this.width*0.7;
    imgHeight = this.height*0.55;
    
    groundLevelY = 220;
    sound_walking = new Audio('audio/step1.mp3');
    speedX = 8;//1.5;
    jumpHeight = 28;

    animationFPS = 35; //25;
    animationFrameInterval = 1000/this.animationFPS;
    animationFrameTimer = 0; //cycles between 0 and animationFrameInterval

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
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/3.Secuencia_salto/J-39.png', //
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
        this.world = world;
    }
    
    checkHitarea() {
        // as sometimes  the actual image is much smaller than the size of the png file:
        this.imgY = this.y + 90;
        this.imgX = this.x + 25;
        this.imgWidth = this.width * 0.55;
        this.imgHeight = this.height * 0.55;
    }

    canThrow(collectedBottles) {
        return (this.keyboard.ENTER && !this.isHurt(200) && collectedBottles > 0);
    }

    checkAnimationFrameTime(deltaTime) {
        if (this.animationFrameTimer > this.animationFrameInterval) {
            this.animate();
            this.animationFrameTimer = 0;
        } else {
            this.animationFrameTimer += deltaTime;
        }
    }

    animate(){

        this.applyGravity();

        if(this.isDead()){
            this.playAnimationOnce(this.IMAGES_DYING); // TODO only play one sequence
            this.y += 2; // TODO fix 'bounce'
            }
        
            else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
            }
        
            else if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        
            else if(this.isWalkingRight() || this.isWalkingLeft()){
                this.sound_walking.play();
                this.playAnimation(this.IMAGES_WALKING);
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

        this.world.camera_x = -this.x + 100;

    }
}