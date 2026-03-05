import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { Input } from '@/components/ui/input';

type Props = {
	products: Product[];
	query: string;
	setQuery: (v: string) => void;
};

export default function SearchBox({ products, query, setQuery }: Props) {
	const results = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return [];
		return products.filter(p => p.title.toLowerCase().includes(q)).slice(0, 8);
	}, [query, products]);

	return (
		<div className='relative max-w-md w-full'>
			<Input
				value={query}
				onChange={e => setQuery(e.target.value)}
				placeholder='Search products...'
			/>

			{results.length > 0 && (
				<div className='absolute z-50 mt-2 w-full rounded-md border bg-background shadow'>
					{results.map(p => (
						<Link
							key={p.id}
							to={`/product/${p.id}`}
							className='block px-3 py-2 hover:bg-muted'
							onClick={() => setQuery('')}>
							{p.title}
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
