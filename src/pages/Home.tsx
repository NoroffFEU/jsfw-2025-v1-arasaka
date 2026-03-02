import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products';

export default function Home() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
	});

	if (isLoading) return <p>Loading products...</p>;
	if (error) return <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>;

	return (
		<div>
			<h1>Products</h1>

			<ul>
				{data!.data.map(p => (
					<li key={p.id}>
						<strong>{p.title}</strong> — {p.discountedPrice}
					</li>
				))}
			</ul>
		</div>
	);
}
