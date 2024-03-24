import { Pagination } from "@nextui-org/react"
import React from "react"

function BottomContent(props) {
  const { selectedKeys, items, hasSearchFilter, page, pages, setPage } = props

  return (
    <div className="py-2 px-8 flex justify-between items-center">
      <Pagination
        showControls
        classNames={{
          cursor: "bg-foreground text-background",
        }}
        color="default"
        isDisabled={hasSearchFilter}
        page={page}
        total={pages}
        variant="light"
        onChange={setPage}
      />
      <span className="text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${items.length} selected`}
      </span>
    </div>
  )
}

const MemoizedBottomContent = React.memo(BottomContent);
export default MemoizedBottomContent