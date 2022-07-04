class Character extends MovableObject {

    x = 100;
    y = 135;
    height = 300;
    width = 150;

    // as iactual image smaller than png:
    imgY = this.y + 120;
    imgX = this.x + 25;
    imgWidth = this.width*0.7;
    imgHeight = this.height*0.55;
    
    
    groundLevelY = 135; // Ground-Level. TEST, vorübergehend (bessere Lsg f ?)
    sound_walking = new Audio('audio/step1.mp3');
    //speedY = 0;
    speedX = 6;//1.5;
    jumpHeight = 28;

    // for controlling animation-fps with requestAnimationFrame()
    animationFPS = 35; //25;
    animationFrameInterval = 1000/this.animationFPS;
    animationFrameTimer = 0; //cycles between 0 and ...frameInterval

    IMAGES_IDLE = [];
    IMAGES_SLEEPING = [];
    IMAGES_ANGRY = []; //zusammenstellen

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
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/3.Secuencia_salto/J-39.png', // TODO: nach Sprung-Ende/Landung IMMER dieses Bild anzeigen
        //'img/2.Secuencias_Personaje-Pepe-correcci¢n/3.Secuencia_salto/J-40.png',
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
        //'img/2.Secuencias_Personaje-Pepe-correcci¢n/5.Muerte/D-57.png',
    ];

    constructor(world) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        this.world = world;
        //this.checkKeypress(); // TEST
        this.applyGravity(); //
        this.animate();
        this.move();
        // as iactual image smaller than png:
        this.checkHitarea();
    }
    
    checkHitarea() {
        // as sometimes  the actual image is much smaller than the size of the png file:
        this.imgY = this.y + 120;
        this.imgX = this.x + 25;
        this.imgWidth = this.width * 0.6;
        this.imgHeight = this.height * 0.55;
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

            if(this.isDead()){
                this.playAnimationOnce(this.IMAGES_DYING); // TODO only play one sequence
                // gameOver();
            }
    
            else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
            }
    
            // pepe jumping animation
            else if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                //this.jump();
            }
    
            //pepe walking animation
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