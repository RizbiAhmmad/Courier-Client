import React from "react";
import { motion } from "framer-motion";
import { 
  Plane, 
  Ship, 
  Globe, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Package,
  ShieldCheck,
  Briefcase
} from "lucide-react";

const ServicesPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-950 font-sans mt-16 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[600px] flex items-center justify-center text-center px-6 py-20 bg-indigo-950 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <Globe size={600} className="absolute -left-20 -top-20 text-white" />
        </div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-yellow-400 blur-[120px] opacity-20 rounded-full"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl z-10 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-yellow-400 text-sm font-bold tracking-widest uppercase border border-white/10">
            <Package size={16} />
            Our Services
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            Comprehensive <span className="text-yellow-400 italic">Logistics Solutions</span>
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto font-medium">
            SNS International offers dependable international logistics solutions designed to support both commercial and personal shipping needs.
          </p>
        </motion.div>
      </section>

      {/* 2. OVERVIEW TEXT */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-2xl text-indigo-950 dark:text-white font-bold max-w-4xl mx-auto leading-relaxed italic">
            "We focus on making freight forwarding and courier operations more efficient, more accessible, and more customer-friendly."
          </p>
        </div>
      </section>

      {/* 3. DETAILED SERVICES */}
      <div className="space-y-32 py-32 px-6 max-w-7xl mx-auto">
        
        {/* Service 1: Air Freight */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="w-16 h-16 bg-yellow-100 rounded-3xl flex items-center justify-center text-yellow-600 shadow-lg shadow-yellow-100/50">
               <Plane size={32} />
            </div>
            <h2 className="text-4xl font-extrabold text-indigo-950 dark:text-white leading-tight">
               Air Freight: <br/> <span className="text-yellow-500 italic">Fast, Secure & Efficient</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
              Our Air Freight Export and Import services are designed for businesses and individuals who need fast, dependable international cargo movement worldwide.
            </p>
            <div className="space-y-4 pt-4">
              <h4 className="font-bold text-indigo-900 border-l-4 border-yellow-400 pl-4 uppercase tracking-wider text-sm">Services Include:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "International air cargo", "Airport-to-airport", "Door-to-door solutions", 
                  "Urgent & priority shipments", "Cargo booking & coordination", "Documentation support"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 group">
                    <CheckCircle size={18} className="text-indigo-900 group-hover:text-yellow-500 transition-colors" />
                    <span className="text-gray-700 dark:text-zinc-400 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px]"
          >
            <img 
               src="https://img.freepik.com/free-photo/view-huge-cargo-plane-airport_23-2149503460.jpg" 
               alt="Air Freight" 
               className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-1000" 
            />
          </motion.div>
        </section>

        {/* Service 2: Sea Freight */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px] order-2 lg:order-1"
          >
            <img 
               src="https://img.freepik.com/free-photo/industrial-port-container-ship-yard-business-logistical-transportation-import-export-international_42612-45.jpg" 
               alt="Sea Freight" 
               className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-1000" 
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-900 shadow-lg shadow-indigo-100/50">
               <Ship size={32} />
            </div>
            <h2 className="text-4xl font-extrabold text-indigo-950 dark:text-white leading-tight">
               Sea Freight: <br/> <span className="text-yellow-500 italic">Reliable & Cost-Effective</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
               Sea freight is ideal for clients looking for cost-effective options for larger shipments, commercial cargo, and international trade movement across major seaports.
            </p>
            <div className="space-y-4 pt-4">
               <h4 className="font-bold text-indigo-900 border-l-4 border-indigo-400 pl-4 uppercase tracking-wider text-sm">Services Include:</h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Full Container Load (FCL)", "Less than Container Load (LCL)", "Export/Import sea cargo", 
                  "Port-to-port shipping", "Door-to-door support", "Routing & planning"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 group">
                    <CheckCircle size={18} className="text-indigo-900 group-hover:text-yellow-500 transition-colors" />
                    <span className="text-gray-700 dark:text-zinc-400 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Service 3: Global Courier */}
        <section className="bg-zinc-950 text-white rounded-[3.5rem] p-12 lg:p-24 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none group-hover:rotate-6 transition-transform duration-1000">
             <Globe size={600} className="absolute -right-20 -top-20" />
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
                
                <h2 className="text-4xl md:text-5xl font-black italic">Worldwide Express Courier</h2>
                <p className="text-xl text-zinc-400 leading-relaxed">
                  Trusted international courier services through leading global networks like <span className="text-white font-black italic">DHL, FedEx, UPS, TNT, and Aramex.</span>
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  {["DHL", "FedEx", "UPS", "TNT", "Aramex"].map((p) => (
                    <span key={p} className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-lg text-sm font-bold border border-white/10">{p}</span>
                  ))}
                </div>
             </div>
             <div className="grid gap-6">
                {[
                  { title: "Express Logistics", desc: "International express parcel delivery for business and personal." },
                  { title: "Service Optimization", desc: "We help you choose the best courier based on cost and urgency." },
                  { title: "Full Tracking", desc: "Constant updates throughout the shipping process." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-colors">
                     <div className="w-12 h-12 rounded-xl bg-yellow-400 text-indigo-950 flex items-center justify-center shrink-0">
                        <TrendingUp size={24} />
                     </div>
                     <div>
                        <h4 className="font-bold mb-1">{item.title}</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Service 4: Customs Brokerage */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shadow-lg shadow-blue-100/50">
               <FileText size={32} />
            </div>
            <h2 className="text-4xl font-extrabold text-indigo-950 dark:text-white leading-tight">
               Customs Brokerage & <br/> <span className="text-blue-500 italic">Documentation Support</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
               Customs procedures are critical. SNS International provides support to manage customs-related processes effectively and reduce unnecessary delays.
            </p>
            <ul className="grid gap-4">
               {[
                 "Import/Export documentation support", "Customs clearance coordination", 
                 "Shipment paperwork guidance", "Compliance-related assistance", 
                 "Commercial shipment processing", "Duty/Procedural consultation"
               ].map((item, idx) => (
                 <li key={idx} className="flex items-center gap-4 text-gray-700 dark:text-zinc-400 font-bold">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {item}
                 </li>
               ))}
            </ul>
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px]"
          >
            <img 
               src="https://img.freepik.com/free-photo/working-process-factory-logistics_23-2149021422.jpg" 
               alt="Documentation" 
               className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-1000" 
            />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-black/80 to-transparent text-white">
               <p className="text-xl font-bold italic">"Smooth Shipping Starts with Proper Documentation"</p>
            </div>
          </motion.div>
        </section>

        {/* Service 5: Import & Export Support */}
        <section className="bg-indigo-900 rounded-[3.5rem] p-12 lg:p-24 relative overflow-hidden group text-white">
          <div className="absolute bottom-0 right-0 w-full h-full opacity-5 pointer-events-none translate-y-1/2">
             <Globe size={800} className="absolute -right-40 -bottom-40 text-yellow-400" />
          </div>
          <div className="relative z-10 space-y-16">
             <div className="max-w-3xl space-y-6">
                <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">Helping Businesses <br/> <span className="text-yellow-400">Trade Internationally</span></h2>
                <p className="text-xl text-zinc-300 leading-relaxed font-medium">
                   We provide practical logistics support for importers, exporters, e-commerce businesses, and SMEs specialized in navigating global trade challenges.
                </p>
             </div>
             
             <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6 bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10">
                   <h4 className="flex items-center gap-3 text-lg font-bold text-yellow-400 mb-6">
                      <ShieldCheck /> Challenges We Addressing:
                   </h4>
                   <ul className="grid gap-3">
                     {[
                       "Limited logistics knowledge", "Shipping process confusion", 
                       "Documentation gaps", "Delivery restrictions", "Routing issues"
                     ].map((item, idx) => (
                       <li key={idx} className="flex items-center gap-3 text-zinc-300 font-medium italic underline decoration-white/20 underline-offset-4">
                          <CheckCircle size={16} className="text-yellow-400" /> {item}
                       </li>
                     ))}
                   </ul>
                </div>
                <div className="space-y-6">
                   <h4 className="flex items-center gap-3 text-lg font-bold text-white mb-6 underline decoration-yellow-400 decoration-2 underline-offset-8">
                      <Briefcase /> We Fully Support:
                   </h4>
                   <div className="flex flex-wrap gap-3">
                     {["Importers", "Exporters", "E-commerce", "Online Sellers", "Trading Houses", "SMEs", "Entrepreneurs"].map((s) => (
                       <div key={s} className="px-6 py-4 bg-white/10 rounded-2xl border border-white/5 font-bold hover:bg-yellow-400 hover:text-indigo-950 hover:-translate-y-1 transition-all">{s}</div>
                     ))}
                   </div>
                   <p className="text-zinc-400 text-sm italic font-medium pt-8">
                     "Our goal is to make logistics simpler so our clients can focus on growing their business."
                   </p>
                </div>
             </div>
          </div>
        </section>

      </div>

      {/* FINAL CTA SECTION */}
      <section className="bg-yellow-400 py-20 px-6 text-center">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto space-y-10"
         >
            <h2 className="text-4xl md:text-6xl font-black text-indigo-950 tracking-tight leading-tight italic">Ready to move <br/> your cargo?</h2>
            <p className="text-xl text-indigo-900 font-bold opacity-80 leading-relaxed">
              Experience the SNS International standard of reliability and expertise in every shipment.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
               {/* <button className="px-12 py-5 bg-indigo-950 text-white rounded-full font-black text-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all">Get a Quote Now</button> */}
               <button className="px-12 py-5 bg-white text-indigo-950 rounded-full font-black text-lg shadow-md hover:bg-zinc-50 hover:scale-105 active:scale-95 transition-all">Contact Logistics Team</button>
            </div>
         </motion.div>
      </section>

    </div>
  );
};

export default ServicesPage;
