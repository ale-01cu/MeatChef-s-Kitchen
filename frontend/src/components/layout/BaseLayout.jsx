import Header from "../Header/Header"
import React from "react"

function BaseLayoutComponent({ typeSearch, children, SubLayout }) {
  return (
    <>
      <header>
        <Header typeSearch={typeSearch}/>
      </header>
    
      {

        SubLayout &&
          <aside>
            <SubLayout/>
          </aside>
      }

    
      <main>
        { children }
      </main>
    
    </>
  )
}

const BaseLayout = React.memo(BaseLayoutComponent)
export default BaseLayout