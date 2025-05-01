/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";

const StatusCard = ({ icon: Icon, title, value }: { 
    icon: any, 
    title: string, 
    value: number 
  }) => {
    const colorClass = useMemo(() => {
      if (value > 1000) return 'border-red-500 bg-red-50 dark:bg-red-900';
      if (value > 500) return 'border-orange-500 bg-orange-50 dark:bg-orange-900';
      return 'border-blue-200 bg-blue-50 dark:bg-blue-900';
    }, [value]);
  
    return (
      <div className={`p-6 rounded-xl shadow flex items-center gap-4 border-l-4 ${colorClass}`}>
        <Icon className="text-3xl" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
          <p className="text-xl font-bold dark:text-white">{value}</p>
        </div>
      </div>
    );
};
export default StatusCard;