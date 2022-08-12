import convert from 'color-convert';
import type { Palette, Color } from "./types";
import { newHsl } from './common';
import { mode as modeStore, colorCount as colorCountStore } from './stores';
import { Mode } from './enums';

let mode: number;
let colorCount: number;

modeStore.subscribe(value => mode = value);
colorCountStore.subscribe(value => colorCount = value);

export const newPalette = (): Palette => {
  const newPalette: Palette = {
    colors: newPaletteColors(),
    mode,
  };

  return newPalette;
};

const newPaletteColors = (): Color[] => {
  const colors = [newColor()];

  switch (mode) {
    case Mode.MONO:
      for (let i = 1; i < colorCount; i++) {
        colors.push(newColor(mode));
      };

  }



  return colors;
};

const newColor = (): Color => {
  const Hsl = newHsl();

  return {
    isLocked: false,
    name: '',
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