<!-- AddProductForm.svelte -->
<script>
	import { goto } from '$app/navigation';
	import { addProduct } from '../../API/supabaseAPI';

	let visible = false;
	let message = 'Please fill all fields.';

	let name = '';
	let description = '';
	let price = 0;
	let category = '';
	let image_path = '';

	async function handleSubmit() {
		// Display an alert if any required field is empty
		if (!name || !description || !price || !category || !image_path) {
			visible = true;
			return;
		}

		// Your form submission logic here if all fields are valid

		// Create an object with the form data
		const productData = {
			name,
			description,
			price,
			category,
			image_path
		};

		// Call an API function to add the product (implement this function)
		const response = await addProduct(productData);

		if (response.error) {
			// Handle the error, e.g., display an error message
			console.error(response.error);
		} else {
			// Clear the form after a successful addition
			name = '';
			description = '';
			price = 0;
			category = '';
			image_path = '';

			// Redirect or display a success message
			// For example, you can navigate to the product listing page
			goto('/products');
		}
	}
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Add Product</h1>

		<div class="card p-4">
			<form on:submit|preventDefault={handleSubmit}>
				<label for="name">Name:</label><br />
				<input class="input" type="text" id="name" bind:value={name} required /><br />
				<br />
				<label for="description">Description:</label><br />
				<textarea class="input" id="description" bind:value={description} required /><br />
				<br />
				<label for="price">Price:</label><br />
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim">R</div>
					<input type="number" placeholder="Amount" id="price" bind:value={price} required />
				</div>
				<br />
				<label for="category">Category:</label><br />
				<input class="input" type="text" id="category" bind:value={category} required /><br />
				<br />
				<label for="image">Image URL:</label><br />
				<input class="input" type="text" id="image" bind:value={image_path} required /><br />
				<br />
			</form>
		</div>
		<div />
		{#if visible}
			<aside class="alert variant-filled-warning">
				<div class="alert-message">
					<p>{message}</p>
				</div>
			</aside>
		{/if}
		<div>
			<button type="submit" class="btn variant-filled" on:click={handleSubmit}>Add Product</button>
		</div>
	</div>
</div>
