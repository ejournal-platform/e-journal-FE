import React from "react";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  onClick: () => void;
}

export const DashboardCard = ({ title, description, icon, onClick }: DashboardCardProps) => {
  return (
    <div
      onClick={onClick}
      className="p-6 rounded-xl bg-white border border-gray-200 shadow-md cursor-pointer 
                 flex flex-col justify-between h-48 transition-all duration-300 
                 hover:bg-green-500 hover:text-white hover:shadow-xl hover:scale-[1.02]"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 
                        transition-all duration-300 group-hover:bg-white group-hover:text-green-700">
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
            className: 'w-6 h-6',
          })}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold font-sans mb-1">{title}</h2>
        <p className="text-sm opacity-100">{description}</p>
      </div>
    </div>
  );
};