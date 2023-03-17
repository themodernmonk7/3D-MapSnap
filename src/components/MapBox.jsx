import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import { Link } from "react-router-dom"

const mapbox_access_token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
mapboxgl.accessToken = mapbox_access_token
const MapBox = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [longitude, setLongitude] = useState(77.59)
  const [latitude, setLatitude] = useState(12.97)
  const [zoom, setZoom] = useState(10)
  const [imageURL, setImageURL] = useState("")

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [longitude, latitude], //starting position [lng, lat]
      zoom: zoom, // starting zoom
    })
  }, [])

  // useEffect(() => {
  //   if (!map.current) return // wait for map to initialize
  //   map.current.on("move", () => {
  //     setLongitude(map.current.getCenter().longitude?.toFixed(4))
  //     setLatitude(map.current.getCenter().latitude?.toFixed(4))
  //     setZoom(map.current.getZoom().toFixed(2))
  //   })
  //   console.log(longitude)
  // }, [map.current])

  // Take a screenshot of a map
  const takeScreenShot = async () => {
    const response = await fetch(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},${zoom}/400x400?access_token=${mapbox_access_token}`
    )
    setImageURL(response.url)
    return response.url
  }

  return (
    <>
      <div className=" space-y-10 relative ">
        <div className="sidebar">
          Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}{" "}
        </div>
        <div ref={mapContainer} className="map-container" />

        {/* Snapshot button */}
        <div className="flex flex-col justify-center items-center text-lg z-50 text-white space-y-5 ">
          <button
            onClick={takeScreenShot}
            className=" bg-blue-700 px-5 py-1 rounded-full font-medium "
          >
            Take a snapshot
          </button>
        </div>

        {/* Display screenshot image */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 place-items-center px-8 md:px-0">
          <img src={imageURL} alt="" />
        </div>

        {/* Render image into 3D button */}
        {imageURL && (
          <div className=" flex justify-center items-center ">
            <Link
              to="/render-3D-image"
              state={{ imageURL }}
              className="bg-blue-700 px-5 py-1 rounded-full font-medium"
            >
              Render into 3D Cuboid
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default MapBox
