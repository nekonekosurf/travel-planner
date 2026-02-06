import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>

      <nav className="sticky bottom-0 bg-white border-t border-sand-200 shadow-lg">
        <div className="flex justify-around py-2">
          <Link
            to="/"
            className={`flex flex-col items-center px-4 py-1 text-xs ${
              location.pathname === '/' ? 'text-sunset-600' : 'text-gray-500'
            }`}
          >
            <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
            </svg>
            ホーム
          </Link>
          <Link
            to="/info"
            className={`flex flex-col items-center px-4 py-1 text-xs ${
              location.pathname === '/info' ? 'text-sunset-600' : 'text-gray-500'
            }`}
          >
            <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            実用情報
          </Link>
        </div>
      </nav>
    </div>
  )
}
