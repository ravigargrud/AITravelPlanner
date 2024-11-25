import styles from './NavBar.module.css';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <nav>
                <Link to="/">
                <img src={Logo} alt="" />
                </Link>
                <ul>
                    <li>Destinations</li>
                    <li>Hotels</li>
                    <li>Flights</li>
                    <li>Bookings</li>
                    <li>Login</li>
                    <button>Sign Up</button>
                </ul>
            </nav>
        </>
    );
};

export default NavBar;
