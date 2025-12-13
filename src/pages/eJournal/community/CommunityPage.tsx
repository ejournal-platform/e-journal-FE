import { useMemo } from "react";
import CommunityPostCard from "../../../components/community/CommunityPostCard";
import type { CommunityPost } from "../../../components/community/types";
import { usePosts } from "../../../api/hooks/posts";

const CommunityPage = () => {
  // Fetch posts data using the API hook
  const { data: postsData, isLoading, error } = usePosts();

  // Hook for creating a new post (currently commented out in JSX)
  // const { mutate: createPost, isPending: isCreating } = useCreatePost();
  // const [newPostText, setNewPostText] = useState("");

  const posts: CommunityPost[] = useMemo(() => {
    if (!postsData) return [];
    return postsData.map((post) => ({
      id: post.id, // Assuming ID is string in type or compatible
      author: `${post.author.firstName} ${post.author.lastName}`.trim() || "Unknown Author",
      date: new Date(post.createdAt).toLocaleDateString(),
      text: post.caption,
      imageUrl: post.mediaUrls && post.mediaUrls.length > 0
        ? post.mediaUrls[0]
        : undefined,
      imageUrls: post.mediaUrls || [],
      likes: post.likesCount,
      isLiked: post.isLiked,
      comments: post.comments ? post.comments.map(c => ({
        id: c.id,
        user: `${c.author.firstName} ${c.author.lastName}`,
        authorId: c.author.id,
        text: c.content
      })) : [],
      downloadCount: post.downloadCount
    }));
  }, [postsData]);

  // const handleCreatePost = () => {
  //   if (!newPostText.trim()) return;
  //   createPost({ caption: newPostText }, {
  //     onSuccess: () => {
  //       setNewPostText("");
  //     }
  //   });
  // };

  //   const handleLike = (id: number) => {
  //     setPosts(prev =>
  //       prev.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post)
  //     );
  //   };

  //   const handleAddComment = (id: number, comment: string) => {
  //     setPosts(prev =>
  //       prev.map(post =>
  //         post.id === id
  //           ? { ...post, comments: post.comments + 1, latestComment: comment }
  //           : post
  //       )
  //     );
  //   };

  return (
    <div className="p-4 sm:p-8 w-full max-w-xl mx-auto">
      {/* <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
        Community Feed
      </h1> */}

      {/* Post Creation Area */}
      {/* <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6 border border-green-200">
        <p className="text-gray-600 mb-3">Share your activities or tips with the community...</p>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-green-500 transition"
          />
          <button
            onClick={handleCreatePost}
            disabled={isCreating}
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div> */}

      {/* Feed */}
      <div className="space-y-6">
        {isLoading && <p className="text-center text-gray-500">Loading posts...</p>}
        {error && <p className="text-center text-red-500">Failed to load posts.</p>}
        {posts.map(post => (
          <CommunityPostCard
            key={post.id}
            post={post}
          // onLike={handleLike}      
          // onAddComment={handleAddComment} 
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
