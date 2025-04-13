import  { FC, ReactNode } from 'react';

export type FinanceCardProps = {
  icon: ReactNode;
  total: string;
  title: string;
  lastUpdatedAt: string;
  updated: boolean;
};

export const FinanceCard: FC<FinanceCardProps> = ({icon,total,lastUpdatedAt,title, updated}) => {
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
          <div className="flex items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">R3 in the last 30 days</span>
          </div>
        </div>
      </div>
      
      <div>
        <span className="text-2xl font-bold">{total}</span>
      </div>
    </div>
  );
};

