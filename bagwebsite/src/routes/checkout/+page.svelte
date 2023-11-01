<!-- Script -->
<script lang="ts">
	import { ListBox, ListBoxItem, Step, Stepper } from '@skeletonlabs/skeleton';

	// Import the ShoppingCart component
	import ShoppingCart from '../../Components/cart.svelte';
	import { SHOPPING_CART, USER_ID, SUBTOTAL, APP_URL } from '../../lib/global'; // Assuming you have a cart store
	import { onMount } from 'svelte';
	import { addOrder, addOrderItem, getAddresses, getCards } from '../../API/supabaseAPI';
	import { goto } from '$app/navigation';

	let msg = '';

	let lockedState: boolean = true;

	let user_id = $USER_ID;
	let cartItems = $SHOPPING_CART;

	let cards: string | any[];
	let addresses: string | any[];

	let card_id = '';
	let address_id = '';

	let address = '';

	let subtotal = $SUBTOTAL;

	let order_id = '';

	// Load user addresses and cards on component load
	onMount(async () => {
		const addressResponse = await getAddresses(user_id);
		if (!addressResponse.error) {
			addresses = addressResponse.data;
		}

		const cardResponse = await getCards(user_id);
		if (!cardResponse.error) {
			cards = cardResponse.data;
		}
	});

	function handleCheckout() {
		handleAddOrder();
		const payfastForm = document.getElementById('payfastForm');
		if (payfastForm) {
			payfastForm.submit();
		}
		SHOPPING_CART.set(new Map<any, any>());
	}

	async function handleAddOrder() {
		let order_date = new Date();
		let order_status = 'Processing';

		// Create an Order object
		const orderData = {
			user_id,
			address_id,
			subtotal,
			order_date,
			order_status
		};

		// Call an API function to add the product (implement this function)
		const { data, error } = await addOrder(orderData);

		if (error) {
			msg = error.message;
		} else if (data) {
			order_id = data[0].order_id;
		}

		for (const [product_id, quantity] of cartItems) {
			handleAddOrderItems(order_id, product_id, quantity);
		}
	}

	async function handleAddOrderItems(order_id: any, product_id: any, quantity: any) {
		const order_item = {
			order_id,
			product_id,
			quantity
		};

		// Call an API function to add the product (implement this function)
		const { data, error } = await addOrderItem(order_item);

		if (error) {
			msg = error.message;
		}
	}

	function setAddress(a: string) {
		address = a;
		return a;
	}

	function gotoAddCard() {
		goto('/profile-home/add-card');
	}

	function gotoAddAddress() {
		goto('/profile-home/add-address');
	}

	function checkLock() {
		if (cartItems && card_id && address_id) {
			lockedState = false;
		}
		return '';
	}
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<Stepper on:complete={handleCheckout}>
		<Step>
			<svelte:fragment slot="header">Review Shopping Cart</svelte:fragment>
			<ShoppingCart />
		</Step>
		<Step>
			<svelte:fragment slot="header">Select Address</svelte:fragment>
			{#if addresses?.length > 0}
				{#each addresses as address}
					<ListBox class="input">
						<ListBoxItem bind:group={address_id} name="address" value={address.address_id}>
							{address.description} : {setAddress(address.street_address)}
						</ListBoxItem>
					</ListBox>
				{/each}
			{/if}
			<button type="button" class="btn variant-ghost-primary m-4" on:click={gotoAddAddress}>
				Add Address
			</button>
		</Step>
		<Step>
			<svelte:fragment slot="header">Select Card</svelte:fragment>
			{#if cards?.length > 0}
				{#each cards as card}
					<ListBox class="input">
						<ListBoxItem bind:group={card_id} name="address" value={card}>
							{card.description} : {card.card_number}
						</ListBoxItem>
					</ListBox>
				{/each}
			{/if}
			<button type="button" class="btn variant-ghost-primary m-4" on:click={gotoAddCard}>
				Add Card
			</button>
		</Step>
		<Step locked={lockedState}>
			<svelte:fragment slot="header">Summary</svelte:fragment>
			{#if card_id}
				{checkLock()}
				<div class="card p-4 m-4">
					<li>Address: {address}</li>
					<li>Card: {card_id.card_number}</li>
					<li>Subtotal: {$SUBTOTAL}</li>
				</div>
				<form id="payfastForm" action="https://sandbox.payfast.co.za​/eng/process" method="post">
					<input type="hidden" name="merchant_id" value="10000100" />
					<input type="hidden" name="merchant_key" value="46f0cd694581a" />
					<input type="hidden" name="amount" value={$SUBTOTAL} />
					<input type="hidden" name="item_name" value="Test Product" />
					<input type="hidden" name="return_url" value="{APP_URL}profile-home/orders" />
					<!-- <input type="hidden" name="cancel_url" value="{APP_URL}payment/cancel" />
					<input type="hidden" name="notify_url" value="{APP_URL}payment/notify" /> -->
				</form>
			{:else}
				Select an Address and Card
			{/if}
		</Step>
		<!-- ... -->
	</Stepper>
</div>
{msg}
