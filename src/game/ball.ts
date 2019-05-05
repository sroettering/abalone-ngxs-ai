import { AxialPoint } from './../math/math';
import { Team } from "./team";

export interface Ball {
    team: Team;
    axialPos: AxialPoint;
}
