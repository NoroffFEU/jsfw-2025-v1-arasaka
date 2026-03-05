export const API_BASE_URL = 'https://v2.api.noroff.dev';

export async function apiGet<T>(path: string): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${path}`);
	if (!res.ok) {
		const text = await res.text().catch(() => '');
		throw new Error(`API error ${res.status}: ${text || res.statusText}`);
	}
	return res.json() as Promise<T>;
}
