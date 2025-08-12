export default function HeroPremium() {
  return (
    <section
      className="relative w-full h-[440px] md:h-[540px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1400&q=80)',
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <div className="backdrop-blur bg-white/80 rounded-lg shadow-xl px-8 py-10 mx-auto text-center max-w-lg border border-white/60">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-4">
            Discover America's Finest Christmas Trees
          </h1>
          <p className="text-lg md:text-xl text-green-800 mb-6 font-medium">
            Celebrate the Season with Style
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="px-8 py-3 rounded-full bg-green-700 text-white font-semibold text-base shadow hover:bg-green-800 transition"
            >
              Shop The Sale
            </a>
            <a
              href="/deals"
              className="px-8 py-3 rounded-full bg-[#7a2d1b] text-white font-semibold text-base shadow hover:bg-[#9b3e26] transition"
            >
              Shop Clearance
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
