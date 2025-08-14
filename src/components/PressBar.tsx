export default function PressBar() {
  return (
    <section className="w-full bg-[#f4f6f4] border-t border-b border-gray-200 py-6 flex flex-col items-center">
      <div className="text-xs text-gray-600 mb-3">As seen in</div>
       <div className="flex gap-x-6 gap-y-2 sm:gap-8 flex-wrap justify-center items-center text-gray-700 opacity-80 px-4">
        <span className="text-base sm:text-lg font-semibold text-center">VOGUE</span>
        <span className="text-base sm:text-lg font-semibold text-center">The Spruce</span>
        <span className="text-base sm:text-lg font-semibold text-center">Wirecutter</span>
        <span className="text-base sm:text-lg font-semibold text-center">Forbes</span>
        <span className="text-base sm:text-lg font-semibold text-center">Better Homes & Gardens</span>
      </div>
    </section>
  );
}
