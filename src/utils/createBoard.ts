import { candies } from "./candyData";

export const createBoard=(boardSize:number)=>Array(boardSize*boardSize).fill(null).map(()=>candies[Math.floor(Math.random()*candies.length)]);