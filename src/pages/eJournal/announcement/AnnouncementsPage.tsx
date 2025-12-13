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
    date: "",
    title: "",
    description:
      "",
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
