export interface Position {
    x: number;
    y: number;
}

export interface CubePoint {
    x: number;
    y: number;
    z: number;
}

export interface AxialPoint {
    q: number;
    r: number;
}

export const checkCubeConstraint = ({ x, y, z }: CubePoint): boolean => x + y + z === 0;
export const checkAxialConstraint = (aPoint: AxialPoint): boolean => checkCubeConstraint(axialToCube(aPoint));

export const axialToCube = ({ q, r }: AxialPoint): CubePoint => ({ x: q, y: -q - r, z: r });
export const cubeToAxial = ({ x, z }: CubePoint): AxialPoint => ({ q: x, r: z });

export const cubeDistance = (cPointA: CubePoint, cPointB: CubePoint): number => {
    const dx = Math.abs(cPointA.x - cPointB.x);
    const dy = Math.abs(cPointA.y - cPointB.y);
    const dz = Math.abs(cPointA.z - cPointB.z);
    return Math.max(dx, dy, dz);
};

export const axialDistance = (aPointA: AxialPoint, aPointB: AxialPoint): number =>
    cubeDistance(axialToCube(aPointA), axialToCube(aPointB));

const cubeDirections = [
    { x: 1, y: -1, z: 0 },
    { x: 1, y: 0, z: -1 },
    { x: 0, y: 1, z: -1 },
    { x: -1, y: 1, z: 0 },
    { x: -1, y: 0, z: 1 },
    { x: 0, y: -1, z: 1 },
];

export const cubeDirection = (dir: number) => cubeDirections[dir % 6];

export const cubeNeighbor = (cPoint: CubePoint, dir: number) => {
    return cubeAdd(cPoint, cubeDirection(dir));
};

export const cubeAdd = (cPointA: CubePoint, cPointB: CubePoint): CubePoint => ({
    x: cPointA.x + cPointB.x,
    y: cPointA.y + cPointB.y,
    z: cPointA.z + cPointB.z,
});

export const cubeScale = ({ x, y, z }: CubePoint, amount: number) =>
    ({ x: x * amount, y: y * amount, z: z * amount, });

export const buildRing = (centerPoint: CubePoint, radius: number) => {
    const ring = [];
    let cube = cubeAdd(centerPoint, cubeScale(cubeDirection(4), radius));

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < radius; j++) {
            ring.push(cube);
            cube = cubeNeighbor(cube, i);
        }
    }
    return ring;
};

export const axialToPosition = ({ q, r }: AxialPoint): Position => {
    // pointy top
    return {
        x: Math.sqrt(3) * q + Math.sqrt(3) / 2 * r,
        y: 1.5 * r,
    };
}