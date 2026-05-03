export default function Contact() {
  const faqs = [
    {
      q: "Where do you deliver?",
      a: "We provide nationwide delivery across Pakistan, covering all major cities and districts including Karachi, Lahore, Islamabad, and more.",
    },
    {
      q: "How can I track my order?",
      a: "Once your order is confirmed via WhatsApp, we will provide you with a tracking number and regular updates on your delivery process.",
    },
    {
      q: "What are the shipping costs?",
      a: "Shipping is calculated based on destination within Pakistan. We offer free delivery on all orders over Rs. 5,000.",
    },
    {
      q: "What is your return policy?",
      a: "Due to the nature of luxury products, we only accept returns for damaged items reported within 24 hours of delivery.",
    },
  ];

  return (
    <div className="animate-fade-in py-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black text-luxury-dark mb-3">
          Get In Touch
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-sm italic">
          "Luxury is in each detail, and we're here to help you get every detail
          right."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-black text-luxury-dark mb-4 border-b-2 border-luxury-green inline-block">
              Contact Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-luxury-light rounded-xl flex items-center justify-center text-xl group-hover:bg-luxury-green group-hover:text-white transition-all duration-300">
                  📞
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Phone
                  </p>
                  <p className="text-base font-bold text-luxury-dark">
                    +92 344 4778119
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-luxury-light rounded-xl flex items-center justify-center text-xl group-hover:bg-luxury-green group-hover:text-white transition-all duration-300">
                  📧
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Email
                  </p>
                  <p className="text-base font-bold text-luxury-dark">
                    hello@mallowandmanor.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-luxury-light rounded-xl flex items-center justify-center text-xl group-hover:bg-luxury-green group-hover:text-white transition-all duration-300">
                  📍
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Address
                  </p>
                  <p className="text-base font-bold text-luxury-dark">
                    DHA Phase 6, Karachi, Pakistan
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-3 group cursor-pointer"
                onClick={() => {
                  const rawNumber =
                    import.meta.env.VITE_WHATSAPP_NUMBER || "923444778119";
                  const cleanNumber = rawNumber.replace(/\D/g, "");
                  const message = encodeURIComponent(
                    import.meta.env.VITE_WHATSAPP_MESSAGE ||
                      "Hello Mallow & Manor! 👑",
                  );
                  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;
                  const newWindow = window.open(whatsappUrl, "_blank");
                  if (
                    !newWindow ||
                    newWindow.closed ||
                    typeof newWindow.closed === "undefined"
                  ) {
                    window.location.href = whatsappUrl;
                  }
                }}
              >
                <div className="w-10 h-10 bg-[#25D366] text-white rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-all duration-300">
                  💬
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    WhatsApp
                  </p>
                  <p className="text-base font-bold text-[#25D366]">
                    Chat with us now
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-luxury-dark text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-green opacity-20 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-lg font-bold mb-3 relative z-10">
              Business Hours
            </h3>
            <ul className="space-y-1.5 text-gray-300 text-sm relative z-10">
              <li className="flex justify-between">
                <span>Mon - Fri</span>{" "}
                <span className="text-luxury-gold font-bold">
                  9:00 AM - 6:00 PM
                </span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>{" "}
                <span className="text-luxury-gold font-bold">
                  10:00 AM - 4:00 PM
                </span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>{" "}
                <span className="text-luxury-gold font-bold uppercase tracking-widest">
                  Closed
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-xl font-black text-luxury-dark mb-4 border-b-2 border-luxury-green inline-block">
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-luxury-light shadow-sm hover:shadow-md transition-all group"
              >
                <h4 className="font-bold text-luxury-dark mb-1 text-sm group-hover:text-luxury-green transition-colors">
                  {faq.q}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Map / Places */}
      <div className="bg-luxury-dark text-white rounded-2xl p-10 text-center border-4 border-luxury-gold/20 shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-luxury-gold outline-offset-8 -z-0 opacity-5 group-hover:opacity-10 transition-opacity"></div>
        <h2 className="text-2xl font-black mb-6 italic tracking-tighter relative z-10">
          Where We Deliver
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-luxury-gold font-bold text-sm relative z-10">
          <span className="flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            📍 Karachi
          </span>
          <span className="flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            📍 Lahore
          </span>
          <span className="flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            📍 Islamabad
          </span>
          <span className="flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            📍 Faisalabad
          </span>
          <span className="flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            📍 Multan
          </span>
          <span className="flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            📍 Peshawar
          </span>
          <span className="flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            📍 Quetta
          </span>
          <span className="flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            📍 Sialkot
          </span>
        </div>
        <p className="mt-8 text-gray-400 text-sm max-w-2xl mx-auto italic border-t border-white/10 pt-6 relative z-10">
          Not in these cities? Send us a DM on WhatsApp, <br />
          <span className="text-white font-bold">
            We handle deliveries to all districts across Pakistan!
          </span>
        </p>
      </div>
    </div>
  );
}
