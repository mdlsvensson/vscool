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
import getNearestColor from './colorNames';
import type { RGB } from "color-convert/conversions";

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
      break;
    case Mode.ANALOG:
      for (let i = 1; i < colorCount; i++) {
        colors.push(newAnalogColor(colors));
      }
  }
  console.log('PALLETTE');
  return colors;
};

const newInitialColor = (): Color => {
  const Hsl = newHsl();

  return {
    name: getNearestColor(convert.hsl.hex(Hsl)).name,
    isLocked: false,
    textColor: blackOrWhiteTextColor(convert.hsl.rgb(Hsl)),
    hex: convert.hsl.hex(Hsl),
    rgb: convert.hsl.rgb(Hsl),
    hsl: Hsl,
    hsv: convert.hsl.hsv(Hsl),
    cmyk: convert.hsl.cmyk(Hsl)
  };
};

const newMonoColor = (colors: Color[]): Color => {
  const Hsl = colors[colors.length - 1].hsl;

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
    name: getNearestColor(convert.hsl.hex(Hsl)).name,
    isLocked: false,
    textColor: blackOrWhiteTextColor(convert.hsl.rgb(Hsl)),
    hex: convert.hsl.hex(Hsl),
    rgb: convert.hsl.rgb(Hsl),
    hsl: Hsl,
    hsv: convert.hsl.hsv(Hsl),
    cmyk: convert.hsl.cmyk(Hsl)
  };
};

const newAnalogColor = (colors: Color[]): Color => {
  const Hsl = colors[colors.length - 1].hsl;
  Hsl[0] += colorParams.distance + 50;

  return {
    name: getNearestColor(convert.hsl.hex(Hsl)).name,
    isLocked: false,
    textColor: blackOrWhiteTextColor(convert.hsl.rgb(Hsl)),
    hex: convert.hsl.hex(Hsl),
    rgb: convert.hsl.rgb(Hsl),
    hsl: Hsl,
    hsv: convert.hsl.hsv(Hsl),
    cmyk: convert.hsl.cmyk(Hsl)
  };
};

const setTextContrast = (bg: RGB, text: RGB): RGB => {
  const [r, g, b] = bg;
  const [r2, g2, b2] = text;
  const brightnessBg = r * 0.299 + g * 0.587 + b * 0.114;
  const brightnessText = r2 * 0.299 + g2 * 0.587 + b2 * 0.114;
  const minContrast = 150;

  if (brightnessBg > brightnessText) {
    if (!(brightnessBg - brightnessText > minContrast)) {
      for (let i = 0; i < 3; i++) {
        text[i]--;
      }
      setTextContrast(bg, text);
    }

    return text;
  }

  if (!(brightnessText - brightnessBg > minContrast)) {
    for (let i = 0; i < 3; i++) {
      text[i]++;
    }
    setTextContrast(bg, text);
  }

  return text;
};

const blackOrWhiteTextColor = (bg: RGB): string => {
  const blackRgb: RGB = [30, 30, 30];
  const whiteRgb: RGB = [235, 235, 235];

  const [r, g, b] = bg;
  const brightness = r * 0.299 + g * 0.587 + b * 0.114;

  console.log(bg);
  console.log(brightness);

  if (brightness > 125) {
    const [textR, textG, textB] = setTextContrast(bg, blackRgb);
    return `rgb(${textR}, ${textG}, ${textB})`;
  }

  const [textR, textG, textB] = setTextContrast(bg, whiteRgb);
  return `rgb(${textR}, ${textG}, ${textB})`;
};