import React, { useEffect, useState } from "react";
import {
  useCreateActivity,
  useUpdateActivity,
} from "../../hooks/useActivityHook";
import { toast } from "react-toastify";

const difficulties = ["Beginner", "Intermediate", "Advanced"];
const statuses = ["Active", "On Hold"];
const MAX_IMAGES = 5;

const AddActivityModal = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    duration: "",
    difficulty: difficulties[0],
    status: statuses[0],
  });

  const [images, setImages] = useState([]);
  const createMutation = useCreateActivity();
  const updateMutation = useUpdateActivity();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        location: initialData.location || "",
        price: initialData.price || "",
        duration: initialData.duration || "",
        difficulty: initialData.difficulty || difficulties[0],
        status: initialData.status || statuses[0],
      });
      setImages(initialData.images || []);
    } else {
      setFormData({
        name: "",
        location: "",
        price: "",
        duration: "",
        difficulty: difficulties[0],
        status: statuses[0],
      });
      setImages([]);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length > MAX_IMAGES) {
      toast.error(`Maximum of ${MAX_IMAGES} images allowed.`);
      return;
    }
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.location.trim()) return toast.error("Location is required");

    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => form.append(key, val));

    const newFiles = images.filter((img) => img instanceof File);
    newFiles.forEach((file) => form.append("images", file));

    const existingUrls = images.filter((img) => typeof img === "string");
    if (initialData && existingUrls.length > 0) {
      form.append("existingImages", JSON.stringify(existingUrls));
    }

    if (initialData?._id) {
      updateMutation.mutate(
        { id: initialData._id, formData: form },
        {
          onSuccess: () => {
            toast.success("Activity updated successfully");
            onClose();
          },
          onError: (error) => {
            toast.error(
              "Update failed: " + (error?.response?.data?.message || "Error")
            );
          },
        }
      );
    } else {
      createMutation.mutate(form, {
        onSuccess: () => {
          toast.success("Activity created successfully");
          onClose();
        },
        onError: (error) => {
          toast.error(
            "Upload Error: " + (error?.response?.data?.message || "Bad Request")
          );
          console.error("Upload Error:", error);
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">
          {initialData ? "Edit Activity" : "Add New Activity"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="sm:col-span-2">
            <label className="block font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="e.g. Full Day"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-emerald-500 focus:outline-none"
            >
              {difficulties.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-emerald-500 focus:outline-none"
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-medium mb-1">
              Upload Images (Max {MAX_IMAGES})
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              disabled={images.length >= MAX_IMAGES}
              className="block w-full text-sm"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img instanceof File ? URL.createObjectURL(img) : img}
                    className="w-20 h-20 rounded object-cover"
                    alt="activity"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-0 right-0 text-xs bg-red-600 text-white w-5 h-5 rounded-full flex justify-center items-center hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2 flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isLoading || updateMutation.isLoading}
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 disabled:opacity-50"
            >
              {initialData
                ? updateMutation.isLoading
                  ? "Saving..."
                  : "Save Changes"
                : createMutation.isLoading
                ? "Adding..."
                : "Add Activity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivityModal;
