'use client'

import { AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts';

interface CustomAxisTickProps {
    x: number;
    y: number;
    payload: {
        value: string;
    };
    index: number;
}

export default function Chart({ chartData }: { chartData: Transaction[] }) {
    if (!chartData.length) {
        return (
            <div className="w-full h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            axisLine={{ stroke: '#E5E7EB' }}
                            tickLine={false}
                            tick={false}
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

    const sortedData = [...chartData].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const CustomAxisTick = ({ x, y, payload, index }: CustomAxisTickProps) => {
        const isFirst = index === 0;
        const isLast = index === 1;
        
        return (
            <g>
                <text
                    x={x}
                    y={y + 20}
                    textAnchor={isFirst ? "start" : isLast ? "end" : "middle"}
                    fill="#666"
                    fontSize={12}
                >
                    {new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }).format(new Date(payload.value))}
                </text>
            </g>
        );
    };

    return (
        <div className="w-full h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={sortedData}
                    margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="date"
                        axisLine={{ stroke: '#E5E7EB' }}
                        tickLine={false}
                        ticks={[sortedData[0].date, sortedData[sortedData.length - 1].date]}
                        tick={CustomAxisTick}
                        interval={0}
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
            <svg
                style={{
                    position: 'absolute',
                    bottom: '30px',
                    left: '0',
                    width: '100%',
                    pointerEvents: 'none'
                }}
                height="10"
            >
                <circle cx="2" cy="5" r="2" fill="#E5E7EB" />
                <circle cx="99.7%" cy="5" r="2" fill="#E5E7EB" />
            </svg>
        </div>
    );
}
