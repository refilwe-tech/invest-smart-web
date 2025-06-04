import  { FC } from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export type BarGraphProps = {
    data: {
      name: string;
      interest_rate: number;
    }[];
  };

export const BarGraph: FC<BarGraphProps> = ({ data }) => {  

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data} barSize={20}>
          <Bar dataKey="interest_rate" fill="#8884d8" />
          <XAxis dataKey="interest_rate" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
      
    );
  }
