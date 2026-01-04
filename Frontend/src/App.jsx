import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from './landing_page/HomePage';
import Signup from './Authentication/SignUp';
import Login  from './Authentication/Login';


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
    </>
  )
}

export default App
