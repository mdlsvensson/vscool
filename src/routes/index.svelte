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

<div class="w-screen h-screen p-4 pt-0 flex flex-col">
	<header class="w-full h-20 flex justify-center items-center">
		<nav class="flex h-1/2 items-center gap-2">
			<Button value={0}>Random</Button>
			<Button value={1}>Monochromatic</Button>
		</nav>
	</header>
	<main class="w-full h-full">
		<div class="w-full h-full flex">
			{#each colorPalette.colors as color}
				<div class="h-full w-full" style="background-color: #{color.hex}" />
			{/each}
		</div>
	</main>
</div>
