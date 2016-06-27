import { Actor } from './Actor';
import { TextGraphic } from './graphics/TextGraphic';

export class Txt extends Actor {
  constructor(text, x, y, {font, size, color, align}) {
    super(x, y, new TextGraphic(text, x, y, {font, size, color, align}));
  }
}
