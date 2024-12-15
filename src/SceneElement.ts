//parent class for all elements in our scene (all should have a coordinate location and color)
//can always adjust 

export class SceneElement 
{
    x: number; // x coord
    y: number; // y coord
    color: string; // color of the element
  
    constructor(x: number, y: number, color: string) 
    {
      this.x = x;
      this.y = y;
      this.color = color;
    }
  
    // Abstract method to display the element
    display(ctx: CanvasRenderingContext2D): void 
    {
      console.log(`Display not implemented for ${this.constructor.name}`);
    }
}

