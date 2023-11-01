<!-- Script -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { USER_ID } from '$lib/global';
	import { addCard } from '../../../API/supabaseAPI';

	let description = '';
	let card_number = '';
	let expiration_date: Date;
	let cvv = '';
	let user_id = $USER_ID;

	let msg = '';

	async function saveCard() {
		const { data, error } = await addCard(description, card_number, expiration_date, cvv, user_id);

		if (error) {
			msg = error.message;
		} else {
			msg = 'Card successfully added.';
		}
	}
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Add Card</h1>

		<!-- Form for adding a card -->
		<div class="card p-4">
			<form on:submit|preventDefault={saveCard}>
				<label for="description" class="m-4">Description:</label>
				<input class="input" type="text" id="description" bind:value={description} />

				<label for="card_number" class="m-4">Card Number:</label>
				<input class="input" type="number" id="card_number" bind:value={card_number} />

				<label for="expiration_date" class="m-4">Expiration Date:</label>
				<input class="input" type="date" id="expiration_date" bind:value={expiration_date} />

				<label for="cvv" class="m-4">CVV:</label>
				<input class="input" type="number" id="cvv" bind:value={cvv} />
			</form>
		</div>
		<div>
			{msg}
		</div>
		<div>
			<button type="button" class="btn variant-filled" on:click={saveCard}>Submit</button>
		</div>
	</div>
</div>
