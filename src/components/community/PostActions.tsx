import { useState } from "react";
import { type CommunityPost } from "./types";
import { FaHeart, FaRegHeart, FaComment, FaDownload, FaTrash } from "react-icons/fa";
import { useLikePost, useAddComment, useDownloadPost } from "../../api/hooks/posts";

interface Props {
  post: CommunityPost;
  showComments: boolean;
  onToggleComments: () => void;
}

const CURRENT_USER = "You"; // Mock current user (you can later replace with real profile)

const PostActions = ({ post, showComments, onToggleComments }: Props) => {
  const { mutate: likePost } = useLikePost();
  const { mutate: addComment } = useAddComment();
  const { mutate: downloadPost } = useDownloadPost();

  const [newComment, setNewComment] = useState("");
  const [downloading, setDownloading] = useState(false);

  // Use props for state, assuming parent updates on mutation success (via query invalidation)
  const likes = post.likes;
  const hasLiked = post.isLiked;
  const comments = post.comments || [];

  // Toggle Like (add/remove)
  const handleLike = () => {
    likePost(post.id.toString());
  };

  // Add new comment
  const handleComment = () => {
    if (newComment.trim() === "") return;
    addComment({ id: post.id.toString(), data: { content: newComment } }, {
      onSuccess: () => {
        setNewComment("");
      }
    });
  };

  // Delete own comment only (Not implemented in backend yet)
  const handleDeleteComment = (_id: string, user: string) => {
    if (user !== CURRENT_USER) return; // not allowed
    // setComments((prev) => prev.filter((c) => c.id !== id));
    alert("Delete comment not implemented yet");
  };

  // Download mock file
  const handleDownload = async () => {

    // imageUrl එක නැත්නම් download එක පටන් ගන්නේ නැතුව නවතින්න කියල මේකෙන් කියනවා.
    if (!post.imageUrl) return;
    
    setDownloading(true);

    // Increment download count
    downloadPost(post.id.toString());

    if (!post.imageUrl) {
      alert("No image to download.");
      setDownloading(false);
      return;
    }
    try {
      // If multiple images, maybe download all? For now just the first one or the one in imageUrl
      const response = await fetch(post.imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `Post-${post.id}.jpg`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error("Download failed", e);
    } finally {
      setDownloading(false);
    }
  };

  const btnClass =
    "flex items-center space-x-2 text-gray-600 hover:text-green-600 transition duration-150 p-2 rounded-lg text-sm font-medium w-full justify-center sm:w-auto";

  return (
    <div className="mt-4 border-t border-gray-100 pt-3">
      <div className="flex flex-row justify-between mt-4 border-t border-gray-100 pt-3 space-y-2 sm:space-y-0 sm:space-x-4 text-center">
        {/* Like */}
        <div>
           <button
          className={`${btnClass} ${hasLiked ? "text-green-600" : ""}`}
          onClick={handleLike}
        >
          {hasLiked ? <FaHeart className="text-green-600 w-5 h-5" /> : <FaRegHeart className="w-5 h-5"/>}
          <span className="hidden sm:inline">Like ({likes})</span>
          <span className="inline sm:hidden">({likes})</span>
        </button>
        </div>
       
        {/* Comment Button */}
        <div>
           <button className={btnClass} onClick={onToggleComments}>
          <FaComment className="w-5 h-5"/>
          <span className="hidden sm:inline">Comment ({comments.length})</span>
          <span className="inline sm:hidden">({comments.length})</span>

        </button>
        </div>
       

        {/* Download Button */}
        <div>
           <button onClick={handleDownload} className={btnClass}>
          <FaDownload className={`w-5 h-5downloading ? "animate-bounce" : ""}`} />
          <span className="hidden sm:inline">{downloading ? "Downloading..." : `Download (${post.downloadCount})`}</span>
          <span className="inline sm:hidden">
             {downloading ? "..." : `(${post.downloadCount})`}
          </span>
        </button>
        </div>
       
      </div>


      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 space-y-3">
          {comments.length === 0 && (
            <p className="text-gray-400 text-sm italic">No comments yet.</p>
          )}

          {comments.map((c) => (
            <div key={c.id} className="flex items-start space-x-3 group">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700">
                {c.user[0]}
              </div>

              {/* Comment bubble */}
              <div className="bg-gray-100 px-3 py-2 rounded-lg text-gray-700 max-w-sm flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm">{c.user}</p>
                  {c.user === CURRENT_USER && (
                    <button
                      onClick={() => handleDeleteComment(c.id, c.user)}
                      className="text-xs text-gray-500 hover:text-red-500 group-hover:inline"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                <p>{c.text}</p>
              </div>
            </div>
          ))}

          {/* Comment Input */}
          <div className="flex items-center space-x-2 mt-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 rounded-full bg-gray-100 text-sm focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button
              onClick={handleComment}
              className="px-3 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostActions;
