import React, { useState, useEffect } from 'react'

const Header: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      <button onClick={toggleMenu} className="text-xl">
        三
      </button>
      <div className="text-gray-600">
        {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
      </div>
      <div></div> {/* 이 부분은 헤더의 균형을 맞추기 위한 빈 div입니다. */}
    </header>
  )
}
export default Header
