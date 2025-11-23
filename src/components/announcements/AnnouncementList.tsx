import { type ReactNode } from "react";
import AnnouncementCard from "./AnnouncementCard";

interface Props {
    announcements: {
        id: number;
        date: string;
        title: string;
        description: string;
        iconSvg: ReactNode;
    }[];
}

const AnnouncementList = ({ announcements } : Props) => {
  return (
    <div className=" p-8 divide-y divide-gray-100">
      {announcements.map((a) => (
        <AnnouncementCard key={a.id} announcement={a} />
      ))}
    </div>
  );
};

export default AnnouncementList;
