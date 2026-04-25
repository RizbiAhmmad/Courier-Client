import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Globe, 
  Users, 
  MessageSquare, 
  DollarSign, 
  Layers, 
  Handshake,
  ShoppingBag,
  Shirt,
  BarChart3,
  Factory,
  Package,
  Home,
  ChevronRight
} from "lucide-react";

const WhyChooseUsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-950 font-sans mt-16 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[600px] flex items-center justify-center text-center px-6 py-20 bg-indigo-950">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <ShieldCheck size={500} className="absolute -left-20 -top-20 text-white" />
        </div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-orange-500 blur-[120px] opacity-20 rounded-full"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl z-10 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-yellow-400 text-sm font-bold tracking-widest uppercase border border-white/10">
            Commitment to Excellence
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
             Why Choose <span className="text-yellow-400 italic font-medium">SNS International?</span>
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto font-medium">
            Choosing the right logistics partner is vital for your success. We combine experience, responsiveness, and practical support to deliver reliability for every client.
          </p>
        </motion.div>
      </section>

      {/* 2. WHY CHOOSE US REASONS */}
      <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { 
                icon: ShieldCheck, title: "Practical Industry Experience", 
                desc: "We understand the real operational challenges of international freight forwarding and customs support." 
              },
              { 
                icon: Globe, title: "Reliable Global Connectivity", 
                desc: "Through trusted networks, we support shipments across multiple international markets with flexible options." 
              },
              { 
                icon: Users, title: "Customer-Focused Solutions", 
                desc: "We provide suitable solutions for each unique shipment, moving away from one-size-fits-all shipping." 
              },
              { 
                icon: MessageSquare, title: "Strong Service Communication", 
                desc: "We prioritize clear communication and active follow-up to keep you informed and confident." 
              },
              { 
                icon: DollarSign, title: "Competitive Shipping Rates", 
                desc: "Practical and cost-effective pricing while maintaining dependable service quality." 
              },
              { 
                icon: Layers, title: "End-to-End Support", 
                desc: "From planning and documentation to coordination and final delivery, we support you at every step." 
              },
              { 
                icon: Handshake, title: "Long-Term Business Mindset", 
                desc: "We believe in building relationships based on trust, consistency, and service excellence.",
                full: true
              }
            ].map((reason, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className={`group bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${reason.full ? "lg:col-span-3 lg:flex items-center gap-10" : ""}`}
              >
                <div className={`w-16 h-16 bg-yellow-400 text-indigo-950 rounded-2xl flex items-center justify-center shrink-0 mb-8 group-hover:rotate-12 transition-transform duration-500 ${reason.full ? "lg:mb-0" : ""}`}>
                  <reason.icon size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-indigo-950 dark:text-white mb-4 italic leading-tight">{reason.title}</h3>
                  <p className="text-gray-600 dark:text-zinc-400 leading-relaxed font-medium">"At SNS International, we don’t just deliver goods — we deliver reliability."</p>
                  <p className="mt-4 text-gray-500 dark:text-zinc-500 text-sm">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. INDUSTRIES WE SERVE */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-50/50 dark:bg-indigo-950/10 skew-x-12 transform origin-top pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-indigo-950 dark:text-white tracking-tight leading-tight">
               Industries <br/> <span className="text-yellow-500">We Fully Serve</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
              SNS International supports a wide range of businesses and clients with flexible logistics and shipping solutions tailored to different industries.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: ShoppingBag, title: "E-commerce Businesses", desc: "Helping online sellers move products internationally." },
              { icon: Shirt, title: "Fashion & Apparel", desc: "Supporting distribution of garments and accessories." },
              { icon: BarChart3, title: "Trading Businesses", desc: "Logistics support for import/export operations." },
              { icon: Factory, title: "Small & Medium Enterprises", desc: "Shipping support for growing global businesses." },
              { icon: Layers, title: "Commercial Importers/Exporters", desc: "Freight and cargo solutions for regular business shipments." },
              { icon: Package, title: "Retail Product Suppliers", desc: "Inventory and order delivery internationally." },
              { icon: Home, title: "Personal Shipment Clients", desc: "Support for documents and personal cargo worldwide." }
            ].map((industry, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="group p-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] shadow-sm hover:border-yellow-400 hover:shadow-xl transition-all duration-300 transform"
              >
                <div className="w-12 h-12 bg-indigo-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-indigo-900 dark:text-yellow-500 mb-6 group-hover:bg-yellow-400 group-hover:text-indigo-950 transition-colors">
                   <industry.icon size={24} />
                </div>
                <h4 className="text-lg font-bold text-indigo-950 dark:text-white mb-3 leading-snug">{industry.title}</h4>
                <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-semibold italic">{industry.desc}</p>
                {/* <div className="mt-6 flex items-center gap-2 text-indigo-900/40 font-bold text-xs uppercase tracking-widest group-hover:text-orange-500">
                   Learn More <ChevronRight size={14} />
                </div> */}
              </motion.div>
            ))}
            
            <motion.div 
              variants={itemVariants}
              className="p-8 bg-linear-to-br from-indigo-950 to-indigo-800 rounded-[2rem] text-white flex flex-col justify-center items-center text-center space-y-4"
            >
               <h4 className="text-xl font-black italic">Ready to Ship?</h4>
               <p className="text-xs text-zinc-300 font-bold opacity-80">Whether small, urgent, or commercial, we are ready to support your needs.</p>
               <button className="px-6 py-3 bg-yellow-400 text-indigo-950 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all w-full">Get Started</button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-yellow-400 py-16 px-6 text-center">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto space-y-6"
         >
            <h2 className="text-4xl font-black text-indigo-950 tracking-tight leading-tight">"At SNS International, we don’t just deliver goods — <span className="italic">we deliver reliability.</span>"</h2>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
               {/* <button className="px-10 py-4 bg-indigo-950 text-white rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105">Request a Quote</button> */}
               <button className="px-10 py-4 bg-white text-indigo-950 rounded-full font-bold shadow-md hover:bg-zinc-50 transition-all hover:scale-105">Contact Us</button>
            </div>
         </motion.div>
      </section>

    </div>
  );
};

export default WhyChooseUsPage;
