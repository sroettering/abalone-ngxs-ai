export interface GameStateModel {
    running: boolean;
}

export interface SetRunning {
    type: 'set running';
    payload: boolean;
}

export const setRunning = (running: boolean) =>
