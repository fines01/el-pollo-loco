class DrawableObject {

    img;
    x;
    y;
    width;
    height;
    imgCache = [];
    markedForDeletion = false;
    showHitboxes = false;
    
    // check img loaded
    allImagesLoaded = false; // überprüfen: imgCache in den alle bilder geladen werden
    imgCacheCounter = 0;
    imagesAmount = 0;

    imgY = this.y;
    imgX = this.x;
    imgWidth = this.width;
    imgHeight = this.height;

    checkImgLoaded() {
        if (this.imgCacheIsComplete()) {
            for (let imgName of this.imgCache) {
                if (!this.imgCache[imgName].complete) return false; // img haben einen complete-wert, returns boolean
            }
            return true;
        } 
        else {
            return false;
        }
    }

    imgCacheIsComplete() {
        return this.imagesAmount === this.imgCacheCounter;
    }

    countImages(arr) {
        if( this instanceof BackgroundObject || this instanceof Character ) { //objects i want to check
            this.imagesAmount += arr.length;
        }
    }

    loadImage(imgPath){
        if (imgPath){
            this.img = new Image();
            this.img.src = imgPath;
            if (this.img.complete) return true;
            else return false;
        }
    }

    loadImages(arr){
        arr.forEach( (imgPath) => {
            let img = new Image();
            img.src = imgPath;
            this.imgCacheCounter++; 
            this.imgCache[imgPath] = img;            
        });
        this.countImages(arr);
    }

    drawObject(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    toggleHitboxes() {
        this.showHitboxes = !this.showHitboxes;
    }

    isCollidableObject(){
        return (
            this instanceof Character || 
            this instanceof Chicken || 
            this instanceof Chick || 
            this instanceof Coin || 
            this instanceof ThrowableObject || 
            this instanceof Endboss);
    }

    // draw hitboxes
    drawFrame(ctx){
        if(this.showHitboxes && this.isCollidableObject()){
            ctx.beginPath();
            ctx.lineswidth = '3.5';
            ctx.strokeStyle = 'yellow';
            if (this.isReversed_x) ctx.rect(-this.imgX + this.imgWidth*0.55, this.imgY, this.imgWidth, this.imgHeight); // td.: fix later
            else ctx.rect(this.imgX, this.imgY, this.imgWidth, this.imgHeight);
            ctx.stroke();
        }
    }
}