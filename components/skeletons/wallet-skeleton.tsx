import { Skeleton } from "../ui/skeleton";

export function WalletBalanceSkeleton() {
    return (
        <div className="flex items-center gap-2 w-full justify-between p-4">
            <div className="flex-1">
                <Skeleton className="h-4 w-16 md:w-20 mb-2" />
                <Skeleton className="h-7 w-24 md:w-32" />
            </div>
            <Skeleton className="w-6 h-6 rounded-full" />
        </div>
    );
}

export function AvailableBalanceSkeleton() {
    return (
        <div className="flex items-center justify-between mb-8 p-4">
            <div>
                <Skeleton className="h-4 w-24 md:w-32 mb-2" />
                <Skeleton className="h-9 w-32 md:w-48" />
            </div>
            <Skeleton className="w-[120px] md:w-[167px] h-[40px] md:h-[52px] rounded-full" />
        </div>
    );
} 