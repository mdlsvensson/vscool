export type Color = {
  hue: number;
  lightness: number;
  name: string;
  hex: string;
  rgb: number[];
  isLocked: boolean;
};

export type Palette = {
  saturation: number;
  colors: Color[];
  mode: number;
}