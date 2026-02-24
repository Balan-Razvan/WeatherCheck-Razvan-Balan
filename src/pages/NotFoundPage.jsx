import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <p className="text-gray-500 mt-4 mb-6">Page not found</p>
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-700 font-medium"
      >
        Go back home
      </Link>
    </div>
  )
}