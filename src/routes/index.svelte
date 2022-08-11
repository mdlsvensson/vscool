<script lang="ts">
	import convert from 'color-convert';
	import { browser } from '$app/env';
	import type { Color, Palette } from '../types';

	enum Mode {
		SPREAD
	}

	let colorCount = 5;
	let colorPalette: Palette;
	let mode = Mode.SPREAD;

	const newColor = (palette: Palette): Color => {
		const hue = Math.round(Math.random() * 360);
		const lightness = Math.round(Math.random() * 50) + Math.round(Math.random() * 50);

		return {
			name: 'color',
			lightness,
			hue,
			hex: `#${convert.hsl.hex([hue, palette.saturation, lightness])}`,
			rgb: convert.hsl.rgb([hue, palette.saturation, lightness]),
			isLocked: false
		};
	};

	console.log(mode);

	const newPalette = (): Palette => {
		const palette: Palette = {
			saturation: Math.round(Math.random() * 100),
			colors: [],
			mode
		};

		for (let i = 0; i < colorCount; i++) {
			palette.colors.push(newColor(palette));
		}

		return palette;
	};

	colorPalette = newPalette();

	if (browser) {
		document.onkeydown = (event) => {
			if (event.key === ' ') {
				colorPalette = newPalette();
			}
		};
	}
</script>

<main class="w-screen h-screen p-4">
	<div class="w-full h-full flex">
		{#each colorPalette.colors as color}
			<div class="h-full w-full" style="background-color: {color.hex}" />
		{/each}
	</div>
</main>
