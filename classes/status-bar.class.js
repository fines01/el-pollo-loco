class StatusBar extends DrawableObject {

    IMAGES_ENERGY = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png',
    ];

    // life/energy - statusbar:
    percentage;
    x = 10;
    y = 0;
    height = 45;
    width = 200;

    constructor() {
        super();
        this.loadImages(this.IMAGES_ENERGY);
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let imgPath = this.IMAGES_ENERGY[this.resolveImageIndex()];
        this.img = this.imgCache[imgPath];
    }

    resolveImageIndex() {
        //ev andere, 'math', bessere bzw. kürzere Methode(n)
        let val = this.percentage;
        switch(true){
            case val == 100:
                return 5;
                break;
            case val > 80:
                return 4;
            case val > 60:
                return 3;
            case val > 40:
                return 2;
            case val > 20:
                return 1;
            default:
                return 0;
        }
    }

}