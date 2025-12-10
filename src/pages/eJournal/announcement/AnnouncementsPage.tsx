import { type ReactNode } from "react";
import AnnouncementList from "../../../components/announcements/AnnouncementList";

interface Announcement {
  id: number;
  date: string;
  title: string;
  description: string;
  iconSvg: ReactNode;
}

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    date: "July 26, 2024",
    title: "New Food Safety Guidelines Released",
    description:
      "The Ministry of Health has issued updated guidelines on food safety, effective immediately. All trainers are required to review and incorporate these changes into their training materials.",
    iconSvg: (
      <img
        src={''}            
        alt="Custom Imported Icon"
        className="h-full w-full object-contain"
      />
    )
  },
  {
    id: 2,
    date: "July 20, 2025",
    title: "5 ways to prepare food cleanly",
    description:
      "",
    iconSvg: (
      <img
        src={''}            
        alt="Custom Imported Icon"
        className="h-full w-full object-contain"
      />
    ),
  },
  {
    id: 3,
    date: "July 15, 2025",
    title: "Flow of roles",
    description:
      "",
    iconSvg: (
     <img
        src={''}            
        alt="Custom Imported Icon"
        className="h-full w-full object-contain"
      />
    ),
  },
  {
    id: 4,
    date: "July 10, 2025",
    title: "Food Safety Awareness Campaign",
    description:
      "Join us for a food safety awareness campaign on August 5th at the Community Center.",
    iconSvg: (
      <img
        src={''}            
        alt="Custom Imported Icon"
        className="h-full w-full object-contain"
      />
    ),
  },
];

const AnnouncementsPage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 w-full max-w-5xl mx-auto">
      <div className="grid gap-4 sm:gap-6">
        <AnnouncementList announcements={mockAnnouncements} />
      </div>
    </div>
  );
};

export default AnnouncementsPage;
