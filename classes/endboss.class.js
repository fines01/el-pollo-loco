//class Endboss extends MovableObject {
class Endboss extends Enemy { // or Gallina

    height = 400;
    width = 300;
    //speed;
    x = 1000; // levelEnd_x - this.width - ??50?maybe
    y = 50;

    energy = 6; // needs 3 hits

    IMAGES_ALERT = [
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/1.Alerta/G5.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/1.Alerta/G6.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/1.Alerta/G7.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/1.Alerta/G8.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/1.Alerta/G9.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/1.Alerta/G10.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/1.Alerta/G11.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/1.Alerta/G12.png',
    ];

    IMAGES_WALKING = [
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/1.Caminata/G1.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/1.Caminata/G2.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/1.Caminata/G3.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/1.Caminata/G4.png',
    ];
    IMAGES_ATTACKING = [
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/2.Ataque/G13.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/2.Ataque/G14.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/2.Ataque/G15.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/2.Ataque/G16.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/2.Ataque/G17.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/2.Ataque/G18.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/2.Ataque/G19.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/2.Ateci¢n-ataque/2.Ataque/G20.png',
    ];
    IMAGES_HURT = [
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/3.Herida/G21.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/3.Herida/G22.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/3.Herida/G23.png',
    ];
    IMAGES_DYING = [
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/4.Muerte/G24.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/4.Muerte/G25.png',
        'img/4.Secuencias_Enemy_gigant¢n-Do¤a_Gallinota-/4.Muerte/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        //this.speed = 0.15 + Math.random() * 0.45; // maybe pass & increase with Level?
        this.animate();
    }

    animate() {
        setInterval( ()=>{

            if (this.keyboard.RIGHT || this.keyboard.LEFT){
                this.playAnimation(this.IMAGES_WALKING);
            }
            else {
                this.playAnimation(this.IMAGES_ALERT);
            }
            if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
            else if (this.isDead()) {
                this.playAnimationOnce(this.IMAGES_DYING);
                this.y+=20;
                 setTimeout(() => {
                     this.markedForDeletion = true;
                 }, 1000);
            }
        }, 200)
    }

}