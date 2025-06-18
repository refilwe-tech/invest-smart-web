import type { FC } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";

export type BarGraphProps = {
  data: {
    name: string;
    value: number;
  }[];
};

export const BarGraph: FC<BarGraphProps> = ({ data }) => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
