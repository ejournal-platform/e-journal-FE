import { useEffect, useState } from "react";
import { type CommunityPost } from "./types";
import { FaHeart, FaRegHeart, FaComment, FaDownload, FaTrash } from "react-icons/fa";

interface Props {
  post: CommunityPost;
  showComments: boolean;
  onToggleComments: () => void;
}

const CURRENT_USER = "You"; // Mock current user (you can later replace with real profile)

const PostActions = ({ post, showComments, onToggleComments }: Props) => {
  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<{ id: number; user: string; text: string }[]>([]);
  const [newComment, setNewComment] = useState("");
  const [downloading, setDownloading] = useState(false);

  // Load like status from localStorage
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    setHasLiked(likedPosts.includes(post.id));
  }, [post.id]);

  // Toggle Like (add/remove)
  const handleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    let updated = [...likedPosts];

    if (hasLiked) {
      // Unlike: remove post from likedPosts
      updated = likedPosts.filter((id: number) => id !== post.id);
      localStorage.setItem("likedPosts", JSON.stringify(updated));
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      // Like: add post to likedPosts
      updated.push(post.id);
      localStorage.setItem("likedPosts", JSON.stringify(updated));
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  // Add new comment
  const handleComment = () => {
    if (newComment.trim() === "") return;
    const newEntry = {
      id: Date.now(),
      user: CURRENT_USER,
      text: newComment,
    };
    setComments([...comments, newEntry]);
    setNewComment("");
  };

  const handleDeleteComment = (id: number, user: string) => {
    if (user !== CURRENT_USER) return; // not allowed
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  // Download mock file
  const handleDownload = async () => {

    // imageUrl එක නැත්නම් download එක පටන් ගන්නේ නැතුව නවතින්න කියල මේකෙන් කියනවා.
    if (!post.imageUrl) return;
    
    setDownloading(true);
    try {
      const response = await fetch(post.imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `Post-${post.id}.jpg`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } finally {
      setDownloading(false);
    }
  };

  const btnClass =
    "flex items-center space-x-2 text-gray-600 hover:text-green-600 transition duration-150 p-2 rounded-lg text-sm font-medium w-full justify-center sm:w-auto";

  return (
    <div className="mt-4 border-t border-gray-100 pt-3">
      <div className="flex flex-row justify-center mt-4 border-t border-gray-100 pt-3 space-y-2 sm:space-y-0 sm:space-x-4 items-center">
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
