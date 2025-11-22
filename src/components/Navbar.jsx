import React from 'react';

const Navbar = () => {
  return (
    <header className="w-full bg-indigo-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wide">BuzzCart</h1>
        <nav className="hidden md:flex gap-6 text-sm">
          <button className="hover:text-indigo-200 transition">Home</button>
          <button className="hover:text-indigo-200 transition">Shop</button>
          <button className="hover:text-indigo-200 transition">Contact</button>
        </nav>
        <button className="md:hidden p-2 rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Menu">☰</button>
      </div>
    </header>
  );
};

export default Navbar;
