import Node from "./node.js";
import chessGraph from "./chessGraph.js";

const node1 = new Node("0,0");
console.log(node1.getData());
const a = "[1,2]";
const b = Number(a.slice(1, 2));
console.log(typeof b);

const board = new chessGraph();
// Assuming 'board' is an instance of the 'ChessGraph' class

// Measure execution time for knightMoves
const start = "[0,0]";
const end = "[7,7]";
const startKnightMoves = performance.now();
board.knightMoves(start, end);
const endKnightMoves = performance.now();
const knightMovesTime = endKnightMoves - startKnightMoves;
console.log(`Execution time for knightMoves: ${knightMovesTime} milliseconds`);

// Measure execution time for fastKnightMoves
const startFastKnightMoves = performance.now();
board.fastKnightMoves(start, end);
const endFastKnightMoves = performance.now();
const fastKnightMovesTime = endFastKnightMoves - startFastKnightMoves;
console.log(
  `Execution time for fastKnightMoves: ${fastKnightMovesTime} milliseconds`
);
