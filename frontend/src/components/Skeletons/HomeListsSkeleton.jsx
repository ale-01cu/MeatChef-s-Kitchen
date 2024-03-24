import {Card, Skeleton} from "@nextui-org/react";

export default function HomeListsSkeleton() {
  return (
    <div className="flex gap-x-2 justify-center items-center">
      <Card className="w-[350px] h-[400px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-[350px] rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
      <Card className="w-[350px] h-[400px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-[350px] rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
      <Card className="w-[350px] h-[400px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-[350px] rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
    </div>
  )
}