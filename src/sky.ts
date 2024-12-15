import { SceneElement } from './SceneElement.js';

export class Sky extends SceneElement {
    clouds: { x: number, y: number, size: number, puffCount: number }[];
    sun: { x: number, y: number, radius: number } = { x: 0, y: 0, radius: 80 };
    ctx: CanvasRenderingContext2D | null = null;

    constructor(x: number, y: number, color: string, ctx: CanvasRenderingContext2D) {
        super(x, y, color);
        this.clouds = [];
        this.generateClouds();
        this.ctx = ctx;

        // Place sun at the middle of the canvas
        this.sun.x = window.innerWidth / 2;
        this.sun.y = window.innerHeight / 4;
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

    moveClouds(): void {
        // Slightly randomize cloud positions
        this.clouds = this.clouds.map(cloud => ({
            ...cloud,
            x: cloud.x + (Math.random() - 0.5) * 20, // Small horizontal shift
            y: cloud.y + (Math.random() - 0.5) * 10, // Small vertical shift
        }));
    }

    displayClouds(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'white';
        this.clouds.forEach(cloud => {
            const { x, y, size, puffCount } = cloud;

            for (let i = 0; i < puffCount; i++) {
                const offsetX = (Math.random() - 0.5) * size;
                const offsetY = (Math.random() - 0.5) * size / 2;
                const puffSize = size * (0.6 + Math.random() * 0.4);
                ctx.beginPath();
                ctx.arc(x + offsetX, y + offsetY, puffSize, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }

    displaySun(ctx: CanvasRenderingContext2D): void {
        // Draw sun
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.sun.x, this.sun.y, this.sun.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw rays
        const rayLengths = [120, 80]; // Alternate between long and short rays
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4; // Divide full circle into 8 equal parts
            const length = rayLengths[i % 2];
            const startX = this.sun.x + Math.cos(angle) * this.sun.radius;
            const startY = this.sun.y + Math.sin(angle) * this.sun.radius;
            const endX = this.sun.x + Math.cos(angle) * (this.sun.radius + length);
            const endY = this.sun.y + Math.sin(angle) * (this.sun.radius + length);

            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
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

