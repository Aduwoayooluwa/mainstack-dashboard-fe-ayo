import { Skeleton } from "../ui/skeleton";

export function ChartSkeleton() {
    return (
        <div className="bg-white rounded-[12px] p-4">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="w-24 h-8 rounded-full" />
                    <Skeleton className="w-24 h-8 rounded-full" />
                </div>
            </div>
            {/* Chart area skeleton */}
            <div className="flex flex-col h-[300px]">
                <div className="flex-1 flex items-end gap-4 px-4">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <Skeleton className={`w-full h-[${Math.random() * 100 + 50}px]`} />
                            <Skeleton className="w-16 h-4" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 