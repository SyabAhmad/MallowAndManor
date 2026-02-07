export default function Contact() {
  const faqs = [
    {
      q: "Where do you deliver?",
      a: "We deliver to all major cities globally. Delivery times vary between 3-7 business days depending on your location.",
    },
    {
      q: "How can I track my order?",
      a: "Once your order is confirmed via WhatsApp, we will provide you with a tracking number and regular updates on your delivery process.",
    },
    {
      q: "What are the shipping costs?",
      a: "Shipping is calculated based on weight and destination. We offer free shipping on all orders over $100.",
    },
    {
      q: "What is your return policy?",
      a: "Due to the nature of luxury products, we only accept returns for damaged items reported within 24 hours of delivery.",
    },
  ];

  return (
    <div className="animate-fade-in py-10 max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-black text-luxury-dark mb-4">
          Get In Touch
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto italic">
          "Luxury is in each detail, and we're here to help you get every detail
          right."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-24">
        {/* Contact Info */}
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-black text-luxury-dark mb-6 border-b-2 border-luxury-green inline-block">
              Contact Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-luxury-light rounded-2xl flex items-center justify-center text-2xl group-hover:bg-luxury-green group-hover:text-white transition-all duration-300">
                  📞
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                    Phone
                  </p>
                  <p className="text-lg font-bold text-luxury-dark">
                    +1 (000) 000-0000
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-luxury-light rounded-2xl flex items-center justify-center text-2xl group-hover:bg-luxury-green group-hover:text-white transition-all duration-300">
                  📧
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                    Email
                  </p>
                  <p className="text-lg font-bold text-luxury-dark">
                    hello@mallowandmanor.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-luxury-light rounded-2xl flex items-center justify-center text-2xl group-hover:bg-luxury-green group-hover:text-white transition-all duration-300">
                  📍
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                    Address
                  </p>
                  <p className="text-lg font-bold text-luxury-dark">
                    Luxury Lane, City, Country
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-4 group cursor-pointer"
                onClick={() => window.open("https://wa.me/YOUR_PHONE_NUMBER")}
              >
                <div className="w-12 h-12 bg-[#25D366] text-white rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-all duration-300">
                  💬
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                    WhatsApp
                  </p>
                  <p className="text-lg font-bold text-[#25D366]">
                    Chat with us now
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-luxury-dark text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-green opacity-20 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-xl font-bold mb-4 relative z-10">
              Business Hours
            </h3>
            <ul className="space-y-2 text-gray-300 relative z-10">
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
          <h2 className="text-2xl font-black text-luxury-dark mb-6 border-b-2 border-luxury-green inline-block">
            Common Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-luxury-light shadow-sm hover:shadow-md transition-all group"
              >
                <h4 className="font-bold text-luxury-dark mb-2 group-hover:text-luxury-green transition-colors">
                  {faq.q}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Map / Places */}
      <div className="bg-luxury-light/30 rounded-[3rem] p-12 text-center border-2 border-luxury-light border-dashed">
        <h2 className="text-3xl font-black text-luxury-dark mb-6 italic">
          Where We Deliver
        </h2>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-luxury-green font-bold text-lg">
          <span className="flex items-center gap-2">🌍 United States</span>
          <span className="flex items-center gap-2">🌏 United Kingdom</span>
          <span className="flex items-center gap-2">🌎 Canada</span>
          <span className="flex items-center gap-2">🌍 Europe</span>
          <span className="flex items-center gap-2">🌏 Australia</span>
          <span className="flex items-center gap-2">🌎 Middle East</span>
        </div>
        <p className="mt-10 text-gray-400 text-sm max-w-md mx-auto italic border-t border-luxury-light pt-6">
          Not in these locations? Send us a DM on WhatsApp, we might still be
          able to reach you!
        </p>
      </div>
    </div>
  );
}
