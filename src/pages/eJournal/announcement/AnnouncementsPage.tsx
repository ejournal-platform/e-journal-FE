import { type ReactNode } from "react";
import AnnouncementList from "../../../components/announcements/AnnouncementList";
import { useGetAnnouncements } from "../../../api/hooks/announcement";
import { FaBullhorn } from "react-icons/fa"; // Fallback icon

const AnnouncementsPage = () => {
  const { data: announcements, isLoading, error } = useGetAnnouncements();

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading announcements...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Failed to load announcements.</div>;
  }

  // Map API data to component props
  const mappedAnnouncements = (announcements || []).map((a) => {
    // Format date
    const date = new Date(a.publishDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return {
      id: a.id,
      date: date,
      title: a.title,
      description: a.content,
      iconSvg: a.imageUrl ? (
        <img
          src={a.imageUrl}
          alt={a.title}
          className="h-full w-full object-cover rounded-md"
        />
      ) : (
        <FaBullhorn className="text-gray-400 text-4xl" />
      ),
    };
  });

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full max-w-5xl mx-auto">
      <div className="grid gap-4 sm:gap-6">
        {mappedAnnouncements.length > 0 ? (
          <AnnouncementList announcements={mappedAnnouncements} />
        ) : (
          <div className="text-center text-gray-500">No announcements found.</div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
