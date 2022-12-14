import type { HSL } from "color-convert/conversions";

export const newHue = (): number => Math.round(Math.random() * 360);

export const newSaturation = (): number => Math.round(Math.random() * 100);

export const newLightness = (): number => Math.round(Math.random() * 100);

export const newHsl = (): HSL => [newHue(), newSaturation(), newLightness()];