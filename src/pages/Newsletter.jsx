import React from 'react';
import { Form, redirect, useNavigation } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
	const formData = await request.formData();
	// const data = Object.fromEntries(formData);
	const data = {
		name: formData.get('name'),
		lastName: formData.get('lastName'),
		email: formData.get('email'),
	};
	// console.log(data);
	try {
		const response = await fetch(
			'https://www.course-api.com/cocktails-newsletter',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}
		);
		if (response.ok) {
			const json = await response.json();
			toast.success(json?.msg);
			return redirect('/');
		} else {
			const errorMessage = await response.json();
			toast.error(errorMessage?.msg);
			return null; // Return null to prevent further redirection
		}
	} catch (error) {
		toast.error(error);
		return null;
	}
};

const Newsletter = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	return (
		<div className='mt-40 max-w-lg block m-auto'>
			<Form className='flex flex-col' method='POST'>
				<label className='ml-3' htmlFor='name'>
					Name
				</label>
				<input
					className='border border-gray-500 mb-4 ml-3 p-2'
					name='name'
					type='text'
					defaultValue={'mazhar'}
				/>
				<label className='ml-3' htmlFor='lastName'>
					Last Name
				</label>
				<input
					className='border border-gray-500 mb-4 ml-3 p-2'
					name='lastName'
					type='text'
					defaultValue={'solkar'}
				/>
				<label className='ml-3' htmlFor='email'>
					Email
				</label>
				<input
					className='border border-gray-500 mb-4 ml-3 p-2'
					name='email'
					type='email'
					defaultValue={'test@test.com'}
				/>
				<button
					className='bg-green-500 ml-3 w-32 self-center p-2 rounded-md flex justify-center items-center h-12'
					type='submit'
					disabled={isSubmitting}>
					{isSubmitting ? (
						<SpinnerCircular
							color='#141101'
							size={25}
							className='text-red-700'
						/>
					) : (
						'submit'
					)}
				</button>
			</Form>
		</div>
	);
};

export default Newsletter;
