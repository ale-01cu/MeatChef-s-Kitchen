export default function Card(props) {
  const { image, name, description, btnText } = props
  
    return (
    <section>
        <div id="image">
            <img src={image} alt="" />
        </div>

        <div id="name">
            <p>{name}</p>
        </div>

        {
            description && <div id="description">
                <p>{description}</p>
            </div>
        }

        <div id="button">
            <button>
                <span>{btnText}</span>
            </button>
        </div>
    </section>
  )
}