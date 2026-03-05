import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import type { Product } from '../types/product';
import { formatMoney } from '../utils/money';
import { getDiscountPercent } from '../utils/discount';
import { useCartStore } from '../store/cartStore';

export default function ProductCard({ p }: { p: Product }) {
	const discount = getDiscountPercent(p.price, p.discountedPrice);
	const hasDiscount = discount > 0;

	const addItem = useCartStore(s => s.addItem);

	function onAddToCart(e: React.MouseEvent) {
		e.preventDefault(); 
		e.stopPropagation();

		addItem(p);
		toast('Added to cart');
	}

	return (
		<Link
			to={`/product/${p.id}`}
			className='block no-underline'>
			<Card className='overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5'>
				<div className='relative'>
					<div className='aspect-4/3 bg-muted'>
						<img
							src={p.image?.url}
							alt={p.image?.alt ?? p.title}
							className='object-cover w-full h-full'
							loading='lazy'
						/>
					</div>

					{hasDiscount && <Badge className='absolute left-3 top-3'>-{discount}%</Badge>}
				</div>

				<CardContent className='p-4 space-y-3'>
					<div className='space-y-1'>
						<h3 className='font-semibold leading-snug line-clamp-1'>{p.title}</h3>

						<div className='flex items-baseline gap-2'>
							{hasDiscount ? (
								<>
									<span className='font-semibold'>{formatMoney(p.discountedPrice)}</span>
									<span className='text-sm line-through text-muted-foreground'>{formatMoney(p.price)}</span>
								</>
							) : (
								<span className='font-semibold'>{formatMoney(p.price)}</span>
							)}
						</div>

						<p className='text-sm text-muted-foreground'>Rating: {p.rating}/5</p>
					</div>

					<Button
						className='w-full'
						onClick={onAddToCart}>
						Add to cart
					</Button>
				</CardContent>
			</Card>
		</Link>
	);
}
