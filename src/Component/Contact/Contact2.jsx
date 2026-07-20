import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react'

const contactCards = [
  {
    icon: Mail,
    title: 'Email Us',
    detail: 'hello@rklgroup.com',
    sub: 'We reply within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    detail: '+91 98765 43210',
    sub: 'Mon - Sat, 10am to 7pm',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    detail: 'Hisar, Haryana, India',
    sub: 'By appointment only',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    detail: '10:00 AM - 7:00 PM',
    sub: 'Sunday closed',
  },
]

const Contact2 = () => {
  return (
    <section className="relative bg-[#0A1F44] py-20 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-[#C9A24B] uppercase tracking-[0.2em] text-sm font-medium">
          Contact RKL Group
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#E5E5E5] mt-4 mb-5">
          We'd Love To Hear From You
        </h2>
        <p className="text-[#C0C0C0] text-base md:text-lg">
          Whether it's a bulk order, a custom gifting solution, or a partnership inquiry — our team is ready to help.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto mb-16">
        {contactCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
            className="group bg-[#0F2A55] border border-[#C9A24B]/20 rounded-2xl p-6 hover:border-[#C9A24B]/50 transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-[#800020]/20 border border-[#C9A24B]/30 flex items-center justify-center mb-5 group-hover:bg-[#C9A24B]/20 transition-colors duration-300">
              <card.icon size={20} className="text-[#C9A24B]" />
            </div>
            <h3 className="text-[#E5E5E5] text-lg font-semibold mb-1">{card.title}</h3>
            <p className="text-[#C9A24B] text-sm md:text-base font-medium mb-1">{card.detail}</p>
            <p className="text-[#C0C0C0] text-xs md:text-sm">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative max-w-6xl mx-auto bg-gradient-to-r from-[#0F2A55] to-[#1a3a6e] border border-[#C9A24B]/20 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-[#800020]/10 rounded-full blur-3xl" />

        <div className="relative text-center md:text-left">
          <h3 className="text-[#E5E5E5] text-2xl md:text-3xl font-semibold mb-2">
            Ready to start your order?
          </h3>
          <p className="text-[#C0C0C0] text-sm md:text-base">
            Get a custom quote for your corporate gifting needs today.
          </p>
        </div>

        <motion.a
          href="mailto:hello@rklgroup.com"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative flex items-center gap-2 bg-[#C9A24B] text-[#0A1F44] font-semibold px-7 py-3.5 rounded-full whitespace-nowrap hover:bg-[#d9b566] transition-colors duration-300"
        >
          Get a Quote
          <ArrowUpRight size={18} />
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Contact2