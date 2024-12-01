//import { SceneElement } from './SceneElement'; 

import { SceneElement } from './SceneElement.js';

export class Building extends SceneElement{
    height: number;
    width: number;  
    windows: { x: number; y: number; width: number; height: number }[]; //array for the windows

    constructor(x: number, y: number) {
        super(x, y, `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`);
    
        //random height and width
        this.width = Math.random() * 150 + 50; 
        this.height = Math.random() * 300 + 100; 

        const windowCount = Math.floor(Math.random() * 4); // a building can have between 0 and 3 windows
        this.windows = [];

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
      }
    
      display(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y - this.height, this.width, this.height); //make rectangles for buildings

        //adding a black outline to the buildings so they look more cartoony
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8; //line thickness
        ctx.strokeRect(this.x, this.y - this.height, this.width, this.height); // draws outline

      //  ctx.fillStyle = 'red';
      //  ctx.fillRect(this.x + 10, this.y - this.height + 10, 20, 30);

        ctx.fillStyle = 'white'; // Window color
        ctx.strokeStyle = 'black'; // Window outline color
        ctx.lineWidth = 2; // Thin outline for windows
        for (const window of this.windows) {
            ctx.fillRect(window.x, window.y, window.width, window.height); // Draw each window
            ctx.strokeRect(window.x, window.y, window.width, window.height); // Add outline to windows


            const centerX = window.x + window.width / 2;
            const centerY = window.y + window.height / 2;
            
            // Draw horizontal line of the cross
            ctx.beginPath();
            ctx.moveTo(window.x, centerY);  // Start at the left side of the window
            ctx.lineTo(window.x + window.width, centerY);  // End at the right side
            ctx.stroke();
        
            // Draw vertical line of the cross
            ctx.beginPath();
            ctx.moveTo(centerX, window.y);  // Start at the top of the window
            ctx.lineTo(centerX, window.y + window.height);  // End at the bottom
            ctx.stroke();
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