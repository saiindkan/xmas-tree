export default function PressBar() {
  return (
    <section className="w-full bg-[#f4f6f4] border-t border-b border-gray-200 py-6 flex flex-col items-center">
      <div className="text-xs text-gray-600 mb-3">As seen in</div>
      <div className="flex gap-8 flex-wrap justify-center items-center text-gray-700 opacity-80">
        <span className="text-lg font-semibold">VOGUE</span>
        <span className="text-lg font-semibold">The Spruce</span>
        <span className="text-lg font-semibold">Wirecutter</span>
        <span className="text-lg font-semibold">Forbes</span>
        <span className="text-lg font-semibold">Better Homes & Gardens</span>
      </div>
    </section>
  );
}
