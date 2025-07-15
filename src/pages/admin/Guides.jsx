import React, { useState } from "react";
import { useGetGuides, useDeleteGuide, useUpdateGuide, useCreateGuide } from "../../hooks/useGuidesHook";
import { toast } from "react-toastify";
import AddAndEditGuideForm from "../../components/admin/dashboard/AddAndEditGuideForm";
import Modal from "../../components/admin/common/Modal";
import { MoreVertical } from "lucide-react";

// Helper Components
const SpecialtyBadge = ({ specialty }) => (
  <span className="px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">{specialty}</span>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Available: "bg-green-100 text-green-700",
    "On Break": "bg-yellow-100 text-yellow-700",
    Unavailable: "bg-red-100 text-red-700",
  };
  return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>{status}</span>;
};

const ActionMenu = ({ onEdit, onDelete }) => (
  <details className="relative">
    <summary className="list-none cursor-pointer p-2 rounded-full hover:bg-gray-100">
      <MoreVertical className="w-5 h-5 text-gray-500" />
    </summary>
    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      <button onClick={onEdit} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</button>
      <button onClick={onDelete} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</button>
    </div>
  </details>
);

const Guides = () => {
  const { data, isLoading } = useGetGuides();
  const deleteGuideMutation = useDeleteGuide();
  const updateGuideMutation = useUpdateGuide();
  const createGuideMutation = useCreateGuide();

  const [editingGuide, setEditingGuide] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const guides = data?.data || [];
  const maxTours = Math.max(...guides.map((g) => g.assignedTours || 0), 1);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this guide?")) {
      deleteGuideMutation.mutate(id);
    }
  };

  const handleEdit = (guide) => {
    setIsEditMode(true);
    setEditingGuide(guide);
    setShowModal(true);
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setEditingGuide(null);
    setShowModal(true);
  };

 const handleSubmit = (formData) => {
  // specialties already array, do NOT split again
  console.log("handlesubmit", formData);
  if (isEditMode) {
    updateGuideMutation.mutate(
      { id: editingGuide._id, formData: formData },
      {
        onSuccess: () => {
          setShowModal(false);
          setEditingGuide(null);
        },
      }
    );
  } else {
    createGuideMutation.mutate(formData, {
      onSuccess: () => setShowModal(false),
    });
  }
};


  return (
    <div className="bg-gray-50 rounded-2xl shadow-md p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Guides</h2>
          <p className="text-sm text-gray-500">Manage all professional guides and their assignments</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search guides..."
            className="bg-white border border-gray-300 text-sm text-gray-800 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">Filter</button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 text-sm text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 font-semibold"
          >
            Add Guide
          </button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center py-10">Loading guides...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Guide</th>
                <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Specialties</th>
                <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Experience</th>
                <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Assigned Tours</th>
                <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="p-4 text-xs font-semibold text-gray-600 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {guides.map((guide) => (
                <tr key={guide._id}>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                        {guide.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-base text-gray-900">{guide.name}</div>
                        <div className="text-sm text-gray-500">{guide.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {guide.specialties?.map((spec, idx) => (
                        <SpecialtyBadge key={idx} specialty={spec} />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{guide.experience} yrs</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${(guide.assignedTours / maxTours) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-sm text-gray-800">{guide.assignedTours}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={guide.status} />
                  </td>
                  <td className="p-4 text-right">
                    <ActionMenu
                      onEdit={() => handleEdit(guide)}
                      onDelete={() => handleDelete(guide._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <Modal
          title={isEditMode ? `Edit Guide - ${editingGuide?.name}` : "Add New Guide"}
          onClose={() => setShowModal(false)}
        >
          <AddAndEditGuideForm
            defaultValues={
              isEditMode
                ? {
                    name: editingGuide.name,
                    email: editingGuide.email,
                    specialties: editingGuide.specialties.join(", "),
                    experience: editingGuide.experience,
                    assignedTours: editingGuide.assignedTours,
                    status: editingGuide.status,
                  }
                : {
                    name: "",
                    email: "",
                    specialties: "",
                    experience: 0,
                    assignedTours: 0,
                    status: "",
                  }
            }
            onSubmit={handleSubmit}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Guides;
