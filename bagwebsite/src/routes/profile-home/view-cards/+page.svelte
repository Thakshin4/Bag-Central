<!-- Script -->
<script lang="ts">
	import { ListBox, ListBoxItem, ProgressRadial, Step, Stepper } from '@skeletonlabs/skeleton';

	// Import the ShoppingCart component
	import { SHOPPING_CART, USER_ID, SUBTOTAL, APP_URL } from '../../../lib/global'; // Assuming you have a cart store
	import { onMount } from 'svelte';
	import { addOrder, addOrderItem, getAddresses, getCards } from '../../../API/supabaseAPI';

	let isLoading = false;

	let user_id = $USER_ID;

	let cards: string | any[];

	// Load user addresses and cards on component load
	onMount(async () => {
		const cardResponse = await getCards(user_id);
		if (!cardResponse.error) {
			cards = cardResponse.data;
		}
	});
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		{#if isLoading}
			<ProgressRadial value={undefined} />
		{:else}
			<h1 class="h1 mt-4">Cards</h1>

			<!-- Search bar -->
			<div class="container mx-auto">
				<div>
					{#if cards}
						{#each cards as card (card.card_id)}
							<div class="card p-4 m-4">
								<div>
									<strong>Card Description:</strong>
									{card.description}
								</div>
								<div>
									<strong>Card Number:</strong>
									{card.card_number}
								</div>
								<div>
									<strong>Expiration Date:</strong>
									{card.expiration_date}
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
