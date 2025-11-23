import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function OrderPage() {
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [orderType, setOrderType] = useState('dine-in');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    // Get item data from navigation state or URL params
    if (location.state && location.state.item) {
      setItem(location.state.item);
    }

    // SEO optimization
    document.title = "Order - The BBQ Place | Place Your Order";
  }, [location]);

  const addons = [
    { id: 'extra-sauce', name: 'Extra BBQ Sauce', price: 50 },
    { id: 'extra-meat', name: 'Extra Meat', price: 200 },
    { id: 'cheese', name: 'Add Cheese', price: 80 },
    { id: 'bacon', name: 'Add Bacon', price: 150 },
    { id: 'pickles', name: 'Extra Pickles', price: 30 },
    { id: 'onions', name: 'Grilled Onions', price: 60 }
  ];

  const handleAddonChange = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    if (!item) return 0;
    const itemPrice = parseInt(item.price.replace('Rs.', ''));
    const addonTotal = selectedAddons.reduce((total, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return total + (addon ? addon.price : 0);
    }, 0);
    return (itemPrice + addonTotal) * quantity;
  };

  const handleAddToCart = () => {
    setShowPayment(true);
  };

  if (!item) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-righteous text-gray-800 mb-4">Item Not Found</h1>
          <Link to="/menu" className="bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 transition">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Back Button */}
        <Link 
          to="/menu" 
          className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-8 font-semibold transition-colors"
        >
          ← Back to Menu
        </Link>

        {!showPayment ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Item Image and Details */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                <div className="relative h-96">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop";
                    }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.popular && (
                      <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                        Popular
                      </span>
                    )}
                    {item.signature && (
                      <span className="bg-amber-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                        Signature
                      </span>
                    )}
                    {item.spicy && (
                      <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                        Spicy 🌶️
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <span className="text-white font-righteous text-2xl bg-black/70 px-4 py-2 rounded-full">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Item Info */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-righteous text-gray-800 mb-4">{item.name}</h1>
                <p className="text-gray-600 font-kalam text-lg mb-6">{item.description}</p>
                
                {/* Nutritional Info */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-amber-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">🔥</div>
                    <div className="text-sm text-gray-600">Wood Fired</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">⏰</div>
                    <div className="text-sm text-gray-600">15-20 mins</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Customization */}
            <div className="space-y-6">
              {/* Order Type */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-righteous text-gray-800 mb-4">Order Type</h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'dine-in', label: 'Dine In', icon: '🍽️' },
                    { id: 'takeout', label: 'Takeout', icon: '🥡' },
                    { id: 'delivery', label: 'Delivery', icon: '🚚' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setOrderType(type.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        orderType === type.id 
                          ? 'border-amber-500 bg-amber-50 text-amber-700' 
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-semibold">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-righteous text-gray-800 mb-4">Quantity</h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-12 h-12 rounded-full font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-800 w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-amber-600 hover:bg-amber-700 text-white w-12 h-12 rounded-full font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add-ons */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-righteous text-gray-800 mb-4">Add-ons</h2>
                <div className="space-y-3">
                  {addons.map((addon) => (
                    <label key={addon.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-amber-50 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedAddons.includes(addon.id)}
                          onChange={() => handleAddonChange(addon.id)}
                          className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                        />
                        <span className="font-medium text-gray-800">{addon.name}</span>
                      </div>
                      <span className="text-amber-600 font-semibold">+Rs.{addon.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-righteous text-gray-800 mb-4">Special Instructions</h2>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special requests or dietary requirements..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-kalam"
                  rows="3"
                />
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-r from-amber-600 to-red-600 rounded-2xl shadow-xl p-6 text-white">
                <h2 className="text-2xl font-righteous mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>{item.name} x {quantity}</span>
                    <span>Rs.{parseInt(item.price.replace('Rs.', '')) * quantity}</span>
                  </div>
                  {selectedAddons.map(addonId => {
                    const addon = addons.find(a => a.id === addonId);
                    return (
                      <div key={addonId} className="flex justify-between text-sm">
                        <span>{addon.name} x {quantity}</span>
                        <span>Rs.{addon.price * quantity}</span>
                      </div>
                    );
                  })}
                  <hr className="border-white/30" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>Rs.{calculateTotal()}</span>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-white text-amber-600 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  Add to Cart & Proceed to Payment 🛒
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Payment Section */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h1 className="text-3xl font-righteous text-gray-800 mb-6 text-center">Payment</h1>
              
              {/* Order Review */}
              <div className="bg-amber-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-righteous text-gray-800 mb-3">Your Order</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                    <p className="text-sm text-gray-600">{orderType.charAt(0).toUpperCase() + orderType.slice(1)}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-amber-600">Rs.{calculateTotal()}</div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-xl font-righteous text-gray-800 mb-3">Payment Method</h3>
                <div className="space-y-3">
                  {[
                    { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                    { id: 'upi', label: 'UPI Payment', icon: '📱' },
                    { id: 'cash', label: 'Cash on Delivery', icon: '💵' }
                  ].map((method) => (
                    <label key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-amber-50">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-amber-600"
                      />
                      <span className="text-2xl">{method.icon}</span>
                      <span className="font-medium">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Form */}
              {paymentMethod === 'card' && (
                <div className="mb-6 p-4 border border-amber-200 rounded-lg bg-amber-50">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                      <input type="text" placeholder="John Doe" className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <input type="text" placeholder="123" className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500" />
                    </div>
                  </div>
                </div>
              )}

              {/* Place Order Button */}
              <button
                className="w-full bg-gradient-to-r from-amber-600 to-red-600 text-white py-4 rounded-lg font-bold text-lg hover:from-amber-700 hover:to-red-700 transition-all transform hover:scale-105"
              >
                Place Order - Rs.{calculateTotal()} 🔥
              </button>

              <div className="text-center mt-4">
                <button
                  onClick={() => setShowPayment(false)}
                  className="text-amber-600 hover:text-amber-700 font-semibold"
                >
                  ← Back to Order Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}