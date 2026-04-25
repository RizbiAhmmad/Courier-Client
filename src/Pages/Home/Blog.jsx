import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { GradientText } from "@/components/ui/GradientText";
import Loading from "../Shared/Loading";

export default function Blog() {
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

  const topBlogs = blogs.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="px-6 py-10 bg-linear-to-br from-yellow-50 via-white to-purple-50 dark:bg-black" id="blogs">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl font-extrabold text-indigo-950 dark:text-white leading-tight">
            <GradientText className="inline-block pb-1">Our Latest News & Insights</GradientText>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-zinc-400">
            Explore our expert perspectives on global logistics, shipping trends, and business growth strategies.
          </p>
        </div>

        {/* Show loading while fetching */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loading />
          </div>
        ) : (
          <>
            <motion.div
              className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {topBlogs.map(({ _id, title, description, image, tag }) => (
                <motion.div
                  key={_id}
                  variants={cardVariants}
                  className="group flex flex-col bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="flex flex-col grow p-6">
                    <h3 className="mb-2 text-xl font-bold text-indigo-950 dark:text-white line-clamp-2 min-h-[3.5rem] group-hover:text-amber-500 transition-colors">
                      {title}
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3">
                      {description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4">
                      <button
                        onClick={() => navigate(`/blogDetails/${_id}`)}
                        className="flex items-center gap-2 text-sm font-bold text-indigo-900 dark:text-yellow-500 hover:text-orange-500 group/btn transition-colors shrink-0"
                      >
                        Read Article 
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-yellow-50 dark:bg-zinc-800 text-yellow-600 dark:text-yellow-500 text-[10px] font-bold rounded-md uppercase tracking-wider truncate max-w-[120px]">
                          {tag}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-16 text-center">
              <motion.button
                onClick={() => navigate("/blogs")}
                className="inline-flex items-center justify-center gap-3 px-10 py-4 text-lg font-bold text-white rounded-full bg-linear-to-r from-yellow-400 to-orange-500 shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 transition-all active:scale-95 group"
              >
                Explore All Blogs
                <div className="p-1 bg-white/20 rounded-full group-hover:bg-white/40 transition-colors">
                  <ArrowRight size={20} />
                </div>
              </motion.button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
