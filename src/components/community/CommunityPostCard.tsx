import { useState } from "react";
import PostActions from "./PostActions";
import type { CommunityPost } from "./types";

const CommunityPostCard = ({ post }: { post: CommunityPost }) => {
  const initials = post.author.split(" ").map(n => n[0]).join("");
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6 border border-gray-100 min-h-[550px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-sm mr-3">
          {initials}
        </div>
        <div>
          <p className="font-bold text-gray-800">{post.author}</p>
          <p className="text-xs text-gray-500">{post.date}</p>
        </div>
      </div>

      {/* Text */}
      <p className="text-gray-700 mb-4">{post.text}</p>

      {/* Image */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-md bg-gray-100 flex-1">
        <img
          src={post.imageUrl}
          alt={`Content by ${post.author}`}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://placehold.co/600x400/cccccc/333333?text=Content+Not+Available";
          }}
        />
      </div>

      {/* Actions */}
      <PostActions
        post={post}
        showComments={showComments}
        onToggleComments={() => setShowComments(!showComments)}
      />
    </div>
  );
};

export default CommunityPostCard;
