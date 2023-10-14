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
	// const data = Object.fromEntries(formData); // it will covert array of arrays into object directly instead doing it manually as i did below i am using get method of Form to access those values.
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
		<div>
			<Form method='POST'>
				<input name='name' type='text' defaultValue={'mazhar'} />
				<input name='lastName' type='text' defaultValue={'solkar'} />
				<input name='email' type='email' defaultValue={'test@test.com'} />
				<button type='submit' disabled={isSubmitting}>
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

## Why use axios instead of fetch

axios makes our code more clean.

### `Automatic check of http staus code of response`

In Axios, when you make a request, it automatically checks the HTTP status code of the response. If the status code indicates a successful response (e.g., 2xx), Axios considers it a successful request. If the status code indicates an error (e.g., 4xx for client errors or 5xx for server errors), Axios automatically treats it as an error and triggers the catch block.

This means that in Axios, you don't need to explicitly check response.ok or examine the status code yourself. It simplifies the error-handling process and makes the code cleaner.
`Example :`

`axios`

```js
try {
	const response = await axios.get('https://example.com/api/data');
	// Axios handles status code checks automatically
	// If the response status is 2xx, it's considered successful
	console.log(response.data);
} catch (error) {
	// Axios handles errors for status codes outside the 2xx range
	console.error(error);
}
```

`fetch`
In contrast, when using fetch, you must manually check response.ok and handle the status codes yourself:

```js
try {
	const response = await fetch('https://example.com/api/data');
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	const data = await response.json();
	console.log(data);
} catch (error) {
	// Manually handle errors, including status code checks
	console.error(error);
}
```

### `Automatic JSON Parsing`

Automatic JSON Parsing: Axios automatically parses JSON responses, while with fetch, you need to manually call response.json(). This results in cleaner and more concise code.

Axios automatically parses JSON responses, while with fetch, you need to manually call response.json(). This results in cleaner and more concise code.

### `Convenience Methods`

Axios provides convenient methods for common HTTP methods, such as axios.post(), which can make your code more readable and maintainable.

`fetch`

```js
export const action = async ({ request }) => {
	const formData = await request.formData();
	// const data = Object.fromEntries(formData); // it will covert array of arrays into object directly instead doing it manually as i did below i am using get method of Form to access those values.
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
```

`axios`

```js
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		const response = await axios.post(newsletterUrl, data);
		console.log(response);
		toast.success(response.data.msg);
		return redirect('/');
	} catch (error) {
		console.log(error);
		toast.error(error?.response?.data?.msg);
		return error;
	}
};
```

```

```
