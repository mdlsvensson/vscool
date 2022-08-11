import type { Palette, Color } from "./types";

export const newPalette = (mode: number, colorCount: number): Palette => {
  const newPalette: Palette = {
    hue: Math.round(Math.random() * 360),
    saturation: Math.round(Math.random() * 100),
    lightness: Math.round(Math.random() * 50) + Math.round(Math.random() * 50),
    colors: newColors(mode, colorCount),
    mode,
    colorCount
  };

  return newPalette;
};

const newColors = (mode: number, colorCount: number): Color[] => {
  const colors = [];

  for (let i = 0; i < colorCount; i++) {
    colors.push({

    });
  };

  switch (mode) {
    case Mode.SPREAD:
      hue =
        palette.colors.length === 0
          ? palette.hue
          : palette.hue + 360 / (colorCount - palette.colors.length);
      break;
    case Mode.RANDOM:
      hue = palette.hue;
  }

  return;
};