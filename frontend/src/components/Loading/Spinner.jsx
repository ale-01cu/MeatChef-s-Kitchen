import React from "react"
import { Spinner } from "@nextui-org/react"

function CustomSpinner() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner
        size="lg"
        color="warning"
      />
    </div>
  )
}

const SpinnerMemo = React.memo(CustomSpinner)
export default SpinnerMemo