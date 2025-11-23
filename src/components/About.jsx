import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  const imageCards = [
    {
      id: 1,
      title: "Master Grillmaster",
      description: "Our head chef with 20+ years of BBQ expertise, bringing authentic flavors to every dish.",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=300&fit=crop",
      alt: "Professional chef grilling"
    },
    {
      id: 2,
      title: "Premium Cuts",
      description: "We source only the finest, locally-raised meats for the most tender and flavorful experience.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
      alt: "Premium raw meat cuts"
    },
    {
      id: 3,
      title: "Signature Smoker",
      description: "Our custom-built smoker creates the perfect low and slow cooking environment for maximum flavor.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      alt: "BBQ smoker with smoke"
    },
    {
      id: 4,
      title: "Family Tradition",
      description: "Three generations of BBQ passion, serving families with warmth and hospitality since 1985.",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop",
      alt: "Family dining together"
    },
    {
      id: 5,
      title: "Fresh Ingredients",
      description: "From our secret spice blends to farm-fresh sides, every ingredient is carefully selected for quality.",
      image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400&h=300&fit=crop",
      alt: "Fresh herbs and spices"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-righteous text-gray-800 mb-4">
            About <span className="text-amber-600">Our Story</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-kalam">
            Discover the passion, tradition, and craftsmanship behind every plate we serve. 
            From our family to yours, we bring you the authentic taste of BBQ excellence.
          </p>
        </div>

        {/* Image Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {imageCards.map((card, index) => (
            <div
              key={card.id}
              className={`group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: visible ? `${index * 150}ms` : "0ms"
              }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-righteous text-xl mb-1">
                    {card.title}
                  </h3>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed font-kalam">
                  {card.description}
                </p>
                
                {/* Decorative element */}
                <div className="mt-4 flex items-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-red-500 rounded-full"></div>
                  <div className="ml-2 text-amber-500 text-sm">🔥</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="bg-amber-600 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-righteous mb-4">
              Ready to Experience Our BBQ?
            </h3>
            <p className="mb-6 font-kalam">
              Join us for an unforgettable dining experience where every bite tells our story.
            </p>
            <Link 
              to="/reservation" 
              className="inline-block bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Make a Reservation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}