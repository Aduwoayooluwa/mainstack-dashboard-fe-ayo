import { Skeleton } from "../ui/skeleton";

export function ProfileSkeleton() {
    return (
        <div className="flex items-center gap-2 bg-[#EFF1F6] rounded-full p-2">
            <Skeleton className="w-[32px] h-[32px] rounded-full" />
            <Skeleton className="w-6 h-6" />
        </div>
    );
} 