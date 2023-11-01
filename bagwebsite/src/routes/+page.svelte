<!-- Script -->
<script>
	import { APP_NAME, LOGGED_IN } from '../lib/global';
	import { goto } from '$app/navigation';

	function goToLoginPage() {
		goto('/login');
	}
	function goToRegisterPage() {
		goto('/register');
	}
</script>

<!-- HTML -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Welcome to JKR Promotions Bags!</h1>
		<div class="card p-4">
			<header class="card-header">
				<p>Your Affordable Bag Destination!</p>
				<br />
				<p>
					At JKR Promotions Bags, we're dedicated to bringing you an extensive collection of
					high-quality yet budget-friendly bags for all your needs. Whether you're looking for
					simple and functional backpacks, versatile totes, or stylish messenger bags, we've got you
					covered.
				</p>
				<br />
				<p>
					Our mission is to make durable and fashionable bags accessible to everyone. We understand
					that quality and affordability are essential, which is why our selection comprises a wide
					variety of basic and economical bags. You don't have to break the bank to own a dependable
					bag that suits your style.
				</p>
				<p>
					<br />
					<strong>Why choose JKR Promotions Bags?</strong>
				</p>
				<li>
					Affordable Variety: We offer an array of bags that cater to different tastes and purposes,
					all at prices that won't strain your budget.
				</li>
				<li>
					Quality You Can Trust: Despite our low prices, we never compromise on quality. You can
					count on our bags to withstand everyday wear and tear.
				</li>
				<li>
					Stylish Simplicity: Our bags are designed to be versatile and complement any outfit. They
					may be basic, but they're far from boring!
				</li>
				<li>
					Customer Satisfaction: Your happiness is our priority. We're here to ensure you find the
					perfect bag that suits your needs.
				</li>
				<br />
				<p>
					Explore our collection today and discover the ideal bag to accompany you on your
					adventures, daily routines, and promotional endeavors. At JKR Promotions Bags, quality
					meets affordability, so you can bag the best deals without emptying your wallet.
				</p>
				<br />
				<p>Shop now and experience the simplicity and affordability of JKR Promotions Bags!</p>
			</header>
		</div>
		<div>
			{#if !$LOGGED_IN}
				<button type="button" class="btn variant-filled m-2" on:click={goToLoginPage}>
					Login
				</button>
				<button type="button" class="btn variant-filled m-2" on:click={goToRegisterPage}>
					Register
				</button>
			{/if}
		</div>
	</div>
</div>
