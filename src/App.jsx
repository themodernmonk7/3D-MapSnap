import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MapBox from "./components/MapBox"
import { SceneWithSpinningBoxes } from "./components/Render_image"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapBox />} />
        <Route path="/render-3D-image" element={<SceneWithSpinningBoxes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
