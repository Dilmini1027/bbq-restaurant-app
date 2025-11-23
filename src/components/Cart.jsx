import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { 
    cartItems, 
    isCartOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    clearCart
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleCart}
      ></div>

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-righteous text-gray-800">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-righteous text-gray-800 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 font-kalam mb-6">Add some delicious BBQ to get started!</p>
                <Link 
                  to="/menu"
                  onClick={toggleCart}
                  className="bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 transition"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-righteous text-gray-800 truncate">{item.name}</h4>
                        <p className="text-sm text-gray-600 font-kalam truncate">{item.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-amber-600 font-semibold">{item.price}</span>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-full font-bold text-sm"
                            >
                              -
                            </button>
                            <span className="font-bold text-gray-800 w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="bg-amber-600 hover:bg-amber-700 text-white w-8 h-8 rounded-full font-bold text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-red-600 hover:text-red-700 text-sm font-semibold mt-2"
                        >
                          Remove from cart
                        </button>
                      </div>
                    </div>
                    
                    {/* Item Total */}
                    <div className="mt-3 pt-3 border-t border-amber-300 text-right">
                      <span className="text-lg font-bold text-gray-800">
                        Subtotal: Rs.{parseInt(item.price.replace('Rs.', '')) * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 bg-gray-50">
              {/* Total */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-righteous text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-amber-600">Rs.{getCartTotal()}</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  to="/order"
                  onClick={toggleCart}
                  state={{ cartItems }}
                  className="w-full bg-gradient-to-r from-amber-600 to-red-600 text-white py-3 rounded-lg font-bold text-center block hover:from-amber-700 hover:to-red-700 transition"
                >
                  Proceed to Checkout 🔥
                </Link>
                
                <div className="flex space-x-2">
                  <Link
                    to="/menu"
                    onClick={toggleCart}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold text-center hover:bg-gray-300 transition"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}