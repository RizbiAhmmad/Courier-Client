import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const AllBlogs = () => {
  const axiosPublic = useAxiosPublic();
  const isDemo = import.meta.env.VITE_DEMO_MODE === "true";

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res.data;
    },
  });

  const navigate = useNavigate();
  const [localBlogs, setLocalBlogs] = useState([]);
  const currentData = isDemo && localBlogs.length ? localBlogs : blogs;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    status: "active",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentBlogs = currentData.slice(indexOfFirst, indexOfLast);

  const openEditModal = (blog) => {
    setSelectedBlog(blog);

    setFormData({
      title: blog.title,
      tag: blog.tag,
      status: blog.status,
    });

    setIsModalOpen(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (isDemo) {
        const updated = currentData.map((blog) =>
          blog._id === selectedBlog._id ? { ...blog, ...formData } : blog,
        );

        setLocalBlogs(updated);

        Swal.fire("Demo Mode", "Blog updated temporarily!", "info");
        setIsModalOpen(false);
        return;
      }

      await axiosPublic.put(`/blogs/${selectedBlog._id}`, formData);

      Swal.fire("Updated!", "Blog updated successfully", "success");

      setIsModalOpen(false);
      refetch();
    } catch {
      Swal.fire("Error", "Failed to update blog", "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This blog will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (isDemo) {
          const filtered = currentData.filter((b) => b._id !== id);
          setLocalBlogs(filtered);
          Swal.fire("Demo Mode", "Blog deleted temporarily!", "info");
          return;
        }

        const res = await axiosPublic.delete(`/blogs/${id}`);

        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Blog removed", "success");
        }
      }
    });
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h2 className="pb-4 mb-4 text-4xl font-bold text-center border-b-2">
        All Blogs
      </h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/dashboard/addBlog")}
          className="flex items-center gap-2 px-4 py-2 text-white bg-linear-to-r from-yellow-400 to-orange-500 rounded-xl"
        >
          <FaPlus /> Add Blog
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full text-sm text-left">
          <thead className="tracking-wider text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Tag</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {currentBlogs.map((blog, index) => (
              <tr key={blog._id}>
                <td className="px-6 py-4">{indexOfFirst + index + 1}</td>

                <td className="px-6 py-4 font-semibold">
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4 font-semibold">{blog.title}</td>

                <td className="px-6 py-4">{blog.tag}</td>

                <td className="px-6 py-4">
                  {blog.status === "active" ? (
                    <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs text-red-800 bg-red-100 rounded">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="flex gap-4 px-6 py-4">
                  <button onClick={() => openEditModal(blog)}>
                    <FaEdit className="text-2xl text-cyan-500" />
                  </button>

                  <button onClick={() => handleDelete(blog._id)}>
                    <FaTrashAlt className="text-2xl text-red-500" />
                  </button>
                </td>
              </tr>
            ))}

            {currentData.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            {/* Exit button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 text-xl hover:text-red-500"
            >
              ✖
            </button>

            <h3 className="mb-4 text-xl font-semibold">Edit Blog</h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  let imageUrl = selectedBlog.image || null;

                  // Upload new image if selected
                  if (formData.imageFile) {
                    const cloudinaryData = new FormData();
                    cloudinaryData.append("file", formData.imageFile);
                    cloudinaryData.append("upload_preset", "eCommerce");

                    const cloudinaryRes = await fetch(
                      "https://api.cloudinary.com/v1_1/dt3bgis04/image/upload",
                      { method: "POST", body: cloudinaryData },
                    );
                    const data = await cloudinaryRes.json();
                    imageUrl = data.secure_url;
                  }

                  const updatedData = {
                    title: formData.title,
                    tag: formData.tag,
                    status: formData.status,
                    image: imageUrl,
                  };

                  if (isDemo) {
                    const updated = currentData.map((b) =>
                      b._id === selectedBlog._id ? { ...b, ...updatedData } : b,
                    );
                    setLocalBlogs(updated);
                    Swal.fire("Demo Mode", "Blog updated temporarily!", "info");
                    setIsModalOpen(false);
                    return;
                  }

                  await axiosPublic.put(
                    `/blogs/${selectedBlog._id}`,
                    updatedData,
                  );
                  Swal.fire("Updated!", "Blog updated successfully", "success");
                  setIsModalOpen(false);
                  refetch();
                } catch (error) {
                  console.error(error);
                  Swal.fire("Error", "Failed to update blog", "error");
                }
              }}
              className="space-y-4"
            >
              {/* Title */}
              <input
                name="title"
                value={formData.title}
                onChange={handleModalChange}
                className="w-full p-2 border rounded"
                placeholder="Blog Title"
                required
              />

              {/* Tag */}
              <input
                name="tag"
                value={formData.tag}
                onChange={handleModalChange}
                className="w-full p-2 border rounded"
                placeholder="Tag (e.g. SEO, Branding)"
              />

              {/* Status */}
              <select
                name="status"
                value={formData.status}
                onChange={handleModalChange}
                className="w-full p-2 border rounded"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* Image update */}
              <div>
                <label className="block mb-1 font-semibold">Blog Image</label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="editImage"
                    className="px-4 py-2 text-white bg-linear-to-r from-green-400 to-blue-500 rounded-lg shadow cursor-pointer hover:from-green-500 hover:to-blue-600 transition-all duration-200"
                  >
                    Choose File
                  </label>
                  <span className="text-sm text-gray-600">
                    {formData.imageName || "No file chosen"}
                  </span>
                </div>
                <input
                  type="file"
                  id="editImage"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormData((prev) => ({
                        ...prev,
                        imageFile: file,
                        imageName: file.name,
                      }));
                    }
                  }}
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
              >
                Update Blog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
