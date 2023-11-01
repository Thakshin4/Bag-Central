<script>
	import { goto } from '$app/navigation';
	import { LOGGED_IN, USER_ROLE, USER_ID } from '../../lib/global';
	import { signIn, getUserRole } from '../../API/supabaseAPI'; // Import your Supabase API functions

	let email = '';
	let password = '';
	let msg = '';

	// User login
	async function handleLogin() {
		// Call your signIn function to authenticate the user
		const { data, error } = await signIn(email, password);

		if (error) {
			msg = 'Login failed. Please check your email and password.';
			msg = error.message;
		} else if (data) {
			// Authentication was successful
			// @ts-ignore
			let userID = data.user.id;
			USER_ID.set(userID);

			LOGGED_IN.set(true);

			msg = userID;
			setUserRole(userID);

			goto('/products');
		}
	}

	/**
	 * @param {unknown} userID
	 */
	async function setUserRole(userID) {
		const { data, error } = await getUserRole(userID);
		if (error) {
			msg = 'Login failed. Please check your email and password.';
			msg = error.message;
		} else if (data) {
			USER_ROLE.set(data?.role);
		}
	}
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Login</h1>

		<!-- Form for Login -->
		<div class="card p-4">
			<section class="p-4">
				<form on:submit|preventDefault={handleLogin}>
					<label for="email">Email:</label><br />
					<input class="input" type="text" id="email" bind:value={email} /><br /><br />

					<label for="password">Password:</label><br />
					<input class="input" type="password" id="password" bind:value={password} />
				</form>
			</section>
		</div>
		<div>
			{msg}
		</div>
		<div>
			<button type="button" class="btn variant-filled" on:click={handleLogin}>Login</button>
		</div>
	</div>
</div>
