class World {

    //canvas = document.getElementById('canvas');
    canvas;
    ctx;
    camera_x = 0;
    //level = level1;

    enemies = [ new Chicken(), new Chicken(), new Chicken() ];
    character = new Pepe();
    keyboard = new Keyboard();

    backgroundObjects = [
        new Cloud('img/5.Fondo/Capas/4.nubes/1.png',0),
        //new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png',0),
        // 720
        new Cloud('img/5.Fondo/Capas/4.nubes/2.png', 720),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 720),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 720),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 720),

        new Cloud('img/5.Fondo/Capas/4.nubes/1.png', 1440),
        // new Cloud('img/5.Fondo/Capas/4.nubes/1.png', 0),
        // wieder wh mit 720 * 2 etc. --> besser lösen/wh
    ]; // into level --> level1

    constructor(){
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.draw();

    }

    draw() {
        // clear canvas/ delete old images
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

        // 'Kamera-Ausschnitt' verschieben (Verschiebt Koordinatensystem/ Position an der 'gezeichnet' wird)
        //this.ctx.translate(this.camera_x, 0);

        this.addToMap(...this.backgroundObjects, ...this.enemies, this.character);

        // 'Kamera-Ausschnitt' zurückverschieben
        //this.ctx.translate(-this.camera_x, 0);

        let self = this;
        // fkt wird asynchron ausgeführt: sobald drawImage fertig ausgeführt wurde
        requestAnimationFrame( () => {
            self.draw();
        });
    }

    addToMap(...objects){
        for(let i = 0; i < objects.length; i++){
            objects[i].drawObject(this.ctx);
        }
    }
    // into one function via spread operator?
    addObjectsToMap(objects){
        objects.forEach( o => {
            this.addToMap(o);
        });
    }
}