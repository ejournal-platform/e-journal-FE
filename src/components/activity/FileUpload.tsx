import { Upload } from "lucide-react";
import React, { useState } from "react";

interface FileUploadInputProps {
  onFilesAdded: (files: File[]) => void;
}

const FileUpload = ({ onFilesAdded } : FileUploadInputProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const newFiles = Array.from(e.dataTransfer.files);
    onFilesAdded(newFiles);
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
      <input
        id="file-upload"
        type="file"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && onFilesAdded(Array.from(e.target.files))}
      />
      <label
    htmlFor="file-upload"
    className="mt-4 py-2 px-6 bg-green-600 text-white font-semibold rounded-lg shadow cursor-pointer hover:bg-green-700 transition flex items-center"
  >
    Upload
  </label>
    </div>
  );
};

export default FileUpload;
