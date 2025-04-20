import  { FC, ReactNode } from 'react';
import { FaInfoCircle } from "react-icons/fa";

export type FinanceCardProps = {
  icon: ReactNode;
  total: string;
  title: string;
  description: string;
  updated: boolean;
};

export const FinanceCard: FC<FinanceCardProps> = ({icon,total,description,title,updated}) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-lg">
      <div className="flex items-center">
        <div className="relative">
          <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
            {icon}
            {!updated && <span className="absolute text-xs top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              !
            </span>}
          </div>
        </div>
        
        <div className="ml-4">
          <h2 className="text-red-600 text-xl font-bold">{title}</h2>
          <FaInfoCircle/>
          <div className="flex items-center text-gray-500">
            <span className="text-sm">{description}</span>
          </div>
        </div>
      </div>
      
      <div>
        <span className="text-lg font-bold">R{total}</span>
      </div>
    </div>
  );
};

