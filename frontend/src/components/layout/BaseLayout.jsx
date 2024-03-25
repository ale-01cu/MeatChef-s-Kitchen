import Header from "../Header/Header"
import React from "react"

function BaseLayoutComponent({ typeSearch, children }) {
  return (
    <>
      <header>
        <Header typeSearch={typeSearch}/>
      </header>
    
      {/* <aside>
      </aside> */}
    
      <main>
        { children }
      </main>
    
    </>
  )
}

const BaseLayout = React.memo(BaseLayoutComponent)
export default BaseLayout