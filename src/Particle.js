import { height, width, particles } from "./main.js";

export default class Particle {
    constructor(x, y, size, dsize, color, border) {
        this.x = x;
        this.y = y;
        this.dx = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5;
        this.dy = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5;

        this.size = size;
        this.dsize = dsize;
        
        this.color = color;
        this.border = border;
    }

    bouge() {
        this.x += this.dx;
        this.y += this.dy;
        this.size -= this.dsize;

        if (this.size < 1 ||
            this.x < 0 || this.x > width ||
            this.y < 0 || this.y > height) this.die();
    }

    die() {
        particles.splice(particles.indexOf(this), 1);
    }
}