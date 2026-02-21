import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './Login'
import Dash from './Dash'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {

  return (
    <>
      <BrowserRouter>
       <Routes>
      <Route path="/" element={<Login/>} />
    <Route path="/dash" element={<Dash/>} />  
    </Routes>
      </BrowserRouter>
    </>
  )
}


