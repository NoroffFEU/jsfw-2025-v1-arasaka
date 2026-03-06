import { useState } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const schema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
	expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry must be MM/YY'),
	cvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
});

type FormState = z.infer<typeof schema>;

export default function Checkout() {
	const navigate = useNavigate();
	const items = useCartStore(s => s.items);
	const totalPrice = useCartStore(s => s.totalPrice);
	const clearCart = useCartStore(s => s.clearCart);

	const [values, setValues] = useState<FormState>({
		name: '',
		cardNumber: '',
		expiry: '',
		cvc: '',
	});

	const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

	if (items.length === 0) return <p>Your cart is empty.</p>;

	function setField<K extends keyof FormState>(key: K, val: string) {
		setValues(v => ({ ...v, [key]: val }));
		setErrors(e => ({ ...e, [key]: undefined }));
	}

	function onSubmit(e: React.FormEvent) {
		e.preventDefault();

		const parsed = schema.safeParse(values);
		if (!parsed.success) {
			const fieldErrors: Partial<Record<keyof FormState, string>> = {};
			for (const issue of parsed.error.issues) {
				const key = issue.path[0] as keyof FormState;
				fieldErrors[key] = issue.message;
			}
			setErrors(fieldErrors);
			return;
		}

		
		clearCart();
		toast('Payment successful');
		navigate('/checkout/success');
	}

	return (
		<div className='max-w-md space-y-6'>
			<h1 className='text-2xl font-semibold'>Checkout</h1>
			<p className='text-sm text-muted-foreground'>Total: NOK{totalPrice().toFixed(2)}</p>

			<form
				onSubmit={onSubmit}
				className='space-y-4'>
				<div className='space-y-1'>
					<label className='text-sm'>Cardholder name</label>
					<Input
						value={values.name}
						onChange={e => setField('name', e.target.value)}
						placeholder='John Doe'
					/>
					{errors.name && <p className='text-sm text-red-600'>{errors.name}</p>}
				</div>

				<div className='space-y-1'>
					<label className='text-sm'>Card number</label>
					<Input
						value={values.cardNumber}
						onChange={e => setField('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16))}
						inputMode='numeric'
						placeholder='1234123412341234'
					/>
					{errors.cardNumber && <p className='text-sm text-red-600'>{errors.cardNumber}</p>}
				</div>

				<div className='grid grid-cols-2 gap-3'>
					<div className='space-y-1'>
						<label className='text-sm'>Expiry (MM/YY)</label>
						<Input
							value={values.expiry}
							onChange={e => {
								let value = e.target.value.replace(/\D/g, '').slice(0, 4);

								if (value.length >= 3) {
									value = value.slice(0, 2) + '/' + value.slice(2);
								}

								setField('expiry', value);
							}}
							placeholder='08/26'
						/>
						{errors.expiry && <p className='text-sm text-red-600'>{errors.expiry}</p>}
					</div>

					<div className='space-y-1'>
						<label className='text-sm'>CVC</label>
						<Input
							value={values.cvc}
							onChange={e => setField('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
							inputMode='numeric'
							placeholder='123'
						/>
						{errors.cvc && <p className='text-sm text-red-600'>{errors.cvc}</p>}
					</div>
				</div>

				<Button
					type='submit'
					className='w-full'>
					Pay now
				</Button>
			</form>

			<p className='text-xs text-muted-foreground'>This is a demo checkout. Do not enter real card details.</p>
		</div>
	);
}
