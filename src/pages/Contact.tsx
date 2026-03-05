import { useState } from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const schema = z.object({
	fullName: z.string().min(3, 'Full Name must be at least 3 characters'),
	subject: z.string().min(3, 'Subject must be at least 3 characters'),
	email: z.string().email('Email must be a valid email'),
	message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormState = z.infer<typeof schema>;

export default function Contact() {
	const [values, setValues] = useState<FormState>({
		fullName: '',
		subject: '',
		email: '',
		message: '',
	});

	const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

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

		
		toast('Message sent');
		setValues({ fullName: '', subject: '', email: '', message: '' });
	}

	return (
		<div className='max-w-md space-y-6'>
			<h1 className='text-2xl font-semibold'>Contact</h1>

			<form
				onSubmit={onSubmit}
				className='space-y-4'>
				<div className='space-y-1'>
					<label className='text-sm'>Full Name</label>
					<Input
						value={values.fullName}
						onChange={e => setField('fullName', e.target.value)}
						placeholder='Your name'
					/>
					{errors.fullName && <p className='text-sm text-red-600'>{errors.fullName}</p>}
				</div>

				<div className='space-y-1'>
					<label className='text-sm'>Subject</label>
					<Input
						value={values.subject}
						onChange={e => setField('subject', e.target.value)}
						placeholder='Subject'
					/>
					{errors.subject && <p className='text-sm text-red-600'>{errors.subject}</p>}
				</div>

				<div className='space-y-1'>
					<label className='text-sm'>Email</label>
					<Input
						value={values.email}
						onChange={e => setField('email', e.target.value)}
						placeholder='name@example.com'
					/>
					{errors.email && <p className='text-sm text-red-600'>{errors.email}</p>}
				</div>

				<div className='space-y-1'>
					<label className='text-sm'>Message</label>
					<textarea
						value={values.message}
						onChange={e => setField('message', e.target.value)}
						placeholder='Write your message...'
						className='w-full px-3 py-2 border rounded-md min-h-30'
					/>
					{errors.message && <p className='text-sm text-red-600'>{errors.message}</p>}
				</div>

				<Button
					type='submit'
					className='w-full'>
					Send
				</Button>
			</form>
		</div>
	);
}
