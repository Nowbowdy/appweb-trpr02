import type Ship from "./ship.js"

export default interface Character {
    readonly id: number;
    readonly name: string;
    readonly credit: number;
    readonly experience: number;
    readonly ship: Ship;
  }  