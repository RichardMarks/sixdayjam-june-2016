
const map = [
  3,  7,  8,  8,  8,   8,  8,  4,
  0,  0,  3,  4,  3,   8,  4,  0,
  0,  0,  1,  2,  9,   4,  0,  0,
  0,  0,  0,  6,  3,   2,  1,  2,
  0,  0,  1,  5, 14,   2,  0,  0,
  0,  0, 11,  0,  6,  11,  0, 11,
  0,  9,  8, 14, 14,  12,  0,  6,
  9,  8,  8,  8, 12,  13, 14, 10,
];

// translates map ids to dungeon prefab scenes to render
// mapToPrefabTranslator[map[position]][player.direction] = renderPrefabId
// directions: 0: north, 1: east, 2: south, 3: west
const mapToPrefabTranslator = [
  [0, 7, 0, 7],
  [1, 5, 2, 0],
  [2, 7, 1, 5],
  [3, 1, 0, 4],

  [4, 3, 0, 0],

  [5, 5, 5, 5],
  [6, 3, 0, 4],
  [7, 1, 5, 2],
  [7, 0, 7, 0],
  [1, 2, 4, 3],
  [2, 4, 3, 1],
  [0, 4, 6, 3],
  [4, 6, 3, 0],
  [3, 0, 4, 6],
  [5, 2, 7, 1]
];

export const level1 = {
  name: 'Demo',
  width: 8,
  height: 8,
  data: map,
  translate: mapToPrefabTranslator, // TODO - move into util
  start: {
    x: 4,
    y: 7,
    direction: 3, // face west
  },
  portal: {
    x: 3,
    y: 3,
    direction: 0,
  },
};
