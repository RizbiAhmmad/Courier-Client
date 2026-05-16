import React, { useEffect, useState } from "react";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Star, Trash2, CheckCircle, XCircle, Edit, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ManageReviews = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    rating: 5,
    status: "active",
  });
  const [editImageFile, setEditImageFile] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await axiosPublic.get("/reviews");
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axiosPublic.patch(`/reviews/${id}`, { status: newStatus });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `Review ${newStatus}`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        fetchReviews();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const openEditModal = (review) => {
    setSelectedReview(review);
    setFormData({
      name: review.name,
      comment: review.comment,
      rating: review.rating,
      status: review.status,
    });
    setEditImageFile(null);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let imageUrl = selectedReview.image;

      if (editImageFile) {
        const cloudinaryData = new FormData();
        cloudinaryData.append("file", editImageFile);
        cloudinaryData.append("upload_preset", "eCommerce");

        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/dt3bgis04/image/upload",
          { method: "POST", body: cloudinaryData }
        );
        const data = await cloudinaryRes.json();
        imageUrl = data.secure_url;
      }

      const updatedData = {
        ...formData,
        image: imageUrl,
      };

      await axiosPublic.put(`/reviews/${selectedReview._id}`, updatedData);
      Swal.fire("Updated!", "Review updated successfully", "success");
      setIsModalOpen(false);
      fetchReviews();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update review", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/reviews/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Review has been removed.", "success");
            fetchReviews();
          }
        } catch (error) {
          Swal.fire("Error", "Failed to delete review", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Manage Reviews</h2>
          <p className="text-gray-500">Create, edit and manage customer feedback</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/dashboard/addReview")}
            className="flex items-center gap-2 px-6 py-2.5 text-white bg-linear-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg shadow-orange-100 hover:scale-105 transition-all font-bold"
          >
            <Plus size={20} /> Add Review
          </button>
          <div className="bg-orange-50 text-orange-600 px-4 py-2.5 rounded-xl font-bold border border-orange-100">
            Total: {reviews.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${
                review.status === 'active' ? 'bg-green-500 text-white' : 
                review.status === 'pending' ? 'bg-yellow-400 text-black' : 'bg-red-500 text-white'
              }`}>
                {review.status}
              </div>

              <div className="flex items-center gap-4 mb-5">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-4 ring-orange-50 shadow-inner"
                />
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{review.name}</h3>
                  <div className="flex text-yellow-400 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < review.rating ? "currentColor" : "none"}
                        className={i < review.rating ? "" : "text-gray-200"}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-6 line-clamp-3 italic leading-relaxed">
                "{review.comment}"
              </p>

              <div className="flex items-center justify-between pt-5 border-t border-gray-50 mt-auto">
                <div className="flex gap-1">
                  <button
                    onClick={() => handleStatusUpdate(review._id, review.status === 'active' ? 'pending' : 'active')}
                    className={`p-2.5 rounded-xl transition-all ${
                      review.status === 'active' 
                      ? 'text-yellow-600 hover:bg-yellow-50' 
                      : 'text-green-600 hover:bg-green-50'
                    }`}
                    title={review.status === 'active' ? 'Move to Pending' : 'Approve'}
                  >
                    {review.status === 'active' ? <XCircle size={20} /> : <CheckCircle size={20} />}
                  </button>
                  <button
                    onClick={() => openEditModal(review)}
                    className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    title="Edit Review"
                  >
                    <Edit size={20} />
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  title="Delete Review"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-lg relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <XCircle size={24} />
            </button>

            <h3 className="text-2xl font-black text-gray-800 mb-6">Edit Review</h3>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Customer Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Comment</label>
                <textarea
                  rows="3"
                  name="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 outline-none transition-all resize-none"
                  required
                />
              </div>

              <div className="flex justify-between items-end gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className="transition-transform active:scale-90"
                      >
                        <Star
                          size={24}
                          fill={star <= formData.rating ? "#f59e0b" : "none"}
                          className={star <= formData.rating ? "text-yellow-500" : "text-gray-200"}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Customer Image</label>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <label
                    htmlFor="editImage"
                    className="px-4 py-2 text-white bg-orange-500 rounded-xl shadow-md cursor-pointer hover:bg-orange-600 transition-all text-xs font-bold"
                  >
                    Change Photo
                  </label>
                  <span className="text-xs text-gray-500 font-medium truncate max-w-[200px]">
                    {editImageFile ? editImageFile.name : "Keep existing photo"}
                  </span>
                </div>
                <input
                  type="file"
                  id="editImage"
                  accept="image/*"
                  onChange={(e) => setEditImageFile(e.target.files[0])}
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                disabled={updating}
                className="w-full py-4 text-white bg-linear-to-r from-orange-500 to-red-600 rounded-2xl shadow-xl shadow-orange-100 font-black text-lg hover:scale-[1.02] transition-all disabled:opacity-50 mt-4"
              >
                {updating ? "Saving Changes..." : "Update Review"}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {reviews.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100">
          <p className="text-gray-400 text-xl font-medium">No reviews found yet. Start by adding one!</p>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;

