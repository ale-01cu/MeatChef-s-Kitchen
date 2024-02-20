import { Link } from "wouter" 
import { BASE_URL } from "../utils/constants" 

export default function Card(props) {
  const { image, name, description, btnText, path } = props
  
  return (
    <section>
      <div id="image">
        <img src={BASE_URL + '/' + image} alt="" />
      </div>

      <div id="name">
        <p>{name}</p>
      </div>

      {
        description && <div id="description">
          <p>{description}</p>
        </div>
      }

      {
        btnText && <div id="button">
          <Link to={path}>
            <span>{btnText}</span>
          </Link>
        </div>
      }
      
    </section>
  )
}