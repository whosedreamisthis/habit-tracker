import { Skeleton } from "@/components/ui/skeleton";

export const SummarySkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <Skeleton key={i} className="h-24 w-full rounded-lg" />
    ))}
  </div>
);

export const HabitPerformanceSkeleton = () => (
  <div className="h-[300px] w-full flex flex-col gap-4 bg-white dark:bg-stone-800 p-5 rounded-lg mt-5 border border-slate-100 dark:border-stone-700/50">
    <Skeleton className="h-4 w-32 mb-2" />
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    ))}
  </div>
);

export const ActiveStreaksSkeleton = () => (
  <div className="bg-white dark:bg-stone-800 rounded-lg shadow-sm p-4 mt-5 border border-slate-100 dark:border-stone-700/50 h-[200px]">
    <Skeleton className="h-5 w-40 mb-5" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  </div>
);

export const HabitTrackerGridSkeleton = () => (
  <div className="mt-5 bg-white dark:bg-stone-800 rounded-lg p-5 w-full flex flex-col border border-slate-100 dark:border-stone-700/50 h-[400px]">
    <Skeleton className="h-10 w-full mb-4" />
    <Skeleton className="h-px w-full mb-4" />
    {Array.from({ length: 5 }).map((_, i) => (
      <Skeleton key={i} className="h-12 w-full mb-2" />
    ))}
  </div>
);

export const StatsSummarySkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
    {Array.from({ length: 3 }).map((_, i) => (
      <Skeleton key={i} className="h-28 w-full rounded-xl" />
    ))}
  </div>
);

export const ChartSkeleton = ({
  className = "h-[300px]",
}: {
  className?: string;
}) => <Skeleton className={className + " w-full rounded-xl"} />;

export const WeeklyReportSkeleton = () => (
  <Skeleton className="h-[250px] w-full rounded-2xl" />
);

export const NavIconSkeleton = () => (
  <Skeleton className="h-8 w-8 rounded-full" />
);

export const NavButtonSkeleton = () => (
  <Skeleton className="h-9 w-full rounded-lg" />
);

export const UserMenuSkeleton = () => (
  <div className="flex items-center gap-3 px-3 py-2">
    <Skeleton className="h-8 w-8 rounded-full" />
    <Skeleton className="h-4 w-24" />
  </div>
);
