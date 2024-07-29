import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './custom-navbar.css';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Cart from '../screens/Cart';
import Modal from '../Modal';
import { useCart , useDispatchCart} from '../components/ContextReducer'; // Update import path if needed
 // Update import path if needed

const Navbar = () => {
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("authToken");
    let data = useCart(); // Get cart items from context
    const dispatch = useDispatchCart();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        dispatch({ type: "DROP" });
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <Link className="navbar-brand" to="/">
                <span style={{ marginRight: '.5rem' }}>FoodyDaddy</span>
                <i className="fas fa-hamburger"></i>
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <i className="fas fa-home"></i>
                            <span className="d-lg-none ms-2">Home</span>
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    {isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span className="d-lg-none ms-2">Logout</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Button
                                    variant="link"
                                    className="position-relative"
                                    onClick={() => setCartView(true)}
                                >
                                    <i className={`fas fa-shopping-cart fa-lg cart-icon ${data.length > 0 ? 'cart-yellow' : ''}`}></i>
                                    <Badge pill className="custom-badge position-absolute top-0 start-100 translate-middle">
                                        {data.length}
                                    </Badge>

                                </Button>
                                {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
                                <span className="d-lg-none ms-2">Cart</span>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    <i className="fas fa-sign-in-alt"></i>
                                    <span className="d-lg-none ms-2">Login</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/createuser">
                                    <i className="fas fa-user-plus"></i>
                                    <span className="d-lg-none ms-2">Sign Up</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
