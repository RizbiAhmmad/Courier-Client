import React, { useState, useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      return Swal.fire("Error", "Please select an image", "error");
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

      const blogData = {
        ...formData,
        image: imageUrl,
        email: user?.email,
        createdAt: new Date(),
      };

      const res = await axiosPublic.post("/blogs", blogData);

      if (res.data.insertedId) {
        Swal.fire("Success", "Blog added successfully!", "success");

        setFormData({
          title: "",
          description: "",
          tag: "",
          status: "active",
        });

        setImageFile(null);

        navigate("/dashboard/allBlogs");
      } else {
        Swal.fire("Error", "Blog not added", "error");
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
      <h2 className="mb-6 text-2xl font-bold text-center">Add New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Blog Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Blog Title"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>

          <textarea
            name="description"
            required
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Blog description..."
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-semibold">Blog Image</label>

          <div className="flex items-center gap-4">
            {/* Colorful button */}
            <label
              htmlFor="image"
              className="px-4 py-2 text-white bg-linear-to-r from-green-400 to-blue-500 rounded-lg shadow cursor-pointer hover:from-green-500 hover:to-blue-600 transition-all duration-200"
            >
              Choose File
            </label>

            {/* Show selected file name */}
            <span className="text-sm text-gray-600">
              {imageFile ? imageFile.name : "No file chosen"}
            </span>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            required
            className="hidden"
          />
        </div>

        {/* Tag */}
        <div>
          <label className="block mb-1 font-semibold">Tag</label>

          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="SEO / Marketing / Branding"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-semibold">Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-linear-to-r from-yellow-400 to-orange-500 rounded-xl hover:from-yellow-500 hover:to-orange-600"
        >
          {loading ? "Submitting..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
