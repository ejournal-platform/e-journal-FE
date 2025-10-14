import { useState } from "react";
import { mockSubmissions, type Submission } from "./Types";
import SubmissionRow from "./SubmissionRow";

const SubmissionList = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  }

  const confirmDelete = () => {
    if (selectedId !== null) {
      setSubmissions((prev) => prev.filter((sub) => sub.id !== selectedId));
    }
    setShowModal(false);
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">

      {/* Table Header */}
      <div className="grid grid-cols-[3fr_1.5fr_1.5fr_0.5fr] items-center pb-4 mb-2 border-b-2 border-gray-200 font-semibold text-gray-500 uppercase text-sm tracking-wider">
        <div>Title</div>
        <div>Date</div>
        <div>Status</div>
        <div></div>
      </div>

      {/* Submission Rows */}
      <div className="divide-y divide-gray-100">
        {submissions.map((submission) => (
          <SubmissionRow
            key={submission.id}
            submission={submission}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-88">
            <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
              Confirm Delete
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Are you sure you want to delete this submission? <br />
              This action cannot be undone.
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default SubmissionList;
