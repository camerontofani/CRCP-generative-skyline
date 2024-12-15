import { SceneElement } from './SceneElement.js';

export class Sky extends SceneElement 
{
    clouds: { x: number, y: number, size: number, puffCount: number }[];
    sun: { x: number, y: number, radius: number } = { x: window.innerWidth / 2, y: window.innerHeight / 4, radius: 100 }; // placement + size of the sun
    rays: { startX: number, startY: number, endX: number, endY: number }[] = []; // sun rays
    ctx: CanvasRenderingContext2D | null = null;

    constructor(x: number, y: number, color: string, ctx: CanvasRenderingContext2D) 
    {
        super(x, y, color);
        this.clouds = [];
        this.generateClouds();
        this.ctx = ctx;

        // click event so things move upon click(s)
        window.addEventListener('click', (event) => 
        {
            const distance = Math.sqrt(
                Math.pow(event.clientX - this.sun.x, 2) + Math.pow(event.clientY - this.sun.y, 2)
            );
            if (distance < this.sun.radius) 
            {
                console.log('Sun clicked!');
                this.triggerSunEffect();
            }
        });
    }

    generateClouds(): void 
    {
        this.clouds = [];
        for (let i = 0; i < 5; i++) 
        {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight / 2;
            const size = Math.random() * 80 + 30;
            const puffCount = Math.floor(Math.random() * 3) + 3; // 3 to 5 puffs per cloud
            this.clouds.push({ x, y, size, puffCount });
        }
    }

    displayClouds(ctx: CanvasRenderingContext2D): void 
    {
        ctx.fillStyle = 'white';
        this.clouds.forEach((cloud) => 
        {
            const { x, y, size, puffCount } = cloud;

            for (let i = 0; i < puffCount; i++) 
            {
                const offsetX = (Math.random() - 0.5) * size;
                const offsetY = (Math.random() - 0.5) * size / 2;
                const puffSize = size * (0.6 + Math.random() * 0.4); // random puff size
                ctx.beginPath();
                ctx.arc(x + offsetX, y + offsetY, puffSize, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }

    displaySun(ctx: CanvasRenderingContext2D): void 
    {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.sun.x, this.sun.y, this.sun.radius, 0, Math.PI * 2);
        ctx.fill();

        // drawing the rays of the sun
        if (this.rays.length > 0) {
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 2;
            this.rays.forEach((ray) => 
            {
                ctx.beginPath();
                ctx.moveTo(ray.startX, ray.startY);
                ctx.lineTo(ray.endX, ray.endY);
                ctx.stroke();
            });
        }
    }

    triggerSunEffect(): void 
    {
        // generating the sun rays
        this.rays = [];
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI / 4) * i; // making 8 lines
            const rayLength = i % 2 === 0 ? 150 : 100; // 4 long and 4 short lines

            const startX = this.sun.x + Math.cos(angle) * this.sun.radius;
            const startY = this.sun.y + Math.sin(angle) * this.sun.radius;
            const endX = this.sun.x + Math.cos(angle) * (this.sun.radius + rayLength);
            const endY = this.sun.y + Math.sin(angle) * (this.sun.radius + rayLength);

            this.rays.push({ startX, startY, endX, endY });
        }

        //updates clouds and buildings
        window.dispatchEvent(new Event('sunClicked'));
    }

    display(ctx: CanvasRenderingContext2D): void 
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        this.displayClouds(ctx);
        this.displaySun(ctx);
    }

    render(ctx: CanvasRenderingContext2D): void 
    {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.display(ctx);
    }
}

