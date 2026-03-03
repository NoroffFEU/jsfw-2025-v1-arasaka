import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { formatMoney } from '../utils/money';
import { getDiscountPercent } from '../utils/discount';

export default function ProductCard({ product }: { product: Product }) {
	const discount = getDiscountPercent(product.price, product.discountedPrice);

	return (
		<div
			style={{
				border: '1px solid #ccc',
				padding: '12px',
				marginBottom: '12px',
				maxWidth: '300px',
			}}>
			<div style={{ position: 'relative' }}>
				{product.image?.url && (
					<img
						src={product.image.url}
						alt={product.image.alt ?? product.title}
						style={{ width: '100%', height: '200px', objectFit: 'cover' }}
					/>
				)}

				{discount > 0 && (
					<span
						style={{
							position: 'absolute',
							top: 8,
							left: 8,
							background: 'black',
							color: 'white',
							padding: '2px 8px',
							fontSize: 12,
						}}>
						-{discount}%
					</span>
				)}
			</div>

			<h3>
				<Link to={`/product/${product.id}`}>{product.title}</Link>
			</h3>

			<p>
				{discount > 0 ? (
					<>
						<strong>{formatMoney(product.discountedPrice)}</strong>{' '}
						<span style={{ textDecoration: 'line-through', color: '#666' }}>{formatMoney(product.price)}</span>
					</>
				) : (
					<strong>{formatMoney(product.price)}</strong>
				)}
			</p>

			<p>Rating: {product.rating}/5</p>
		</div>
	);
}
