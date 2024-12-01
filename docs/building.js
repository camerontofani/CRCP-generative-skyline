//import { SceneElement } from './SceneElement'; 
import { SceneElement } from './SceneElement.js';
export class Building extends SceneElement {
    constructor(x, y) {
        super(x, y, `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`);
        //random height and width
        this.width = Math.random() * 150 + 50;
        this.height = Math.random() * 300 + 100;
        const windowCount = Math.floor(Math.random() * 4); // a building can have between 0 and 3 windows
        this.windows = [];
        const doorCount = Math.floor(Math.random() * 2); //only 0 or 1 door
        for (let i = 0; i < windowCount; i++) {
            const windowWidth = this.width / 5; // Make windows proportional to the building width
            const windowHeight = this.height / 10;
            // const windowX = this.x + Math.random() * (this.width - windowWidth);
            //  const windowY = this.y - this.height + Math.random() * (this.height - windowHeight - 10);
            //  this.windows.push({ x: windowX, y: windowY, width: windowWidth, height: windowHeight });
            const windowX = this.x + Math.random() * (this.width - windowWidth);
            const windowY = this.y - this.height + 10 + (i * (windowHeight + 10));
            this.windows.push({ x: windowX, y: windowY, width: windowWidth, height: windowHeight });
            console.log(`Window ${i}: x=${windowX}, y=${windowY}, width=${windowWidth}, height=${windowHeight}`);
        }
        this.doors = [];
        for (let i = 0; i < doorCount; i++) {
            const doorWidth = this.width / 4; // door width 
            const doorHeight = 40; // fixed height for testing
            const doorX = this.x + Math.random() * (this.width - doorWidth); // randomize x 
            const doorY = this.y - this.height + this.height - doorHeight - 10; // low y so door is at bottom 
            this.doors.push({ x: doorX, y: doorY, width: doorWidth, height: doorHeight });
        }
    }
    display(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y - this.height, this.width, this.height); //make rectangles for buildings
        //adding a black outline to the buildings so they look more cartoony
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8; //line thickness
        ctx.strokeRect(this.x, this.y - this.height, this.width, this.height); // draws outline
        ctx.fillStyle = 'white'; // window color
        ctx.strokeStyle = 'black'; // window outline color
        ctx.lineWidth = 2; // outline for windows
        for (const window of this.windows) {
            ctx.fillRect(window.x, window.y, window.width, window.height); // drawing window
            ctx.strokeRect(window.x, window.y, window.width, window.height); // window outline
            const centerX = window.x + window.width / 2;
            const centerY = window.y + window.height / 2;
            // horizontal line for window panes
            ctx.beginPath();
            ctx.moveTo(window.x, centerY); // start left
            ctx.lineTo(window.x + window.width, centerY); // end right
            ctx.stroke();
            // vertical line for the window panes
            ctx.beginPath();
            ctx.moveTo(centerX, window.y); // start top
            ctx.lineTo(centerX, window.y + window.height); // end bottom
            ctx.stroke();
        }
        ctx.fillStyle = 'brown'; //door color
        for (const door of this.doors) {
            ctx.fillRect(door.x, door.y, door.width, door.height); // draws door
            ctx.strokeStyle = 'black'; //outline color
            ctx.lineWidth = 2;
            ctx.strokeRect(door.x, door.y, door.width, door.height); // door outline
        }
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