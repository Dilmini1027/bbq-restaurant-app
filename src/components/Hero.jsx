import { useEffect, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  return (
    <section id="home" className="relative h-screen overflow-hidden mt-20">
      <video
        src="/vedio.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute w-full h-full object-cover"
      >
        <source src="/vedio.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        className={`relative z-20 text-center text-white mt-32 transition-all duration-1000 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-block bg-black/30 backdrop-blur-sm rounded-full p-6 border-2 border-amber-400/50">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-righteous text-amber-400 tracking-wider mb-2">
                THE <span className="text-red-500">BBQ</span> PLACE
              </h2>
              <div className="flex items-center justify-center gap-2 text-amber-300 text-sm font-kalam">
                <span>🔥</span>
                <span>Smoky • Bold • Delicious</span>
                <span>🔥</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-amber-400 text-xl font-kalam font-semibold mb-4">
          Bold Flavors. Good Vibes.
        </p>

        <h1 className="text-5xl md:text-6xl font-righteous leading-tight">
          Made with Love, Served <br /> with a Smile
        </h1>
      </div>

      <div className="absolute inset-0 bg-black/40"></div>
    </section>
  );
}
