import { useCallback, useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, setCart } from "../utils/cartSlice";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import UserContext from "../utils/UserContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const onlineStatus = useOnlineStatus();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loggedInUser: username, setLoggedInUser } = useContext(UserContext);

  const items = useSelector((store) => store.cart.items);
  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const token = Cookies.get("token");
  const btnNameReact = "Logout";
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleAuthClick = () => {
    if (token) {
      dispatch(clearCart());
      Cookies.remove("token");
      setLoggedInUser(""); // clear user from context
      navigate("/login");
    }
    //  else {
    //   navigate("/");
    // }
  };

  return (
    <nav className="bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div>
          <Link to="/">
            <img className="logo w-20 text-2xl" src={LOGO_URL} alt="Logo" />
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={handleMenuToggle}>
            <i
              className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}
            ></i>
          </button>
        </div>

        {/* Desktop Nav Items */}
        <ul className="hidden md:flex md:items-center space-x-7 text-lg">
          <li>
            <Link
              to="/"
              className="hover:underline hover:text-orange-500 transition text-xl"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:underline hover:text-orange-500 transition text-xl"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:underline hover:text-orange-500 transition text-xl"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="hover:underline hover:text-orange-500 transition text-xl"
            >
              Cart{totalCount > 0 ? `(${totalCount})` : ""}
            </Link>
          </li>
          <li>
            <Link
              to="/saved-cart"
              className="hover:underline hover:text-orange-500 transition text-xl"
            >
              SavedCart
            </Link>
          </li>

          <li>
            <button
              onClick={handleAuthClick}
              className="bg-orange-400 px-2 py-2 rounded-lg text-white font-bold text-sm"
            >
              {btnNameReact}
            </button>
          </li>

          {/* User Circle */}
          {token && (
            <li className="relative">
              <div
                className="bg-orange-400 text-white font-semibold flex items-center justify-center rounded-full w-10 h-10 cursor-pointer"
                onClick={togglePopup}
              >
                {username.charAt(0).toUpperCase()}
              </div>

              {showPopup && (
                <div className="absolute top-12 left-[45%] transform -translate-x-1/2 text-xs font-semibold p-3 bg-orange-400 text-white rounded shadow-md z-10 transition-all duration-200 ease-in-out">
                  {username}
                </div>
              )}
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="flex flex-col md:hidden space-y-2 mt-2">
          <li className="py-1 px-6">
            <Link
              to="/"
              className="hover:underline hover:text-orange-500 transition"
            >
              Home
            </Link>
          </li>
          <li className="py-1 px-6">
            <Link
              to="/about"
              className="hover:underline hover:text-orange-500 transition"
            >
              About
            </Link>
          </li>
          <li className="py-1 px-6">
            <Link
              to="/contact"
              className="hover:underline hover:text-orange-500 transition"
            >
              Contact
            </Link>
          </li>
          <li className="py-1 px-6">
            <Link
              to="/cart"
              className="hover:underline hover:text-orange-500 transition"
            >
              Cart{totalCount > 0 ? `(${totalCount})` : ""}
            </Link>
          </li>
          <li className="py-1 px-6">
            <Link
              to="/saved-cart"
              className="hover:underline hover:text-orange-500 transition"
            >
              SavedCart
            </Link>
          </li>

          <li className="py-1 px-6">
            <button
              onClick={handleAuthClick}
              className="bg-orange-400 px-4 py-2 rounded-lg text-white font-bold text-sm w-full"
            >
              {btnNameReact}
            </button>
          </li>

          {username && (
            <li className="py-1 px-6">
              <div className="flex gap-3">
                <div
                  className="bg-orange-400 text-white font-semibold flex items-center justify-center rounded-full w-10 h-10 cursor-pointer"
                  onClick={togglePopup}
                >
                  {username.charAt(0).toUpperCase()}
                </div>

                {showPopup && (
                  <div className="px-3 rounded-lg font-bold bg-orange-400 text-white text-xs flex justify-center items-center">
                    {username}
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Header;
