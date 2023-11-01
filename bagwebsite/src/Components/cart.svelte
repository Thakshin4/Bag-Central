<script>
	import { onMount } from 'svelte';
	import { SHOPPING_CART, SUBTOTAL } from '../lib/global';
	import { getProductById } from '../API/supabaseAPI'; // Import your API function
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	/**
	 * @type {any[]}
	 */
	let productDetails = []; // Initialize an array to store product details
	let isLoading = true;

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
		SUBTOTAL.set(subtotal);
		return subtotal;
	}
</script>

<!-- HTML -->
<div class="space-y-5">
	{#if isLoading}
		<ProgressRadial value={undefined} class="p-4" />
	{:else}
		<h1 class="h1">Products</h1>
		<div class="container mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
				{#each productDetails as product (product.product_id)}
					<a href={`/products/${product.product_id}`}>
						<div class="card p-4">
							<img src={product.image_path} alt={product.name} class="product-image" />
							<p>Quantity: {$SHOPPING_CART.get(product.product_id.toString())}</p>
						</div>
					</a>
				{/each}
			</div>

			{#if productDetails.length === 0}
				<p class="text-center mt-4">No products available.</p>
			{:else}
				<p class="text m-4">Subtotal: R {getSubtotal()}</p>
			{/if}
		</div>
	{/if}
</div>

<!-- CSS -->
<style>
	/* Define the CSS class for the product images */
	.product-image {
		max-width: 100px; /* Set the maximum width */
		height: auto; /* Maintain the aspect ratio */
		display: block; /* Remove extra space below the image */
		margin: 10px; /* Center the image horizontally */
		border-radius: 8px;
	}
</style>
