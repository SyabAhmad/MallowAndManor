export default function Philosophy() {
  return (
<section className="py-12 relative overflow-hidden">
       <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
         <div className="relative z-10">
           <span className="text-luxury-green font-bold tracking-[0.3em] uppercase text-[11px] mb-3 block">
             Our Essence
           </span>
           <h2 className="text-3xl font-black text-luxury-dark mb-4 leading-tight">
             The Art of{" "}
             <span className="text-luxury-green italic">Refinement</span>
           </h2>
           <div className="space-y-3 text-gray-500 text-sm leading-relaxed italic">
             <p>
               "We believe that luxury isn't about the price tag; it's about the
               feeling of wearing something that was created with intention."
             </p>
             <p>
               Mallow & Manor was founded on the principle of curated elegance.
               We don't just sell abayas and bangles; we provide the artifacts of
               a life well-lived.
             </p>
           </div>
           <button
             onClick={() => (window.location.href = "/about")}
             className="mt-6 px-8 py-3 bg-luxury-dark text-white font-black rounded-full hover:bg-luxury-gold transition-all duration-300 shadow-lg text-sm"
           >
             Read Our Story
           </button>
         </div>

         <div className="relative">
           <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl relative z-10 border-4 border-white">
             <img
               src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1470&auto=format&fit=crop"
               alt="Luxury Minimal"
               className="w-full h-full object-cover"
             />
           </div>
           {/* Decorative elements */}
           <div className="absolute -top-6 -right-6 w-40 h-40 bg-luxury-light rounded-full -z-0 opacity-50"></div>
           <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-luxury-gold/20 rounded-full -z-0"></div>

           <div className="absolute top-1/2 -right-8 translate-y-[-50%] z-20 hidden lg:block">
             <div className="bg-luxury-dark text-white p-6 rounded-2xl shadow-xl rotate-3 max-w-[160px]">
               <p className="text-xl font-black italic mb-1">100%</p>
               <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                 Original Bespoke Designs
               </p>
             </div>
           </div>
         </div>
       </div>
     </section>
  );
}
