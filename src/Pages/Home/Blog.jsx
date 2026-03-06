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
    <section className="px-6 py-12 bg-linear-to-br from-yellow-50 via-white to-purple-50 dark:bg-black" id="blogs">
      <div className="mx-auto text-center max-w-7xl">
        <h2 className="mb-4 text-4xl font-extrabold text-black dark:text-white leading-tight">
                  <GradientText className="inline-block pb-1">Our Blogs</GradientText>
                </h2>
        <p className="max-w-2xl mx-auto mb-12 text-gray-600 dark:text-white">
          Our engaging articles provide valuable knowledge for professionals and
          enthusiasts alike. Stay informed, stay inspired.
        </p>

        {/* Show loading while fetching */}
        {loading ? (
          <Loading />
        ) : (
          <>
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {topBlogs.map(({ _id, title, description, image, tag }) => (
                <motion.div
                  key={_id}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
                  }}
                  className="flex flex-col overflow-hidden transition bg-white border-2 border-orange-100 shadow-md rounded-xl"
                >
                  <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-48"
                  />
                  <div className="flex flex-col grow p-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">
                      {title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                      {description}
                    </p>

                    <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
                      <span
                        onClick={() => navigate(`/blogDetails/${_id}`)}
                        className="flex items-center gap-1 text-sm font-semibold text-orange-500 cursor-pointer hover:underline"
                      >
                        Learn more <ArrowRight size={14} />
                      </span>
                      <span className="text-xs text-gray-500 text-right max-w-70 truncate">
                        {tag}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10">
              <motion.button
                onClick={() => navigate("/blogs")}
                className="relative px-5 py-2.5 mt-2 text-md font-semibold text-white 
                                   rounded-full overflow-hidden group
                                   bg-linear-to-b from-yellow-400 to-orange-500 
                                   shadow-md transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  See All
                </span>

                {/* Hover shine effect */}
                <span className="absolute inset-0 transition-transform duration-500 -translate-x-full bg-white opacity-20 group-hover:translate-x-0"></span>
              </motion.button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
