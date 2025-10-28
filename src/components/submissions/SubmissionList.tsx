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
  };

  const confirmDelete = () => {
    if (selectedId !== null) {
      setSubmissions((prev) => prev.filter((sub) => sub.id !== selectedId));
    }
    setShowModal(false);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full overflow-x-auto">
      {/* Table Header (Hidden on small screens) */}
      <div className="hidden md:grid grid-cols-[3fr_1.5fr_1.5fr_0.5fr] items-center pb-4 mb-2 border-b-2 border-gray-200 font-semibold text-gray-500 uppercase text-sm tracking-wider">
        <div>Title</div>
        <div>Date</div>
        <div>Status</div>
        <div></div>
      </div>

      {/* Submission Rows */}
      <div className="divide-y divide-gray-100">
        {submissions.map((submission) => (
          <div key={submission.id} className="md:block">
            {/* Desktop Row */}
            <div className="hidden md:grid items-center">
              <SubmissionRow
                submission={submission}
                onDelete={handleDeleteClick}
              />
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden border border-gray-100 rounded-lg p-4 mb-3 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">{submission.title}</span>
                <button
                  onClick={() => handleDeleteClick(submission.id)}
                  className="text-red-500 text-sm font-medium hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">Date:</span> {submission.date}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">Status:</span> {submission.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
              Confirm Delete
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Are you sure you want to delete this submission? <br />
              This action cannot be undone.
            </p>

            <div className="flex justify-between gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
