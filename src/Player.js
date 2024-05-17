import { canvas, width, height, particles, won, audio } from "./main.js";
import Particle from "./Particle.js";
import keys from "./assets/keys.json";
import meowAudio from "./assets/audios/meow.mp3";

export default class Player {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        
        this.size = 150;
        
        this.direction = "droite";
        this.velocity = 10;
        this.vie = 5;
        this.froid = true;

        this.view = {
            x: this.x - (window.innerWidth / 2) + (this.size / 2),
            y: this.y - (window.innerHeight / 2) + (this.size / 2)
        };

        this.ajustView();
    }

    bouge(t) {
        switch (t) {
            case keys.up:
                if (this.y - this.velocity > 0) {
                    this.y -= this.velocity;
                }
                break;

            case keys.down:
                if (this.y + this.velocity < height - this.size) {
                    this.y += this.velocity;
                }
                break;

            case keys.left:
                if (this.x - this.velocity > 0) {
                    this.direction = "gauche";
                    this.x -= this.velocity;
                }
                break;

            case keys.right:
                if (this.x + this.velocity < width - this.size) {
                    this.direction = "droite";
                    this.x += this.velocity;
                }
                break;
                
            case keys.meow:
                this.meow();
                break;

            default:
                break;
            
        }

        this.ajustView();
    }

    ajustView() {
        if (won) return;

        if (this.x + (window.innerWidth / 2) + (this.size / 2) < width) {
            this.view.x = this.x - (window.innerWidth / 2) + (this.size / 2);
        }
        
        if (this.y + (window.innerHeight / 2) + (this.size / 2) < height) {
            this.view.y = this.y - (window.innerHeight / 2) + (this.size / 2);
        }

        canvas.style.transform = "";
        canvas.style.transform += `translateX(-${this.view.x}px)`;
        canvas.style.transform += `translateY(-${this.view.y}px)`;
    }

    meow() {
        if (!this.froid) return;
        this.froid = false;
        setTimeout(() => this.froid = true, 500);

        audio(meowAudio);

        for (let i = 0; i < 50; i++) {
            particles.push(
                new Particle (
                    this.x + this.size / 2,
                    this.y + this.size / 2,
                    20,
                    0.5,
                    "#00FFFF",
                    "#FFFFFF"
                )
            );
        }
    }
}