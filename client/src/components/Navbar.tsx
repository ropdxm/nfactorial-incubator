import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav>
			<NavLink to="/" className='nav-a'>NFACRTORIAL-TASK</NavLink>
			<NavLink to="add" className='nav-a'>Add</NavLink>
			<NavLink to="update" className='nav-a'>Update</NavLink>
			<NavLink to="delete" className='nav-a'>Delete</NavLink>
		</nav>
	)
}

export default Navbar;