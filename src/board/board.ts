import { CubePoint, cubeToAxial } from './../math/math';
import p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import { Hexagon } from './hexagon';
import { buildRing } from '../math/math';
import { Cell } from './cell';

const sketch = (p: p5) => {

    const boardRadius = 6;

    const cells = [
        new Cell({ q: 0, r: 0 }), // center
    ];

    for (let r = 0; r < boardRadius; r++) {
        const ring: Cell[] = buildRing({ x: 0, y: 0, z: 0 }, r).map((cPoint: CubePoint) => new Cell(cubeToAxial(cPoint)));
        cells.push(...ring);
    }

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