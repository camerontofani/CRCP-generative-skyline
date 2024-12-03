import { SceneElement } from './SceneElement.js';

export class Sky extends SceneElement
{
    isDay: boolean;
    clouds: { x: number, y: number, size: number }[];
    stars: { x: number, y: number, size: number }[];
    ctx: CanvasRenderingContext2D | null = null;  // Add ctx property

    constructor(x: number, y: number, color: string, ctx: CanvasRenderingContext2D) 
    {
        super(x, y, color);
        this.isDay = true;  // Default to day
        this.clouds = [];
        this.stars = [];
        this.generateClouds();
        this.generateStars();
        this.ctx = ctx;  // Set ctx from constructor

        // Add event listener for clicks to toggle day/night
        window.addEventListener('click', () => 
        {
            this.isDay = !this.isDay;  // Toggle day/night
            this.color = this.isDay ? 'blue' : 'black';  // Update sky color

            if (this.ctx) 
            {
                this.resetSky();
                this.render(this.ctx);  // Pass ctx to render
            }
        });
    }

    resetSky(): void 
    {
        if (this.isDay) 
        {
            this.stars = [];  // Clear stars
            this.generateClouds();  // Create new clouds for day
        } else 
        {
            this.clouds = [];  // Clear clouds
            this.generateStars();  // Create new stars for night
        }
    }

    generateClouds(): void 
    {
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight / 2;
            const size = Math.random() * 50 + 30;
            this.clouds.push({ x, y, size });
        }
    }

    generateStars(): void 
    {
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const size = Math.random() * 2 + 1;
            this.stars.push({ x, y, size });
        }
    }

    display(ctx: CanvasRenderingContext2D): void 
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        if (this.isDay) 
        {
            this.displayClouds(ctx);
        } else 
        {
            this.displayStars(ctx);
        }
    }

    displayClouds(ctx: CanvasRenderingContext2D): void 
    {
        ctx.fillStyle = 'white';
        this.clouds.forEach(cloud => 
            {
            ctx.beginPath();
            ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    displayStars(ctx: CanvasRenderingContext2D): void 
    {
        ctx.fillStyle = 'white';
        this.stars.forEach(star => 
            {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    render(ctx: CanvasRenderingContext2D): void 
    {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.display(ctx);  // Pass ctx to the display method
    }
}

