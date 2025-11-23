import { useEffect, useRef, useState } from "react";

export default function Section({ id, title, text }) {
  const ref = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const top = ref.current.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) setShow(true);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`text-center py-24 px-10 transition-all duration-1000 
      ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <h2 className="text-4xl font-serif font-bold mb-5">{title}</h2>
      <p className="text-gray-700 text-lg max-w-3xl mx-auto">{text}</p>
    </section>
  );
}
