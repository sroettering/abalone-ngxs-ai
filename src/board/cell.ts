import p5 from 'p5';
import { AxialPoint, axialToPosition, Position } from '../math/math';

export class Cell {

    private readonly RADIUS = 50;

    constructor(private axialPos: AxialPoint) {
    }

    draw = (p: p5) => {
        const piSixth = p.TWO_PI / 6;
        const position: Position = axialToPosition(this.axialPos);
        const x = position.x * this.RADIUS; // TODO: remove windowWith and Height
        const y = position.y * this.RADIUS;

        p.push();
        p.fill('#111111');
        p.beginShape();
        for (let a = piSixth/2; a < p.TWO_PI + piSixth/2; a += piSixth) {
            let sx = x + p.cos(a) * this.RADIUS;
            let sy = y + p.sin(a) * this.RADIUS;
            p.vertex(sx, sy);
        }
        p.endShape();
        p.fill('#d0d0d0');
        p.circle(x, y, this.RADIUS);
        p.pop();
    }
}