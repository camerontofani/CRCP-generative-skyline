import { SceneElement } from './SceneElement.js';

export class Sky extends SceneElement {
    isDay: boolean;
    clouds: { x: number, y: number, size: number, puffCount: number }[];
    stars: { x: number, y: number, size: number }[];
    ctx: CanvasRenderingContext2D | null = null;  //  ctx property

    constructor(x: number, y: number, color: string, ctx: CanvasRenderingContext2D) {
        super(x, y, color);
        this.isDay = true;  // default to day
        this.clouds = [];
        this.stars = [];
        this.ctx = ctx;  //  ctx from constructor

        this.generateClouds();
        this.generateStars();

        // this handles clicks which should correspond to day/night cycle
        window.addEventListener('click', () => {
            this.isDay = !this.isDay;  //  day/night
            this.color = this.isDay ? 'blue' : 'black';  // changes sky color

            if (this.ctx) {
                this.resetSky();
                this.render(this.ctx);
            }
        });
    }

    resetSky(): void {
        if (this.isDay) {
            this.stars = [];  // clear stars
            this.generateClouds();  //  new clouds for day
        } else {
            this.clouds = [];  // clear clouds
            this.generateStars();  //  new stars for night
        }
    }

    generateClouds(): void {
        this.clouds = []; // reset clouds array
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight / 2;
            const size = Math.random() * 50 + 30;
            const puffCount = Math.floor(Math.random() * 3) + 3; // 3 to 5 puffs per cloud
            this.clouds.push({ x, y, size, puffCount }); // puffCount
        }
    }

    generateStars(): void {
        this.stars = []; // reset stars array
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const size = Math.random() * 2 + 1;
            this.stars.push({ x, y, size });
        }
    }

    display(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        if (this.isDay) {
            this.displayClouds(ctx);
        } else {
            this.displayStars(ctx);
        }
    }

    displayClouds(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'white';
        this.clouds.forEach(cloud => {
            const { x, y, size, puffCount } = cloud;
            for (let i = 0; i < puffCount; i++) {
                const offsetX = (Math.random() - 0.5) * size;
                const offsetY = (Math.random() - 0.5) * size / 2;
                const puffSize = size * (0.6 + Math.random() * 0.4); // random puff size
                ctx.beginPath();
                ctx.arc(x + offsetX, y + offsetY, puffSize, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }

    displayStars(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'white';
        this.stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.display(ctx);
    }
}


