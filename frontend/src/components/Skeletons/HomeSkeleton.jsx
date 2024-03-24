import {Card, Skeleton} from "@nextui-org/react";
import HomeListsSkeleton from "./HomeListsSkeleton";
import FooterSkeleton from "./FooterSkeleton";

export default function HomeSkeleton() {
  return (
    <div className="pt-12">
      <div className="px-12">
        <section>
          <Card className="w-full" radius="lg">
            <Skeleton className="w-full rounded-lg">
                <div className="h-[600px] w-full rounded-lg bg-default-200"></div>
            </Skeleton>
          </Card>
        </section>
        <section className="py-12">
          <HomeListsSkeleton/>
        </section>
        <section className="py-12 flex gap-x-2">
          <Skeleton className="w-2/3 rounded-lg">
            <div className="h-[600px] w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-1/3 rounded-lg">
            <div className="h-[600px] w-full rounded-lg bg-default-200"></div>
          </Skeleton>
        </section>

        <section className="py-12">
          <HomeListsSkeleton/>
        </section>

      </div>
    
      <FooterSkeleton/>
    </div>
  )
}