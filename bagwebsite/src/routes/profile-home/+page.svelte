<!-- Script -->
<script lang="ts">
	import { USER_ID } from '$lib/global';
	import { onMount } from 'svelte';
	import { getUserProfile } from '../../API/supabaseAPI';

	let user: any;
	onMount(async () => {
		// Fetch product details for each product ID
		const { data, error } = await getUserProfile($USER_ID);

		if (error) {
			// Handle the error, for example, display an error message or remove the invalid product from the cart
			console.error(`Error fetching product details for ID ${USER_ID}: ${error}`);
		} else {
			// Add the fetched product details to the array
			user = data;
		}
	});
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Profile</h1>

		<div class="card p-4">
			<!-- HTML -->
			<div class="container">
				{#if user}
					<p>Name: {user.first_name} {user.last_name}</p>
					<p>Email: {user.email}</p>
					<p>Role: {user.role}</p>
				{:else}
					<p>Loading user profile...</p>
				{/if}
			</div>
		</div>
		<div class="card p-4">
			<a href="profile-home/orders">Orders</a>
		</div>
		<div class="card p-4">
			<a href="profile-home/add-address">Add Address</a>
		</div>
		<div class="card p-4">
			<a href="profile-home/add-card">Add Card</a>
		</div>
		<div class="card p-4">
			<a href="profile-home/view-addresses">View Addresses</a>
		</div>
		<div class="card p-4">
			<a href="profile-home/view-cards">View Cards</a>
		</div>
	</div>
</div>
