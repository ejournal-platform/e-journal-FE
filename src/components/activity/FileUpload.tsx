import { Upload } from "lucide-react";
import React, { useState } from "react";

interface FileUploadInputProps {
  onFilesAdded: (files: File[]) => void;
  fileType: string | null;
}

const FileUpload = ({ onFilesAdded, fileType }: FileUploadInputProps) => {
  const [isDragging, setIsDragging] = useState(false);

  // Filter and validate before passing to parent
  const validateAndAddFiles = (selectedFiles: File[]) => {
    const validFiles = selectedFiles.filter(
      (file) =>
        file.type.startsWith("image/") ||
        file.type === "application/pdf" ||
        file.type.startsWith("video/")
    );

    if (validFiles.length === 0) {
      alert("❌ Invalid file type! Only images, PDFs, or videos are allowed.");
      return;
    }

    onFilesAdded(validFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const newFiles = Array.from(e.dataTransfer.files);
    validateAndAddFiles(newFiles);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-12 text-center transition ${
        isDragging
          ? "border-green-500 bg-green-50"
          : "border-gray-300 bg-gray-50 hover:border-green-400"
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
    >
      <Upload className="mx-auto text-green-600 mb-3" size={32} />
      <p className="text-gray-700 font-medium">Drag and drop files here</p>
      <p className="text-gray-500 text-sm mt-1">or</p>

      {/* Input accepts files normally, but validated later */}
      <input
        id="file-upload"
        type="file"
        multiple
        className="hidden"
        accept="image/*,application/pdf,video/*"
        onChange={(e) => e.target.files && validateAndAddFiles(Array.from(e.target.files))}
      />

      <label
        htmlFor="file-upload"
        className="mt-4 py-2 px-6 bg-green-600 text-white font-semibold rounded-lg shadow cursor-pointer hover:bg-green-700 transition flex items-center"
      >
        Upload
      </label>

      {/* Show allowed file type info */}
      {fileType && (
        <p className="mt-3 text-sm text-gray-500">
          Currently uploading: <span className="font-semibold text-green-700">{fileType.toUpperCase()} files</span>
        </p>
      )}
    </div>
  );
};

export default FileUpload;
