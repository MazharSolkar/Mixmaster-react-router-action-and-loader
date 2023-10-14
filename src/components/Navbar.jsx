import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [navOpen, setNavOpen] = useState(false);
	return (
		<div className=''>
			<div className='flex flex-col lg:flex-row lg:justify-between mb-12'>
				<div className='flex justify-between items-center'>
					<h1 className='font-bold text-4xl text-green-400 py-4'>MixMaster</h1>
					<h1
						className='text-4xl lg:hidden'
						onClick={() => {
							setNavOpen(!navOpen);
							// console.log('clicked');
						}}>
						🍔
					</h1>
				</div>
				<ul
					className={`flex flex-col lg:flex-row  ${
						navOpen ? 'flex' : 'hidden lg:flex'
					} `}>
					<Link className='p-2 lg:m-2 lg:p-4' to='/'>
						Home
					</Link>
					<li className='p-2 lg:m-2 lg:p-4'>About</li>
					<Link className='p-2 lg:m-2 lg:p-4' to='/newsletter'>
						Newsletter
					</Link>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
