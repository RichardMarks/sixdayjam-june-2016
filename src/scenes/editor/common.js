
export function drawPrefab(data, ctx, ax, ay, width, height, blockWidth, blockHeight) {
  ctx.save();
  ctx.translate(ax, ay);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#A00';
  data.split('').forEach((id, index) => {
    if (id === 'w') {
      const x = (index % 3) | 0;
      const y = (index / 3) | 0;
      //ctx.fillRect(1 + (x * blockWidth), 1 + (y * blockHeight), blockWidth - 1, blockHeight - 1);
      ctx.fillRect((x * blockWidth), (y * blockHeight), blockWidth, blockHeight);
    }
  });
  ctx.restore();
}
