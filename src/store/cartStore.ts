import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';

type CartItem = {
	id: string;
	title: string;
	price: number;
	discountedPrice: number;
	imageUrl: string;
	quantity: number;
};

type CartState = {
	items: CartItem[];
	addItem: (product: Product) => void;
	removeItem: (id: string) => void;
	increase: (id: string) => void;
	decrease: (id: string) => void;
	clearCart: () => void;
	totalItems: () => number;
	totalPrice: () => number;
};

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],

			addItem: product => {
				const existing = get().items.find(i => i.id === product.id);

				if (existing) {
					set({
						items: get().items.map(i => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)),
					});
				} else {
					set({
						items: [
							...get().items,
							{
								id: product.id,
								title: product.title,
								price: product.price,
								discountedPrice: product.discountedPrice,
								imageUrl: product.image?.url ?? '',
								quantity: 1,
							},
						],
					});
				}
			},

			removeItem: id => set({ items: get().items.filter(i => i.id !== id) }),

			increase: id =>
				set({
					items: get().items.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
				}),

			decrease: id =>
				set({
					items: get()
						.items.map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
						.filter(i => i.quantity > 0),
				}),

			clearCart: () => set({ items: [] }),

			totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

			totalPrice: () =>
				get().items.reduce(
					(acc, i) => acc + (i.discountedPrice < i.price ? i.discountedPrice : i.price) * i.quantity,
					0,
				),
		}),
		{
			name: 'cart-storage',
		},
	),
);
