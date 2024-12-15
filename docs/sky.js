import { SceneElement } from './SceneElement.js';
export class Sky extends SceneElement {
    constructor(x, y, color, ctx) {
        super(x, y, color);
        this.sun = { x: 0, y: 0, radius: 80 };
        this.ctx = null;
        this.clouds = [];
        this.generateClouds();
        this.ctx = ctx;
        // Place sun at the middle of the canvas
        this.sun.x = window.innerWidth / 2;
        this.sun.y = window.innerHeight / 4;
    }
    generateClouds() {
        this.clouds = [];
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight / 2;
            const size = Math.random() * 80 + 30;
            const puffCount = Math.floor(Math.random() * 3) + 3; // 3 to 5 puffs per cloud
            this.clouds.push({ x, y, size, puffCount });
        }
    }
    moveClouds() {
        // Slightly randomize cloud positions
        this.clouds = this.clouds.map(cloud => (Object.assign(Object.assign({}, cloud), { x: cloud.x + (Math.random() - 0.5) * 20, y: cloud.y + (Math.random() - 0.5) * 10 })));
    }
    displayClouds(ctx) {
        ctx.fillStyle = 'white';
        this.clouds.forEach(cloud => {
            const { x, y, size, puffCount } = cloud;
            for (let i = 0; i < puffCount; i++) {
                const offsetX = (Math.random() - 0.5) * size;
                const offsetY = (Math.random() - 0.5) * size / 2;
                const puffSize = size * (0.6 + Math.random() * 0.4);
                ctx.beginPath();
                ctx.arc(x + offsetX, y + offsetY, puffSize, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }
    displaySun(ctx) {
        // draw sun
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.sun.x, this.sun.y, this.sun.radius, 0, Math.PI * 2);
        ctx.fill();
        //  rays
        const rayLengths = [120, 80]; // alternate between long and short rays
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4; // divide into 8 equal parts
            const rayStartX = this.sun.x + Math.cos(angle) * this.sun.radius;
            const rayStartY = this.sun.y + Math.sin(angle) * this.sun.radius;
            const rayEndX = this.sun.x + Math.cos(angle) * (this.sun.radius + rayLengths[i % 2]);
            const rayEndY = this.sun.y + Math.sin(angle) * (this.sun.radius + rayLengths[i % 2]);
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 4; // thick lines
            ctx.beginPath();
            ctx.moveTo(rayStartX, rayStartY);
            ctx.lineTo(rayEndX, rayEndY);
            ctx.stroke();
        }
    }
    display(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        this.displayClouds(ctx);
        this.displaySun(ctx);
    }
    render(ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.display(ctx);
    }
}
//# sourceMappingURL=sky.js.map