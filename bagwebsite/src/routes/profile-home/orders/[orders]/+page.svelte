<!-- Script -->
<script>
	import { getOrderByID, getProductById, updateOrder } from '../../../../API/supabaseAPI';
	import { onMount } from 'svelte';
	import { ProgressRadial, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { SHOPPING_CART, USER_ROLE } from '../../../../lib/global';

	export let data;

	let isLoading = true;

	let order_status = '';
	let new_order_status = '';

	let order_id = data.data.orders;
	/**
	 * @type {any}
	 */
	let order_details;

	onMount(async () => {
		const { data, error } = await getOrderByID(order_id);

		if (error) {
			// Handle the error, for example, display an error message
			console.error(error);
		} else {
			order_details = data;
		}
		order_status = order_details.order_status;
		isLoading = false;
	});

	async function updateOrderStatus() {
		const { data, error } = await updateOrder(order_id, new_order_status);
		if (data) {
		} else {
			console.error('Error fetching products:', error);
		}
	}
</script>

<!-- HTML -->
<div class="container grid h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1 center">Order Details</h1>
		{#if isLoading}
			<ProgressRadial value={undefined} />
		{:else if order_details}
			<div class="card p-4">
				<h2>Order ID: {order_details.order_id}</h2>
				<p>Order Date: {order_details.order_date}</p>
				<p>Order Status: {order_details.order_status}</p>
				<p>Subtotal: ${order_details.subtotal.toFixed(2)}</p>
				{#if $USER_ROLE === 'Employee' || $USER_ROLE === 'Owner'}
					<form on:submit={updateOrderStatus}>
						<RadioGroup>
							<RadioItem bind:group={new_order_status} name="justify" value={'Processing'}>
								Processing
							</RadioItem>
							<RadioItem bind:group={new_order_status} name="justify" value={'Delivering'}>
								Delivering
							</RadioItem>
							<RadioItem bind:group={new_order_status} name="justify" value={'Delivered'}>
								Delivered
							</RadioItem>
						</RadioGroup>
					</form>
					<button type="button" class="btn variant-ghost-primary mt-4" on:click={updateOrderStatus}>
						Update Order Status
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>
