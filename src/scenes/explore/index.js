function line(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function poly(ctx, ...points) {
  ctx.beginPath();
  ctx.moveTo(points[0], points[1]);
  const count = points.length;
  let i = 2;
  while (i < count) {
    ctx.lineTo(points[i], points[i + 1]);
    i += 2;
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

let width = 0;
let height = 0;

// closest to camera
const xd1 = 24;      const xd1x2 = xd1 * 2;
const yd1 = 24;      const yd1x2 = yd1 * 2;

// front middle
const xd2 = xd1 * 5;        const xd2x2 = xd2 * 2;
const yd2 = yd1 * 2.5;      const yd2x2 = yd2 * 2;

// rear middle
const xd3 = xd1 * 9.5;        const xd3x2 = xd3 * 2;
const yd3 = yd1 * 4.3;      const yd3x2 = yd3 * 2;

// farthest from camera
const xd4 = xd1 * 14; const xd4x2 = xd4 * 2;
const yd4 = yd1 * 6;  const yd4x2 = yd4 * 2;

function drawRearWall(ctx) {
  ctx.fillStyle = 'black';
  ctx.fillRect(xd4, yd4, width - xd4x2, height - yd4x2);
  ctx.strokeRect(xd4, yd4, width - xd4x2, height - yd4x2);
}

function drawTreasureBox(ctx) {
  // const boxWidth = (626 - 339) * 0.33 | 0;
  const boxWidth = (((width - xd4) - xd4) * 0.5) | 0;
  const boxHeight = (((height - yd1) - yd4) * 0.33) | 0;

  const boxX = (width - boxWidth) * 0.5;
  const boxY = height - yd4 - yd1;

  ctx.fillStyle = 'black';
  poly(ctx,
    boxX, boxY,
    boxX + boxWidth, boxY,
    boxX + boxWidth, boxY + boxHeight,
    boxX, boxY + boxHeight
  );
  ctx.stroke();
  poly(ctx,
    boxX, boxY,
    boxX + (boxWidth * 0.2), boxY - (boxHeight * 0.25),
    boxX + (boxWidth * 0.8), boxY - (boxHeight * 0.25),
    boxX + boxWidth, boxY
  );
  ctx.stroke();
  // ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
  // window.console.warn(`${boxX} ${boxY} ${boxWidth} ${boxHeight}`);
}

function drawEnemy(ctx, enemy) {
  window.console.dirxml(enemy);
}

// exits: N, S
function block0(ctx) {
  drawRearWall(ctx);

  ctx.fillStyle = '#424242';
  poly(ctx, xd1, yd1, width - xd1, yd1, width - xd4, yd4, xd4, yd4);

  ctx.fillStyle = '#282830';
  poly(ctx, xd1, height - yd1, width - xd1, height - yd1, width - xd4, height - yd4, xd4, height - yd4)

  line(ctx, xd1, yd1, xd4, yd4);
  line(ctx, width - xd1, yd1, width - xd4, yd4);
  line(ctx, xd1, height - yd1, xd4, height - yd4);
  line(ctx, width - xd1, height - yd1, width - xd4, height - yd4);
  ctx.strokeRect(xd1, yd1, width - xd1x2, height - yd1x2);



}

// exits: N, S, E
function block1(ctx) {
  ctx.fillStyle = 'black';
  ctx.fillRect(xd4, yd4, width - xd4x2, height - yd4x2);

  // left wall top
  line(ctx, xd1, yd1, xd4, yd4);
  // left wall bottom
  line(ctx, xd1, height - yd1, xd4, height - yd4);
  // rear wall
  ctx.strokeRect(xd4, yd4, width - xd4x2, height - yd4x2);

  // right corridor
  line(ctx, width - xd3, yd3, width - xd3, height - yd3);
  line(ctx, width - xd2, yd2, width - xd2, height - yd2);
  line(ctx, width - xd3, height - yd3, width - xd2, height - yd3);
  line(ctx, width - xd4, height - yd4, width - xd3, height - yd3);
  line(ctx, width - xd2, height - yd2, width - xd1, height - yd1);
  line(ctx, width - xd4, yd4, width - xd3, yd3);
  line(ctx, width - xd2, yd2, width - xd1, yd1);
  line(ctx, width - xd3, yd3, width - xd2, yd3);

  // camera frame
  ctx.strokeRect(xd1, yd1, width - xd1x2, height - yd1x2);
}

// exits: N, S, W
function block2(ctx) {

  ctx.fillStyle = 'black';
  ctx.fillRect(xd4, yd4, width - xd4x2, height - yd4x2);

  // left corridor
  line(ctx, xd1, yd1, xd2, yd2);
  line(ctx, xd3, yd3, xd4, yd4);
  line(ctx, xd2, yd2, xd2, height - yd2);
  line(ctx, xd3, yd3, xd3, height - yd3);
  line(ctx, xd2, height - yd3, xd3, height - yd3);
  line(ctx, xd2, yd3, xd3, yd3);
  line(ctx, xd1, height - yd1, xd2, height - yd2);
  line(ctx, xd3, height - yd3, xd4, height - yd4);

  // right wall top
  line(ctx, width - xd1, yd1, width - xd4, yd4);

  // right wall bottom
  line(ctx, width - xd1, height - yd1, width - xd4, height - yd4);

  // rear wall
  ctx.strokeRect(xd4, yd4, width - xd4x2, height - yd4x2);

  // camera frame
  ctx.strokeRect(xd1, yd1, width - xd1x2, height - yd1x2);
}

function block3(ctx) {
  line(ctx, xd1, yd1, xd3, yd3);
  line(ctx, xd1, height - yd1, xd3, height - yd3);
  line(ctx, width - xd1, yd1, width - xd2, yd2);
  line(ctx, width - xd1, height - yd1, width - xd2, height - yd2);
  line(ctx, width - xd1, height - yd1, width - xd2, height - yd2);
  line(ctx, width - xd2, yd2, width - xd2, height - yd2);
  line(ctx, xd3, yd3, xd3, height - yd3);
  line(ctx, xd3, height - yd3, width - xd2, height - yd3);
  line(ctx, xd3, yd3, width - xd2, yd3);
  ctx.strokeRect(xd1, yd1, width - xd1x2, height - yd1x2);
}

function block4(ctx) {
  line(ctx, xd1, yd1, xd2, yd2);
  line(ctx, xd2, yd2, xd2, height - yd2);
  line(ctx, xd2, height - yd2, xd1, height - xd1);
  line(ctx, width - xd1, yd1, width - xd3, yd3);
  line(ctx, width - xd3, yd3, width - xd3, height - yd3);
  line(ctx, width - xd1, height - yd1, width - xd3, height - yd3);
  line(ctx, width - xd3, yd3, xd2, yd3);
  line(ctx, width - xd3, height - yd3, xd2, height - yd3);
  ctx.strokeRect(xd1, yd1, width - xd1x2, height - yd1x2);
}

function block5(ctx) {

  ctx.fillStyle = 'black';
  ctx.fillRect(xd4, yd4, width - xd4x2, height - yd4x2);

  // rear wall
  ctx.strokeRect(xd4, yd4, width - xd4x2, height - yd4x2);

  // left corridor
  line(ctx, xd1, yd1, xd2, yd2);
  line(ctx, xd3, yd3, xd4, yd4);
  line(ctx, xd2, yd2, xd2, height - yd2);
  line(ctx, xd3, yd3, xd3, height - yd3);
  line(ctx, xd2, height - yd3, xd3, height - yd3);
  line(ctx, xd2, yd3, xd3, yd3);
  line(ctx, xd1, height - yd1, xd2, height - yd2);
  line(ctx, xd3, height - yd3, xd4, height - yd4);

  // right corridor
  line(ctx, width - xd3, yd3, width - xd3, height - yd3);
  line(ctx, width - xd2, yd2, width - xd2, height - yd2);
  line(ctx, width - xd3, height - yd3, width - xd2, height - yd3);
  line(ctx, width - xd4, height - yd4, width - xd3, height - yd3);
  line(ctx, width - xd2, height - yd2, width - xd1, height - yd1);
  line(ctx, width - xd4, yd4, width - xd3, yd3);
  line(ctx, width - xd2, yd2, width - xd1, yd1);
  line(ctx, width - xd3, yd3, width - xd2, yd3);

  // camera frame
  ctx.strokeRect(xd1, yd1, width - xd1x2, height - yd1x2);
}

function block6(ctx) {
  line(ctx, xd1, yd1, xd3, yd3);
  line(ctx, width - xd1, yd1, width - xd3, yd3);
  line(ctx, xd1, height - yd1, xd3, height - yd3);
  line(ctx, width - xd1, height - yd1, width - xd3, height - yd3);
  ctx.strokeRect(xd1, yd1, width - xd1x2, height - yd1x2);
  ctx.strokeRect(xd3, yd3, width - xd3x2, height - yd3x2);
}

function block7(ctx) {
  // rear wall top
  line(ctx, xd2, yd3, width - xd2, yd3);
  // rear wall bottom
  line(ctx, xd2, height - yd3, width - xd2, height - yd3);

  // left front wall top
  line(ctx, xd1, yd1, xd2, yd2);
  // left front wall
  line(ctx, xd2, yd2, xd2, height - yd2);
  // left front wall bottom
  line(ctx, xd1, height - yd1, xd2, height - yd2);

  // right front wall top
  line(ctx, width - xd2, yd2, width - xd1, yd1);
  // right front wall
  line(ctx, width - xd2, yd2, width - xd2, height - yd2);
  // right front wall bottom
  line(ctx, width - xd2, height - yd2, width - xd1, height - yd1);

  // camera frame
  ctx.strokeRect(xd1, yd1, width - xd1x2, height - yd1x2);
}

const prefabs = {
  block0, block1, block2, block3, block4, block5, block6, block7,
};

export function drawScene(scene, ctx, sceneWidth, sceneHeight, content) {
  width = sceneWidth;
  height = sceneHeight;
  const prefab = prefabs[`block${scene}`];
  if (prefab) {
    ctx.save();
    prefab(ctx);
    if (content) {
      content.treasure && drawTreasureBox(ctx);
      content.enemy && drawEnemy(ctx, content.enemy);
    }
    ctx.restore();
  }
}

const planWidth = 120;
const planHeight = 120;
const planBlockWidth = planWidth / 3;
const planBlockHeight = planHeight / 3;

const plans = [
  'wswwswwsw',
  'wswwsswsw',
  'wswsswwsw',
  'wwwwsswsw',
  'wwwsswwsw',
  'wswssswsw',
  'wwwwswwsw',
  'wwwssswsw',
];

function drawPlan(ctx, data) {
  ctx.translate(4, 4, 0);
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,planWidth, planHeight);
  ctx.fillStyle = 'black';
  data.split('').forEach((id, index) => {
    if (id === 'w') {
      const x = (index % 3) | 0;
      const y = (index / 3) | 0;
      ctx.fillRect(2 + (x * planBlockWidth), 2 + (y * planBlockHeight), planBlockWidth - 4, planBlockHeight - 4);
    }
  });
}

export function drawCurrentRoomPlan(scene, ctx) {
  const plan = plans[scene];
  ctx.save();
  drawPlan(ctx, plan);
  ctx.restore();
}
