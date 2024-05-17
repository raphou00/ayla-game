import Player from "./Player.js";
import Object from "./Object.js";
import Particle from "./Particle.js";

import bushImage from "./assets/images/bush.png";
import fishImage from "./assets/images/fish.png";
import floorImage from "./assets/images/floor.png";
import flowerImage from "./assets/images/flower.png";
import treeImage from "./assets/images/tree.png";
import playerImage from "./assets/images/player.png";

import musicAudio from "./assets/audios/music.mp3";
import eatAudio from "./assets/audios/eat.mp3";

export let won = false;
export const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d");
export const width = canvas.width = 5000;
export const height = canvas.height = 5000;
export const keys = [];
export const particles = [];
export const objects = [];
export const player = new Player();

export const audio = (src, vol=0.1, loop=false) => {
    const a = new Audio(src);
    a.volume = vol;
    a.loop = loop;
    a.play();
};

export const collision = (obj1, obj2) => {
    if (((obj1.x > obj2.x && obj1.x < obj2.x + obj2.size) || 
        (obj1.x + obj1.size > obj2.x && obj1.x + obj1.size < obj2.x + obj2.size)) &&
        ((obj1.y > obj2.y && obj1.y < obj2.y + obj2.size) || 
        (obj1.y + obj1.size > obj2.y && obj1.y + obj1.size < obj2.y + obj2.size))) return true;
    
    return false;
};


const win = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.transform = "";

    player.x = window.innerWidth / 2 - player.size / 2;
    player.y = window.innerHeight / 2 - player.size / 2;

    won = true;

    setInterval(() => {
        const x = Math.random() * width;
        let y = height;
        
        const bouger = () => {
            setTimeout(() => {
                y -= 10;
                particles.push(new Particle(x, y, 15, 0.7, "#FFF", "#0FF"));
                
                if (y < 200) {
                    for (let n = 0; n < 100; n++) {
                        particles.push(new Particle(x, y, 25, 0.4, colors[Math.floor(Math.random() * colors.length)], "#FFF"));
                    }
                } else bouger();
            }, 5);
        };
        
        bouger();
    }, 100);
};

const loopGame = () => {
    keys.forEach(e => player.bouge(e));

    particles.forEach(e => e.bouge());

    objects.forEach(e => {
        if (!e.nourriture) return;
        if (!collision(e, player)) return;
        
        point++;
        if (point === 20) win();
        pointEl.innerHTML = `poisson | ${point} / 20`;

        player.size += 5;
        objects.splice(objects.indexOf(e), 1);
        audio(eatAudio);
    });
};

const loopAnimate = () => {
    requestAnimationFrame(loopAnimate);
    ctx.clearRect(0, 0, width, height);

    for (let x = 0; x < width; x+=600) {
        for (let y = 0; y < width; y+=600) {
            ctx.drawImage(floorImg, x, y, 600, 600);
        }
    }
    
    objects.forEach(e => {
        ctx.drawImage(e.img, e.x, e.y, e.size, e.size);
    });

    particles.forEach(e => {
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x, e.y, e.size, e.size);
        
        ctx.strokeStyle = e.border;
        ctx.strokeRect(e.x, e.y, e.size, e.size);
    });
    
    ctx.drawImage(playerImg, player.x, player.y, player.size, player.size);
};

/* 👁 */

const homeEl = document.getElementById("home");
const pointEl = document.getElementById("point");
let game = false;
let point = 0;

const colors = ["#F00", "#0F0", "#00F", "#FF0", "#F0F", "#0FF"];

const playerImg = new Image();
playerImg.src = playerImage;

const floorImg = new Image();
floorImg.src = floorImage;

const fishImg = new Image();
fishImg.src = fishImage;

const treeImg = new Image();
treeImg.src = treeImage;

const bushImg = new Image();
bushImg.src = bushImage;

const flowerImg = new Image();
flowerImg.src = flowerImage;

const objectsImg = [
    { img: treeImg, size: 300 },
    { img: bushImg, size: 125 },
    { img: flowerImg, size: 75 }
];

for (let i = 0; i < 100; i++) {
    const randomObject = objectsImg[Math.floor(Math.random() * objectsImg.length)];
    objects.push(new Object(randomObject));
}

for (let i = 0; i < 20; i++) {
    objects.push(new Object({img: fishImg, size: 75, nourriture: true}));
}

document.addEventListener("click", () => {
    if (game) return;
    game = true;

    homeEl.remove();
    
    setInterval(loopGame, 10);
    loopAnimate();
      
    document.addEventListener("keydown", e => {
        if (!keys.includes(e.code)) keys.push(e.code);
    });
    
    document.addEventListener("keyup", e => {
        keys.splice(keys.indexOf(e.code), 1);
    });


    audio(musicAudio, 0.1, true);
});