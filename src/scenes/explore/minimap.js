const prefabs = [
  'wswwswwsw',
  'wswwsswsw',
  'wswsswwsw',
  'wwwwsswsw',
  'wwwsswwsw',
  'wswssswsw',
  'wwwwswwsw',
  'wwwssswsw',
  // alternates
  'wwwssswww',
  'wswwsswww',
  'wswsswwww',
  'wswwswwww',
  'wwwsswwww',
  'wwwwsswww',
  'wswssswww',
];

function drawPrefab(data, ctx, ax, ay, width, height, blockWidth, blockHeight) {
  ctx.save();
  ctx.translate(ax, ay);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  data.split('').forEach((id, index) => {
    if (id === 'w') {
      const x = (index % 3) | 0;
      const y = (index / 3) | 0;
      ctx.fillRect((x * blockWidth), (y * blockHeight), blockWidth, blockHeight);
    }
  });
  ctx.restore();
}

function triangle(ctx, px1, py1, px2, py2, px3, py3) {
  ctx.beginPath();
  ctx.moveTo(px1, py1);
  ctx.lineTo(px2, py2);
  ctx.lineTo(px3, py3);
  ctx.lineTo(px1, py1);
  ctx.stroke();
}

export function seen(player, x, y) {
  const count = player.seen.length;
  for (let i = 0; i < count; i += 1) {
    const pos = player.seen[i];
    if (x === pos.x && y === pos.y) {
      return true;
    }
  }
  return false;
}

export function see(player, x, y) {
  if (!seen(player, x, y)) {
    player.seen.push({x, y});
  }
}

export function renderMinimap(ctx, level, player) {
  const rows = level.height;
  const cols = level.width;
  const data = level.data;
  const ax = 960 - (320 + 24);
  const ay = 540 - (320 + 22);
  const rowHeight = (320 / rows) | 0;
  const colWidth = (320 / cols) | 0;
  const blockWidth = (colWidth * 0.34) | 0;
  const blockHeight = (rowHeight * 0.34) | 0;
  const blockWidthOver2 = (blockWidth * 0.5) | 0;
  const blockHeightOver2 = (blockHeight * 0.5) | 0;
  const blockWidthX2 = blockWidth * 2;
  const blockHeightX2 = blockHeight * 2;

  ctx.save();
  ctx.translate(ax, ay);
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, 0, colWidth * cols, rowHeight * rows);
  ctx.strokeRect(0, 0, colWidth * cols, rowHeight * rows);

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const pos = x + y * cols;
      const prefab = prefabs[data[pos]];
      if (prefab && seen(player, x, y)) {
        drawPrefab(prefab, ctx, x * colWidth, y * rowHeight, colWidth, rowHeight, blockWidth, blockHeight);
      }
    }
  }

  const playerMarkerX = (player.x * colWidth) + blockWidth;
  const playerMarkerY = (player.y * rowHeight) + blockHeight;
  ctx.fillStyle = 'white';
  ctx.fillRect(playerMarkerX, playerMarkerY, blockWidth, blockHeight);
  ctx.lineWidth = 1;
  if (player.direction === 0) {
    triangle(ctx,
      playerMarkerX + blockWidthOver2, playerMarkerY,
      playerMarkerX - blockWidth, playerMarkerY - blockHeight,
      playerMarkerX + blockWidthX2, playerMarkerY - blockHeight);
  } else if (player.direction === 1) {
    triangle(ctx,
      playerMarkerX + blockWidth, playerMarkerY + blockHeightOver2,
      playerMarkerX + blockWidthX2, playerMarkerY - blockHeight,
      playerMarkerX + blockWidthX2, playerMarkerY + blockHeightX2);
  } else if (player.direction === 2) {
    triangle(ctx,
      playerMarkerX + blockWidthOver2, playerMarkerY + blockHeight,
      playerMarkerX - blockWidth, playerMarkerY + blockHeightX2,
      playerMarkerX + blockWidthX2, playerMarkerY + blockHeightX2);
  } else {
    triangle(ctx,
      playerMarkerX, playerMarkerY + blockHeightOver2,
      playerMarkerX - blockWidth, playerMarkerY + blockHeightX2,
      playerMarkerX - blockWidth, playerMarkerY - blockHeight);
  }
  ctx.restore();
}
