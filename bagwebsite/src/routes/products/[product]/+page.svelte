<!-- Script -->
<script>
	import { getProductById } from '../../../API/supabaseAPI';
	import { onMount } from 'svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { SHOPPING_CART } from '../../../lib/global';

	export let data;

	let id = data.data.product;
	let quantity = 1;
	/**
	 * @type {{ name: any; image_path: any; description: any; price: number; category: any; } | null}
	 */
	let product = null;
	let isLoading = true;

	let msg = '';

	onMount(async () => {
		const { data, error } = await getProductById(id);

		if (error) {
			// Handle the error, for example, display an error message
			console.error(error);
		} else {
			product = data;
		}
		isLoading = false;
	});

	// Add items to the shopping cart
	function addToCart() {
		SHOPPING_CART.update((cart) => {
			if (cart.has(id)) {
				cart.set(id, cart.get(id) + quantity);
			} else {
				cart.set(id, quantity);
			}
			return new Map(cart); // Make sure to return a new Map to trigger updates
		});
		msg = 'Added to cart';
	}
</script>

<!-- HTML -->
<div class="container grid h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1 center">Product Details</h1>
		{#if isLoading}
			<ProgressRadial value={undefined} />
		{:else if product}
			<div class="card p-4">
				<img src={product.image_path} alt={product.name} class="product-image" />
				<p class="text-sm">{product.description}</p>
				<p class="text-lg font-bold text-primary-500">R {product.price.toFixed(2)}</p>
				<p class="text-sm text-gray-500">{product.category}</p>
				<button type="button" class="btn variant-ghost-primary m-4" on:click={addToCart}>
					Add to Cart
				</button>
			</div>
			{msg}
		{/if}
	</div>
</div>
