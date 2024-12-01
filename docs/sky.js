import { SceneElement } from './SceneElement.js';
export class Sky extends SceneElement {
    constructor(x, y, color, ctx) {
        super(x, y, color);
        this.ctx = null; // Add ctx property
        this.isDay = true; // Default to day
        this.clouds = [];
        this.stars = [];
        this.generateClouds();
        this.generateStars();
        this.ctx = ctx; // Set ctx from constructor
        // Add event listener for clicks to toggle day/night
        window.addEventListener('click', () => {
            this.isDay = !this.isDay; // Toggle day/night
            this.color = this.isDay ? 'blue' : 'black'; // Update sky color
            if (this.ctx) {
                this.resetSky();
                this.render(this.ctx); // Pass ctx to render
            }
        });
    }
    resetSky() {
        if (this.isDay) {
            this.generateClouds(); // Create new clouds for day
        }
        else {
            this.generateStars(); // Create new stars for night
        }
    }
    generateClouds() {
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight / 2;
            const size = Math.random() * 50 + 30;
            this.clouds.push({ x, y, size });
        }
    }
    generateStars() {
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const size = Math.random() * 2 + 1;
            this.stars.push({ x, y, size });
        }
    }
    display(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        if (this.isDay) {
            this.displayClouds(ctx);
        }
        else {
            this.displayStars(ctx);
        }
    }
    displayClouds(ctx) {
        ctx.fillStyle = 'white';
        this.clouds.forEach(cloud => {
            ctx.beginPath();
            ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    displayStars(ctx) {
        ctx.fillStyle = 'white';
        this.stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    render(ctx) {
        this.display(ctx); // Pass ctx to the display method
    }
}
//# sourceMappingURL=sky.js.map