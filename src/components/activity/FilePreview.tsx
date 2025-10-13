import { CircleX } from 'lucide-react';

interface FilePreviewProps {
  files: File[];
  onRemoveFile: (index: number) => void; // callback to remove a file
}

const FilePreview = ({ files, onRemoveFile }: FilePreviewProps) => {
  if (files.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
      {files.map((file, index) => {
        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");
        const isPDF = file.type === "application/pdf";

        const fileURL = URL.createObjectURL(file);

        return (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-md p-3 flex flex-col items-center text-center"
          >
            {/* Close button */}
            <CircleX 
            type='button'
            onClick={() => onRemoveFile(index)}
            className="absolute -top-2 -right-2 text-gray-400 bg-red-200 hover:bg-red-400 hover:text-white rounded-full p-1 text-sm font-bold" 
            size={25}/>

            {/* Preview content */}
            <div className="h-40 w-full mb-2 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
              {isImage && (
                <img
                  src={fileURL}
                  alt={file.name}
                  className="h-full object-contain"
                />
              )}
              {isVideo && (
                <video
                  src={fileURL}
                  className="h-full w-full"
                  controls
                />
              )}
              {isPDF && (
                <iframe
                  src={fileURL}
                  className="h-full w-full"
                  title={file.name}
                />
              )}
            </div>
            <p className="text-xs text-gray-600 truncate w-full">{file.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FilePreview;
