# useNavigation() :

Instead, useNavigation() primarily helps you track whether the page is in the process of navigating to a different page or performing certain actions, such as submitting forms or making API requests.

# redirect :

In action and loader don't use useNavigate instead use redirect, redirect is designed for action and loader.

# loader :

Loader fetches data before rendering components, on the other hand useEffect() initially renders components then fetch data.

## How to fetch dynamic url using loader.

```js
// App.jsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeLayout, Landing, Error, Newsletter, Cocktail } from './pages';

// loader
import { loader as CocktailDetailsLoader } from './pages/Cocktail';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <HomeLayout />,
			children: [
				{
					path: 'newsletter',
					element: <Newsletter />,
				},
				{
					path: 'cocktail/:id',
					element: <Cocktail />,
					loader: CocktailDetailsLoader,
					// useEffect
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
```

```js
// Cocktail.jsx

export const loader = async ({ params }) => {
	// console.log(params);
	const response = await fetch(
		`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`
	);
	const productDetails = await response.json();
	// console.log(productDetails.drinks[0]);
	return productDetails.drinks[0];
};
```

# action :

Action allows us to handle form submissions in simple ways.

```js
// App.jsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeLayout, Landing, Error, Newsletter, Cocktail } from './pages';

// loader
import { loader as CocktailDetailsLoader } from './pages/Cocktail';

// actions
import { action as newsletterAction } from './pages/Newsletter';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <HomeLayout />,
			children: [
				{
					index: true,
					element: <Landing />,
					// useEffect
				},
				{
					path: 'newsletter',
					element: <Newsletter />,
					action: newsletterAction,
				},
				{
					path: 'cocktail/:id',
					element: <Cocktail />,
					loader: CocktailDetailsLoader,
					// useEffect
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
```

```js
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
```
