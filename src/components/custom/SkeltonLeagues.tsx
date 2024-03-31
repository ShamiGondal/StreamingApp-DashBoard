import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonDemo() {
  return (
    <div className="flex py-16 space-x-4 items-center justify-center gap-10">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 ">
        <Skeleton className="h-10 w-60" />
        <Skeleton className="h-10 w-60" />
      </div>
    </div>
  )
}