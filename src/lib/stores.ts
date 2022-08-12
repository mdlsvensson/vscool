import { writable } from 'svelte/store';
import type { Palette } from './types';

export const currentPalette = writable<Palette>();

export const mode = writable<number>(0);

export const colorCount = writable<number>(0);