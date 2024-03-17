import { Link } from "wouter"

export default function CategoryList({ categories }) {
  return (
    <div className="w-full flex justify-center bg-warning-400 py-1 rounded-xl">
      <ul className="flex gap-x-8">
        {
          categories.map(cat => (
            <li key={cat.id}>
              <Link 
                to={'/carnicos/category/' + cat.id} 
                className="text-black text-lg font-semibold hover:text-amber-300 transition">
                  {cat.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}