
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { StockData } from '../types';

interface Props {
  data: StockData;
}

const StockChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-[400px] mt-6 bg-white/40 p-4 rounded-3xl border-2 border-sky-100">
      <h3 className="text-lg font-bold text-sky-700 mb-4 flex items-center gap-2">
        <span className="w-3 h-3 dora-blue rounded-full"></span>
        战场走势图 (${data.symbol})
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.history}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
          <XAxis dataKey="date" hide />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ borderRadius: '1rem', border: '2px solid #00A0E9' }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Legend iconType="circle" />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#00A0E9" 
            strokeWidth={3} 
            dot={false} 
            name="现价" 
          />
          <Line 
            type="monotone" 
            dataKey="ma5" 
            stroke="#ED1C24" 
            strokeWidth={2} 
            dot={false} 
            name="MA5 (生命线)" 
          />
          <Line 
            type="monotone" 
            dataKey="ma10" 
            stroke="#FFD200" 
            strokeWidth={2} 
            dot={false} 
            name="MA10" 
          />
          <Line 
            type="monotone" 
            dataKey="ma20" 
            stroke="#10b981" 
            strokeWidth={2} 
            dot={false} 
            name="MA20" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
