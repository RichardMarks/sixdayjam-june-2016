import { gameCanvasId } from './constants';
import { launchGame } from './launcher';

function main() {
  document.title = 'Walled In - #sixdayjam entry';
  const gameCanvas = document.getElementById(gameCanvasId);
  launchGame(gameCanvas);
}

document.addEventListener('DOMContentLoaded', () => main(), false);
