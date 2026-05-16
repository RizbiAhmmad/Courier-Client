import React, { useEffect, useState } from "react";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import { Star, Quote } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const ReviewSlider = () => {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchActiveReviews = async () => {
      try {
        const res = await axiosPublic.get("/reviews?status=active");
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchActiveReviews();
  }, [axiosPublic]);

  if (reviews.length === 0) return null;

  return (
    <section className="py-20 bg-linear-to-b from-white to-orange-50/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            What Our <span className="text-orange-500">Clients</span> Say
          </h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Hear from thousands of happy customers 
            who trust us with their global shipments every day.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={reviews.length > 1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16 !px-4"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-orange-100/50 border border-orange-50 relative h-full flex flex-col transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-6 right-8 text-orange-100">
                  <Quote size={60} fill="currentColor" />
                </div>
                
                <div className="flex text-yellow-400 mb-6 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < review.rating ? "currentColor" : "none"}
                      className={i < review.rating ? "" : "text-gray-200"}
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-8 flex-grow relative z-10 italic">
                  "{review.comment}"
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-50 relative z-10">
                  <div className="relative">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-orange-50"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-1 rounded-full shadow-lg">
                      <CheckCircle size={12} fill="currentColor" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                    <p className="text-orange-500 text-sm font-medium">Verified Customer</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

// Small helper for the checkmark icon
const CheckCircle = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default ReviewSlider;
