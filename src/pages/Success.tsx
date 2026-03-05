import { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Success() {
	const clearCart = useCartStore(s => s.clearCart);

	useEffect(() => {
		clearCart();
	}, [clearCart]);

	return (
		<div className='space-y-6'>
			<h1 className='text-2xl font-semibold'>Thank you for your purchase!</h1>

			<Link to='/'>
				<Button>Back to Home</Button>
			</Link>
		</div>
	);
}
