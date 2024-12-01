

import { Building } from './building.js';
//import { SceneElement } from './SceneElement';
import { Sky } from './sky.js'; 

export class Scene{

  //  skyColor: string = 'blue'; 
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
        
        //fill up entire screen, adjust with window:
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        window.addEventListener('resize', () => 
        {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.render(); //this is so it adjusts with a new window sizing
        });

        this.sky = new Sky(0, 0, '#87CEEB', this.ctx);

        this.generateBuildings();

        //for day/night difference
        window.addEventListener('click', () => 
        {
            this.sky.isDay = !this.sky.isDay;  // Toggle between day and night
            this.sky.color = this.sky.isDay ? '#87CEEB' : 'black';  // Change sky color

            // Regenerate buildings and reset sky for the new time of day
            this.generateBuildings();
            this.render();  // Re-render the scene after toggling the sky
        });
    
    }

    generateBuildings(): void {
        this.buildings = []; //clear existing ones 
        const numBuildings = Math.floor(window.innerWidth / 150); //this determines num of buildings based on window size

        for (let i = 0; i < numBuildings; i++) {
            const x = i * 150 + Math.random() * 50; 
            const y = this.canvas.height; //base 
            const building = new Building(x, y);
            this.buildings.push(building);
        }
    }
    render(): void 
    {
        this.display();
    }
    
    display(): void 
    {   //should display buildings and sky 
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        //    this.ctx.fillStyle = this.skyColor;  // Set sky color
        //    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);  // Fill the background with sky color

            this.sky.render(this.ctx); 
            
            this.buildings.forEach(building => building.display(this.ctx));
    
            // Draw each building
           // this.elements.forEach(element => element.display(this.ctx));  // Pass context to buildings for rendering
    }

}
