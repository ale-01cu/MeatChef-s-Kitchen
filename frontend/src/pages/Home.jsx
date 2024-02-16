import Card from "../components/Card.jsx"
import AuthButtons from "../components/AuthButtons.jsx"

export default function Home() {
  return (
    <>
      <div>
        <Card image={''} name={'Carnicos'} btnText='Entrar'/>
        <Card image={''} name={'Cursos'} btnText='Entrar'/>
      </div>
      <div>
        <AuthButtons/>
      </div>
    </>
  )
}