import React, { useEffect, useState, useRef } from "react";
import { useCart } from "../context/CartContext";

// Flying animation component
const FlyingCount = ({ startPos, onComplete }) => {
  const [position, setPosition] = useState(startPos);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Get cart icon position (approximate - top right area)
    const cartIconPos = {
      x: window.innerWidth - 100, // Approximate cart icon position
      y: 80 // Approximate navbar height
    };
    
    // Start animation
    const timer = setTimeout(() => {
      setPosition(cartIconPos);
    }, 50);
    
    // Hide after animation completes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [startPos, onComplete]);
  
  if (!isVisible) return null;
  
  return (
    <div
      className="fixed pointer-events-none z-50 text-amber-600 font-bold text-3xl"
      style={{
        left: position.x,
        top: position.y,
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: 'translate(-50%, -50%)'
      }}
    >
      +1
    </div>
  );
};

export default function Menu() {
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [flyingAnimations, setFlyingAnimations] = useState([]);
  const observerRef = useRef();
  
  // Get cart context
  const { addToCart } = useCart();

  // Function to remove completed flying animations
  const removeFlyingAnimation = (animationId) => {
    setFlyingAnimations(prev => 
      prev.filter(animation => animation.id !== animationId)
    );
  };

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);

    // Intersection Observer for lazy loading animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set(prev).add(entry.target.dataset.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const categories = [
    { id: "all", name: "All Items" },
    { id: "appetizers", name: "Appetizers" },
    { id: "mains", name: "Main Course" },
    { id: "sides", name: "Sides" },
    { id: "desserts", name: "Desserts" },
    { id: "beverages", name: "Beverages" }
  ];

  const menuItems = [
    // Appetizers
    {
      id: 1,
      category: "appetizers",
      name: "BBQ Loaded Nachos",
      description: "Crispy tortilla chips topped with pulled pork, cheese, jalapeños, and our signature BBQ sauce",
      price: "Rs.915",
      image: "./freshly-grilled-beef-vegetable-taco-plate-generative-ai.jpg",
      popular: true,
      spicy: true
    },
    {
      id: 2,
      category: "appetizers",
      name: "Smoked Wings",
      description: "6 pieces of hickory-smoked chicken wings with your choice of sauce",
      price: "Rs.750",
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop",
      spicy: true
    },
    {
      id: 3,
      category: "appetizers",
      name: "Brisket Sliders",
      description: "Three mini brioche buns with tender smoked brisket and coleslaw",
      price: "Rs.800",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      popular: true
    },

    // Main Course
    {
      id: 4,
      category: "mains",
      name: "The Pitmaster Platter",
      description: "Brisket, pulled pork, ribs, and sausage with two sides and cornbread",
      price: "Rs.2990",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
      popular: true,
      signature: true
    },
    {
      id: 5,
      category: "mains",
      name: "Baby Back Ribs",
      description: "Half rack of tender ribs with our signature dry rub and BBQ glaze",
      price: "Rs.2990",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
      popular: true
    },
    {
      id: 6,
      category: "mains",
      name: "Smoked Brisket",
      description: "12-hour smoked beef brisket sliced thick with natural jus",
      price: "Rs.2299",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop",
      signature: true
    },
    {
      id: 7,
      category: "mains",
      name: "Pulled Pork Sandwich",
      description: "Slow-smoked pulled pork on brioche bun with pickles and coleslaw",
      price: "Rs.1399",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
    },

    // Sides
    {
      id: 8,
      category: "sides",
      name: "Mac and Cheese",
      description: "Creamy three-cheese blend with breadcrumb topping",
      price: "Rs.599",
      image: "https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=400&h=300&fit=crop",
      popular: true
    },
    {
      id: 9,
      category: "sides",
      name: "Coleslaw",
      description: "Fresh cabbage slaw with tangy dressing",
      price: "Rs.399",
      image: "./front-view-delicious-vegetable-salad-with-seasonings-fresh-vegetables-grey-table.jpg"
    },
    {
      id: 10,
      category: "sides",
      name: "Baked Beans",
      description: "Slow-cooked beans with bacon and molasses",
      price: "Rs.499",
      image: "./high-angle-chilli-beans-tray.jpg"
    },

    // Desserts
    {
      id: 11,
      category: "desserts",
      name: "Bourbon Pecan Pie",
      description: "Traditional pecan pie with a hint of bourbon",
      price: "Rs.699",
      image: "./delicious-homemade-cottage-cheese-pie-tart-with-fresh-cottage-cheese-honey-top-view.jpg",
      signature: true
    },
    {
      id: 12,
      category: "desserts",
      name: "Smoked Chocolate Cake",
      description: "Rich chocolate cake with a subtle smoky flavor",
      price: "Rs.1799",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    },

    // Beverages
    {
      id: 13,
      category: "beverages",
      name: "Sweet Tea",
      description: "Classic Southern sweet tea",
      price: "Rs.515",
      image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400&h=300&fit=crop"
    },
    {
      id: 14,
      category: "beverages",
      name: "Craft Root Beer",
      description: "House-made root beer with vanilla notes",
      price: "Rs.1399",
      image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop"
    }
  ];

  const filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const MenuItemCard = ({ item, index }) => {
    // Simplified card - remove complex observer for testing
    const [isAdding, setIsAdding] = useState(false);
    
    const handleAddToCart = (event) => {
      if (isAdding) return; // Prevent double clicks
      
      setIsAdding(true);
      
      try {
        addToCart(item);
        
        // Get button position for flying animation
        const buttonRect = event.target.getBoundingClientRect();
        const startPos = {
          x: buttonRect.left + buttonRect.width / 2,
          y: buttonRect.top + buttonRect.height / 2
        };
        
        // Create flying animation
        const animationId = Date.now();
        setFlyingAnimations(prev => [
          ...prev,
          {
            id: animationId,
            startPos: startPos
          }
        ]);
        
        // Brief visual feedback
        setTimeout(() => {
          setIsAdding(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error adding to cart:', error);
        setIsAdding(false);
      }
    };

    return (
      <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop";
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {item.popular && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Popular
              </span>
            )}
            {item.signature && (
              <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Signature
              </span>
            )}
            {item.spicy && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Spicy
              </span>
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-3 right-3">
            <span className="text-white font-righteous text-xl bg-black/50 px-2 py-1 rounded">
              {item.price}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="font-righteous text-xl text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed font-kalam mb-4">
            {item.description}
          </p>
          
          {/* Action Button */}
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              isAdding 
                ? 'bg-green-500 text-white cursor-not-allowed' 
                : 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer hover:shadow-lg'
            }`}
          >
            {isAdding ? '✅ Added!' : '🛒 Add to Order'}
          </button>
        </div>
      </div>
    );
  };

  // SEO optimization through semantic HTML and proper structure
  useEffect(() => {
    // Set document title for SEO
    document.title = "Menu - The BBQ Place | Authentic BBQ Restaurant";
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Explore our delicious BBQ menu featuring smoked brisket, ribs, pulled pork, and signature sides. Order online for pickup or delivery.";
    
    return () => {
      document.title = "The BBQ Place";
    };
  }, []);

  return (
    <>
    <section id="menu" className="py-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div
            className={`text-center mb-12 transition-all duration-1000 
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-4xl md:text-6xl font-righteous text-gray-800 mb-4">
              Our <span className="text-amber-600">Menu</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-kalam">
              Every dish is crafted with passion, smoked to perfection, and served with a smile. 
              Taste the difference that authentic BBQ makes.
            </p>
          </div>

          {/* Category Filter */}
          <div
            className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 shadow-md"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <MenuItemCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Call to Action */}
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-1000
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-gradient-to-r from-amber-600 to-red-600 text-white p-8 rounded-xl shadow-2xl">
              <h3 className="text-3xl font-righteous mb-4">
                Ready to Order?
              </h3>
              <p className="mb-6 font-kalam text-lg">
                Call ahead for faster pickup or order online for delivery!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  Order Online
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:scale-105">
                  Call +94 123 456 78
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Flying Animations */}
      {flyingAnimations.map((animation) => (
        <FlyingCount
          key={animation.id}
          startPos={animation.startPos}
          onComplete={() => removeFlyingAnimation(animation.id)}
        />
      ))}
    </>
  );
}