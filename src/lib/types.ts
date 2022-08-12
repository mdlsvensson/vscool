import type { RGB, HSL, HSV, CMYK, HEX } from "color-convert/conversions";

export type Color = {
  isLocked: boolean;
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