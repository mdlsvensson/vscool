import { writable } from 'svelte/store';
import type { Palette, ColorParams } from './types';

export const currentPalette = writable<Palette>();

export const mode = writable<number>(1);

export const colorCount = writable<number>(5);

export const colorParams = writable<ColorParams>({
  distance: 10,
  direction: null,
});