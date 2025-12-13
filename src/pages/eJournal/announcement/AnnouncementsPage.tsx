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
  }
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
