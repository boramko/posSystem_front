import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '@axiosInstance';
import {
  isValidEmail,
  isValidPasswordLength,
  isPasswordMatch,
  containsWhitespace
} from './../utils/validationUtils';

const SignUp: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navi = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (containsWhitespace(name)) {
      alert('Name should not contain any whitespace.')
      return
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email.')
      return
    }

    if (!isValidPasswordLength(password)) {
      alert('Password should be at least 8 characters long.')
      return
    }

    if (!isPasswordMatch(password, confirmPassword)) {
      alert('Passwords do not match.')
      return
    }

    SendData();
  }

  const SendData = function(){
    try{
      axiosInstance.post("/signup", {
          user_id : email,
          user_password : password,
          user_name : name
      }).then(data => {
        console.log(data);
        alert('가입을 환영합니다.')
        navi('/login')
      }).catch(error => {
          if (error.response) {
              // 서버가 2xx 외의 상태 코드로 응답한 경우
              const status = error.response.status;
              if (status === 400) {
                  alert("중복된 아이디가 있습니다.");
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
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-200 text-gray-700">
      <h1 className="text-2xl font-bold">Join Us :)</h1>
      <form
        className="mt-12 flex flex-col rounded bg-white p-12 shadow-lg"
        onSubmit={handleSubmit}
      >
        <label className="text-xs font-semibold" htmlFor="nameField">
          Full Name
        </label>
        <input
          id="nameField"
          className="mt-2 flex h-12 w-64 items-center rounded bg-gray-200 px-4 focus:outline-none focus:ring-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="mt-3 text-xs font-semibold" htmlFor="emailField">
          Email
        </label>
        <input
          id="emailField"
          className="mt-2 flex h-12 w-64 items-center rounded bg-gray-200 px-4 focus:outline-none focus:ring-2"
          type="email"
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

        <label
          className="mt-3 text-xs font-semibold"
          htmlFor="confirmPasswordField"
        >
          Confirm Password
        </label>
        <input
          id="confirmPasswordField"
          className="mt-2 flex h-12 w-64 items-center rounded bg-gray-200 px-4 focus:outline-none focus:ring-2"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="mt-8 flex h-12 w-64 items-center justify-center rounded bg-blue-600 px-6 text-sm font-semibold text-blue-100 hover:bg-blue-700">
          Sign Up
        </button>
        <div className="mt-6 flex justify-center text-xs">
          <span className="text-gray-500">Already have an account?</span>
          <Link to="/login" className="text-blue-400 hover:text-blue-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp
