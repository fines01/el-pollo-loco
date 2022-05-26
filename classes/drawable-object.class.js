class DrawableObject {

    img;
    x;
    y;
    width;
    height;
    imgCache = [];


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

    drawframe(ctx){
        // in case of character or enemy: draw a frame around images for illustration/testing purposes for collision-detection functionalities etc.
    }
}