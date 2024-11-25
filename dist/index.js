import { Scene } from './scene.js';
//console.log("Hello, Generative Art!");
// // Create a scene
// const scene = new Scene();
// // Generate buildings for the scene
// scene.generateBuildings();
// // Display the generated buildings
// scene.display();
const scene = new Scene('skylineCanvas');
scene.render(); // Render the initial scene
// Add an event listener to the canvas to allow toggling between day and night on click
// document.getElementById('skylineCanvas')?.addEventListener('click', () => {
//     scene.toggleSky();  // Toggle between day and night sky
// });
//# sourceMappingURL=index.js.map