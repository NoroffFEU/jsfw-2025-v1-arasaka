import type { ApiItemResponse, ApiListResponse, Product } from '../types/product';

const BASE_URL = 'https://v2.api.noroff.dev';

export async function getProducts(): Promise<ApiListResponse<Product>> {
	const res = await fetch(`${BASE_URL}/online-shop`);
	if (!res.ok) throw new Error('Failed to fetch products');
	return res.json();
}

export async function getProductById(id: string): Promise<ApiItemResponse<Product>> {
	const res = await fetch(`${BASE_URL}/online-shop/${id}`);
	if (!res.ok) throw new Error('Failed to fetch product');
	return res.json();
}
