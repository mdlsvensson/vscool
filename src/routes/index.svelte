<script lang="ts">
	import convert from 'color-convert';
	import { browser } from '$app/env';
	import type { Color, Palette } from '../types';

	enum Mode {
		RANDOM,
		SPREAD
	}

	let colorCount = 5;
	let colorPalette: Palette;
	let mode = Mode.SPREAD;

	const newColor = (palette: Palette): Color => {
		let hue: number;

		console.log(palette.hue);

		switch (mode) {
			case Mode.SPREAD:
				hue =
					palette.colors.length === 0
						? palette.hue
						: palette.hue + 360 / (colorCount - palette.colors.length);
				break;
			default:
				hue = palette.hue;
		}

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

	const newPalette = (): Palette => {
		const palette: Palette = {
			hue: Math.round(Math.random() * 360),
			saturation: Math.round(Math.random() * 100),
			colors: [],
			mode
		};

		while (palette.colors.length < colorCount) {
			const color = newColor(palette);
			console.log(color);

			if (palette.colors.length === 0) {
				palette.colors.push(color);
				continue;
			}

			if (checkContrast(color, palette.colors)) {
				palette.colors.push(color);
			}
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
