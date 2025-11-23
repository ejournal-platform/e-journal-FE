export interface CommunityPost {
  id: string | number;
  author: string;
  date: string;
  text: string;
  imageUrl?: string;
  imageUrls?: string[]; // 🟢 new for grid
  likes: number;
  isLiked: boolean; // 🟢 new
  comments: CommunityComment[]; // 🟢 updated
  downloadCount: number;
  latestComment?: string;
}

export interface CommunityComment {
  id: string;
  user: string;
  text: string;
}
