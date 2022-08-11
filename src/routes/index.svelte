<script lang="ts">
	import convert from 'color-convert';
	import type { Color } from '../types';

	let numberOfColors = 5;

	const getRandomColor = (): Color => {
		const hsl = [
			Math.round(Math.random() * 360),
			Math.round(Math.random() * 100),
			Math.round(Math.random() * 100)
		];

		return {
			name: 'color',
			hex: `#${convert.hsl.hex([hsl[0], hsl[1], hsl[2]])}`,
			hsl,
			rgb: convert.hsl.rgb([hsl[0], hsl[1], hsl[2]])
		};
	};

	let lockedColors = [getRandomColor()];

	console.log(lockedColors);
</script>

<main class="w-screen h-screen p-4">
	<div class="w-full h-full flex">
		<p />
	</div>
</main>
