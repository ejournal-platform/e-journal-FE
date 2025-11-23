export interface CommunityPost {
  id: number;
  author: string;
  date: string;
  text: string;
  imageUrl?: string;
  imageUrls?: string[];
  pdfUrls?: { url: string; title: string }[];
  videoUrls?: string[];
  likes: number;
  comments: number;
  downloadCount: number;
  latestComment?: string; // 🟢 new
}
