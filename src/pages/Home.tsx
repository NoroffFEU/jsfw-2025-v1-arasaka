
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import SearchBox from '../components/SearchBox';

export default function Home() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
	});

	const [query, setQuery] = useState('');
	const [sort, setSort] = useState('default');

	const filtered = useMemo(() => {
		const products = data?.data ?? [];
		const q = query.trim().toLowerCase();

		
		let result = q ? products.filter(p => p.title.toLowerCase().includes(q)) : products;

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
	if (error) return <p className='text-red-600'>Error: {(error as Error).message}</p>;

	return (
		<div className='space-y-6'>
			<div className='p-6 bg-white border rounded-xl'>
				<div className='flex items-end justify-between gap-4'>
					<div>
						<h1 className='text-3xl font-semibold tracking-tight'>Products</h1>
						<p className='text-sm text-gray-600'>Browse items, search, sort, and add to cart.</p>
					</div>
				</div>

				<div className='flex flex-col gap-3 mt-4 md:flex-row md:items-center md:justify-between'>
					<SearchBox
						products={data!.data}
						query={query}
						setQuery={setQuery}
					/>

					<select
						value={sort}
						onChange={e => setSort(e.target.value)}
						className='h-10 px-3 text-sm bg-white border rounded-md'>
						<option value='default'>Sort: Default</option>
						<option value='price-asc'>Price: Low to High</option>
						<option value='price-desc'>Price: High to Low</option>
						<option value='rating'>Rating: High to Low</option>
					</select>
				</div>
			</div>

			{filtered.length === 0 ? (
				<p>No products found.</p>
			) : (
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
					{filtered.map(p => (
						<ProductCard
							key={p.id}
							p={p}
						/>
					))}
				</div>
			)}
		</div>
	);
}
