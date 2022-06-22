class Pepe extends MovableObject {

    x = 100;
    y = 135;
    groundLevelY = 135; // Ground-Level. TEST, vorübergehend (bessere Lsg f ?)
    height = 300;
    width = 150;
    sound_walking = new Audio('audio/step1.mp3');
    //speedY = 0;
    speedX = 6;//1.5;
    jumpHeight = 28;

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
        'img/2.Secuencias_Personaje-Pepe-correcci¢n/3.Secuencia_salto/J-40.png', // wenn als letzteb bild angezeigt: ev. ein anderes nehmen (sonst verschwindet Pepe manchmal)
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

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        //this.checkKeypress(); // TEST
        this.applyGravity(); //
        this.animate();
        this.move();
    }

    animate(){

        setInterval(() => {

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

        }, 1000/25 );
        
    }

    move(){

        if(this.isJumping()){
            this.jump();
        }

        if(this.keyboard.RIGHT){
            this.moveRight();
            this.isReversed_x = false;
            (this.x + this.width > this.world.level.levelEnd_x) && (this.x = 100); // TEMPORARY(?) for testing: move back into frame
            // (this.x + this.width > this.world.level.levelEnd_x) && (this.x = world.level.levelEnd_x); // don't move out of range
        }

        if(this.keyboard.LEFT) {
            this.moveLeft();
            this.isReversed_x = true;
            (this.x - this.width < 0 - this.width) && (this.x = this.world.level.levelEnd_x - this.width - 100); // TEMPORARY(?): move back into frame
            // (this.x - this.width < 0 - this.width) && (this.x = 0); 
        }

        let self = this;
        requestAnimationFrame( ()=>{
            self.world.camera_x = -this.x + 100;
            self.move();
        });

    }
}