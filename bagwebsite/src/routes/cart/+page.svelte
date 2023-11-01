<script lang="ts">
	import { onMount } from 'svelte';
	import { SHOPPING_CART } from '../../lib/global';
	import { getProductById } from '../../API/supabaseAPI'; // Import your API function
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	/**
	 * @type {any[]}
	 */
	let productDetails = []; // Initialize an array to store product details
	let isLoading = true;
	let msg = '';

	onMount(async () => {
		const cart = SHOPPING_CART;
		/**
		 * @type {any[]}
		 */
		let productIds = [];

		// Subscribe to the shopping cart store
		const unsubscribe = cart.subscribe((cartMap) => {
			// Extract product IDs from the shopping cart
			productIds = Array.from(cartMap.keys());
		});

		// Fetch product details for each product ID
		for (const productId of productIds) {
			const { data, error } = await getProductById(productId);

			if (error) {
				// Handle the error, for example, display an error message or remove the invalid product from the cart
				console.error(`Error fetching product details for ID ${productId}: ${error}`);
				msg = error.message;
			} else {
				// Add the fetched product details to the array
				productDetails.push(data);
			}
		}

		isLoading = false;
	});

	function getSubtotal() {
		let subtotal = 0;
		productDetails.forEach((product) => {
			subtotal += product.price * $SHOPPING_CART.get(product.product_id.toString());
		});
		return subtotal;
	}

	function gotoCheckout() {
		goto('/checkout');
	}

	function clearCart() {
		SHOPPING_CART.set(new Map<any, any>());
		goto('/products');
	}
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		{#if isLoading}
			<ProgressRadial value={undefined} />
		{:else}
			<h1 class="h1">Cart</h1>
			<div class="container mx-auto">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
					{#each productDetails as product (product.product_id)}
						<a href={`/products/${product.product_id}`}>
							<div class="card p-4">
								<h2 class="text-xl font-semibold">{product.name}</h2>
								<img src={product.image_path} alt={product.name} class="product-image" />
								<p class="text-sm">{product.description}</p>
								<p class="text-lg font-bold text-green-600">R {product.price.toFixed(2)}</p>
								<p class="text-sm text-gray-500">{product.category}</p>
								<p>Quantity: {$SHOPPING_CART.get(product.product_id.toString())}</p>
							</div>
						</a>
					{/each}
				</div>

				{#if productDetails.length === 0}
					<p class="text-center mt-4">Cart Empty.</p>
				{:else}
					<div class="card p-4 mt-4 w-100">
						Subtotal: R {getSubtotal()}
						<button type="button" class="btn variant-ghost-primary m-4" on:click={gotoCheckout}>
							Proceed to Checkout
						</button>
						<button type="button" class="btn variant-ghost-error m-4" on:click={clearCart}>
							Clear Cart
						</button>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<!--CSS-->
<style>
	/* Define the CSS class for the product images */
	.product-image {
		max-width: 200px; /* Set the maximum width */
		height: auto; /* Maintain the aspect ratio */
		display: block; /* Remove extra space below the image */
		margin: 10px; /* Center the image horizontally */
		border-radius: 8px;
	}
</style>
