import convert from 'color-convert';
import type { Palette, Color, ColorParams } from "./types";
import { newHsl } from './common';
import {
  mode as modeStore,
  colorCount as colorCountStore,
  colorParams as colorParamsStore,
  currentPalette as currentPaletteStore,
} from './stores';
import { Mode } from './enums';

let mode: number;
let colorCount: number;
let colorParams: ColorParams;
// let currentPalette: Palette;

modeStore.subscribe(value => mode = value);
colorCountStore.subscribe(value => colorCount = value);
colorParamsStore.subscribe(value => colorParams = value);
// currentPaletteStore.subscribe(value => currentPalette = value);

export const newPalette = (): Palette => {
  const newPalette: Palette = {
    colors: newPaletteColors(),
    mode,
  };

  return newPalette;
};

const newPaletteColors = (): Color[] => {
  const colors = [newInitialColor()];

  switch (mode) {
    case Mode.MONO:
      if (colors[0].hsl[0] > 50) {
        colorParams.direction = 'tint';
      } else {
        colorParams.direction = 'shade';
      }

      for (let i = 1; i < colorCount; i++) {
        colors.push(newMonoColor(colors));
      };
  }

  return colors;
};

const newInitialColor = (): Color => {
  const Hsl = newHsl();

  return {
    name: '',
    isLocked: false,
    hex: convert.hsl.hex(Hsl),
    rgb: convert.hsl.rgb(Hsl),
    hsl: Hsl,
    hsv: convert.hsl.hsv(Hsl),
    cmyk: convert.hsl.cmyk(Hsl)
  };
};

const newMonoColor = (colors: Color[]): Color => {
  const Hsl = colors[colors.length - 1].hsl;
  console.log(Hsl);

  switch (colorParams.direction) {
    case 'tint':
      if (!(Hsl[2] + colorParams.distance > 100)) Hsl[2] += colorParams.distance;
      else Hsl[2] = Hsl[2] + colorParams.distance - 100;

      break;
    case 'shade':
      if (!(Hsl[2] - colorParams.distance < 0)) Hsl[2] -= colorParams.distance;
      else Hsl[2] = Hsl[2] - colorParams.distance + 100;

      break;
  }

  return {
    name: '',
    isLocked: false,
    hex: convert.hsl.hex(Hsl),
    rgb: convert.hsl.rgb(Hsl),
    hsl: Hsl,
    hsv: convert.hsl.hsv(Hsl),
    cmyk: convert.hsl.cmyk(Hsl)
  };
};

const checkContrast = (color: Color, paletteColors: Color[]): boolean => {
  const [r, g, b] = color.rgb;
  const { length } = paletteColors;
  let contrast = 0;
  let i = 0;

  // get the contrast between the color and each palette color
  while (i < length) {
    const [r2, g2, b2] = paletteColors[i].rgb;
    contrast += Math.abs(r - r2) + Math.abs(g - g2) + Math.abs(b - b2);
    i++;
  }

  return true;
};