import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const GuideSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  specialties: Yup.string().required("Specialties are required"),
  experience: Yup.number().min(0, "Experience must be at least 0").required("Experience is required"),
  assignedTours: Yup.number().min(0, "Assigned Tours must be at least 0").required("Assigned Tours is required"),
  status: Yup.string()
    .oneOf(["Available", "On Break", "Unavailable"], "Invalid status")
    .required("Status is required"),
});

const InputLabel = ({ children }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">{children}</label>
);

const InputField = ({ name, type = "text", placeholder }) => (
  <>
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
    />
    <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
  </>
);

const AddAndEditGuideForm = ({ defaultValues, onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={GuideSchema}
      enableReinitialize
      onSubmit={(values) => {
        const specialtiesArray = values.specialties
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        const formattedData = {
          ...values,
          specialties: specialtiesArray,
        };

        onSubmit(formattedData);
        console.log("formattedData", formattedData)
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-5">
          <div>
            <InputLabel>Name</InputLabel>
            <InputField name="name" placeholder="Enter name" />
          </div>

          <div>
            <InputLabel>Email</InputLabel>
            <InputField name="email" type="email" placeholder="Enter email" />
          </div>

          <div>
            <InputLabel>Specialties</InputLabel>
            <InputField name="specialties" placeholder="e.g. Hiking, Rafting" />
            <p className="text-xs text-gray-400 mt-1">Separate with commas (e.g. Hiking, Trekking)</p>
          </div>

          <div>
            <InputLabel>Experience (years)</InputLabel>
            <InputField name="experience" type="number" />
          </div>

          <div>
            <InputLabel>Assigned Tours</InputLabel>
            <InputField name="assignedTours" type="number" />
          </div>

          <div>
            <InputLabel>Status</InputLabel>
            <Field
              as="select"
              name="status"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="">Select status</option>
              <option value="Available">Available</option>
              <option value="On Break">On Break</option>
              <option value="Unavailable">Unavailable</option>
            </Field>
            <ErrorMessage name="status" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold"
            >
              {isSubmitting ? "Submitting..." : "Save Guide"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddAndEditGuideForm;
