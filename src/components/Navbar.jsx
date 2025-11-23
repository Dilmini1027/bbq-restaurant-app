import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getCartItemsCount } = useCart();
  
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm py-4 px-4 md:px-10 flex justify-between items-center">
        <Link to="/" className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-600 tracking-wider font-righteous">
            <span className="text-red-600 drop-shadow-lg">Smoky</span>Kitchen
          </h1>
          <div className="text-xs text-gray-600 font-normal tracking-normal font-kalam -mt-1">
            Smoky • Bold • Delicious
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="space-x-8 hidden md:block">
          <Link 
            to="/" 
            className={`font-medium transition-colors duration-200 ${
              isActive('/') ? 'text-amber-600 font-semibold' : 'text-gray-700 hover:text-amber-600'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            className={`font-medium transition-colors duration-200 ${
              isActive('/menu') ? 'text-amber-600 font-semibold' : 'text-gray-700 hover:text-amber-600'
            }`}
          >
            Menu
          </Link>
          <Link 
            to="/contact" 
            className={`font-medium transition-colors duration-200 ${
              isActive('/contact') ? 'text-amber-600 font-semibold' : 'text-gray-700 hover:text-amber-600'
            }`}
          >
            Contact
          </Link>
          <Link 
            to="/reservation" 
            className={`font-medium transition-colors duration-200 ${
              isActive('/reservation') ? 'text-amber-600 font-semibold' : 'text-gray-700 hover:text-amber-600'
            }`}
          >
            Reservation
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H19" />
            </svg>
            {getCartItemsCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {getCartItemsCount()}
              </span>
            )}
          </button>

          {/* Book Now Button */}
          <Link 
            to="/reservation" 
            className="bg-amber-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-700 transition transform hover:-translate-y-0.5 shadow-lg"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-700 hover:text-amber-600 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMobileMenu}></div>
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform">
            <div className="pt-20 pb-4 px-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  onClick={closeMobileMenu}
                  className={`block py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    isActive('/') ? 'bg-amber-100 text-amber-600 font-semibold' : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/menu" 
                  onClick={closeMobileMenu}
                  className={`block py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    isActive('/menu') ? 'bg-amber-100 text-amber-600 font-semibold' : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  Menu
                </Link>
                <Link 
                  to="/contact" 
                  onClick={closeMobileMenu}
                  className={`block py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    isActive('/contact') ? 'bg-amber-100 text-amber-600 font-semibold' : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  Contact
                </Link>
                <Link 
                  to="/reservation" 
                  onClick={closeMobileMenu}
                  className={`block py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    isActive('/reservation') ? 'bg-amber-100 text-amber-600 font-semibold' : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  Reservation
                </Link>
                <div className="pt-4 border-t space-y-3">
                  {/* Mobile Cart Button */}
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      toggleCart();
                    }}
                    className="flex items-center justify-between w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
                    <span>Cart</span>
                    <div className="flex items-center space-x-2">
                      {getCartItemsCount() > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                          {getCartItemsCount()}
                        </span>
                      )}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H19" />
                      </svg>
                    </div>
                  </button>

                  <Link 
                    to="/reservation" 
                    onClick={closeMobileMenu}
                    className="block w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-semibold text-center hover:bg-amber-700 transition"
                  >
                    Book Now
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Cart Component */}
      <Cart />
    </>
  );
}
