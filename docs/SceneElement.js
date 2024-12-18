//parent class for all elements in our scene (all should have a coordinate location and color)
//can always adjust 
export class SceneElement {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    // Abstract method to display the element
    display(ctx) {
        console.log(`Display not implemented for ${this.constructor.name}`);
    }
}
//# sourceMappingURL=SceneElement.js.map