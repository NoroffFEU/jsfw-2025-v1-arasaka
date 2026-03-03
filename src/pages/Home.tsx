import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/product';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'rating';

export default function Home() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
	});

	const [query, setQuery] = useState('');
	const [sort, setSort] = useState<SortKey>('default');

	const filtered = useMemo(() => {
		const products = data?.data ?? [];
		const q = query.trim().toLowerCase();

	
		let result: Product[] = q ? products.filter(p => p.title.toLowerCase().includes(q)) : products;

		
		switch (sort) {
			case 'price-asc':
				result = [...result].sort((a, b) => a.discountedPrice - b.discountedPrice);
				break;
			case 'price-desc':
				result = [...result].sort((a, b) => b.discountedPrice - a.discountedPrice);
				break;
			case 'rating':
				result = [...result].sort((a, b) => b.rating - a.rating);
				break;
			default:
				break;
		}

		return result;
	}, [data, query, sort]);

	if (isLoading) return <p>Loading products...</p>;
	if (error) return <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>;

	return (
		<div
			style={{
				maxWidth: 1200,
				margin: '0 auto',
				padding: '0 16px',
			}}>
			<h1>Products</h1>
			<p>Browse items, search, sort, and add to cart.</p>

			<div style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '12px 0' }}>
				<input
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder='Search products...'
					style={{ padding: 8, width: 260 }}
				/>

				<select
					value={sort}
					onChange={e => setSort(e.target.value as SortKey)}
					style={{ padding: 8 }}>
					<option value='default'>Sort: Default</option>
					<option value='price-asc'>Price: Low to High</option>
					<option value='price-desc'>Price: High to Low</option>
					<option value='rating'>Rating: High to Low</option>
				</select>
			</div>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(4, 1fr)',
					gap: 16,
				}}>
				{filtered.map(p => (
					<ProductCard
						key={p.id}
						product={p}
					/>
				))}
			</div>
		</div>
	);
}
