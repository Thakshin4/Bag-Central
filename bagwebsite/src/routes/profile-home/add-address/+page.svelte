<!-- Script -->
<script>
	import { goto } from '$app/navigation';
	import { USER_ID } from '$lib/global';
	import { addAddress } from '../../../API/supabaseAPI';

	let description = '';
	let street_address = '';
	let city = '';
	let state = '';
	let postal_code = '';
	let user_id = $USER_ID;

	let msg = '';

	async function saveAddress() {
		const { data, error } = await addAddress(
			description,
			street_address,
			city,
			state,
			postal_code,
			user_id
		);

		if (error) {
			msg = error.message;
		} else {
			msg = 'Address successfully added.';
		}
	}
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Add Address</h1>

		<!-- Form for adding an address -->
		<div class="card p-4">
			<form on:submit|preventDefault={saveAddress}>
				<label for="description" class="m-4">Description:</label>
				<input class="input" type="text" id="description" bind:value={description} />

				<label for="street_address" class="m-4">Street Address:</label>
				<input class="input" type="text" id="street_address" bind:value={street_address} />

				<label for="city" class="m-4">City:</label>
				<input class="input" type="text" id="city" bind:value={city} />

				<label for="state" class="m-4">State:</label>
				<input class="input" type="text" id="state" bind:value={state} />

				<label for="postal_code" class="m-4">Postal Code:</label>
				<input class="input" type="text" id="postal_code" bind:value={postal_code} />
			</form>
		</div>
		<div>
			{msg}
		</div>
		<div>
			<button type="button" class="btn variant-filled" on:click={saveAddress}>Submit</button>
		</div>
	</div>
</div>
