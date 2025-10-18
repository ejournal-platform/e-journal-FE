export interface CommunityPost {
  id: number;
  author: string;
  date: string;
  text: string;
  imageUrl: string;
  likes: number;
  comments: number;
  downloadCount: number;
  latestComment?: string; // 🟢 new
}
