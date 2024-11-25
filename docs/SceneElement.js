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
// x: number; // x coord
// y: number; // y coord
// color: string; 
// constructor(x: number, y: number, color: string) {
//     this.x = x;
//     this.y = y;
//     this.color = color;
// }
// //display the element, override when we make actual elements
// //should be spesific to each element 
// display(): void {
//     console.log(`Display not implemented for ${this.constructor.name}`);
// }
// x: number; // x coord
// y: number; // y coord
// color: string; // Color of the element
// constructor(x: number, y: number, color: string) {
//     this.x = x;
//     this.y = y;
//     this.color = color;
// }
// // display the element, override in subclasses to make the elements display properly
// display(ctx: CanvasRenderingContext2D): void {
//     console.log(`Display not implemented for ${this.constructor.name}`);
// }
//# sourceMappingURL=SceneElement.js.map