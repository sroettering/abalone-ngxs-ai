import p5 from 'p5';
import 'p5/lib/addons/p5.dom';

const sketch = (p: p5) => {
    p.preload = () => {
    };

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
        p.background(100);
    };
};

const field = new p5(sketch);
