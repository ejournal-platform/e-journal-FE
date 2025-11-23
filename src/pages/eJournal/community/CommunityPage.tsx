import CommunityPostCard from "../../../components/community/CommunityPostCard";
import type { CommunityPost } from "../../../components/community/types";
import Img1 from '../../../assets/dummy/user1/img1.jpg';
import Img2 from '../../../assets/dummy/user1/img2.jpg';
import Img3 from '../../../assets/dummy/user1/img3.jpg';
import Img4 from '../../../assets/dummy/user1/img4.jpg';
import Img5 from '../../../assets/dummy/user1/img5.jpg';
import Img6 from '../../../assets/dummy/user2/u2i1.jpg';
import Img7 from '../../../assets/dummy/user2/u2i2.jpg';
import Img8 from '../../../assets/dummy/user3/u3i1.jpg';

export const mockPosts: CommunityPost[] = [
  { 
    id: 1, 
    author: 'Kugatharshan Elangeshwaran', 
    date: 'November 22, 2025', 
    text: 'Today, I participated in a food safety session at the RDHS, Eravur, where I also delivered a presentation. Four NGO representatives attended the program.\n\nThe program was initiated by Dr followed by a session conducted by Mr. Thevanesan. Then, Miss Danukshi facilitated an activity, after which I conducted a session on food safety. Subsequently, Miss Shiyana led a session on social and behavioral change, followed by another activity and a group discussion.\n\nIt was a very successful and meaningful program, and I was able to establish some useful connections for future collaboration.', 
    imageUrls: [
      Img1, 
      Img2,
      Img3,
      Img4,
      Img5
    ], 
    likes: 1, 
    comments: 0, 
    downloadCount: 0 },
  { 
    id: 2, 
    author: 'Nuwan Siriwardhana', 
    date: 'November 26, 2024', 
    text: '⛔  ඊයේ මං මාවනැල්ලේ , කඩේකින් යෝගට් එකක් ගත්තා. ඒක හොඳටම නරක් වෙලා, මේක කඩේ සේවකයන්ට දැනුම් දුන්නා. වැඩක් නෑ. එයාලට ඒකට උත්තර නෑ. එයාලට බයකුත් නෑ. මං ඉක්මනින් කෑගල්ල දිස්ත්‍රික් සෞඛ්‍ය වෛද්‍ය නිලධාරී කාර්‍යාලයේ රාජපක්ෂ මහත අමතා , සියල්ල පැහැදිලි කරා, එතුමා මාවනැල්ල සෞඛ්‍ය වෛද්‍ය නිලධාරී කාර්‍යාලයට ගොස් දැනුම්දෙන්න කිව්වා. ඒ යන අතරේ රාජපක්ෂ මහතා එහි නිලධාරීන්ව දැනුවත් කර අවසන්. \n\nඑහි සිටි නිධාරීන්ගේ කාර්‍යක්ෂමතාවය මත , ඒ සඳහා ගත හැකි පියවර ගැනීමට කඩිනම් විය.  එම නිලනිලධාරීන් එම කඩේට ගිහින් එම යෝගට් නිෂ්පාදන ගෙන පරික්ෂාවට ගෙන ඇත. එහි පරීක්ෂණ කටයුතු දිගටම සිදු වන බවට මට දැනුම් දෙන්නට විය.\n\nමා ඒ අවස්ථාවේම ක්‍රියාත්මක වීමෙන් එම නිෂ්පාදන අනෙකුත් පාරිභෝගිකයන් අතට පත්වීම වළක්වා ගැනීමට හැකිවීම පිළිබඳ ඔවුන් මහට ස්තූති කරන්නට විය.\n\nමෙසේ මා හට ක්‍රියකවීමට , අවශ්‍ය පරිසරය නිර්මාණය කරදුන් BESPA ව්‍යාපෘතියේ සියලු නිලධාරීන්ට, ස්තූතියි.\n\n- නුවන් සිරිවර්ධන -', 
    imageUrls: [
      Img6,
      Img7
    ], 
    likes: 1, 
    comments: 0, 
    downloadCount: 0 
  },
    { 
    id: 3, 
    author: 'Kugatharshan Elangeshwaran', 
    date: 'November 26, 2024', 
    text: 'Today, I had a meeting with the Customer Affairs Officers.\n•	They expressed their willingness to support our work.\n•	They agreed to assist as resource persons for the awareness programs.\n•	They suggested that we communicate our process with the GA.\n•	They also recommended collaborating with schools, as they can help implement this program through school networks.', 
    imageUrls: [
      Img8
    ], 
    likes: 1, 
    comments: 0, 
    downloadCount: 0 
  },
];

const CommunityPage = () => {
  const posts = mockPosts;
  
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
            className="flex-1 px-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-green-500 transition"
          />
          <button className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div> */}

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
