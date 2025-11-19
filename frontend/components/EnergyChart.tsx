'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface EnergyBreakdown {
  name: string;
  value: number;
  color: string;
}

interface EnergyChartProps {
  data: EnergyBreakdown[];
}

export default function EnergyChart({ data }: EnergyChartProps) {
  return (
    <div className="w-full h-[200px] sm:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
            formatter={(value: number) => [`${value.toLocaleString()} kWh`, '']}
          />
          {data.map((entry, index) => (
            <Bar 
              key={`bar-${index}`} 
              dataKey="value" 
              fill={entry.color}
              radius={[8, 8, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

