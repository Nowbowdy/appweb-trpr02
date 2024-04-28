import type PlayerShip from './playerShip'

export default interface Player {
    readonly name: String;
    readonly experience: String;
    readonly score: number;
    readonly ship: PlayerShip;
}  
