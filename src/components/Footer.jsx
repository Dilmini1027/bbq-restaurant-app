import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center text-xs text-gray-500 py-6 border-t border-indigo-100 bg-white/70 backdrop-blur">
      © {new Date().getFullYear()} Smoky Kitchen. All rights reserved.
    </footer>
  );
};

export default Footer;
