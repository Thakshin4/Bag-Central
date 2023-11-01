<script>
	import { goto } from '$app/navigation';
	import { register } from '../../API/supabaseAPI'; // Import your Supabase API functions

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let role = 'User';

	let msg = '';

	// User registration
	async function handleRegistration() {
		const { data, error } = await register(email, password, firstName, lastName, role);

		if (error) {
			msg = error.message;
		} else {
			// User is registered and logged in. You can now redirect them to the desired page.
			// For example, redirect to the home page:
			goto('/login'); // You can use SvelteKit's navigation functions if needed
		}
	}
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Register</h1>

		<!-- Form for Registration -->
		<div class="card p-4">
			<section class="p-4">
				<form on:submit|preventDefault={handleRegistration}>
					<label for="fname">First Name:</label><br />
					<input class="input" type="text" id="fname" bind:value={firstName} /><br />
					<br />
					<label for="lname">Last Name:</label><br />
					<input class="input" type="text" id="lname" bind:value={lastName} /><br />
					<br />
					<label for="email">Email:</label><br />
					<input class="input" type="text" id="email" bind:value={email} /><br />
					<br />
					<label for="password">Password:</label><br />
					<input class="input" type="password" id="password" bind:value={password} />
				</form>
			</section>
		</div>
		<div>
			{msg}
		</div>
		<div>
			<button type="button" class="btn variant-filled" on:click={handleRegistration}
				>Register</button
			>
		</div>
	</div>
</div>
