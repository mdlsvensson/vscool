<script lang="ts">
	import { mode } from '../stores';

	export let value: number;
</script>

<button
	class="bg-blue-300 py-1 px-3 rounded-md hover:bg-red-300 transition"
	on:click={() => ($mode = value)}
	class:bg-red-300={$mode === value}
>
	<slot />
</button>
