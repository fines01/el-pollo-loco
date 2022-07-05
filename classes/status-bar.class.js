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
    world;
    percentage;
    x = 10;
    height = 40;
    width = 180;
    textX = this.x + this.width + 18;
    fontSize = 18;
    fontColor = 'white';
    fontFamily = 'Helvetica, sans-serif';
    amountBottles = 0;
    amountCoins = 0;


    constructor(y, images, initialValue, ratio = 1) {
        super();
        this.y = y;
        this.percentage = initialValue;
        this.ratio = ratio
        this.images = this.resolveImages(images);
        this.loadImages(this.images);
        this.setStatusbar(this.percentage);
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

    setStatusbar(percentage) {
        this.percentage = percentage * this.ratio;
        let imgPath = this.images[this.resolveImageIndex()];
        this.img = this.imgCache[imgPath];
        //if (ctx) this.drawUI( ctx );
    }

    resolveImageIndex() {
        return Math.floor(this.percentage / 20); 
    }

    drawUI(ctx) {
        let amountTxt = (this.percentage / this.ratio).toString();
        ctx.font = this.fontSize + 'px ' + this.fontFamily;
        ctx.textAlign = 'center';
        ctx.fillStyle = this.fontColor;
        ctx.fillText(amountTxt, this.textX, this.y + this.height -8);
        // if (gameOver) text: x coins missed etc.?
    }

}