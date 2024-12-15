import { Building } from './building.js';
//import { SceneElement } from './SceneElement';
import { Sky } from './sky.js';
export class Scene {
    constructor(canvasId) {
        this.buildings = [];
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            throw new Error('Canvas not found');
        }
        this.canvas = canvas;
        const ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Failed to get canvas context');
        }
        this.ctx = ctx;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.render();
        });
        this.sky = new Sky(0, 0, '#87CEEB', this.ctx);
        // sun size
        this.sun = { x: window.innerWidth / 2, y: window.innerHeight / 4, radius: 40 };
        this.generateBuildings();
        window.addEventListener('click', (event) => {
            // if the sun is clicked
            const distance = Math.sqrt(Math.pow(event.clientX - this.sun.x, 2) + Math.pow(event.clientY - this.sun.y, 2));
            if (distance <= this.sun.radius) {
                // create rays of light 
                this.generateRaysOfLight(event.clientX, event.clientY);
                // also generate buildings when the sun is clicked
                this.generateBuildings();
            }
            this.render(); // re render
        });
    }
    generateBuildings() {
        this.buildings = []; // Clear existing 
        const numBuildings = Math.floor(window.innerWidth / 150); // buildings based on screen width
        for (let i = 0; i < numBuildings; i++) {
            const x = i * 150 + Math.random() * 50;
            const y = this.canvas.height;
            const building = new Building(x, y);
            this.buildings.push(building);
        }
    }
    generateRaysOfLight(sunX, sunY) {
        // generate rays of light from the sun
        const raysCount = 12; // number of rays
        const rayLength = 200; // length
        const rayAngleInterval = (Math.PI * 2) / raysCount;
        this.ctx.strokeStyle = 'yellow';
        this.ctx.lineWidth = 2;
        for (let i = 0; i < raysCount; i++) {
            const angle = i * rayAngleInterval;
            const rayX = sunX + Math.cos(angle) * rayLength;
            const rayY = sunY + Math.sin(angle) * rayLength;
            this.ctx.beginPath();
            this.ctx.moveTo(sunX, sunY);
            this.ctx.lineTo(rayX, rayY);
            this.ctx.stroke();
        }
    }
    render() {
        this.display();
    }
    display() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //  sky
        this.sky.render(this.ctx);
        //  buildings
        this.buildings.forEach(building => building.display(this.ctx));
        //  sun
        this.ctx.fillStyle = 'yellow';
        this.ctx.beginPath();
        this.ctx.arc(this.sun.x, this.sun.y, this.sun.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
//# sourceMappingURL=scene.js.map