interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div className={`animate-pulse bg-[#EFF1F6] rounded-md ${className}`} />
    );
} 