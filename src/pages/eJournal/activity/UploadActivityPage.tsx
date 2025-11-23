import React, { useState } from "react";
import FileUpload from "../../../components/activity/FileUpload";
import FilePreview from "../../../components/activity/FilePreview";
import ActivityForm from "../../../components/activity/ActivityForm";

const UploadActivityPage: React.FC = () => {
  const [activityTitle, setActivityTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  // 🟩 Added: To track the file type (image/pdf/video)
  const [fileType, setFileType] = useState<string | null>(null);

  // 🟩 Updated handleFileAdd with validation logic
  const handleFileAdd = (newFiles: File[]) => {
    if (newFiles.length === 0) return;

    const firstType = newFiles[0].type;

    let newType: "image" | "pdf" | "video" | null = null;

    if (firstType.startsWith("image/")) newType = "image";
    else if (firstType === "application/pdf") newType = "pdf";
    else if (firstType.startsWith("video/")) newType = "video";

    if (!newType) {
      alert("❌ Only images, PDFs, or videos are allowed.");
      return;
    }

    // 🟩 Prevent mixing different file types
    if (fileType && fileType !== newType) {
      alert(`❌ You can upload only one type of file (${fileType.toUpperCase()}) at a time.`);
      return;
    }

    // 🟩 Check limits
    const totalFiles = files.length + newFiles.length;
    if (
      (newType === "image" && totalFiles > 5) ||
      (newType === "pdf" && totalFiles > 3) ||
      (newType === "video" && totalFiles > 3)
    ) {
      alert(
        `❌ You can upload a maximum of ${
          newType === "image" ? 5 : 3
        } ${newType.toUpperCase()} files.`
      );
      return;
    }

    setFiles((prev) => [...prev, ...newFiles]);
    setFileType(newType);
  };

  // 🟩 Reset fileType when all files are removed
  const handleRemoveFile = (index: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length === 0) setFileType(null);
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Activity Submitted: ${activityTitle} on ${date}`);
  };

  return (
    <div className="flex min-h-screen">
      <main className="grow p-8">
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

            {/* Pass fileType to FileUpload */}
            <FileUpload onFilesAdded={handleFileAdd} fileType={fileType} />

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
