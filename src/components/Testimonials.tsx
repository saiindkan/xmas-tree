export default function Testimonials() {
  return (
    <section className="w-full bg-[#f8faf9] border-t border-b border-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-green-900 mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="text-lg font-semibold text-green-900 mb-2">“Absolutely stunning tree!”</div>
            <div className="text-gray-700 mb-3">The quality is top-notch and setup was a breeze. Our family loves it!</div>
            <div className="font-bold text-green-800">— Amanda L.</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="text-lg font-semibold text-green-900 mb-2">“Best investment for Christmas”</div>
            <div className="text-gray-700 mb-3">It looks so real and the lights are beautiful. Shipping was super fast!</div>
            <div className="font-bold text-green-800">— John S.</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="text-lg font-semibold text-green-900 mb-2">“Gorgeous and easy to assemble”</div>
            <div className="text-gray-700 mb-3">The tree exceeded my expectations. Will buy again for gifts!</div>
            <div className="font-bold text-green-800">— Priya R.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
