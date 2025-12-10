import React, { useState } from "react";
import FileUpload from "../../../components/activity/FileUpload";
import FilePreview from "../../../components/activity/FilePreview";
import ActivityForm from "../../../components/activity/ActivityForm";

import { useUploadMedia } from "../../../api/hooks/media";
import { useCreatePost } from "../../../api/hooks/posts";
import { useNavigate } from "react-router-dom";

const getFileType = (mimeType: string): "image" | "pdf" | "video" | null => {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType === "application/pdf") return "pdf";
    if (mimeType.startsWith("video/")) return "video";
    return null;
};

const UploadActivityPage: React.FC = () => {
  const [activityTitle, setActivityTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedMediaIds, setUploadedMediaIds] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: uploadMedia } = useUploadMedia();
  const { mutate: createPost, isPending: isSubmitting } = useCreatePost();
  const navigate = useNavigate();

  const [fileType, setFileType] = useState<"image" | "pdf" | "video" | null>(null);

 const handleFileAdd = async (newFiles: File[]) => {
    if (newFiles.length === 0) return;

    const firstType = newFiles[0].type;
    const newType = getFileType(firstType);

    if (!newType) {
      alert("❌ Only images, PDFs, or videos are allowed.");
      return;
    }

    // Prevent mixing different file types
    if (fileType && fileType !== newType) {
      alert(`❌ You can upload only one type of file (${fileType.toUpperCase()}) at a time.`);
      return;
    }

    // Check limits
    const totalFiles = files.length + newFiles.length;
    const maxFiles = newType === "image" ? 5 : 3;

    if (totalFiles > maxFiles) {
      alert(
        `❌ You can upload a maximum of ${maxFiles} ${newType.toUpperCase()} files.`
      );
      return;
    }

    // Add to state and set/update fileType
    setFiles((prev) => [...prev, ...newFiles]);
    setFileType(newType);

    // --- Start Upload Process ---
    setIsUploading(true);
    try {
      const uploadPromises = newFiles.map(async (file) => {
        // Determine type for backend hook
        const mediaType = newType === 'image' ? 'IMAGE' : 'DOCUMENT';

        // 1. Get Presigned URL and mediaId
        const { mediaId, uploadUrl } = await uploadMedia({ fileName: file.name, type: mediaType });

        // 2. Upload file content directly to the signed URL (e.g., S3)
        await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          }
        });

        return mediaId;
      });

      const mediaIds = await Promise.all(uploadPromises);
      setUploadedMediaIds((prev) => [...prev, ...mediaIds]);
    } catch (error) {
      console.error("Failed to upload files", error);
      alert("Failed to upload some files. Please try again.");
      // Note: In a production app, we should also clean up the files state if upload failed.
    } finally {
      setIsUploading(false);
    }
  };

  // Reset fileType when all files are removed
  const handleRemoveFile = (index: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      
      if (updated.length === 0) setFileType(null);
      return updated;
    });

    // Dula code
    // setFiles((prev) => prev.filter((_, i) => i !== index));

    setUploadedMediaIds((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isUploading) {
      alert("Please wait for files to finish uploading.");
      return;
    }

    const caption = `**${activityTitle}**\n\n${description}\n\nDate: ${date}`;

    createPost({
      caption,
      mediaIds: uploadedMediaIds
    }, {
      onSuccess: () => {
        alert("Activity Submitted Successfully!");
        setActivityTitle("");
        setDescription("");
        setDate("");
        setFiles([]);
        setUploadedMediaIds([]);
        navigate("/dashboard/community");
      },
      onError: () => {
        alert("Failed to submit activity.");
      }
    });
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
            disabled={isSubmitting || isUploading}
            className="py-3 px-8 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : isUploading ? "Uploading Files..." : "Submit E-Journal Entry"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default UploadActivityPage;
