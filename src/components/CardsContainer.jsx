import React from 'react';
import { Link, useNavigation } from 'react-router-dom';
import Card from './Card';

const CardsContainer = ({ data, searchValue }) => {
	// console.log(data);

	if (data === null && searchValue != '') return <h1>Not found ...</h1>;
	if (data === null) return <h1>loading...</h1>;

	return (
		<>
			{data.map((item) => (
				<Link to={`/cocktail/${item.idDrink}`} key={item.idDrink}>
					<Card details={item} />
				</Link>
			))}
		</>
	);
};

export default CardsContainer;
