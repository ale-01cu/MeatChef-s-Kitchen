import { Card, Skeleton } from "@nextui-org/react";

export default function FooterSkeleton() {
  return (
    <Card className="">
      <div className="w-full h-60 flex justify-between items-center p-8">
        <div className="flex flex-col gap-y-3">
          <Skeleton className="w-32 rounded-xl">
            <div className="h-4"></div>
          </Skeleton>
          <Skeleton className="w-24 rounded-xl">
            <div className="h-4"></div>
          </Skeleton>
          <Skeleton className="w-28 rounded-xl">
            <div className="h-4"></div>
          </Skeleton>
        </div>

        <div>
          <Skeleton className="w-[300px] h-32 rounded-2xl"/>
        </div>

        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-3 gap-x-4">
            <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
            <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
            <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
          </div>
          <div className="flex justify-center gap-x-4">
            <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
            <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
          </div>
        </div>

      </div>

    </Card>
    
  )
}