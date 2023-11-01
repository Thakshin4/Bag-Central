<!-- Script -->
<script>
	import { USER_ID, USER_ROLE } from '$lib/global';
	import { ProgressRadial, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { getOrderItems, getOrders, getAllOrders } from '../../../API/supabaseAPI';
	import { onMount } from 'svelte';

	let isLoading = false;
	/**
	 * @type {any[]}
	 */
	let orders = [];

	let order_id = '';
	let order_status = '';

	onMount(async () => {
		initOrders();
		//initOrderItems();
	});

	async function initOrders() {
		if ($USER_ROLE === 'Employee' || $USER_ROLE === 'Owner') {
			const { data, error } = await getAllOrders();
			if (data) {
				orders = data;
			} else {
				console.error('Error fetching products:', error);
			}
		} else {
			const { data, error } = await getOrders($USER_ID);
			if (data) {
				orders = data;
			} else {
				console.error('Error fetching products:', error);
			}
		}
	}
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		{#if isLoading}
			<ProgressRadial value={undefined} />
		{:else}
			<h1 class="h1 mt-4">Orders</h1>

			<!-- Search bar -->
			<div class="container mx-auto">
				<div>
					{#if orders.length > 0}
						{#each orders as order (order.order_id)}
							<div class="card p-4 m-4">
								<a href={`/profile-home/orders/${order.order_id}`}>
									<h2>Order ID: {order.order_id}</h2>
									<p>Order Date: {order.order_date}</p>
									<p>Order Status: {order.order_status}</p>
									<p>Subtotal: R{order.subtotal.toFixed(2)}</p>
								</a>
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
