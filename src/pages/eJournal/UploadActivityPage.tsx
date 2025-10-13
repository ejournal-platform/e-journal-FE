import React, { useState } from "react";
// import Sidebar from "../../components/layout/Sidebar";
import FileUpload from "../../components/activity/FileUpload";
import FilePreview from "../../components/activity/FilePreview";
import ActivityForm from "../../components/activity/ActivityForm";

const UploadActivityPage: React.FC = () => {
  const [activityTitle, setActivityTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileAdd = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
  setFiles((prev) => prev.filter((_, i) => i !== index));
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Activity Submitted: ${activityTitle} on ${date}`);
  };

  // const navigate = (path: string) => {
  //   window.alert(`Navigate to ${path}`);
  // };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <Sidebar
        userRole="Field Officer"
        currentPath="/dashboard/upload"
        navigate={navigate}
      /> */}

      {/* Main */}
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Upload Activity</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <ActivityForm
            activityTitle={activityTitle}
            description={description}
            date={date}
            setActivityTitle={setActivityTitle}
            setDescription={setDescription}
            setDate={setDate}
          />

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Attachments</h2>
            <FileUpload onFilesAdded={handleFileAdd} />
            <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">File Preview</h3>
            <FilePreview files={files} onRemoveFile={handleRemoveFile} />
          </div>

          <button
            type="submit"
            className="py-3 px-8 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition"
          >
            Submit E-Journal Entry
          </button>
        </form>
      </main>
    </div>
  );
};

export default UploadActivityPage;
