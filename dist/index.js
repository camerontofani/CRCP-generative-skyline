var _a;
import { Scene } from './scene';
console.log("Hello, Generative Art!");
// // Create a scene
// const scene = new Scene();
// // Generate buildings for the scene
// scene.generateBuildings();
// // Display the generated buildings
// scene.display();
const scene = new Scene();
scene.render(); // Render the initial scene
// Add an event listener to the canvas to allow toggling between day and night on click
(_a = document.getElementById('skylineCanvas')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    scene.toggleSky(); // Toggle between day and night sky
});
//# sourceMappingURL=index.js.map