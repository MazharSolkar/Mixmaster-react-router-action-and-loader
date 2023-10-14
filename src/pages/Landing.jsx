import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import CardsContainer from '../components/CardsContainer';

const Landing = () => {
	const [searchValue, setSearchValue] = useState('');
	const [data, setData] = useState(null);

	const fetchData = async () => {
		const response = await fetch(
			`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`
		);
		const jsonData = await response.json();
		setData(jsonData.drinks);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			fetchData();
			// console.log('done');
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [searchValue]);
	return (
		<div>
			<SearchForm onSearchChange={(value) => setSearchValue(value)} />
			<div className='container'>
				<CardsContainer data={data} searchValue={searchValue} />
			</div>
		</div>
	);
};

export default Landing;
