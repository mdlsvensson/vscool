import type { RGB, HSL, HSV, CMYK, HEX } from "color-convert/conversions";

export type Color = {
  isLocked: boolean;
  textColor: string;
} & Name & Formats;

export type Palette = {
  colors: Color[];
  mode: number;
};

////////////////////

export type Name = {
  name: string;
}

export type Formats = {
  hex: HEX;
  rgb: RGB;
  hsl: HSL;
  hsv: HSV;
  cmyk: CMYK;
}

export type ColorParams = {
  distance: number;
  direction: string | null;
}