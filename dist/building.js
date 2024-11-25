import { SceneElement } from './SceneElement';
export class Building extends SceneElement {
    constructor(x, y, color, width, height) {
        super(x, y, color); // Call the parent class constructor
        this.width = width;
        this.height = height;
    }
    // Override display method to draw the building on the canvas
    display(ctx) {
        ctx.fillStyle = this.color; // Set the color for the building
        ctx.fillRect(this.x, this.y, this.width, this.height); // Draw the building
    }
}
//# sourceMappingURL=building.js.map