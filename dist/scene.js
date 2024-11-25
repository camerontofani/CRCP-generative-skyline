export class Scene {
    constructor(canvasId) {
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
        // elements: SceneElement[] = [];
        // isDaytime: boolean = true;
        // skyColor: string = 'blue';
        // canvas: HTMLCanvasElement;
        //  ctx: CanvasRenderingContext2D;
        //     // Get the canvas element and its context
        //     private canvas: HTMLCanvasElement;
        //     private ctx: CanvasRenderingContext2D;
        //     constructor() {
        //         this.canvas = document.getElementById('skylineCanvas') as HTMLCanvasElement;
        //         this.ctx = this.canvas.getContext('2d')!;
        //         this.generateBuildings();
        //     }
        //     // Generate some random buildings
        //     generateBuildings(): void {
        //         this.elements = [];  // Clear previous buildings
        //         for (let i = 0; i < 10; i++) {
        //             const x = Math.random() * this.canvas.width;
        //             const height = Math.random() * 300 + 100;  // Height between 100 and 400
        //             const width = Math.random() * 100 + 50;  // Width between 50 and 150
        //             const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        //             const y = this.canvas.height - height;
        //             this.elements.push(new Building(x, y, color, width, height));
        //         }
        //     }
        // constructor(canvasId: string) {
        //     // Get the canvas element by its ID
        //     const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        //     if (!canvas) {
        //       throw new Error('Canvas not found');
        //     }
        //     this.canvas = canvas;
        //     // Get the 2D context of the canvas
        //     const ctx = this.canvas.getContext('2d');
        //     if (!ctx) {
        //       throw new Error('Failed to get canvas context');
        //     }
        //     this.ctx = ctx;
        //   }
        this.skyColor = 'blue';
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
        //fill up entire screen, adjust with window:
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.render(); // Re-render to adjust the scene
        });
    }
    //     // Render the scene with sky and buildings
    render() {
        this.display();
    }
    //     // Display the buildings and the sky
    display() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw the sky
        this.ctx.fillStyle = this.skyColor; // Set sky color
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // Fill the background with sky color
        // Draw each building
        // this.elements.forEach(element => element.display(this.ctx));  // Pass context to buildings for rendering
    }
}
//# sourceMappingURL=scene.js.map