import { useState } from "react";
import PostActions from "./PostActions";
import MediaViewer from "./MediaViewer";
import type { CommunityPost } from "./types";
import { FaFilePdf } from "react-icons/fa";

const CommunityPostCard = ({ post }: { post: CommunityPost }) => {
  const [showComments, setShowComments] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openViewer = (index: number) => {
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  };

  // Calculate offsets for MediaViewer navigation
  const images = post.imageUrls && post.imageUrls.length > 0 ? post.imageUrls : (post.imageUrl ? [post.imageUrl] : []);
  const videos = post.videoUrls || [];
  const pdfs = post.pdfUrls || [];

  const videoStartIndex = images.length;
  const pdfStartIndex = images.length + videos.length;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6 border border-gray-100 min-h-[550px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-sm mr-3">
          {post.profileImageUrl ? (
            <img src={post.profileImageUrl} alt={post.author} className="w-full h-full object-cover rounded-full" />
          ) : (
            post.author[0]
          )}
        </div>
        <div>
          <p className="font-bold text-gray-800">{post.author}</p>
          <p className="text-xs text-gray-500">{post.date}</p>
        </div>
      </div>

      {/* Text */}
      <p className="text-gray-700 mb-4">
        {post.text
          .replace(/^\*\*\*\*\s+/, '')
          .replace(/\s+Date:.*$/, '')
        }
      </p>

      {/* Image Grid */}
      {post.imageUrls && post.imageUrls.length > 0 && (
        <div className={`grid gap-1 mb-4 overflow-hidden rounded-xl shadow-md bg-gray-100 
          ${post.imageUrls.length === 1 ? 'grid-cols-1' :
            post.imageUrls.length === 2 ? 'grid-cols-2' :
              post.imageUrls.length === 3 ? 'grid-cols-2' : 'grid-cols-2'}`}
          style={{ height: '300px' }}
        >
          {post.imageUrls.slice(0, 4).map((url, index) => (
            <div key={index} className={`relative w-full h-full overflow-hidden ${post.imageUrls!.length === 3 && index === 0 ? 'row-span-2' : ''
              }`}>
              <img
                src={url}
                alt={`Content by ${post.author}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => openViewer(index)}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/600x400/cccccc/333333?text=Content+Not+Available";
                }}
              />
              {/* Overlay for +N images */}
              {post.imageUrls!.length > 4 && index === 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xl">
                  +{post.imageUrls!.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Fallback for single legacy imageUrl if imageUrls is empty but imageUrl exists */}
      {(!post.imageUrls || post.imageUrls.length === 0) && post.imageUrl && (
        <div className="relative w-full overflow-hidden rounded-xl shadow-md bg-gray-100 flex-1">
          <img
            src={post.imageUrl}
            alt={`Content by ${post.author}`}
            className="w-full h-64 object-cover cursor-pointer"
            onClick={() => openViewer(0)}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://placehold.co/600x400/cccccc/333333?text=Content+Not+Available";
            }}
          />
        </div>
      )}

      {/* PDFs - Clickable Card */}
      {pdfs.length > 0 && (
        <div className="grid gap-3 mb-4">
          {pdfs.map((pdf, index) => (
            <div
              key={index}
              onClick={() => openViewer(pdfStartIndex + index)}
              className="relative rounded-xl overflow-hidden shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition group"
              style={{ height: '300px' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-gray-100 flex flex-col items-center justify-center p-6">
                <FaFilePdf className="w-24 h-24 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-gray-800 text-center mb-2">{pdf.title || "Attached Document"}</h3>
                <p className="text-sm text-gray-500">Click to view PDF</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Videos - Embedded Player */}
      {videos.length > 0 && (
        <div className="mb-4">
          {videos.map((videoUrl, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-md border border-gray-200 bg-black"
              style={{ height: '300px' }}
            >
              <video
                src={videoUrl}
                controls
                className="w-full h-full object-contain"
                onClick={(e) => {
                  e.stopPropagation();
                  openViewer(videoStartIndex + index);
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <PostActions
        post={post}
        showComments={showComments}
        onToggleComments={() => setShowComments(!showComments)}
      />

      <MediaViewer
        post={post}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        initialIndex={currentImageIndex}
      />
    </div>
  );
};

export default CommunityPostCard;