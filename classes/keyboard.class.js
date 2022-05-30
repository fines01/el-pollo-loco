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

        // const keys = [ {'key': this.LEFT, 'code': 'ArrowLeft'}, {'key': this.RIGHT, 'code': 'ArrowRight'}, {'key': this.UP, 'code': 'ArrowUp'}, {'key': this.DOWN, 'code': 'ArrowDown'}, {'key': this.SPACE, 'code': 'Space'}, {'key': this.D, 'code': 'KeyD'}];

        window.addEventListener('keydown', (event) => {
            //console.log(event.key, event.code);

            // this.keys.forEach((k) => {
            //     if(event.code == k.code){
            //         k.key = true;
            //     }
            // });
            // console.log(this, keys);

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
                case 'KeyD':
                    this.D = true;
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
                case 'KeyD':
                    this.D = false;
                    break;
            }
            
        });
    
    }
}