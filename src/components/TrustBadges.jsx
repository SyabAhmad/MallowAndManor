export default function TrustBadges() {
  const badges = [
    {
      icon: "✨",
      title: "Artisanal Crafted",
      desc: "Every piece is personally selected for its exceptional craftsmanship.",
    },
    {
      icon: "🚚",
      title: "Nationwide Delivery",
      desc: "Providing swift and secure delivery to every district across Pakistan.",
    },
    {
      icon: "💬",
      title: "Personal Concierge",
      desc: "Real-time support and order tracking via our WhatsApp dedicated line.",
    },
  ];

  return (
<section className="py-10 bg-luxury-light/50 border-y border-luxury-light grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
       {badges.map((badge, i) => (
         <div key={i} className="text-center group">
           <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300 inline-block">
             {badge.icon}
           </div>
           <h4 className="text-base font-black text-luxury-dark mb-2 uppercase tracking-widest">
             {badge.title}
           </h4>
           <p className="text-gray-500 max-w-xs mx-auto text-sm italic leading-relaxed">
             {badge.desc}
           </p>
         </div>
       ))}
     </section>
  );
}
