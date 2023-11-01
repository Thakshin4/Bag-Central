<!-- Script -->
<script>
	import { goto } from '$app/navigation';
	import { register } from '../../API/supabaseAPI';

	let first_name = '';
	let last_name = '';
	let email = '';
	let password = '';
	let role = 'Employee';

	let msg = '';

	async function addEmployee() {
		const { data, error } = await register(email, password, first_name, last_name, role);

		if (error) {
			msg = error.message;
		} else {
			msg = 'Employee successfully registered.';
		}
	}
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Add Employee</h1>

		<!-- Form for adding Farmer -->
		<div class="card p-4">
			<form on:submit|preventDefault={addEmployee}>
				<label for="name" class="m-4">First Name:</label>
				<input class="input" type="text" id="first_name" bind:value={first_name} />

				<label for="name" class="m-4">Last Name:</label>
				<input class="input" type="text" id="last_name" bind:value={last_name} />

				<label for="label" class="m-4">Email:</label>
				<input class="input" type="text" id="email" bind:value={email} />

				<label for="label" class="m-4">Password:</label>
				<input class="input" type="text" id="password" bind:value={password} />
			</form>
		</div>
		<div>
			{msg}
		</div>
		<div>
			<button type="button" class="btn variant-filled" on:click={addEmployee}>Submit</button>
		</div>
	</div>
</div>
