// src/pages/eJournal/AnnouncementsPage.tsx
import { type ReactNode } from "react";
import AnnouncementList from "../../../components/announcements/AnnouncementList";

interface Announcement {
    id: number;
  date: string;
  title: string;
  description: string;
  iconSvg: ReactNode;
  bgColor: string;
}

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    date: "July 26, 2024",
    title: "New Food Safety Guidelines Released",
    description:
      "The Ministry of Health has issued updated guidelines on food safety, effective immediately. All trainers are required to review and incorporate these changes into their training materials.",
    iconSvg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M8 12l2 2 4-4"></path>
      </svg>
    ),
    bgColor: "bg-green-800",
  },
  {
    id: 2,
    date: "July 20, 2024",
    title: "Upcoming Training Workshop",
    description:
      "A training workshop for Trainers of Trainers (TOTs) will be held on August 15-17, 2024. Register by August 1st to secure your spot.",
    iconSvg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    bgColor: "bg-blue-800",
  },
  {
    id: 3,
    date: "July 15, 2024",
    title: "E-Journal Submission Deadline",
    description:
      "The deadline for submitting your E-Journal entries for July is July 31, 2024. Please ensure all entries are complete and accurate.",
    iconSvg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    ),
    bgColor: "bg-purple-800",
  },
  {
    id: 4,
    date: "July 10, 2024",
    title: "Food Safety Awareness Campaign",
    description:
      "Join us for a food safety awareness campaign on August 5th at the Community Center.",
    iconSvg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 8v4m0 4h.01"></path>
      </svg>
    ),
    bgColor: "bg-orange-800",
  },
];

const AnnouncementsPage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 w-full max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center sm:text-left">
        Announcements
      </h1>
      <div className="grid gap-4 sm:gap-6">
        <AnnouncementList announcements={mockAnnouncements} />
      </div>
    </div>
  );
};

export default AnnouncementsPage;
