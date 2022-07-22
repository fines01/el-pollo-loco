class DrawableObject {

    img;
    x;
    y;
    width;
    height;
    imgCache = [];
    markedForDeletion = false;
    showHitbox = false;
    // check img loaded
    allImagesLoaded = false; // überprüfen: imgCache in den alle bilder geladen werden
    imgCacheCounter = 0;
    imagesAmount = 0;
    imgY = this.y;
    imgX = this.x;
    imgWidth = this.width;
    imgHeight = this.height;

    
    /**
     * Checks the amount of total images against the amount of images in the imgCache for an object
     * @returns {boolean}
     */
    imgCacheIsComplete() {
        return this.imagesAmount === this.imgCacheCounter;
    }

    /**
     * Checks if the imgCache is complete and all image Elements are completely loaded
     * @returns {boolean}
     */
    checkImgLoaded() {
        if (this.imgCacheIsComplete()) {
            for (let imgName of this.imgCache) {
                if (!this.imgCache[imgName].complete) return false; // complete: property of img, returns boolean
            }
            return true;
        } 
        else {
            return false;
        }
    }

    /**
     * Counts total amount of given images for an object
     * @param {string[]} imgSrcArr - array of image sources
     */
    countImages(imgSrcArr) {
        if( this instanceof BackgroundObject || this instanceof Character ) { //objects i want to check
            this.imagesAmount += imgSrcArr.length;
        }
    }

    /**
     * Creates a new HTML Image Element and sets its source to the given path
     * @param {string} imgPath - source of an image
     * @returns {boolean}
     */
    loadImage(imgPath){
        if (imgPath){
            this.img = new Image();
            this.img.src = imgPath;
            if (this.img.complete) return true;
            else return false;
        }
    }

    /**
     * Creates a new HTML Image Element for each image source given in an array,
     * saves the image paths and their respective image Elements into the imgCache object [ src: img, ... ]
     * @param {string[]} imgSrcArr 
     */
    loadImages(imgSrcArr){
        imgSrcArr.forEach( (imgPath) => {
            let img = new Image();
            img.src = imgPath;
            this.imgCacheCounter++; 
            this.imgCache[imgPath] = img;            
        });
        this.countImages(imgSrcArr);
    }

    /**
     * Draws an object to the canvas via the CanvasRenderingContext2d.drawImage() method of the canvas 2D API
     * The drawImage() method here takes five parameters from pre - defined properties of the respective objects:
     * the HTMLImageElement, canvas-destination x & y coordinates, canvas-destination width & height.
     * @param {Object} ctx - the game instance of CanvasRenderingContext2d, the drawing context on the canvas
     */
    drawObject(ctx){
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        catch(err) {
            console.warn('Error loading image', err);
            console.log(' Could not load image ', this.img.src);
        }
    }

    /**
     * Toggles hitboxes if developer mode is turned on/off
     */
    toggleHitboxes() {
        this.showHitbox = !this.showHitbox;
    }

    /**
     * @returns {boolean}
     */
    isCollidableObject(){
        return (
            this instanceof Character || 
            this instanceof Chicken || 
            this instanceof Chick || 
            this instanceof Coin || 
            this instanceof ThrowableObject || 
            this instanceof Endboss);
    }

    /**
     * Draws hitboxes on collidable objects if developer mode is turned on
     * @param {object} ctx - the game instance of CanvasRenderingContext2d, the drawing context on the canvas
     */
    drawFrame(ctx){
        if(this.showHitbox && this.isCollidableObject()){
            ctx.beginPath();
            ctx.lineswidth = '3.5';
            ctx.strokeStyle = 'yellow';
            if (this.isReversed_x) ctx.rect(-this.imgX + this.imgWidth*0.55, this.imgY, this.imgWidth, this.imgHeight); // td.: fix later
            else ctx.rect(this.imgX, this.imgY, this.imgWidth, this.imgHeight);
            ctx.stroke();
        }
    }
}