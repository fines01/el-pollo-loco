class DrawableObject {

    img;
    x;
    y;
    width;
    height;
    imgCache = [];
    markedForDeletion = false;
    showHitboxes = false;

    imgY = this.y;
    imgX = this.x;
    imgWidth = this.width;
    imgHeight = this.height;

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

    toggleHitboxes() {
        this.showHitboxes = !this.showHitboxes;
    }

    checkMode() {
        if (this.keyboard.F) {
            this.toggleHitboxes();
        }
    }

    // draw hitboxes
    drawFrame(ctx){
        if(this.showHitboxes && (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Coin || this instanceof ThrowableObject || this instanceof Endboss) ){
            ctx.beginPath();
            ctx.lineswidth = '3.5';
            ctx.strokeStyle = 'yellow';
            if (this.isReversed_x) ctx.rect(-this.imgX + this.imgWidth*0.55, this.imgY, this.imgWidth, this.imgHeight); // td.: fix later
            else ctx.rect(this.imgX, this.imgY, this.imgWidth, this.imgHeight);
            ctx.stroke();
        }
    }
}