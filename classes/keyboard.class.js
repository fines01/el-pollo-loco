class Keyboard {

    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor(){
        this.handleKeypress(); /* fkt, aber: Uncaught TypeError: Cannot set property code of #<KeyboardEvent> which has only a getter at HTMLDocument. < anonymous > keyboard.class.js: 38: 28) */
    }
    
    handleKeypress(){

        let codes = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'KeyD' ];

        window.addEventListener('keydown', (event) => {
            
            //console.log(event.key, event.code);

            switch (event.code) {
                case 'ArrowRight':
                    this.RIGHT = true;
                    console.log('this:', this);
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
                case 'KeyD':
                    this.D = true;
                    break;
            }

        });

        window.addEventListener('keyup', (event) => {

            switch (event.code) {
                case 'ArrowRight':
                    this.RIGHT = false;
                    console.log(this);
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
                case 'KeyD':
                    this.D = false;
                    break;
            }
            
        });
    
    }
}