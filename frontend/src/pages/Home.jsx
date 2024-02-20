import Card from "../components/Card.jsx"
import AuthButtons from "../components/AuthButtons.jsx"

export default function Home() {
  return (
    <>
      <div>
        <Card 
          image={''} 
          name={'Carnicos'} 
          btnText='Entrar' 
          path='/carnicos'
        />
        <Card 
          image={''} 
          name={'Cursos'} 
          btnText='Entrar'
          path='/cursos'
        />
      </div>
      <div>
        <AuthButtons/>
      </div>
    </>
  )
}