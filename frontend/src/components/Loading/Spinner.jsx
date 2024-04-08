import React from "react"

function Spinner() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner
        size="lg"
        color="warning"
      />
    </div>
  )
}

const SpinnerMemo = React.memo(Spinner)
export default SpinnerMemo