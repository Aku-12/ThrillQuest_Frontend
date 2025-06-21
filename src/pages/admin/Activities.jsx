import { useState } from "react";

import { useFormik } from "formik";

import * as Yup from "yup";

import useAddActivity from "../../hooks/useAddActivity";

import useDeleteActivity from "../../hooks/useDeleteActivity";

const Activities = () => {
  const { mutate: createActivity, isLoading: isCreating } = useAddActivity();

  const { mutate: deleteActivity, isLoading: isDeleting } = useDeleteActivity();

  const [activities, setActivities] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",

      description: "",

      image: null,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),

      description: Yup.string().required("Description is required"),

      image: Yup.mixed().required("Image is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();

      formData.append("name", values.name);

      formData.append("description", values.description);

      formData.append("image", values.image);

      createActivity(formData, {
        onSuccess: (response) => {
          const newActivity = {
            _id: response._id,

            name: values.name,

            description: values.description,
          };

          setActivities((prev) => [...prev, newActivity]);

          resetForm();
        },
      });
    },
  });
console.log(activities)
  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];

    formik.setFieldValue("image", file);
  };

  const handleDelete = (id) => {
    deleteActivity(id, {
      onSuccess: () => {
        setActivities((prev) => prev.filter((a) => a._id !== id));
      },
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto rounded-2xl bg-white shadow">
      <h2 className="text-2xl font-semibold text-gray-800">Add New Activity</h2>

      <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-lg border p-2"
            placeholder="e.g., Rafting"
          />

          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        <div>
          <label className="block text-gray-600">Description</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-lg border p-2"
            placeholder="Describe the activity..."
          />

          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm">
              {formik.errors.description}
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-600">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full"
          />

          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-sm">{formik.errors.image}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={isCreating}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 mt-3 hover:bg-blue-700"
        >
          {isCreating ? "Adding..." : "Create Activity"}
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Activities List
        </h3>

        {activities.length === 0 ? (
          <p className="text-gray-500">No activities added yet.</p>
        ) : (
          <ul className="space-y-2">
            {activities.map((activity, index) => (
              <li
                key={index}
                className="flex items-center justify-between border rounded p-2"
              >
                <div>
                  <p className="font-medium">{activity.name}</p>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(activity._id)}
                  disabled={isDeleting}
                  className="text-red-500 hover:text-red-700"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Activities;
