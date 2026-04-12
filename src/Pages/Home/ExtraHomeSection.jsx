import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Globe2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  BadgePercent, 
  Users, 
  Plane, 
  Ship, 
  Truck, 
  FileText, 
  ArrowRight
} from 'lucide-react';

const ExtraHomeSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="space-y-12 py-12 overflow-hidden font-sans">
      
      {/* 2) HOME PAGE – ABOUT PREVIEW */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl transform rotate-2"></div>
            <img 
              src="/about-us.png" 
              alt="Logistics Port" 
              className="relative rounded-2xl shadow-2xl object-cover w-full h-[400px] lg:h-[500px]"
            />
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-4xl font-bold text-primary">8+</p>
              <p className="text-sm text-muted-foreground">Years of Excellence</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-zinc-800 text-indigo-900 dark:text-zinc-200 text-sm font-semibold uppercase tracking-wider">
              <Building2 size={16} className="text-yellow-500" />
              About SNS International
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-indigo-950 dark:text-white">
              Your Trusted Partner in <span className="text-yellow-500 italic">Global Logistics</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
              SNS International is a trusted Bangladeshi logistics company specializing in freight forwarding, international courier, cargo movement, and shipping support services.
            </p>
            <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
              With over 8 years of experience, we help businesses and individuals manage global shipping more efficiently through strong logistics coordination and partnerships with leading international courier networks such as DHL, FedEx, UPS, TNT, and Aramex.
            </p>
            <p className="text-lg text-indigo-900 dark:text-zinc-300 font-medium italic border-l-4 border-yellow-500 pl-4 bg-yellow-50/50 dark:bg-zinc-800/30 py-2 rounded-r-lg">
              "At SNS International, we believe shipping is not just about transportation — it is about creating opportunities, solving logistics challenges, and supporting business growth."
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-orange-500/20 transition-all"
            >
              Read More About Us
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 3) HOME PAGE – WHY CHOOSE US */}
      <section className="bg-zinc-50 dark:bg-zinc-800/20 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-indigo-950 dark:text-white">Why Choose SNS International</h2>
            <p className="text-lg text-gray-600 dark:text-zinc-400">Delivering excellence through reliability, network, and expertise.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: Clock, title: "Trusted Experience", desc: "Serving clients since 2017 with practical knowledge of freight forwarding and international logistics." },
              { icon: Globe2, title: "Global Shipping Network", desc: "Reliable connections across Asia, Europe, the Middle East, the USA, and beyond." },
              { icon: BadgePercent, title: "Competitive Rates", desc: "Cost-effective shipping solutions without compromising service quality." },
              { icon: Users, title: "Business-Focused Support", desc: "Helping importers, exporters, e-commerce sellers, and growing businesses ship with confidence." },
              { icon: FileText, title: "Documentation & Customs Assistance", desc: "Support with paperwork, coordination, and customs-related processes." },
              { icon: ShieldCheck, title: "Customer-First Service", desc: "Responsive communication, shipment follow-up, and dedicated service at every stage." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="group p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-yellow-400/50 transition-all shadow-sm hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-indigo-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-indigo-900 dark:text-yellow-500 mb-6 group-hover:scale-110 group-hover:bg-yellow-400 group-hover:text-white transition-all">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-indigo-950 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4) HOME PAGE – SERVICES SECTION */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-indigo-950 dark:text-white">Our Services</h2>
            <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-xl">Comprehensive logistics solutions tailored to your unique requirements.</p>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-orange-500 font-bold text-lg"
          >
            Explore All Services <ArrowRight size={20} />
          </motion.button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {[
            { icon: Plane, title: "Air Freight", desc: "Fast and reliable international air cargo services worldwide." },
            { icon: Ship, title: "Sea Freight", desc: "Cost-effective sea cargo solutions for global commercial trade." },
            { icon: Truck, title: "Global Courier", desc: "Express delivery through DHL, FedEx, UPS, TNT, and Aramex." },
            { icon: FileText, title: "Customs Brokerage", desc: "Professional assistance with clearance and compliance." },
            { icon: Users, title: "Import & Export", desc: "Practical shipping solutions for businesses and entrepreneurs." }
          ].map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="p-6 bg-white border border-zinc-100 dark:bg-zinc-900 rounded-3xl flex flex-col items-center text-center group cursor-pointer shadow-sm hover:shadow-xl hover:border-yellow-400/50 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-indigo-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-yellow-400 transition-all text-indigo-900 group-hover:text-white">
                <item.icon size={32} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-indigo-950 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5) HOME PAGE – GLOBAL COVERAGE */}
      <section className="container mx-auto px-6 mb-8">
        <div className="bg-linear-to-br from-yellow-50 via-white to-purple-50 dark:from-zinc-900 dark:to-zinc-950 border border-yellow-100 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-[3rem] p-12 md:p-20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 dark:opacity-5 pointer-events-none">
            <Globe2 size={500} className="absolute -right-20 -top-20 text-indigo-900 transition-transform duration-1000 group-hover:rotate-12" />
          </div>
          
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic text-indigo-950 dark:text-white">Our Global Reach</h2>
            <p className="text-xl text-gray-600 dark:text-zinc-400 mb-12 leading-relaxed">
              SNS International supports shipments across key international markets with strong logistics connectivity and operational support. We help clients find the most efficient route, service, and shipping solution for each destination.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {[
                "Bangladesh", "Europe", "Middle East", "United States", "China", 
                "Malaysia", "Indonesia", "Hong Kong", "Thailand", "And 100+ more"
              ].map((country, idx) => (
                <span 
                  key={idx} 
                  className="px-6 py-3 bg-white/60 dark:bg-zinc-800/60 hover:bg-white hover:shadow-lg transition-all backdrop-blur-md rounded-full text-indigo-900 dark:text-zinc-300 font-bold border border-indigo-100/50 dark:border-zinc-700 flex items-center gap-2"
                >
                  <MapPin size={16} className="text-yellow-500" />
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ExtraHomeSection;
