export default function MapSection() {
  const districts = [
    { name: "Karachi", top: "85%", left: "30%" },
    { name: "Lahore", top: "55%", left: "65%" },
    { name: "Islamabad", top: "40%", left: "62%" },
    { name: "Peshawar", top: "38%", left: "50%" },
    { name: "Quetta", top: "70%", left: "20%" },
    { name: "Multan", top: "65%", left: "52%" },
    { name: "Faisalabad", top: "58%", left: "58%" },
    { name: "Sialkot", top: "48%", left: "67%" },
    { name: "Gujranwala", top: "52%", left: "64%" },
    { name: "Hyderabad", top: "80%", left: "32%" },
    { name: "Bahawalpur", top: "68%", left: "55%" },
    { name: "Sargodha", top: "54%", left: "59%" },
    { name: "Sukkur", top: "75%", left: "35%" },
    { name: "Larkana", top: "78%", left: "28%" },
    { name: "Gwadar", top: "88%", left: "10%" },
  ];

  return (
    <section className="py-24 bg-luxury-dark text-white overflow-hidden rounded-[4rem] mx-4 md:mx-0 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-luxury-gold font-bold tracking-[0.4em] uppercase text-xs mb-6 block">
            Nationwide Reach
          </span>
          <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
            Delivering Elegance <br />
            <span className="text-luxury-gold italic">All Over Pakistan</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 italic leading-relaxed max-w-lg">
            "From the vibrant streets of Karachi to the serene valleys of the
            North, Mallow & Manor ensures your luxury treasures reach you with
            royal care."
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-luxury-gold group-hover:text-luxury-dark transition-all duration-500">
                🚚
              </div>
              <div>
                <h4 className="text-xl font-bold">Swift Logistics</h4>
                <p className="text-gray-500 italic">
                  85+ Districts Covered Weekly
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-luxury-gold group-hover:text-luxury-dark transition-all duration-500">
                📦
              </div>
              <div>
                <h4 className="text-xl font-bold">Secure Packaging</h4>
                <p className="text-gray-500 italic">
                  Double-Jeweled Protective Tucks
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[600px] w-full bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden shadow-inner">
          {/* Stylized Pakistan Map Placeholder */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <span className="text-[20rem] font-black select-none opacity-20 transform -rotate-12">
              PK
            </span>
          </div>

          {/* Delivery Truck Animation Path */}
          <div className="absolute inset-0">
            {/* Animating Truck */}
            <div className="absolute animate-float-map z-30 pointer-events-none">
              <div className="bg-luxury-gold text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 font-bold animate-bounce text-sm">
                🚚 Delivery In Progress
              </div>
            </div>

            {/* Pulse Points for Districts */}
            {districts.map((city, idx) => (
              <div
                key={idx}
                className="absolute group flex flex-col items-center"
                style={{ top: city.top, left: city.left }}
              >
                <div className="w-3 h-3 bg-luxury-gold rounded-full relative">
                  <div className="absolute inset-0 bg-luxury-gold rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                  {city.name}
                </span>
              </div>
            ))}

            {/* Map Grid overlay */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-20 pointer-events-none">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/5"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
