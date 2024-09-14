import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-white h-[calc(100vh-5.5rem)] rounded-md w-[calc(100vw-5.8rem)] mx-auto px-4 py-3 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full/ rounded-sm  bg-neutral-300/40" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4 bg-neutral-300/40" />
              <Skeleton className="h-4 w-1/2 bg-neutral-300/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
