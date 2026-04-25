import React from "react";
import { motion } from "framer-motion";
import { 
  FiTarget, 
  FiEye, 
  FiShield, 
  FiClock, 
  FiTrendingUp, 
  FiUsers, 
  FiGlobe,
  FiFileText,
  FiTruck,
  FiCheckCircle,
  FiArrowRight,
  FiAnchor
} from "react-icons/fi";
import bgimg from "../../assets/BG-Image.jpg";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-950 font-sans mt-16">
      
      {/* 1. HERO SECTION */}
      <section
        className="relative flex items-center justify-center min-h-[600px] text-white text-center bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        <div className="absolute inset-0 bg-indigo-950/70 backdrop-blur-[2px]"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-6"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            About <span className="text-yellow-400 italic">SNS International</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl opacity-90 leading-relaxed font-medium">
            Bridging global gaps through reliable, practical, and dependable logistics solutions since 2017.
          </p>
        </motion.div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
          >
            <div className="absolute -inset-4 bg-yellow-400/10 rounded-[2rem] transform rotate-3"></div>
            <img
              src="https://img.freepik.com/free-photo/global-logistics-transportation-network_23-2151989598.jpg"
              alt="Who We Are"
              className="relative rounded-[2rem] shadow-2xl z-10 w-full object-cover h-[500px]"
            />
            <div className="absolute -bottom-6 -right-6 z-20 bg-indigo-900 text-white p-8 rounded-3xl shadow-xl hidden md:block border-4 border-white">
              <p className="text-4xl font-black italic">8+</p>
              <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">Years Ops Experience</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-900 rounded-full text-xs font-bold uppercase tracking-widest">
               Who We Are
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-indigo-950 dark:text-white leading-tight">
               Dedicated to Making <span className="text-yellow-500 underline decoration-indigo-200 underline-offset-8">Global Shipping</span> Easier.
            </h2>
            <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
              SNS International is a Bangladesh-based freight forwarding, international courier, and logistics solutions company committed to making global shipping easier, faster, and more dependable.
            </p>
            <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
              Since 2017, we have been helping businesses and individuals manage international shipments with practical logistics support and professional service.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                "International Courier Services", "Air Freight", "Sea Freight", 
                "Import & Export Logistics", "Customs Support", "Shipment Coordination"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-indigo-950 font-bold dark:text-zinc-200 group">
                   <FiCheckCircle className="text-yellow-500 group-hover:scale-125 transition-transform" />
                   {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. OUR STORY */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-24 px-6 border-y border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:w-2/3 space-y-8"
            >
               <h2 className="text-4xl font-extrabold text-indigo-950 dark:text-white italic">Our Story</h2>
               <p className="text-xl text-indigo-900 dark:text-zinc-300 font-medium leading-relaxed">
                  SNS International started its journey in 2017 after identifying a major challenge in the logistics industry.
               </p>
               <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                  Through experience in the freight forwarding sector, we found that many businesses and customers wanted to send or receive goods internationally but faced serious barriers such as complex documentation, tax complications, and licensing requirements.
               </p>
               <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                  <h4 className="font-bold text-indigo-950 dark:text-white mb-6 uppercase tracking-wider text-sm">Common Challenges We Solve:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Complex documentation", "Customs clearance issues", 
                      "Tax and duty complications", "License requirements", 
                      "Government permissions", "Warehousing limitations"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-gray-700 dark:text-zinc-400 font-medium">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                        {item}
                      </div>
                    ))}
                  </div>
               </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/3 bg-indigo-950 text-white p-10 rounded-[3rem] flex flex-col justify-center relative overflow-hidden group shadow-2xl"
            >
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
               <h3 className="text-3xl font-bold mb-6 italic leading-tight">Our Simple Goal:</h3>
               <p className="text-xl text-yellow-400 font-medium leading-relaxed">
                 To make international shipping and trade more accessible, manageable, and business-friendly.
               </p>
               <p className="mt-8 text-zinc-400 text-sm italic">
                  Today, SNS International continues to support clients with practical, solution-driven logistics services designed for real business needs.
               </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <motion.div 
            whileHover={{ y: -10 }}
            className="group relative bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] border border-zinc-100 dark:border-zinc-800 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform">
               <FiTarget size={150} />
            </div>
            <div className="w-16 h-16 bg-yellow-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-yellow-600 mb-8 border border-yellow-100 dark:border-zinc-700">
               <FiTarget size={32} />
            </div>
            <h3 className="text-3xl font-black text-indigo-950 dark:text-white mb-6">Our Mission</h3>
            <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
              To provide reliable, practical, and cost-effective international shipping and logistics solutions that help businesses and individuals trade globally with confidence.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="group relative bg-indigo-950 p-12 rounded-[2.5rem] shadow-2xl transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform">
               <FiEye size={150} className="text-white" />
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-400 mb-8 border border-white/10">
               <FiEye size={32} />
            </div>
            <h3 className="text-3xl font-black text-white mb-6">Our Vision</h3>
            <p className="text-lg text-zinc-300 leading-relaxed">
               To become one of Bangladesh’s most trusted and respected international logistics and freight forwarding companies, known for reliability, service quality, and business-focused solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. CORE VALUES */}
      <section className="bg-zinc-50 dark:bg-zinc-900/30 py-24 px-6 border-y border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-4xl md:text-5xl font-black text-indigo-950 dark:text-white tracking-tight">Our Core Values</h2>
             <p className="text-gray-600 dark:text-zinc-400 font-medium">The principles that guide every shipment we handle.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {[
              { icon: FiShield, title: "Trust", desc: "Honest communication and dependable service." },
              { icon: FiCheckCircle, title: "Commitment", desc: "Dedicated to every client and ogni operational detail." },
              { icon: FiTrendingUp, title: "Efficiency", desc: "Faster, smoother, and more manageable shipping." },
              { icon: FiUsers, title: "Customer Success", desc: "Your success is directly connected to our service." },
              { icon: FiGlobe, title: "Connectivity", desc: "Connecting businesses to smart logistics support." }
            ].map((val, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col items-center text-center group hover:bg-yellow-400 transition-all duration-300 transform"
              >
                <div className="w-14 h-14 bg-indigo-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-indigo-900 dark:text-yellow-500 mb-6 group-hover:bg-white group-hover:text-indigo-900 transition-colors">
                   <val.icon size={28} />
                </div>
                <h4 className="text-lg font-bold text-indigo-950 dark:text-white mb-2 group-hover:text-white transition-colors">{val.title}</h4>
                <p className="text-xs text-gray-500 dark:text-zinc-400 group-hover:text-yellow-100 leading-relaxed font-semibold transition-colors">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. WHY WE EXIST */}
      <section className="py-24 px-6 mb-20">
        <div className="max-w-7xl mx-auto bg-linear-to-br from-indigo-950 to-indigo-900 rounded-[3rem] p-12 md:p-24 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
             <FiGlobe size={600} className="absolute -right-20 -top-20 text-white" />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight italic">Why We Exist</h2>
                <p className="text-xl text-zinc-300 leading-relaxed max-w-xl">
                  SNS International exists to bridge the gap between businesses with great products and the logistics support needed to move them globally.
                </p>
                <p className="text-xl font-bold text-yellow-400">
                  "We are here not only to move shipments, but to help make international business possible."
                </p>
             </div>
             
             <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 space-y-6">
                <p className="text-white font-bold tracking-wider text-sm uppercase">We help you navigate with confidence:</p>
                <div className="space-y-4">
                  {[
                    "Practical shipping guidance", "Service selection support", 
                    "Documentation coordination", "Delivery follow-up", "Import/export assistance"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-white font-medium group cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-indigo-950 group-hover:rotate-12 transition-transform">
                        <FiCheckCircle />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-yellow-400 py-16 px-6 text-center shadow-lg">
        <div className="max-w-4xl mx-auto space-y-8">
           <h2 className="text-4xl font-black text-indigo-950 tracking-tight leading-tight">Ready To Grow Your Business Globally?</h2>
           <p className="text-indigo-900 font-bold opacity-80">Join hundreds of successful businesses who trust SNS International for their logistics needs.</p>
           <div className="flex flex-wrap justify-center gap-4">
              {/* <button className="px-10 py-4 bg-indigo-950 text-white rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105">Get a Free Quote</button> */}
              <button onClick={() => navigate(`/contact`)} className="px-10 py-4 bg-white text-indigo-950 rounded-full font-bold shadow-md hover:bg-zinc-50 transition-all hover:scale-105">Contact Us Now</button>
           </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
