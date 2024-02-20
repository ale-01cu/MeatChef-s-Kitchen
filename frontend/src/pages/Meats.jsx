import ListMeats from "../components/ListMeats"
import Header from "../components/Header"
import NavCategories from "../components/NavCategories"
import { useParams } from "wouter" 

export default function Meats() {
  const { category } = useParams()
  console.log(category);

  return (
    <>
      <Header/>
      <NavCategories/>
      <main>
        <ListMeats/>
      </main>
    </>
  )
}