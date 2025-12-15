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
    return postsData.map((post) => {
      const media = post.mediaUrls || [];
      const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'heic', 'tiff'];
      const videoExts = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];
      const pdfExts = ['pdf'];

      const getExt = (url: string) => {
        // Remove query parameters and hash, then get extension
        const cleanUrl = url.split('?')[0].split('#')[0];
        return cleanUrl.split('.').pop()?.toLowerCase() || '';
      };

      const imageUrls = media.filter(url => imageExts.includes(getExt(url)));
      const videoUrls = media.filter(url => videoExts.includes(getExt(url)));
      const pdfUrls = media.filter(url => pdfExts.includes(getExt(url))).map(url => ({ url, title: 'Attached Document' }));

      return {
        id: post.id,
        author: `${post.author.firstName} ${post.author.lastName}`.trim() || "Unknown Author",
        date: new Date(post.createdAt).toLocaleDateString(),
        text: post.caption,
        imageUrl: imageUrls.length > 0 ? imageUrls[0] : undefined,
        imageUrls: imageUrls,
        videoUrls: videoUrls,
        pdfUrls: pdfUrls,
        likes: post.likesCount,
        isLiked: post.isLiked,
        comments: post.comments ? post.comments.map(c => ({
          id: c.id,
          user: `${c.author.firstName} ${c.author.lastName}`,
          authorId: c.author.id,
          profileImageUrl: c.author.profileMediaUrl,
          text: c.content
        })) : [],
        downloadCount: post.downloadCount
      };
    });
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
