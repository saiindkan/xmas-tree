export default function PromoBar() {
  return (
    <div className="w-full bg-gradient-to-r from-green-900 via-red-700 to-green-900 text-white py-3 px-4 text-center relative flex items-center justify-center overflow-hidden min-h-[60px]">
      {/* Left Ribbon */}
      <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14" viewBox="0 0 48 48" fill="none"><path d="M4 24 Q12 12 24 24 T44 24" stroke="#e3342f" strokeWidth="4" fill="none"/><circle cx="8" cy="24" r="3" fill="#facc15"/><circle cx="40" cy="24" r="3" fill="#facc15"/></svg>
      {/* Sparkles/Ornaments Left */}
      <span className="absolute left-12 top-2 text-yellow-300 text-lg">★</span>
      <span className="absolute left-16 top-6 text-green-300 text-base">●</span>
      {/* Promo Text */}
      <span className="relative z-10 flex items-center gap-2" style={{fontFamily: 'serif'}}>
  <span className="inline-block rotate-[-10deg] text-red-300">🎀</span>
  <span className="text-2xl md:text-3xl font-extrabold tracking-widest drop-shadow-lg text-green-100" style={{letterSpacing: '0.1em'}}>
    Indkan <span className="text-red-200">Xmas Trees</span>
  </span>
  <span className="inline-block rotate-[12deg] text-green-400">🎄</span>
</span>
      {/* Sparkles/Ornaments Right */}
      <span className="absolute right-12 top-2 text-yellow-300 text-lg">★</span>
      <span className="absolute right-16 top-6 text-green-300 text-base">●</span>
      {/* Right Ribbon */}
      <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14" viewBox="0 0 48 48" fill="none"><path d="M44 24 Q36 36 24 24 T4 24" stroke="#e3342f" strokeWidth="4" fill="none"/><circle cx="8" cy="24" r="3" fill="#facc15"/><circle cx="40" cy="24" r="3" fill="#facc15"/></svg>
    </div>
  );
}
