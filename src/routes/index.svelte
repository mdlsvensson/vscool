<script lang="ts">
	import { browser } from '$app/env';
	import type { Color, Palette } from '$lib/types';
	import { newPalette } from '$lib/factories';
	import { mode } from '$lib/stores';
	import Button from '$lib/components/Button.svelte';

	let colorCount = 5;
	let colorPalette: Palette;

	if (browser) {
		document.onkeydown = (event) => {
			if (event.key === ' ') {
				colorPalette = newPalette();
			}
		};
	}

	colorPalette = newPalette();
</script>

<div class="w-screen h-screen flex flex-col">
	<header class="w-full h-20 flex justify-center items-center">
		<div class="flex justify-between w-full mx-5 items-center">
			<p class="text-gray-600">Press space to generate color palettes.</p>
			<nav class="flex h-1/2 items-center gap-2">
				<Button value={0}>Random</Button>
				<Button value={1}>Monochromatic</Button>
			</nav>
		</div>
	</header>
	<main class="w-full h-full flex rounded-lg">
		{#each colorPalette.colors as color}
			<div class="h-full w-full" style="background-color: #{color.hex}" />
		{/each}
	</main>
</div>
