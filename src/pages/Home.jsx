import React from 'react';

const products = [
  { id: 1, name: 'Wireless Earbuds', price: '$49', img: 'https://via.placeholder.com/160?text=Earbuds' },
  { id: 2, name: 'Smart Watch', price: '$129', img: 'https://via.placeholder.com/160?text=Watch' },
  { id: 3, name: 'Gaming Mouse', price: '$39', img: 'https://via.placeholder.com/160?text=Mouse' },
  { id: 4, name: 'Portable Speaker', price: '$59', img: 'https://via.placeholder.com/160?text=Speaker' },
  { id: 5, name: 'VR Headset', price: '$299', img: 'https://via.placeholder.com/160?text=VR' },
  { id: 6, name: 'Action Camera', price: '$199', img: 'https://via.placeholder.com/160?text=Camera' }
];

const features = [
  { id: 1, title: 'Fast Delivery', desc: 'Get products to your door quickly.' },
  { id: 2, title: 'Secure Payment', desc: 'Industry-standard payment protection.' },
  { id: 3, title: '24/7 Support', desc: 'We are here whenever you need help.' }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 mb-6">
          Discover Tech That Buzzes
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          Curated gadgets and accessories to level up your daily life. Quality, value, and innovation in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-500 active:bg-indigo-700 transition">Shop Now</button>
          <button className="px-8 py-3 rounded-md bg-white text-indigo-600 font-semibold border border-indigo-200 hover:bg-indigo-50 transition">Learn More</button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 pb-12 grid gap-6 md:grid-cols-3">
        {features.map(f => (
          <div key={f.id} className="rounded-xl border border-indigo-100 bg-white p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">{f.title}</h3>
            <p className="text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Product Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Popular Products</h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View All</button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {products.map(p => (
            <div key={p.id} className="group rounded-xl bg-white border border-indigo-100 shadow-sm hover:shadow-md transition p-4 flex flex-col">
              <div className="aspect-square w-full mb-4 overflow-hidden rounded-md bg-gray-100">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{p.name}</h3>
              <span className="text-indigo-600 font-medium mb-3">{p.price}</span>
              <button className="mt-auto w-full py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 active:bg-indigo-700 transition">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;