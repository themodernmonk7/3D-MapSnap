import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"

const mapbox_access_token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

mapboxgl.accessToken = mapbox_access_token

function App() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [longitude, setLongitude] = useState(-70.9)
  const [latitude, setLatitude] = useState(42.35)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [longitude, latitude], //starting position [lng, lat]
      zoom: zoom, // starting zoom
    })
  })

  return (
    <>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  )
}

export default App
