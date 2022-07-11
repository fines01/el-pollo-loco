class Keyboard {

    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    F = false;
    ENTER = false;

    constructor(){
        this.handleKeypress();
    }
    
    handleKeypress(){

        window.addEventListener('keydown', (event) => {
            //console.log(event.key, event.code);

            switch (event.code) {
                case 'ArrowRight':
                    this.RIGHT = true;
                    //console.log('this:', this);
                    break;
                case 'ArrowLeft':
                    this.LEFT = true;
                    break;
                case 'ArrowUp':
                    this.UP = true;
                    break;
                case 'ArrowDown':
                    this.DOWN = true;
                    break;
                case 'Space':
                    this.SPACE = true;
                    break;
                case 'KeyF':
                    this.F = true;
                    break;
                case 'Enter':
                    this.ENTER = true;
                    break;
            }

        });

        window.addEventListener('keyup', (event) => {

            switch (event.code) {
                case 'ArrowRight':
                    this.RIGHT = false;
                    //console.log(this);
                    break;
                case 'ArrowLeft':
                    this.LEFT = false;
                    break;
                case 'ArrowUp':
                    this.UP = false;
                    break;
                case 'ArrowDown':
                    this.DOWN = false;
                    break;
                case 'Space':
                    this.SPACE = false;
                    break;
                case 'KeyF':
                    this.F = false;
                    break;
                case 'Enter':
                    this.ENTER = false;
                    break;
            }
            
        });
    
    }
}