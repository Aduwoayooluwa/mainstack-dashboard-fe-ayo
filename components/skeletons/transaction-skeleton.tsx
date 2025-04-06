import { Skeleton } from "../ui/skeleton";

export function TransactionSkeleton() {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <Skeleton className="w-[48px] h-[48px] rounded-full" />
                <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
            <div>
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
            </div>
        </div>
    );
}

export function TransactionsListSkeleton() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="w-[107px] h-[48px] rounded-full" />
                    <Skeleton className="w-[107px] h-[48px] rounded-full" />
                </div>
            </div>
            <div className="w-full h-[1px] bg-[#EFF1F6] mt-5 mb-8" />
            <div className="flex flex-col gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <TransactionSkeleton key={i} />
                ))}
            </div>
        </div>
    );
} 