import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import { AxialPoint, buildGrid } from '../math/math';
import { Cell } from './cell';

const sketch = (p: p5) => {

    const boardRadius = 6;

    const cells: Cell[] = buildGrid({ x: 0, y: 0, z: 0 }, boardRadius)
        .map((aPoint: AxialPoint) => new Cell(aPoint));

    p.preload = () => {
    };

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('field');
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
        p.background('#d0d0d0');

        cells.forEach(cell => cell.draw(p));
    };
};

export const field = new p5(sketch);
