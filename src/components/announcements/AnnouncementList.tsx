import { type ReactNode } from "react";
import AnnouncementCard from "./AnnouncementCard";

interface Props {
    announcements: {
        id: number;
        date: string;
        title: string;
        description: string;
        iconSvg: ReactNode;
        bgColor: string;
    }[];
}

const AnnouncementList = ({ announcements } : Props) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg divide-y divide-gray-100">
      {announcements.map((a) => (
        <AnnouncementCard key={a.id} announcement={a} />
      ))}
    </div>
  );
};

export default AnnouncementList;
