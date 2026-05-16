import React, { useState, useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    comment: "",
    rating: 5,
    status: "pending", // Default to pending for admin approval
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleRating = (rate) => {
    setFormData({ ...formData, rating: rate });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let imageUrl = user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png";

      if (imageFile) {
        const cloudinaryData = new FormData();
        cloudinaryData.append("file", imageFile);
        cloudinaryData.append("upload_preset", "eCommerce");

        const cloudinaryRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dt3bgis04/image/upload",
          cloudinaryData,
        );
        imageUrl = cloudinaryRes.data.secure_url;
      }

      const reviewData = {
        ...formData,
        image: imageUrl,
        name: user?.displayName || "Anonymous User",
        email: user?.email,
        createdAt: new Date(),
      };

      const res = await axiosPublic.post("/reviews", reviewData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Your review has been submitted for approval.",
          confirmButtonColor: "#f59e0b",
        });
        navigate("/dashboard/user/my-reviews"); // Hypothetical route
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to submit review", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-gray-100"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-linear-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
          Share Your Experience
        </h2>
        <p className="text-gray-500 mt-2">Your feedback helps us serve you better!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Section */}
        <div className="flex flex-col items-center gap-3">
          <label className="text-lg font-semibold text-gray-700">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRating(star)}
                className={`p-1 transition-all duration-200 hover:scale-125 ${
                  formData.rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                <Star size={40} fill={formData.rating >= star ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Your Review</label>
          <textarea
            required
            rows="4"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="Tell us what you loved or how we can improve..."
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Photo (Optional)</label>
          <div className="flex items-center gap-6 p-4 bg-orange-50 rounded-2xl border-2 border-dashed border-orange-200">
            <div className="flex-1">
              <label 
                htmlFor="image" 
                className="px-6 py-2.5 bg-white text-orange-600 font-semibold rounded-xl shadow-sm border border-orange-100 cursor-pointer hover:bg-orange-600 hover:text-white transition-all inline-block"
              >
                {imageFile ? "Change Photo" : "Upload Photo"}
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-2">JPEG, PNG up to 5MB</p>
            </div>
            
            {(previewUrl || user?.photoURL) && (
              <div className="relative">
                <img
                  src={previewUrl || user?.photoURL}
                  alt="Preview"
                  className="w-20 h-20 rounded-xl object-cover ring-4 ring-white shadow-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-linear-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </div>
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default AddReview;
