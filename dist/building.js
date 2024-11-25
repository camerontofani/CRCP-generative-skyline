//import { SceneElement } from './SceneElement'; 
import { SceneElement } from './SceneElement.js';
export class Building extends SceneElement {
    constructor(x, y) {
        super(x, y, `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`);
        //random height and width
        this.width = Math.random() * 150 + 50;
        this.height = Math.random() * 300 + 100;
    }
    display(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y - this.height, this.width, this.height); //make rectangles for buildings
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
// display(ctx: CanvasRenderingContext2D): void {
//     ctx.fillStyle = this.color;  // Set the color for the building
//     ctx.fillRect(this.x, this.y, this.width, this.height);  // Draw the building
// }
//# sourceMappingURL=building.js.map