'use client'

import { AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts';

export default function Chart({ chartData }: { chartData: Transaction[] }) {
    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                        tickFormatter={(str: string) => {
                            const date = new Date(str);
                            return new Intl.DateTimeFormat('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            }).format(date);
                        }}
                        tick={{ fill: '#666', fontSize: 12 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#FF5403"
                        strokeWidth={1}
                        fill="url(#colorValue)"
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
