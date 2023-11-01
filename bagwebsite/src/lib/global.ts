import { writable } from 'svelte/store';
import { persistBrowserSession } from '@macfja/svelte-persistent-store';

// Create your Svelte stores
export const LOGGED_IN = writable(false);
export const USER_ROLE = writable('');
export const USER_ID = writable('');
export const SHOPPING_CART = writable(new Map());
export const SUBTOTAL = writable(0);

// Use the persistBrowserSession function to make them persist in session storage
export const PERSIST_LOGGED_IN = persistBrowserSession(LOGGED_IN, 'LOGGED_IN');
export const PERSIST_USER_ROLE = persistBrowserSession(USER_ROLE, 'USER_ROLE');
export const PERSIST_USER_ID = persistBrowserSession(USER_ID, 'USER_ID');
export const PERSIST_SHOPPING_CART = persistBrowserSession(SHOPPING_CART, 'SHOPPING_CART');

export const APP_NAME = 'JKR Promotions Bags';
export const APP_URL = 'https://bag-central-psi.vercel.app/'