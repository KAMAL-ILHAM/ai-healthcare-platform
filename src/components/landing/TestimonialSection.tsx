'use client';

import { motion } from 'framer-motion';
import { Quote, Star, MessageCircleHeart } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah",
    role: "Praktisi Kesehatan",
    image: "https://i.pravatar.cc/150?u=1",
    content: "Platform ini sangat membantu pasien mendapatkan edukasi awal yang tepat sebelum mereka memutuskan untuk datang ke fasilitas kesehatan.",
    rating: 5
  },
  {
    id: 2,
    name: "Budi Santoso",
    role: "Pengguna EIOHealth",
    image: "https://i.pravatar.cc/150?u=2",
    content: "Respons AI-nya sangat cepat dan akurat. Saya langsung diarahkan ke apotek terdekat saat mencari obat pereda nyeri malam hari.",
    rating: 5
  },
  {
    id: 3,
    name: "Apt. Linda",
    role: "Apoteker",
    image: "https://i.pravatar.cc/150?u=3",
    content: "Sangat impresif melihat sistem rekomendasi farmasi yang memahami interaksi obat. Sangat aman dan terpercaya.",
    rating: 5
  },
  {
    id: 4,
    name: "Ahmad Rizky",
    role: "Pengguna EIOHealth",
    image: "https://i.pravatar.cc/150?u=4",
    content: "Dashboard analitik kesehatannya sangat rapi. Saya bisa melihat riwayat konsultasi dan skor kesehatan dengan sangat mudah.",
    rating: 4
  }
];

export default function TestimonialSection() {
  return (
    <section className="py-14 bg-white relative overflow-hidden z-10">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[400px] bg-gradient-to-r from-primary/5 via-cyan-400/5 to-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 shadow-sm mb-6"
          >
            <MessageCircleHeart className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-gray-800 tracking-wide font-satoshi uppercase">
              Ulasan Pengguna
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-satoshi tracking-tight"
          >
            Apa Kata Mereka Tentang <br />
            <span className="italic font-light text-gradient-cyan-indigo">EIOHealth.</span>
          </motion.h2>
        </div>

        {/* CAROUSEL MASK CONTAINER */}
        <div className="relative w-full overflow-hidden mask-image-gradient py-10">
          
          {/* Fading edges for infinite scroll illusion */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

          {/* AUTO SLIDE ANIMATION TRACK */}
          <motion.div 
            className="flex gap-8 items-center px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {/* Duplikasi array untuk ilusi looping */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div 
                key={index} 
                className="relative w-[350px] md:w-[400px] shrink-0 group"
              >
                {/* Card Style: White Glass, Soft Shadow, Hover Expand
                  Menggunakan transition-transform untuk efek membesar saat disentuh
                */}
                <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.08)] transform transition-all duration-500 hover:-translate-y-2 cursor-default">
                  
                  {/* Gradient Quote Icon */}
                  <div className="absolute -top-4 -right-2 w-12 h-12 bg-gradient-to-br from-primary to-cyan-400 rounded-full flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <Quote className="w-5 h-5 text-white fill-white" />
                  </div>

                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-gray-600 font-inter leading-relaxed mb-8 text-sm md:text-base">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    {/* Floating Avatar (Keluar dari batas border) */}
                    <div className="w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-100">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 font-satoshi text-sm md:text-base">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500 font-inter">{testimonial.role}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}