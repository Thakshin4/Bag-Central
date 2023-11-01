<!-- Script -->
<script>
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { getAllProducts } from '../API/supabaseAPI';

	/**
	 * @type {any[]}
	 */
	let products = [];
	let isLoading = true;

	// New variables for search
	let searchQuery = '';
	/**
	 * @type {string | any[]}
	 */
	let filteredProducts = [];

	// Function to handle the search
	function handleSearch() {
		if (searchQuery.trim() === '') {
			filteredProducts = products; // If the search query is empty, show all products
		} else {
			filteredProducts = products.filter((product) =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
	}

	// Load products when the page is initialized
	import { onMount } from 'svelte';
	onMount(async () => {
		const { data, error } = await getAllProducts();
		if (data) {
			products = data;
			filteredProducts = data; // Initialize filteredProducts with all products
		} else {
			console.error('Error fetching products:', error);
		}
		isLoading = false;
	});
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		{#if isLoading}
			<ProgressRadial value={undefined} />
		{:else}
			<h1 class="h1 mt-4">Products</h1>

			<!-- Search bar -->
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim" />
				<input type="search" placeholder="Search..." bind:value={searchQuery} />
				<button class="variant-filled-secondary" on:click={handleSearch}>Submit</button>
			</div>

			<div class="container mx-auto">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
					{#each filteredProducts as product (product.product_id)}
						<a href={`/products/${product.product_id}`}>
							<div class="card p-4">
								<h2 class="text-xl font-semibold">{product.name}</h2>
								<img src={product.image_path} alt={product.name} class="product-image" />
								<p class="text-sm">{product.description}</p>
								<p class="text-lg font-bold text-green-600">R {product.price.toFixed(2)}</p>
								<p class="text-sm text-gray-500">{product.category}</p>
							</div>
						</a>
					{/each}
				</div>

				{#if filteredProducts.length === 0}
					<p class="text-center mt-4">No products match your search.</p>
				{/if}
			</div>
		{/if}
	</div>
</div>
