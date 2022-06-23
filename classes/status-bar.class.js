class StatusBar extends DrawableObject {

    IMAGES_ENERGY = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png',
    ];

    IMAGES_COINS = [
        'img/7.Marcadores/Barra/Marcador moneda/Naranja/0_.png',
        'img/7.Marcadores/Barra/Marcador moneda/Naranja/20_ .png',
        'img/7.Marcadores/Barra/Marcador moneda/Naranja/40_.png',
        'img/7.Marcadores/Barra/Marcador moneda/Naranja/60_.png',
        'img/7.Marcadores/Barra/Marcador moneda/Naranja/80_ _1.png',
        'img/7.Marcadores/Barra/Marcador moneda/Naranja/100__1.png',
    ];

    IMAGES_BOTTLES = [
        'img/7.Marcadores/Barra/Marcador_botella/Verde/0_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Verde/20_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Verde/40_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Verde/60_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Verde/80_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Verde/100_.png',
    ]

    // life/energy - statusbar:
    percentage;
    x = 10;
    //y = 0;
    height = 40;
    width = 180;

    constructor(y, images, initialValue) {
        super();
        this.y = y;
        this.images = this.resolveImages(images);
        this.loadImages(this.images);
        this.setPercentage(initialValue); // only for energy? 0 coins at start, or start with a certain amount of bottles?
    }

    resolveImages(images) {
        switch (images){
            case 'energy':
                return this.IMAGES_ENERGY;
            case 'coins':
                return this.IMAGES_COINS;
            case 'bottles':
                return this.IMAGES_BOTTLES;
        }
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let imgPath = this.images[this.resolveImageIndex()];
        this.img = this.imgCache[imgPath];
    }

    resolveImageIndex() {
        return Math.floor(this.percentage / 20); 
    }

}