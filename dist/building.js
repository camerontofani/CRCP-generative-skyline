//import { SceneElement } from './SceneElement'; 
import { SceneElement } from './SceneElement.js';
export class Building extends SceneElement {
    constructor(x, y) {
        // Call the parent class (SceneElement) constructor
        super(x, y, `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`);
        // Randomize width and height for the building
        this.width = Math.random() * 150 + 50; // Random width between 50 and 200
        this.height = Math.random() * 300 + 100; // Random height between 100 and 400
    }
    // Override the display method to draw the building
    display(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y - this.height, this.width, this.height); // Draw a rectangle for the building
    }
}
// constructor(x: number, y: number, color: string, width: number, height: number) {
//     super(x, y, color);  // Call the parent constructor
//     this.width = width;  // Store the width (size) of the building
//     this.height = height;  // Store the height of the building
// }
// display(): void {
//     console.log(`Displaying building at (${this.x}, ${this.y}) with color ${this.color}, width ${this.width}, and height ${this.height}`);
// }
// width: number;
// height: number;
// constructor(x: number, y: number, color: string, width: number, height: number) {
//     super(x, y, color);  // Call the parent class constructor
//     this.width = width;
//     this.height = height;
// }
// // Override display method to draw the building on the canvas
// display(ctx: CanvasRenderingContext2D): void {
//     ctx.fillStyle = this.color;  // Set the color for the building
//     ctx.fillRect(this.x, this.y, this.width, this.height);  // Draw the building
// }
//# sourceMappingURL=building.js.map