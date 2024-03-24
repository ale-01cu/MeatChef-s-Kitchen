import {Card, Skeleton} from "@nextui-org/react";

export default function MeatSliderSkeleton() {
  return (
    <Card className="w-full space-y-5 p-4" radius="lg">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">  
        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  )
}