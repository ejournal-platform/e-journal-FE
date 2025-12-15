export interface CommunityPost {
  id: string | number;
  author: string;
  date: string;
  text: string;
  imageUrl?: string;
  pdfUrls?: { url: string; title: string }[];
  videoUrls?: string[];
  imageUrls?: string[]; // 🟢 new for grid
  likes: number;
  isLiked: boolean; // 🟢 new
  comments: CommunityComment[]; // 🟢 updated
  downloadCount: number;
  latestComment?: string;
  profileImageUrl?: string;
}

export interface CommunityComment {
  id: string;
  user: string;
  authorId: string; // 🟢 Author ID for permission checks
  profileImageUrl?: string; // 🟢 Profile image URL
  text: string;
}
