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
