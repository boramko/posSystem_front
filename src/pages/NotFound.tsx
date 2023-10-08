import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-xl space-y-8 text-center">
          <div className="relative h-60">
            <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-extrabold text-gray-700">
              <span className="shadow-text text-gray-800 text-white">4</span>
              <span className="shadow-text text-gray-800 text-white">0</span>
              <span className="shadow-text text-gray-800 text-white">4</span>
            </h1>
            <h3 className="text-lg font-semibold uppercase tracking-wider text-gray-700">
              Oops! 페이지를 찾을수가 없습니다.
            </h3>
          </div>
          <h2 className="text-xl font-medium uppercase text-black">
             처음페이지로 이동하세요.
          </h2>
          <Link to="/" className="text-blue-400 hover:text-blue-500">
            처음으로
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
