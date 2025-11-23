import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import Reservation from './pages/Reservation';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
