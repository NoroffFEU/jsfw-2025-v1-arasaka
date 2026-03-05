import { useCartStore } from '../store/cartStore';
import { Button } from '@/components/ui/button';
import { formatMoney } from '../utils/money';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Cart() {
	const { items, removeItem, increase, decrease, totalPrice } = useCartStore();

	const navigate = useNavigate();

	if (items.length === 0) {
		return (
			<div className='space-y-4 max-w-xl'>
				<h1 className='text-2xl font-semibold'>Your Cart</h1>
				<p className='text-muted-foreground'>Your cart is empty.</p>
				<Button onClick={() => navigate('/')}>Back to products</Button>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<h1 className='text-2xl font-semibold'>Your Cart</h1>

			<div className='space-y-4'>
				{items.map(item => (
					<div
						key={item.id}
						className='flex items-center gap-4 border p-4 rounded-md'>
						<img
							src={item.imageUrl}
							alt={item.title}
							className='w-20 h-20 object-cover rounded'
						/>

						<div className='flex-1 space-y-1'>
							<p className='font-semibold'>{item.title}</p>
							<p className='text-sm text-muted-foreground'>
								{formatMoney(item.discountedPrice < item.price ? item.discountedPrice : item.price)}
							</p>

							<div className='flex items-center gap-2'>
								<Button
									size='sm'
									variant='outline'
									onClick={() => decrease(item.id)}>
									-
								</Button>
								<span>{item.quantity}</span>
								<Button
									size='sm'
									variant='outline'
									onClick={() => increase(item.id)}>
									+
								</Button>
							</div>
						</div>

						<Button
							variant='destructive'
							onClick={() => {
								removeItem(item.id);
								toast('Item removed from cart');
							}}>
							Remove
						</Button>
					</div>
				))}
			</div>

			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t pt-4'>
				<p className='text-lg font-semibold'>Total: {formatMoney(totalPrice())}</p>

				<Button onClick={() => navigate('/checkout')}>Checkout</Button>
			</div>
		</div>
	);
}
