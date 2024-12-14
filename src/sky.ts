import { SceneElement } from './SceneElement.js';

export class Sky extends SceneElement {
    clouds: { x: number, y: number, size: number, puffCount: number }[]; 
    sun: { x: number, y: number, radius: number } = { x: window.innerWidth / 2, y: window.innerHeight / 4, radius: 100 }; // Position and size of the sun
    ctx: CanvasRenderingContext2D | null = null;

    constructor(x: number, y: number, color: string, ctx: CanvasRenderingContext2D) {
        super(x, y, color);
        this.clouds = [];
        this.generateClouds();
        this.ctx = ctx; 

        // Add click event for the sun to trigger a visual effect
        window.addEventListener('click', (event) => {
            const distance = Math.sqrt(Math.pow(event.clientX - this.sun.x, 2) + Math.pow(event.clientY - this.sun.y, 2));
            if (distance < this.sun.radius) {
                this.triggerSunEffect();
            }
        });
    }

    generateClouds(): void {
        this.clouds = [];
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight / 2;
            const size = Math.random() * 80 + 30;
            const puffCount = Math.floor(Math.random() * 3) + 3; // 3 to 5 puffs per cloud
            this.clouds.push({ x, y, size, puffCount });
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

    // Draw the sun
    displaySun(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.sun.x, this.sun.y, this.sun.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    // Add rays of sunlight when the user clicks the sun
    triggerSunEffect(): void {
        if (this.ctx) {
            const ctx = this.ctx;
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 2;

            // Draw rays extending outward from the sun
            for (let i = 0; i < 12; i++) {
                const angle = Math.random() * Math.PI * 2;
                const length = Math.random() * 100 + 50;
                const startX = this.sun.x + Math.cos(angle) * this.sun.radius;
                const startY = this.sun.y + Math.sin(angle) * this.sun.radius;
                const endX = this.sun.x + Math.cos(angle) * (this.sun.radius + length);
                const endY = this.sun.y + Math.sin(angle) * (this.sun.radius + length);

                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }
        }
    }

    display(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        this.displayClouds(ctx);
        this.displaySun(ctx);
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.display(ctx);
    }
}

