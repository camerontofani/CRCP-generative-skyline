import { Building } from './building';
export class Scene {
    constructor() {
        // elements: SceneElement[] = [];
        // isDaytime: boolean = true;
        // generateBuildings(): void {
        //     this.elements = []; // Clear the previous elements
        //     for (let i = 0; i < 10; i++) { // Example: Generate 10 buildings
        //         const x = Math.random() * window.innerWidth;
        //         const height = Math.random() * 300 + 100; // Height between 100 and 400
        //         const width = Math.random() * 100 + 50;  // Width between 50 and 150
        //         const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        //         const y = window.innerHeight - height;
        //         this.elements.push(new Building(x, y, color, width, height));
        //     }
        // }
        // display(): void {
        //     console.clear(); // Clear the console for each frame
        //     this.elements.forEach(element => element.display());
        // }
        this.elements = [];
        this.isDaytime = true;
        this.skyColor = 'blue';
        this.canvas = document.getElementById('skylineCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.generateBuildings();
    }
    // Generate some random buildings
    generateBuildings() {
        this.elements = []; // Clear previous buildings
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * this.canvas.width;
            const height = Math.random() * 300 + 100; // Height between 100 and 400
            const width = Math.random() * 100 + 50; // Width between 50 and 150
            const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
            const y = this.canvas.height - height;
            this.elements.push(new Building(x, y, color, width, height));
        }
    }
    // Render the scene with sky and buildings
    render() {
        this.display();
    }
    // Display the buildings and the sky
    display() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw the sky
        this.ctx.fillStyle = this.skyColor; // Set sky color
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // Fill the background with sky color
        // Draw each building
        this.elements.forEach(element => element.display(this.ctx)); // Pass context to buildings for rendering
    }
    // Change sky color to toggle between day and night
    toggleSky() {
        this.isDaytime = !this.isDaytime;
        this.skyColor = this.isDaytime ? 'blue' : 'black'; // Day is blue, night is black
        this.render();
    }
}
//# sourceMappingURL=scene.js.map