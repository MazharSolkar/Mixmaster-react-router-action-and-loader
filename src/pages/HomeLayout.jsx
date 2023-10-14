import { Link, Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';
const HomeLayout = () => {
	const navigation = useNavigation();
	const isLoading = navigation.state === 'loading';

	return (
		<div className='max-w-6xl block m-auto p-4'>
			<Navbar />
			{/* {isLoading ? (
				<h1>Please wait we are loading doing my work</h1>
			) : (
				<Outlet />
			)} */}
			<Outlet />
		</div>
	);
};
export default HomeLayout;
