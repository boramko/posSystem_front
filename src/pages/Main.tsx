import React, { useState, useEffect } from 'react'
import Header from './Header'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axiosInstance from '@axiosInstance'
import { useRecoilState } from 'recoil';
import { userState } from 'utils/recoile';
import { userType } from '../components/interface/POS_interface'
import useEventError401 from 'components/hook/eventHook';

const Main: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useRecoilState<userType>(userState);
  const navigate = useNavigate();
  const eventError401 = useEventError401();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const getUserInfo = () => {
    try{
      axiosInstance.post("/userInfo", {
      }).then(data => {
          setUser(data.data);
      }).catch(error => {
          if (error.response) {
              // 서버가 2xx 외의 상태 코드로 응답한 경우
              const status = error.response.status;
              console.log(status);
              if (status === 401) {
                eventError401();
              } else if (status === 500) {
                  console.error('500 서버 내부 오류입니다.');
              } else {
                  console.error(`Unexpected Error: ${status}`);
              }
          } 
      });
    } catch(error) {
        console.error('Synchronous error:', error);
    }
  }

  useEffect(() => {
    getUserInfo();
  },[]);

  const handleLogout = (e:any)=>{
    e.preventDefault();
    localStorage.removeItem('token');
    alert("Logout 되었습니다.");
    navigate('/login');
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Menu */}
      {menuOpen && (
        <aside className="w-64 bg-white shadow-md overflow-y-auto flex-shrink-0">
          <ul className="space-y-2 p-4">
            <li>
            {user && user.user_name ? `${user.user_name} 님 환영합니다.` : '환영합니다.'}
            </li>
            <Link to="/">
              <li className="rounded px-2 py-1 text-gray-600 hover:bg-gray-200">
                홈
              </li>
            </Link>
            <Link to="/product">
              <li className="rounded px-2 py-1 text-gray-600 hover:bg-gray-200">
                상품등록 및 관리
              </li>
            </Link>
            <Link to="/orderlist">
              <li className="rounded px-2 py-1 text-gray-600 hover:bg-gray-200">
                결제 주문 내역 확인
              </li>
            </Link>
            <Link to="/payhistory">
              <li className="rounded px-2 py-1 text-gray-600 hover:bg-gray-200">
                결제 주문 통합 확인
              </li>
            </Link>
            <Link to="/logout" onClick={(e)=>handleLogout(e)}>
              <li className="rounded px-2 py-1 text-gray-600 hover:bg-gray-200">
                Logout
              </li>
            </Link>
          </ul>
        </aside>
      )}

    <div className="flex-1 flex flex-col">
        <Header toggleMenu={toggleMenu} />
        <main className="flex p-4 overflow-y-auto flex-grow max-h-[calc(100vh-60)]">
            <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Main
