import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants';

let ctx = null;
export function setRenderTarget(target) { ctx = target; }

// utility functions used externally to create vertices table below - saved here for reference
function screenVertexToModelVertex(vertex) {
  const vx = (vertex.x - 24) / 916;
  const vy = (vertex.y - 24) / 516;
  return { x: vx, y: vy };
}

function modelVertexToScreenVertex(vertex) {
  const vx = 24 + (vertex.x * 916);
  const vy = 24 + (vertex.y * 516);
  return { x: vx, y: vy };
}

const vertices = [
  0, 0,
  0.10480349344978165, 0.06976744186046512,
  0.10480349344978165, 0.15310077519379844,
  0.22270742358078602, 0.15310077519379844,
  0.3406113537117904, 0.23255813953488372,
  0.6550218340611353, 0.23255813953488372,
  0.7729257641921398, 0.15310077519379844,
  0.8908296943231441, 0.15310077519379844,
  0.8908296943231441, 0.06976744186046512,
  0.9956331877729258, 0,
  0.9956331877729258, 0.9534883720930233,
  0.8908296943231441, 0.8837209302325582,
  0.8908296943231441, 0.8003875968992248,
  0.7729257641921398, 0.8003875968992248,
  0.6550218340611353, 0.7209302325581395,
  0.3406113537117904, 0.7209302325581395,
  0.22270742358078602, 0.8003875968992248,
  0.10480349344978165, 0.8003875968992248,
  0.10480349344978165, 0.8837209302325582,
  0, 0.9534883720930233,
];

const getX = index => 24 + (vertices[2 * index] * (SCREEN_HEIGHT - 24));
const getY = index => 24 + (vertices[2 * index + 1] * (SCREEN_HEIGHT - 24));

function shape(...indices) {
  const count = indices.length;
  ctx.beginPath();

  ctx.moveTo(getX(indices[0]), getY(indices[0]));
  for (let i = 1; i < count; i += 1) {
    ctx.lineTo(getX(indices[i]), getY(indices[i]));
  }
  ctx.fill();
  ctx.stroke();
}

function renderCeiling() { shape(0, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0); }
function renderFloor() { shape(15, 14, 13, 12, 11, 10, 19, 18, 17, 16, 15); }
function renderNorthOpening() { shape(4, 5, 14, 15, 4); }
function renderNorthWall() { shape(2, 7, 12, 17, 2); }
function renderWestRearWall() { shape(3, 4, 15, 16, 3); }
function renderWestFrontWallShort() { shape(0, 1, 18, 19, 0); }
function renderWestFrontWallLong() { shape(0, 3, 16, 19, 0); }
function renderWestWall() { shape(0, 4, 15, 19, 0); }
function renderEastRearWall() { shape(5, 6, 13, 14, 5); }
function renderEastFrontWallShort() { shape(8, 9, 10, 11, 8); }
function renderEastFrontWallLong() { shape(6, 9, 10, 13, 6); }
function renderEastWall() { shape(5, 9, 10, 14, 5); }
function renderWestHallNorthWall() { shape(2, 3, 16, 17, 2); }
function renderEastHallNorthWall() { shape(6, 7, 12, 13, 6); }
function renderPortal() {

  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.arc(24 + (SCREEN_HEIGHT * 0.5), SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT * 0.2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

}

export function renderScene(data) {
  /*
  unsigned short data;
                                  |
  128  64  32  16  8   4   2   1  | 128  64  32  16  8   4   2   1
  [p] [o] [n] [m] [l] [k] [j] [i] | [h] [g] [f] [e] [d] [c] [b] [a]
                                  |
  */
  ctx.save();
  if (data & 4) { renderNorthOpening(); }
  if (data & 1) { renderCeiling(); }
  if (data & 2) { renderFloor(); }
  if (data & 8) { renderNorthWall(); }
  if (data & 2048) { renderEastWall(); }
  if (data & 128) { renderWestWall(); }
  if (data & 256) { renderEastRearWall(); }
  if (data & 16) { renderWestRearWall(); }
  if (data & 4096) { renderWestHallNorthWall(); }
  if (data & 8192) { renderEastHallNorthWall(); }
  if (data & 1024) { renderEastFrontWallLong(); }
  if (data & 64) { renderWestFrontWallLong(); }
  if (data & 512) { renderEastFrontWallShort(); }
  if (data & 32) { renderWestFrontWallShort(); }
  if (data & 32768) { renderPortal(); }
  ctx.restore();
}
