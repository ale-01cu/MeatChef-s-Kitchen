import { Link } from "wouter"

export default function CategoryList({ categories }) {
  return (
    <div className="w-full flex justify-center bg-amber-600 py-1">
      <ul className="flex gap-x-8">
        {
          categories.map(cat => (
            <li key={cat.id}>
              <Link 
                to={'/carnicos/category/' + cat.id} 
                className="text-white hover:text-amber-300 transition">
                  {cat.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}