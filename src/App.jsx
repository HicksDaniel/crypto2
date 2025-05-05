import { useState } from 'react'
import { Outlet } from "react-router";
import Layout from './Layout';
import MenuTopBar from "./components/navigation/topbar";



function App() {


  return (
    <div className="flex justify-content-center w-full"
      style={{
        background: "url(https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png)",
        backgroundColor: "rgba(125, 125, 125, .2)"
      }}>
      <Layout />
    </div>
  )
}

export default App

