import Header from "../components/Header"

export default function BaseLayout({ typeSearch, children, SubLayout }) {
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