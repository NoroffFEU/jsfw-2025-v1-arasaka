import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../api/products';
import { formatMoney } from '../utils/money';
import { getDiscountPercent } from '../utils/discount';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';

export default function Product() {
	const { id } = useParams();

	
	const addItem = useCartStore(s => s.addItem);

	const { data, isLoading, error } = useQuery({
		queryKey: ['product', id],
		queryFn: () => getProductById(id!),
		enabled: !!id,
	});

	if (isLoading) return <p>Loading product...</p>;
	if (error) return <p className='text-red-600'>Error: {(error as Error).message}</p>;
	if (!data) return <p>Product not found.</p>;

	const p = data.data;
	const discount = getDiscountPercent(p.price, p.discountedPrice);

	return (
		<div className='space-y-6'>
			<div className='grid gap-6 md:grid-cols-2'>
				<div className='relative'>
					<img
						src={p.image.url}
						alt={p.image.alt ?? p.title}
						className='w-full rounded-md'
					/>
					{discount > 0 && <Badge className='absolute top-3 left-3'>-{discount}%</Badge>}
				</div>

				<div className='space-y-4'>
					<h1 className='text-3xl font-semibold'>{p.title}</h1>

					<div className='flex items-baseline gap-3'>
						{discount > 0 ? (
							<>
								<span className='text-xl font-semibold'>{formatMoney(p.discountedPrice)}</span>
								<span className='line-through text-muted-foreground'>{formatMoney(p.price)}</span>
							</>
						) : (
							<span className='text-xl font-semibold'>{formatMoney(p.price)}</span>
						)}
					</div>

					<p>{p.description}</p>

					<p className='text-sm text-muted-foreground'>Rating: {p.rating}/5</p>

					{p.tags?.length > 0 && (
						<div className='flex flex-wrap gap-2'>
							{p.tags.map(tag => (
								<Badge
									key={tag}
									variant='secondary'>
									{tag}
								</Badge>
							))}
						</div>
					)}

					<Button
						onClick={() => {
							addItem(p);
							toast('Added to cart');
						}}>
						Add to Cart
					</Button>
				</div>
			</div>

			{p.reviews?.length > 0 && (
				<div className='space-y-3'>
					<h2 className='text-xl font-semibold'>Reviews</h2>
					{p.reviews.map(r => (
						<div
							key={r.id}
							className='p-3 border rounded-md'>
							<p className='font-semibold'>{r.username}</p>
							<p className='text-sm text-muted-foreground'>Rating: {r.rating}/5</p>
							<p>{r.description}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
