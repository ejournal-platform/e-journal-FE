import { type ReactNode } from "react";

interface Props {
  announcement: {
    id: number;
    date: string;
    title: string;
    description: string;
    iconSvg: ReactNode;
    bgColor: string;
  };
}

const AnnouncementCard = ({ announcement }: Props) => {
  return (
    <div
      className="
        flex flex-col sm:flex-row justify-between items-center 
        p-4 sm:p-6 border border-gray-200 rounded-lg shadow-lg mb-6 bg-white
        transition-transform duration-200 hover:scale-[1.01]
      "
    >
      {/* 📝 Left Text Section */}
      <div className="flex-1 sm:pr-6 text-center sm:text-left mb-4 sm:mb-0">
        <p className="text-xs sm:text-sm text-gray-500 mb-1">
          {announcement.date}
        </p>
        <h3
          className="
            text-base sm:text-lg font-bold text-gray-900 mb-2 
            hover:text-green-700 transition duration-150 cursor-pointer
          "
        >
          {announcement.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-snug">
          {announcement.description}
        </p>
      </div>

      {/* 🟩 Right Icon Section */}
      <div
        className={`
          w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 
          flex-shrink-0 rounded-lg ${announcement.bgColor} 
          flex items-center justify-center p-3 sm:p-4 shadow-md
        `}
      >
        {announcement.iconSvg}
      </div>
    </div>
  );
};

export default AnnouncementCard;