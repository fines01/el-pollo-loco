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
    world;
    percentage;
    height = 35;
    width = 150;
    x = 5;
    textX = this.x + this.width + 18;
    fontSize = 18;
    fontColor = 'white';
    fontFamily = 'Helvetica, sans-serif';
    amountBottles = 0;
    amountCoins = 0;
    remainingTime;
    
    /**
     * Creates a statusbar
     * @param {number} y - y coordinate of the statusbar on the canvas
     * @param {string} images - determines the type of the statusbar
     * @param {number} initialValue - initial value of statusbar
     * @param {number} ratio - corresponds percentage which is displayed on the statusbar in relation to existing objects in the game level 
     */
    constructor(y, images, initialValue, ratio = 1) {
        super();
        this.y = y;
        this.percentage = initialValue;
        this.ratio = ratio
        this.images = this.resolveImages(images);
        this.loadImages(this.images);
        this.setStatusbar(this.percentage);
    }

    /**
     * Determines the type of the statusbar and returns the corresponding image set
     * @param {string} images - the type of statusbar
     * @returns { string[] }  an array with image sources
     */
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

    /**
     * Sets the percentage shown on the statusbar and assigns the appropriate path to the image
     * @param {number} percentage
     */
    setStatusbar(percentage) {
        this.percentage = Math.round(percentage * this.ratio);
        let imgPath = this.images[this.resolveImageIndex()];
        this.img = this.imgCache[imgPath];
    }

    /**
     * Determines the correct image-index for a given percentage on the array.
     * This identifies the image that displays the corresponding status on the statusbar.
     * @returns {number} the index of the correct image source
     */
    resolveImageIndex() {
        return Math.floor(this.percentage / 20); 
    }

    /**
     * Draws the exact numeric status besides the status bar
     * @param {Object} ctx - the game instance of CanvasRenderingContext2d, the drawing context on the canvas
     */
    drawAmount(ctx) {
        let amountTxt = Math.round((this.percentage / this.ratio)).toString();
        ctx.font = this.fontSize + 'px ' + this.fontFamily;
        ctx.textAlign = 'center';
        ctx.fillStyle = this.fontColor;
        ctx.fillText(amountTxt, this.textX, this.y + this.height -8);
        // if (gameOver) text: x coins missed etc.?
    }
    
    /**
     * Draws countdown of remaining game time on canvas
     * @param {Object} ctx - the game instance of CanvasRenderingContext2d, the drawing context on the canvas
     * @param {number} gameTime - elapsed game time during game in ms
     * @param {number} maxGameTime - maximum allowed time to finish a level in ms
     */
    drawGameTime(ctx, gameTime, maxGameTime) {
        ctx.font = 'bold ' + this.fontSize * 1.1 + 'px ' + this.fontFamily;
        this.remainingTime = ( (maxGameTime - gameTime) * 0.001).toFixed(1);
        if (this.remainingTime < 10 ) ctx.fillStyle = 'red';
        if (this.remainingTime < 0.0 ) this.remainingTime = 0.0;
        ctx.fillText('Time: ' + this.remainingTime, canvasWidth*0.9, this.y + this.height -4 );
    }

}