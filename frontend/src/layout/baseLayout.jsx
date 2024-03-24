import Header from "../components/Header"
import React from "react"

function BaseLayout({ typeSearch, children, SubLayout }) {
  return (
    <>
      <header>
        <Header typeSearch={typeSearch}/>
      </header>
    
      <aside>
        { SubLayout && <SubLayout/> }
      </aside>
    
      <main>
        { children }
      </main>
    
    </>
  )
}


export default React.memo(BaseLayout)