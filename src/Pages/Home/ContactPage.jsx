import React from "react";
import { motion } from "framer-motion";
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiSend, 
  FiClock, 
  FiGlobe,
  FiCheckCircle
} from "react-icons/fi";
import { GradientText } from "@/components/ui/GradientText";

const ContactPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-950 font-sans mt-16 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[500px] flex items-center justify-center text-center px-6 py-20 bg-indigo-950">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <FiGlobe size={500} className="absolute -left-20 -top-20 text-white" />
        </div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-orange-500 blur-[120px] opacity-20 rounded-full"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl z-10 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-yellow-400 text-sm font-bold tracking-widest uppercase border border-white/10">
            24/7 Logistics Support
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
            Get in Touch with <br/> <span className="text-yellow-400 italic">SNS International</span>
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto font-medium">
            Need support with international courier, freight forwarding, import/export logistics, air freight, sea freight, or customs assistance? Our team is ready to help you.
          </p>
        </motion.div>
      </section>

      {/* 2. CONTACT INFO CARDS */}
      <section className="py-24 px-6 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: FiPhone, title: "Phone Support", info: "+880 1234 567899", desc: "Available for urgent queries.",
                color: "bg-yellow-50 text-yellow-600 border-yellow-100"
              },
              { 
                icon: FiMail, title: "Email Inquiry", info: "info@sns-intl.com", desc: "Response within 24 hours.",
                color: "bg-indigo-50 text-indigo-600 border-indigo-100"
              },
              { 
                icon: FiMapPin, title: "Our Location", info: "Nikunja-2, Khilkhet", desc: "Dhaka-1229, Bangladesh.",
                color: "bg-orange-50 text-orange-600 border-orange-100"
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className={`p-10 rounded-[2.5rem] border bg-white dark:bg-zinc-900 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] text-center group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 ${card.color} transition-all duration-500 group-hover:rotate-12`}>
                   <card.icon size={28} />
                </div>
                <h3 className="text-2xl font-black text-indigo-950 dark:text-white mb-2">{card.title}</h3>
                <p className="text-lg font-bold text-gray-800 dark:text-zinc-200 mb-1">{card.info}</p>
                <p className="text-sm text-gray-500 font-medium">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. FORM + MAP SECTION */}
      <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Form Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-indigo-950 dark:text-white leading-tight">Send Us a <span className="text-yellow-500 italic">Message</span></h2>
                <p className="text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Have a specific shipment requirement or need a custom logistics plan? Fill out the form and our experts will contact you shortly.
                </p>
              </div>

              <form className="grid gap-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-indigo-950 dark:text-zinc-400 uppercase tracking-widest pl-1">First Name</label>
                    <input type="text" placeholder="John" className="w-full px-6 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-yellow-400 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-indigo-950 dark:text-zinc-400 uppercase tracking-widest pl-1">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full px-6 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-yellow-400 transition-all font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-indigo-950 dark:text-zinc-400 uppercase tracking-widest pl-1">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-yellow-400 transition-all font-medium" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-indigo-950 dark:text-zinc-400 uppercase tracking-widest pl-1">How can we help?</label>
                  <textarea rows="4" placeholder="Describe your shipment or service needs..." className="w-full px-6 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-yellow-400 transition-all font-medium"></textarea>
                </div>

                <button className="flex items-center justify-center gap-3 w-full py-5 bg-linear-to-r from-yellow-400 to-orange-500 text-indigo-950 font-black text-lg rounded-2xl shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 transition-all active:scale-95 group">
                   <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   Send Shipping Inquiry
                </button>
              </form>
            </motion.div>

            {/* Support Side (Map & Info) */}
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-8"
            >
               <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] border-8 border-white dark:border-zinc-800">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.10175200975934!2d90.41648058811013!3d23.831822637319622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c75b3993dde7%3A0x5350cad0e49d20bf!2sSNS%20International!5e0!3m2!1sen!2sbd!4v1772731715573!5m2!1sen!2sbd"
                    className="w-full h-full grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  ></iframe>
               </div>

               <div className="bg-indigo-950 p-8 md:p-12 rounded-[3rem] text-white space-y-8 group overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                     <FiClock size={120} />
                  </div>
                  
                  <h4 className="text-2xl font-bold italic text-yellow-400">Support Hours</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                       <span className="font-semibold text-zinc-400">Saturday — Thursday</span>
                       <span className="font-bold">09:00 AM — 08:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                       <span className="font-semibold text-zinc-400">Friday</span>
                       <span className="font-bold text-yellow-400">Emergency Support Only</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex items-center gap-4 text-sm font-bold text-indigo-300">
                     <FiCheckCircle className="text-yellow-400" />
                     Real-time shipment tracking support available.
                  </div>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="bg-yellow-400 py-16 px-6 text-center shadow-lg">
        <div className="max-w-4xl mx-auto space-y-6">
           <h2 className="text-4xl font-black text-indigo-950 tracking-tight leading-tight italic">Global Shipping. Simplified.</h2>
           <p className="text-indigo-900 font-bold opacity-80 leading-relaxed max-w-2xl mx-auto">
             Experience the peace of mind that comes with a dedicated logistics partner in Bangladesh.
           </p>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
