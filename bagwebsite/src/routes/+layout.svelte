<!-- Script -->
<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar, Avatar } from '@skeletonlabs/skeleton';
	import Logo from '$lib/Images/logo.png';

	import { signOut } from '../API/supabaseAPI';

	import { APP_NAME, SHOPPING_CART } from '../lib/global';
	import { LOGGED_IN, USER_ROLE } from '../lib/global';

	let btnStyle = 'btn variant-soft mr-4';

	let currentUserRole: string;
	USER_ROLE.subscribe((value) => {
		currentUserRole = value;
	});

	let isLoggedIn: boolean;
	LOGGED_IN.subscribe((value) => {
		isLoggedIn = value;
	});

	function handleLogout() {
		$SHOPPING_CART.clear();
		signOut();
		LOGGED_IN.set(false);
	}
</script>

<!-- HTML -->
<AppShell>
	<!-- Page Header -->
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><Avatar src={Logo} width="w-10" rounded="rounded-full" /></a>
				<strong class="text-xl uppercase ml-4 mr-24">{APP_NAME}</strong>
			</svelte:fragment>

			{#if isLoggedIn}
				<a href="/products" class={btnStyle}>Browse Products</a>
				{#if currentUserRole === 'Owner' || currentUserRole === 'Employee'}
					<a href="/add-products" class={btnStyle}>Add Products</a>{/if}
				{#if currentUserRole === 'Owner'}
					<a href="/add-employees" class={btnStyle}>Add Employees</a>{/if}

				<a href="/cart" class={btnStyle}>Cart</a>
			{/if}
			<svelte:fragment slot="trail">
				<!-- AppBar links -->

				{#if $LOGGED_IN}
					Hello, {$USER_ROLE}
					<a href="/profile-home" class="{btnStyle} ml-8">Profile</a>
					<a href="/" class={btnStyle} on:click={handleLogout}>Logout</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!--AppBar-->

	<!-- Router Slot -->
	<slot />
	<!-- Page Footer -->
	<svelte:fragment slot="footer">
		<AppBar>
			{APP_NAME} | 2023 | This Website was made possible thanks to
			<a class="anchor" href="https://kit.svelte.dev">SvelteKit</a>,
			<a class="anchor" href="https://www.skeleton.dev">SkeletonUI</a> and
			<a class="anchor" href="https://supabase.com">Supabase</a>
		</AppBar>
	</svelte:fragment>
</AppShell>
