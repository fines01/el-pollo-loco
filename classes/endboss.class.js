//class Endboss extends MovableObject {
class Gallina extends MovableObject { // or Gallina

    height = 400;
    width = 300;
    //speed;
    x = 1000; // levelEnd_x - this.width - ??50?maybe
    y = 50;

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

    IMAGES_WALKING = [];
    IMAGES_HURT = [];
    IMAGES_DYING = [];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        //this.speed = 0.15 + Math.random() * 0.45; // maybe pass & increase with Level?
        this.animate();
    }

    animate() {
        setInterval( ()=>{
            this.playAnimation(this.IMAGES_ALERT);
        }, 200)
    }
}