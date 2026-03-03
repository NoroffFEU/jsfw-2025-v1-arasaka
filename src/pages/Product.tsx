import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";
import { formatMoney } from '../utils/money';
import { getDiscountPercent } from '../utils/discount';

export default function Product() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {(error as Error).message}</p>;
  if (!data) return <p>Product not found.</p>;

  const p = data.data;
const discount = getDiscountPercent(p.price, p.discountedPrice);

  return (
		<div>
			<p>
				<Link to='/'>← Back</Link>
			</p>

			{p.image?.url && (
				<img
					src={p.image.url}
					alt={p.image.alt ?? p.title}
					style={{ width: '100%', maxWidth: 600, height: 'auto', objectFit: 'cover' }}
				/>
			)}

			<h1>{p.title}</h1>
			<p>{p.description}</p>

			<p>
				Price:{' '}
				{discount > 0 ? (
					<>
						<strong>{formatMoney(p.discountedPrice)}</strong>{' '}
						<span style={{ textDecoration: 'line-through', color: '#666' }}>{formatMoney(p.price)}</span>{' '}
						<span style={{ marginLeft: 8, padding: '2px 8px', border: '1px solid #ccc' }}>-{discount}%</span>
					</>
				) : (
					<strong>{formatMoney(p.price)}</strong>
				)}
			</p>

			<p>Rating: {p.rating}/5</p>

			{p.tags?.length ? (
				<div>
					<h3>Tags</h3>
					<ul>
						{p.tags.map(t => (
							<li key={t}>{t}</li>
						))}
					</ul>
				</div>
			) : null}

			<div>
				<h3>Reviews</h3>
				{p.reviews?.length ? (
					p.reviews.map(r => (
						<div
							key={r.id}
							style={{ border: '1px solid #ccc', padding: 8, marginBottom: 8 }}>
							<strong>{r.username}</strong>
							<div>Rating: {r.rating}/5</div>
							<div>{r.description}</div>
						</div>
					))
				) : (
					<p>No reviews yet.</p>
				)}
			</div>
		</div>
	);
}