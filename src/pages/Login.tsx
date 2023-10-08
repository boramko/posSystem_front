import { Link, useNavigate } from 'react-router-dom'
import { isValidEmail, containsWhitespace } from './../utils/validationUtils' // 경로는 validationUtils.ts 파일의 위치에 따라 조정해주세요.
import { useState } from 'react'
import axiosInstance from '@axiosInstance'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navi = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidEmail(email)) {
      alert('Please enter a valid email.')
      return
    }

    if (containsWhitespace(password)) {
      alert('Password should not contain any whitespace.')
      return
    }

    // TODO: 로그인 로직 구현
    SendData();
  }

  const SendData = function(){
    try{
      axiosInstance.post("/login", {
          user_id : email,
          user_password : password,
      }).then(data => {
          console.log(data.data.token);
          localStorage.setItem("token",data.data.token);
          navi('/');
      }).catch(error => {
          if (error.response) {
              // 서버가 2xx 외의 상태 코드로 응답한 경우
              const status = error.response.status;
              if (status === 401) {
                  alert(error.response.data);
                  console.error('400 Bad Request: 잘못된 요청입니다.');
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

  return (
    // ... 기존 코드 ...
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-200 text-gray-700">
      <h1 className="text-2xl font-bold">Welcome Pos SyStem Back :)</h1>
      <form
        className="mt-12 flex flex-col rounded bg-white p-12 shadow-lg"
        onSubmit={handleSubmit}
      >
        <label className="text-xs font-semibold" htmlFor="usernameField">
          Email
        </label>
        <input
          id="usernameField"
          className="mt-2 flex h-12 w-64 items-center rounded bg-gray-200 px-4 focus:outline-none focus:ring-2"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="mt-3 text-xs font-semibold" htmlFor="passwordField">
          Password
        </label>
        <input
          id="passwordField"
          className="mt-2 flex h-12 w-64 items-center rounded bg-gray-200 px-4 focus:outline-none focus:ring-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="mt-8 flex h-12 w-64 items-center justify-center rounded bg-blue-600 px-6 text-sm font-semibold text-blue-100 hover:bg-blue-700">
          Login
        </button>
        <div className="mt-6 flex justify-center text-xs">
          <Link to="/signup" className="text-blue-400 hover:text-blue-500">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
    // ... 기존 코드 ...
  )
}

export default Login
