

import { Building } from './building.js';
//import { SceneElement } from './SceneElement';
import { Sky } from './sky.js'; 

export class Scene {
    sky: Sky;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    buildings: Building[] = [];

    constructor(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) throw new Error('Canvas not found');
        this.canvas = canvas;

        const ctx = this.canvas.getContext('2d');
        if (!ctx) throw new Error('Failed to get canvas context');
        this.ctx = ctx;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.render();
        });

        this.sky = new Sky(0, 0, '#87CEEB', this.ctx);
        this.generateBuildings();

        // Click event handler
        window.addEventListener('click', (event: MouseEvent) => {
            const distance = Math.sqrt(
                Math.pow(event.clientX - this.sky.sun.x, 2) + Math.pow(event.clientY - this.sky.sun.y, 2)
            );

            if (distance <= this.sky.sun.radius) {
                // Sun click: trigger sun rays, regenerate buildings, optionally move clouds
                this.sky.triggerSunEffect();
                this.generateBuildings();
            }
            this.render();
        });
    }

    generateBuildings(): void {
        this.buildings = []; // Clear existing buildings
        const numBuildings = Math.floor(window.innerWidth / 150); // Adjust based on screen width

        for (let i = 0; i < numBuildings; i++) {
            const x = i * 150 + Math.random() * 50;
            const y = this.canvas.height;
            const building = new Building(x, y);
            this.buildings.push(building);
        }
    }

    render(): void {
        this.display();
    }

    display(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render sky
        this.sky.render(this.ctx);

        // Render buildings
        this.buildings.forEach(building => building.display(this.ctx));
    }
}
