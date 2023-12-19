import Node from "./node.js";

export default class chessGraph {
  constructor() {
    this.boardMap = this.#createBoardMap();
  }

  #linkChildren(node, map) {
    const data = node.getData();
    const xValue = Number(data.slice(1, 2));
    const yValue = Number(data.slice(3, 4));
    const possibilities = [
      [xValue + 2, yValue + 1],
      [xValue + 1, yValue + 2],
      [xValue - 2, yValue + 1],
      [xValue - 1, yValue + 2],
      [xValue - 2, yValue - 1],
      [xValue - 1, yValue - 2],
      [xValue + 2, yValue - 1],
      [xValue + 1, yValue - 2],
    ];

    possibilities.forEach((cell) => {
      if (cell[0] > 0 && cell[0] < 8 && cell[1] > 0 && cell[1] < 8) {
        node.addLink(map.get(`[${cell[0]},${cell[1]}]`));
      }
    });
  }

  #createBoardMap() {
    const positions = [];
    const map = new Map();
    for (let x = 0; x < 8; x += 1) {
      for (let y = 0; y < 8; y += 1) {
        positions.push(`[${x},${y}]`);
        map.set(`[${x},${y}]`, new Node(`[${x},${y}]`));
      }
    }
    map.forEach((node) => {
      this.#linkChildren(node, map);
    });
    return map;
  }

  #depthFirstSearch(
    node,
    wantedNode,
    traveled,
    currentPath = [],
    shortest = null
  ) {
    if (node === wantedNode) {
      return [node];
    }
    const traveledClone = new Map(traveled);
    if (traveledClone.get(node.data)) {
      return null;
    }
    traveledClone.set(node.data, true);
    const currentPathClone = [...currentPath];
    currentPathClone.push(node);
    if (shortest != null) {
      if (currentPathClone.length > shortest.length) {
        return null;
      }
    }
    let shortesthPath = shortest;
    let currentNewPath = null;
    node.getLinks().forEach((link) => {
      const path = this.#depthFirstSearch(
        link,
        wantedNode,
        traveledClone,
        currentPathClone,
        shortesthPath
      );
      if (currentNewPath === null) {
        currentNewPath = path;
        if (path != null) {
          shortesthPath = currentPathClone.concat(path);
        }
      } else if (path != null && currentNewPath.length >= path.length) {
        currentNewPath = path;
        shortesthPath = currentPathClone.concat(path);
      }
    });
    if (currentNewPath === null) {
      return null;
    }
    return [node].concat(currentNewPath);
  }

  printMap() {
    this.boardMap.forEach((node) => {
      console.log(node);
    });
  }

  knightMoves(initial, final) {
    const path = this.#depthFirstSearch(
      this.boardMap.get(initial),
      this.boardMap.get(final),
      new Map()
    );
    let string = "[";
    path.forEach((node, index) => {
      if (index === 0) {
        string = `${string}${node.data}`;
      } else {
        string = `${string}, ${node.data}`;
      }
    });
    string = `${string}]`;
    return string;
  }
}
