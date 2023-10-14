import React from 'react';

const SearchForm = ({ onSearchChange }) => {
	const handleInputChange = (e) => {
		const value = e.target.value;
		onSearchChange(value); // Call the callback to update the searchValue in Landing.jsx
	};

	return (
		<div className='flex justify-center mb-12'>
			<input
				className='border-2 py-2 px-4'
				type='text'
				onChange={handleInputChange}
			/>
			<button className='bg-green-500 text-white py-2 px-4'>Search</button>
		</div>
	);
};

export default SearchForm;
