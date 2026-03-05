import { apiGet } from './client';
import type { ProductsResponse, ProductResponse } from '../types/product';

export function getProducts() {
	return apiGet<ProductsResponse>('/online-shop');
}

export function getProductById(id: string) {
	return apiGet<ProductResponse>(`/online-shop/${id}`);
}
