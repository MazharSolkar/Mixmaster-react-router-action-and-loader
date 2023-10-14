import React from 'react';

const Card = ({ details }) => {
	// console.log(details);
	const { idDrink, strDrink, strDrinkThumb } = details;
	return (
		<div className='mb-8'>
			<div className='w-[100px]'>
				<img className='' src={strDrinkThumb} alt='' />
			</div>
			<h1 className='text-3xl'>{strDrink}</h1>
		</div>
	);
};

export default Card;
