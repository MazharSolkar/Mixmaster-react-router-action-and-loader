// import React, { useState, useEffect } from 'react';
// import { useLoaderData, useNavigation, useParams } from 'react-router-dom';

// const Cocktail = () => {
// 	const [details, setDetails] = useState(null);
// 	const { id } = useParams();

// 	const fetchDetails = async () => {
// 		const data = await fetch(
// 			`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
// 		);
// 		const json = await data.json();
// 		console.log(json.drinks[0]);
// 		setDetails(json.drinks[0]);
// 	};

// 	useEffect(() => {
// 		fetchDetails();
// 	}, []);

// 	if (details === null) return <h1>working hard</h1>;
// 	const { strDrink, strDrinkThumb, strAlcoholic, strGlass, strInstructions } =
// 		details;

// 	return (
// 		<div>
// 			<img className='w-96' src={strDrinkThumb} alt='' />
// 			<div className='my-4'>
// 				<h1>
// 					<span className='bg-green-400'>Name: </span>
// 					{strDrink}
// 				</h1>
// 				<p>
// 					<span className='bg-green-400'>Category: </span>
// 					{strAlcoholic}
// 				</p>
// 				<p>
// 					<span className='bg-green-400'>Glass: </span>
// 					{strGlass}
// 				</p>
// 				<p>
// 					<span className='bg-green-400'>Instructions: </span>
// 					{strInstructions}
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

// export default Cocktail;

import { useLoaderData, useNavigation } from 'react-router-dom';

const Cocktail = () => {
	const loaderData = useLoaderData();

	const { strDrink, strDrinkThumb, strAlcoholic, strGlass, strInstructions } =
		loaderData;

	return (
		<div>
			<img className='w-96' src={strDrinkThumb} alt='' />
			<div className='my-4'>
				<h1>
					<span className='bg-green-400'>Name: </span>
					{strDrink}
				</h1>
				<p>
					<span className='bg-green-400'>Category: </span>
					{strAlcoholic}
				</p>
				<p>
					<span className='bg-green-400'>Glass: </span>
					{strGlass}
				</p>
				<p>
					<span className='bg-green-400'>Instructions: </span>
					{strInstructions}
				</p>
			</div>
		</div>
	);
};

export default Cocktail;

export const loader = async ({ params }) => {
	// console.log(params);
	const response = await fetch(
		`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`
	);
	const productDetails = await response.json();
	// console.log(productDetails.drinks[0]);
	return productDetails.drinks[0];
};
