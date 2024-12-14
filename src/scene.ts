import { Building } from './building.js';
import { Sky } from './sky.js';

export class Scene {
    sky: Sky;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    buildings: Building[] = [];

    constructor(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) { throw new Error('Canvas not found'); }
        this.canvas = canvas;

        const ctx = this.canvas.getContext('2d');
        if (!ctx) { throw new Error('Failed to get canvas context'); }
        this.ctx = ctx;

        // Fill up entire screen, adjust with window:
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.render(); // Adjust with a new window sizing
        });

        this.sky = new Sky(0, 0, '#87CEEB', this.ctx);

        this.generateBuildings();

        // For day/night difference
        window.addEventListener('click', () => {
            console.log('Canvas clicked! Toggling day/night.');
            this.sky.isDay = !this.sky.isDay;  // Toggle between day and night
            this.sky.color = this.sky.isDay ? '#87CEEB' : 'black';  // Change sky color
            console.log(`isDay: ${this.sky.isDay}, color: ${this.sky.color}`);

            // Regenerate buildings and reset sky for the new time of day
            this.generateBuildings();
            this.sky.resetSky(); // Add this line to reset the sky
            this.render();  // Re-render the scene after toggling the sky
        });
    }

    generateBuildings(): void {
        this.buildings = []; // Clear existing ones
        const numBuildings = Math.floor(window.innerWidth / 150); // This determines the number of buildings based on window size

        for (let i = 0; i < numBuildings; i++) {
            const x = i * 150 + Math.random() * 50;
            const y = this.canvas.height; // Base
            const building = new Building(x, y);
            this.buildings.push(building);
        }
    }

    render(): void {
        this.display();
    }

    display(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.sky.render(this.ctx);
        this.buildings.forEach(building => building.display(this.ctx)); // Draw each building
    }
}


