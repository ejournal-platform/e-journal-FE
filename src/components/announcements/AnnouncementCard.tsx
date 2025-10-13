import { type ReactNode } from "react";

interface Props {
    announcement: {
        id: number;
        date: string;
        title: string;
        description: string;
        iconSvg: ReactNode;
        bgColor: string;
    }
}

const AnnouncementCard = ({ announcement }: Props) => {
    return (
        <div className="flex justify-between border-b border-gray-200 py-6 last:border-b-0">
            {/* 📝 Left Text Section */}
            <div className="flex-1 pr-6">
                <p className="text-sm text-gray-500 mb-1">{announcement.date}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-green-700 transition duration-150 cursor-pointer">
                    {announcement.title}
                </h3>
                <p className="text-gray-600 text-sm">{announcement.description}</p>
            </div>

            {/* 🟩 Right Icon Section */}
            <div
                className={`w-36 h-36 flex-shrink-0 rounded-lg ${announcement.bgColor} 
                    flex items-center justify-center p-4 shadow-md`}
            >
                {announcement.iconSvg}
            </div>
        </div>
    );
};

export default AnnouncementCard;
