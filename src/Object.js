import { height, width, objects, collision } from "./main.js";

export default class object {
    constructor(object) {
        this.size = object.size;
        this.nourriture = object.nourriture;
        this.img = object.img;
        
        this.randomPos();
    }

    randomPos() {
        this.x = Math.random() * (width - this.size);
        this.y = Math.random() * (height - this.size);

        let fini = false;

        while (!fini) {
            let n = 0;

            objects.forEach(e => {
                if (collision(e, this) || collision(this, e)) {
                    this.x = Math.random() * (width - this.size);
                    this.y = Math.random() * (height - this.size);
                } else n++;
            });

            if (n === objects.length) fini = true;
        }
    }
}