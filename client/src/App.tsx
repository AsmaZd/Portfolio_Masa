import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Gallery from "./pages/gallery/Gallery";
import Layout from './components/Layout'
import SlickSpirits from './pages/gallery/brandGallery/SlickSpirits'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivateSignin from './pages/PrivateSignin'
import React from 'react'
import api from './api'
import type { User } from './types/user'
import { AuthProvider, useAuth } from "./context/AuthContext";
import Admin from './pages/Admin'

function ProtectedRoutes() {
  const {user, checkingAuth} = useAuth();

  if(checkingAuth) {
    return <p>chargement</p>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/galerie/" element={<Gallery />} />
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin_signin" element={<PrivateSignin />} />
          <Route path="/admin" element={user?.role === "admin" ? <Admin /> : <Navigate to={"/"}/> } />
        </ Route>
        <Route path="/slickspirits" element={<SlickSpirits />} />
      </Routes>
    </BrowserRouter>
  )
}

function App() {

  return (
    <AuthProvider>
      <ProtectedRoutes/>
    </AuthProvider>
  )
}

export default App;
