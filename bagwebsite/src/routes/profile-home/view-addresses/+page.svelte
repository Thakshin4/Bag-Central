<!-- Script -->
<script lang="ts">
	import { ListBox, ListBoxItem, ProgressRadial, Step, Stepper } from '@skeletonlabs/skeleton';

	// Import the ShoppingCart component
	import { SHOPPING_CART, USER_ID, SUBTOTAL, APP_URL } from '../../../lib/global'; // Assuming you have a cart store
	import { onMount } from 'svelte';
	import { addOrder, addOrderItem, getAddresses } from '../../../API/supabaseAPI';

	let isLoading = false;

	let user_id = $USER_ID;
	let addresses: string | any[];

	// Load user addresses and addresss on component load
	onMount(async () => {
		const addressResponse = await getAddresses(user_id);
		if (!addressResponse.error) {
			addresses = addressResponse.data;
		}
	});
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		{#if isLoading}
			<ProgressRadial value={undefined} />
		{:else}
			<h1 class="h1 mt-4">Addresses</h1>

			<!-- Search bar -->
			<div class="container mx-auto">
				<div>
					{#if addresses}
						{#each addresses as address (address.address_id)}
							<div class="card p-4 m-4">
								<div>
									<strong>Address Description:</strong>
									{address.description}
								</div>
								<div>
									<strong>Street Address:</strong>
									{address.street_address}
								</div>
								<div>
									<strong>City:</strong>
									{address.city}
								</div>
								<div>
									<strong>State:</strong>
									{address.state}
								</div>
								<div>
									<strong>Postal Code:</strong>
									{address.postal_code}
								</div>
								<!-- You can add more details as needed -->
							</div>
						{/each}
					{:else}
						<p>No orders found.</p>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
