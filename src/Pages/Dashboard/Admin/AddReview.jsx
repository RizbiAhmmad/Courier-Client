import React, { useState, useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { Star } from "lucide-react";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    rating: 5,
    status: "active",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle image
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleRating = (rate) => {
    setFormData({ ...formData, rating: rate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      return Swal.fire("Error", "Please select a customer image", "error");
    }

    setLoading(true);

    try {
      // Upload image to Cloudinary
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", imageFile);
      cloudinaryData.append("upload_preset", "eCommerce");

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dt3bgis04/image/upload",
        cloudinaryData,
      );

      const imageUrl = cloudinaryRes.data.secure_url;

      const reviewData = {
        ...formData,
        image: imageUrl,
        email: user?.email, // Admin who added it
        createdAt: new Date(),
      };

      const res = await axiosPublic.post("/reviews", reviewData);

      if (res.data.insertedId) {
        Swal.fire("Success", "Review added successfully!", "success");

        setFormData({
          name: "",
          comment: "",
          rating: 5,
          status: "active",
        });

        setImageFile(null);

        navigate("/dashboard/manageReviews");
      } else {
        Swal.fire("Error", "Review not added", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center">Add New Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Name */}
        <div>
          <label className="block mb-1 font-semibold">Customer Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-1 font-semibold">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRating(star)}
                className="focus:outline-none transition-transform active:scale-90"
              >
                <Star
                  size={32}
                  fill={star <= formData.rating ? "#f59e0b" : "none"}
                  className={star <= formData.rating ? "text-yellow-500" : "text-gray-300"}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block mb-1 font-semibold">Comment</label>
          <textarea
            name="comment"
            required
            rows="4"
            value={formData.comment}
            onChange={handleChange}
            placeholder="What did the customer say?"
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-semibold">Customer Image</label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="image"
              className="px-4 py-2 text-white bg-linear-to-r from-green-400 to-blue-500 rounded-lg shadow cursor-pointer hover:from-green-500 hover:to-blue-600 transition-all duration-200"
            >
              Choose Image
            </label>
            <span className="text-sm text-gray-600">
              {imageFile ? imageFile.name : "No file chosen"}
            </span>
          </div>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            required
            className="hidden"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-orange-500 outline-none"
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-linear-to-r from-yellow-400 to-orange-500 rounded-xl hover:from-yellow-500 hover:to-orange-600 font-bold transition-all disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Review"}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
