import { useState } from "react";
import CommunityPostCard from "../../../components/community/CommunityPostCard";
import type { CommunityPost } from "../../../components/community/types";

export const mockPosts: CommunityPost[] = [
  { id: 1, author: 'Dr. Anya Sharma', date: 'July 26, 2024', text: 'Photos from the recent training session on food safety practices.', imageUrl: 'https://placehold.co/600x400/00b894/ffffff?text=Training+Session+Photo', likes: 15, comments: 4, downloadCount: 8 },
  { id: 2, author: 'Mr. Ben Carter', date: 'July 26, 2024', text: 'Attendance sheet for the training session held on July 28th.', imageUrl: 'https://placehold.co/600x800/ff7675/ffffff?text=Attendance+Sheet+PDF', likes: 8, comments: 2, downloadCount: 12 },
  { id: 3, author: 'Ms. Chloe Davis', date: 'July 24, 2024', text: 'A short video demonstrating proper handwashing techniques.', imageUrl: 'https://placehold.co/600x350/a29bfe/ffffff?text=Handwashing+Demo+Video', likes: 21, comments: 7, downloadCount: 5 },
  { id: 4, author: 'Mr. Dinesh Perera', date: 'July 22, 2024', text: 'Updated guide on allergen management now available in resources section.', imageUrl: 'https://placehold.co/600x200/55efc4/ffffff?text=Updated+Guide+Cover', likes: 10, comments: 1, downloadCount: 15 },
];

const CommunityPage = () => {
  // 🟢 NEW: manage posts state (to update likes/comments)
  const [posts, setPosts] = useState<CommunityPost[]>(mockPosts);
  
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
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
        Community Feed
      </h1>

      {/* Post Creation Area */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6 border border-green-200">
        <p className="text-gray-600 mb-3">Share your activities or tips with the community...</p>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 px-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-green-500 transition"
          />
          <button className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
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
