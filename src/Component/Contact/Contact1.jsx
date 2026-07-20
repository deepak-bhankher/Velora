import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const Contact1 = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <section className="relative bg-[#0A1F44] py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Gold accent glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A24B]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#800020]/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left - Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col justify-center"
        >
          <span className="text-[#C9A24B] uppercase tracking-[0.2em] text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#E5E5E5] leading-tight mb-6">
            Let's Build Something
            <span className="block text-[#C9A24B]">Memorable Together</span>
          </h2>
          <p className="text-[#C0C0C0] text-base md:text-lg mb-10 max-w-md">
            Reach out for corporate gifting solutions, bulk orders, or custom branded merchandise tailored to your business.
          </p>

          <div className="space-y-6">
            {[
              { icon: Mail, label: 'Email', value: 'hello@rklgroup.com' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
              { icon: MapPin, label: 'Location', value: 'Hisar, Haryana, India' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-full bg-[#800020]/20 border border-[#C9A24B]/30 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-[#C9A24B]" />
                </div>
                <div>
                  <p className="text-[#C0C0C0] text-xs uppercase tracking-wider">{item.label}</p>
                  <p className="text-[#E5E5E5] text-sm md:text-base">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="bg-[#0F2A55] border border-[#C9A24B]/20 rounded-2xl p-6 md:p-10 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-[#0A1F44] border border-[#C9A24B]/20 rounded-lg px-4 py-3 text-[#E5E5E5] placeholder-[#C0C0C0]/40 focus:outline-none focus:border-[#C9A24B]/60 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full bg-[#0A1F44] border border-[#C9A24B]/20 rounded-lg px-4 py-3 text-[#E5E5E5] placeholder-[#C0C0C0]/40 focus:outline-none focus:border-[#C9A24B]/60 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your requirement"
                className="w-full bg-[#0A1F44] border border-[#C9A24B]/20 rounded-lg px-4 py-3 text-[#E5E5E5] placeholder-[#C0C0C0]/40 focus:outline-none focus:border-[#C9A24B]/60 transition-colors duration-300 resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center cursor-pointer justify-center gap-2 bg-[#C9A24B] text-[#0A1F44] font-semibold py-3.5 rounded-lg mt-2 hover:bg-[#d9b566] transition-colors duration-300"
            >
              Send Message
              <Send size={16} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact1