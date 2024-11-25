import { Scene } from './scene.js'; 
//import { Building } from './building.js';

//console.log("Hello, Generative Art!");
// const scene = new Scene();
// scene.generateBuildings();
// scene.display();

const scene = new Scene('skylineCanvas');
scene.render();  // Render the initial scene

// document.getElementById('skylineCanvas')?.addEventListener('click', () => {
//     scene.toggleSky();  // Toggle between day and night sky
// });