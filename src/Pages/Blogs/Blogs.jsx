import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import Loading from "../Shared/Loading";
import { GradientText } from "@/components/ui/GradientText";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-950 font-sans mt-16 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[600px] flex items-center justify-center text-center px-6 py-20 bg-indigo-950">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <BookOpen size={500} className="absolute -left-20 -top-20 text-white" />
        </div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-orange-500 blur-[120px] opacity-20 rounded-full"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl z-10 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-yellow-400 text-sm font-bold tracking-widest uppercase border border-white/10">
            Insights & Guides
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            Our <span className="text-yellow-400 italic font-medium">Logistics Blog</span>
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto font-medium">
            Stay updated with the latest trends in global shipping, customs regulations, and international trade strategies.
          </p>
        </motion.div>
      </section>

      {/* 2. BLOG LISTING SECTION */}
      <section className="px-6 py-24 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loading />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <p className="text-xl text-gray-500 font-medium">No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <motion.div
              className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {blogs.map(({ _id, title, description, image, tag }) => (
                <motion.div
                  key={_id}
                  variants={cardVariants}
                  className="group flex flex-col bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="flex flex-col grow p-10">
                    <h3 className="mb-4 text-xl font-bold text-indigo-950 dark:text-white line-clamp-2 min-h-[3.5rem] group-hover:text-amber-500 transition-colors">
                      {title}
                    </h3>
                    <p className="mb-6 text-gray-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3">
                      {description}
                    </p>

                    <div className="mt-auto pt-8 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4">
                      <button
                        onClick={() => navigate(`/blogDetails/${_id}`)}
                        className="flex items-center gap-2 text-sm font-bold text-indigo-900 dark:text-yellow-500 hover:text-orange-500 group/btn transition-colors shrink-0"
                      >
                        Read Article 
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      <div className="text-right">
                        <span className="inline-block px-4 py-1.5 bg-yellow-50 dark:bg-zinc-800 text-yellow-600 dark:text-yellow-500 text-[10px] font-black rounded-lg uppercase tracking-wider truncate max-w-[140px]">
                          {tag}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* FINAL CTA SECTION (Consistency with About/Services) */}
      <section className="bg-yellow-400 py-20 px-6 text-center">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto space-y-8"
         >
            <h2 className="text-4xl md:text-5xl font-black text-indigo-950 tracking-tight leading-tight italic">Want to stay ahead <br/> of the market?</h2>
            <p className="text-lg text-indigo-900 font-bold opacity-80 leading-relaxed">
              Subscribe to SNS International insights and get global shipping updates delivered to your inbox.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
               <button className="px-12 py-5 bg-indigo-950 text-white rounded-full font-black text-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all">Subscribe Now</button>
               <button className="px-12 py-5 bg-white text-indigo-950 rounded-full font-black text-lg shadow-md hover:bg-zinc-50 hover:scale-105 active:scale-95 transition-all" onClick={() => navigate("/contact")}>Contact Us</button>
            </div>
         </motion.div>
      </section>

    </div>
  );
}
