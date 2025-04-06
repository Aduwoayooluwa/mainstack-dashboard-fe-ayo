import { Skeleton } from "../ui/skeleton";

export function WalletBalanceSkeleton() {
    return (
        <div className="flex items-center gap-2 w-full justify-between">
            <div className="flex-1">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-7 w-32" />
            </div>
            <Skeleton className="w-6 h-6 rounded-full" />
        </div>
    );
}

export function AvailableBalanceSkeleton() {
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-9 w-48" />
            </div>
            <Skeleton className="w-[167px] h-[52px] rounded-full" />
        </div>
    );
} 