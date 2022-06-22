class DrawableObject {

    img;
    x;
    y;
    width;
    height;
    imgCache = [];
    markedForDeletion = false;

    loadImage(imgPath){
        this.img = new Image(); // creates new <img id="image">
        this.img.src = imgPath;
    }

    loadImages(arr){
        arr.forEach( (imgPath) => {
            let img = new Image;
            img.src = imgPath;
            this.imgCache[imgPath] = img; // save img as json in image cache
        });
    }

    drawObject(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        // in case of character or enemy: draw a frame around images for illustration/testing purposes for collision-detection functionalities etc.
        if(this instanceof Pepe || this instanceof Chicken || this instanceof Chick || this instanceof Coin || this instanceof Gallina){
            ctx.beginPath();
            ctx.lineswidth = '3.5';
            ctx.strokeStyle = 'yellow';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}