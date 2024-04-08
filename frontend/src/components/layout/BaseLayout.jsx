import Header from "../Header/Header"
import React from "react"
import HeaderNextUiResponsive from '../Header/HeaderNextUiResponsive'

function BaseLayoutComponent({ typeSearch, children, SubLayout }) {
  return (
    <>
      <header>
        <HeaderNextUiResponsive typeSearch={typeSearch}/>
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